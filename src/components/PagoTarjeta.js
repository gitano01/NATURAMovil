import React, {Component} from 'react';

import {View, Text, TouchableOpacity, StyleSheet,Alert,TextInput} from "react-native";

import {withNavigation} from 'react-navigation';



class PagoTarjeta extends Component <Props>{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={

        }

    }



    render() {


        return (




            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{marginTop: 10,width:'100%', paddingRight:10, paddingLeft:10, borderColor:'#c0c0c0', borderWidth:1}}>
                    <View style={{alignItems:'center', marginTop:10}}>
                    <Text>Datos de la tarjeta</Text>
                    </View>
                <TextInput style={styles.Inputs} placeholder={'Nombre del titular de la tarjeta'}/>
                    <TextInput style={styles.Inputs} placeholder={'Numero de tarjeta'}/>
                    <TextInput style={styles.Inputs} placeholder={'CVC'}/>
                    <TextInput style={styles.Inputs} placeholder={'Mes'}/>
                    <TextInput style={styles.Inputs} placeholder={'Año'}/>
                    <View style={{alignItems:'center', marginTop:10, marginBottom: 10}}>
                        <TouchableOpacity style={{justifyContent:'center',alignContent: 'center', alignItems:'center', width:'50%', backgroundColor:'#4BAA2B', height: 36}} onPress={()=> Alert.alert('Hola desgraciado')}>
                            <Text style={{color: '#FFF'}}> Pagar</Text>
                        </TouchableOpacity>
                    </View>

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
    Inputs:{

        marginTop: 10,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        borderWidth: 1,
        borderColor: '#c0c0c0'


    }
});


export default withNavigation(PagoTarjeta);
