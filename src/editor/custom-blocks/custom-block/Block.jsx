import React from 'react';
import classnames from 'classnames/bind';
import { Plugins } from '@nti/web-editor';

import Styles from './Styles.css';
import Controls from './Controls';
import Editor from './Editor';

const cx = classnames.bind(Styles);

const {
	CustomBlocks: { CustomBlock },
} = Plugins;

CustomReadingBlock.Controls = Controls;
CustomReadingBlock.Editor = Editor;
CustomReadingBlock.WrapperClassName = cx('custom-reading-block-wrapper');
export default function CustomReadingBlock(props) {
	return (
		<CustomBlock
			className={cx('custom-reading-block', props.className)}
			{...props}
		/>
	);
}
