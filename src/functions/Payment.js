
import React from 'react';
import {Alert, AsyncStorage} from 'react-native';
import Conekta from 'react-native-conekta';



class Payment{



     Pago=async()=>{

       Alert.alert('El token','pasate el token we');

        var token = await AsyncStorage.getItem('token');

       var  conekta = new Conekta();


       conekta.api_key = 'key_vvmNbzNxfi2FyjhBD42XVw';
       conekta.api_version = '2.0.3';

       var order =({
            orders: [{
                id: 1,
                cantidad: 3,
                opcion1: null,
                opcion2: null,
                opcion3: null
            }],
            usuario: 2,
            calificacion: 0,
            calificado: false,
            tipo_pago: "tarjeta",
            lugar_id: 1,
            currency: "MXN",
            customer_info: {
                name: 'ENERICO',

            },
              //shipping_contact - required only for physical goods
            metadata: {description: "Compra de creditos: 300(MXN)", reference: "1334523452345"},
            charges: [{
                payment_method: {
                    //'monthly_installments':9,
                    'type': 'card',
                    'token_id': token
                }  //payment_methods - use the customer's default - a card
                   //to charge a card, different from the default,
                   //you can indicate the card's source_id as shown in the Retry Card Section
            }]
            , function(err, res){

                if(err){
                    console.warn(res.toBeObject());
                }

            }

        });

         await fetch("http://192.168.13.128:3005/api/v1/pedidos/conekta_create",       {
                 method: 'POST',
             headers: {
                     'Accept': 'application/json',
                    'Content-Type': 'application/json'
                 },
             body: JSON.stringify(order)
             }
         )
             .then((response )=> response.json())
             .then((responseData) => {
                 Alert.alert("Post response")
             })
             .done();

         Alert.alert("contenido del Json: ",token.toString()+"\n"+JSON.stringify(order));









    }
}

export default (Payment);