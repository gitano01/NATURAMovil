import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    BackHandler
} from 'react-native';
import { withNavigation } from "react-navigation";
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons'
import InicioApp from './InicioAPP';
import Products from './Products';
import Categorias from '../pages/Categorias';
import Cart from './Cart';
class Menu extends Component<{}> {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    state= {
        selectedTab: 'home'
    };
    componentDidMount = async () => {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    };
    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }
    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }



    render(){
        return(
            <TabNavigator style={styles.container} tabBarStyle={{backgroundColor: '#F98806'}}>
                <TabNavigator.Item
                   // selected={this.state.selectedTab === 'home'}
                    renderIcon={() => <Icon name={Platform.OS === "ios" ? "ios-home" : "md-home"} color="#FFF" size={26}/>}
                    renderSelectedIcon={() => <Icon name={Platform.OS === "ios" ? "ios-home" : "md-home"} size={26} color="#F5F5F5"/> }
                    onPress={() => {this.setState({selectedTab: 'home'}); this.getHome()}}>
                    <InicioApp/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    //selected={this.state.selectedTab === 'categorias'}
                    renderIcon={() => <Icon name={Platform.OS === "ios" ? "ios-restaurant" : "md-restaurant"} color="#FFF" size={25}/>}
                    renderSelectedIcon={() => <Icon name={Platform.OS === "ios" ? "ios-restaurant" : "md-restaurant"} size={25} color="#F5F5F5"/>}
                    onPress={() => {this.setState({selectedTab: 'categorias'});this.getCategorias()}}>
                    <Categorias/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    //selected={this.state.selectedTab === 'carrito'}
                    renderIcon={() => <Icon name={Platform.OS === "ios" ? "ios-cart" : "md-cart"} color="#FFF" size={25}/>}
                    renderSelectedIcon={() => <Icon name={Platform.OS === "ios" ? "ios-cart" : "md-cart"} size={25} color="#F5F5F5"/>}
                    onPress={() => {this.getCart();this.getCart()}}>
                </TabNavigator.Item>
                <TabNavigator.Item
                    ///selected={this.state.selectedTab === 'historial'}
                    renderIcon={() => <Icon name={Platform.OS === "ios" ? "ios-pricetags" : "md-pricetags"} color="#FFF" size={25}/>}
                    renderSelectedIcon={() => <Icon name={Platform.OS === "ios" ? "ios-pricetags" : "md-pricetags"} size={25} color="#F5F5F5"/>}
                    onPress={() => {this.setState({selectedTab: 'historial'});this.getBuild()}}>
                </TabNavigator.Item>
            </TabNavigator>
        )
    }



    getHome(){
        const {navigation} = this.props;
        const lugar = navigation.getParam("lugar");
        navigation.navigate('InicioApp',{lugar:lugar});


    }

    getCategorias() {

        this.setState({selectedTab: 'categorias'});
        const {navigation} = this.props;
        const lugar = navigation.getParam("lugar");
        navigation.navigate('Categorias',{lugar: lugar});

    }

    getCart() {
        this.setState({selectedTab: 'cart'});
        const {navigation} = this.props;
        const lugar = navigation.getParam("lugar");
        navigation.navigate('Cart',{lugar: lugar});
    }

    getBuild(){
        this.setState({selectedTab: 'build'});
        const {navigation} = this.props;
        const lugar = navigation.getParam("lugar");
        navigation.navigate('inBuild',{lugar: lugar});
    }



}



const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center',
    }
});
export default withNavigation(Menu);