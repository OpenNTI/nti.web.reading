import React from 'react';
import cx from 'classnames';

import { Layouts } from '@nti/web-commons';
import { EditorGroup } from '@nti/web-editor';

import { Locations } from './Constants';

const { Aside } = Layouts;

const Container = styled(Aside.Container)`
	--editor-content-side-padding: 1.25rem;
	--side-padding: 1.25rem;
`;

export default function ReadingEditorContainer({
	className,
	children,
	...otherProps
}) {
	const components = React.Children.toArray(children);
	const ComponentsByLocation = (components ?? []).reduce((acc, cmp) => {
		const location = cmp?.type?.Location || 'other';

		if (!acc[location]) {
			acc[location] = [];
		}

		//TODO: inspect cmp for a key, if not found, add one
		acc[location].push(cmp);

		return acc;
	}, {});

	const {
		[Locations.Main]: content,
		[Locations.ControlBar]: controlBar,
		[Locations.Header]: header,
		[Locations.Sidebar]: sidebar,
		other,
	} = ComponentsByLocation;

	return (
		<EditorGroup>
			<Container
				className={cx('reading-editor-container', className)}
				{...otherProps}
			>
				{sidebar && <Aside>{sidebar}</Aside>}
				<>
					{header}
					{content}
				</>
				{controlBar}
				{other}
			</Container>
		</EditorGroup>
	);
}
