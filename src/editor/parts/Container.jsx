import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Layouts} from '@nti/web-commons';
import {EditorGroup} from '@nti/web-editor';

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
	const ComponentsByLocation = (components ?? []).reduce((acc, cmp) => {
		const location = cmp?.type?.Location ?? 'other';

		if (!acc[location]) { acc[location] = []; }
		acc[location].push(cmp);

		return acc;
	}, {});

	const Content = ComponentsByLocation[Locations.Main];
	const ControlBar = ComponentsByLocation[Locations.ControlBar];
	const Header = ComponentsByLocation[Locations.Header];
	const Sidebar = ComponentsByLocation[Locations.Sidebar];
	const Other = ComponentsByLocation.other;

	return (
		<EditorGroup>
			<Aside.Container className={cx('reading-editor-container', className)} {...otherProps}>
				{Sidebar && (<Aside component={AsideWrapper} content={Sidebar} />)}
				<div className={cx('content')}>
					{Header}
					{Content}
				</div>
				{ControlBar}
				{Other}
			</Aside.Container>
		</EditorGroup>
	);
}
