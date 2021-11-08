import cx from 'classnames';

import Control from './Control';

const PropMapper = props => ({
	...props,
	className: cx('reading-editor-controls', props.className),
});

const Controls = styled('div').attrs(PropMapper)`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	background: white;
	border-bottom: 1px solid var(--border-grey-light);
`;

Controls.Control = Control;

export default Controls;
