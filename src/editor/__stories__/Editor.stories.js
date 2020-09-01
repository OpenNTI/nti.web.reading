import React from 'react';
import {Page} from '@nti/web-commons';
import {BLOCKS} from '@nti/web-editor';

import Editor from '../Editor';

const {CustomBlocks} = Editor;

export default {
	title: 'Reading/Editor',
	component: Editor
};

export const Basic = () => (
	<Page>
		<Page.Content card={false}>
			<Editor>
				<Editor.Header />
				<Editor.Content>
					<Editor.Content.Title />
					<Editor.Content.Description />
					<Editor.Content.Body />
					<Editor.Content.Options>
						Test Options
					</Editor.Content.Options>
				</Editor.Content>
				<Editor.ControlBar />
				<Editor.Sidebar
					customBlocks={[
						CustomBlocks.BuiltInBlock.Build(BLOCKS.BLOCKQUOTE),
						CustomBlocks.BuiltInBlock.Build(BLOCKS.ORDERED_LIST_ITEM),
						CustomBlocks.BuiltInBlock.Build(BLOCKS.UNORDERED_LIST_ITEM)
					]}
				/>
			</Editor>
		</Page.Content>
	</Page>
);
