import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Editor} from '@nti/web-editor';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

BodyEditor.propTypes = {
	className: PropTypes.string,
	error: PropTypes.any
};
export default function BodyEditor ({className, error, ...otherProps}) {
	return (
		<div className={cx('body', className)}>
			<Editor {...otherProps} />
		</div>
	);
}
