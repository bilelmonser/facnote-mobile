/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLink} from '@fortawesome/free-solid-svg-icons';

import {Badge, Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';
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
    height: ScaleHelpers.CalcHeight(10),
  },
  itemIcon: {
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(7),
    height: ScaleHelpers.CalcWidth(7),
    marginRight: ScaleHelpers.CalcWidth(1),
    marginLeft: ScaleHelpers.CalcWidth(1),
    //lineHeight: 30
  },
  itemTxtContainer: {
    alignSelf: 'center',
    margin: ScaleHelpers.CalcWidth(1),
    lineHeight: 34,
    width: ScaleHelpers.CalcWidth(35),
  },
  libelle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    color: '#707070',
    fontFamily: fontType.bold,
  },

  amountContainer: {
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(20),
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
});
const StatusHistory = {
  1: 'primary',
  2: 'warning',
  3: 'success',
  5: 'error',
};
class CardView extends React.Component {
  render() {
    const item = this.props.item;
    return item.isTitle ? (
      <TitleCard text={item.text}></TitleCard>
    ) : (
      <View style={[styles.mainContainer, item.id > 1 ? styles.border : {}]}>
        <View style={styles.rowContainer}>
          <View style={styles.itemTxtContainer}>
            <Text style={styles.itemTitle}>{item.label}</Text>
          </View>
          <View
            style={[
              styles.itemTxtContainer,
              {width: ScaleHelpers.CalcWidth(20)},
            ]}>
            <Text style={styles.itemTitle}>
              <Badge
                value={item.status_label}
                status={StatusHistory[item.status.toString()]}
              />
            </Text>
          </View>
          <TouchableHighlight
            style={styles.itemIcon}
            onPress={() => this.props.onShowModal(item)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <FontAwesomeIcon icon={faLink} size={23} color="black" />
          </TouchableHighlight>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountItem}>
            {(item.procent ? item.procent : 0) + ' €'}
          </Text>
        </View>
      </View>
    );
  }
}
export default CardView;
