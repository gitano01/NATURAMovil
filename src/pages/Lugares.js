import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
  AsyncStorage,
  Alert
} from "react-native";
import { withNavigation } from "react-navigation";
import PopMenu from "../components/PopupMenu";

class Lugares extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.makeRemoteRequest();
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

    this._ExitApp();


  }
  _ExitApp = async () => {
       BackHandler.exitApp();
  };

  makeRemoteRequest =async () => {
    const { page } = this.state;
    this.setState({ loading: true });
    await fetch("http://naturawebtest.kadasoftware.com/api/v1/lugares?page=" + this.state.page, {
        headers: {
            "Natura-Api-Key": "201904041730"
        }
    })
    .then(response => response.json())
    .then(responseJson => {
        this.setState({
            data: page === 1 ? responseJson.lugares : [...this.state.data, ...responseJson.lugares],
            error: responseJson.error || null,
            loading: false,
            refreshing: false
        });
    })
    .catch( error => {this.setState({ error, loading: false }); })
    .done();
  };
  
  handleRefresh = () => {
      this.setState({
        page: 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      });
  };
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };
  renderFooter() {
    return this.state.loading ? (
      <ActivityIndicator size="large" style={styles.loader} />
    ) : null;
  }
  getCategorias(item) {
    this.props.navigation.navigate("Categorias", { lugar: item.nombre });
  }
  getMenu(item) {
   this.props.navigation.navigate("InicioApp", { lugar: item.nombre });
  }
  renderItem = ({ item }) => {
    return (
      <TouchableHighlight onPress={() => this.getMenu(item)}>
        <View>
          <ImageBackground
            style={styles.image_lugar}
            source={{ uri: item.url_image }}
          >
            <View style={styles.fondo}>
              <Text style={styles.titulo}>{item.nombre}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
    );
  };
  render() {
    return (
      <View style={styles.list}>
        <View style={styles.headerSite}>
          <Text style={styles.text}>Selecciona tu ubicación </Text>

          <View style={styles.pop_menu}>
            <PopMenu />
          </View>
        </View>

        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => this.renderFooter()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerSite: {
    width: '100%',
    paddingTop: 6,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: "flex-end",
    backgroundColor: "#F98806"
  },
  text: {

    left: 60,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "center",
    width:300,
    height: 36

  },
  pop_menu:{

    justifyContent: "flex-end",
  },

  image_lugar: {
    height: 155,
    justifyContent: "flex-end"
  },
  list: {
    flex: 1
  },
  fondo: {
    backgroundColor: "rgba(67,59,49,0.40)",
    height: 45,
    justifyContent: "center"
  },
  titulo: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
  loader: {
    marginTop: 10,
    alignItems: "center"
  },
  containerPop: {
    position: "relative",
    paddingTop: -10,
    paddingLeft: 105,
    backgroundColor: "#F98806",
    justifyContent: "flex-end"
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
export default withNavigation(Lugares);
