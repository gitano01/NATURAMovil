import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, Image, Alert,TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from 'react-navigation';
import PopMenu from "../components/PopupMenu";
import Menu from "./Menu";
import SearchHeader from 'react-native-search-header';



const Slider = props => (
    <View>
      <Image source={props.uri}/>
    </View>
)

class InicioAPP extends  Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const { page } = this.state;
    this.setState({ loading: true });
    await fetch("http://naturawebtest.kadasoftware.com/api/v1/inicio_app", {
      headers: {
        "Natura-Api-Key": "201904041730"
      }
    })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            data: responseJson.inicio_apps
          });
        })
        .catch( error => {this.setState({ error }); })
        .done();
  };

  renderItem = ({ item }) => {
    return (
        <Image
            style={styles.image_lugar}
            source={{ uri: item.url_image }}
        />
    );
  };

  render() {
    const { navigation } = this.props;
    const nombre = navigation.getParam("lugar");
    return (
        <View style={styles.container}>

          <View style={styles.headerSite}>
            <TouchableOpacity style={styles.roll} onPress={() => navigation.goBack()}>
              <Text>
                <Icon
                    name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
                    color="#FFF"
                    size={26}
                />
              </Text>
              <Text style={styles.text}>
                Usted está aqui:{" "+ nombre }
              </Text>
              <Text style={styles.arrow}>
                <Icon
                    name={Platform.OS === "ios" ? "ios-arrow-down" : "md-arrow-dropdown"}
                    color="#FFF"
                    size={24}
                />
              </Text>

            </TouchableOpacity>
              <View style={{position:'relative'}}>
                <TouchableOpacity style={styles.search} onPress = {() => this.searchHeader.show()} >
                  <Icon
                      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                      color="#FFF"
                      size={24}
                  />
                </TouchableOpacity>
              </View>

            <View style={{ position: "relative"}}>
              <PopMenu/>
            </View>
          </View>

          <Swiper style={styles.wrapper} height={200}  KeyExtractor={item => item.imgid} horizontal={true} autoplay>
            {
              this.state.data.map((item, i) => <View>

                    <Image style={styles.stretch} source={{uri: item.url_image}} />
                  </View>
              )
            }
          </Swiper>

          <SearchHeader style={{position:'relative', top:24}}
              ref = {(searchHeader) => {
                this.searchHeader = searchHeader;
              }}
              placeholder = 'Buscar'
              placeholderColor = 'gray'
              onClear = {() => {
                console.warn(`Clearing input!`);
              }}
              onGetAutocompletions = {async (text) => {
                if (text) {
                  const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                    method: `get`
                  });
                  const data = await response.json();
                  return data[1];
                } else {
                  return [];
                }
              }}
          />

          <View >
            <Menu/>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

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
    width:300,
    position:'relative',
    flexDirection: "row",
    left:3
  },
  arrow:{
    position:'relative',
    top:4,
    right:45
  },


  search:{
    position:'relative',
    top:-8,
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

  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },

  image: {
    flex: 1
  },
  headerUbicacion: {
    backgroundColor: "#F98806",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    height: 36,
    paddingVertical: 6
  },
  stretch: {
    width: '100%',
    height: '100%'
  }
});

export default withNavigation(InicioAPP);