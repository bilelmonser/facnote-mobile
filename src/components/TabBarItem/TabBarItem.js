/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text,Image} from 'react-native';

class TabBarItem extends React.Component {
  render() {
    const {focused, src, label} = this.props;
    return (
      <View
        style={
           {
            width: 100,
            height: 70,
            padding:10,
            borderRadius: 40,
            backgroundColor:focused ? 'rgb(92,117,254)':"transparent",
            alignItems: 'center',
          }
        }>
        <Image source={src} style={{width: 30, height: 30}} />
        <Text style={{color: focused ? 'white' : 'rgb(112, 112, 112)'}}>
          {label}
        </Text>
      </View>
    );
  }
}
export default TabBarItem;