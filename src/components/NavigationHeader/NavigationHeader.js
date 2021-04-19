/* eslint-disable comma-dangle */
import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSlidersH, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import ScaleHelpers from '../../Theme/scaleHelpers';
import  background from '../../../assets/images/galery/NavigationBackground.png'

export default class NavigationHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContain}>
        <Image
          style={styles.headerButtonImage}
          source={background}
        />
        { this.props.onPress && (
        <TouchableOpacity
          style={{
            width: ScaleHelpers.CalcWidth(10),
            height: ScaleHelpers.CalcWidth(5),
            paddingLeft: ScaleHelpers.CalcWidth(5),
            alignItems: 'center',
          }}
          onPress={this.props.onPress}>
          <FontAwesomeIcon icon={faChevronLeft} size={25} color="white" />
        </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subTitle}>{this.props.subTitle}</Text>
        </View>

        {this.props.onPressTwo && (
          <TouchableOpacity
            style={{
              width: ScaleHelpers.CalcWidth(10),
              height:  ScaleHelpers.CalcWidth(5),
              paddingRight: ScaleHelpers.CalcWidth(5),
              alignItems: 'center',
            }}
            onPress={this.props.onPressTwo}>
            <FontAwesomeIcon icon={faSlidersH} size={25} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

NavigationHeader.propTypes = {
  onPress: PropTypes.func,
};
