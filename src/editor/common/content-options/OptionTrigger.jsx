import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Button, Text} from '@nti/web-commons';

import Styles from './OptionTrigger.css';
import Context from './Context';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.editor.common.content-options.OptionTrigger', {
	showOptions: 'Options',
	showContent: 'Done'
});

ContentOptionTrigger.propTypes = {
	className: PropTypes.string
};
export default function ContentOptionTrigger ({className}) {
	const trigger = React.useContext(Context);

	if (!trigger || !trigger.hasOptions) { return null; }

	const {showOptions, hideOptions, showingOptions} = trigger;
	const onClick = showingOptions ? hideOptions : showOptions;

	return (
		<Button
			className={cx('option-trigger', className, {'options': showingOptions})}
			onClick={onClick}
		>
			{showingOptions && (<Text.Base>{t('showContent')}</Text.Base>)}
			{!showingOptions && (<Text.Base>{t('showOptions')}</Text.Base>)}
		</Button>
	);
}
