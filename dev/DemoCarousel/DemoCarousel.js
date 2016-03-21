import React from 'react';
import { Carousel, Slide, NavArrow } from '../../src/js/index';

export default function DemoCarousel() {
  const options = {
    autoplay: true,
    intervalTime: 2000,
  };

  return (
    <Carousel {...options}>
      <NavArrow direction={"left"}>
        <span>
          {'<'}
        </span>
      </NavArrow>
      <Slide>
        <img className="carousel-image" src={"https://placeholdit.imgix.net/~text?txtsize=33&txt=750%C3%97500&w=750&h=500"} />
      </Slide>
      <Slide>
        <img className="carousel-image" src={"https://placeholdit.imgix.net/~text?txtsize=33&txt=750%C3%97500&w=750&h=500"} />
      </Slide>
      <Slide>
        <img className="carousel-image" src={"https://placeholdit.imgix.net/~text?txtsize=33&txt=750%C3%97500&w=750&h=500"} />
      </Slide>
      <NavArrow direction={"right"}>
        <span>
          {'>'}
        </span>
      </NavArrow>
    </Carousel>
  );
}
