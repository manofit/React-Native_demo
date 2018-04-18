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
  View,
  TextInput,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput style={{height:40}}
          placeholder="type here to translate!"
          onChangeText={(text) => this.setState({text})} 
        />
        <Text>
          {this.state.text.split(' ').map((word) => word && 'ios').join(' ')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
