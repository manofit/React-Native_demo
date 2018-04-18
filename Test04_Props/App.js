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
  Image
} from 'react-native';

type Props = {};

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

export default class App extends Component<Props> {
  render() {
    // let pic = {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    // };
    // return (
    //   <Image source={pic} style={{width: 193, height: 100}} />
    // );
    return (
      <View style={{alignItems: 'center'}}>
      <Greeting name='aaaa' />
      <Greeting name='bbbb' />
      <Greeting name='cccc' />
    </View>
    )
  }
}

const styles = StyleSheet.create({

});
