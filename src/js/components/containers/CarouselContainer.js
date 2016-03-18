import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../pure/Carousel';
import NavDots from '../pure/NavDot';

export default class CarouselContainer extends Component {
  static defaultProps = {
    autoplay: false,
    intervalTime: 3000,
    selectedItem: 0,
    showNavDots: true,
    showNavArrows: true
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    autoplay: PropTypes.bool,
    showNavDots: PropTypes.bool,
    showNavArrows: PropTypes.bool,
    onClickItem: PropTypes.func,
    onChange: PropTypes.func
  }

  state = {
    selectedItem: this.props.selectedItem,
  }

  componentDidMount() {
    this.startAutoplay();
    this.updateSizes();
  }

  componentWillReceiveProps(props, state) {
    if (props.selectedItem !== this.state.selectedItem) {
      this.updateSizes();
      this.setState({
        selectedItem: props.selectedItem
      });
    }
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

  startAutoplay = () => {
    const {
      autoplay,
      intervalTime
    } = this.props;

    if(autoplay === false)
      return null;

    const autoplayInterval = setInterval(() => {
      this.slideNext();
    }, intervalTime);

    this.setState({
      autoplayInterval
    });
  }

  updateSizes = () => {
    const firstItem = this.Carousel.item0;
    this.itemSize = firstItem.clientWidth;
    this.wrapperSize = this.itemSize * this.props.children.length;
  }

  handleOnMouseEnter = () => {
    clearInterval(this.state.autoplayInterval);
  }

  handleOnMouseLeave = () => {
    this.startAutoplay();
  }

  handleOnClickItem = (item, index) => {
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

  handleOnChange = (item, index) => {
    const handler = this.props.onChange;

    if (typeof handler === 'function') {
      handler(item, index);
    }
  }

  slidePrev = (positions) => {
    this.moveTo(this.state.selectedItem - (typeof positions === 'Number' ? positions : 1));
  }

  slideNext = (positions) => {
    this.moveTo(this.state.selectedItem + (typeof positions === 'Number' ? positions : 1));
  }

  moveTo = (position) => {
    position = position < 0 ? this.props.children.length - 1 : position;
    position = position > this.props.children.length - 1 ? 0 : position;

    this.selectItem({
      selectedItem: position
    });
  }

  changeItem = (index) => {
    this.selectItem({
      selectedItem: index
    });
  }

  selectItem = (state) => {
    this.setState(state);
    this.handleOnChange(state.selectedItem, this.props.children[state.selectedItem]);
  }

  onSwipeStart = () => {
    this.setState({
      isSwiping: true
    });
  }

  onSwipeEnd = () => {
    this.setState({
      isSwiping: false
    });
  }

  onSwipeMove = (delta) => {
    const {
      selectedItem
    } = this.state;

    const list            = ReactDOM.findDOMNode(this.Carousel.itemList),
          currentPosition = - selectedItem * 100,
          initialBoundary = 0,
          finalBoundary   = - (this.props.children.length - 1) * 100;

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

  render() {
    const {
      children,
      showNavDots,
      showNavArrows,
      navDotOptions
    } = this.props;

    const {
      selectedItem,
      isSwiping
    } = this.state

    const options = {
      showNavDots,
      showNavArrows,
      navDotOptions
    };

    const actions = {
      handleOnMouseEnter: this.handleOnMouseEnter,
      handleOnMouseLeave: this.handleOnMouseLeave,
      handleOnClickItem: this.handleOnClickItem,
      handleOnChange: this.handleOnChange,
      slidePrev: this.slidePrev,
      slideNext: this.slideNext,
      moveTo: this.moveTo,
      changeItem: this.changeItem,
      selectItem: this.selectItem,
      onSwipeStart: this.onSwipeStart,
      onSwipeEnd: this.onSwipeEnd,
      onSwipeMove: this.onSwipeMove
    };

    const uiState = {
      isSwiping
    };

    return (
      <Carousel ref={node => this.Carousel = node} options={options} actions={actions} uiState={uiState} selectedItem={selectedItem}>
        {children}
      </Carousel>
    );
  }
}