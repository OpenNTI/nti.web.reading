import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Text } from '@nti/web-commons';

import { ContentOptions } from '../../common';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

ReadingEditorContentOptions.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.any,
};
export default function ReadingEditorContentOptions({
	title,
	description,
	children,
}) {
	return (
		<div className={cx('content-options')}>
			<div className={cx('header')}>
				<Text.Base className={cx('title')}>{title}</Text.Base>
				<Text.Base className={cx('description')}>
					{description}
				</Text.Base>
				<ContentOptions.Trigger className={cx('switch')} />
			</div>
			{children}
		</div>
	);
}
