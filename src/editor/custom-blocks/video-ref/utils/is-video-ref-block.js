import {BLOCKS} from '@nti/web-editor';

import {Name} from '../Constants';

export default function isVideoRefBlock (block) {
	const type = block.getType();
	const data = block.getData();

	return type === BLOCKS.ATOMIC && data.get('name') === Name;
}
