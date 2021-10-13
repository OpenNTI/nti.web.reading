
import { scoped } from '@nti/lib-locale';
import { BLOCKS } from '@nti/web-editor';

import Button from '../Button';

import Icon from './assets/icon-iframe.svg';
import { isIframeBlock } from './utils';
import { Name } from './Constants';
import Picker from './parts/Picker';

const t = scoped('web-reading.editor.custom-blocks.iframe.Button', {
	label: 'Iframe',
});

async function createBlock(insertBlock) {
	try {
		const iframeObj = await Picker.show();

		insertBlock(
			{
				type: BLOCKS.ATOMIC,
				text: '',
				data: {
					name: Name,
					body: [],
					arguments: iframeObj.src,
					options: iframeObj.attributes,
				},
			},
			false,
			true
		);
	} catch (e) {
		//swallow
	}
}

export default function IframeButton() {
	return (
		<Button
			label={t('label')}
			icon={Icon}
			createBlock={createBlock}
			isBlock={isIframeBlock}
			type={Name}
		/>
	);
}
