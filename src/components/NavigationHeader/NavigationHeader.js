/* eslint-disable comma-dangle */
import React from 'react';
import { TouchableOpacity, Image, View, Text, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSlidersH,
  faChevronLeft,
  faPowerOff,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import ModalSelector from 'react-native-modal-selector';

import ScaleHelpers from '../../Theme/scaleHelpers';
import background from '../../../assets/images/galery/NavigationBackground.png';
import { logout } from '../../redux';

class NavigationHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContain}>
        <Image style={styles.headerButtonImage} source={background} />
        {this.props.onPress && (
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
          {this.props.showSelectExecices && (
            <ModalSelector
              style={styles.inputContainer}
              cancelText={'Fermer'}
              data={this.props.exercises}
              onChange={(option) => {
                this.props.setExercise(option);
              }}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="exercises"
                  style={styles.exercice}
                  editable={false}
                  value={this.props.exercise.label}
                  placeholderTextColor="white"
                />
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={styles.chevronDown}
                  size={20}
                  color="white"
                />
              </View>
            </ModalSelector>
          )}
        </View>

        {this.props.onPressTwo && (
          <TouchableOpacity
            style={{
              width: ScaleHelpers.CalcWidth(10),
              height: ScaleHelpers.CalcWidth(5),
              paddingRight: ScaleHelpers.CalcWidth(5),
              alignItems: 'center',
            }}
            onPress={this.props.onPressTwo}>
            <FontAwesomeIcon icon={faSlidersH} size={25} color="white" />
          </TouchableOpacity>
        )}
        {this.props.powerOff && (
          <TouchableOpacity
            style={{
              width: ScaleHelpers.CalcWidth(10),
              height: ScaleHelpers.CalcWidth(5),
              paddingLeft: ScaleHelpers.CalcWidth(5),
              paddingBottom: Platform.OS === 'ios' ? ScaleHelpers.CalcHeight(5) : ScaleHelpers.CalcHeight(10)
            }}
            onPress={() => this.props.logout()}>
            <FontAwesomeIcon icon={faPowerOff} size={25} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps, { logout })(NavigationHeader);
