import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { rawContent } from '@nti/lib-commons';
import { getAtomicBlockData } from '@nti/web-editor';

import CustomBlock from '../custom-block';

import Styles from './Editor.css';
import Picker from './parts/Picker';

const cx = classnames.bind(Styles);
const t = scoped('nti-reading.custom-blocks.iframe.Editor', {
	change: 'Edit Iframe',
});

const sandboxValues =
	'allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-popups allow-top-navigation';

function getIframeContent(iframeObj) {
	if (!iframeObj) {
		return `<div class="${cx(
			'blank-iframe'
		)}">No IFrame found. Try again.</div>`;
	}

	const iframe = document.createElement('iframe');

	iframe.src = iframeObj.src;
	iframe.frameBorder = '0';

	for (let [key, value] of Object.entries(iframeObj.attributes)) {
		if (!iframe[key]) {
			iframe[key] = value;
		}
	}

	if (!iframe['allow']) {
		iframe['allow'] =
			iframe['allowfullscreen'] === 'true' ? 'fullscreen' : '';
	} else {
		iframe['allow'] =
			iframe['allowfullscreen'] === 'true' &&
			!iframe['allow'].includes('fullscreen')
				? iframe['allow'] + '; fullscreen'
				: iframe['allow'];
	}

	iframe['sandbox'] =
		iframe['no-sandboxing'] === 'true'
			? 'allow-same-origin allow-scripts'
			: sandboxValues;
	iframe['width'] = iframe['width'] === '' ? '100%' : iframe['width'];
	iframe['height'] = iframe['height'] === '' ? '100%' : iframe['height'];

	return iframe.outerHTML;
}

IframeEditor.WrapperClassName = CustomBlock.WrapperClassName;
IframeEditor.propTypes = {
	block: PropTypes.object,
	blockProps: PropTypes.shape({
		editorState: PropTypes.object,
		setBlockData: PropTypes.func,
	}),
};
export default function IframeEditor(props) {
	const {
		block,
		blockProps: { editorState, setBlockData },
	} = props;
	const data = getAtomicBlockData(block, editorState);
	const iframeObj = {
		src: data.arguments,
		attributes: data.options,
	};

	const onChange = async () => {
		try {
			const iframeEdit = await Picker.show(iframeObj);

			setBlockData?.({
				arguments: iframeEdit.src,
				options: iframeEdit.attributes,
			});
		} catch (e) {
			//swallow
		}
	};

	return (
		<CustomBlock {...props}>
			<CustomBlock.Controls
				{...props}
				onChange={onChange}
				changeLabel={t('change')}
			/>
			<div
				className={cx('iframe-embed')}
				{...rawContent(getIframeContent(iframeObj))}
			/>
		</CustomBlock>
	);
}
