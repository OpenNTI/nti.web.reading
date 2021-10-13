import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { HOC } from '@nti/web-commons';
import { BLOCK_SET, BLOCKS } from '@nti/web-editor';

import Button from '../Button';

import BlockQuoteIcon from './assets/icon-blockquote.svg';
import OrderedIcon from './assets/icon-numbered.svg';
import UnorderedIcon from './assets/icon-bullet.svg';

const t = scoped('nti-reading.editor.custom-blocks.builtin-blocks.Button', {
	[BLOCKS.BLOCKQUOTE]: 'Block Quote',
	[BLOCKS.ORDERED_LIST_ITEM]: 'Numbered List',
	[BLOCKS.UNORDERED_LIST_ITEM]: 'Bullet List',
});

const TypeToIcon = {
	[BLOCKS.BLOCKQUOTE]: BlockQuoteIcon,
	[BLOCKS.ORDERED_LIST_ITEM]: OrderedIcon,
	[BLOCKS.UNORDERED_LIST_ITEM]: UnorderedIcon,
};

const { Variant } = HOC;

BuiltInBlockButton.Build = type => Variant(BuiltInBlockButton, { type }, type);
BuiltInBlockButton.propTypes = {
	type: PropTypes.oneOf(Array.from(BLOCK_SET)),
};
export default function BuiltInBlockButton({ type }) {
	const label = t.isMissing(type) ? type : t(type);
	const icon = TypeToIcon[type];

	const isBlock = block => block.getType() === type;
	const createBlock = insertBlock =>
		insertBlock(
			{
				type,
				depth: 0,
				text: '',
			},
			false,
			true
		);

	return (
		<Button
			icon={icon}
			label={label}
			createBlock={createBlock}
			isBlock={isBlock}
			group
		/>
	);
}
