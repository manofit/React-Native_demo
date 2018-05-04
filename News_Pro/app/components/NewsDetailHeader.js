import React, { PureComponent } from 'react'
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
    Text,
    View,
} from 'react-native'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default class NewsDetailHeader extends PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {

        }
    }

    render(){
        return(
            <View style={styles.headerContainer}>
                <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'row', alignItems:'center', flex: 1}} onPress={() => this.props.navigation.goBack()} >
                    <Image source={require('./../../assets/images/i_goback.png')} resizeMode={'contain'} style={styles.headerLeftImg} />
                    <Text style={{color: 'white', fontSize: 16}}>{this.props.leftText}</Text>
                </TouchableOpacity>

                <View style={styles.headerCenterContainer}>
                    <Text style={styles.headerCenterText}>{this.props.centerText}</Text>
                </View>

                {/* 为了让标题居中 */}
                <View style={{height: 25,width: 25,justifyContent: 'center', flex: 1} }/>
            </View>
        )
    }
}

NewsDetailHeader.defaultProps = {
    leftText:'返回',
    centerText:'新闻详情',
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#d81e06',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        paddingTop: 25,
    },
    headerLeftImg: {
        width:25,
        height:25,
    },
    headerCenterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        flex: 4,
    },
    headerCenterText: {
        fontSize: 18,
        color: '#f8f8f8',
    },
    headerRightImg: {
        width: 40,
        height: 40,
    },
})