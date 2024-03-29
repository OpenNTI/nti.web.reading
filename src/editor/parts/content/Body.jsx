import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Editor, EditorGroup, Plugins, BLOCKS, STYLES } from '@nti/web-editor';

import { RST } from '../../../parsers';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const Initial = Symbol('Initial');

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
	BLOCKS.UNSTYLED,
]);

const DefaultAllowedStyles = new Set([
	STYLES.BOLD,
	STYLES.CODE,
	STYLES.ITALIC,
	STYLES.UNDERLINE,
]);

function getPlugins({
	allowedBlocks = DefaultAllowedBlocks,
	allowedStyles = DefaultAllowedStyles,
	customBlocks,
	customBlockProps,
	formatPasted,
}) {
	const plugins = [
		Plugins.LimitBlockTypes.create({ allow: allowedBlocks }),
		Plugins.LimitStyles.create({ allow: allowedStyles }),
		Plugins.KeepFocusInView.create(),
		Plugins.KeepFocusableTarget.create(),
		Plugins.BlockBreakOut.create(),
		Plugins.ContiguousEntities.create(),
		Plugins.InsertBlock.create(),
		Plugins.Links.AutoLink.create(),
		Plugins.Links.CustomLinks.create(),
	];

	if (customBlocks) {
		plugins.push(
			Plugins.CustomBlocks.create({
				customBlocks,
				blockProps: customBlockProps,
			})
		);
	}

	return plugins;
}

BodyEditor.getPlugins = getPlugins;
BodyEditor.propTypes = {
	className: PropTypes.string,
	error: PropTypes.any,
	masked: PropTypes.bool,

	content: PropTypes.any,
	onChange: PropTypes.func,
	parser: PropTypes.shape({
		toDraftState: PropTypes.func,
		fromDraftState: PropTypes.func,
	}),

	plugins: PropTypes.array,
	customBlocks: PropTypes.array,
	customBlockProps: PropTypes.any,
};
export default function BodyEditor({
	className,
	error,
	masked,

	content,
	onChange,
	parser = RST.withOptions({ startingHeaderLevel: 2 }),

	plugins: pluginsProp,
	customBlocks,
	customBlockProps,
	...otherProps
}) {
	const defaultEditorRef = EditorGroup.useDefaultEditorRef();

	const contentRef = useRef(Initial);
	const [editorState, setEditorState] = useState(null);
	const [plugins, setPlugins] = useState(null);
	const settingUp = !editorState || !plugins;

	useEffect(() => {
		if (contentRef.current === Initial || content !== contentRef.current) {
			setEditorState(parser.toDraftState(content));
		}

		contentRef.current = content;
	}, [content]);

	useEffect(() => {
		setPlugins(
			pluginsProp ?? getPlugins({ customBlocks, customBlockProps })
		);
	}, [pluginsProp]);

	const onContentChange = newEditorState => {
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
					editorState={editorState}
					readOnly={masked}
					onContentChange={onContentChange}
					onChange={error && onContentChange}
					plugins={plugins}
					ref={defaultEditorRef}
				/>
			)}
		</div>
	);
}
