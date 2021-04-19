/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import Background from '../../../assets/images/galery/bg-accueil-Provisoire.png';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: null};
  }


  renderData = ({item}) => <Text style={{marginBottom: 2}}>{item}</Text>;

  render() {
    const {society} = this.props.user;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Background}
          style={styles.topImageStyle}></ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>{society.cabinet.raison_sociale}</Text>
          <Text style={styles.text}>
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(HomeScreen);