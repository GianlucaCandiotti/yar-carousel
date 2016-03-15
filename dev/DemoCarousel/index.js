import React from 'react';
import ReactDOM from 'react-dom';
import DemoCarousel from './DemoCarousel';

export default (function() {
  const mount_point = document.getElementById('mount-point');

  if(mount_point) {
    ReactDOM.render(
      <DemoCarousel />,
      mount_point
    );
  }
}());