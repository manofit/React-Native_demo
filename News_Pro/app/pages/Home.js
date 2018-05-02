import React, { PureComponent } from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Alert,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar,
    Platform,
}from 'react-native'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'


export default class Home extends PureComponent {
    render(){
        return(
            <View style={styles.container}>
                
                <StatusBar backgroundColor={'rgba(255,255,255,0)'} translucent={true} animated={true} />


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F8F8F8',
        position: 'relative',
    },
})
