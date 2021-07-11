/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';

const styles = StyleSheet.create({
  headerButtonImage: {
    resizeMode: 'stretch',
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(16),
    position: 'absolute',
    margin: 0,
  },

  headerContain: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    paddingTop: ScaleHelpers.CalcHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(16),
    width: ScaleHelpers.CalcWidth(80),
  },
  title: {
    fontFamily: fontType.bold,
    fontSize: ScaleHelpers.CalcWidth(5),
    color: 'white',
  },
  subTitle: {
    fontFamily: fontType.base,
    fontSize: ScaleHelpers.CalcWidth(3.8),
    color: 'white',
  },
  inputContainer: {
    paddingLeft: 10,
    height: ScaleHelpers.CalcHeight(7),
    width: ScaleHelpers.CalcWidth(80),
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
    flexDirection:'row'
  },

  exercice: {
    textAlign:'center',
    fontFamily: fontType.med,
    color: 'white',
    width: ScaleHelpers.CalcWidth(65),
    fontSize: ScaleHelpers.CalcWidth(4),
  },
  chevronDown: {
    alignSelf:"center",
    fontSize: ScaleHelpers.CalcWidth(4),
  },
});

export default styles;
