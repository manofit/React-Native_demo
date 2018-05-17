import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes
}from 'react-native'

export default class Button extends PureComponent{

    static defaultProps = {
        onPress: () => {},
        disabled: false,
        activeOpacity: 0.8,
    }

    render(){
        let {onPress, disabled, style, titleStyle, title, activeOpacity} = this.props
        return(
            <TouchableOpacity
                style={[styles.container, style]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={activeOpacity}
            >
                <Text style={titleStyle}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})