import React from 'react';

import * as CustomBlocks from './custom-blocks';
import { Container, Content, ControlBar, Header, Sidebar } from './parts';

ReadingEditor.CustomBlocks = CustomBlocks;
ReadingEditor.Content = Content;
ReadingEditor.ControlBar = ControlBar;
ReadingEditor.Header = Header;
ReadingEditor.Sidebar = Sidebar;
export default function ReadingEditor(props) {
	return <Container {...props} />;
}
