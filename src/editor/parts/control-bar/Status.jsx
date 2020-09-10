import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Errors} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

Status.propTypes = {
	errors: PropTypes.any,
	saving: PropTypes.bool
};
export default function Status ({errors, saving}) {
	const hasErrors = Array.isArray(errors) ? errors.length > 0 : Boolean(errors);

	return (
		<div className={cx('status')}>
			{!saving && hasErrors && (<Errors.List.Flyout errors={errors} />)}
		</div>
	);
}
