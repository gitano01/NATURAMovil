import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,BackHandler, Alert
} from 'react-native';
import {withNavigation} from 'react-navigation';

import ButtonQR from "../components/ButtonQR";
import Form from "../components/Form";
import Logo from "../components/Logo";

class Login extends React.Component{
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this._handleOnPress();
    return true;
  }
  _handleOnPress = () => {

    Alert.alert(
        'Finalizar aplicación',
        'Se finalizará NATURAMovil',
        [

          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {text: 'Aceptar', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
    );


  }





  render(){
		return(

      <ImageBackground source={require('../images/Login.jpg')} style={{width: '100%',height: '100%'}} >

          <Logo/>
        <Text style={styles.textoSesion}>Inicia Sesión</Text>
        <ButtonQR style={styles.buttonqr} />
        <Form style={styles.Formulario} />




      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  textoSesion:{
    position:'absolute',
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
    marginTop: 12
  },
  ButtonQR: {
    position:'absolute',
    height: 400
  },
  Formulario: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25
  }
});

export default withNavigation(Login);
