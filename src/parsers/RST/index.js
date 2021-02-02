import {Parsers as EditorParsers} from '@nti/web-editor';

import Parser from './parser';

export const toRawDraftState = (rst, options) => {
	return rst && Parser.convertRSTToDraftState(rst, options);
};

export const toDraftState = (rst, options) => {
	const draftState = toRawDraftState(rst, options);
	const {blocks, entityMap} = draftState || {blocks: []};

	return blocks.length ?
		EditorParsers.Utils.getStateForRaw({blocks, entityMap}) :
		EditorParsers.Utils.getEmptyState();

};

export const fromRawDraftState = ({blocks, entityMap}) => {
	return Parser.convertDraftStateToRST({blocks, entityMap});
}

export const fromDraftState = (state, options) => {
	const {blocks, entityMap} = EditorParsers.Utils.getRawForState(state);

	return state.getCurrentContent() ?
		fromRawDraftState({blocks, entityMap}) :
		'';
};

export const withOptions = (options = {}) => ({
	toDraftState: (rst, incoming = {}) => toDraftState(rst, {...options, ...incoming}),
	fromDraftState: (state, incoming = {}) => fromDraftState(state, {...options, ...incoming})
});
