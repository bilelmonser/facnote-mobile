import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor, buttonColor, label} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderError() {
    const {errorLabel} = this.props;
    if (errorLabel) {
      return (
        <View>
          <Text style={styles.error}>{errorLabel}</Text>
        </View>
      );
    }
    return null;
  }
  render() {
    const {label, errorLabel, grid} = this.props;
    return (
      <View style={styles.inputBlock}>
        <Text
          style={{...styles.label, ...{color: errorLabel ? 'red' : textColor}}}>
          {label}
        </Text>

        <View
          style={[
            styles.inputContainer,
            grid == 'column'
              ? {
                  width: ScaleHelpers.CalcWidth(40),
                  margin: ScaleHelpers.CalcWidth(1),
                }
              : {
                  width: ScaleHelpers.CalcWidth(80),
                  margin: ScaleHelpers.CalcWidth(1),
                },
          ]}>
          <TextInput {...this.props} />
          {this.renderError()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    position: 'relative',
    height: ScaleHelpers.CalcHeight(2),
    marginTop: ScaleHelpers.CalcHeight(1),
    marginBottom: ScaleHelpers.CalcHeight(2),

    color: 'red',
    fontSize: 12,
  },
  inputContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,

    paddingLeft: 10,
    height: ScaleHelpers.CalcHeight(7),
    width: ScaleHelpers.CalcWidth(80),
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  inputBlock: {
    height: ScaleHelpers.CalcHeight(13),
  },
  label: {
    fontFamily: fontType.bold,
    margin: ScaleHelpers.CalcWidth(2),
    color: textColor,
    fontSize: 12,
  },
});
