/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),
    alignItems: 'center',
    backgroundColor: 'white',
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
  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily:"SegoeUI-Light",
    color: textColor,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(50),
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,

    elevation: 5,
  },
  modalCloseView: {
    top: ScaleHelpers.CalcHeight(3),
    right: ScaleHelpers.CalcWidth(33),
  },
  closeImg: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),
  },
});

export default styles;