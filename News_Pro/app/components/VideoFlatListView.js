import React, { PureComponent } from 'react'
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ImageBackground,
    Easing,
    StyleSheet,
} from 'react-native'
import ajax from '../utils/fetch'
import Toast, { DURATION } from 'react-native-easy-toast'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default class VideoFlatListView extends PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            sourceData: [],
            refreshing: false,
            flatHeight: 0,
            indexText: '',
        }
    }

    currPage = 0
    rotateDeg = new Animated.Value(0)

    _getNewsData = () => {
        let _this = this
        let requestCode = this.props.requestCode

        ajax({
            url:`http://c.3g.163.com/nc/video/${requestCode}/${_this.currPage}-10.html`,
            success: (data) => {
                data['videoList'][0].length = 61

                _this.setState({
                    sourceData: _this.state.refreshing ? data['videoList'] : [...this.state.sourceData, ...data['videoList']]
                })
                _this.currPage += 10
            },
            error: (err) => {
                _this.refs.toast.show('网络请求异常')
            },
            complete: () => {
                _this.state.refreshing && _this.setState({
                    refreshing: false
                })
            }
        })
    }

    _keyExtractor = (item, index) => index + ''

    _onPressItem = (item) => {
        this.props.navigation.push('VideoDetail', {item})
    }

    //跳转到指定位置
    _doActionToItem = () => {
        this.flatList.scrollToIndex({
            viewPosition: 0, //指定选定行显示的位置，0代表top，0.5代表middle，1代表bottom
            index: this.state.indexText,
        })
    }

    //跳转到内容最底部
    _doActionToBottom = () => {
        this.flatList.scrollToEnd()
    }

    // 空布局
    _renderEmptyView = () => {
        return(
            <View style={{height: this.state.flatHeight, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', marginTop:20}}>
                <Image source={require('./../../assets/images/list_placeholder.png')} resizeMode={'contain'} style={{width: 80, height: 60}} />
            </View>
        )
    };

    _renderFooter = () => {
        let len = this.state.sourceData.length
        const spin = this.rotateDeg.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg'],
        })
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', height:len<1?0:40}}>
                <Animated.Image source={require('./../../assets/images/i_loading.gif')} resizeMode={'contain'} style={{width:20, height:len<1?0:40, marginRight:5, transform:[{rotate: spin}]}} />
                <Text>正在加载...</Text>
            </View>
        )
    }

    //开始loading动画
    _spin = () => {
        this.rotateDeg.setValue(0)
        Animated.timing(
            this.rotateDeg,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
            }
        ).start()
    }

    //分割线
    _renderItemSeparatorComponent = ({highlighted}) => {
        return(
            <View style={{height:1, backgroundColor:'#e6e6e6'}}></View>
        )
    }

    //下拉刷新
    _renderRefresh = () => {
        this.setState({
            refreshing: true
        })
        this.currPage = 0
        this._getNewsData()
    }

    //上拉加载更多
    _onEndReach = () => {
        this._getNewsData()
    }

    _renderItem = ({item}) => {
        return(
            <VideoFlatListItem 
                item={item}
                onPressItem={this._onPressItem}
            />
        )
    }

    _setFlatListHeight = (e) => {
        let height = e.nativeEvent.layout.height
        if (this.state.flatHeight < height) {
            this.setState({
                flatHeight: height
            })
        }
    }

    componentDidMount() {
        this._getNewsData()
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    ref={(ref) => this.flatList = ref}
                    data={this.state.sourceData}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    initialNumToRender={10}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReach}
                    ListFooterComponent={this._renderFooter}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    ListEmptyComponent={this._renderEmptyView}
                    onLayout={this._setFlatListHeight}
                    refreshing={this.state.refreshing}
                    onRefresh={this._renderRefresh}
                />
                <Toast
                    ref='toast'
                    style={{backgroundColor:'black'}}
                    position='center'
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
            </View>
        )
    }
    
}

class VideoFlatListItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.item)
    }

    //秒 => 分
    _formatVideoTime = (s) => {
        if (s <= 60) {
            return s < 10 ? '00:0'+s : '00:'+s
        }
        if (s > 60) {
            let f = parseInt(s/60)
            let y = s % 60
            f < 10 && (f = '0'+f)
            y < 10 && (y = '0'+y)
            return `${f}:${y}`
        }
    }

    render(){

        let item = this.props.item

        return(
            <TouchableOpacity 
                {...this.props}
                onPress={this._onPress}
                activeOpacity={0.8}
            >
                <View style={{justifyContent:'space-around'}}>
                    <ImageBackground source={{uri:item.cover}} resizeMode={'cover'} style={{height:200, justifyContent:'space-between'}}>
                        <Text style={{fontSize:16, lineHeight:25, color:'#fff', backgroundColor:'rgba(0,0,0,0.3)', paddingHorizontal:10, paddingVertical:5}}>{item.title}</Text>
                        <View style={{ width:50, height:50, borderRadius:25, alignSelf:'center', backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('./../../assets/images/i_play.png')} resizeMode={'contain'} style={{width:18, height:18, marginLeft:3}} />
                        </View>
                        <Text style={{fontSize:12, alignSelf: 'flex-end', color: '#fff', padding: 10}}>{this._formatVideoTime(item.length)}</Text>
                    </ImageBackground>

                    <View style={{paddingHorizontal:8, marginTop:5, marginBottom:15, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={{uri:item.topicImg}} resizeMode={'contain'} style={{width:30, height:30, borderRadius:15, marginRight:10}} />
                            <Text style={{marginRight:6}}>{item.topicName}</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={require('./../../assets/images/i_reply.png')} resizeMode={'contain'} style={{width:25, height:25, marginRight:5}} />
                            <Text>{item.replyCount}跟帖</Text>
                        </View>
                    </View>
                </View>    
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    }
})