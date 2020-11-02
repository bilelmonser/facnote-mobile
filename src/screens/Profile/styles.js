/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:ScaleHelpers.CalcHeight(25)
  },
  infoContainer: {
    marginBottom: 40,
    //marginTop: 80
    marginTop: 30
  },
  cabinetImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10
  },
  CabinerName: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgb(112 ,112, 112)'
  },
  CabinerInfo:{
    fontSize: 15,
    color: 'rgb(112 ,112, 112)',
    textAlign: 'center',

  },
 
  btnContainer: {
    
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,

    // its for android 
    elevation: 5,
    position:'relative',
    marginTop:ScaleHelpers.CalcHeight(3),
    marginBottom: ScaleHelpers.CalcHeight(1),
    width: ScaleHelpers.CalcWidth(70),
    borderRadius: 10,
    backgroundColor: 'rgb( 255,255,255)',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btnTxt: {
    fontSize: 16,
    color: '#070f12',
    fontWeight: '400',
    textAlign: 'center'
  }
});

export default styles;
