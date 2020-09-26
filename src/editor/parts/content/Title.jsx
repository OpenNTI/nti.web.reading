import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';

import {TextEditor} from '../../common';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.Editor.parts.content.Title', {
	placeholder: 'Title',
	name: 'Title'
});

ReadingEditorTitle.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	masked: PropTypes.bool,
	charLimit: PropTypes.number
};
export default function ReadingEditorTitle ({className, title, masked, charLimit = 140, ...otherProps}) {
	return (
		<TextEditor
			className={cx('title', className)}
			value={title}
			placeholder={t('placeholder')}
			name={t('name')}
			readOnly={masked}
			plainText
			singleLine
			charLimit={charLimit}
			countDown
			{...otherProps}
		/>
	);
}
