import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import color from './color'
import {screen, system} from '../common'

export default class Separator extends PureComponent {
    render(){
        return(
            <View style={[styles.line, this.props.style]}></View>
        )
    }
}

const styles = StyleSheet.create({
    line: {
        width: screen.width,
        height: screen.onePixel,
        backgroundColor: color.border,
    }
})