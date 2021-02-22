import { BLOCKS } from '@nti/web-editor';

import parseText from '../text-parser';

const BLOCK = Symbol('Block');

export default class BlockQuote {
	static isNextBlock(inputInterface) {
		const input = inputInterface.get(0);
		return input.type === BLOCKS.BLOCKQUOTE;
	}

	static parse(inputInterface) {
		const input = inputInterface.get(0);

		return {
			block: new this(input),
		};
	}

	constructor(block) {
		this[BLOCK] = block;
	}

	getOutput(context) {
		if (!this[BLOCK].text) {
			return {};
		}

		const output = [
			'.. Empty comment to isolate the block quote',
			'..',
			'',
			`\t ${parseText(this[BLOCK], context)}`,
		];

		return { output };
	}
}
