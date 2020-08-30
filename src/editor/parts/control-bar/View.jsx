import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {ControlBar} from '@nti/web-commons';
import {EditorGroup, ContextProvider} from '@nti/web-editor';

import Styles from './Styles.css';
import {Locations} from '../Constants';

import BlockFormat from './BlockFormat';
import InlineFormat from './InlineFormat';

const cx = classnames.bind(Styles);

ReadingEditorControlBar.Location = Locations.ControlBar;
ReadingEditorControlBar.propTypes = {
	className: PropTypes.string
};
export default function ReadingEditorControlBar ({className}) {
	const editor = EditorGroup.useFocusedEditor();

	return (
		<ContextProvider editor={editor}>
			<ControlBar visible>
				<div className={cx('control-bar')}>
					<BlockFormat />
					<InlineFormat />
				</div>
			</ControlBar>
		</ContextProvider>
	);
}
