import React from 'react';
import PropTypes from 'prop-types';

import { Flyout, LabeledValue } from '@nti/web-commons';

const Control = styled(LabeledValue)`
	flex: 1 1 auto;
	max-width: 25%;
	padding: 0.5rem 0.625rem 0.625rem 1rem;
	box-shadow: inset -1px 0 0 0 var(--border-grey-light),
		-1px 0 0 0 var(--border-grey-light);

	&.disabled {
		pointer-events: none;
		opacity: 0.4;
	}

	&:first-child {
		padding-left: var(--side-padding, 1rem);
		box-shadow: none;
	}
`;

ReadingEditorHeaderControl.propTypes = {
	label: PropTypes.node,
	value: PropTypes.node,

	disabled: PropTypes.bool,
	onDismiss: PropTypes.func,

	children: PropTypes.any,
	forwardRef: PropTypes.any,
};
function ReadingEditorHeaderControl({
	label,
	value,
	disabled,
	onDismiss,
	children,
	forwardRef,
}) {
	const flyoutRef = React.useRef(null);
	const trigger = (
		<Control className="control" disabled label={label} arrow>
			{value}
		</Control>
	);

	React.useImperativeHandle(forwardRef, () => ({
		dismiss: () => flyoutRef.current?.dismiss(),
	}));

	return (
		<Flyout.Triggered
			ref={flyoutRef}
			trigger={trigger}
			verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT_OR_RIGHT}
			onDismiss={onDismiss}
		>
			<div className="control-flyout">{children}</div>
		</Flyout.Triggered>
	);
}

const ControlForwardRef = (props, ref) => (
	<ReadingEditorHeaderControl {...props} forwardRef={ref} />
);
export default React.forwardRef(ControlForwardRef);
