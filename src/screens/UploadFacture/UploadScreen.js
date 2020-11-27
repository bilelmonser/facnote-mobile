/*This is an example of File Picker in React Native*/
import React, {createRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import Achat from '../../../assets/images/Achats.png';
import AvanceDeFrais from '../../../assets/images/AvanceDeFrais.png';
import Document from '../../../assets/images/Document.png';
import Indemnite from '../../../assets/images/Indemnite.png';

import Background from '../../../assets/images/backgroung_depose_facture.png';
import Rectangle from '../../../assets/images/Rectangle.png';
import Close from '../../../assets/icons/close.png';
import iconePrendrePhoto from '../../../assets/icons/icone_prendre_photo.png';
import iconeGestionnairePhoto from '../../../assets/icons/icone_gestionnaire_photo.png';

import styles from './styles';

export default class ExpensesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      multiFiles: [],
      showModal: false,
    };
    this.actionSheet = createRef();
  }

  setTypeFacture = (typeFacture) => {
    this.setState({typeFacture});
    this.setState({showModal: !this.state.showModal});
    //this.actionSheet.current.show();
  };

  chooseImage = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      this.setState({multiFiles: results});
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  renderFileUri() {
    return (
      <ScrollView>
        <View style={styles.photoContainer}>
          {this.state.fileUri != '' && (
            <View style={styles.viewImg}>
              <Image
                style={styles.ImgPlus}
                source={{uri: this.state.fileUri}}
              />
            </View>
          )}

          {this.state.multiFiles.map((item, key) => (
            <View key={key} style={styles.viewImg}>
              {item.type == 'image/jpeg' ? (
                <Image style={styles.ImgPlus} source={{uri: item.uri}} />
              ) : (
                <Icon
                  style={{
                    height: '90%',
                    width: '90%',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    paddingTop: '30%',
                    margin: '3%',
                    borderRadius: 10,
                  }}
                  name={'ios-document-attach-sharp'}
                  size={32}
                  color={'rgb(92,117,254)'}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <ImageBackground
            source={Background}
            style={styles.backgroundStyle}></ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nom de la Société</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.btnContainer}
              onPress={() => this.setTypeFacture(1)}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image style={styles.Img} source={Achat} />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnContainer}
              onPress={() => this.setTypeFacture(1)}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image style={styles.Img} source={AvanceDeFrais} />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.btnContainer}
              onPress={() => this.setTypeFacture(1)}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image style={styles.Img} source={Document} />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnContainer}
              onPress={() => this.props.navigation.navigate('Indemnites')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image style={styles.Img} source={Indemnite} />
            </TouchableHighlight>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ImageBackground
                  source={Rectangle}
                  style={styles.backgroundModalStyle}></ImageBackground>
                {this.renderFileUri()}
                <TouchableHighlight
                  style={styles.modalCloseView}
                  onPress={() =>
                    this.setState({showModal: !this.state.showModal})
                  }
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <Image style={styles.closeImg} source={Close} />
                </TouchableHighlight>
                <View style={styles.buttomIcon}>
                  <TouchableHighlight
                    onPress={() => this.chooseImage()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image
                      style={styles.iconGestion}
                      source={iconeGestionnairePhoto}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this.launchCamera()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image
                      style={styles.iconGestion}
                      source={iconePrendrePhoto}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}
