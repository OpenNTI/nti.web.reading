import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Editor, Plugins, BLOCKS, STYLES} from '@nti/web-editor';

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
		Plugins.BlockBreakOut.create(),
		Plugins.ContiguousEntities.create()
	];

	if (customBlocks) {
		plugins.push(
			Plugins.CustomBlocks.create({customBlocks})
		);

		plugins.push(
			Plugins.InsertBlock.create()
		);
	}

	return plugins;
}

BodyEditor.getPlugins = getPlugins;
BodyEditor.propTypes = {
	className: PropTypes.string,
	error: PropTypes.any,
	plugins: PropTypes.array,
	customBlocks: PropTypes.array
};
export default function BodyEditor ({
	className,
	error,
	plugins: pluginsProp,
	customBlocks,
	...otherProps
}) {
	const [plugins, setPlugins] = React.useState(null);
	const settingUp = !plugins;

	React.useEffect(() => {
		setPlugins(pluginsProp ?? getPlugins({customBlocks}));
	}, [pluginsProp]);

	return (
		<div className={cx('body', className)}>
			{!settingUp && (<Editor {...otherProps} plugins={plugins} />)}
		</div>
	);
}
