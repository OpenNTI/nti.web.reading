import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {
	BLOCKS,
	ContextProvider,
	Editor,
	Parsers,
	Plugins,
	generateID,
	STYLES
} from '@nti/web-editor';

import Styles from './TextEditor.css';

const cx = classnames.bind(Styles);

const Initial = Symbol('Initial');

const toDraftState = (x) => Parsers.HTML.toDraftState(x);
const fromDraftState = (x) => Parsers.HTML.fromDraftState(x)?.join('\n') ?? null;

const {CharacterCounter} = Plugins.Counter.components;

const getPlugins = ({plainText, singleLine, charLimit, countDown}) => {
	const plugins = [
		Plugins.LimitBlockTypes.create({allow: new Set([BLOCKS.UNSTYLED])}),
		Plugins.IgnoreDrop.create()
	];

	if (charLimit != null) {
		plugins.push(
			Plugins.Counter.create({character: {limit: charLimit, countDown}})
		);
	}

	if (plainText) {
		plugins.push(
			Plugins.Plaintext.create()
		);
	} else {
		plugins.push(
			Plugins.LimitStyles.create({allow: new Set([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE])})
		);
		plugins.push(
			Plugins.EnsureFocusableBlock.create()
		);
	}

	if (singleLine) {
		plugins.push(
			Plugins.SingleLine.create()
		);
	}

	return plugins;
};

TextEditor.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.any,

	plainText: PropTypes.bool,
	singleLine: PropTypes.bool,
	charLimit: PropTypes.number,
	countDown: PropTypes.bool,
};
export default function TextEditor ({
	className,
	value,
	onChange,
	error,
	plainText,
	singleLine,
	charLimit,
	countDown,
	...otherProps
}) {
	const [editorState, setEditorState] = React.useState(null);
	const [plugins, setPlugins] = React.useState(null);
	const settingUp = !editorState || !plugins;

	const valueRef = React.useRef(Initial);
	const editorIdRef = React.useRef();

	React.useEffect(() => {
		editorIdRef.current = generateID();
	}, []);

	React.useEffect(() => {
		if (valueRef.current === Initial || valueRef.current !== value) {
			setEditorState(toDraftState(value));
		}

		valueRef.current = value;
	}, [value]);

	React.useEffect(() => setPlugins(getPlugins({
		plainText,
		singleLine,
		charLimit,
		countDown
	})), [plainText, singleLine, charLimit, countDown]);

	const onContentChange = (newEditorState) => {
		const newValue = fromDraftState(newEditorState);

		valueRef.current = newValue;
		onChange?.(newValue);
	};

	if (settingUp) { return null; }

	return (
		<div className={cx('text-editor', className)}>
			<Editor
				{...otherProps}
				id={editorIdRef.current}
				editorState={editorState}
				onContentChange={onContentChange}
				plugins={plugins}
			/>
			<ContextProvider editorID={editorIdRef.current}>
				<div>
					{countDown != null && (<CharacterCounter className={cx('character-count')} />)}
				</div>
			</ContextProvider>
		</div>
	);
}
