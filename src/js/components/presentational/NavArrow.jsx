import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
  cssClasses: PropTypes.string,
  onClick: PropTypes.func,
};

export default function NavArrow(props) {
  return (
    <button className={props.cssClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

NavArrow.propTypes = propTypes;
