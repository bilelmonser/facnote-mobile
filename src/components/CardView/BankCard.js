/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, TouchableHighlight} from 'react-native';

import {Text} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faShoppingCart,
  faComment,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import Tooltip from 'react-native-walkthrough-tooltip';
import {primaryColor} from '../../Theme/AppStyles';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';
/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import TitleCard from './TitleCard';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    borderColor: 'rgba(214, 214, 214, 1)',
    borderTopWidth: 1,
  },

  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: ScaleHelpers.CalcHeight(12),
    width: ScaleHelpers.CalcWidth(60),
  },

  itemTxtContainer: {
    alignSelf: 'center',
    lineHeight: 34,
    marginLeft: ScaleHelpers.CalcWidth(5),
    marginRight: ScaleHelpers.CalcWidth(10),
  },
  libelle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: fontType.bold,
    color: '#707070',
  },

  amountContainer: {
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(30),
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  amountItem: {
    textAlign: 'center',
    fontSize: ScaleHelpers.CalcWidth(4),
    color: '#707070',
    fontFamily: fontType.bold,
  },
  iconContainer: {
    alignSelf: 'center',
    lineHeight: 34,
    alignItems: 'center',
    paddingTop: ScaleHelpers.CalcWidth(3),
    borderRadius: ScaleHelpers.CalcWidth(10),
    width: ScaleHelpers.CalcWidth(12),
    height: ScaleHelpers.CalcWidth(12),
  },
});

class BankCard extends React.Component {
  state = {
    toolTipVisible: false,
  };
  renderIcon = () => {
    if (
      this.props.item.associer == null &&
      this.props.item.justificatif &&
      this.props.item.facture_tag == null
    ) {
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: primaryColor,
            },
          ]}>
          <FontAwesomeIcon icon={faPlus} size={23} color="white" />
        </View>
      );
    }

    if (
      this.props.item.associer == null &&
      this.props.item.etat_commentaire == 3 &&
      this.props.item.facture_tag !== null
    ) {
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: '#FD3550',
            },
          ]}>
          <FontAwesomeIcon icon={faComments} size={23} color="white" />
        </View>
      );
    }

    if (
      this.props.item.associer == null &&
      (this.props.item.etat_commentaire == 4 ||
        this.props.item.etat_commentaire == 5) &&
      this.props.item.facture_tag !== null
    ) {
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: '#15CA20',
            },
          ]}>
          <FontAwesomeIcon icon={faComment} size={23} color="white" />
        </View>
      );
    }
    return (
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: '#15CA20',
          },
        ]}>
        <FontAwesomeIcon icon={faShoppingCart} size={23} color="white" />
      </View>
    );
  };
  render() {
    const item = this.props.item;
    return item.isTitle ? (
      <TitleCard text={item.text}></TitleCard>
    ) : (
      <TouchableHighlight
        style={styles.mainContainer}
        onPress={() => this.props.onCardPress()}
        underlayColor="rgba(73,182,77,1,0.9)">
        <View
          style={[styles.mainContainer, item.counter > 1 ? styles.border : {}]}>
          <View style={[styles.rowContainer]}>
            {this.renderIcon()}
            <View style={[styles.itemTxtContainer]}>
              <Tooltip
                isVisible={this.state.toolTipVisible}
                topAdjustment={0}
                content={<Text> {item.libelle}</Text>}
                placement="top"
                onClose={() => this.setState({toolTipVisible: false})}>
                <TouchableHighlight
                  onPress={() => this.setState({toolTipVisible: true})}
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <Text
                    style={[
                      styles.libelle,
                      {
                        color:
                          item.associer || !item.justificatif
                            ? '#15CA20'
                            : '#707070',
                      },
                    ]}
                    numberOfLines={2}>
                    {item.libelle}
                  </Text>
                </TouchableHighlight>
              </Tooltip>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountItem}>{item.value + ' €'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default BankCard;
