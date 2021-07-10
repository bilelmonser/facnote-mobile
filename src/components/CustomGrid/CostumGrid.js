import React from 'react';

import {G, Line} from 'react-native-svg';

export default CustomGrid = ({x, y, data, ticks}) => (
  <G>
    {
      // Horizontal grid
      ticks.map((tick) => (
        <Line
          key={tick}
          x1={'0%'}
          x2={'0%'}
          y1={y(tick)}
          y2={y(tick)}
          stroke={'rgba(194, 194, 194, 1)'}
        />
      ))
    }
    {
      // Vertical grid
      data.map((_, index) => (
        <Line
          key={index}
          y1={'0%'}
          y2={'100%'}
          x1={x(index)}
          x2={x(index)}
          stroke={'rgba(0,0,0,0.2)'}
        />
      ))
    }
  </G>
);
