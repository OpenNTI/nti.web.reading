/* globals spyOn */
/* eslint-env jest */
import Plaintext from '../Plaintext';
import {getInterface} from '../../../../Parser';

describe('Plaintext', () => {
	describe('isNextBlock', () => {
		test('Is always true', () => {
			const chars = ['a', '*', '`', '.'];

			for (let char of chars) {
				let inputInterface = getInterface(0, [char]);

				expect(Plaintext.isNextBlock(inputInterface)).toBeTruthy();
			}
		});
	});

	describe('parse', () => {
		function buildBlock (type) {
			const block = {
				[type]: true,
				setMarkerFor: () => {}
			};

			spyOn(block, 'setMarkerFor');

			return block;
		}

		test('If no currentBlock returns new Plaintext', () => {
			const test = ['p', 'l', 'a', 'i', 'n'];
			const inputInterface = getInterface(0, test);
			const parsedInterface = getInterface(0, []);
			const {block} = Plaintext.parse(inputInterface, {}, parsedInterface);

			expect(block.isPlaintext).toBeTruthy();
		});

		test('If currentBlock is target, and input is not whitespace, the currentBlock is a role marker', () => {
			const test = ['p', 'l', 'a', 'i', 'n'];
			const currentBlock = buildBlock('isTarget');
			const inputInterface = getInterface(0, test);
			const parsedInterface = getInterface(0, [currentBlock]);
			const {block} = Plaintext.parse(inputInterface, {}, parsedInterface);

			expect(block.isPlaintext).toBeTruthy();
			expect(currentBlock.setMarkerFor).toHaveBeenCalledWith(block);
			expect(block.roleMarker).toEqual(currentBlock);
		});

		test('If the currentBlock is a target, and the input is whitespace, the currentBlock is not a role marker', () => {
			const test = [' ', 'p', 'l', 'a', 'i', 'n'];
			const currentBlock = buildBlock('isTarget');
			const inputInterface = getInterface(0, test);
			const parsedInterface = getInterface(0, [currentBlock]);
			const {block} = Plaintext.parse(inputInterface, {}, parsedInterface);

			expect(block.isPlaintext).toBeTruthy();
			expect(currentBlock.setMarkerFor).not.toHaveBeenCalled();
			expect(block.roleMaker).toBeFalsy();
		});
	});

	describe('shouldAppendBlock', () => {
		test('Is true if we don\'t end in whitespace, and the block is plaintext', () => {
			const block = new Plaintext('n');
			const newBlock = new Plaintext('o');

			expect(block.shouldAppendBlock(newBlock)).toBeTruthy();
		});

		test('Is false for none plaintext', () => {
			const block = new Plaintext('n');
			const newBlock = {notPlaintext: true};

			expect(block.shouldAppendBlock(newBlock)).toBeFalsy();
		});

		test('Appending white space prevents the next shouldAppendBlock', () => {
			const block = new Plaintext('n');
			const whitespace = new Plaintext(' ');
			const newBlock = new Plaintext('o');

			block.appendBlock(whitespace);

			expect(block.shouldAppendBlock(newBlock)).toBeFalsy();
		});
	});

	describe('appendBlock', () => {
		test('appends to the existing text', () => {
			const block = new Plaintext('n');
			const newBlock = new Plaintext('o');

			block.appendBlock(newBlock);

			expect(block.text).toEqual('no');
		});
	});


	describe('getOutput', () => {
		function buildMarker () {
			const block = {
				getOutputForInterpreted: () => {}
			};

			spyOn(block, 'getOutputForInterpreted');

			return block;
		}

		test('If it has role marker and not forced, calls marker', () => {
			const block = new Plaintext('n');
			const marker = buildMarker();
			const context = {};

			block.setRoleMarker(marker);
			block.getOutput(context);

			expect(marker.getOutputForInterpreted).toHaveBeenCalledWith(block, context);
		});

		test('If it has role marker and forces, does not call marker', () => {
			const block = new Plaintext('n');
			const marker = buildMarker();
			const context = {};

			block.setRoleMarker(marker);
			block.getOutput(context, true);

			expect(marker.getOutputForInterpreted).not.toHaveBeenCalled();
		});

		test('No role marker, has the correct output', () => {
			const block = new Plaintext('p');

			block.appendBlock(new Plaintext('l'));
			block.appendBlock(new Plaintext('a'));
			block.appendBlock(new Plaintext('i'));
			block.appendBlock(new Plaintext('n'));
			block.appendBlock(new Plaintext('t'));
			block.appendBlock(new Plaintext('e'));
			block.appendBlock(new Plaintext('x'));
			block.appendBlock(new Plaintext('t'));

			const {output, context} = block.getOutput({charCount: 0});

			expect(output).toEqual('plaintext');
			expect(context.charCount).toEqual(9);
		});
	});
});
