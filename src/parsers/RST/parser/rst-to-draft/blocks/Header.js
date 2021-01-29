import {BLOCKS} from '@nti/web-editor';

import IndentedBlock from './IndentedBlock';

function isValidHeaderLineLength (text, header) {
	return header.length >= text.length;
}

function fixLevel (level, options) {
	const offset = (options && options.startingHeaderLevel) || 1;

	return Math.min(level + (offset - 1), 6);
}


//Checks if the line is the same header character repeating
//= - ` : . ' " ~ ^ _ * + #
const IS_LINE_HEADER_REGEX = /^([=\-+`:.'"~^_*#])\1+$/;

export const LEVEL_TO_TYPE = {
	1: BLOCKS.HEADER_ONE,
	2: BLOCKS.HEADER_TWO,
	3: BLOCKS.HEADER_THREE,
	4: BLOCKS.HEADER_FOUR,
	5: BLOCKS.HEADER_FIVE,
	6: BLOCKS.HEADER_SIX
};

export default class Header extends IndentedBlock {
	static isValidHeader (inputInterface) {
		const current = inputInterface.get(0);

		return IS_LINE_HEADER_REGEX.test(current);
	}

	static isValidOverlined (inputInterface, context, parsedInterface) {
		const currentBlock = parsedInterface.get(0);
		const overline = inputInterface.get(0);
		const text = inputInterface.get(1);
		const underline = inputInterface.get(2);

		//We aren't a valid overlined header unless the line after next is a valid underlined header,
		//meaning its the same length and char as the overline
		return (!currentBlock || !currentBlock.isParagraph) &&
				overline === underline &&
				isValidHeaderLineLength(text, overline);
	}

	static isValidUnderlined (inputInterface, context, parsedInterface) {
		const currentBlock = parsedInterface.get(0);
		const underline = inputInterface.get(0);
		const text = inputInterface.get(-1);
		const char = underline.charAt(0);

		//If there is an open header and we are the same char and length we match it
		const matchesOpenHeader = context.openHeader && (context.openHeader.char === char && context.openHeader.length === underline.length);
		//If there is no open header and we are the same length as the text we match it
		const matchesText = !context.openHeader && isValidHeaderLineLength(text, underline);

		return currentBlock && currentBlock.isParagraph && currentBlock.isOneLine &&//if the current block is one line of text
				(matchesOpenHeader || matchesText);//and we match the open header or the text
	}


	static isNextBlock (inputInterface, context, parsedInterface) {
		return this.isValidHeader(inputInterface) &&
				(this.isValidOverlined(inputInterface, context, parsedInterface) || this.isValidUnderlined(inputInterface, context, parsedInterface));
	}


	static parse (inputInterface, context, parsedInterface) {
		if (!context.headerLevels) {
			context.headerLevels = {
				charToLevel: {},
				currentLevel: 0
			};
		}

		const currentBlock = parsedInterface.get(0);
		const input = inputInterface.get(0);
		const char = input.charAt(0);

		//If we haven't seen this character yet, add it to the levels
		//make sure we don't go beyond 6 levels
		if (!context.headerLevels.charToLevel[char]) {
			context.headerLevels.currentLevel = Math.min(6, context.headerLevels.currentLevel + 1);
			context.headerLevels.charToLevel[char] = context.headerLevels.currentLevel;
		}

		const level = context.headerLevels.charToLevel[char];
		let newBlock;
		let newContext = {...context};

		//If there is no open block or the current block is not a paragraph, just mark the header being open
		if (!currentBlock || currentBlock.isEmpty) {
			newContext.openHeader = {
				char,
				length: input.length
			};
		//If we just parsed a text block, close any open header and return a header block
		} else {
			delete newContext.openHeader;

			//The text block will be used in the new header block, so consume the text block
			//to prevent it from being output.
			currentBlock.consume();

			newBlock = new this(input, '', {level, char, textBlock: currentBlock});
		}

		return {block: newBlock, context: newContext};
	}

	isHeader = true


	getOutput (context, options) {
		const {level, char, textBlock} = this.parts;
		const type = LEVEL_TO_TYPE[fixLevel(level, options)];
		const {output, context:newContext} = textBlock.getOutput(context, true);
		const data = output.data ? {...this.blockData, ...output.data, char} : {char};

		return {output: {...output, type, data}, newContext};
	}
}
