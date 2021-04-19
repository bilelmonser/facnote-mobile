/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'stretch',
    width: ScaleHelpers.CalcWidth(54),
    height: ScaleHelpers.CalcWidth(23),
    margin: 50,
  },
  backgroundStyle: {
    width: '120%',
    height: '100%',
    position: 'absolute',
  },
});

export default styles;
