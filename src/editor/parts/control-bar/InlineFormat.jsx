import React from 'react';
import classnames from 'classnames/bind';
import {
	BoldButton,
	ItalicButton,
	UnderlineButton,
	LinkButton,
	BLOCKS,
} from '@nti/web-editor';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const DisableForBlocks = {
	[BLOCKS.HEADER_ONE]: true,
	[BLOCKS.HEADER_TWO]: true,
	[BLOCKS.HEADER_THREE]: true,
	[BLOCKS.HEADER_FOUR]: true,
};

function shouldDisableForState(state) {
	if (!state) {
		return false;
	}

	const selection = state.getSelection();
	const start = selection.getStartKey();
	const end = selection.getEndKey();

	if (start !== end) {
		return false;
	}

	const block = state.getCurrentContent().getBlockForKey(start);

	return block && DisableForBlocks[block.getType()];
}

const buttonProps = {
	plain: true,
	className: cx('inline-button'),
	activeClassName: cx('active'),
};

export default function InlineFormat() {
	return (
		<div className={cx('inline-format')}>
			<div className={cx('styles')}>
				<BoldButton
					{...buttonProps}
					shouldDisableForState={shouldDisableForState}
				/>
				<ItalicButton
					{...buttonProps}
					shouldDisableForState={shouldDisableForState}
				/>
				<UnderlineButton
					{...buttonProps}
					shouldDisableForState={shouldDisableForState}
				/>
			</div>
			<div className={cx('entities')}>
				<LinkButton {...buttonProps} />
			</div>
		</div>
	);
}
