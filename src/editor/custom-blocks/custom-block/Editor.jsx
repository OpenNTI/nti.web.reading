import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Editor, Plugins, BLOCKS, STYLES, STYLE_SET} from '@nti/web-editor';

import {RST} from '../../../parsers';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const Initial = Symbol('Initial');

const getPlugins = ({singleline}) => {
	const plugins = [
		Plugins.LimitBlockTypes.create({
			allow: singleline ?
				new Set([BLOCKS.UNSTYLED]) :
				new Set([BLOCKS.UNSTYLED, BLOCKS.ORDERED_LIST_ITEM, BLOCKS.UNORDERED_LIST_ITEM])
		}),
		Plugins.LimitStyles.create({allow: STYLE_SET}),
		Plugins.LimitLinks.create(),
		Plugins.IgnoreDrop.create(),
		Plugins.BlockBreakOut.create()
	];

	if (singleline) {
		plugins.push(
			Plugins.SingleLine.create()
		);
	}

	return plugins;
};


CustomBlockEditor.propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func,
	className: PropTypes.string,
	parser: PropTypes.shape({
		toDraftState: PropTypes.func,
		fromDraftState: PropTypes.func
	}),

	singleline: PropTypes.bool
};
export default function CustomBlockEditor ({value, className, onChange, parser = RST, singleline, ...otherProps}) {
	const valueRef = React.useRef(Initial);
	const [editorState, setEditorState] = React.useState(null);
	const [plugins, setPlugins] = React.useState(null);
	const settingUp = !editorState || !plugins;

	React.useEffect(() => {
		if (valueRef.current === Initial || value !== valueRef.current) {
			setEditorState(parser.toDraftState(value));
		}

		valueRef.current = value;
	}, [value]);

	React.useEffect(() => {
		setPlugins(getPlugins({singleline}));
	}, [singleline]);

	const onContentChange = (newEditorState) => {
		const newValue = parser.fromDraftState(newEditorState);

		if (newValue !== valueRef.current) {
			valueRef.current = newValue;
			onChange?.(newValue);
		}
	};

	return (
		<div className={cx('custom-block-editor', className)}>
			{!settingUp && (
				<Editor
					editorState={editorState}
					plugins={plugins}
					onContentChange={onContentChange}
					contentChangeBuffer={0}
					autoNest
					{...otherProps}
				/>
			)}
		</div>
	);
}
