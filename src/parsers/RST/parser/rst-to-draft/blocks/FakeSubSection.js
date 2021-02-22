import { BLOCKS } from '@nti/web-editor';

import Directive, { buildDirectiveRegex } from './Directive';
import Text from './Text';

const FAKE_SUB_SECTION = buildDirectiveRegex('fakesubsection');

export default class FakeSubSection extends Directive {
	static isNextBlock(inputInterface) {
		const current = inputInterface.get(0);

		return FAKE_SUB_SECTION.test(current);
	}

	getOutput(context) {
		const text = new Text(this.arguments);
		const { output, context: newContext } = text.getOutput(context);

		return {
			output: {
				...output,
				type: BLOCKS.HEADER_THREE,
				depth: 0,
				data: this.blockData,
			},
			context: newContext,
		};
	}
}
