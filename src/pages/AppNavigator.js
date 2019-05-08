import React from "react";
import {

  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "./Login";
import Lugares from "./Lugares";
import Categorias from "./Categorias";
import ScanQR from "./ScanQR";
import Privacity from "./Privacity";
import Privacity2 from "./Privacity2";
import Swipper from "./Swipper";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Menu from '../components/Menu';
import Productos from "../components/Products"
import DetailProduct from '../components/DetailProduct'
import Cart from '../components/Cart';
import InicioApp from '../components/InicioAPP';
import inBuild from '../pages/inBuild';
import SearchProduct from '../components/SearchProduct';
import TipoPago from '../components/TipoPago';
import PagoTarjeta from '../components/PagoTarjeta';
import OcultarEjemplo from "../components/OcultarEjemplo";

const AppStack = createStackNavigator({

  OcultarEjemplo: {screen: OcultarEjemplo},
  TipoPago: {screen: TipoPago},
  PagoTarjeta: {screen: PagoTarjeta},
  Lugares: { screen: Lugares },
  Categorias: { screen: Categorias },
  Privacity2: { screen: Privacity2 },
  Menu: { screen: Menu}, Productos: { screen: Productos },
  Cart: {screen: Cart},
  DetailProduct: {screen: DetailProduct},
  InicioApp: {screen: InicioApp},
  SearchProduct: {screen: SearchProduct},
  inBuild: {screen: inBuild}

});

const AuthStack = createStackNavigator({
  Swipper: { screen: Swipper },
  Login: { screen: Login },
  Privacity: { screen: Privacity },
  ScanQR: { screen: ScanQR }
});

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: { screen: AuthLoadingScreen },
      AuthStack: { screen: AuthStack },
      AppStack: { screen: AppStack }
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default Navigator;
