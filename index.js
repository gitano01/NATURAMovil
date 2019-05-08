/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Lugares  from './src/pages/Lugares';
import Privacity from './src/pages/Privacity';
import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';
import InicioAPP from './src/components/InicioAPP';
import Products from './src/components/Products';
import Menu from './src/components/Menu';
import DetailProduct from './src/components/DetailProduct';


import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
