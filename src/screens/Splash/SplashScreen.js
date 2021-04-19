/* eslint-disable comma-dangle */
import React from 'react';
import {View, Image, TouchableHighlight, ImageBackground} from 'react-native';
import styles from './styles';
import LogoImage from '../../../assets/images/galery/logo.png';
import Rectangle from '../../../assets/images/galery/Rectangle.png';

export default class SplashScreen extends React.Component {
  timer = null;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => this.props.navigation.navigate('Welcome'),
      1000,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Rectangle}
          style={styles.backgroundStyle}></ImageBackground>

        <Image style={styles.logo} source={LogoImage} />
      </View>
    );
  }
}
