import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './FadeSlideUp.css';

const FadeSlideUp = ({ foo, children }) => (
  <CSSTransitionGroup
    transitionLeaveTimeout={300}
    transitionEnterTimeout={300}
    transitionName={{
      enter: 'modal-enter',
      enterActive: 'modal-enter-active',
      leave: 'modal-leave',
      leaveActive: 'modal-leave-active'
    }}
  >
    {children}
  </CSSTransitionGroup>
);

export default FadeSlideUp;
