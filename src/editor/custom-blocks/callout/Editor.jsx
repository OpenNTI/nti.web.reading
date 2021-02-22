import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { getAtomicBlockData } from '@nti/web-editor';
import { scoped } from '@nti/lib-locale';

import CustomBlock from '../custom-block';

import Styles from './Editor.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.editor.custom-blocks.callout.Editor', {
	title: 'Enter a title...',
	body: 'Add Content...',
});

CalloutEditor.WrapperClassName = CustomBlock.WrapperClassName;
CalloutEditor.propTypes = {
	block: PropTypes.any,
	blockProps: PropTypes.shape({
		editorState: PropTypes.any,
		setBlockData: PropTypes.func,
	}),
};
export default function CalloutEditor(props) {
	const {
		block,
		blockProps: { editorState, setBlockData },
	} = props;

	const data = getAtomicBlockData(block, editorState);

	const title = data.arguments ?? '';
	const onTitleChange = newTitle =>
		setBlockData?.({ arguments: newTitle }, true);

	const body = (data.body ?? []).join('\n');
	const onBodyChange = newBody =>
		setBlockData?.({ body: newBody.split('\n') }, true);

	return (
		<CustomBlock {...props} className={cx('callout-editor')}>
			<CustomBlock.Controls {...props} />
			<CustomBlock.Editor
				value={title}
				onChange={onTitleChange}
				placeholder={t('title')}
				className={cx('title-editor')}
				singleline
			/>
			<CustomBlock.Editor
				value={body}
				onChange={onBodyChange}
				placeholder={t('body')}
				className={cx('body-editor')}
			/>
		</CustomBlock>
	);
}
