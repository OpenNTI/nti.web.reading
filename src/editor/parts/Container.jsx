import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Layouts} from '@nti/web-commons';

import Styles from './Styles.css';
import {Locations} from './Constants';

const {Aside} = Layouts;

const cx = classnames.bind(Styles);

AsideWrapper.propTypes = {
	content: PropTypes.any
};
function AsideWrapper ({content}) {
	return content;
}

ReadingEditorContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};
export default function ReadingEditorContainer ({className, children, ...otherProps}) {
	const components = React.Children.toArray(children);
	const CmpsByLocation = (components ?? []).reduce((acc, cmp) => {
		const location = cmp?.type?.Location ?? 'other';

		if (!acc[location]) { acc[location] = []; }
		acc[location].push(cmp);

		return acc;
	}, {});

	const Content = CmpsByLocation[Locations.Main];
	const ControlBar = CmpsByLocation[Locations.ControlBar];
	const Header = CmpsByLocation[Locations.Header];
	const Sidebar = CmpsByLocation[Locations.Sidebar];
	const Other = CmpsByLocation.other;

	return (
		<Aside.Container className={cx('reading-editor-container', className)} {...otherProps}>
			{Sidebar && (<Aside component={AsideWrapper} content={Sidebar} />)}
			{Header}
			{Content}
			{ControlBar}
			{Other}
		</Aside.Container>
	);
}
