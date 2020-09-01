import React from 'react';
import PropTypes from 'prop-types';

import * as CustomBlocks from './custom-blocks';
import {Container, Content, ControlBar, Header, Sidebar} from './parts';

ReadingEditor.CustomBlocks = CustomBlocks;
ReadingEditor.Content = Content;
ReadingEditor.ControlBar = ControlBar;
ReadingEditor.Header = Header;
ReadingEditor.Sidebar = Sidebar;
ReadingEditor.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};
export default function ReadingEditor ({className, children}) {
	return (
		<Container className={className}>
			{children}
		</Container>
	);
}
