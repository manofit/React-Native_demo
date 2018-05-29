import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import {Heading3} from '../../widget/Text'
import {screen, system} from '../../common'

export default class OrderMenuItem extends PureComponent {
    render() {
        return(
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <Image style={styles.icon} source={this.props.icon} resizeMode='contain' />
                <Heading3>{this.props.title}</Heading3>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 4,
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5,
    },
})