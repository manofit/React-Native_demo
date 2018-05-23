import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
}from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import {Heading1, Heading2, Paragraph} from '../../widget/Text'
import {color, Button, NavigationItem, SpacingView} from '../../widget'
import {screen, system} from '../../common'
import api from '../../api'
import NearbyListScene from './NearbyListScene'

export default class OrderbyScene extends PureComponent {

    
    
    render(){

        let titles = ['享美食','住酒店','爱玩乐','全部']
        let types = [
            ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
            ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠'],
            ['热门', 'KTV', '足疗按摩', '洗浴汗蒸',  '电影院', '美发', '美甲'],
            []
        ]

        return(
           
                <ScrollableTabView 
                style={styles.container}
                tabBarBackgroundColor='white'
                tabBarActiveTextColor='#fe5660'
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
                >
                    {
                        titles.map((title, i) => (
                            <NearbyListScene 
                                tabLabel={titles[i]}
                                key={i}
                                types={types[i]}
                                navigation={this.props.navigation}
                            />
                        ))
                    }
                </ScrollableTabView>
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.paper
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: '#FE566D'
    },
})