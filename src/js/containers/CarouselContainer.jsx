import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../components/Carousel';

export default class CarouselContainer extends Component {
  static defaultProps = {
    autoplay: false,
    intervalTime: 3000,
    selectedItem: 0,
    navArrows: null,
    showNavDots: true,
  }

  static propTypes = {
    selectedItem: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    autoplay: PropTypes.bool,
    intervalTime: PropTypes.number,
    navArrows: PropTypes.object,
    showNavDots: PropTypes.bool,
    onClickItem: PropTypes.func,
    onChange: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onSwipeStart: PropTypes.func,
    onSwipeEnd: PropTypes.func,
  }

  state = {
    selectedItem: this.props.selectedItem,
    isSwiping: false,
    isTouched: false,
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateSizes);
      window.addEventListener('DOMContentLoaded', this.updateSizes);
    }
  }

  componentDidMount() {
    this.startAutoplay();
    this.updateSizes();
  }

  componentWillReceiveProps(props) {
    if (props.selectedItem !== this.state.selectedItem) {
      this.updateSizes();
      this.setState({
        selectedItem: props.selectedItem,
      });
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateSizes);
      window.removeEventListener('DOMContentLoaded', this.updateSizes);
    }
  }

  onMouseEnter = () => {
    const {
      isTouched,
    } = this.state;

    if (isTouched) {
      this.setState({
        isTouched: false,
      });
    } else {
      clearInterval(this.state.autoplayInterval);
    }
  }

  onMouseLeave = () => {
    this.startAutoplay();
  }

  onTouchStart = () => {
    const handler = this.props.onTouchStart;

    if (typeof handler === 'function') {
      handler();
    }

    this.setState({
      isTouched: true,
    });

    clearInterval(this.state.autoplayInterval);
  }

  onTouchEnd = () => {
    const handler = this.props.onTouchEnd;

    if (typeof handler === 'function') {
      handler();
    }

    this.startAutoplay();
  }

  onTouchCancel = () => {
    this.startAutoplay();
  }

  onClickItem = (item, index) => {
    const handler = this.props.onClickItem;

    if (typeof handler === 'function') {
      handler(item, index);
    }

    if (index !== this.state.selectedItem) {
      this.setState({
        selectedItem: index,
      });
    }
  }

  onChange = (item, index) => {
    const handler = this.props.onChange;

    if (typeof handler === 'function') {
      handler(item, index);
    }
  }

  onSwipeStart = () => {
    const handler = this.props.onSwipeStart;

    if (typeof handler === 'function') {
      handler();
    }

    this.setState({
      isSwiping: true,
    });
  }

  onSwipeEnd = () => {
    const handler = this.props.onSwipeEnd;

    if (typeof handler === 'function') {
      handler();
    }

    this.setState({
      isSwiping: false,
    });
  }

  onSwipeMove = (delta) => {
    const {
      children,
    } = this.props;

    const {
      selectedItem,
    } = this.state;

    const list = ReactDOM.findDOMNode(this.Carousel.itemList);
    const currentPosition = - selectedItem * 100;
    const initialBoundary = 0;
    const finalBoundary = - (children.length - 1) * 100;

    let axisDelta = delta.x;

    if (
      currentPosition === initialBoundary && axisDelta > 0
      || currentPosition === finalBoundary && axisDelta < 0
    ) {
      axisDelta = 0;
    }

    const position = `${currentPosition + (100 / (this.wrapperSize / axisDelta))}%`;

    [
      'WebkitTransform',
      'MozTransform',
      'MsTransform',
      'OTransform',
      'transform',
      'msTransform',
    ].forEach((prop) => {
      list.style[prop] = `translate3d(${position}, 0, 0)`;
    });
  }

  updateSizes = () => {
    const {
      children,
    } = this.props;

    const firstItem = this.Carousel.slide0;
    const itemSize = firstItem.clientWidth;

    this.wrapperSize = itemSize * children.length;
  }

  startAutoplay = () => {
    const {
      autoplay,
      intervalTime,
    } = this.props;

    if (autoplay === false) {
      return false;
    }

    const autoplayInterval = setInterval(() => {
      this.slideNext();
    }, intervalTime);

    this.setState({
      autoplayInterval,
    });

    return true;
  }

  slidePrev = (positions) => {
    this.moveTo(this.state.selectedItem - (typeof positions === 'number' ? positions : 1));
  }

  slideNext = (positions) => {
    this.moveTo(this.state.selectedItem + (typeof positions === 'number' ? positions : 1));
  }

  moveTo = (position) => {
    const {
      children,
    } = this.props;

    let newPosition;

    if (position < 0) {
      newPosition = children.length - 1;
    } else if (position >= children.length) {
      newPosition = 0;
    } else {
      newPosition = position;
    }

    this.selectItem({
      selectedItem: newPosition,
    });
  }

  changeItem = (index) => {
    this.selectItem({
      selectedItem: index,
    });
  }

  selectItem = (state) => {
    const {
      children,
    } = this.props;

    const index = state.selectedItem;

    this.setState(state);
    this.onChange(children[index], index);
  }

  render() {
    const {
      children,
      navArrows,
      showNavDots,
    } = this.props;

    const {
      selectedItem,
      isSwiping,
    } = this.state;

    const options = {
      navArrows,
      showNavDots,
    };

    const actions = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      onTouchCancel: this.onTouchCancel,
      onClickItem: this.onClickItem,
      onChange: this.onChange,
      onSwipeStart: this.onSwipeStart,
      onSwipeEnd: this.onSwipeEnd,
      onSwipeMove: this.onSwipeMove,
      slidePrev: this.slidePrev,
      slideNext: this.slideNext,
      moveTo: this.moveTo,
      changeItem: this.changeItem,
    };

    const uiState = {
      isSwiping,
    };

    const slides = React.Children.toArray(children);

    return (
      <Carousel
        ref={ref => {this.Carousel = ref;}}
        selectedItem={selectedItem}
        slides={slides}
        options={options}
        actions={actions}
        uiState={uiState}
      />
    );
  }
}
