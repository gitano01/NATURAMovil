import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
  StatusBar
} from "react-native";

import { withNavigation } from "react-navigation";

import Icon from "react-native-vector-icons/Ionicons";

class ButtonQR extends React.Component {
  constructor(props) {
    super(props);
  }

  access_QR = () => {
    //const isUserAuthorizedCamera = CameraKitCamera.requestDeviceCameraAuthorization();
    //this.componentDidMount();
    this.props.navigation.navigate("ScanQR");
  };
  /* async  componentDidMount() {
        //Setting up Status Bar
        const isUserAuthorizedCamera = await CameraKitCamera.requestDeviceCameraAuthorization();


    }*/

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={
            () => this.access_QR() /*this.props.navigation.navigate('ScanQR')*/
          }
        >
          <Text style={styles.buttonText}>
            <Icon
              name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
              color="#FFF"
              size={25}
            />{" "}
            CÓDIGO QR
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: "#4baa2b",
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
    marginBottom: 40,
    width: 200
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "bold"
  }
});

export default withNavigation(ButtonQR);
