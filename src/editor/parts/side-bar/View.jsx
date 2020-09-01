import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {StandardUI, Text} from '@nti/web-commons';
import {EditorGroup, ContextProvider} from '@nti/web-editor';

import {Locations} from '../Constants';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.editor.parts.side-bar.View', {
	types: 'Types'
});

ReadingEditorSidebar.Location = Locations.Sidebar;
ReadingEditorSidebar.propTypes = {
	customBlocks: PropTypes.array
};
export default function ReadingEditorSidebar ({customBlocks}) {
	const editor = EditorGroup.useFocusedEditor();

	return (
		<ContextProvider editor={editor}>
			<StandardUI.Card className={cx('sidebar')}>
				<div className={cx('header')}>
					<Text.Base className={cx('tab', 'active')}>{t('types')}</Text.Base>
					<span className={cx('tab')} />
				</div>
				<ul className={cx('custom-blocks')}>
					{(customBlocks ?? []).map((customBlock, index) => {
						const {Button} = customBlock;

						if (!Button) { return null; }

						return (
							<li key={index}>
								<Button />
							</li>
						);
					})}
				</ul>
			</StandardUI.Card>
		</ContextProvider>
	);
}
