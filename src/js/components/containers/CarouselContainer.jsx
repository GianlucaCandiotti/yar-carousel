import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../pure/Carousel';

export default class CarouselContainer extends Component {
  static defaultProps = {
    autoplay: false,
    intervalTime: 3000,
    selectedItem: 0,
    showNavDots: true,
    showNavArrows: true,
  }

  static propTypes = {
    selectedItem: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    autoplay: PropTypes.bool,
    intervalTime: PropTypes.number,
    showNavDots: PropTypes.bool,
    showNavArrows: PropTypes.bool,
    onClickItem: PropTypes.func,
    onChange: PropTypes.func,
  }

  state = {
    selectedItem: this.props.selectedItem,
    slidesLength: null,
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
    clearInterval(this.state.autoplayInterval);
  }

  onMouseLeave = () => {
    this.startAutoplay();
  }

  onTouchStart = () => {
    this.setState({
      isTouched: true,
    });
    clearInterval(this.state.autoplayInterval);
  }

  onTouchEnd = () => {
    this.setState({
      isTouched: false,
    });
    this.startAutoplay();
  }

  onTouchCancel = () => {
    this.setState({
      isTouched: false,
    });
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
    this.setState({
      isSwiping: true,
    });
  }

  onSwipeEnd = () => {
    this.setState({
      isSwiping: false,
    });
  }

  onSwipeMove = (delta) => {
    const {
      selectedItem,
      slidesLength,
    } = this.state;

    const list = ReactDOM.findDOMNode(this.Carousel.itemList);
    const currentPosition = - selectedItem * 100;
    const initialBoundary = 0;
    const finalBoundary = - (slidesLength - 1) * 100;

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
      slidesLength,
    } = this.state;

    let length = slidesLength;

    if (!length) {
      const slides = this.props.children.filter(item => (
        item.type.name === 'Slide'
      ));

      length = slides.length;

      this.setState({
        slidesLength: length,
      });
    }

    const firstItem = this.Carousel.slide0;
    const itemSize = firstItem.clientWidth;

    this.wrapperSize = itemSize * length;
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
      slidesLength,
    } = this.state;

    let newPosition;

    if (position < 0) {
      newPosition = slidesLength - 1;
    } else if (position >= slidesLength) {
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
    this.setState(state);
    this.onChange(state.selectedItem, this.props.children[state.selectedItem]);
  }

  render() {
    const {
      showNavDots,
      showNavArrows,
    } = this.props;

    const {
      selectedItem,
      isSwiping,
    } = this.state;

    const options = {
      showNavDots,
      showNavArrows,
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
      selectItem: this.selectItem,
    };

    const uiState = {
      isSwiping,
    };

    const slides = [];
    const navArrows = [];

    React.Children.forEach(this.props.children, (item) => {
      if (item.type.name === 'Slide') {
        slides.push(item);
      } else if (item.type.name === 'NavArrow') {
        navArrows.push(item);
      }
    });

    return (
      <Carousel
        ref={ref => {this.Carousel = ref;}}
        selectedItem={selectedItem}
        slides={slides}
        navArrows={navArrows}
        options={options}
        actions={actions}
        uiState={uiState}
      />
    );
  }
}
