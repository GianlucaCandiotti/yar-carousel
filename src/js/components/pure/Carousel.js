import React, {Component, PropTypes} from 'react';
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
    }),
    uiState: PropTypes.shape({
      isSwiping: PropTypes.bool
    })
  }

  renderItems = () => {
    const {
      children,
      selectedItem,
      actions
    } = this.props;

    return React.Children.map(children, (item, i) => {
      return (
        <Slide
          key={`item-${i}`}
          cssClasses={cssClasses.ITEM(true, i === selectedItem)}>
          <div
            ref={node => this[`item${i}`] = node}
            onClick={() => actions.handleOnClickItem(item, i)}
            style={{height: '100%'}}>
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
        onClick={actions.changeItem}
      />);
    }

    return (
      <div className="yar-carousel-nav-dots">
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
            className: cssClasses.SLIDER(true, this.props.uiState.isSwiping),
            onSwipeMove: actions.onSwipeMove,
            onSwipeStart: actions.onSwipeStart,
            onSwipeEnd: actions.onSwipeEnd,
            style: itemListStyles,
            onSwipeLeft: actions.slideNext,
            onSwipeRight: actions.slidePrev,
            ref: node => this.itemList = node
          };

    return (
      <div className={cssClasses.CAROUSEL(true)} onMouseEnter={actions.handleOnMouseEnter} onMouseLeave={actions.handleOnMouseLeave}>
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