import React from 'react';
import classnames from 'classnames/bind';

import Styles from './Styles.css';
import Control from './Control';

const cx = classnames.bind(Styles);

ReadingEditorHeaderControls.Control = Control;
export default function ReadingEditorHeaderControls (props) {
	return (
		<div className={cx('reading-editor-controls')} {...props} />
	);
}
