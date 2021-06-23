/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions, Platform} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),
    alignItems: 'center',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScaleHelpers.CalcHeight(20),
    width: ScaleHelpers.CalcWidth(100),
  },
  logo: {
    width: ScaleHelpers.CalcWidth(54),
    height: ScaleHelpers.CalcWidth(23),
    resizeMode: 'stretch',

  },

  title: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito-ExtraBold',
    fontSize: ScaleHelpers.CalcHeight(4),
  },

  buttonView: {
    height: ScaleHelpers.CalcHeight(15),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: ScaleHelpers.CalcWidth(32),
    alignItems: 'center',
    padding: 5,
    backgroundColor:'white',
    borderRadius: 60,
    alignSelf: 'center',
  },
  buttonTxt: {
    fontFamily: fontType.base,
    fontSize: ScaleHelpers.CalcHeight(2),
    color: textColor,
  },

  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  buttomView: {
    bottom: Platform.OS !== 'ios' ? 0 : 15,

    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttomText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: ScaleHelpers.CalcWidth(4),
  },
});

export default styles;
