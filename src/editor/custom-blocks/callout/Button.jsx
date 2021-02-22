import React from 'react';
import { scoped } from '@nti/lib-locale';
import { BLOCKS } from '@nti/web-editor';

import Button from '../Button';

import Icon from './assets/icon-callout.svg';
import { isCalloutBlock } from './utils';
import { Name } from './Constants';

const t = scoped('web-reading.editor.custom-blocks.callout.Button', {
	label: 'Call Out',
});

function createBlock(insertBlock) {
	insertBlock({
		type: BLOCKS.ATOMIC,
		text: '',
		data: {
			name: 'sidebar',
			arguments: '',
			body: [],
			options: {},
		},
	});
}

export default function CallOutButton() {
	return (
		<Button
			label={t('label')}
			icon={Icon}
			createBlock={createBlock}
			isBlock={isCalloutBlock}
			type={Name}
		/>
	);
}
