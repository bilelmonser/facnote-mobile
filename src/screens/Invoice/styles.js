/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor} from '../../Theme/AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import {fontType, primaryColor} from '../../Theme/AppStyles';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100),
    resizeMode: 'stretch',

    position: 'absolute',
  },
  titleContainer: {
    height: ScaleHelpers.CalcHeight(20),
    width: ScaleHelpers.CalcWidth(100),
    marginBottom: ScaleHelpers.CalcHeight(6),
    justifyContent: 'center',
  },
  buttonContainer: {
    height: ScaleHelpers.CalcHeight(74),
  },
  title: {
    fontFamily: fontType.bold,
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcWidth(6),
  },
  btnView: {
    height: ScaleHelpers.CalcHeight(15),
    marginTop: ScaleHelpers.CalcHeight(3),
  },

  btnContainer: {
    padding: 0,
    flex: 1,
    overflow: 'hidden',
    borderColor: '#2c65c9',
    borderRadius: 20,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Img: {
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(15),
  },
  photosContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: ScaleHelpers.CalcHeight(20),
    justifyContent: 'flex-start',
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(100),
    flexWrap: 'wrap',
  },
  choseFileButton: {
    width: ScaleHelpers.CalcWidth(15),

    height: ScaleHelpers.CalcWidth(15),
  },
  removeFile: {
    position: 'absolute',
    elevation: 5,
    width: ScaleHelpers.CalcWidth(7),
    height: ScaleHelpers.CalcWidth(7),
  },
  iconRemoveFile: {
    width: ScaleHelpers.CalcWidth(7),
    height: ScaleHelpers.CalcWidth(7),
  },

  viewImg: {
    width: ScaleHelpers.CalcWidth(21),
    height: ScaleHelpers.CalcWidth(21),
    marginLeft: ScaleHelpers.CalcWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  imgFacture: {
    marginTop: ScaleHelpers.CalcWidth(3),

    borderRadius: ScaleHelpers.CalcWidth(3),
    width: ScaleHelpers.CalcWidth(20),
    height: ScaleHelpers.CalcWidth(20),
    backgroundColor: 'white',
  },
  iconFile: {
    width: ScaleHelpers.CalcWidth(20),
    height: ScaleHelpers.CalcWidth(20),
    backgroundColor: 'white',
    textAlign: 'center',
    paddingTop: ScaleHelpers.CalcHeight(3),
    marginTop: ScaleHelpers.CalcWidth(3),
    borderRadius: ScaleHelpers.CalcWidth(3),
  },
  backgroundModalStyle: {
    width: ScaleHelpers.CalcWidth(105),
    height: '100%',
    position: 'absolute',
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
    width: ScaleHelpers.CalcWidth(10),
    height: ScaleHelpers.CalcWidth(10),
  },
  closeImg: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),
  },

  SendView: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? ScaleHelpers.CalcWidth(12)
        : ScaleHelpers.CalcWidth(10),
    right: ScaleHelpers.CalcWidth(5),
  },
  SendIconView: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    height: ScaleHelpers.CalcHeight(6),
    // its for android
    elevation: 5,
    width: ScaleHelpers.CalcWidth(30),
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btnTxt: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 15,
    color: primaryColor,
    textAlign: 'center',
  },
  buttomIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(20),
  },

  iconGestion: {
    margin: ScaleHelpers.CalcWidth(4),
    width: ScaleHelpers.CalcWidth(15),
    height: ScaleHelpers.CalcWidth(15),
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
    width: ScaleHelpers.CalcWidth(75),
    height: ScaleHelpers.CalcHeight(13),

    borderRadius: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(40),
  },

  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: fontType.bold,
    color: textColor,
    alignSelf: 'center',
    textAlign: 'center',
    width: ScaleHelpers.CalcWidth(40),
  },
  rightArrow: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),

    alignSelf: 'center',
  },
});

export default styles;
