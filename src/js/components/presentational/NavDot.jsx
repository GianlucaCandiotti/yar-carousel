import React, { Component, PropTypes } from 'react';

export default class NavDot extends Component {
  static propTypes = {
    index: PropTypes.number,
    cssClasses: PropTypes.string,
    onClick: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.cssClasses !== nextProps.cssClasses;
  }

  onClick = () => {
    const {
      index,
      onClick,
    } = this.props;

    onClick(index);
  }

  render() {
    const {
      cssClasses,
    } = this.props;

    return (
      <span className={cssClasses} onClick={this.onClick} />
    );
  }
}
