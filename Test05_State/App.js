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


type Props = {};

class Blink extends Component {
  constructor(props) {
    super(props)
    this.state = {showText: true}

    setInterval(() => {
      this.setState(previousState => {
        return {showText: !previousState.showText}
      })
    }, 1000)
  }

  render() {
    let display = this.state.showText ? this.props.text : " "
    return (
      <Text>{display}</Text>
    )
  }
}

export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <Blink text='aaaaa' />
        <Blink text='bbbbb' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
});
