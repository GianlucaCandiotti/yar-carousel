import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Swipe from 'react-easy-swipe';
import cssClasses from '../../libs/cssClasses'
import Slide from './Slide';
import NavDot from './NavDot';

export default class Carousel extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    selectedItem: PropTypes.number,
    options: PropTypes.shape({
      showNavDots: PropTypes.bool,
      showNavArrows: PropTypes.bool,
      navDotOptions: PropTypes.object
    }),
    actions: PropTypes.shape({
      handleOnMouseEnter: PropTypes.func,
      handleOnMouseLeave: PropTypes.func,
      handleOnClickItem: PropTypes.func,
      handleOnChange: PropTypes.func,
      onSwipeStart: PropTypes.func,
      onSwipeEnd: PropTypes.func,
      slidePrev: PropTypes.func,
      slideNext: PropTypes.func,
      moveTo: PropTypes.func,
      changeItem: PropTypes.func,
      selectItem: PropTypes.func
    })
  }

  state = {
    swiping: false
  }

  componentWillMount() {
    if(typeof window !== "undefined") {
      window.addEventListener("resize", this.updateSizes);
      window.addEventListener("DOMContentLoaded", this.updateSizes);
    }
  }

  componentWillUnmount() {
    if(typeof window !== "undefined") {
      window.removeEventListener("resize", this.updateSizes);
      window.removeEventListener("DOMContentLoaded", this.updateSizes);
    }
  }

  componentDidMount () {
    this.updateSizes();
  }

  updateSizes = () => {
    const firstItem = this.item0;
    this.itemSize = firstItem.clientWidth;
    this.wrapperSize = this.itemSize * this.props.children.length;
  }

  onSwipeStart = () => {
    this.setState({
      swiping: true
    });
  }

  onSwipeEnd = () => {
    this.setState({
      swiping: false
    });
  }

  onSwipeMove = (delta) => {
    const {
      children,
      selectedItem
    } = this.props;

    const list            = ReactDOM.findDOMNode(this.itemList),
          currentPosition = - selectedItem * 100,
          initialBoundary = 0,
          finalBoundary   = - (children.length - 1) * 100;

    let axisDelta = delta.x;

    if (currentPosition === initialBoundary && axisDelta > 0 ||
        currentPosition === finalBoundary && axisDelta < 0) {
        axisDelta = 0;
    }

    const position = currentPosition + (100 / (this.wrapperSize / axisDelta)) + '%';

    [
      'WebkitTransform',
      'MozTransform',
      'MsTransform',
      'OTransform',
      'transform',
      'msTransform'
    ].forEach((prop) => {
        list.style[prop] = `translate3d(${position }, 0, 0)`;
    });
  }

  renderItems = () => {
    const {
      children,
      actions
    } = this.props;

    return React.Children.map(children, (item, i) => {
      //const itemClass = klass.ITEM(true, index === this.state.selectedItem);

      return (
        <Slide key={`item-${i}`}>
          <div ref={node => this[`item${i}`] = node} onClick={() => actions.handleOnClickItem(item, i)} style={{height: '100%'}}>
            {item.props.children}
          </div>
        </Slide>
      );
    });
  }

  renderNavDots = () => {
    const {
      children,
      selectedItem,
      options,
      actions
    } = this.props;

    if(!options.showNavDots)
      return null;

    const itemsLength = children.length,
          navDots     = [];

    for(let i = 0; i < itemsLength; i++) {
      navDots.push(<NavDot
        key={`nav-dot-${i}`}
        index={i}
        cssClasses={cssClasses.DOT(i === selectedItem)}
        selected={(i === selectedItem)}
        options={options.navDotOptions}
        onClick={actions.changeItem}
      />);
    }

    return (
      <div className="carousel-nav-dots">
        {navDots}
      </div>
    );
  }

  render() {
    const {
      children,
      options,
      actions,
      selectedItem
    } = this.props;

    const itemsLength = children.length;

    if (itemsLength === 0)
      return;

    const canShowNavArrows = options.showNavArrows && itemsLength > 1,
          hasPrev          = canShowNavArrows && selectedItem > 0,
          hasNext          = canShowNavArrows && selectedItem < itemsLength - 1,
          currentPosition  = - selectedItem * 100 + '%',
          transformProp    = `translate3d(${currentPosition }, 0, 0)`,
          itemListStyles   = {
            'WebkitTransform': transformProp,
               'MozTransform': transformProp,
                'MsTransform': transformProp,
                 'OTransform': transformProp,
                  'transform': transformProp,
                'msTransform': transformProp
          },
          swiperProps      = {
            selectedItem: selectedItem,
            className: cssClasses.SLIDER(true, this.state.swiping),
            onSwipeMove: this.onSwipeMove,
            onSwipeStart: this.onSwipeStart,
            onSwipeEnd: this.onSwipeEnd,
            style: itemListStyles,
            onSwipeLeft: actions.slideNext,
            onSwipeRight: actions.slidePrev,
            ref: node => this.itemList = node
          };

    return (
      <div className="carousel" onMouseEnter={actions.handleOnMouseEnter} onMouseLeave={actions.handleOnMouseLeave}>
        <div style={{height: '100%'}}>
          <Swipe tagName="ul" {...swiperProps}>
            {this.renderItems()}
          </Swipe>
        </div>
        {this.renderNavDots()}
      </div>
    );
  }
}