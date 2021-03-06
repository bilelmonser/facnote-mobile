/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, Image} from 'react-native';
import ScaleHelper from '../../Theme/scaleHelpers';
class TabBarItem extends React.Component {
  render() {
    const {focused, src, label} = this.props;
    return (
      <View
        style={{
          width: ScaleHelper.CalcWidth(30),
          alignItems: 'center',
        }}>
        <Image
          source={src}
          style={{
            width: ScaleHelper.CalcWidth(10),
            height: ScaleHelper.CalcHeight(5),
          }}
        />
        <Text
          style={{
            fontFamily: 'Nunito-SemiBold',
            color: focused ? 'rgb(92,117,254)' : 'rgb(112, 112, 112)',
            fontSize: ScaleHelper.CalcWidth(2.8),
          }}>
          {label}
        </Text>
      </View>
    );
  }
}
export default TabBarItem;
