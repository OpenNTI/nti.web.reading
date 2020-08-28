import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import {ContentOptions} from '../../common';
import {Locations} from '../Constants';

import Styles from './Styles.css';
import Body from './Body';
import Description from './Description';
import Icon from './Icon';
import Options from './Options';
import Title from './Title';

const cx = classnames.bind(Styles);

const TypeToPart = {
	[Body]: 'body',
	[Description]: 'description',
	[Icon]: 'icon',
	[Options]: 'options',
	[Title]: 'title'
};

ReadingEditorContent.Body = Body;
ReadingEditorContent.Description = Description;
ReadingEditorContent.Title = Title;
ReadingEditorContent.Options = Options;
ReadingEditorContent.Location = Locations.Main;
ReadingEditorContent.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};
export default function ReadingEditorContent ({className, children}) {
	const {body, description, title, options, icon} = React.Children.toArray(children).reduce((acc, child) => {
		const part = TypeToPart[child.type];

		return {...acc, [part]: child};
	}, {});

	const hasOptions = Boolean(options);

	const content = (
		<div className={cx('content')}>
			<div className={cx('meta-editor', {'has-options': hasOptions, 'has-icon': Boolean(icon)})}>
				{hasOptions && (<ContentOptions.Trigger className={cx('trigger')}/>)}
				{icon}
				{title}
				{description}
			</div>
			{body}
		</div>
	);

	return (
		<ContentOptions
			className={cx('editor-content')}
			content={content}
			options={options}
		/>
	);
}
