import React from 'react';
import {Page} from '@nti/web-commons';

import Editor from '../Editor';

export default {
	title: 'Reading/Editor',
	component: Editor
};

export const Basic = () => (
	<Page>
		<Page.Content card={false}>
			<Editor>
				<Editor.Header />
				<Editor.Content />
				<Editor.ControlBar />
				<Editor.Sidebar />
			</Editor>
		</Page.Content>
	</Page>
);
