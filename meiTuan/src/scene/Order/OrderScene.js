import React, { PureComponent } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar,
    ListView,
    ScrollView,
    RefreshControl
}from 'react-native'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {Heading1, Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen, system} from '../../common'
import api from '../../api'
import {color, SpacingView} from '../../widget';
import OrderMenuItem from './OrderMenuItem'
import GroupPurchaseCell from '../GroupPurchaseScene/GroupPurchaseCell'


export default class OrderScene extends PureComponent {
    
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        this.requestData()
    }

    requestData = async () => {
        try {
            this.setState({
                refreshState: RefreshState.HeaderRefreshing
            })

            let response = await fetch(api.recommend)
            let json = await response.json()

            console.log(JSON.stringify(json))

            let dataList = json.data.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })

            dataList.sort(() => {
                return 0.5 - Math.random()
            })

            this.setState({
                data: dataList,
                refreshState: RefreshState.NoMoreData,
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure
            })
        }
    }

    keyExtractor = (item, index) => {
        return item.id
    }

    renderHeader = () => {
        return(
            <View></View>
        )
    }

    renderCell = (rowData) => {
        return(
            <GroupPurchaseCell
                info = {rowData.item}
                onPress = {() => {
                    StatusBar.setBarStyle('default', false)
                    this.props.navigation.navigate('GroupPurchase', {info:rowData.item})
                }}
            />
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.data}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.requestData}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
    },
})