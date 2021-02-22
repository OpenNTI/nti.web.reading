import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { getAtomicBlockData, NestedEditorWrapper } from '@nti/web-editor';
import { Input } from '@nti/web-commons';

import CustomBlock from '../custom-block';

import Styles from './Editor.css';
import { Languages } from './Constants';

const cx = classnames.bind(Styles);

CodeEditor.WrapperClassName = CustomBlock.WrapperClassName;
CodeEditor.propTypes = {
	block: PropTypes.any,
	blockProps: PropTypes.shape({
		editorState: PropTypes.any,
		setBlockDataImmediately: PropTypes.func,
		setReadOnly: PropTypes.func,
	}),
};
export default function CodeEditor(props) {
	const codeRef = React.useRef(null);
	const {
		block,
		blockProps: {
			editorState,
			setBlockDataImmediately: setBlockData,
			setReadOnly,
		},
	} = props;

	const data = getAtomicBlockData(block, editorState);

	const language = data.arguments;
	const code = (data.body ?? []).join('\n');

	const focus = () => codeRef.current?.focus?.();
	const onFocus = () => setReadOnly?.(true);
	const onBlur = () => setReadOnly?.(false);

	const onLanguageChange = lang => {
		setBlockData({ arguments: lang });
		setTimeout(() => focus(), 1);
	};

	const onCodeChange = newCode => {
		setBlockData({ body: newCode.split('\n') });
		focus();
	};

	return (
		<CustomBlock {...props} className={cx('code-block')}>
			<CustomBlock.Controls {...props}>
				<Input.Select
					className={cx('code-language')}
					value={language}
					onChange={onLanguageChange}
					optionsClassName={cx('code-language-options')}
				>
					{Object.entries(Languages).map(([display, lang]) => {
						return (
							<Input.Select.Option key={display} value={lang}>
								{display}
							</Input.Select.Option>
						);
					})}
				</Input.Select>
			</CustomBlock.Controls>
			<NestedEditorWrapper
				tabIndex="0"
				onBlur={onBlur}
				onFocus={onFocus}
				onClick={focus}
			>
				<Input.TextArea
					className={cx('code-editor')}
					value={code}
					ref={codeRef}
					onChange={onCodeChange}
					onFocus={onFocus}
					onBlur={onBlur}
					autoGrow
				/>
			</NestedEditorWrapper>
		</CustomBlock>
	);
}
