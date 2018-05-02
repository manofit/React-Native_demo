import React, { PureComponent } from 'react'
import {
    Image,
    StyleSheet, 
} from 'react-native'
import { TabNavigator } from 'react-native-tab-navigator'
import Home from './pages/Home'
import Live from './pages/Live'
import Mine from './pages/Mine'
import Video from './pages/Video'

export default class MainTab extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: '首页',
        }
    }

    render(){
        return (
            <TabNavigator>
                { this._renderTabbarItem('首页', require("./../assets/images/i_home.png"), require("./../assets/images/i_home_foc.png"), Home) }
                { this._renderTabbarItem('视频', require("./../assets/images/i_video.png"), require("./../assets/images/i_video_foc.png"), Video) }
                { this._renderTabbarItem('直播', require("./../assets/images/i_live.png"), require("./../assets/images/i_live_foc.png"), Live) }
                { this._renderTabbarItem('我的', require("./../assets/images/i_mine.png"), require("./../assets/images/i_mine_foc.png"), Mine) }
            </TabNavigator>
        )
    }

    _renderTabbarItem(selectedTab, icon, selectedIcon, Component){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={selectedTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={icon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon} />}
                onPress={() => this.setState({selectedTab})}
            >
                <Component navigation={this.props.navigation} />
            </TabNavigator.Item>
        )
    }
}

const styles = StyleSheet.create({
    tabText:{
        color:'#515151',
        fontSize:12,
    },
    selectedTabText:{
        color:'#d81e06',
    },
    icon:{
        width:25,
        height:25,
        marginBottom:-3,
    }
})