import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {ControlBar} from '@nti/web-commons';
import {EditorGroup, ContextProvider} from '@nti/web-editor';

import {Locations} from '../Constants';

import Styles from './Styles.css';
import BlockFormat from './BlockFormat';
import InlineFormat from './InlineFormat';
import Status from './Status';
import Save from './Save';

const cx = classnames.bind(Styles);

ReadingEditorControlBar.Location = Locations.ControlBar;
ReadingEditorControlBar.propTypes = {
	className: PropTypes.string
};
export default function ReadingEditorControlBar ({className, ...otherProps}) {
	const editor = EditorGroup.useFocusedEditor();

	return (
		<ContextProvider editor={editor}>
			<ControlBar visible>
				<div className={cx('control-bar')}>
					<BlockFormat {...otherProps} />
					<InlineFormat {...otherProps} />
					<div className={cx('spacer')} />
					<Status {...otherProps} />
					<Save {...otherProps} />
				</div>
			</ControlBar>
		</ContextProvider>
	);
}
