import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { getService } from '@nti/web-client';
import { getAtomicBlockData } from '@nti/web-editor';
import { Hooks, Loading, Text } from '@nti/web-commons';
import Video, { Editor } from '@nti/web-video';

import CustomBlock from '../custom-block';

import Styles from './Editor.css';
import * as Events from './Events';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.editor.custom-blocks.video-ref.Editor', {
	missing: 'This video has been deleted.',
	change: 'Edit Video',
	editorTitle: 'Video Editor',
});

const { useResolver } = Hooks;
const { isPending, isResolved } = useResolver;

VideoRefEditor.WrapperClassName = CustomBlock.WrapperClassName;
VideoRefEditor.propTypes = {
	block: PropTypes.object,
	blockProps: PropTypes.shape({
		editorState: PropTypes.object,
		setBlockData: PropTypes.func,
		removeBlock: PropTypes.func,
	}),
};
export default function VideoRefEditor(props) {
	const {
		block,
		blockProps: { editorState, removeBlock },
	} = props;
	const [deleted, setDeleted] = React.useState(false);

	const data = getAtomicBlockData(block, editorState);
	const videoId = data.arguments;
	const resolver = useResolver(async () => {
		const service = await getService();
		const video = await service.getObject(videoId);

		return video;
	}, [videoId]);

	const loading = isPending(resolver);
	const video = isResolved(resolver) ? resolver : null;

	React.useEffect(
		() =>
			Events.subscribeTo(Events.VideoDeleted, id => {
				if (videoId === id) {
					setDeleted(true);
				}
			}),
		[]
	);

	Hooks.useChanges(
		video ?? {
			subscribeToChange: () => () => {},
		}
	);

	const missing = deleted || (!loading && !video);

	const onChange = () => {
		Editor.show(
			video,
			{ title: t('editorTitle'), restoreScroll: true },
			{
				onVideoDelete: deletedVideo => {
					removeBlock?.();
					Events.emit(Events.VideoDeleted, deletedVideo.getID());
				},
			}
		);
	};

	return (
		<CustomBlock {...props}>
			<CustomBlock.Controls
				{...props}
				onChange={video && onChange}
				changeLabel={t('change')}
			/>
			<div className={cx('video-wrap')}>
				<Loading.Placeholder
					loading={loading}
					fallback={<Loading.Spinner.Large />}
				>
					{missing && (
						<Text.Base className={cx('video-missing')}>
							{t('missing')}
						</Text.Base>
					)}
					{!missing && <Video src={video} />}
					{!missing && (
						<Text.Base className={cx('video-title')}>
							{video?.title}
						</Text.Base>
					)}
				</Loading.Placeholder>
			</div>
		</CustomBlock>
	);
}
