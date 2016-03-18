import React from 'react';

export default (props) => (
  <div onClick={props.onClick}>
    {props.children}
  </div>
);