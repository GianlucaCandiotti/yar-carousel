import classNames from 'classnames';

export default {
  CAROUSEL: (isSlider) => (
    classNames({
      "yar-carousel": true,
      "carousel": true,
      "has-slides": isSlider,
      "has-thumbs": !isSlider
    })
  ),
  SLIDER: (isSlider, isSwiping) => (
    classNames({
      "yar-carousel-thumbs": !isSlider,
      "yar-carousel-slides": isSlider,
      "is-animated": !isSwiping
    })
  ),
  ITEM: (isSlider, selected) => (
    classNames({
      "yar-carousel-thumb": !isSlider,
      "yar-carousel-slide": isSlider,
      "is-selected": selected
    })
  ),
  DOT: (selected) => (
    classNames({
      "yar-carousel-nav-dot": true,
      "is-selected": selected
    })
  )
};