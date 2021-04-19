/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import CabinetBackground from '../../../assets/images/galery/Rectangle.png';
import rightArrow from '../../../assets/icons/rightArrow.png';
import {connect} from 'react-redux';
import {text, routes, permissions} from '../../constants';
import {userHasPermission} from '../../shared/userHasPermission';
import {logout} from '../../redux';

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

    var canHistory = canSale || canPurchase || canExpenseReport ;
    this.setState({canSale, canPurchase, canHistory});
  }

  render() {
    const {canSale, canPurchase, canHistory} = this.state;
    const {cabinet} = this.props.user;
    return (
      <View>
        <Image source={CabinetBackground} style={styles.topImageStyle}></Image>
        <View style={styles.header}>
          {/* <Image style={styles.polygonImg} source={Polygone} />
          
          <Text style={styles.headerBigText}>{text.nomComplet}</Text>
         

          <Text style={styles.headerText}>{text.voirProfile}</Text>*/}
        </View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate(routes.Cabinet)}
          underlayColor="rgba(73,182,77,1,0.9)">
          <View style={styles.cabinetCard}>
            <Text style={styles.cabinetText}>{cabinet.cabinet.raison_sociale}</Text>
          </View>
        </TouchableHighlight>
        <ScrollView>
          <View style={styles.content}>
            {canHistory && (
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.navigate(
                    routes.HistoryOfPayementReceipts,
                  )
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>
                      {text.HistoriqueJustificatifs}
                    </Text>
                  </View>
                  <Image style={styles.rightArrow} source={rightArrow} />
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
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>{text.MesAchats}</Text>
                  </View>
                  <Image style={styles.rightArrow} source={rightArrow} />
                </View>
              </TouchableHighlight>
            )}
            {canPurchase && (
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate(routes.Sales)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>{text.Ventes}</Text>
                  </View>
                  <Image style={styles.rightArrow} source={rightArrow} />
                </View>
              </TouchableHighlight>
            )}
            <TouchableHighlight
              onPress={() => this.props.logout()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View
                style={{
                  ...styles.itemContainer,
                  ...{
                    borderColor: 'rgba(171, 183, 183, 1)',
                    backgroundColor: 'rgba(171, 183, 183, 1)',
                  },
                }}>
                <View style={styles.rowContainer}>
                  <Text
                    style={{
                      ...styles.itemTitle,
                      ...{
                        color: 'white',
                        borderColor: 'rgba(171, 183, 183, 1)',
                        backgroundColor: 'rgba(171, 183, 183, 1)',
                      },
                    }}>
                    {text.Deconnecter}
                  </Text>
                </View>
                <View style={styles.rightArrow}></View>
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
export default connect(mapStateToProps, {logout})(MoreScreen);
