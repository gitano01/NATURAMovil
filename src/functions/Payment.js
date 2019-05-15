
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
            line_items: [{
                name: "Tacos",
                unit_price: 1000,
                quantity: 120
            }],
            shipping_lines: [{
                amount: 1500,
                carrier: "FEDEX"
            }], //shipping_lines - physical goods only
            currency: "MXN",
            customer_info: {
                name: 'Fulanito Pérez',
                phone: '+52181818181'
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

        Alert.alert("contenido del Json: ",token.toString()+"\n"+JSON.stringify(order));









    }
}

export default (Payment);