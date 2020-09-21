import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import CustomBlock from '../custom-block';

import Styles from './Editor.css';

const cx = classnames.bind(Styles);

CalloutEditor.WrapperClassName = CustomBlock.WrapperClassName;
CalloutEditor.propTypes = {
	block: PropTypes.any
};
export default function CalloutEditor (props) {
	return (
		<CustomBlock {...props} className={cx('callout-editor')} >
			<CustomBlock.Controls {...props} />
			Callout
		</CustomBlock>
	);
}
