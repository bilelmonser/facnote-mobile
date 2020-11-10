/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, Image} from 'react-native';
import ScaleHelper from '../../components/scaleHelpers';
class TabBarItem extends React.Component {
  render() {
    const {focused, src, label} = this.props;
    return (
      <View
        style={{
          width: ScaleHelper.CalcWidth(30),
          height: 70,
          padding: 10,
          borderRadius: 40,

          backgroundColor:
            focused && label == 'Déposer facture'
              ? 'rgb(92,117,254)'
              : 'transparent',
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
            fontFamily: 'Nunito-Light',
            color:
              focused && label == 'Déposer facture'
                ? 'white'
                : focused
                ? 'rgb(92,117,254)'
                : 'rgb(112, 112, 112)',
            fontSize: ScaleHelper.CalcWidth(3),
          }}>
          {label}
        </Text>
      </View>
    );
  }
}
export default TabBarItem;
