import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Platform,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Menu from "./Menu";
import PopMenu from '../components/PopupMenu';
import { withNavigation } from "react-navigation";

const Header = props => (
  <View style={styles.headerIOS}>
    <Text style={styles.txtIOS}>Oculto</Text>
  </View>
);

const instructions = Platform.select({
  ios: <Header />
});

type Props = {};
class Products extends Component<Props> {
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
  }
  handleBackButtonClick() {
    const {navigation} = this.props;
    navigation.goBack(null);
    return true;
  }
  makeRemoteRequest = () => {
    const { page } = this.state;
    const { navigation } = this.props;
    const nombre = navigation.getParam("categoria", "NO-NAME");
    this.setState({ loading: true });
    fetch(
      "http://naturawebtest.kadasoftware.com/api/v1/productos/find_by_categoria?nombre=" +
        nombre +
        "&page=" +
        this.state.page,
      {
        headers: {

          "Natura-Api-Key": "201904041730"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data:
            page === 1
              ? responseJson.productos
              : [...this.state.data, ...responseJson.productos],
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
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

  getDetalle(item) {
    const { navigation } = this.props;
    const nombre = navigation.getParam("lugar", "NO-NAME");
    this.props.navigation.navigate("DetailProduct", {lugar: nombre, producto: item.nombre});
  }
  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#F5F5F5" }}>
          <Image
            source={{ uri: item.url_image }}
            style={{ width: 120, height: 100 }}
          />
          <View style={{ flex: 1, flexDirection: "column", height: 100 }}>
            <Text style={styles.estiloTitulo}>{item.nombre}</Text>
            <Text style={styles.estiloDescripcion}>{item.descripcion}</Text>
            <Text style={styles.estiloPrecio}>${item.precio}</Text>
            <Text style={styles.estiloPrecioDesc}>
              ${item.precio - item.precio * 0.1}
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={() => this.getDetalle(item)}>
              <Text style={styles.estiloDetalles}>Detalles</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnAgregar}
            onPress={() => this.getDetalle(item)}
          >
            <Icon
              name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
              color="#FFF"
              size={25}
            />
            <Text style={styles.btnTexto}>{"\n"}Agregar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 2, backgroundColor: "white" }} />
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    const lugar = navigation.getParam("lugar", "NO-NAME");
    const categoria = navigation.getParam("categoria", "NO-NAME");
    return (
      <View style={styles.list}>
        <View>{instructions}</View>
        <View style={styles.headerSite}>
          <TouchableOpacity style={styles.roll} onPress={() =>navigation.navigate('Lugares')}>
            <Text>
              <Icon
                  name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
                  color="#FFF"
                  size={26}
              />
            </Text>
            <Text style={styles.text}>
              Usted está aqui:{" "+ lugar}
            </Text>
            <Text style={styles.arrow}>
              <Icon
                  name={Platform.OS === "ios" ? "ios-arrow-down" : "md-arrow-dropdown"}
                  color="#FFF"
                  size={24}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={()=> Alert.alert('¿Qué hay viejo?')} disable={true}>
            <Icon
                name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                color="#FFF"
                size={24}
            />
          </TouchableOpacity>

          <View style={{ position: "relative"}}>
            <PopMenu/>
          </View>
        </View>
        <View style={styles.headerCategoria}>

          <TouchableOpacity style={styles.btnRegreso} onPress={()=> this.handleBackButtonClick()}>

          <Icon name={Platform.OS === "ios" ? "ios-arrow-back" : "ios-arrow-back"} color="#FFF" size={26}/>


        </TouchableOpacity>

        <View style={{ width: 330, justifyContent:'center', alignItems:'center'}}>


          <Text style={styles.txtCategoria} >{" "} {categoria} </Text>

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
        <View style={{marginTop: 49}}>
          <Menu/>
        </View>
      </View>
    );
  }
}

export default withNavigation(Products);

const styles = StyleSheet.create({
  headerSite: {
    width: '100%',
    paddingTop: 4,
    paddingLeft: 4,
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent:'flex-end',
    backgroundColor: "#F98806"
  },

  roll:{
    position:'relative',
    flexDirection: "row",
    left:30
  },
  arrow:{
    position:'relative',
    top:4,
    right:45
  },


  search:{
    position: 'relative',
    top: -8,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  text: {

    position: 'relative',
    width:300,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FFF",
    color: "#FFFFFF",
    fontSize: 15,
    top: 4,
    left: 5,
    fontFamily: "Roboto",
    height: 36,
    alignItems: "flex-end",
    justifyContent: "flex-end"

  },
  headerCategoria: {


    backgroundColor: "#F98806",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    height: 36,
    flexDirection: "row",
    justifyContent: "center"


  },
  headerIOS: {
    backgroundColor: "#F98806",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    height: 36,
    justifyContent: "center"
  },
  txtCategoria: {
    position:'relative',
    right:30,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    height: 36,
    justifyContent: "center",
    borderColor:"#F98806",
    borderWidth:1,
    alignContent:"center"


  },
  btnRegreso: {
    color: "#FFFFFF",
    fontSize: 18,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
    width:36,
    height: 36,
    top:-6,
    marginLeft: 8
  },
  txtIOS: {
    color: "#F98806",
    fontSize: 18,
    fontFamily: "Roboto",
    height: 36,
    marginLeft: 8
  },
  image_lugar: {
    height: 155,
    justifyContent: "flex-end"
  },
  list: {
    flex: 1
  },
  menuProduct: {
    marginTop: 50
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
  estiloTitulo: {
    color: "#4e4e4d",
    fontFamily: "LemonMilkbolditalic",
    fontSize: 13,
    marginLeft: 5,
    marginRight: 1
  },
  estiloDescripcion: {
    color: "#4e4e4d",
    fontFamily: "Roboto",
    fontSize: 11,
    marginLeft: 5
  },
  estiloPrecio: {
    color: "#8a8a8a",
    fontFamily: "LemonMilkbolditalic",
    fontSize: 13,
    marginLeft: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#F98806"
  },
  estiloPrecioDesc: {
    color: "#4e4e4d",
    fontFamily: "LemonMilkbolditalic",
    fontSize: 13,
    marginLeft: 5
  },
  estiloDetalles: {
    color: "#F98806",
    fontFamily: "Roboto",
    fontSize: 14,
    textDecorationLine: "underline",
    marginRight: 3,
    marginBottom: 2
  },
  btnAgregar: {
    backgroundColor: "#4baa2b",
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  btnTexto: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 11
  }
});
