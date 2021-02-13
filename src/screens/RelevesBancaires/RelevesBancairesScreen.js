/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import moment from 'moment';
import {
  View,
  TouchableHighlight,
  FlatList,
  Modal,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

import getEnterprise from '../../services/entreprise';
import DatePicker from '../../components/DatePicker/DatePicker';
import TextInput from '../../components/TextInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import CardView from '../../components/CardView/CardViewReleveBanquaire';
import PageLoader from '../../components/PageLoader/PageLoader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import SecondButton from '../../components/SecondButton/SecondButton';
import Close from '../../../assets/icons/closeGrey.png';
import {text} from '../../constants';

import styles from './styles';

class ReleveBanqueScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      list: [],
      limit: 10,
      page: 1,
      loading: false,
      isRefreshing: true,
      hasScrolled: false,
      source: '',
      dateDebut: null,
      dateFin: null,
      min: '',
      max: '',
      type: {key: 0, label: 'Débit/Crédit', value: 'tous'},
      search_multiple: '',
      comptesBancaire: [],
      exercices: [],
      compte: {key: -1, label: '', value: ''},
      exercice: '',
    };
  }

  setDateDebut = (dateDebut) => {
    this.setState({dateDebut});
  };
  setDateFin = (dateFin) => {
    this.setState({dateFin});
  };
  setField = (text, name) => {
    this.setState({[name]: text});
  };

  onShowModal = (source) => {
    this.setState({
      showModal: !this.state.showModal,
      loading: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  loadData = async () => {
    const {
      limit,
      page,
      dateDebut,
      dateFin,
      min,
      max,
      search_multiple,
      type,
      compte,
    } = this.state;
    this.setState({
      isRefreshing: true,
    });
    try {
      var releves = await getEnterprise(
        limit,
        page,
        dateDebut,
        dateFin,
        min,
        max,
        search_multiple,
        type.value,
        compte.value,
      );
    } catch (e) {
    } finally {
      let list = [];
      let date = '';
      let counter = 0;

      await releves.raw_ecritures.map((item, index) => {
        let newDate = moment(item.date_operation).format('DD/MM/YYYY');
        if (date != newDate) {
          date = newDate;
          list.push({
            id: counter++,
            text: newDate == 'Invalid date' ? '' : newDate,
            isTitle: true,
          });
        }
        let obj = {
          id: counter++,
          isTitle: false,
          libelle: item.libelle,
          debit: item.debit,
          credit: item.credit,
          solde: item.solde,
          nom_banque: item.nom_banque,
        };

        list.push(obj);
      });
      let comptesBancaire = [{key: -1, label: 'Tous les comptes', value: ''}];
      Object.keys(releves.comptes_bancaire).map((item, index) => {
        comptesBancaire.push({
          key: index++,
          label: releves.comptes_bancaire[item],
          value: item,
        });
      });
      let exercices = [];
      releves.exercices.map((item, index) => {
        exercices.push({
          key: index++,
          label: `${moment(item.date_debut).format('DD/MM/YYYY')} au ${moment(
            item.date_fin,
          ).format('DD/MM/YYYY')}`,
          date_debut: item.date_debut,
          date_fin: item.date_fin,
        });
      });
      this.setState({list, comptesBancaire, exercices, isRefreshing: false});
    }
  };

  handleRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
        limit: 10,
        page: 1,
      },
      () => {
        this.loadData();
      },
    );
  };

  handleLoadMore = () => {
    if (!this.state.isRefreshing)
      this.setState(
        {
          limit: this.state.limit + 10,
        },
        () => {
          this.loadData();
        },
      );
  };

  componentDidMount() {
    this.loadData();
  }

  initData = async () => {};

  renderItem = ({item}) => (
    <CardView onShowModal={this.onShowModal} item={item} />
  );

  render() {
    const {list, isRefreshing, comptesBancaire, exercices} = this.state;
    let index = 0;
    return (
      <View style={styles.container}>
        <SecondButton
          label={text.filter}
          onPress={() => this.setState({showModal: !this.state.showModal})}
        />
        {isRefreshing && (
          <PageLoader showBackground={true} size="large" color="#0000ff" />
        )}
        <FlatList
          style={styles.flatListStyle}
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={3}
          refreshing={false}
          // onRefresh={() => this.handleRefresh()}
          onScrollEndDrag={this.handleLoadMore}
          onEndThreshold={0}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}>
          {this.state.loading && (
            <PageLoader showBackground={false} size="large" color="#0000ff" />
          )}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() => this.onCloseModal()}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View style={styles.modalContainer}>
                <ScrollView>
                  <View style={styles.modalContant}>
                    <TextInput
                      style={styles.input}
                      label={text.searchReleveBanquaire}
                      value={this.state.search_multiple}
                      onChangeText={(text, name) =>
                        this.setField(text, 'search_multiple')
                      }
                      name="search_multiple"
                      type="text"
                    />
                    <View style={{flexDirection: 'row'}}>
                      <DatePicker
                        initialDate={this.state.dateDebut}
                        setCurrentDate={this.setDateDebut}
                        label={text.dateDebut}
                        display={'column'}
                      />
                      <DatePicker
                        initialDate={this.state.dateFin}
                        setCurrentDate={this.setDateFin}
                        label={text.dateFin}
                        display={'column'}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        style={styles.input}
                        label={text.min}
                        value={this.state.min}
                        onChangeText={(text, name) =>
                          this.setField(text, 'min')
                        }
                        name="min"
                        type="number"
                        grid={'column'}
                        keyboardType="numeric"
                      />
                      <TextInput
                        style={styles.input}
                        label={text.max}
                        onChangeText={(text, name) =>
                          this.setField(text, 'max')
                        }
                        value={this.state.max}
                        name="max"
                        type="number"
                        grid={'column'}
                        keyboardType="numeric"
                      />
                    </View>

                    <SelectInput
                      label={text.periode}
                      selectedValue={this.state.exercice.label}
                      onChange={(option) => {
                        this.setState({
                          dateFin: option.date_fin,
                          dateDebut: option.date_debut,
                          exercice: option,
                        });
                      }}
                      listItems={exercices}
                    />
                    <SelectInput
                      label={text.compte}
                      selectedValue={this.state.compte.label}
                      onChange={(option) => {
                        this.setState({compte: option});
                      }}
                      listItems={comptesBancaire}
                    />

                    <SelectInput
                      label={text.Type}
                      selectedValue={this.state.type.label}
                      onChange={(option) => {
                        this.setState({type: option});
                      }}
                      listItems={[
                        {key: 0, label: 'Débit/Crédit', value: 'tous'},
                        {key: 1, label: 'Débit', value: 'debit'},
                        {key: 2, label: 'Crédit', value: 'credit'},
                      ]}
                    />
                    <View style={styles.ButtonsContain}>
                      <SecondButton
                        label={text.Reinitialiser}
                        loading={this.state.loading}
                        onPress={async () => {
                          await this.setState({
                            min: '',
                            max: '',
                            dateDebut: null,
                            dateFin: null,
                            search_multiple: '',
                            exercice: '',
                            compte: {key: -1, label: '', value: ''},
                          });
                          await this.handleRefresh();
                          await this.onCloseModal();
                        }}
                      />
                      <SubmitButton
                        loading={this.state.loading}
                        label={text.Valider}
                        onPress={async () => {
                          await this.handleRefresh();
                          await this.onCloseModal();
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(ReleveBanqueScreen);