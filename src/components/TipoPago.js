import React,{Component} from 'react';

import {View, Text, TouchableOpacity, StyleSheet, Platform, Alert, KeyboardAvoidingView} from "react-native";


import Icon from "react-native-vector-icons/Ionicons";
import PopMenu from '../components/PopupMenu';
import All_Included from '../components/All_Included';
import MoneyBox from '../components/MoneyBox';
import PagoTarjeta from '../components/PagoTarjeta';
import MenuBar  from '../components/Menu';


import {withNavigation} from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';



var radio_props = [
    {label: 'Tarjeta', value:0},
    {label: 'Déposito', value:1},
    {label: 'Todo incluido', value:2}
];


class TipoPago extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
        valor: 0
        };
         }


    render() {
        const {navigation} = this.props;
        const lugar = navigation.getParam("lugar", "NO-NAME");

        return (

            <View style={{ flex:1, flexDirection:'column'}}>
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

                <View style={{flexDirection:'row', justifyContent:'center', marginTop:15, height: 20}}>

                    <RadioForm
                        formHorizontal={true}
                        buttonHorizontal={true}
                        labelHorizontal={true}
                        buttonSize={7}
                        buttonOuterSize={17}
                        buttonStyle={{borderWidth:0.5}}
                        selectedButtonColor={'#4baa2b'}
                        selectedButtonOuterColor={'#000'}
                        buttonColor={'#000'}
                        labelStyle={{fontSize: 11, color: '#000', fontFamily: 'Roboto', paddingLeft: 5, paddingRight:10}}
                        radio_props={radio_props}
                        initial={this.state.valor}
                        onPress={(value) => {this.setState({value:value})}}
                        style={{}}
                    />
                </View>

                <View style={{flex:1}}>

                    {
                        (this.state.value === 1) ? (<MoneyBox/>): (this.state.value === 2) ? (<All_Included/>) :(<PagoTarjeta/>)

                    }

                </View>

                <View style={{position:'relative',justifyContent:'flex-end'}}>

                    <MenuBar/>

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
    Buttons:{

        backgroundColor: '#4baa2b',
        paddingLeft: 1,
        paddingRight:1

    }
});


export default withNavigation(TipoPago);
