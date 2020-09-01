import {STYLES} from '@nti/web-editor';

import Range from './Range';

export default class Literal extends Range {
	static rangeName = 'literal'
	static openChars = '``'
	static closeChars = '``'

	static matchOpen (inputInterface) {
		const input = inputInterface.get(0);
		const nextInput = inputInterface.get(1);

		return {matches: input === '`' && nextInput === '`', nextChar: inputInterface.get(2)};
	}

	getRanges (context) {
		const range = {style: STYLES.CODE, offset:context.charCount, length: this.length};

		return {
			inlineStyleRanges: [range]
		};
	}
}
