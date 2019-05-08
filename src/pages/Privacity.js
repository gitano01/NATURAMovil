import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,AsyncStorage,BackHandler
} from 'react-native';
import {withNavigation} from 'react-navigation';


import CodePush from 'react-native-code-push';



class Privacity extends Component<{}> {


    static navigationOptions = {
        header: null,

    }


    constructor(){
        super();
        this.state={}

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.textos={
            //avisoTitulo: "Aviso de Privacidad",
            avisoTextoNegritaUno: "“AVISO DE PRIVACIDAD.- LA ISLA HUATULCO SA DE CV, ",
            avisoTextoNegritaDos: "“Boulevard Benito Juárez, MZ 7, LT 9 , C.P. 80989, en Huatulco, Oaxaca, México;"
        }
    }


    componentDidMount= async () =>{

        await AsyncStorage.setItem('privacity','false');
        var aviso = await AsyncStorage.getItem('privacity');
        var sesion = await AsyncStorage.getItem('session');

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);


    }

    componentWillUnmount(){

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {


        this._handleOnPress();
        return true;


    }

    _handleOnPress = () => {






        Alert.alert(
            'Cancelar operación ',
            'Al cancelar el aviso de privacidad, finalizará NATURAMovil',
            [

                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {text: 'Aceptar', onPress: () => this._LogOut()},
            ],
            {cancelable: false},
        );


    }

    _Cancelar = () => {

        this._handleOnPress();

    }



    _savePrivacity = async () => {




        await AsyncStorage.setItem('privacity', 'true');

        this.props.navigation.navigate('Lugares')



    }





    _LogOut = async () => {




        await AsyncStorage.setItem('privacity', 'false');
        await AsyncStorage.setItem('session', 'false');

        BackHandler.exitApp();
        CodePush.restartApp();




    }








    render(){


        return(
            <View style={styles.container}>

                <View style={styles.headerSite}>
                    <Text style={styles.avisoTitulo}>Aviso de Privacidad </Text>

                </View>

                <ScrollView >
                    <View style={styles.wraper}>

                        <Text>{""}</Text>
                        <Text style={styles.avisoTextoNegrita}>
                            {this.textos.avisoTextoNegritaUno} {' '}
                            <Text style={styles.avisoTextoNormal}> (en adelante, el “Responsable”) le informa que sus datos personales serán utilizados
                                para las siguientes finalidades primarias: (1) Identificar y verificar los datos personales registrados (2),
                                gestionar y dar seguimiento a compras de servicios turísticos, hospedaje, alimentos y bebidas, tours, eventos,
                                (3) Estadística y registro histórico de candidatos que lo apoyaran en su servicio, (4) Informarle posibles
                                cambios de dichos productos o servicios (4) realizar los cargos correspondientes a sus compras de los artículos
                                mencionados en (2), (5) dar seguimiento a los productos y servicios solicitados hasta que el cliente final
                                los reciba, (6) Dar servicio de pos venta con fines de calidad en servicio (7) elaborar informes estadísticos.
                            </Text>
                            {'\n'}{'\n'}
                            <Text style={styles.avisoTextoNormal}>Y para las siguientes finalidades secundarias:
                                (7) Dar seguimiento a la legislación aplicable de operación de La Isla Huatulco sa de cv,
                                así como requerimientos de autoridades federales y locales. (8) informarle sobre promociones y eventos,
                                sugerencia de todos los productos y servicios ofertados. Para mayor información acerca del tratamiento y
                                de los derechos que puede hacer valer, usted puede acceder al Aviso de Privacidad completo a través de
                                nuestro Responsable de Datos en la siguiente dirección: {' '}
                            </Text>
                            <Text style={styles.avisoTextoNegritaDos}>{this.textos.avisoTextoNegritaDos}{' '}</Text>
                            <Text style={styles.avisoTextoNormal}>en los siguientes Teléfonos: 5559655660, 958-5870847 para poder otorgarle un código de recepción referente
                                a la petición. www.laislahuatulco.com</Text>
                        </Text>
                    </View>


                    <View style={styles.contenedorBotones}>
                        <TouchableOpacity style={styles.botonAceptar} onPress={ () =>{this._savePrivacity()}} >
                            <Text style={styles.textoBoton}>Aceptar</Text>
                        </TouchableOpacity>







                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    headerSite: {
        position: "relative",
        alignItems: 'center',
        justifyContent:'center',
        color: '#000',
         width: '100%',
        paddingTop: 10,
        backgroundColor: "#FFF"
    },
    text: {
        alignItems: 'center',
        position: "relative",
        color: "#000",
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: 'bold',
        paddingRight: 10,
        flexDirection: "column",
        height: 36
    },
    avisoTitulo: {
        color: '#4D4D4D',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 20
    },
    avisoTextoNegrita: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    avisoTextoNormal: {
        color: '#616161',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 15
    },
    contenedorCheckbox:{
        flex: 1,
        justifyContent: 'center',
        flexDirection:'row',
        alignItems:'center',
        marginTop: 15,
        backgroundColor: '#E7E7E7'
    },
    contenedorBotones:{
        flex: 1,
        justifyContent: 'center',
        flexDirection:'row',
        paddingBottom: 20,
        alignItems:'center'
    },
    botonCancelar: {
        width:100,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E605D',
        borderRadius: 5,
        marginTop:25,
        marginBottom:25,
    },
    botonAceptar: {
        width:100,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4BAA2B',
        borderRadius: 5,
        marginTop:25,
        marginLeft:25,
        marginBottom:25,
    },
    botonCancelar2: {
        width:100,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E605D',
        opacity:0.3,
        borderRadius: 5,
        marginTop:25,
        marginLeft:25,
        marginBottom:25,
    },
    textoBoton:{
        color: '#FFF',
        fontSize: 20
    },
    textoCheck:{
        color: '#616161',
        fontSize: 20
    },
    wraper:{
        paddingBottom: 20
    }
});

export default withNavigation(Privacity);