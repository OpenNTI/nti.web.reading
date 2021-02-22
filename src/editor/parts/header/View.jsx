import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Pager, Text } from '@nti/web-commons';

import { Locations } from '../Constants';

import Styles from './Styles.css';
import Controls from './controls';

const cx = classnames.bind(Styles);

ReadingEditorHeader.Controls = Controls;
ReadingEditorHeader.Location = Locations.Header;
ReadingEditorHeader.propTypes = {
	children: PropTypes.any,
	breadcrumb: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			handleRoute: PropTypes.func,
		})
	),
	pageSource: PropTypes.any,
};
export default function ReadingEditorHeader({
	children,
	breadcrumb,
	pageSource,
}) {
	return (
		<>
			<div className={cx('bar')}>
				{breadcrumb && (
					<ul className={cx('breadcrumb')}>
						{breadcrumb.map((item, index) => (
							<Text.Base
								as="li"
								key={index}
								onClick={item.handleRoute}
							>
								{item.label}
							</Text.Base>
						))}
					</ul>
				)}
				{pageSource && <Pager pageSource={pageSource} />}
			</div>
			<div className={cx('controls')}>{children}</div>
		</>
	);
}
