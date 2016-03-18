import React, {Component, PropTypes} from 'react';
import {Carousel, Slide} from '../../src/js/index';

export default class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <Slide>
          <div className="carousel-image-background" style={{backgroundColor: 'red'}}>
          </div>
        </Slide>
        <Slide>
          <div className="carousel-image-background" style={{backgroundColor: 'blue'}}>
          </div>
        </Slide>
        <Slide>
          <div className="carousel-image-background" style={{backgroundColor: 'yellow'}}>
          </div>
        </Slide>
      </Carousel>
    );
  }
}