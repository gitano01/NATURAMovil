import React from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  BackHandler,
  AsyncStorage
} from "react-native";
import { withNavigation } from "react-navigation";
import Menu, {
  MenuItem,
  MenuDivider,
  Position
} from "react-native-enhanced-popup-menu";
import Icon from "react-native-vector-icons/Ionicons";

const _Logout = async () => {
  await AsyncStorage.setItem("session", "false");
  BackHandler.exitApp();
};

const Popup_Menu = ({ navigation }) => {
  let textRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => (menuRef = ref);
  const Privacity = () => {
    navigation.navigate("Privacity2");
    menuRef.hide();
  };
  const Cerrar = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Está seguro que desea cerrar su sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => menuRef.hide(),
          style: "cancel"
        },
        { text: "Aceptar", onPress: () => _Logout() }
      ],
      { cancelable: false }
    );
    menuRef.hide();
  };

  const showMenu = () =>
    menuRef.show(textRef.current, (stickTo = Position.TOP_LEFT));

  const onPress = () => showMenu();

  return (
    <View style={styles.container}>
      <Text ref={textRef} style={{ fontSize: 0, textAlign: "center" }} />

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon
          name={Platform.OS === "ios" ? "ios-more" : "md-more"}
          style={styles.icono}
          size={25}
        />
      </TouchableOpacity>

      <Menu ref={setMenuRef}>
        <MenuItem onPress={Privacity}>Aviso de Privacidad</MenuItem>
        <MenuItem onPress={Cerrar}>Cerrar sesión</MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    justifyContent: 'flex-end',
    top: -5,
    backgroundColor: "#F98806"
  },

  button: {
    backgroundColor: "#F98806",
    borderRadius: 359,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },

  icono: {
    position: "relative",
    marginTop: 2,
    color: "#FFF"
  }
});

export default withNavigation(Popup_Menu);
