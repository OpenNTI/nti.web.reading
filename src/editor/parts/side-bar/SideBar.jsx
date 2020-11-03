import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {StandardUI, Text, FillToBottom} from '@nti/web-commons';
import {EditorGroup, ContextProvider} from '@nti/web-editor';

import {Locations} from '../Constants';

import styles from './SideBar.css';


const t = scoped('nti-reading.editor.parts.side-bar.View', {
	types: 'Types',
	defaultGroup: 'Formatting'
});

const DefaultGroup = t('defaultGroup');

ReadingEditorSidebar.Location = Locations.Sidebar;
ReadingEditorSidebar.propTypes = {
	customBlocks: PropTypes.arrayOf(
		PropTypes.shape({
			Button: PropTypes.any,
			group: PropTypes.string
		})
	),
	customBlockProps: PropTypes.object
};
export default function ReadingEditorSidebar ({customBlocks, customBlockProps = {}}) {
	const editor = EditorGroup.useFocusedEditor();

	const {groups, order} = customBlocks.reduce((acc, block) => {
		if (!block.Button) { return acc; }//skip custom blocks that don't have buttons

		const group = block.group ?? DefaultGroup;

		if (!acc.groups[group]) {
			acc.groups[group] = [];
			acc.order.push(group);
		}

		acc.groups[group].push(block);

		return acc;
	}, {groups: {}, order: []});

	return (
		<ContextProvider editor={editor}>
			<StandardUI.Card>
				<FillToBottom property="maxHeight" padding={60} className={styles.sidebar}>
					{order.map((group, index) => (
						<div key={index} className={styles.group}>
							<Text.Base className={styles.label}>{group}</Text.Base>
							<ul>
								{(groups[group] ?? []).map(({Button}, key) => (
									<li key={key}>
										<Button {...customBlockProps} />
									</li>
								))}
							</ul>
						</div>
					))}
				</FillToBottom>
			</StandardUI.Card>
		</ContextProvider>
	);
}
