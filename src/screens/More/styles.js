/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: ScaleHelpers.CalcHeight(100),
    padding: ScaleHelpers.CalcWidth(1),
  },

  itemContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',

    width: ScaleHelpers.CalcWidth(30),
    height: ScaleHelpers.CalcHeight(12),
    margin: ScaleHelpers.CalcWidth(1),
    paddingTop: ScaleHelpers.CalcWidth(4),
    paddingBottom: ScaleHelpers.CalcWidth(4),
    backgroundColor: 'white',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    alignItems: 'center',
  },
  titleContainer: {
    width: ScaleHelpers.CalcWidth(100),
    paddingTop: ScaleHelpers.CalcWidth(4),
    paddingBottom: ScaleHelpers.CalcWidth(4),
  },
  title: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: fontType.bold,
    color: textColor,
  },

  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: fontType.base,
    color: textColor,
    alignContent: 'center',
    textAlign: 'center',
  },
});

export default styles;
