import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Errors } from '@nti/web-commons';

import { ContentOptions } from '../../common';
import { Locations } from '../Constants';

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
	[Title]: 'title',
};

ReadingEditorContent.Body = Body;
ReadingEditorContent.Description = Description;
ReadingEditorContent.Title = Title;
ReadingEditorContent.Options = Options;
ReadingEditorContent.Location = Locations.Main;
ReadingEditorContent.propTypes = {
	className: PropTypes.string,

	error: PropTypes.any,
	mask: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

	children: PropTypes.any,
};
export default function ReadingEditorContent({
	className,
	children,
	mask,
	error,
}) {
	const { body, description, title, options, icon } = React.Children.toArray(
		children
	).reduce((acc, child) => {
		const part = TypeToPart[child.type];

		return { ...acc, [part]: child };
	}, {});

	const hasOptions = Boolean(options);
	const render = p =>
		p ? React.cloneElement(p, { masked: Boolean(mask) }) : null;

	const content = (
		<div className={cx('content', { masked: mask })}>
			<div
				className={cx('meta-editor', {
					'has-options': hasOptions,
					'has-icon': Boolean(icon),
				})}
			>
				{hasOptions && (
					<ContentOptions.Trigger className={cx('trigger')} />
				)}
				{render(icon)}
				{render(title)}
				{render(description)}
			</div>
			<Errors.Message className={cx('content-error')} error={error} />
			{render(body)}
			{mask && typeof mask !== 'boolean' ? mask : null}
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
