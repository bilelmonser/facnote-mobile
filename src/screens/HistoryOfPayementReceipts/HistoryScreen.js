/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import PDFView from 'react-native-view-pdf';
import {text} from '../../constants';

import getHistory from '../../services/history';

import CardView from '../../components/CardView/CardView';
import PageLoader from '../../components/PageLoader/PageLoader';

import Close from '../../../assets/icons/closeGrey.png';

import styles from './styles';

class HistoryScreen extends React.Component {
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
      item: {},
    };
  }

  onShowModal = (item) => {
    this.setState({
      item: item,
      source: item.path,
      showModal: !this.state.showModal,
      loading: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      source: '',
      showModal: false,
      loading: false,
    });
  };

  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  loadData = async () => {
    const {limit, page} = this.state;
    this.setState({
      isRefreshing: true,
    });
    try {
      var history = await getHistory(limit, page);
    } catch (e) {
      console.log(e);
    } finally {
      let list = [];
      let date = '';
      let counter = 0;

      await history.map((item, index) => {
        let newDate = item.send_date.split(' ')[0];
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
          date: newDate == 'Invalid date' ? '' : newDate,
          procent: item.amount,
          isTitle: false,
          status: item.status,
          status_label: item.status_label,
          bill_number: item.bill_number,
          source: item.source,
          label: item.label,
          type: item.type,
          path: item.received_file_url,
        };
        list.push(obj);
      });
      this.setState({list, isRefreshing: false});
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
    const {list, isRefreshing, source, item} = this.state;
    const resourceType = 'url';
    const resources = {
      file:
        Platform.OS === 'ios'
          ? 'downloadedDocument.pdf'
          : '/sdcard/Download/downloadedDocument.pdf',
      url: source,
      base64: 'JVBERi0xLjMKJcfs...',
    };
    return (
      <View style={styles.container}>
        {isRefreshing && (
          <PageLoader showBackground={true} size="large" color="#0000ff" />
        )}
        <FlatList
          data={list}
          style={styles.flatListStyle}
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() => this.onCloseModal()}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View style={styles.pdfContainer}>
                {this.state.loading && (
                  <PageLoader
                    showBackground={false}
                    size="large"
                    color="#0000ff"
                  />
                )}
                <View style={styles.titleModalContainer}>
                  <Text style={styles.titleModalText}>
                    N°{item.bill_number}
                  </Text>
                </View>

                <PDFView
                  style={styles.pdf}
                  fadeInDuration={250.0}
                  resource={resources[resourceType]}
                  resourceType={resourceType}
                  onLoad={() => {
                    this.setState({loading: false});
                    console.log(`PDF rendered from ${resourceType}`);
                  }}
                  onError={(error) => {
                    this.setState({loading: false});
                    console.log('Cannot render PDF', error);
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={[styles.textInfo, styles.widthTLabelInfo]}>
                      {text.Type}
                    </Text>
                    <Text style={[styles.textInfo, styles.widthTLabelInfo]}>
                      {text.Source}
                    </Text>
                  
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={[
                        styles.textInfo,
                        styles.widthTextInfo,
                        {textAlign: 'right'},
                      ]}>
                      {item.type}
                    </Text>
                    <Text
                      style={[
                        styles.textInfo,
                        styles.widthTextInfo,
                        {textAlign: 'right'},
                      ]}>
                      {item.source}
                    </Text>
                  
                  </View>
                </View>
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
export default connect(mapStateToProps)(HistoryScreen);
