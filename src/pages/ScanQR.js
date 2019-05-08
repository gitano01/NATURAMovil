//This is an example code to Scan QR code//
import React from 'react';
import {
  View,ActivityIndicator, PermissionsAndroid,
  Alert, AsyncStorage, BackHandler
} from 'react-native';

import { CameraKitCameraScreen } from 'react-native-camera-kit';
import {withNavigation} from 'react-navigation'


class ScanQR extends React.Component {

  static navigationOptions ={  title:'Escanea el codigo QR',
    headerStyle: {
      backgroundColor: '#FF6C00',
    },

  }
  //
  state = {isPermitted:false}
  constructor(props) {
    super(props);

    this.state={
      session: false
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);


    var that=this;
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          requestExternalWritePermission();
        } else {
          alert("CAMERA permission denied");
        }
      } catch (err) {
        alert("Camera permission err",err);
        console.warn(err)
      }
    }
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
              'title': 'CameraExample App External Storage Write Permission',
              'message': 'CameraExample App needs access to Storage data in your SD Card '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          requestExternalReadPermission();
        } else {
          alert("WRITE_EXTERNAL_STORAGE permission denied");
        }
      } catch (err) {
        alert("Write permission err",err);
        console.warn(err)
      }
    }
    async function requestExternalReadPermission() {
      try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,{
              'title': 'CameraExample App Read Storage Write Permission',
              'message': 'CameraExample App needs access to your SD Card '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          that.setState({isPermitted:true})
        } else {
          alert("READ_EXTERNAL_STORAGE permission denied");
        }
      } catch (err) {
        alert("Read permission err",err);
        console.warn(err)
      }
    }
    requestCameraPermission();
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount(){

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {


    this.props.navigation.goBack();
    return true;


  }


  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
  }
  onContinueScan() {
    //To continue Scanning
    this.setState({ qrvalue: '' });
  }


  _saveSessionAsync = async () => {

    const {session} = this.state;


    await AsyncStorage.setItem('session',JSON.stringify(session));

  }

  Login = async () => {


    var code="";
    var active="";
    var privacy =  await AsyncStorage.getItem('privacity');

    await fetch("http://naturawebtest.kadasoftware.com/api/v1/usuarios/find_by_user?username=" + this.state.qrvalue.toString() ,{

      headers:{

        'Natura-Api-Key': '201904041730'
      }


    })
        .then(res => res.json())
        .then(response => {

          code = JSON.stringify(response.code);


          switch(code){

            case "200":
              active= JSON.stringify(response.usuario.activo);

              if(active == "true"){
                this.setState({session: true});
                this.props.navigation.navigate((privacy == 'true' ? 'Lugares' : 'Privacity'));
                this._saveSessionAsync();
              }else{
                Alert.alert("Usuario inválido, verifique el Codigo QR");
                this.props.navigation.goBack();
              }
              break;
            default:
              Alert.alert("Usuario inválido, verifique el Codigo QR");
              this.props.navigation.goBack();
          }

        })

        .done();

  }





  render() {


    if(this.state.isPermitted){
      //If qrvalue is set then return this view
      if (this.state.qrvalue) {
        // Alert.alert(this.state.qrvalue.toString());
        this.Login();
        //  Alert.alert(isUserAuthorizedCamera.toString());

      }
      //Initial/After Reset return this view
      return (

          <View style={{ flex: 1 }}>
            <CameraKitCameraScreen

                ref={cam => this.camera = cam}
                /*permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}*/

                showFrame={false}
                //Show/hide scan frame
                scanBarcode={true}
                //Can restrict for the QR Code only
                laserColor={'blue'}
                //Color can be of your choice
                frameColor={'yellow'}
                //If frame is visible then frame color
                colorForScannerFrame={'black'}
                //Scanner Frame color
                onReadCode={event =>
                    this.onBarcodeScan(event.nativeEvent.codeStringValue)
                }
            />
          </View>
      );}
    else{
      return (
          <ActivityIndicator />
      )
    }
  }
}

export default withNavigation(ScanQR);