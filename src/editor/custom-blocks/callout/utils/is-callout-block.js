import {BLOCKS} from '@nti/web-editor';

export default function isCalloutBlock (block) {
	const type = block.getType();
	const data = block.getData();

	return type === BLOCKS.ATOMIC && data.get('name') === 'sidebar';
}
