import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Image, Text } from '@nti/web-commons';
import { Plugins } from '@nti/web-editor';

import Styles from './Button.css';

const cx = classnames.bind(Styles);
const { Button } = Plugins.InsertBlock.components;

const BlockTypeButton = React.forwardRef(
	(
		{
			className,
			icon,
			label,
			type,
			disabled,
			createBlock,
			createBlockProps,
		},
		ref
	) => {
		const [mouseDown, setMouseDown] = React.useState(false);
		const onMouseDown = () => setMouseDown(true);
		const onMouseUp = () => setMouseDown(false);

		return (
			<Button
				ref={ref}
				type={type}
				className={cx('block-type-button', className, {
					mousedown: mouseDown,
				})}
				createBlock={createBlock}
				createBlockProps={createBlockProps}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onDragEnd={onMouseUp}
				disabled={disabled}
			>
				<Image className={cx('icon')} src={icon} />
				<Text.Base className={cx('label')}>{label}</Text.Base>
			</Button>
		);
	}
);

BlockTypeButton.displayName = 'BlockTypeButton';
BlockTypeButton.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.any,
	label: PropTypes.string,
	type: PropTypes.any,
	disabled: PropTypes.bool,

	createBlock: PropTypes.func,
	createBlockProps: PropTypes.object,

	isBlock: PropTypes.func,
	group: PropTypes.bool,
};

export default BlockTypeButton;
