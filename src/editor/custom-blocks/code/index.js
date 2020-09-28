import Button from './Button';
import Editor from './Editor';
import {Name} from './Constants';
import {isCodeBlock} from './utils';

export default {
	Button,
	component: Editor,
	className: Editor.WrapperClassName,
	type: Name,
	handlesBlock: (...args) => isCodeBlock(...args),
	editable: false
};
