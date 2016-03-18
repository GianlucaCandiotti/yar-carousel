import React from 'react';

export default (props) => (
  <span className={props.cssClasses} onClick={() => props.onClick(props.index)}></span>
);