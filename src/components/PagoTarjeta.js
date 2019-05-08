import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet, Platform, Alert,TextInput} from "react-native";

import {withNavigation} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import PopMenu from '../components/PopupMenu';


class PagoTarjeta extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={

        }

    }



    render() {
        const {navigation} = this.props;
        const lugar = navigation.getParam("lugar", "NO-NAME");

        return (

            <View>
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

            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{marginTop: 50,width:'100%', paddingRight:10, paddingLeft:10, borderColor:'#c0c0c0', borderWidth:1}}>
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
