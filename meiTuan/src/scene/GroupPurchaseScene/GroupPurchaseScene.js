import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    InteractionManager,
}from 'react-native'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {color, Button, NavigationItem, Separator, SpacingView} from '../../widget'
import {screen, system} from '../../common'
import {Heading2, Heading3, Paragraph, Heading1} from '../../widget/Text'
import api, {recommendUrlWithId, groupPurchaseDetailWithId} from '../../api';
import GroupPurchaseCell from './GroupPurchaseCell'

export default class GroupPurchaseScene extends PureComponent {
    
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.requestData()
        })
    }

    requestData = () => {
        this.requestRecommend()
    }

    requestRecommend = async () => {
        try {
            this.setState({
                refreshState:RefreshState.HeaderRefreshing
            })

            let info = this.props.navigation.state.params.info
            let response = await fetch(recommendUrlWithId(info.id))
            let json = await response.json()

            let dataList = json.data.deals.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.imgurl,
                    title: info.brandname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })

            this.setState({
                data: dataList,
                refreshState: RefreshState.NoMoreData,
            })
        } catch (error) {
            this,this.setState({
                refreshState: RefreshState.Failure
            })
        }
    }
    
    keyExtractor = (item, index) => {
        return item.id
    }

    renderHeader = () => {
        let info = this.props.navigation.state.params.info

        return(
            <View>
                <View>
                    <Image style={styles.banner} source={{uri: info.imageUrl.replace('w.h', '480.0')}} />

                    <View style={styles.topContainer}>
                        <Heading2 style={{color: color.primary}}>￥</Heading2>
                        <Heading1 style={{marginBottom: -8,}}>{info.price}</Heading1>
                        <Paragraph style={{marginLeft: 10,}}>门市价：￥{(info.price * 1.1).toFixed(0)}</Paragraph>
                        <View style={{flex:1}} />
                        <Button 
                            title='立即抢购'
                            titleStyle={{color:'white', fontSize: 18,}}
                            style={styles.buyButton}
                        />
                    </View>

                    <SpacingView />

                    <View style={styles.tagContainer}>
                        <Image style={{width:20, height:20}} source={require('../../img/home/icon_deal_anytime_refund.png')} />
                        <Paragraph style={{color:'#89b24f'}}>  随时退</Paragraph>
                        <View style={{flex:1}}></View>
                        <Paragraph>已售{1234}</Paragraph>
                    </View>

                    <SpacingView />

                    <View style={styles.tipHeader}>
                        <Heading3>看了本团购的用户还看了</Heading3>
                    </View>
                </View>
            </View>
        )
    }

    renderCell = (rowData) => {
        return(
            <GroupPurchaseCell 
                info={rowData.item}
                onPress={() => this.props.navigation.navigate('GroupPurchase', {info: rowData.item})}
            />
        )
    }


    render(){
        return(
            <View style={styles.constainer}>
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
    constainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    }
})