import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { withNavigation } from "react-navigation";
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  _saveSessionAsync = async () => {
    await AsyncStorage.setItem("session", "true");
  };

  InputCheck = () => {
    //var userIn = "victor";
   // var pattern = /^[a-zA-Z0-9_/.\@]*$/;
    var pattern = /^(?!.*__.*)(?!.*\.\..*)[aA-zZ0-9_.]+$/;
    const { user } = this.state;
    const { flag } = this.state;
    user == ""
      ? Alert.alert("El campo usuario no debe estar vacío")
      : pattern.test(user)
      ? this.Login()
      : Alert.alert("El usuario no debe contener signos como  /,*,#,$ ");
  };

  Login = async () => {
    const { user } = this.state;
    var code = "";
    var active = "";
    var privacy = await AsyncStorage.getItem("privacity");



    await fetch("http://naturawebtest.kadasoftware.com/api/v1/usuarios/find_by_user?username=" + user.toString(),
      {
        headers: {
          "Natura-Api-Key": "201904041730"
        }
      }
    )
      .then(res => res.json())
      .then(response => {
        code = JSON.stringify(response.code);

        switch (code) {
          case "200":
            active = JSON.stringify(response.usuario.activo);

            if (active == "true") {
              this.props.navigation.navigate(
                privacy == "true" ? "Lugares" : "Privacity"
              );
              this._saveSessionAsync();
            } else {
              Alert.alert("Usuario inválido");
              this.props.navigation.goBack();
            }
            break;
          default:
            Alert.alert("Usuario inválido");
            this.props.navigation.goBack();
        }
      }).catch(error => alert(error))
      .done();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>o</Text>
          <Text style={styles.infoText}>Ingresa tu usuario:</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.8)"
            onChangeText={user => this.setState({ user })}
            autoCorrect={false}
            autoCapitalize={"none"}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.InputCheck()}
          >
            <Text style={styles.infoText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  infoContainer: {
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 30,
    height: 100,
    padding: 0,
    paddingHorizontal: 50
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 10,
    width: 200
  },
  buttonContainer: {
    paddingVertical: 15
  },
  infoText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default withNavigation(Form);
