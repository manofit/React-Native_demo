import React, { PureComponent } from 'react' 
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
}from 'react-native'
import VideoPlayer from './../../components/VideoPlayer';
import Orientation from 'react-native-orientation'

export default class VideoDetail extends PureComponent {
    
    constructor(props){
        super(props);

        this.state = {
            isFullScreen: false,
            voteCount: 0,
            isVote: false
        }
    }

    params = this.props.navigation.state.params.item
    isNews = this.params['videoinfo']
    voteCount = this.isNews ? this.isNews['voteCount'] : this.params['votecount']
    uri = this.isNews ? this.isNews['mp4_url'] : this.params['mp4_url']
    cover = this.isNews ? this.isNews['cover'] : this.params['cover']
    playCount = this.isNews ? this.isNews['playCount'] : this.params['playCount']
    topicImg = this.isNews? this.isNews['topicImg'] :this.params['topicImg']
    topicName = this.isNews? this.isNews['topicName'] : this.params['topicName']

    componentWillMount() {
        this.setState({
            voteCount: this.voteCount
        })
    }

    componentWillUnmount() {
        Orientation.unlockAllOrientations()
    }

    _onOrinentationChange = (isFullScreen) => {
        if (isFullScreen) {
            Orientation.lockToPortrait()
        }else{
            Orientation.lockToLandscape()
        }
    }

    _onClickBackButton = () => {
        this.props.navigation.goBack()
    }

    _onLayoutChange = (event) => {
        let {x, y, width, height} = event.nativeEvent.layout
        let isLandscape = (width > height)
        if (isLandscape){
            this.setState({
                isFullScreen: true
            })
            this.videoPlayer.updateLayout(width, height, true)
        }else{
            this.setState({
                isFullScreen: false
            })
            this.videoPlayer.uodateLayout(width, width * 9 / 16, false)
        }
    }

    

    render(){
        return(
            <View>

            </View>
        )
    }
}