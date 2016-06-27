import React, { Component, PropTypes } from 'react';
import Swipe from 'react-easy-swipe';
import cssClasses from '../utils/cssClasses';
import Slide from './Slide';
import NavArrow from './NavArrow';
import NavDot from './NavDot';

export default class Carousel extends Component {
  static propTypes = {
    selectedItem: PropTypes.number,
    slides: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    options: PropTypes.shape({
      navArrows: PropTypes.object,
      showNavDots: PropTypes.bool,
    }),
    actions: PropTypes.shape({
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      onClickItem: PropTypes.func,
      onChange: PropTypes.func,
      onSwipeStart: PropTypes.func,
      onSwipeEnd: PropTypes.func,
      slidePrev: PropTypes.func,
      slideNext: PropTypes.func,
      moveTo: PropTypes.func,
      changeItem: PropTypes.func,
    }),
    uiState: PropTypes.shape({
      isSwiping: PropTypes.bool,
    }),
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  renderSlides = () => {
    const {
      slides,
      selectedItem,
      actions,
    } = this.props;

    return slides.map((item, i) => (
        <Slide
          key={`slide-${i}`}
          index={i}
          cssClasses={cssClasses.item(true, i === selectedItem)}
          onClick={actions.onClickItem}
        >
          <div
            ref={ref => {this[`slide${i}`] = ref;}}
            className="yar-carousel-slide-helper"
            style={{ height: '100%' }}
          >
            {item.props.children}
          </div>
        </Slide>
    ));
  }

  renderNavArrow = (direction) => {
    const {
      options,
      actions,
    } = this.props;

    const navArrowContent = options.navArrows[direction].match(/\.(jpeg|jpg|svg|png)$/) !== null
      ? <img
        src={options.navArrows[direction]}
        alt="Navigation Arrow"
        className="yar-carousel-nav-arrow-image"
      />
      : options.navArrows[direction];

    return (
      <NavArrow
        cssClasses={cssClasses.arrow(direction)}
        onClick={direction === 'left' ? actions.slidePrev : actions.slideNext}
      >
        {navArrowContent}
      </NavArrow>
    );
  }

  renderNavDots = () => {
    const {
      slides,
      selectedItem,
      options,
      actions,
    } = this.props;

    if (!options.showNavDots) {
      return false;
    }

    const itemsLength = slides.length;
    const navDots = [];

    for (let i = 0; i < itemsLength; i++) {
      navDots.push(<NavDot
        key={`nav-dot-${i}`}
        index={i}
        cssClasses={cssClasses.dot(i === selectedItem)}
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
      selectedItem,
      slides,
      options,
      actions,
    } = this.props;

    const itemsLength = slides.length;

    if (itemsLength === 0) {
      return false;
    }

    const canShowNavArrows = options.navArrows && itemsLength > 1;
    const currentPosition = `${- selectedItem * 100}%`;
    const transformProp = `translate3d(${currentPosition}, 0, 0)`;
    const itemListStyles = {
      WebkitTransform: transformProp,
      MozTransform: transformProp,
      MsTransform: transformProp,
      OTransform: transformProp,
      transform: transformProp,
      msTransform: transformProp,
    };
    const swiperProps = {
      selectedItem,
      tagName: 'ul',
      className: cssClasses.slider(true, this.props.uiState.isSwiping),
      onSwipeMove: actions.onSwipeMove,
      onSwipeStart: actions.onSwipeStart,
      onSwipeEnd: actions.onSwipeEnd,
      style: itemListStyles,
      onSwipeLeft: actions.slideNext,
      onSwipeRight: actions.slidePrev,
      ref: ref => {this.itemList = ref;},
    };

    const renderLeftNavArrow = canShowNavArrows ? this.renderNavArrow('left') : null;
    const renderRightNavArrow = canShowNavArrows ? this.renderNavArrow('right') : null;

    return (
      <div
        className={cssClasses.carousel(true)}
        onMouseEnter={actions.onMouseEnter}
        onMouseLeave={actions.onMouseLeave}
        onTouchStart={actions.onTouchStart}
        onTouchEnd={actions.onTouchEnd}
        onTouchCancel={actions.onTouchCancel}
      >
        {renderLeftNavArrow}
        <div style={{ height: '100%' }}>
          <Swipe {...swiperProps}>
            {this.renderSlides()}
          </Swipe>
        </div>
        {renderRightNavArrow}
        {this.renderNavDots()}
      </div>
    );
  }
}
