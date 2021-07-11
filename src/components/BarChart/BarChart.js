import React from 'react';
import { View } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';

import { Line } from "react-native-svg";
import { chartColor } from '../../Theme/AppStyles';
import ScaleHelpers from '../../Theme/scaleHelpers';
import { thousandSeparator } from '../../shared/utils';

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 };

const VerticalLine = ({ x, y, xValue }) => (
  <Line
    key={"axis"}
    x1={x(xValue) + ScaleHelpers.CalcWidth(5.5)}
    x2={x(xValue) + ScaleHelpers.CalcWidth(5.5)}
    y1={"0%"}
    y2={"97.5%"}
    stroke={"rgba(194, 194, 194, 1)"}
    strokeWidth={1}
    style={{
      paddingBottom: -21,
      left: 10
    }}
  />
);
export default BarChartCustom = ({ barValue, maxValue, minValue, year }) => {
  return (
    <>
      <YAxis
        data={barValue}
        style={{ marginBottom: 0 }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={3}
        min={minValue - minValue / 4}
        yAccessor={({ item }) => item.value}
        formatLabel={(value) => thousandSeparator(value).replace(/000$/, "K")}
        max={maxValue}
      />
      <View style={{ flex: 1 }}>
        <BarChart
          style={{ flex: 1 }}
          data={barValue.map((item) => item.value)}
          svg={{
            fill: chartColor,
            stroke: "white",
            strokeWidth: 20,
            strokeOpacity: '1',
            fillOpacity: '0.5'
          }}
        >
          {barValue.map((item, index) => <VerticalLine xValue={index} />)}
        </BarChart>
        <XAxis
          data={barValue}
          formatLabel={(_, index) => barValue[index].month}
          contentInset={{ left: 20, right: 20 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
        />
      </View>
    </>
  );
};
