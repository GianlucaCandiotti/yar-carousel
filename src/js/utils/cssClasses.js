import classNames from 'classnames';

export default {
  carousel: (isSlider) => (
    classNames({
      'yar-carousel': true,
      carousel: true,
      'has-slides': isSlider,
      'has-thumbs': !isSlider,
    })
  ),
  slider: (isSlider, isSwiping) => (
    classNames({
      'yar-carousel-thumbs': !isSlider,
      'yar-carousel-slides': isSlider,
      'is-animated': !isSwiping,
    })
  ),
  item: (isSlider, selected) => (
    classNames({
      'yar-carousel-thumb': !isSlider,
      'yar-carousel-slide': isSlider,
      'is-selected': selected,
    })
  ),
  arrow: (direction) => (
    classNames({
      'yar-carousel-nav-arrow': true,
      'is-left': direction === 'left',
      'is-right': direction === 'right',
    })
  ),
  dot: (selected) => (
    classNames({
      'yar-carousel-nav-dot': true,
      'is-selected': selected,
    })
  ),
};
