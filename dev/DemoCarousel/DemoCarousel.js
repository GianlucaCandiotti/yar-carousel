import React from 'react';
import { Carousel, Slide, NavArrow } from '../../src/js/index';

export default function DemoCarousel() {
  return (
    <Carousel autoplay showNavArrows>
      <NavArrow direction={"left"}>
        <span>
          {'<'}
        </span>
      </NavArrow>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'red' }}></div>
      </Slide>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'blue' }}></div>
      </Slide>
      <Slide>
        <div className="carousel-image-background" style={{ backgroundColor: 'yellow' }}></div>
      </Slide>
      <NavArrow direction={"right"}>
        <span>
          {'>'}
        </span>
      </NavArrow>
    </Carousel>
  );
}
