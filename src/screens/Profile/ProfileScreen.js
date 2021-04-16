/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Linking,
  ImageBackground,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {logout} from '../../redux';
import {text} from '../../constants';

class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          console.log('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  sendMail = (email) => {
    Linking.openURL(`mailto:${email}?subject=Cabinet`);
  };

  render() {
    const {cabinet, society} = this.props.user;

    return (
      <View style={styles.container}>

        
        <ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={{
                ...styles.btn,
                ...{
                  borderColor: 'rgba(46, 204, 113, 0.5)',
                  backgroundColor: 'rgba(46, 204, 113, 0.9)',
                },
              }}
              onPress={() => this.callNumber(cabinet.fax)}>
              <Text style={{...styles.btnTxt, ...{color: 'white'}}}>
                {text.Appeler}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.btn,
                ...{
                  borderColor: 'rgba(92,117,254,0.5)',
                  backgroundColor: 'rgba(92,117,254,0.9)',
                },
              }}
              onPress={() => this.sendMail(cabinet.email)}>
              <Text style={{...styles.btnTxt, ...{color: 'white'}}}>
                {text.EnvoyerEmail}
              </Text>
            </TouchableHighlight>
            <View style={styles.infoContainer}>
              <View style={styles.cabinetImgContainer}>
                <ImageBackground
                  resizeMode={'contain'}
                  style={styles.cabinetImg}
                  source={
                    cabinet.logo1 != ''
                      ? {uri: cabinet.logo1}
                      : cabinet.logo2 != ''
                      ? {uri: cabinet.logo2}
                      : require('../../../assets/images/imgpsh_fullsize_anim.png')
                  }
                />
              </View>
              <Text style={styles.CabinerName}>
                {cabinet.cabinet.raison_sociale}
              </Text>
              <Text style={styles.CabinerInfo}>
                {cabinet.address.code_postale} {cabinet.address.adresse}{' '}
              </Text>
              <Text style={styles.CabinerInfo}>
                {cabinet.address.ville} {cabinet.address.pays}
              </Text>
            </View>
       
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps, {logout})(NotificationsScreen);
