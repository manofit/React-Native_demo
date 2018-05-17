import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import {Heading3} from '../../widget/Text'
import screen from '../../common/screen'
import system from '../../common/system'

export default class HomeMenuItem extends PureComponent {
    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
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
        width: screen.width / 5,
        height: screen.width / 5,
    },
    icon: {
        width: screen.width / 9,
        height: screen.width / 9,
        margin: 5,
    }
})