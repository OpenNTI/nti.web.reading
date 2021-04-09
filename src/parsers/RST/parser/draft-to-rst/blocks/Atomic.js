import { BLOCKS } from '@nti/web-editor';

const BLOCK = Symbol('Block');


const isEmpty = x => x == null || x === '';
export default class Atomic {
	static isNextBlock(inputInterface) {
		const input = inputInterface.get(0);

		return input.type === BLOCKS.ATOMIC;
	}

	static parse(inputInterface) {
		const input = inputInterface.get(0);

		return { block: new this(input) };
	}

	followWithBlankLine = true;

	constructor(block) {
		this[BLOCK] = block;
	}

	get data() {
		return this[BLOCK].data;
	}

	getDirectiveHeader() {
		const { data } = this;

		return `.. ${data.name}:: ${data.arguments}`;
	}

	getOptionsOutput() {
		const { data } = this;
		let { options } = data;

		//TODO: figure out why we are getting a map here
		if (options.toJS) {
			options = options.toJS();
		}

		const keys = Object.keys(options);

		return (keys || [])
			.sort((a, b) => {
				const aVal = options[a];
				const bVal = options[b];

				if (isEmpty(aVal) && isEmpty(bVal)) { return 0; }
				if (isEmpty(aVal) && !isEmpty(bVal)) { return -1; }
				if (!isEmpty(aVal) && isEmpty(bVal)) { return 1; }

				const aIndex = keys.indexOf(a);
				const bIndex = keys.indexOf(b);

				return aIndex < bIndex ? -1 : (aIndex === bIndex ? 0 : 1);
			})
			.map(key => {
				const value = options[key];

				return `:${key}: ${value}`;
			});
	}

	getBodyOutput() {
		const { data } = this;

		return data.body;
	}

	getOutput(context) {
		const options = this.getOptionsOutput(context);
		const body = this.getBodyOutput(context);
		let output = [];

		output.push(this.getDirectiveHeader(context));

		for (let option of options) {
			output.push(`  ${option}`);
		}

		for (let part of body) {
			output.push(''); //add an empty line between body parts
			output.push(`  ${part}`);
		}

		return { output };
	}
}
