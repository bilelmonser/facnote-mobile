import React from 'react';
import { View } from 'react-native';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomGrid from '../CustomGrid/CostumGrid';
import { chartColor } from "../../Theme/AppStyles"
import { thousandSeparator } from '../../shared/utils';

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 };

export default LineChartCustom = ({ lineChartValue, maxValue, minValue, year }) => {
  return (
    <>
      <YAxis
        data={lineChartValue}
        style={{ marginBottom: 0 }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={3}
        min={minValue - minValue / 4}
        yAccessor={({ item }) => item.value}
        formatLabel={(value) => thousandSeparator(value).replace(/000$/, "K")}
        max={maxValue}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={lineChartValue}
          yAccessor={({ item }) => item.value}
          svg={{
            stroke: chartColor,
            strokeWidth: 2,
            strokeOpacity: '0.5'
          }}
          curve={shape.curveNatural}
        >
          <CustomGrid />
        
        </LineChart>
        <XAxis
          data={lineChartValue}
          formatLabel={(_, index) => lineChartValue[index].month}
          contentInset={{ left: 10, right: 10 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
        />
      </View>
    </>
  );
};
