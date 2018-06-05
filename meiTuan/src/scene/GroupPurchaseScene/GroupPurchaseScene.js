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

            let dataList = json.data.deals.map(() => {
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

    


    render(){
        return(
            <View>
                
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