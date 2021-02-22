import Button from './Button';
import Editor from './Editor';
import { Name } from './Constants';
import { isCourseFigureBlock } from './utils';

export default {
	Button,
	component: Editor,
	className: Editor.WrapperClassName,
	type: Name,
	handlesBlock: (...args) => isCourseFigureBlock(...args),
	editable: false,
};
