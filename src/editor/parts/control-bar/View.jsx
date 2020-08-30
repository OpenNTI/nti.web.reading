import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {ControlBar} from '@nti/web-commons';

import Styles from './Styles.css';
import {Locations} from '../Constants';

import EditorControls from './EditorControls';

const cx = classnames.bind(Styles);

ReadingEditorControlBar.Location = Locations.ControlBar;
ReadingEditorControlBar.propTypes = {
	className: PropTypes.string
};
export default function ReadingEditorControlBar ({className}) {
	return (
		<ControlBar visible>
			<div className={cx('control-bar')}>
				<EditorControls />
			</div>
		</ControlBar>
	);
}
