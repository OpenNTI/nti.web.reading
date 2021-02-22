import Button from './Button';
import Editor from './Editor';
import { Name } from './Constants';
import { isVideoRefBlock } from './utils';

export default {
	Button,
	component: Editor,
	className: Editor.WrapperClassName,
	type: Name,
	handlesBlock: (...args) => isVideoRefBlock(...args),
	editable: false,
};
