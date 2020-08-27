import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {ControlBar} from '@nti/web-commons';

import Styles from '../Styles.css';
import {Locations} from '../Constants';

const cx = classnames.bind(Styles);

ReadingEditorControlBar.Location = Locations.ControlBar;
ReadingEditorControlBar.propTypes = {
	className: PropTypes.string,
	breadcrumb: PropTypes.array,
	pageSource: PropTypes.object,
	children: PropTypes.any
};
export default function ReadingEditorControlBar ({className, breadcrumb, pageSource, children}) {
	return (
		<ControlBar className={cx('control-bar')} visible>
			Control Bar
		</ControlBar>
	);
}
