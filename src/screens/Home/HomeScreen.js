/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import SegmentedControlTabs from 'react-native-segmented-control-tabs';
import moment from 'moment';
import getIndicator from '../../services/getIndicator';
import getSigIndicator from '../../services/getSigIndicator';
import PageLoader from '../../components/PageLoader/PageLoader';
import { text } from '../../constants';
import ScaleHelpers from '../../Theme/scaleHelpers';
import { fontType } from '../../Theme/AppStyles';
import Rectangle from '../../../assets/images/galery/Rectangle.png';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import getExercices from '../../services/getExercices';
import LineChartCustom from '../../components/LineChart/LineChart';
import BarChartCustom from '../../components/BarChart/BarChart';

import styles from './styles';
import { getMaxArrayValue, getMinArrayValue, thousandSeparator } from '../../shared/utils';

const Tooltip = ({ text, onlyText }) => (<View
  style={{
    backgroundColor: onlyText ? 'transparent' : 'rgba(253, 227, 167, 0.6)',
    justifyContent: 'center',
    borderRadius: ScaleHelpers.CalcWidth(2),
    padding: ScaleHelpers.CalcWidth(2),
    alignItems: 'center'
  }}
>
  <Text style={{ color: onlyText ? 'rgba(194, 194, 194, 1)' : 'orange', fontFamily: fontType.bold }}>{text}</Text>
</View>
);

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      loading: false,
      exercises: [],
      exercise: {},
      turnover: {},
      fixedCharge: {},
      notFixedCharge: {},
      bankBalance: {},
      marge: {},
      excedentBrut: {},
      chargePersonel: {},
    };
  }
  async componentDidMount() {
    var exercisesData = await getExercices();
    let exercises = [];
    exercisesData.exercises.map((item, index) => {
      exercises.push({
        key: index++,
        label: `${moment(item.date_debut).format('DD/MM/YYYY')} au ${moment(
          item.date_fin,
        ).format('DD/MM/YYYY')}`,
        date_debut: item.date_debut,
        date_fin: item.date_fin,
      });
    });

    const exercise = exercises.find(
      (item) =>
        item.date_debut == exercisesData.current_exercise.date_debut &&
        item.date_fin == exercisesData.current_exercise.date_fin,
    );
    this.loadIndicateur(exercise.date_debut);
    this.setState({
      exercises,
      exercise,
    });
  }
  async loadIndicateur(date) {
    this.setState({ loading: true });

    let indicators = await getIndicator(moment(date).format('YYYY'));

    const turnover = indicators.data_table_2.find(
      (item) => item.label == "Chiffre d'affaire",
    );
    const fixedCharge = indicators.data_table_2.find(
      (item) => item.label == 'Charge fixe',
    );
    const notFixedCharge = indicators.data_table_2.find(
      (item) => item.label == 'Charge variable',
    );

    let bankBalance = indicators.data_table_1.find(
      (item) => item.label == 'Solde de la banque',
    );
    if (!!indicators.total_solde_1)
      bankBalance.total = indicators.total_solde_1

    this.setState({
      turnover,
      fixedCharge,
      notFixedCharge,
      bankBalance,

      loading: false,
    });

    let sigIndicators = await getSigIndicator(moment(date).format('YYYY'));


    const marge = sigIndicators.data.find(
      (item) => item.label == 'Marge commerciale',
    );
    const excedentBrut = sigIndicators.data.find(
      (item) => item.label == "Excédent brut d'exploitation",
    );

    const chargePersonel = sigIndicators.data.find(
      (item) => item.label == 'Charges de personnel',
    );

    this.setState({
      marge,
      excedentBrut,
      chargePersonel,
      loading: false,
    });



  }

  handleIndexChange = async (index) => {
    await this.setState({
      ...this.state,
      selectedIndex: index,
    });
    // this.loadIndicateur(this.state.exercise.date_debut)
  };
  getTurnoverValues = () => {
    const { turnover } = this.state;

    let tab = [];
    let keys = this.getChargeKeys();
    tab = keys.map((item, index) => {
      let value = 0;
      if (!isNaN(turnover[item])) {
        value = parseFloat(Number(turnover[item]).toFixed(2));
      }
      return {
        value: value,
        month: keys[index],
      };
    });
    return tab;
  };

  getBalancesValues = () => {
    const { bankBalance } = this.state;

    let tab = [];
    let keys = this.getChargeKeys();

    tab = keys.map((item, index) => {
      let value = 0;
      if (!isNaN(bankBalance[item])) {
        value = parseFloat(Number(bankBalance[item]).toFixed(2));
      }
      return {
        value: value,
        month: keys[index],
      };
    });

    return tab;
  };

  getChargeValues = () => {
    const { fixedCharge, notFixedCharge } = this.state;

    let tab = [];

    let keys = this.getChargeKeys();

    tab = keys.map((item, index) => {
      let value = 0

      if (!isNaN(fixedCharge[item]) || !isNaN(notFixedCharge[item])) {
        value = Number((fixedCharge[item] + notFixedCharge[item]).toFixed(2))
      }

      return {
        value: value,
        month: keys[index],
      };
    });
    return tab;
  };
  getChargeKeys = (index = null) => {
    const { notFixedCharge } = this.state;
    let tab = Object.keys(notFixedCharge).slice(3);
    if (index != null) {
      return tab[index];
    } else {
      return tab;
    }
  };

  getMargeValues = () => {
    const { marge } = this.state;

    let tab = [];
    let keys = this.getChargeKeys();
    tab = keys.map((item, index) => {
      let value = 0
      if (!isNaN(marge[item]))
        value = Number(marge[item]?.toFixed(2))
      return {
        value: value,
        month: item,
      };
    });
    console.log("marge", tab)
    return tab;
  };

  getExcedentValues = () => {
    const { excedentBrut } = this.state;

    let tab = [];
    let keys = this.getChargeKeys();
    tab = keys.map((item, index) => {
      let value = 0
      if (!isNaN(excedentBrut[item]))
        value = Number(excedentBrut[item]?.toFixed(2))
      return {
        value: value,
        month: keys[index],
      };
    });
    return tab;
  };
  getChargePersonelValues = () => {
    const { chargePersonel } = this.state;

    let tab = [];
    let keys = this.getChargeKeys();
    tab = keys.map((item, index) => {
      let value = 0
      if (!isNaN(chargePersonel[item]))
        value = Number(chargePersonel[item]?.toFixed(2))
      return {
        value: value,
        month: keys[index],
      };
    });
    return tab;
  };

  render() {
    const {
      exercise,
      exercises,
      turnover,
      fixedCharge,
      notFixedCharge,
      bankBalance,
      loading,
    } = this.state;

    var lineChartChargeValue = this.getChargeValues();
    const maxChargeValue = getMaxArrayValue(lineChartChargeValue);
    const minChargeValue = getMinArrayValue(lineChartChargeValue);

    var lineChartTurnoverValue = this.getTurnoverValues();
    const maxTurnoverValue = getMaxArrayValue(lineChartTurnoverValue);
    const minTurnoverValue = getMinArrayValue(lineChartTurnoverValue);

    var barChartBankBalance = this.getBalancesValues();
    const maxBalanceValue = getMaxArrayValue(barChartBankBalance);
    const minBalanceValue = getMinArrayValue(barChartBankBalance);

    var lineChartMargeValue = this.getMargeValues();
    const maxMargeValue = getMaxArrayValue(lineChartMargeValue);
    const minMargeValue = getMinArrayValue(lineChartMargeValue);

    var lineChartExcedentValue = this.getExcedentValues();
    const maxExcedentValue = getMaxArrayValue(lineChartExcedentValue);
    const minExcedentValue = getMinArrayValue(lineChartExcedentValue);


    var lineChartChargePersonelValue = this.getChargePersonelValues();
    const maxChargePersonelValue = getMaxArrayValue(lineChartChargePersonelValue);
    const minChargePersonelValue = getMinArrayValue(lineChartChargePersonelValue);

    return (
      <>
        <NavigationHeader
          title={text.Indicateur}
          powerOff={true}
          showSelectExecices
          exercises={exercises}
          exercise={exercise}
          setExercise={(option) => {
            this.setState({
              exercise: option,
            });
            this.loadIndicateur(option.date_debut);
          }}
        />
        <View style={styles.container}>
          {loading && (
            <PageLoader showBackground={true} size="large" color="#0000ff" />
          )}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            pagingEnabled={true} style={{ maxHeight: ScaleHelpers.CalcHeight(10), minHeight: ScaleHelpers.CalcHeight(10) }}>
            <View>


              <SegmentedControlTabs
                values={[
                  <>
                    {this.state.selectedIndex == 0 && (
                      <Image style={styles.shadeImage} source={Rectangle} />
                    )}
                    <Text
                      style={{
                        color: this.state.selectedIndex == 0 ? 'white' : 'grey',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        fontFamily: fontType.bold,
                        width: ScaleHelpers.CalcWidth(25),
                        fontSize: ScaleHelpers.CalcWidth(2.8),
                      }}>
                      {text.IndicateurCle}
                    </Text>
                  </>,
                  <>
                    {this.state.selectedIndex == 1 && (
                      <Image style={styles.shadeImage} source={Rectangle} />
                    )}
                    <Text
                      style={{
                        color: this.state.selectedIndex == 1 ? 'white' : 'grey',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        fontFamily: fontType.bold,
                        width: ScaleHelpers.CalcWidth(25),
                        fontSize: ScaleHelpers.CalcWidth(2.8),
                      }}>
                      {text.Marge}
                    </Text>
                  </>,
                  <>
                    {this.state.selectedIndex == 2 && (
                      <Image style={styles.shadeImage} source={Rectangle} />
                    )}
                    <Text
                      style={{
                        color: this.state.selectedIndex == 2 ? 'white' : 'grey',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        fontFamily: fontType.bold,
                        width: ScaleHelpers.CalcWidth(25),

                        fontSize: ScaleHelpers.CalcWidth(2.8),
                      }}>
                      {text.Excedent}
                    </Text>
                  </>,
                  <>
                    {this.state.selectedIndex == 3 && (
                      <Image style={styles.shadeImage} source={Rectangle} />
                    )}
                    <Text
                      style={{
                        color: this.state.selectedIndex == 3 ? 'white' : 'grey',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        fontFamily: fontType.bold,
                        width: ScaleHelpers.CalcWidth(25),
                        fontSize: ScaleHelpers.CalcWidth(2.8),
                      }}>
                      {text.ChargePersonelle}
                    </Text>
                  </>
                ]}
                handleOnChangeIndex={this.handleIndexChange}
                activeIndex={this.state.selectedIndex}
                tabsContainerStyle={{
                  width: ScaleHelpers.CalcWidth(150),
                  height: ScaleHelpers.CalcHeight(8),
                  marginTop: ScaleHelpers.CalcHeight(2),
                  marginHorizontal: ScaleHelpers.CalcWidth(0.5),

                }}
                tabStyle={styles.tabStyle}
              />
            </View>
          </ScrollView>
          <View style={styles.valueCardContainer}>
            <View style={styles.valueCardrowContainer}>
              <Text style={[styles.itemValue, { color: '#4EC7F5' }]}>
                {thousandSeparator(bankBalance.total?.toFixed(2) || 0)}
              </Text>
              <Text style={[styles.itemValue, { color: '#EA4C89' }]}>
                {thousandSeparator(turnover.total?.toFixed(2) || 0)}
              </Text>
              <Text style={[styles.itemValue, { color: '#4CC418' }]}>
                {thousandSeparator(((fixedCharge.total || 0) + (notFixedCharge.total) || 0)?.toFixed(2))}
              </Text>
            </View>
            <View style={styles.valueCardrowContainer}>
              <Text style={styles.itemLabel}>{text.SoldeCompte}</Text>
              <Text style={styles.itemLabel}>{text.ChiffreAffaire}</Text>
              <Text style={styles.itemLabel}>{text.Charge}</Text>
            </View>
          </View>
          {this.state.selectedIndex == 0 && (

            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.SoldeCompte}</Text>
              </View>
              <View style={{ flex: 2, marginLeft: ScaleHelpers.CalcWidth(2), marginRight: ScaleHelpers.CalcWidth(2), flexDirection: "row", justifyContent: 'space-between' }}>

                <View >
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(barChartBankBalance[0]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${barChartBankBalance[0]?.month || " "} ${moment(exercise.date_debut).format('YYYY')} `}
                  />
                </View>
                <View>
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(barChartBankBalance[11]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${barChartBankBalance[11]?.month || "0"} ${moment(exercise.date_debut).format('YYYY')}`}
                  />
                </View>

              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                <View style={styles.chartContent}>
                  <BarChartCustom
                    maxValue={maxBalanceValue}
                    minValue={minBalanceValue}
                    barValue={barChartBankBalance}
                  />
                </View>
              </ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.ChiffreAffaire}</Text>
              </View>
              <View style={{ flex: 2, marginLeft: ScaleHelpers.CalcWidth(2), marginRight: ScaleHelpers.CalcWidth(2), flexDirection: "row", justifyContent: 'space-between' }}>
                <View >
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartTurnoverValue[0]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartTurnoverValue[0]?.month || " "} ${moment(exercise.date_debut).format('YYYY')} `}
                  />
                </View>
                <View>
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartTurnoverValue[11]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartTurnoverValue[11]?.month || " "} ${moment(exercise.date_debut).format('YYYY')}`}
                  />
                </View>

              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                <View style={styles.chartContent}>
                  <LineChartCustom

                    maxValue={maxTurnoverValue}
                    minValue={minTurnoverValue}
                    lineChartValue={lineChartTurnoverValue}
                  />
                </View>
              </ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.Charge}</Text>
              </View>
              <View style={{ flex: 2, marginLeft: ScaleHelpers.CalcWidth(2), marginRight: ScaleHelpers.CalcWidth(2), flexDirection: "row", justifyContent: 'space-between' }}>
                <View >
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartChargeValue[0]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartChargeValue[0]?.month} ${moment(exercise.date_debut).format('YYYY')} `}
                  />
                </View>
                <View>
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartChargeValue[11]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartChargeValue[11]?.month} ${moment(exercise.date_debut).format('YYYY')}`}
                  />
                </View>

              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                <View style={styles.chartContent}>
                  <LineChartCustom

                    maxValue={maxChargeValue}
                    minValue={minChargeValue}
                    lineChartValue={lineChartChargeValue}
                  />
                </View>
              </ScrollView>
            </ScrollView>
          )}
          {this.state.selectedIndex == 1 && (
            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.Marge}</Text>
              </View>
              <View style={{ flex: 2, marginLeft: ScaleHelpers.CalcWidth(2), marginRight: ScaleHelpers.CalcWidth(2), flexDirection: "row", justifyContent: 'space-between' }}>
                <View >
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartMargeValue[0]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartMargeValue[0]?.month} ${moment(exercise.date_debut).format('YYYY')} `}
                  />
                </View>
                <View>
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartMargeValue[11]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartMargeValue[11]?.month} ${moment(exercise.date_debut).format('YYYY')}`}
                  />
                </View>

              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                <View style={styles.chartContent}>
                  <LineChartCustom

                    maxValue={maxMargeValue}
                    minValue={minMargeValue}
                    lineChartValue={lineChartMargeValue}
                  />
                </View>
              </ScrollView>
            </ScrollView>
          )}
          {this.state.selectedIndex == 2 && (
            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.Excedent}</Text>
              </View>
              <View style={{ flex: 2, marginLeft: ScaleHelpers.CalcWidth(2), marginRight: ScaleHelpers.CalcWidth(2), flexDirection: "row", justifyContent: 'space-between' }}>
                <View >
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartExcedentValue[0]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartExcedentValue[0]?.month} ${moment(exercise.date_debut).format('YYYY')} `}
                  />
                </View>
                <View>
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartExcedentValue[11]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartExcedentValue[11]?.month} ${moment(exercise.date_debut).format('YYYY')}`}
                  />
                </View>

              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                <View style={styles.chartContent}>
                  <LineChartCustom

                    maxValue={maxExcedentValue}
                    minValue={minExcedentValue}
                    lineChartValue={lineChartExcedentValue}
                  />
                </View>
              </ScrollView>
            </ScrollView>
          )}
          {this.state.selectedIndex == 3 && (
            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.ChargePersonelle}</Text>
              </View>
              <View style={{ flex: 2, marginLeft: ScaleHelpers.CalcWidth(2), marginRight: ScaleHelpers.CalcWidth(2), flexDirection: "row", justifyContent: 'space-between' }}>
                <View >
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartChargePersonelValue[0]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartChargePersonelValue[0]?.month} ${moment(exercise.date_debut).format('YYYY')} `}
                  />
                </View>
                <View>
                  <Tooltip
                    onlyText
                    text={`${thousandSeparator(lineChartChargePersonelValue[11]?.value) || "0"} `}
                  />
                  <Tooltip
                    text={`${lineChartChargePersonelValue[11]?.month} ${moment(exercise.date_debut).format('YYYY')}`}
                  />
                </View>

              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                <View style={styles.chartContent}>
                  <LineChartCustom

                    maxValue={maxChargePersonelValue}
                    minValue={minChargePersonelValue}
                    lineChartValue={lineChartChargePersonelValue}
                  />
                </View>
              </ScrollView>
            </ScrollView>
          )}
        </View>
      </>
    );
  }
}

export default HomeScreen;
