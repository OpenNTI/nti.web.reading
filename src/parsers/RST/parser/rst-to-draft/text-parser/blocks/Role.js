import {STYLES} from '@nti/web-editor';

import Range from './Range';

const MARKER_FOR = Symbol('Marker For');

function buildStyleRange (style, block, context) {
	return {style, offset: context.charCount, length: block.length};
}


function buildOutput (styles, block, context) {
	const inlineStyleRanges = styles.map(x => buildStyleRange(x, block, context));
	const {output, context:newContext} = block.getOutput(context, true);

	newContext.inlineStyleRanges = (newContext.inlineStyleRanges || []).concat(inlineStyleRanges);

	return {output, context: newContext};
}


const ROLES = {
	emphasis: (block, context) => {
		return buildOutput([STYLES.ITALIC], block, context);
	},

	strong: (block, context) => {
		return buildOutput([STYLES.BOLD], block, context);
	},

	math: (block, context) => {
		return buildOutput([STYLES.CODE], block, context);
	},

	underline: (block, context) => {
		return buildOutput([STYLES.UNDERLINE], block, context);
	},

	bolditalic: (block, context) => {
		return buildOutput([STYLES.BOLD, STYLES.ITALIC], block, context);
	},

	boldunderline: (block, context) => {
		return buildOutput([STYLES.BOLD, STYLES.UNDERLINE], block, context);
	},

	italicunderline: (block, context) => {
		return buildOutput([STYLES.ITALIC, STYLES.UNDERLINE], block, context);
	},

	bolditalicunderline: (block, context) => {
		return buildOutput([STYLES.BOLD, STYLES.ITALIC, STYLES.UNDERLINE], block, context);
	}
};

export default class Role extends Range {
	static rangeName = 'role'
	static openChars = ':'
	static closeChars = ':'

	static matchOpen (inputInterface) {
		const input = inputInterface.get(0);

		return {matches: input === ':'};
	}


	static afterParse (block, inputInterface, context, parsedInterface) {
		const currentBlock = parsedInterface.get();

		if (currentBlock && currentBlock.isInterpreted && !currentBlock.roleMarker) {
			currentBlock.setRoleMarker(block);
			block.setMarkerFor(currentBlock);
		}

		return block;
	}

	isRole = true

	get name () {
		return this.text;
	}


	get markerFor () {
		return this[MARKER_FOR];
	}


	setMarkerFor (block) {
		this[MARKER_FOR] = block;
	}


	getOutput (context) {
		return this[MARKER_FOR] && this[MARKER_FOR].isValidRange && this.closed ? null : this.getPlaintextOutput(context);
	}


	getOutputForInterpreted (block, context) {
		const fn = ROLES[this.name];

		if (!fn) {
			//TODO: warn or something here
			return block.getOutput(context, true);
		}

		return fn(block, context);
	}
}
