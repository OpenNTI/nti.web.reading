import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text, Flyout, LabeledValue} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

ReadingEditorHeaderControl.propTypes = {
	label: PropTypes.node,
	value: PropTypes.node,

	disabled: PropTypes.bool,
	onDismiss: PropTypes.func,

	children: PropTypes.any,
	forwardRef: PropTypes.any
};
function ReadingEditorHeaderControl ({label, value, disabled, onDismiss, children, forwardRef}) {
	const flyoutRef = React.useRef(null);
	const trigger = (
		<LabeledValue
			className={cx('control', {disabled})}
			label={label}
			arrow
		>
			{value}
		</LabeledValue>
	);

	React.useImperativeHandle(forwardRef, () => ({
		dismiss: () => flyoutRef.current?.dismiss()
	}));

	return (
		<Flyout.Triggered
			ref={flyoutRef}
			trigger={trigger}
			verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT_OR_RIGHT}
			onDismiss={onDismiss}
		>
			<div className={cx('control-flyout')}>
				{children}
			</div>
		</Flyout.Triggered>
	);
}

const ControlForwardRef = (props, ref) => (<ReadingEditorHeaderControl {...props} forwardRef={ref} />);
export default React.forwardRef(ControlForwardRef);
