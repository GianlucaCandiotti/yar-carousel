import React, {Component, PropTypes} from 'react';
import {Carousel, Slide} from '../../src/js/index';

export default class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <Slide>
          <img className="carousel-image" src="https://placeholdit.imgix.net/~text?txtsize=66&txt=700%C3%97300&w=700&h=300" />
        </Slide>
        <Slide>
          <img className="carousel-image" src="https://placeholdit.imgix.net/~text?txtsize=66&txt=700%C3%97300&w=700&h=300" />
        </Slide>
        <Slide>
          <div className="carousel-image-background" style={{backgroundImage: `url('https://placeholdit.imgix.net/~text?txtsize=66&txt=700%C3%97300&w=700&h=300')`}}>
            <p className="carousel-image-text">
              Some Text
            </p>
          </div>
        </Slide>
      </Carousel>
    );
  }
}
