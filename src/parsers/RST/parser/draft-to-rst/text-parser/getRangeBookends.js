import {STYLES, ENTITIES} from '@nti/web-editor';

const DEFAULT = 'default';

const {BOLD, ITALIC, UNDERLINE} = STYLES;
const BOLD_ITALIC = getKeyForStyles([BOLD, ITALIC]);
const BOLD_UNDERLINE = getKeyForStyles([BOLD, UNDERLINE]);
const ITALIC_UNDERLINE = getKeyForStyles([ITALIC, UNDERLINE]);
const BOLD_ITALIC_UNDERLINE = getKeyForStyles([BOLD, ITALIC, UNDERLINE]);

const {LINK} = ENTITIES;

function getKeyForStyles (styles) {
	const contains = styles.reduce((acc, style) => {
		acc[style] = true;

		return acc;
	}, {});

	const bold = contains[BOLD] ? BOLD : '';
	const italic = contains[ITALIC] ? ITALIC : '';
	const underlined = contains[UNDERLINE] ? UNDERLINE : '';

	return bold + italic + underlined;
}

const STYLES_HANDLERS = {
	[DEFAULT]: () => { return {start: '', end: ''}; },
	[BOLD]: () => { return {start: '**', end: '**'}; },
	[ITALIC]: () => { return {start: '*', end: '*'}; },
	[UNDERLINE]: () => { return {start: ':underline:`',	end: '`'}; },
	[BOLD_ITALIC]: () => { return {start: ':bolditalic:`', end: '`'}; },
	[BOLD_UNDERLINE]: () => { return {start: ':boldunderline:`', end: '`'}; },
	[ITALIC_UNDERLINE]: () => { return {start: ':italicunderline:`',	end: '`'}; },
	[BOLD_ITALIC_UNDERLINE]: () => { return {start: ':bolditalicunderline:`', end: '`'}; }
};


const ENTITY_HANDLERS = {
	[DEFAULT]: () => { return {start: '', end: ''}; },
	[LINK]: (entity) => {
		const {data} = entity;
		const {href} = data;

		return {
			start: '`',
			end: ` <${href}>\``
		};
	}
};

function getStyleBookends (styles) {
	const key = getKeyForStyles(styles);
	const styleHandler = STYLES_HANDLERS[key] || STYLES_HANDLERS[DEFAULT];

	return styleHandler(styles);
}


function getKeyBookends (keys, context) {
	const key = keys[0];
	const entity = context.entityMap[key];
	const entityHandler = ENTITY_HANDLERS[entity.type] || ENTITY_HANDLERS[DEFAULT];

	return entityHandler(entity);
}

export default function getRangeBookends (range, context) {
	const {styles, keys} = range;
	let bookends;

	if (keys.length) {
		bookends = getKeyBookends(keys, context);
	} else if (styles.length) {
		bookends = getStyleBookends(styles, context);
	}

	return bookends;
}
