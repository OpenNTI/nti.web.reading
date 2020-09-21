import Button from './Button';
import Editor from './Editor';
import {Name} from './Constants';
import {isIframeBlock} from './utils';

export default {
	Button,
	component: Editor,
	className: Editor.WrapperClassName,
	type: Name,
	handlesBlock: (...args) => isIframeBlock(...args),
	editable: false
};
