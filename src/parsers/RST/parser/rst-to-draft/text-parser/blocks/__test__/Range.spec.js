/* eslint-env jest */
import Range from '../Range';
import Plaintext from '../Plaintext';
import {getInterface} from '../../../../Parser';


describe('Range', () => {
	describe('isNextBlock', () => {
		test('False if next char is whitespace', () => {
			const test = ['', ' ', 't', 'e', 's', 't'];
			const inputInterface = getInterface(0, test);

			expect(Range.isNextBlock(inputInterface, {})).toBeFalsy();
		});

		test('False if wrapped in parenthesis', () => {
			const test = ['(', '', ')', 't', 'e', 's', 't'];
			const inputInterface = getInterface(1, test);

			expect(Range.isNextBlock(inputInterface, {})).toBeFalsy();
		});

		test('False if parsing another range', () => {
			const test = ['', 't', 'e', 's', 't'];
			const inputInterface = getInterface(0, test);

			expect(Range.isNextBlock(inputInterface, {openRange: 'other'})).toBeFalsy();
		});

		test('False if range is open and invalid close', () => {
			const test = [' ', ''];
			const inputInterface = getInterface(1, test);

			expect(Range.isNextBlock(inputInterface, {openRange: Range.rangeName})).toBeFalsy();
		});

		test('True if no open range and valid open', () => {
			Range.openChar = '*';//Set this so it nextChar works correctly

			const test = ['*', 't', 'e', 's', 't'];
			const inputInterface = getInterface(0, test);

			expect(Range.isNextBlock(inputInterface, {})).toBeTruthy();

			Range.openChar = '';//Set it back
		});

		test('True is range is open and valid close', () => {
			const test = ['t', 'e', 's', 't', ''];
			const inputInterface = getInterface(4, test);

			expect(Range.isNextBlock(inputInterface, {openRange: Range.rangeName})).toBeTruthy();
		});
	});


	describe('shouldAppendBlock', () => {
		test('True if not closed', () => {
			const block = new Range();
			const nextBlock = new Plaintext();

			expect(block.shouldAppendBlock(nextBlock)).toBeTruthy();
		});

		test('False if closed', () => {
			const block = new Range();
			const nextBlock = new Plaintext();

			block.doClose();

			expect(block.shouldAppendBlock(nextBlock)).toBeFalsy();
		});
	});

	describe('appendBlock', () => {
		test('Appending plain text', () => {
			const range = new Range();
			const plainText = new Plaintext('n');

			range.appendBlock(plainText);

			expect(range.text).toEqual('n');
		});

		test('Appending another range closes it', () => {
			const range = new Range();
			const newRange = new Range();

			range.appendBlock(newRange);

			expect(range.closed).toEqual(true);
		});
	});

	describe('isValidRange', () => {
		test('Not valid if no plaintext', () => {
			const range = new Range();
			const newRange = new Range();

			range.appendBlock(newRange);

			expect(range.isValidRange).toBeFalsy();
		});

		test('Not valid if not closed', () => {
			const range = new Range();
			const plaintext = new Plaintext('n');

			range.appendBlock(plaintext);

			expect(range.isValidRange).toBeFalsy();
		});

		test('Valid if it has plain text and is closed', () => {
			const range = new Range();
			const plaintext = new Plaintext('n');
			const newRange = new Range();

			range.appendBlock(plaintext);
			range.appendBlock(newRange);

			expect(range.isValidRange).toBeTruthy();
		});
	});

	describe('getOutput', () => {
		test('If not valid range, gets output as plaintext', () => {
			//Set this here for testing
			Range.openChars = '*';

			const range = new Range();

			range.appendBlock(new Plaintext('t'));
			range.appendBlock(new Plaintext('e'));
			range.appendBlock(new Plaintext('s'));
			range.appendBlock(new Plaintext('t'));

			const {output, context} = range.getOutput({charCount: 0});

			expect(output).toEqual('*test');
			expect(context.charCount).toEqual(5);

			//Unset it before moving on
			Range.openChars = '';
		});

		test('If valid range, gets output as range', () => {
			const range = new Range();

			range.appendBlock(new Plaintext('t'));
			range.appendBlock(new Plaintext('e'));
			range.appendBlock(new Plaintext('s'));
			range.appendBlock(new Plaintext('t'));

			range.appendBlock(new Range());

			const {output, context} = range.getOutput({charCount: 0});

			expect(output).toEqual('test');
			expect(context.charCount).toEqual(4);
		});
	});
});
