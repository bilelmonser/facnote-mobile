/* eslint-disable comma-dangle */
import {StyleSheet, Platform} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),

  },
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(110),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScaleHelpers.CalcHeight(50),
    width: ScaleHelpers.CalcWidth(100),
  },
  error: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'red',
    marginTop: ScaleHelpers.CalcHeight(3),
    maxHeight: ScaleHelpers.CalcHeight(10),
    fontWeight: 'bold',
    fontSize: ScaleHelpers.CalcWidth(4),
  },
  logo: {
    width: ScaleHelpers.CalcWidth(32),
    height: ScaleHelpers.CalcWidth(32),
    resizeMode:'stretch'

  },
  formContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(40),
    paddingBottom: ScaleHelpers.CalcHeight(18),
  },

  title: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    lineHeight: 33,
  },

  label: {
    fontFamily: fontType.base,
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(1),

    marginLeft: ScaleHelpers.CalcWidth(20),
    color: 'white',
    fontSize: ScaleHelpers.CalcWidth(4),
  },

  buttonContainer: {
    height: ScaleHelpers.CalcHeight(10),
    marginTop: ScaleHelpers.CalcHeight(1),

    alignSelf: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    paddingLeft: 10,
    height: ScaleHelpers.CalcHeight(7),
    width: ScaleHelpers.CalcWidth(60),
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems:"center",
    alignContent:"center"
  },
  inputBlock: {
    height: ScaleHelpers.CalcHeight(12),
  },
  input: {
    height: "100%",
    width: "100%",
  },
  buttonStyle: {
    width: ScaleHelpers.CalcWidth(40),
    alignItems: 'center',
    padding: ScaleHelpers.CalcWidth(1),
    backgroundColor:'white',
    borderRadius: 60,
    alignSelf: 'center',
    color: textColor,
    fontFamily: fontType.base,
  },
  signTxt: {
    fontFamily: fontType.base,
    fontSize: ScaleHelpers.CalcWidth(4),
    color: 'grey',
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

  checkboxContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(242, 242, 242,0)',
    borderColor: 'rgba(242, 242, 242,0)',
    marginLeft: ScaleHelpers.CalcWidth(20),
  },
  checkbox: {
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(0.5),
    color: 'white',
  },
  checkboxLabel: {
    fontFamily: fontType.base,
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(1),
    color: 'white',
    fontSize: ScaleHelpers.CalcWidth(4),
  },
  loader: {
    justifyContent: 'center',
    position: 'absolute',
    height: ScaleHelpers.CalcHeight(80),
    width: ScaleHelpers.CalcWidth(100),
  },
});

export default styles;
