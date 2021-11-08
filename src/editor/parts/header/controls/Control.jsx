import React, { useImperativeHandle, useRef } from 'react';

import { Flyout, LabeledValue } from '@nti/web-commons';

const Trigger = styled(LabeledValue)`
	flex: 1 1 auto;
	max-width: 25%;
	padding: 0.5rem 0.625rem 0.625rem 1rem;
	box-shadow: inset -1px 0 0 0 var(--border-grey-light),
		-1px 0 0 0 var(--border-grey-light);

	&.disabled {
		pointer-events: none;
		opacity: 40%;
	}

	&:first-child {
		padding-left: var(--side-padding, 1rem);
		box-shadow: none;
	}
`;

/**
 * @typedef {object} Dismissable
 * @property {() => void} dismiss
 */

/**
 * @typedef {object} ControlProps
 * @property {React.ReactNode} label
 * @property {React.ReactNode} value
 * @property {boolean} disabled
 * @property {() => void} onDismiss
 */

/**
 * @param {ControlProps & React.HTMLAttributes<HTMLDivElement>} props
 * @param {Dismissable} ref
 * @returns {JSX.Element}
 */
function impl({ label, value, disabled, onDismiss, children }, ref) {
	const flyoutRef = useRef(null);
	const trigger = (
		<Trigger className="control" disabled={disabled} label={label} arrow>
			{value}
		</Trigger>
	);

	useImperativeHandle(ref, () => ({
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

/** @type {React.ForwardRefExoticComponent<ControlProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<Dismissable>>} */
export default React.forwardRef(impl);
