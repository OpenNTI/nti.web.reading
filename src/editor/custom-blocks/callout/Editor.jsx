import React from 'react';
import PropTypes from 'prop-types';
import {Common, Plugins, NestedEditorWrapper} from '@nti/web-editor';
import {DnD} from '@nti/web-commons';

const {CustomBlocks: {CustomBlock}} = Plugins;

CalloutEditor.propTypes = {
	block: PropTypes.any
};
export default function CalloutEditor (props) {
	return (
		<CustomBlock draggable {...props}>
			<div>
				<DnD.DragHandle />
			</div>
			<NestedEditorWrapper>
				<Common.RichText />
			</NestedEditorWrapper>
		</CustomBlock>
	);
}
