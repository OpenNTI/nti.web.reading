export default function (parsed, options) {
	const {blocks:parsedBlocks, context} = parsed;

	const draftState = parsedBlocks.reduce((acc, block) => {
		const draft = block.toDraft && block.toDraft(acc.context, options);
		const {output:draftBlock, context:newContext} = draft || {};

		acc.context = newContext || acc.context;

		if (draftBlock) {
			acc.blocks.push(draftBlock);
		}

		return acc;
	}, {blocks: [], context: {entityMap: context.entityMap || {}}});

	return {blocks: draftState.blocks, entityMap: draftState.context.entityMap || {}};
}
