import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';

import { TextEditor } from '../../common';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.editor.common.parts.content.Description', {
	placeholder: 'Write a description...',
});

DescriptionEditor.propTypes = {
	className: PropTypes.string,
	description: PropTypes.string,
	masked: PropTypes.bool,
};
export default function DescriptionEditor({
	className,
	description,
	masked,
	...otherProps
}) {
	return (
		<TextEditor
			className={cx('description')}
			value={description}
			placeholder={t('placeholder')}
			readOnly={masked}
			{...otherProps}
		/>
	);
}
