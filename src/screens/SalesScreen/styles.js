/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor, buttonColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';


const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),
    paddingTop: ScaleHelpers.CalcWidth(5),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topContainer: {alignContent: 'center', height: ScaleHelpers.CalcHeight(10)},

  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    margin: ScaleHelpers.CalcWidth(1),
    color: textColor,
    fontFamily: fontType.bold,
  },

  flatListStyle: {
    maxHeight: '80%',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: ScaleHelpers.CalcHeight(1),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(2),
    marginBottom: ScaleHelpers.CalcHeight(2),

    width: ScaleHelpers.CalcWidth(30),
    height: ScaleHelpers.CalcHeight(5),

    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100),
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalCloseView: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? ScaleHelpers.CalcWidth(14)
        : ScaleHelpers.CalcWidth(12),
    left: ScaleHelpers.CalcWidth(5),
  },
  closeImg: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),
  },
  pdfContainer: {
    flex: 1,
    marginTop: ScaleHelpers.CalcHeight(9),
    marginBottom: ScaleHelpers.CalcHeight(10),
    height: ScaleHelpers.CalcHeight(100),
    width: ScaleHelpers.CalcWidth(90),
  },
  pdf: {
    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(50),
  },

  backgroundModalStyle: {
    width: ScaleHelpers.CalcWidth(105),
    height: '100%',
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: ScaleHelpers.CalcHeight(12),
  },
  titleModalContainer: {
    alignItems: 'center',
  },
  titleModalText: {
    fontSize: ScaleHelpers.CalcWidth(5),
    color: 'rgb(112,112,112)',
    fontFamily: fontType.bold,
  },

  modalContant: {
    height: ScaleHelpers.CalcHeight(40),
    margin: ScaleHelpers.CalcWidth(3),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    margin: ScaleHelpers.CalcHeight(2),
    padding: ScaleHelpers.CalcHeight(2),
    width: ScaleHelpers.CalcWidth(90),
    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    flex: 1,
  },
  input: {
    height: '100%',
    width: '40%',
  },
  ButtonsContain: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(15),
  },
  textInfo: {
    fontSize: ScaleHelpers.CalcWidth(4),
    color: textColor,
    fontFamily: fontType.bold,
    marginTop: ScaleHelpers.CalcWidth(2),
  },
  widthTLabelInfo: {
    width: ScaleHelpers.CalcWidth(25),
  },
  widthTextInfo: {
    width: ScaleHelpers.CalcWidth(60),
  },
});

export default styles;
