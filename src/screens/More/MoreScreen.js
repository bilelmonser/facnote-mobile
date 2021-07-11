/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, TouchableHighlight, Text, ScrollView} from 'react-native';
import styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFileContract,
  faIdCard,
  faShoppingBag,
  faEuroSign,
  faPencilAlt,
  faBell,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {text, routes, permissions} from '../../constants';
import {textColor} from '../../Theme/AppStyles';

import {userHasPermission} from '../../shared/userHasPermission';
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

class MoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSale: false,
      canHistory: false,
      canPurchase: false,
    };
  }

  async componentDidMount() {
    var canSale = await userHasPermission(permissions.sales);
    var canPurchase = await userHasPermission(permissions.purchases);
    var canExpenseReport = await userHasPermission(permissions.expenseReport);

    var canHistory = canSale || canPurchase || canExpenseReport;
    this.setState({canSale, canPurchase, canHistory});
  }

  render() {
    const {canSale, canPurchase, canHistory} = this.state;
    const {cabinet} = this.props.user;
    return (
      <View>
        <NavigationHeader
          title={text.Plus + '..'}
          powerOff={true}
          subTitle={''}
        />

        <ScrollView>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{text.gestion}</Text>
            </View>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate(routes.Cabinet)}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <FontAwesomeIcon icon={faIdCard} size={28} color={textColor} />
                <Text style={styles.itemTitle}>
                  {cabinet.cabinet.raison_sociale}
                </Text>
              </View>
            </TouchableHighlight>
            {canHistory && (
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.navigate(
                    routes.HistoryOfPayementReceipts,
                  )
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <FontAwesomeIcon
                    icon={faFileContract}
                    size={28}
                    color={textColor}
                  />
                  <Text style={styles.itemTitle}>
                    {text.HistoriqueJustificatifs}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
            {canSale && (
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.navigate(routes.MyPurchases)
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    size={28}
                    color={textColor}
                  />
                  <Text style={styles.itemTitle}>{text.MesAchats}</Text>
                </View>
              </TouchableHighlight>
            )}
            {canPurchase && (
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate(routes.Sales)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <FontAwesomeIcon
                    icon={faEuroSign}
                    size={28}
                    color={textColor}
                  />
                  <Text style={styles.itemTitle}>{text.Ventes}</Text>
                </View>
              </TouchableHighlight>
            )}
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)">
              <View
                style={[
                  styles.itemContainer,
                  {backgroundColor: '#00000029', elevation: 1},
                ]}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  size={28}
                  color={textColor}
                />
                <Text style={styles.itemTitle}>{text.Note}</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{text.parametre}</Text>
            </View>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)">
              <View
                style={[
                  styles.itemContainer,
                  {backgroundColor: '#00000029', elevation: 1},
                ]}>
                <FontAwesomeIcon
                  icon={faBell}
                  size={28}
                  color={textColor}
                />
                <Text style={styles.itemTitle}>{text.alertes}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)">
              <View
                style={[
                  styles.itemContainer,
                  {backgroundColor: '#00000029', elevation: 1},
                ]}>
                <FontAwesomeIcon
                  icon={faStar}
                  size={28}
                  color={textColor}
                />
                <Text style={styles.itemTitle}>{text.avis}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(MoreScreen);
