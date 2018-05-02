import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackAndroid,
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import RouteConfig from './app/RouteConfig'
import StackNavigatorConfig from './app/StackNavigatorConfig'

const Navigator = StackNavigator(RouteConfig, StackNavigatorConfig);

export default class App extends PureComponent {
  render() {
    return (

      <Navigator />

    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     paddingTop: 50,
//   },
//   messages: {
//     marginTop: 30,
//     textAlign: 'center',
//   },
//   restartToggleButton: {
//     color: 'blue',
//     fontSize: 17,
//   },
//   syncButton: {
//     color: 'green',
//     fontSize: 17,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 20,
//   },
// });
