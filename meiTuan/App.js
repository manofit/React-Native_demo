/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RootScene from './src/RootScene'

export default class App extends Component {
  render() {
    return (
      <RootScene />
    );
  }
}

