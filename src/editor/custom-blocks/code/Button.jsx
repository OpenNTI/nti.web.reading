import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {BLOCKS} from '@nti/web-editor';

import Button from '../Button';

import Icon from './assets/icon-codeblock.svg';
import {isCodeBlock} from './utils';
import {Name} from './Constants';

const t = scoped('web-reading.editor.custom-blocks.code.Button', {
	label: 'Code'
});

function createBlock (insertBlock) {
	insertBlock({
		type: BLOCKS.ATOMIC,
		text: '',
		data: {
			name: Name,
			arguments: 'java',
			body: [],
			options: {}
		}
	});
}

export default function CodeButton () {
	return (
		<Button
			label={t('label')}
			icon={Icon}
			createBlock={createBlock}
			isBlock={isCodeBlock}
			type={Name}
		/>
	);
}
