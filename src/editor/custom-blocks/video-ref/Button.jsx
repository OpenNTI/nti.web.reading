import React from 'react';
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';
import {scoped} from '@nti/lib-locale';
import {BLOCKS} from '@nti/web-editor';
import {Chooser} from '@nti/web-video';

import Button from '../Button';

import Icon from './assets/icon-video.svg';
import {isVideoRefBlock} from './utils';
import {Name} from './Constants';
import * as Events from './Events';

const t = scoped('web-reading.editor.custom-blocks.video-ref.Button', {
	label: 'Video'
});

const getAssetContainer = (container) => (
	(Array.isArray(container) ? container.reverse() : [container])
		.find(c => c.getAssets)
);

VideoRefButton.propTypes = {
	container: PropTypes.oneOfType(
		PropTypes.object,
		PropTypes.array
	)
};
export default function VideoRefButton ({container}) {
	const createBlock = async (insertBlock, p, selection, editor) => {
		const assetContainer = getAssetContainer(container);

		try {
			const video = await Chooser.show(
				assetContainer,
				{refocus: editor?.editor?.draftEditor},
				{onVideoDelete: id => Events.emit(Events.VideoDeleted, id)}
			);

			insertBlock({
				type: BLOCKS.ATOMIC,
				text: '',
				data: {
					name: Name,
					body: [],
					arguments: `${video.getID()}`,
					options: {uid: uuid()}
				}
			});
		} catch (e) {
			//swallow
		}
	};

	return (
		<Button
			label={t('label')}
			icon={Icon}
			createBlock={createBlock}
			isBlock={isVideoRefBlock}
			type={Name}
		/>
	);
}
