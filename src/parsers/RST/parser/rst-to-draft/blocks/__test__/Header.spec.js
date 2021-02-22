/* eslint-env jest */
import { BLOCKS } from '@nti/web-editor';

import Header, { LEVEL_TO_TYPE } from '../Header';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { getInterface } from '../../../Parser';

describe('Header', () => {
	describe('isValidOverlined', () => {
		test('No currentBlock, and a valid underline', () => {
			const input = ['===', 'asd', '==='];
			const inputInterface = getInterface(0, input);
			const parsedInterface = getInterface(0, []);

			expect(
				Header.isValidOverlined(inputInterface, {}, parsedInterface)
			).toBeTruthy();
		});

		test('No currentBlock, and underline is too short', () => {
			const input = ['===', 'asd', '=='];
			const inputInterface = getInterface(0, input);
			const parsedInterface = getInterface(0, []);

			expect(
				Header.isValidOverlined(inputInterface, {}, parsedInterface)
			).toBeFalsy();
		});

		test('Non-paragraph currentBlock, and the the overline is too short for the text', () => {
			const input = ['==', 'asd', '=='];
			const inputInterface = getInterface(0, input);
			const parsedInterface = getInterface(1, [{ isParagraph: false }]);

			expect(
				Header.isValidOverlined(inputInterface, {}, parsedInterface)
			).toBeFalsy();
		});

		test('No currentBlock, and the text is indented with overline and underline 1 character longer', () => {
			const input = ['=====', ' asd', '====='];
			const inputInterface = getInterface(0, input);
			const parsedInterface = getInterface(0, []);

			expect(
				Header.isValidOverlined(inputInterface, {}, parsedInterface)
			).toBeTruthy();
		});

		test('No currentBlock, and the text is indented with overline and underline the same length', () => {
			const input = ['=====', ' asd ', '====='];
			const inputInterface = getInterface(0, input);
			const parsedInterface = getInterface(0, []);

			expect(
				Header.isValidOverlined(inputInterface, {}, parsedInterface)
			).toBeTruthy();
		});
	});

	describe('isValidUnderline', () => {
		test('One line paragraph, no open header, right length is true', () => {
			const input = ['asd', '==='];
			const inputInterface = getInterface(1, input);
			const parsedInterface = getInterface(0, [
				{ isParagraph: true, isOneLine: true },
			]);

			expect(
				Header.isValidUnderlined(inputInterface, {}, parsedInterface)
			).toBeTruthy();
		});

		test('Current header with the incorrect char is false', () => {
			const input = ['asd', '==='];
			const inputInterface = getInterface(1, input);
			const parsedInterface = getInterface(0, [
				{ isParagraph: true, isOneLine: true },
			]);

			expect(
				Header.isValidUnderlined(
					inputInterface,
					{ openHeader: { char: '+', length: 3 } },
					parsedInterface
				)
			).toBeFalsy();
		});

		test('Current header with incorrect length', () => {
			const input = ['asd', '==='];
			const inputInterface = getInterface(1, input);
			const parsedInterface = getInterface(0, [
				{ isParagraph: true, isOneLine: true },
			]);

			expect(
				Header.isValidUnderlined(
					inputInterface,
					{ openHeader: { char: '=', length: 4 } },
					parsedInterface
				)
			).toBeFalsy();
		});

		test("Current header is a match, but text length isn't is true", () => {
			const input = [' asd', '====='];
			const inputInterface = getInterface(1, input);
			const parsedInterface = getInterface(0, [
				{ isParagraph: true, isOneLine: true },
			]);

			expect(
				Header.isValidUnderlined(
					inputInterface,
					{ openHeader: { char: '=', length: 5 } },
					parsedInterface
				)
			).toBeTruthy();
		});
	});

	describe('isValidHeader', () => {
		test('Matches Headers', () => {
			const chars = [
				'=',
				'-',
				'`',
				':',
				'.',
				"'",
				'"',
				'~',
				'^',
				'_',
				'*',
				'+',
				'#',
			];

			for (let char of chars) {
				let rst = `${char}${char}${char}`;
				let inputInterface = getInterface(0, [rst]);

				expect(Header.isValidHeader(inputInterface)).toBeTruthy();
			}
		});

		test('Does not match non headers', () => {
			const rst = 'paragraph';
			const inputInterface = getInterface(0, [rst]);

			expect(Header.isNextBlock(inputInterface)).toBeFalsy();
		});
	});

	describe('parse', () => {
		test('Seeing the same header more than once keeps the same level', () => {
			const rst = '===';
			const inputInterface = getInterface(0, [rst]);
			const parsedInterface = getInterface(0, []);
			const { context } = Header.parse(
				inputInterface,
				{},
				parsedInterface
			);

			expect(context.headerLevels.charToLevel['=']).toEqual(1);

			const { context: newContext } = Header.parse(
				inputInterface,
				context,
				parsedInterface
			);

			expect(newContext.headerLevels.charToLevel['=']).toEqual(1);
		});

		test('Increases depth with new characters until it reaches 6', () => {
			const chars = ['=', '-', ':', '.', '^', '_', '*', '+', '#'];
			let context = {};

			for (let char of chars) {
				let rst = `${char}${char}${char}`;
				let inputInterface = getInterface(0, [rst]);
				let parsedInterface = getInterface(0, []);
				let { context: newContext } = Header.parse(
					inputInterface,
					context,
					parsedInterface
				);

				//Close the header for the purposes of this test
				delete newContext.openHeader;
				context = newContext;
			}

			expect(context.headerLevels.charToLevel['=']).toEqual(1);
			expect(context.headerLevels.charToLevel['-']).toEqual(2);
			expect(context.headerLevels.charToLevel[':']).toEqual(3);
			expect(context.headerLevels.charToLevel['.']).toEqual(4);
			expect(context.headerLevels.charToLevel['^']).toEqual(5);
			expect(context.headerLevels.charToLevel['_']).toEqual(6);
			expect(context.headerLevels.charToLevel['*']).toEqual(6);
			expect(context.headerLevels.charToLevel['+']).toEqual(6);
			expect(context.headerLevels.charToLevel['#']).toEqual(6);
		});

		test('No currentBlock just marks a header open, does not return a block', () => {
			const rst = '===';
			const inputInterface = getInterface(0, [rst]);
			const parsedInterface = getInterface(0, []);
			const { block, context } = Header.parse(
				inputInterface,
				{},
				parsedInterface
			);

			expect(block).toBeFalsy();
			expect(context.openHeader).toBeTruthy();
		});

		test('When currentBlock is a paragraph, it gets consumed, and a header block is returned', () => {
			const rst = '===';
			const paragraph = new Paragraph('paragraph', '', {});
			const inputInterface = getInterface(0, [rst]);
			const parsedInterface = getInterface(0, [paragraph]);
			const { block, context } = Header.parse(
				inputInterface,
				{ openHeader: '=' },
				parsedInterface
			);

			expect(block).toBeTruthy();
			expect(context.openHeader).toBeFalsy();
			expect(paragraph.isConsumed).toBeTruthy();
		});
	});

	describe('Instance Tests', () => {
		test('Returns the correct type for the level without starting HeaderLevel', () => {
			const textBlock = new Paragraph('paragraph', '', {
				text: new Text('paragraph'),
			});

			for (let i = 0; i <= 6; i++) {
				let block = new Header('++++', '', {
					level: i,
					char: '+',
					textBlock,
				});
				let { output } = block.getOutput({});

				expect(output.type).toEqual(LEVEL_TO_TYPE[i]);
			}
		});

		test('Returns the correct type for level with startingHeaderLevel', () => {
			const textBlock = new Paragraph('paragraph', '', {
				text: new Text('paragraph'),
			});
			const expectedType = {
				1: BLOCKS.HEADER_THREE,
				2: BLOCKS.HEADER_FOUR,
				3: BLOCKS.HEADER_FIVE,
				4: BLOCKS.HEADER_SIX,
				5: BLOCKS.HEADER_SIX,
				6: BLOCKS.HEADER_SIX,
			};

			for (let i = 1; i <= 6; i++) {
				let block = new Header('++++', '', {
					level: i,
					char: '+',
					textBlock,
				});
				let { output } = block.getOutput(
					{},
					{ startingHeaderLevel: 3 }
				);

				expect(output.type).toEqual(expectedType[i]);
			}
		});

		test('Returns the correct text', () => {
			const text = 'paragraph';
			const textBlock = new Paragraph(text, '', { text: new Text(text) });
			const block = new Header('+++', '', {
				level: 1,
				char: '+',
				textBlock,
			});
			const { output } = block.getOutput({});

			expect(output.text).toEqual(text);
		});
	});
});
