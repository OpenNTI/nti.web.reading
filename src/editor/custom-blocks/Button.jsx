import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Image, Text} from '@nti/web-commons';
import {Plugins} from '@nti/web-editor';

import Styles from './Button.css';

const cx = classnames.bind(Styles);
const {Button, BlockCount} = Plugins.InsertBlock.components;

BlockTypeButton.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.any,
	label: PropTypes.string,
	type: PropTypes.any,

	createBlock: PropTypes.func,
	createBlockProps: PropTypes.object,

	isBlock: PropTypes.func,
	group: PropTypes.bool
};
export default function BlockTypeButton ({
	className,
	icon,
	label,
	type,
	createBlock,
	createBlockProps,
	isBlock,
	group
}) {
	const [mouseDown, setMouseDown] = React.useState(false);
	const onMouseDown = () => setMouseDown(true);
	const onMouseUp = () => setMouseDown(false);

	return (
		<Button
			type={type}
			className={cx('block-type-button', className, {mousedown: mouseDown})}
			createBlock={createBlock}
			createBlockProps={createBlockProps}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onDragEnd={onMouseUp}
		>
			<BlockCount className={cx('count')} predicate={isBlock} group={group} />
			<Image className={cx('icon')} src={icon} />
			<Text.Base className={cx('label')}>{label}</Text.Base>
		</Button>
	);
}
