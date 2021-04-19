import React from 'react';
import {TouchableHighlight, Image, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import Rectangle from '../../../assets/images/galery/Rectangle.png';

export default class SubmitButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.btnSubmitContainer}
        onPress={this.props.onPress}
        underlayColor="rgba(214, 214, 214, 0.4)">
        <>
          <Image style={styles.rectangle} source={Rectangle} />
          <Text style={styles.submitTxt}>
            {' '}
            {this.props.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              this.props.label
            )}
          </Text>
        </>
      </TouchableHighlight>
    );
  }
}
