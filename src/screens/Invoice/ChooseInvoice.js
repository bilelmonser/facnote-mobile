/*This is an example of File Picker in React Native*/
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
  Modal,
} from 'react-native';

import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faShoppingCart,
  faEuroSign,
  faFileAlt,
  faCar,
} from '@fortawesome/free-solid-svg-icons';

import Background from '../../../assets/images/galery/backgroung_depose_facture.png';
import ChooseFacture from './UploadInvoice';
import IndemnitiesScreen from '../Indemnities/IndemnitiesScreen';
import {routes, permissions} from '../../constants';
import {userHasPermission} from '../../shared/userHasPermission';
import {primaryColor} from '../../Theme/AppStyles';

import styles from './styles';

class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      typeFacture: '0',
      canSalesOrPurchase: false,
      canExpenseReport: false,
    };
  }

  async componentDidMount() {
    var canSalesOrPurchase =
      (await userHasPermission(permissions.sales)) ||
      (await userHasPermission(permissions.purchases));
    var canExpenseReport = await userHasPermission(permissions.expenseReport);
    this.setState({canSalesOrPurchase, canExpenseReport});
  }
  setInvoiceType = (typeFacture) => {
    this.setState({typeFacture: typeFacture, showModal: !this.state.showModal});
  };
  closeModal = async (obj) => {
    await this.setState({showModal: !this.state.showModal});
    const from = await AsyncStorage.getItem('from');
    await AsyncStorage.removeItem('from');
    if (from == routes.BankStatement) {
      this.props.navigation.navigate(routes.BankStatement);
    }
    if (obj != null) await Toast.show(obj);
  };

  render() {
    const {society} = this.props.user;
    const {canSalesOrPurchase, canExpenseReport} = this.state;
    return (
      <View style={styles.containerStyle}>
        <Image source={Background} style={styles.backgroundStyle}></Image>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{society.cabinet.raison_sociale}</Text>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{elevation: 11}} />

        <ScrollView style={styles.scrollView}>
          <View style={styles.buttonContainer}>
            {canSalesOrPurchase && (
              <View style={styles.btnView}>
                <TouchableHighlight
                  style={styles.btnContainer}
                  onPress={() => this.setInvoiceType(1)}
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <View style={styles.itemContainer}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.itemTitle}>Achat</Text>
                    </View>
                    <FontAwesomeIcon
                      style={styles.rightArrow}
                      icon={faShoppingCart}
                      size={35}
                      color={primaryColor}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            )}
            {canExpenseReport && (
              <View style={styles.btnView}>
                <TouchableHighlight
                  style={styles.btnContainer}
                  onPress={() => this.setInvoiceType(3)}
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <View style={styles.itemContainer}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.itemTitle}>Avance de frais</Text>
                    </View>
                    <FontAwesomeIcon
                      style={styles.rightArrow}
                      icon={faEuroSign}
                      size={35}
                      color={primaryColor}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            )}
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setInvoiceType(4)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>Document</Text>
                  </View>
                  <FontAwesomeIcon
                    style={styles.rightArrow}
                    icon={faFileAlt}
                    size={35}
                    color={primaryColor}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setInvoiceType(0)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>Indemnite</Text>
                  </View>
                  <FontAwesomeIcon
                    style={styles.rightArrow}
                    icon={faCar}
                    size={35}
                    color={primaryColor}
                  />
                </View>
              </TouchableHighlight>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}>
            {this.state.typeFacture == 0 ? (
              <IndemnitiesScreen closeModal={this.closeModal} />
            ) : (
              <ChooseFacture
                typeFacture={this.state.typeFacture}
                closeModal={this.closeModal}
              />
            )}
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(UploadScreen);
