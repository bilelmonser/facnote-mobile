/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import {connect} from 'react-redux';
import LogoImage from '../../../assets/images/galery/logo.png';
import BackgroundLoginImage from '../../../assets/images/galery/background_connexion.png';
import {primaryColor} from '../../Theme/AppStyles';

import * as api from '../../services/auth';
import getCabinet from '../../services/cabinet';
import getSociety from '../../services/societe';

import {login} from '../../redux';
import {text, permissions, cabinetHaveAccess} from '../../constants';
import {userHasPermission} from '../../shared/userHasPermission';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      error: '',
      showButtom: true,
      loading: false,
      rememberMe: false,
    };
  }
  async componentDidMount() {
    const name = await AsyncStorage.getItem('name');
    const password = await AsyncStorage.getItem('password');
    const rememberMe = await AsyncStorage.getItem('rememberMe');

    this.setState({
      name: name || '',
      password: password || '',
      rememberMe: rememberMe ? true : false,
    });
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keshowButtomyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keshowButtomyboardDidShow = () => {
    this.setState({showButtom: !this.state.showButtom});
  };

  _keyboardDidHide = () => {
    this.setState({showButtom: !this.state.showButtom});
  };

  onPressLogButton = async () => {
    const {name, password, rememberMe} = this.state;

    try {
      //check if username is null
      // let username = response.user.username !== null;
      this.setState({loading: true});
      let user = await api.login({username: name, password: password});
      await AsyncStorage.setItem('accessToken', user['token']);
      await AsyncStorage.setItem('modules', JSON.stringify(user.user.modules));
      let cabinet = await getCabinet();
      console.log("cabinetHaveAccess",cabinetHaveAccess.includes(cabinet.base))
      if (
        cabinetHaveAccess.length > 0 &&
        !cabinetHaveAccess.includes(cabinet.base)
      )
        throw new Error('cabinet not Have Access!');
      console.log('cabinet', cabinet.base);
      let society = await getSociety();
      this.props.login({
        user: user['user'],
        cabinet: cabinet,
        society: society,
        canShowBank:
          (await userHasPermission(permissions.banque)) ||
          (await userHasPermission(permissions.banque_entreprise)),
      });
      this.setState({loading: false});
      if (rememberMe) {
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('name', name);
        AsyncStorage.setItem('rememberMe', 'true');
      } else {
        AsyncStorage.removeItem('name');
        AsyncStorage.removeItem('password');
        AsyncStorage.removeItem('rememberMe');
      }
    } catch (error) {
      this.setState({
        error: text.ErrorLogin,
        loading: false,
      });
      console.log(error.message);
    }
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.mainContainer}>
            <Image
              source={BackgroundLoginImage}
              style={styles.topImageStyle}></Image>
            {this.state.loading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
            <View style={styles.titleContainer}>
              <Image style={styles.logo} source={LogoImage} />
              <Text style={styles.error}>{this.state.error}</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>{text.Identifiant}</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    autoCompleteType={'name'}
                    style={styles.input}
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                  />
                </View>
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>{text.motDePasse}</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    autoCompleteType={'password'}
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                  />
                </View>
              </View>
              <CheckBox
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxLabel}
                checkedColor={'white'}
                uncheckedColor={'white'}
                title={text.EnregistrerIdentifiant}
                style={styles.checkbox}
                checked={this.state.rememberMe}
                onPress={(value) =>
                  this.setState({rememberMe: !this.state.rememberMe})
                }
              />

              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => this.onPressLogButton()}
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <Text style={styles.signTxt}>{text.Connexion}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
        {this.state.showButtom && (
          <View style={styles.buttomView}>
            <Text
              style={[styles.buttomText, {color: primaryColor}]}
              onPress={() => Linking.openURL(text.mentionLegalesUrl)}>
              {text.mentionsLegales}
            </Text>
            <Text style={[styles.buttomText, {color: primaryColor}]}> - </Text>
            <Text
              onPress={() => Linking.openURL(text.cguURL)}
              style={[styles.buttomText, {color: primaryColor}]}>
              {' '}
              {text.CGU}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
export default connect(null, {login})(LoginScreen);
