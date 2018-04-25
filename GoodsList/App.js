/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

var goods = [
  {
    title: '空气净化器',
    url: 'http://img.muji.com.cn/img/item/4547315820665_400.jpg'
  },
  {
    title: '棉不均匀染色开衫',
    url: 'http://img.muji.com.cn/img/item/4549738656746_400.jpg'
  },
  {
    title: '硅胶球形制冰器',
    url: 'http://img.muji.com.cn/img/item/4549738306771_400.jpg'
  },
  {
    title: '组合柜',
    url: 'http://img.muji.com.cn/img/item/4549337263215_400.jpg'
  },
  {
    title: '牛奶巧克力',
    url: 'http://img.muji.com.cn/img/item/4549738664512_400.jpg'
  },
  {
    title: '棉法兰绒被套 ',
    url: 'http://img.muji.com.cn/img/item/4549738391210_400.jpg'
  }
]

class Item extends Component {
  render(){
    return(
      <View style={styles.item}>
         <TouchableOpacity onPress={this.props.press}>
           <ImageBackground resizeMode="contain" style={styles.img}
             source={{uri:this.props.url}}>
               <Text numberOfLines={1} style={styles.item_text}>{this.props.title}</Text>
           </ImageBackground>
           
         </TouchableOpacity>
       </View>
    )
  }
}

class List extends Component {
  render() {
    var data = this.props.goods;
    var list = [];
    for (var i = 0;i <= data.length - 2;i = i + 2){
      
        var row = (
          <View key={i} style={styles.row}>
            <Item url={data[i].url} title={data[i].title} press={this.press.bind(this, data[i])}></Item>
            <Item url={data[i+1].url} title={data[i+1].title} press={this.press.bind(this, data[i+1])}></Item>
          </View>
        )
        list.push(row);
      
    }

    return(
      <ScrollView style={{marginTop:10}}>
        {list}
      </ScrollView>
    )
  }

  press(data){
    alert('您点击了' + data.title);
  }
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={[styles.flex,{marginTop:20}]}>
         <List goods={goods}></List>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  flex:{
    flex:1
 },
 row:{
   flexDirection: 'row',
   marginBottom: 10,
 },
 item:{
   flex:1,
   marginLeft:5,
   borderWidth:1,
   borderColor:'#ddd',
   marginRight:5,
   height:140,
 },
 img:{
   flex:1,
   backgroundColor: 'transparent'
 },
 item_text:{
   backgroundColor: '#000',
   opacity: 0.7,
   color:'#fff',
   height:25,
   lineHeight:18,
   textAlign:'center',
   marginTop:114
 }
});
