import React from 'react';
import { Carousel, Slide, NavArrow } from '../../../src/js/index';

export default function DemoCarousel() {
  const navArrows = {
    left: '<',
    right: '<',
  };

  return (
    <Carousel
      autoplay
      navArrows={navArrows}
    >
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'red' }} />
      </Slide>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'green' }} />
      </Slide>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'blue' }} />
      </Slide>
    </Carousel>
  );
}
