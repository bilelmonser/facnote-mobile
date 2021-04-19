/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import LogoImage from '../../../assets/images/galery/logo.png';

import {text, routes} from '../../constants';
import {primaryColor} from '../../Theme/AppStyles';

import backgroundWelcomeImage from '../../../assets/images/galery/bg-connexion.png';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('modules');
    await AsyncStorage.removeItem('from');
  }

  onPressLogButton = () => {
    this.props.navigation.navigate(routes.Login);
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={backgroundWelcomeImage}
              style={styles.topImageStyle}></Image>
            <View>
              <View style={styles.titleContainer}>
              <Image style={styles.logo} source={LogoImage} />
              </View>
              <View style={styles.buttonView}>
                <TouchableHighlight
                  style={styles.buttonContainer}
                  underlayColor="rgba(73,182,77,1,0.9)"
                  onPress={() => this.onPressLogButton()}>
                  <Text style={styles.buttonTxt}>{text.identifier}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttomView}>
          <Text
            style={[styles.buttomText, {color: primaryColor}]}
            onPress={() =>
              Linking.openURL('https://facnote.com/fr/mentions.html')
            }>
            {text.mentionsLegales}
          </Text>
          <Text style={[styles.buttomText, {color: primaryColor}]}>
            {' '}
            -{' '}
          </Text>
          <Text
            onPress={() => Linking.openURL('https://facnote.com/fr/cgu.html')}
            style={[styles.buttomText, {color: primaryColor}]}>
            {' '}
            {text.CGU}
          </Text>
        </View>
      </View>
    );
  }
}
