import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
import Menu from './Menu';
import PopMenu from "../components/PopupMenu";

type Props = {};
class DetailProduct extends Component<Props> {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      offset: 0,
      limit: 20,
      refreshing: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    var offset = this.state.offset;
    var limit = this.state.limit;
    const { navigation } = this.props;
    const nombre = navigation.getParam("categoria", "NO-NAME");
    this.setState({ loading: true });
    fetch("http://naturawebtest.kadasoftware.com/api/v1/productos/44", {
      headers: {
        "Natura-Api-Key": "201904041730"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson.productos,
          loading: false
        });
      });
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  render() {
    const { navigation } = this.props;
    const lugar = navigation.getParam("lugar", "NO-NAME");
    const categoria = navigation.getParam("categoria", "NO-NAME");
    const producto = navigation.getParam("producto");
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerUbicacion}>
          <Text style={styles.txtUbicacion} >
            <Icon name={Platform.OS === "ios" ? "ios-pin" : "md-pin"} color="#FFF" size={26} />{" "}Usted está aqui:{" "+ lugar}
          </Text>
          <View>
            <PopMenu/>
          </View>
        </View>
        <View style={styles.headerCategoria}>

          <TouchableOpacity style={styles.btnRegreso} onPress={()=> this.props.navigation.goBack()}>

            <Icon name={Platform.OS === "ios" ? "ios-arrow-back" : "ios-arrow-back"} color="#FFF" size={26}/>


          </TouchableOpacity>
            <Text style={styles.txtCategoria} >{"  "+producto }</Text>

        </View>
        <Image style={styles.imgProducto} source={require('../images/welcome.jpg')}/>
        <View style={styles.contenidoProducto}>
            <Text style={styles.txtProducto}>Ensalada Primavera</Text>
            <Text style={styles.txtPrecio}>$180 - <Text style={{fontFamily: 'Roboto'}}>Precio Regular</Text></Text>
            <Text style={styles.txtPrecioDesc}>$120 - <Text style={{fontFamily: 'Roboto'}}>Precio Especial</Text></Text>
            <Text style={styles.txtDescripcion}>Occaecat amet nostrud mollit Lorem cillum sit consequat eiusmod laborum ipsum enim sint culpa. 
                Commodo excepteur ex dolor quis. Anim labore sunt consequat consectetur non. 
                Sint sit mollit ex Lorem ullamco sunt aliquip esse id. Ad minim et tempor laborum eu amet occaecat 
            </Text>
        </View>
        <View style={styles.contedorBTN}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              <Icon name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"} color="#FFF" size={25}/> Agregar
            </Text>
          </TouchableOpacity>
  		  </View>
        <View>
          <Menu/> 
        </View>
      </View>
    );
  }
}

export default withNavigation(DetailProduct);

const styles = StyleSheet.create({
  headerUbicacion: {
    width: '100%',
    backgroundColor: "#F98806",
    color: "#FFFFFF",
    paddingTop: 6,
    fontSize: 18,
    fontFamily: "Roboto",
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent: 'flex-end'


  },
  headerCategoria: {
    backgroundColor: "#F98806",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    height: 36,
    flexDirection: "row"

  },
  txtUbicacion: {
      position: 'relative',
      right: 15,
      width:300,
      color: "#FFFFFF",
      fontSize: 18,
      fontFamily: "Roboto",
      height: 36,
      marginLeft:5


  },
    btnRegreso: {
        color: "#FFFFFF",
        fontSize: 18,
        borderRadius: 360,
        height: 36,
        marginLeft: 8
    },
  txtCategoria: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    height: 36,
    marginLeft: 8
  },
  imgProducto: {
    height: 140,
    width: '100%'
  },
  contenidoProducto:{
    flex: 1,
    alignItems:'flex-start',
    marginLeft: 5,
    marginTop: 10
  },
  txtProducto:{
      color:'#4e4e4d',
      fontSize: 13,
      fontFamily:'LemonMilkbolditalic',
  },
  txtPrecio:{
    color:'#8a8a8a',
    fontSize: 13,
    fontFamily:'LemonMilkbolditalic',
    textDecorationLine: 'line-through',
  },
  txtPrecioDesc:{
    color:'#f98806',
    fontSize: 13,
    fontFamily:'LemonMilkbolditalic',
  },
  txtDescripcion:{
      fontFamily: 'Roboto',
      fontSize: 11,
      color: '#4e4e4e',
      marginTop: 8
  },
  contedorBTN : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: '#4baa2b',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
},
buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
}
});
