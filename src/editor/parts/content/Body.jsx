import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Editor, EditorGroup, Plugins, BLOCKS, STYLES} from '@nti/web-editor';

import {RST} from '../../../parsers';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const DefaultAllowedBlocks = new Set([
	BLOCKS.ATOMIC,
	BLOCKS.HEADER_ONE,
	BLOCKS.HEADER_TWO,
	BLOCKS.HEADER_THREE,
	BLOCKS.HEADER_FOUR,
	BLOCKS.HEADER_FIVE,
	BLOCKS.HEADER_SIZE,
	BLOCKS.ORDERED_LIST_ITEM,
	BLOCKS.UNORDERED_LIST_ITEM,
	BLOCKS.BLOCKQUOTE,
	BLOCKS.UNSTYLED
]);

const DefaultAllowedStyles = new Set([
	STYLES.BOLD,
	STYLES.CODE,
	STYLES.ITALIC,
	STYLES.UNDERLINE
]);

function getPlugins ({
	allowedBlocks = DefaultAllowedBlocks,
	allowedStyles = DefaultAllowedStyles,
	customBlocks,
	formatPasted
}) {
	const plugins = [
		Plugins.LimitBlockTypes.create({allow: allowedBlocks}),
		Plugins.LimitStyles.create({allow: allowedStyles}),
		Plugins.KeepFocusInView.create(),
		Plugins.KeepFocusableTarget.create(),
		Plugins.BlockBreakOut.create(),
		Plugins.ContiguousEntities.create(),
		Plugins.InsertBlock.create()
	];

	if (customBlocks) {
		plugins.push(
			Plugins.CustomBlocks.create({customBlocks})
		);
	}

	return plugins;
}

BodyEditor.getPlugins = getPlugins;
BodyEditor.propTypes = {
	className: PropTypes.string,
	error: PropTypes.any,

	content: PropTypes.any,
	onChange: PropTypes.func,
	parser: PropTypes.shape({
		toDraftState: PropTypes.func,
		fromDraftState: PropTypes.func
	}),

	plugins: PropTypes.array,
	customBlocks: PropTypes.array
};
export default function BodyEditor ({
	className,
	error,

	content,
	onChange,
	parser = RST,

	plugins: pluginsProp,
	customBlocks,
	...otherProps
}) {
	const defaultEditorRef = EditorGroup.useDefaultEditorRef();

	const contentRef = React.useRef(null);
	const [editorState, setEditorState] = React.useState(null);
	const [plugins, setPlugins] = React.useState(null);
	const settingUp = !editorState || !plugins;

	React.useEffect(() => {
		if (!contentRef.current || content !== contentRef.current) {
			setEditorState(parser.toDraftState(content));
		}

		contentRef.current = content;
	}, []);

	React.useEffect(() => {
		setPlugins(pluginsProp ?? getPlugins({customBlocks}));
	}, [pluginsProp]);

	const onContentChange = (newEditorState) => {
		const newContent = parser.fromDraftState(newEditorState);

		if (newContent !== contentRef.current) {
			contentRef.current = newContent;
			onChange?.(newContent);
		}
	};

	return (
		<div className={cx('body', className)}>
			{!settingUp && (
				<Editor
					{...otherProps}

					onContentChange={onContentChange}
					onChange={error && onContentChange}

					plugins={plugins}
					ref={defaultEditorRef}
				/>
			)}
		</div>
	);
}
