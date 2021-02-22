/* eslint-env jest */
import { STYLES } from '@nti/web-editor';

import parseText from '../parseText';

describe('parseText', () => {
	test('block with bold', () => {
		const block = {
			text: 'This is a block with bold and some plain',
			inlineStyleRanges: [
				{
					style: STYLES.BOLD,
					offset: 21,
					length: 4,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual('This is a block with **bold** and some plain');
	});

	test('block with underline', () => {
		const block = {
			text: 'This is a block with underline and some plain',
			inlineStyleRanges: [
				{
					style: STYLES.UNDERLINE,
					offset: 21,
					length: 9,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual(
			'This is a block with :underline:`underline` and some plain'
		);
	});

	test('Cleans up leading space', () => {
		const block = {
			text: 'This is a block with bold',
			inlineStyleRanges: [
				{
					style: STYLES.BOLD,
					offset: 20,
					length: 5,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual('This is a block with **bold**');
	});

	test('Cleans up trailing space', () => {
		const block = {
			text: 'This is a block with bold ',
			inlineStyleRanges: [
				{
					style: STYLES.BOLD,
					offset: 21,
					length: 6,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual('This is a block with **bold** ');
	});

	test('Cleans up leading and trailing space', () => {
		const block = {
			text: 'This is a block with bold ',
			inlineStyleRanges: [
				{
					style: STYLES.BOLD,
					offset: 20,
					length: 6,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual('This is a block with **bold** ');
	});

	test('escapes rst thats not in a range', () => {
		const block = {
			text: 'This is a block with * rst chars ** : = !',
			inlineStyleRanges: [],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual(
			'This is a block with \\* rst chars \\*\\* \\: \\= \\!'
		);
	});

	test('escapes rst thats in a range', () => {
		const block = {
			text:
				'This is a block with * = ! plus bold and * rst chars ** : = !',
			inlineStyleRanges: [
				{
					style: STYLES.BOLD,
					offset: 32,
					length: 29,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual(
			'This is a block with \\* \\= \\! plus **bold and \\* rst chars \\*\\* \\: \\= \\!**'
		);
	});

	test('Handles multiple ranges', () => {
		const block = {
			text:
				'This is plain. This is bold. This is bold underline. This is bold underline italic.',
			inlineStyleRanges: [
				{
					style: STYLES.BOLD,
					offset: 14,
					length: 69,
				},
				{
					style: STYLES.UNDERLINE,
					offset: 29,
					length: 54,
				},
				{
					style: STYLES.ITALIC,
					offset: 53,
					length: 30,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual(
			'This is plain\\. **This is bold\\.** :boldunderline:`This is bold underline\\.` \\ :bolditalicunderline:`This is bold underline italic\\.`'
		);
	});

	test('Handles touching ranges', () => {
		const block = {
			text: 'This block has underline, bolditalic, and italicunderline',
			inlineStyleRanges: [
				{
					style: STYLES.UNDERLINE,
					offset: 15,
					length: 9,
				},
				{
					style: STYLES.BOLD,
					offset: 24,
					length: 12,
				},
				{
					style: STYLES.ITALIC,
					offset: 24,
					length: 33,
				},
				{
					style: STYLES.UNDERLINE,
					offset: 36,
					length: 21,
				},
			],
			entityRanges: [],
		};
		const parsed = parseText(block, {});

		expect(parsed).toEqual(
			'This block has :underline:`underline`\\ :bolditalic:`\\, bolditalic`\\ :italicunderline:`\\, and italicunderline`'
		);
	});

	//TODO: add more tests
});
