/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, Image} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Badge, Text} from 'react-native-elements';
import styles from './styles';
import {text} from '../../constants';

const StatusHistory = {
  1: 'primary',
  2: 'warning',
  3: 'success',
  5: 'error',
};
class CardView extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <Collapse>
        <CollapseHeader>
          {item.isTitle ? (
            <View style={styles.itemTitleContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>{item.text}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.mainContainer}>
              <View style={styles.rowContainer}>
                <Image style={styles.itemIcon} source={item.icon} />
                <View style={styles.itemTxtContainer}>
                  <Text style={styles.blueTitle}>{item.title}</Text>
                </View>
                <View style={styles.itemTxtContainer}>
                  <Text style={styles.itemTitle}>{item.date}</Text>
                </View>
                <View style={styles.itemTxtContainer}>
                  <Text style={styles.itemTitle}>
                    <Badge
                      value={item.status_label}
                      status={StatusHistory[item.status.toString()]}
                    />{' '}
                  </Text>
                </View>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountItem}>
                  {item.procent ? item.procent : 0 + ' €'}
                </Text>
              </View>
            </View>
          )}
        </CollapseHeader>
        {!item.isTitle ? (
          <CollapseBody>
            <View style={{alignItems: 'center'}}>
              <View style={styles.row}>
                <Text style={{...styles.blueItemText}}>{text.Type}:</Text>
                <Text style={{...styles.itemText}}>{item.type}</Text>
                <Text style={{...styles.blueItemText}}>{text.Source}:</Text>
                <Text style={{...styles.itemText}}>{item.source}</Text>
              </View>

              <View style={styles.row}>
                <Text style={{...styles.blueItemText}}>{text.BillNumber}:</Text>
                <Text style={{...styles.itemText}}>{item.bill_number}</Text>
                <Text style={{...styles.blueItemText}}>{text.Libelle}:</Text>
                <Text style={{...styles.itemText}}>{item.label}</Text>
              </View>
            </View>
          </CollapseBody>
        ) : (
          <></>
        )}
      </Collapse>
    );
  }
}
export default CardView;
