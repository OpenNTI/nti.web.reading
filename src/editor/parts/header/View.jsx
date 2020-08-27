import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from '../Styles.css';
import {Locations} from '../Constants';

const cx = classnames.bind(Styles);

ReadingEditorHeader.Location = Locations.Header;
ReadingEditorHeader.propTypes = {
	children: PropTypes.any
};
export default function ReadingEditorHeader ({children}) {
	return (
		<div className={cx('header')}>
			<div className={cx('bar')}>

			</div>
			<div className={cx('controls')}>
				{children}
			</div>
		</div>
	);
}
