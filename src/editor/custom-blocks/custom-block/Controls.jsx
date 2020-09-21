import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Button, Icons, Text} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const stop = (e) => e.stopPropagation();

CustomBlockControls.propTypes = {
	className: PropTypes.string,

	onChange: PropTypes.func,
	changeLabel: PropTypes.string,
	changeIcon: PropTypes.node,

	block: PropTypes.object,
	blockProps: PropTypes.shape({
		removeBlock: PropTypes.func
	})
};
export default function CustomBlockControls ({
	className,
	blockProps,

	onChange,
	changeLabel,
	changeIcon = (<Icons.Pencil />)
}) {
	const {removeBlock} = blockProps ?? {};

	return (
		<div className={cx('custom-reading-block-contols', className)}>
			{onChange && (
				<Button plain className={cx('edit')} onClick={(e) => (stop(e), onChange())}>
					{changeIcon}
					<Text.Base>{changeLabel}</Text.Base>
				</Button>
			)}
			{removeBlock && (
				<Button plain className={cx('remove')} onClick={(e) => (stop(e), removeBlock())}>
					<Icons.X />
				</Button>
			)}
		</div>
	);
}
