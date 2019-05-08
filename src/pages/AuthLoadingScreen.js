import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Alert
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const session = await AsyncStorage.getItem('session');
        const privacity = await AsyncStorage.getItem('privacity');

        // El código siguiente actua algo parecido a un switch, con el la aplicación sabra en que
        // pantalla ubicarse

        this.props.navigation.navigate
        ( (session == null && privacity == null) || (session.toString() == 'false' && privacity.toString() == 'false') ?
            'AuthStack'
            : (session.toString() == 'false' && privacity.toString() == 'true')?
            'AuthStack'
            : (session.toString() == 'true' && privacity.toString() == 'false')?
            'AuthStack'
            : (session.toString() == 'true' && privacity.toString() == 'true')?
            'AppStack'
            : 'AuthStack');

    };


  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
