import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    StatusBar,
} from 'react-native'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {color, Button, NavigationItem} from '../../widget'
import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import api from '../../api'

import GroupPurchaseCell from '../GroupPurchaseScene/GroupPurchaseCell'
import NearbyHeaderView from './NearbyHeaderView'

export default class NearbyListScene extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            typeIndex: 0,
            data: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount(){
        this.requestFirstPageData()
    }

    requestFirstPageData = async () => {
        try {
            this.setState({
                refreshState: RefreshState.HeaderRefreshing
            })

            let dataList = await this.requestData()

            this.setState({
                data: dataList,
                refreshState: RefreshState.Idle
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure
            })
        }
    }

    requestData = async () => {
        let response = await fetch(api.recommend)
        let json = await response.json()

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
            return 0.5-Math.random()
        })

        return dataList
    }

    requestNextPage = async () => {
        try {
            this.setState({
                refreshState: RefreshState.FooterRefreshing
            }) 

            let dataList = await this.requestData()

            this.setState({
                data: [...this.state.data, ...dataList],
                refreshState: this.state.data.length > 30 ? RefreshState.NoMoreData : RefreshState.Idle
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure
            })
        }
    }

    keyExtractor = (item, index) => {
        return index
    }

    renderHeader = () => {
        return(
            <NearbyHeaderView
                titles={this.props.types}
                selectedIndex={this.state.typeIndex}
                onSelected={(index) => {
                    if(index != this.state.typeIndex){
                        this.setState({typeIndex: index})
                        this.requestData()
                    }
                }}
            />
        )
    }

    renderCell = (rowData) => {
        return(
            <GroupPurchaseCell 
                info={rowData.item}
                onPress={() => {
                    this.props.navigation.navigate('GroupPurchase', {info: rowData.item})
                }}
            />
        )
    }

    render(){
        return(
            <RefreshListView 
                data={this.state.data}
                ListHeaderComponent={this.renderHeader}
                renderItem={this.renderCell}
                keyExtractor={this.keyExtractor}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.requestFirstPageData}
                onFooterRefresh={this.requestNextPage}
            />
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})