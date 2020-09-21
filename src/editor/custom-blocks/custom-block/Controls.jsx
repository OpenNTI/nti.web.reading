import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Button, Icons} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const stop = (e) => e.stopPropagation();

CustomBlockControls.propTypes = {
	className: PropTypes.string,

	block: PropTypes.object,
	blockProps: PropTypes.shape({
		removeBlock: PropTypes.func
	})
};
export default function CustomBlockControls ({className, blockProps}) {
	const {removeBlock} = blockProps ?? {};

	return (
		<div className={cx('custom-reading-block-contols', className)}>
			{removeBlock && (
				<Button plain className={cx('remove')} onClick={(e) => (stop(e), removeBlock())}>
					<Icons.X />
				</Button>
			)}
		</div>
	);
}
