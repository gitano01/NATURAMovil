import React, {Component} from 'react';

import {View, Text, TouchableOpacity, StyleSheet,Alert,TextInput, ScrollView} from "react-native";

import {withNavigation} from 'react-navigation';
import NumericInput from 'react-native-numeric-input';


class PagoTarjeta extends Component <Props>{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={
            value1:1,
            value2:2019
        }

    }



    render() {


        return (

<View>


            <ScrollView>
                <View style={{marginTop: 5,width:'100%', paddingRight:10, paddingLeft:10, borderColor:'#c0c0c0', borderWidth:1}}>
                    <View style={{ flex:1,paddingTop: 10,paddingBottom:15, marginRight:15,marginLeft:15}}><Text style={{paddingLeft:20,paddingBottom:10}}>Total a Pagar: </Text></View>
                    <View style={{alignItems:'center', marginTop:10}}>
                    <Text>Datos de la tarjeta</Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}><Text style={{width:'20%'}}> Nombre</Text><TextInput style={styles.Inputs} placeholder={'Nombre del titular de la tarjeta'} maxLength={50} /></View>
                    <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}><Text style={{width:'20%'}}> No. de Tarjeta</Text><TextInput style={styles.Inputs} placeholder={'Número de tarjeta'} maxLength={16}/></View>

                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', paddingLeft:15, marginTop:10}}>
                        <Text style={{width:'20%'}}> Fecha de Expirado</Text>
                        <View style={{flexDirection:'row',paddingLeft:12}}>

                            <NumericInput totalWidth={70} totalHeight={40} type='up-down'  editable={false} minValue={1} maxValue={12} initValue={this.state.value1}
                                           onChange={value1 => this.setState({value1})}  /><Text style={{width:15}}></Text>

                            <NumericInput type='up-down'  editable={false} minValue={2019} maxValue={2031} initValue={this.state.value2}
                                          onChange={value2 => this.setState({value2})}/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginLeft:10}}><Text  style={{width:'20%'}} > CVV/CVC</Text><TextInput style={styles.InputSmall} placeholder={'CVC'} maxLength={3}/></View>



                    <View style={{alignItems:'center', marginTop:10, marginBottom: 15}}>
                        <TouchableOpacity style={{justifyContent:'center',alignContent: 'center', alignItems:'center', width:'50%', backgroundColor:'#4BAA2B', height: 36}} onPress={()=> Alert.alert('Hola desgraciado')}>
                            <Text style={{color: '#FFF'}}> Pagar</Text>
                        </TouchableOpacity>
                    </View>

                </View>



            </ScrollView>


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
        width:'70%',
        height: 40,
        fontSize:12,
        fontFamily:'Roboto',
        borderColor: '#c0c0c0'


    },
    InputSmall:{

        marginTop: 10,
        marginBottom:10,
        marginLeft:15,
        marginRight:10,
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center',
        width:'13%',
        height: 40,
        fontSize:12,
        fontFamily:'Roboto',
        borderColor: '#c0c0c0'
    }
});


export default withNavigation(PagoTarjeta);
