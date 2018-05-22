import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    StatusBar,
    FlatList,
} from 'react-native'
import {Heading1, Heading2, Heading3, Paragraph} from '../../widget/Text'
import color from '../../widget/color'
import Button from '../../widget/Button'
import NavigationItem from '../../widget/NavigationItem'
import SpacingView from '../../widget/SpacingView'
import screen from '../../common/screen'
import system from '../../common/system'
import api from '../../api'
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchaseScene/GroupPurchaseCell'

export default class HomeScene extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar} >
                <Image source={require('../../img/home/search_icon.png')} style={styles.searchIcon} />
                <Paragraph>一点点</Paragraph>
            </TouchableOpacity>
        ),
        headerRight: (
            <NavigationItem 
                icon={require('../../img/mine/icon_navigation_item_message_white.png')}
                onPress={() => {

                }}
            />
        ),
        headerLeft: (
            <NavigationItem 
                title='福州'
                titleStyle={{color:'white'}}
                onPress={() => {

                }}
            />
        ),
        headerStyle: {backgroundColor: color.primary}
    })

    constructor(props) {
        super(props);
        
        this.state={
            discounts: [],
            dataList: [],
            refreshing: false,
        }
    }

    componentDidMount(){
        this.requestData()
    }

    requestData = () => {
        this.setState({
            refreshing: true,
        })

        this.requestDiscount()
        this.requestRecommend()
    }

    requestDiscount = async () => {
        try {
            let response = await fetch(api.discount)
            let json = await response.json()
            this.setState({
                discounts: json.data
            })
        } catch (error) {
            alert(error)
        }
    }

    requestRecommend = async () => {
        try {
            let response = await fetch(api.recommend)
            let json = await response.json()

            let dataList = json.data.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price,
                }
            })

            this.setState({
                dataList: dataList,
                refreshing: false,
            })
        } catch (error) {
            this.setState({
                refreshing: false
            })
        }
    }

    renderCell = (info) => {
        return (
            <GroupPurchaseCell 
                info={info.item}
                onPress={this.onCellSelected}
            />
        )
    }

    onCellSelected = (info) => {
        StatusBar.setBarStyle('default', false)
        this.props.navigation.navigate('GroupPurchase', {info: info})
    }

    keyExtractor = (item, index) => {
        return item.id
    }

    renderHeader = () => {
        return(
            <View>
                <HomeMenuView menuInfos={api.menuInfo} onMenuSelected={this.onMenuSelected} />
                <SpacingView />
                <HomeGridView infos={this.state.discounts} onGridSelected={this.onGridSelected} />
                <SpacingView />
                <View style={styles.recommendHeader}>
                    <Heading3>猜你喜欢</Heading3>
                </View>
            </View>
        )
    }

    onGridSelected = (index) => {
        let discount = this.state.discounts[index]

        if (discount.type == 1){
            StatusBar.setBarStyle('default', false)

            let location = discount.tplurl.indexOf('http')
            let url = discount.tplurl.slice(location)
            this.props.navigation.navigate('Web', {url:url})
        }
    }
    
    onMenuSelected = (index) => {
        alert(index)
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList 
                    data={this.state.dataList}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
})