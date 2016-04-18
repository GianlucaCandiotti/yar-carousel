import React from 'react';
import { Carousel, Slide, NavArrow } from '../../../src/js/index';

export default function DemoCarousel() {
  return (
    <Carousel autoplay showNavArrows>
      <NavArrow direction={"left"}>
        <span>
          {'<'}
        </span>
      </NavArrow>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'red' }} />
      </Slide>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'green' }} />
      </Slide>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'blue' }} />
      </Slide>
      <NavArrow direction={"right"}>
        <span>
          {'>'}
        </span>
      </NavArrow>
    </Carousel>
  );
}
