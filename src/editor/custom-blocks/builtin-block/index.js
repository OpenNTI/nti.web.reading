import Button from './Button';

export function Build (type) {
	return {
		Button: Button.Build(type)
	};
}
