import {Parsers as EditorParsers} from '@nti/web-editor';

import Parser from './parser';

export const toDraftState = (rst, options) => {
	const draftState = rst && Parser.convertRSTToDraftState(rst, options);
	const {blocks, entityMap} = draftState || {blocks: []};

	return blocks.length ?
		EditorParsers.Utils.getStateForRaw({blocks, entityMap}) :
		EditorParsers.Utils.getEmptyState();

};

export const fromDraftState = (state, options) => {
	const {blocks, entityMap} = EditorParsers.Utils.getRawForState(state);

	return state.getCurrentContent() ?
		Parser.convertDraftStateToRST({blocks, entityMap}) :
		'';
};

export const withOptions = (options = {}) => ({
	toDraftState: (rst, incoming = {}) => Parser.convertRSTToDraftState(rst, {...options, ...incoming}),
	fromDraftState: (state, incoming = {}) => Parser.convertDraftStateToRST(state, {...options, ...incoming})
});
