import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { ContentResources } from '@nti/web-commons';
import { BLOCKS } from '@nti/web-editor';

import Button from '../Button';

import Icon from './assets/icon-photo.svg';
import { isCourseFigureBlock, isImage } from './utils';
import { Name } from './Constants';

const t = scoped('web-reading.editor.custom-blocks.course-figure.Button', {
	label: 'Photo',
});

const getContainer = container =>
	Array.isArray(container) ? container[0] : container;

VideoRefButton.propTypes = {
	container: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default function VideoRefButton({ container }) {
	const createBlock = async insertBlock => {
		try {
			const containerId = getContainer(container)?.getID?.();
			const file = await ContentResources.selectFrom(
				containerId,
				isImage
			);

			insertBlock({
				type: BLOCKS.ATOMIC,
				text: '',
				data: {
					name: Name,
					arguments: file.url,
					body: [],
					options: { local: true },
				},
			});
		} catch (e) {
			//swallow
		}
	};

	return (
		<Button
			label={t('label')}
			icon={Icon}
			createBlock={createBlock}
			isBlock={isCourseFigureBlock}
			type={Name}
		/>
	);
}
