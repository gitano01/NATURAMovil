import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
    FlatList,
    ListView,
    ImageBackground,
    Platform,
    BackHandler,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
import PopMenu from "../components/PopupMenu";
import Menu from "../components/Menu";




type Props = {};

class Categorias extends Component<Props> {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],//este es el buenas harbano
            page: 1,
            error: null,
            refreshing: false,


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

    makeRemoteRequest = async () => {
        const { navigation } = this.props;
        const { page } = this.state;
        const nombre = navigation.getParam("lugar", "NO-NAME");
        this.setState({ loading: true });
        return await fetch("http://naturawebtest.kadasoftware.com/api/v1/categorias/find_by_lugar?nombre=" + nombre.toString() + "&page=" + this.state.page, {
            headers: {
                "Natura-Api-Key": "201904041730"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    data: page === 1 ? responseJson.categorias : [...this.state.data, ...responseJson.categorias],
                    error: responseJson.error || null,
                    loading: false,
                    refreshing: false,

                })
            })
            .catch(error => { this.setState({ error, loading: false }); })
            .done();
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('InicioApp');
        return true;
    }

    handleRefresh = () => {
        this.setState({
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
        return this.state.loading ? <ActivityIndicator size="large" style={styles.loader}/> : null
    };

    getProductos(item) {
        const { navigation } = this.props;
        const nombre = navigation.getParam("lugar", "NO-NAME");
        this.props.navigation.navigate("Productos", { categoria: item.nombre, lugar: nombre });
    }

    renderItem = ({ item }) => {
        return (
            <TouchableHighlight onPress={() => this.getProductos(item)}>
                <View>
                    <ImageBackground style={styles.image_categoria} source={{ uri: item.url_image }}>
                        <View style={styles.fondo}>
                            <Text style={styles.titulo}>{item.nombre}</Text>
                        </View>

                    </ImageBackground>
                </View>
            </TouchableHighlight>
        );
    };


   render() {
        const { navigation } = this.props;
        const nombre = navigation.getParam("lugar", "NO-NAME");
        return (
            <View style={styles.list}>
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
                    <TouchableOpacity style={styles.search} onPress={()=> Alert.alert('Que onda' + nombre)} disabled={true}>
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
                <View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => this.renderFooter() }
                />
                <View style={{marginTop:49}}>
                    <Menu/>
                </View>
            </View>
        );
    }
}
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
    image_categoria: {
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
        alignItems: 'center',
    },
});
export default withNavigation(Categorias);
