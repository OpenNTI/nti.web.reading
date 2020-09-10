import React from 'react';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Flyout} from '@nti/web-commons';
import {
	ActiveType,
	TypeButton,
	BLOCKS
} from '@nti/web-editor';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.editor.parts.control-bar.BlockFormat', {
	[BLOCKS.HEADER_TWO]: 'Title',
	[BLOCKS.HEADER_THREE]: 'Section Title',
	[BLOCKS.HEADER_FOUR]: 'Paragraph Headline',
	[BLOCKS.BLOCKQUOTE]: 'Block Quote',
	[BLOCKS.UNSTYLED]: 'Body Text',
	[BLOCKS.ORDERED_LIST_ITEM]: 'Numbered List',
	[BLOCKS.UNORDERED_LIST_ITEM]: 'Bulleted List'
});

const renderBlockType = (type, mouseDown) => (
	<TypeButton
		onMouseDown={mouseDown}
		className={cx('block-type-button')}
		type={type}
		getString={t}
		plain
		checkmark
	/>
);

export default function BlockFormat () {
	const flyoutRef = React.useRef();

	const closeMenu = () => flyoutRef.current?.dismiss?.();

	return (
		<Flyout.Triggered
			ref={flyoutRef}
			className={cx('block-type-flyout')}
			verticalAlign={Flyout.ALIGNMENTS.TOP}
			horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			focusOnOpen={false}
			trigger={(
				<ActiveType className={cx('active-block-type')} getString={t}/>
			)}
		>
			<div className={cx('block-type-list')}>
				<ul>
					<li>{renderBlockType(BLOCKS.HEADER_TWO, closeMenu)}</li>
					<li>{renderBlockType(BLOCKS.HEADER_THREE, closeMenu)}</li>
					<li>{renderBlockType(BLOCKS.HEADER_FOUR, closeMenu)}</li>
					<li>{renderBlockType(BLOCKS.BLOCKQUOTE, closeMenu)}</li>
					<li>{renderBlockType(BLOCKS.UNSTYLED, closeMenu)}</li>
				</ul>
				<ul>
					<li>{renderBlockType(BLOCKS.ORDERED_LIST_ITEM, closeMenu)}</li>
					<li>{renderBlockType(BLOCKS.UNORDERED_LIST_ITEM, closeMenu)}</li>
				</ul>
			</div>
		</Flyout.Triggered>
	);
}
