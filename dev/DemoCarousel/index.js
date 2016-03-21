import React from 'react';
import ReactDOM from 'react-dom';
import DemoCarousel from './DemoCarousel';

export default (function mountDemoCarousel() {
  const mountPoint = document.getElementById('mount-point');

  if (mountPoint) {
    ReactDOM.render(
      <DemoCarousel />,
      mountPoint
    );
  }
}());
