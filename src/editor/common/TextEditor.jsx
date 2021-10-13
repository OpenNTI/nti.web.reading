import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import {
	BLOCKS,
	ContextProvider,
	Editor,
	Parsers,
	Plugins,
	generateID,
	STYLES,
} from '@nti/web-editor';
import { Errors } from '@nti/web-commons';

import Styles from './TextEditor.css';

const cx = classnames.bind(Styles);

const Initial = Symbol('Initial');

const TextParsers = {
	HTML: {
		toDraftState: x => Parsers.HTML.toDraftState(x),
		fromDraftState: x => Parsers.HTML.fromDraftState(x)?.join('\n') ?? null,
	},
	PlainText: {
		toDraftState: x => Parsers.PlainText.toDraftState(x),
		fromDraftState: x =>
			Parsers.PlainText.fromDraftState(x)?.join('\n') ?? null,
	},
};

const { CharacterCounter } = Plugins.Counter.components;

const getPlugins = ({ plainText, singleLine, charLimit, countDown }) => {
	const plugins = [
		Plugins.LimitBlockTypes.create({ allow: new Set([BLOCKS.UNSTYLED]) }),
		Plugins.IgnoreDrop.create(),
	];

	if (charLimit != null) {
		plugins.push(
			Plugins.Counter.create({
				character: { limit: charLimit, countDown },
			})
		);
	}

	if (plainText) {
		plugins.push(Plugins.Plaintext.create());
	} else {
		plugins.push(
			Plugins.LimitStyles.create({
				allow: new Set([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE]),
			})
		);
		plugins.push(Plugins.EnsureFocusableBlock.create());
	}

	if (singleLine) {
		plugins.push(Plugins.SingleLine.create());
	}

	return plugins;
};

TextEditor.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.any,

	plainText: PropTypes.bool,
	singleLine: PropTypes.bool,
	charLimit: PropTypes.number,
	countDown: PropTypes.bool,
};
export default function TextEditor({
	className,
	value,
	name,
	onChange,
	error,
	plainText,
	singleLine,
	charLimit,
	countDown,
	...otherProps
}) {
	const [editorState, setEditorState] = useState(null);
	const [plugins, setPlugins] = useState(null);
	const settingUp = !editorState || !plugins;

	const parser = plainText ? TextParsers.PlainText : TextParsers.HTML;

	const valueRef = useRef(Initial);
	const editorIdRef = useRef();

	useEffect(() => {
		editorIdRef.current = generateID();
	}, []);

	useEffect(() => {
		if (valueRef.current === Initial || valueRef.current !== value) {
			setEditorState(parser.toDraftState(value));
		}

		valueRef.current = value;
	}, [value]);

	useEffect(
		() =>
			setPlugins(
				getPlugins({
					plainText,
					singleLine,
					charLimit,
					countDown,
				})
			),
		[plainText, singleLine, charLimit, countDown]
	);

	const onContentChange = newEditorState => {
		const newValue = parser.fromDraftState(newEditorState);

		valueRef.current = newValue;
		onChange?.(newValue);
	};

	if (settingUp) {
		return null;
	}

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
					{countDown != null && (
						<CharacterCounter className={cx('character-count')} />
					)}
					{error && (
						<Errors.Target
							error={error}
							label={name}
							className={cx('error', error.code ?? 'unknown')}
						/>
					)}
				</div>
			</ContextProvider>
		</div>
	);
}
