/* eslint-env jest */
import {STYLES} from '@nti/web-editor';

import parseRange from '../parseRange';

describe('parseRange', () => {
	test('Multiple Leading Whitespaces', () => {
		const ranges = {styles: [STYLES.BOLD]};
		const parsed = parseRange(ranges, '    bold');

		expect(parsed).toEqual('    **bold**');
	});

	test('Multiple Trailing Whitespaces', () => {
		const ranges = {styles: [STYLES.BOLD]};
		const parsed = parseRange(ranges, 'bold    ');

		expect(parsed).toEqual('**bold**    ');
	});

	test('Multiple Leading and Trailing Whitespaces', () => {
		const ranges = {styles: [STYLES.BOLD]};
		const parsed = parseRange(ranges, '    bold    ');

		expect(parsed).toEqual('    **bold**    ');
	});

	describe('Bold', () => {
		test('No leading or trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD]};
			const parsed = parseRange(ranges, 'bold');

			expect(parsed).toEqual('**bold**');
		});

		test('Leading whitespace', () => {
			const ranges = {styles: [STYLES.BOLD]};
			const parsed = parseRange(ranges, ' bold');

			expect(parsed).toEqual(' **bold**');
		});

		test('Trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD]};
			const parsed = parseRange(ranges, 'bold ');

			expect(parsed).toEqual('**bold** ');
		});

		test('Leading and trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD]};
			const parsed = parseRange(ranges, ' bold ');

			expect(parsed).toEqual(' **bold** ');
		});
	});

	describe('Italic', () => {
		test('No leading or trailing whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC]};
			const parsed = parseRange(ranges, 'italic');

			expect(parsed).toEqual('*italic*');
		});

		test('Leading whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC]};
			const parsed = parseRange(ranges, ' italic');

			expect(parsed).toEqual(' *italic*');
		});

		test('Trailing whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC]};
			const parsed = parseRange(ranges, 'italic ');

			expect(parsed).toEqual('*italic* ');
		});

		test('Leading and trailing whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC]};
			const parsed = parseRange(ranges, ' italic ');

			expect(parsed).toEqual(' *italic* ');
		});
	});

	describe('Underline', () => {
		test('No leading or trailing whitespace', () => {
			const ranges = {styles: [STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'underline');

			expect(parsed).toEqual(':underline:`underline`');
		});

		test('Leading whitespace', () => {
			const ranges = {styles: [STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' underline');

			expect(parsed).toEqual(' :underline:`underline`');
		});

		test('Trailing whitespace', () => {
			const ranges = {styles: [STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'underline ');

			expect(parsed).toEqual(':underline:`underline` ');
		});

		test('Leading and trailing whitespace', () => {
			const ranges = {styles: [STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' underline ');

			expect(parsed).toEqual(' :underline:`underline` ');
		});

		test('Preceded by another Role', () => {
			const ranges = {styles: [STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'underline', {}, {styles: [STYLES.UNDERLINE]} );

			expect(parsed).toEqual('\\ :underline:`underline`');
		});
	});

	describe('Bold Italic', () => {
		test('No leading or trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC]};
			const parsed = parseRange(ranges, 'bolditalic');

			expect(parsed).toEqual(':bolditalic:`bolditalic`');
		});

		test('Leading whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC]};
			const parsed = parseRange(ranges, ' bolditalic');

			expect(parsed).toEqual(' :bolditalic:`bolditalic`');
		});

		test('Trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC]};
			const parsed = parseRange(ranges, 'bolditalic ');

			expect(parsed).toEqual(':bolditalic:`bolditalic` ');
		});

		test('Leading and trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC]};
			const parsed = parseRange(ranges, ' bolditalic ');

			expect(parsed).toEqual(' :bolditalic:`bolditalic` ');
		});

		test('Preceded by another Role', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC]};
			const parsed = parseRange(ranges, 'bolditalic', {}, {styles: [STYLES.UNDERLINE]} );

			expect(parsed).toEqual('\\ :bolditalic:`bolditalic`');
		});
	});

	describe('Bold Underline', () => {
		test('No leading or trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'boldunderline');

			expect(parsed).toEqual(':boldunderline:`boldunderline`');
		});

		test('Leading whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' boldunderline');

			expect(parsed).toEqual(' :boldunderline:`boldunderline`');
		});

		test('Trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'boldunderline ');

			expect(parsed).toEqual(':boldunderline:`boldunderline` ');
		});

		test('Leading and trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' boldunderline ');

			expect(parsed).toEqual(' :boldunderline:`boldunderline` ');
		});

		test('Preceded by another Role', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'boldunderline', {}, {styles: [STYLES.UNDERLINE]} );

			expect(parsed).toEqual('\\ :boldunderline:`boldunderline`');
		});
	});


	describe('Italic Underline', () => {
		test('No leading or trailing whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'italicunderline');

			expect(parsed).toEqual(':italicunderline:`italicunderline`');
		});

		test('Leading whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' italicunderline');

			expect(parsed).toEqual(' :italicunderline:`italicunderline`');
		});

		test('Trailing whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'italicunderline ');

			expect(parsed).toEqual(':italicunderline:`italicunderline` ');
		});

		test('Leading and trailing whitespace', () => {
			const ranges = {styles: [STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' italicunderline ');

			expect(parsed).toEqual(' :italicunderline:`italicunderline` ');
		});

		test('Preceded by another Role', () => {
			const ranges = {styles: [STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'italicunderline', {}, {styles: [STYLES.BOLD, STYLES.ITALIC]});

			expect(parsed).toEqual('\\ :italicunderline:`italicunderline`');
		});
	});

	describe('Bold Italic Underline', () => {
		test('No leading or trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'bolditalicunderline');

			expect(parsed).toEqual(':bolditalicunderline:`bolditalicunderline`');
		});

		test('Leading whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' bolditalicunderline');

			expect(parsed).toEqual(' :bolditalicunderline:`bolditalicunderline`');
		});

		test('Trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'bolditalicunderline ');

			expect(parsed).toEqual(':bolditalicunderline:`bolditalicunderline` ');
		});

		test('Leading and trailing whitespace', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, ' bolditalicunderline ');

			expect(parsed).toEqual(' :bolditalicunderline:`bolditalicunderline` ');
		});

		test('Preceded by another Role', () => {
			const ranges = {styles: [STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE]};
			const parsed = parseRange(ranges, 'bolditalicunderline', {}, {styles: [STYLES.BOLD, STYLES.UNDERLINE]});

			expect(parsed).toEqual('\\ :bolditalicunderline:`bolditalicunderline`');
		});
	});

	//TODO: Add more tests here
});
