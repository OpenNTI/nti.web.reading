import PropTypes from 'prop-types';

import { Pager, Text } from '@nti/web-commons';

import { Locations } from '../Constants';

import Controls from './controls';

const Bar = styled.div`
	background: white;
	box-shadow: 0 1px 0 0 var(--border-grey-light);
	margin-bottom: 1px;
	display: flex;
	padding: 0 var(--editor-content-side-padding);
	position: sticky;
	top: var(--nt-app-top-offset, 0);
	z-index: 1;

	&:global(.pager) {
		flex: 0 0 auto;
	}
`;

const Breadcrumb = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex: 1 1 auto;

	& li {
		font-size: 0.75rem;
		font-weight: 600;
		line-height: 4.2;
		color: var(--primary-blue);
	}
`;

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
			<Bar>
				{breadcrumb && (
					<Breadcrumb>
						{breadcrumb.map((item, index) => (
							<Text.Base
								as="li"
								key={index}
								onClick={item.handleRoute}
							>
								{item.label}
							</Text.Base>
						))}
					</Breadcrumb>
				)}
				{pageSource && <Pager pageSource={pageSource} />}
			</Bar>
			<div className="controls">{children}</div>
		</>
	);
}
