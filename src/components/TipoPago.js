import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet, Platform, Alert} from "react-native";

import {withNavigation} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import PopMenu from '../components/PopupMenu';
import PagoTarjeta from '../components/PagoTarjeta';


class TipoPago extends React.Component {
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

                <View>
                    <PagoTarjeta/>
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
});


export default withNavigation(TipoPago);
