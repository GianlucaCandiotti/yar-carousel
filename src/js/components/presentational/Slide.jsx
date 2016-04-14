import React, { Component, PropTypes } from 'react';

export default class Slide extends Component {
  static propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    cssClasses: PropTypes.string,
    onClick: PropTypes.func,
  };

  onClick = () => {
    const {
      index,
      onClick,
    } = this.props;

    onClick(this, index);
  }

  render() {
    const {
      children,
      cssClasses,
    } = this.props;

    return (
      <li
        className={cssClasses}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}
