/* eslint-env jest */
import UnorderedListItem from '../UnorderedListItem';
import Paragraph from '../Paragraph';
import Text from '../Text';
import {getInterface} from '../../../Parser';

describe('Unordered List Item', () => {
	describe('isNextBlock', () => {
		test('Matches Unordered List Item depth 0', () => {
			const test = '- unordered list item';
			const inputInterface = getInterface(0, [test]);

			expect(UnorderedListItem.isNextBlock(inputInterface)).toBeTruthy();
		});

		test('Matches Unordered List Item depth 1', () => {
			const test = '	- nested unordered list item';
			const inputInterface = getInterface(0, [test]);

			expect(UnorderedListItem.isNextBlock(inputInterface)).toBeTruthy();
		});

		test('Does not match non unordered list item', () => {
			const test = 'not an unordered list item';
			const inputInterface = getInterface(0, [test]);

			expect(UnorderedListItem.isNextBlock(inputInterface)).toBeFalsy();
		});
	});

	describe('Parsing', () => {
		test('Parses Test', () => {
			const test = 'unordered list item';
			const inputInterface = getInterface(0, [`- ${test}`]);
			const {block} = UnorderedListItem.parse(inputInterface);

			expect(block.text.text).toEqual(test);
		});


		test('Parses Depth', () => {
			const tests = [
				'- nested',
				'	- nested',
				'		- nested',
				'			- nested',
				'				- nested',
				'					- nested'
			];

			for (let i = 0; i < tests.length; i++) {
				let test = tests[i];
				let inputInterface = getInterface(0, [test]);
				let {block} = UnorderedListItem.parse(inputInterface);

				expect(block.depth).toEqual(i);
			}
		});
	});

	describe('Instance Tests', () => {
		test('Should append paragraphs that are the same offset', () => {
			const unorderedListItem = new UnorderedListItem('- Unordered List Item', '-');
			const paragraph = new Paragraph('  Paragraph', '', {text: new Text('  Paragraph')});

			expect(unorderedListItem.shouldAppendBlock(paragraph)).toBeTruthy();
		});


		test('Does not append paragraphs that are not the same offset', () => {
			const unorderedListItem = new UnorderedListItem('- Unordered List Item', '-');
			const paragraph = new Paragraph('Paragraph', '', {text: new Text('Paragraph')});

			expect(unorderedListItem.shouldAppendBlock(paragraph)).toBeFalsy();
		});

		test('Appending text adds it to the previous line', () => {
			const unorderedListItem = new UnorderedListItem('- Unordered', '-', {text: new Text('Unordered')});
			const paragraph = new Paragraph('  List item', '', {text: new Text(' List Item')});

			unorderedListItem.appendBlock(paragraph);

			expect(unorderedListItem.parts.text.text).toEqual('Unordered List Item');
		});
	});
});
