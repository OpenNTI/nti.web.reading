import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Styles from './Container.css';
import Context from './Context';
import OptionTrigger from './OptionTrigger';

const cx = classnames.bind(Styles);

const Transition = (props) => (<CSSTransition classNames="fade-in-out" timeout={40000} {...props} />);

ContentOptionsContainer.Trigger = OptionTrigger;
ContentOptionsContainer.propTypes = {
	className: PropTypes.string,
	content: PropTypes.any,
	options: PropTypes.any
};
export default function ContentOptionsContainer ({className, content, options}) {
	const [showOptions, setShowOptions] = React.useState(false);

	return (
		<Context.Provider
			value={{
				showOptions: () => setShowOptions(true),
				hideOptions: () => setShowOptions(false),
				showingOptions: showOptions,
				hasOptions: Boolean(options)
			}}
		>
			<TransitionGroup className={cx('content-option-container', className, {'show-options': showOptions})}>
				{showOptions ?
					(
						<Transition key="options">
							<div className={cx('options')}>
								{options}
							</div>
						</Transition>
					) :
					(
						<Transition key="content">
							<div className={cx('content')}>
								{content}
							</div>
						</Transition>
					)
				}
			</TransitionGroup>
		</Context.Provider>
	);
}
