import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

Save.propTypes = {
	saveButton: PropTypes.node,
};
export default function Save({ saveButton }) {
	if (!saveButton) {
		return null;
	}

	return <div className={cx('reading-save')}>{saveButton}</div>;
}
