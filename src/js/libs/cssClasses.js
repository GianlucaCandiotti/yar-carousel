import classNames from 'classnames';

export default {
  CAROUSEL: (isSlider) => (
    classNames({
      "carousel": true,
      "carousel-slider": isSlider
    })
  ),
  WRAPPER: (isSlider, axis) => (
    classNames({
      "thumbs-wrapper": !isSlider,
      "slides-wrapper": isSlider,
      "axis-horizontal": axis === "horizontal",
      "axis-vertical": axis !== "horizontal"
    })
  ),
  SLIDER: (isSlider, isSwiping) => (
    classNames({
      "thumbs": !isSlider,
      "slides": isSlider,
      "is-animated": !isSwiping
    })
  ),
  ITEM: (isSlider, selected) => (
    classNames({
      "thumb": !isSlider,
      "slide": isSlider,
      "is-selected": selected
    })
  ),
  DOT: (selected) => (
    classNames({
      "carousel-nav-dot": true,
      'is-selected': selected
    })
  )
};