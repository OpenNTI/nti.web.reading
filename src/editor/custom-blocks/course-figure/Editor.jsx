import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { getAtomicBlockData } from '@nti/web-editor';
import { ContentResources } from '@nti/web-commons';

import CustomBlock from '../custom-block';

import Styles from './Editor.css';
import { isImage } from './utils';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.editor.custom-blocks.course-figure.Editor', {
	figurePlaceholder: 'Figure %(index)s',
	descriptionPlaceholder: 'Write a caption...',
	change: 'Replace Image',
});

const titleRegex = /^Figure\s\d$/;

const getContainer = container =>
	Array.isArray(container) ? container[0] : container;

CourseFigureEditor.WrapperClassName = CustomBlock.WrapperClassName;
CourseFigureEditor.propTypes = {
	block: PropTypes.object,
	blockProps: PropTypes.shape({
		container: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		indexOfType: PropTypes.number,
		editorState: PropTypes.object,
		setBlockData: PropTypes.func,
	}),
};
export default function CourseFigureEditor(props) {
	const {
		block,
		blockProps: { container, editorState, setBlockData, indexOfType },
	} = props;
	const figureIndex = indexOfType + 1;
	const data = getAtomicBlockData(block, editorState);

	const url = data.arguments;
	const [title, caption] = data.body ?? [];

	const onTitleChange = newTitle =>
		setBlockData({ body: [newTitle, caption] }, true);

	const onCaptionChange = newCaption =>
		setBlockData({ body: [title, newCaption] }, true);

	React.useEffect(() => {
		if (title == null || titleRegex.test(title)) {
			const newTitle = t('figurePlaceholder', { index: figureIndex });

			if (title !== newTitle) {
				onTitleChange(newTitle);
			}
		}
	}, [title, indexOfType]);

	const onChangeImage = async () => {
		try {
			const containerId = getContainer(container)?.getID();
			const file = await ContentResources.selectFrom(
				containerId,
				isImage
			);

			setBlockData?.({ arguments: file.url });
		} catch (e) {
			//swallow
		}
	};

	return (
		<CustomBlock {...props}>
			<CustomBlock.Controls
				{...props}
				changeLabel={t('change')}
				onChange={onChangeImage}
			/>
			<div className={cx('course-figure')}>
				<img src={url} />
			</div>
			<div className={cx('meta')}>
				<CustomBlock.Editor
					className={cx('title')}
					value={title}
					placeholder={t('figurePlaceholder', { index: figureIndex })}
					onChange={onTitleChange}
					singleLine
				/>
				<CustomBlock.Editor
					className={cx('caption')}
					value={caption}
					placeholder={t('descriptionPlaceholder')}
					onChange={onCaptionChange}
					singleLine
				/>
			</div>
		</CustomBlock>
	);
}
