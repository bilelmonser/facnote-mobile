/*This is an example of File Picker in React Native*/
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Icon as IconView} from 'react-native-elements';
import ImageResizer from 'react-native-image-resizer';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

import ImagePickerCrop from 'react-native-image-crop-picker';
import Rectangle from '../../../assets/images/galery/Rectangle.png';
import Close from '../../../assets/icons/close.png';
import uploadFiles from '../../services/upload';

import styles from './styles';
import {primaryColor} from '../../Theme/AppStyles';

class LoginactureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiFiles: [],
      loading: false,
      resizeTargetWidthSize: 590,
      resizeTargetHightSize: 600,

      mode: 'contain',
      onlyScaleDown: false,
    };
  }

  chooseFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        mode: 'open',
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.docx,
          DocumentPicker.types.plainText,
          DocumentPicker.types.doc,
        ],
        //There can me more options as well find above
      });

      let copy = [...this.state.multiFiles];
      for (const res of results) {
        let ext = res.name.match(/\.([^\.]+)$/)[1].toLowerCase();
        if (res.type == 'image/jpeg') {
          try {
            ImageResizer.createResizedImage(
              res.uri,
              this.state.resizeTargetWidthSize,
              this.state.resizeTargetHightSize,
              'JPEG',
              100,
              0,
              undefined,
              false,
              {mode: this.state.mode, onlyScaleDown: this.state.onlyScaleDown},
            )
              .then(async (resizedImage) => {
                let obj = {
                  name: res.name,
                  type: res.type,
                  extension: ext,
                  uri: resizedImage.uri,
                };

                copy.push(obj);
                this.setState({multiFiles: copy});
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (err) {
            console.log(err);
          }
        } else {
          let obj = {
            name: res.name,
            type: res.type,
            extension: ext,
            uri: res.uri,
          };

          copy.push(obj);
          this.setState({multiFiles: copy});
        }
        //Printing the log realted to the file
      }
      //Setting the state to show multiple file attributes

      this.setState({multiFiles: copy});
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

  chooseImage = async () => {
    try {
      const results = await ImagePickerCrop.openPicker({
        multiple: true,
      });

      let copy = [...this.state.multiFiles];

      for (const res of results) {
        let ext = res.filename.match(/\.([^\.]+)$/)[1].toLowerCase();

        if (res.mime == 'image/jpeg') {
          try {
            ImageResizer.createResizedImage(
              res.path,
              this.state.resizeTargetWidthSize,
              this.state.resizeTargetHightSize,
              'JPEG',
              100,
              1,
              undefined,
              false,
              {mode: this.state.mode, onlyScaleDown: this.state.onlyScaleDown},
            )
              .then(async (resizedImage) => {
                let obj = {
                  name: res.filename,
                  type: res.mime,
                  extension: ext,
                  uri: resizedImage.uri,
                };

                copy.push(obj);
                this.setState({multiFiles: copy});
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (err) {
            console.log(err);
          }
        } else {
          let obj = {
            name: res.filename,
            type: res.mime,
            extension: ext,
            uri: res.path,
          };

          copy.push(obj);
          this.setState({multiFiles: copy});
        }
        //Printing the log realted to the file
      }
      //Setting the state to show multiple file attributes

      this.setState({multiFiles: copy});
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  launchCamera = async () => {
    try {
      const res = await ImagePickerCrop.openCamera({
        width: 500,
        height: 600,
      });

      let copy = [...this.state.multiFiles];
      let filename = res.path.split(/.*[\/|\\]/)[1];
      let ext = filename.match(/\.([^\.]+)$/)[1].toLowerCase();

      if (res.mime == 'image/jpeg') {
        ImageResizer.createResizedImage(
          res.path,
          this.state.resizeTargetWidthSize,
          this.state.resizeTargetHightSize,
          'JPEG',
          100,
          1,
          undefined,
          false,
          {mode: this.state.mode, onlyScaleDown: this.state.onlyScaleDown},
        )
          .then(async (resizedImage) => {
            let obj = {
              name: filename,
              type: res.mime,
              extension: ext,
              uri: resizedImage.uri,
            };

            copy.push(obj);
            this.setState({multiFiles: copy});
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let obj = {
          name: filename,
          type: res.mime,
          extension: ext,
          uri: res.path,
        };

        copy.push(obj);
        this.setState({multiFiles: copy});
      }
    } catch (err) {
      if (err.code == 'E_PERMISSION_MISSING')
        Toast.show({
          text1: 'Erreur',
          text2: "Vous n'avez pas accordé l'autorisation à la caméra",
          type: 'error',
        });
    }
  };

  removeFile = async (index) => {
    this.setState({loading: true});
    const multiFiles = this.state.multiFiles.filter(
      (item, key) => key != index,
    );
    this.setState({multiFiles});
    this.setState({loading: false});
  };

  renderFileUri() {
    return (
      <ScrollView>
        <View style={styles.photosContainer}>
          {this.state.multiFiles.map((item, key) => {
            switch (item.extension) {
              case 'jpg':
                return (
                  <View key={key}>
                    <TouchableHighlight
                      onPress={() => this.removeFile(key)}
                      style={styles.removeFile}>
                      <Icon
                        iconStyle={styles.iconRemoveFile}
                        reverse
                        type="ionicon"
                        color="white"
                        name={'ios-close-circle-sharp'}
                        size={25}
                      />
                    </TouchableHighlight>
                    <View key={key} style={styles.viewImg}>
                      <Image
                        style={styles.imgFacture}
                        source={{uri: item.uri}}
                      />
                    </View>
                  </View>
                );
              case 'png':
                return (
                  <View key={key}>
                    <TouchableHighlight
                      onPress={() => this.removeFile(key)}
                      style={styles.removeFile}>
                      <Icon
                        iconStyle={styles.iconRemoveFile}
                        reverse
                        type="ionicon"
                        color="white"
                        name={'ios-close-circle-sharp'}
                        size={25}
                      />
                    </TouchableHighlight>
                    <View key={key} style={styles.viewImg}>
                      <Image
                        style={styles.imgFacture}
                        source={{uri: item.uri}}
                      />
                    </View>
                  </View>
                );
              case 'docx':
                return (
                  <View key={key}>
                    <TouchableHighlight
                      onPress={() => this.removeFile(key)}
                      style={styles.removeFile}>
                      <Icon
                        iconStyle={styles.iconRemoveFile}
                        reverse
                        type="ionicon"
                        color="white"
                        name={'ios-close-circle-sharp'}
                        size={25}
                      />
                    </TouchableHighlight>
                    <View style={styles.viewImg}>
                      <FontAwesome
                        style={styles.iconFile}
                        name={'file-word-o'}
                        size={32}
                        color={'rgb(92,117,254)'}
                      />
                    </View>
                  </View>
                );
              case 'doc':
                return (
                  <View key={key}>
                    <TouchableHighlight
                      onPress={() => this.removeFile(key)}
                      style={styles.removeFile}>
                      <Icon
                        iconStyle={styles.iconRemoveFile}
                        reverse
                        type="ionicon"
                        color="white"
                        name={'ios-close-circle-sharp'}
                        size={25}
                      />
                    </TouchableHighlight>
                    <View style={styles.viewImg}>
                      <FontAwesome
                        style={styles.iconFile}
                        name={'file-word-o'}
                        size={32}
                        color={'rgb(92,117,254)'}
                      />
                    </View>
                  </View>
                );

              case 'pdf':
                return (
                  <View key={key}>
                    <TouchableHighlight
                      onPress={() => this.removeFile(key)}
                      style={styles.removeFile}>
                      <Icon
                        iconStyle={styles.iconRemoveFile}
                        reverse
                        type="ionicon"
                        color="white"
                        name={'ios-close-circle-sharp'}
                        size={25}
                      />
                    </TouchableHighlight>
                    <View style={styles.viewImg}>
                      <FontAwesome
                        style={styles.iconFile}
                        name={'file-pdf-o'}
                        size={32}
                        color={'rgb(92,117,254)'}
                      />
                    </View>
                  </View>
                );
              default:
                return (
                  <View key={key}>
                    <TouchableHighlight
                      onPress={() => this.removeFile(key)}
                      style={styles.removeFile}>
                      <Icon
                        iconStyle={styles.iconRemoveFile}
                        reverse
                        type="ionicon"
                        color="white"
                        name={'ios-close-circle-sharp'}
                        size={25}
                      />
                    </TouchableHighlight>
                    <View key={key} style={styles.viewImg}>
                      <Icon
                        style={styles.iconFile}
                        name={'ios-document-attach-sharp'}
                        size={32}
                        color={'rgb(92,117,254)'}
                      />
                    </View>
                  </View>
                );
            }
          })}
        </View>
      </ScrollView>
    );
  }
  sendDocs = async () => {
    const {typeFacture, multiFiles} = this.state;

    try {
      await this.setState({loading: true});

      var res = await uploadFiles(this.props.typeFacture, multiFiles);
      this.setState({
        loading: false,
        multiFiles: [],
      });
      this.props.closeModal({
        text1: 'Felicitation',
        text2: 'Vos factures ont bien été transmises',
        type: 'success',
      });
    } catch (error) {
      this.setState({
        loading: false,
        multiFiles: [],
      });
      this.props.closeModal({
        text1: 'Échec',
        text2: 'telechargement fichier interrompu',
        type: 'error',
      });
    }
  };

  render() {
    return (
      <View style={styles.centeredView}>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{elevation: 11}} />
        <View style={styles.modalView}>
          <ImageBackground
            source={Rectangle}
            style={styles.backgroundModalStyle}></ImageBackground>
          {this.renderFileUri()}
          {this.state.loading && (
            <ActivityIndicator
              size="large"
              color="white"
              style={{position: 'absolute', marginTop: '50%'}}
            />
          )}
          <TouchableHighlight
            style={styles.modalCloseView}
            onPress={() => this.props.closeModal(null)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Image style={styles.closeImg} source={Close} />
          </TouchableHighlight>
          {this.state.multiFiles.length > 0 && (
            <TouchableHighlight
              onPress={() => this.sendDocs()}
              style={styles.SendView}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.SendIconView}>
                <Text style={{...styles.btnTxt}}>envoyer</Text>
              </View>
            </TouchableHighlight>
          )}

          <View style={styles.buttomIcon}>
            <TouchableHighlight
              style={styles.choseFileButton}
              onPress={() => this.chooseFile()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <IconView
                iconStyle={{color: primaryColor}}
                reverse
                name="ios-attach-outline"
                type="ionicon"
                color="white"
              />
            </TouchableHighlight>

            {Platform.OS == 'ios' && (
              <TouchableHighlight
                style={styles.choseFileButton}
                onPress={() => this.chooseImage()}
                underlayColor="rgba(73,182,77,1,0.9)">
                <IconView
                  iconStyle={{color: primaryColor}}
                  reverse
                  name="ios-images-outline"
                  type="ionicon"
                  color="white"
                />
              </TouchableHighlight>
            )}

            <TouchableHighlight
              style={styles.choseFileButton}
              onPress={() => this.launchCamera()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <IconView
                iconStyle={{color: primaryColor}}
                reverse
                name="ios-camera-sharp"
                type="ionicon"
                color="white"
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

export default LoginactureScreen;
