import React, {Component, PropTypes} from 'react';

export default class NavDot extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    selected: PropTypes.bool,
    cssClasses: PropTypes.string,
    options: PropTypes.shape({
      color: PropTypes.string,
      size: PropTypes.string
    }),
    onClick: PropTypes.func
  }

  render() {
    const {
      index,
      selected,
      cssClasses,
      options,
      onClick
    } = this.props;

    if(options) {
      const styles = {
        borderColor: options.color ? options.color : '',
        backgroundColor: selected && options.color ? options.color : '',
        width: options.size ? options.size : '',
        height: options.size ? options.size : ''
      };
    }

    return (
      <span className={cssClasses} onClick={() => onClick(index)} style={(typeof styles !== "undefined") ? styles : {}}>
      </span>
    );
  }
}
