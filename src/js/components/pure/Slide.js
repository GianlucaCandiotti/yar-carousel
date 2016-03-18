import React from 'react';

export default (props) => (
  <li className={props.cssClasses}>
    {props.children}
  </li>
);