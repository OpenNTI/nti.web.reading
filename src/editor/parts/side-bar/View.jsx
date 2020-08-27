import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {StandardUI} from '@nti/web-commons';

import Styles from '../Styles.css';
import {Locations} from '../Constants';

const cx = classnames.bind(Styles);

ReadingEditorSidebar.Location = Locations.Sidebar;
ReadingEditorSidebar.propTypes = {
	contentBlocks: PropTypes.array
};
export default function ReadingEditorSidebar ({contentBlocks}) {
	return (
		<StandardUI.Card className={cx('sidebar')}>
			Side Bar
		</StandardUI.Card>
	);
}
