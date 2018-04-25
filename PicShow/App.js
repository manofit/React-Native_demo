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
  Image,
  TouchableOpacity,
} from 'react-native';

//网络图片数组
var imgs = [
  'https://img3.doubanio.com/view/movie_poster_cover/mpst/public/p2263582212.jpg',
  'https://img3.doubanio.com/view/movie_poster_cover/mpst/public/p2265761240.jpg',
  'https://img3.doubanio.com/view/movie_poster_cover/mpst/public/p2266110047.jpg'
];

type Props = {};

//图片浏览组件
class MyImage extends Component {
  //构造函数
  constructor(props) {
      super(props);
      this.state = {
          imgs: props.imgs,
          count: 0
      };
  }

  //下一张按钮点击事件
  goNext() {
      var count = this.state.count;
      count++;
      if (count < imgs.length) {
          this.setState({count: count});
    }
  }

  //上一张按钮点击事件
  goPreview() {
    var count = this.state.count;
    count --;
    if(count >= 0){
      this.setState({count: count});
    }
  }

  render() {
    return (
      <View style={[styles.flex]}>
        <View style={styles.image}>
          <Image style={styles.img}
            source={{uri: this.state.imgs[this.state.count]}}
            resizeMode="contain" />
        </View>
        <View style={styles.btns}>
          <TouchableOpacity onPress={this.goPreview.bind(this)}>
            <View style={styles.btn}>
               <Text>上一张</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goNext.bind(this)}>
            <View style={styles.btn}>
               <Text>下一张</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class App extends Component<Props> {
  render() {
    return (
      <View style={[styles.flex, {marginTop:40}]}>
        <MyImage imgs={imgs}></MyImage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex:{
    flex: 1,
    alignItems:'center'
  },
  image:{
    borderWidth:1,
    width:300,
    height:200,
    borderRadius:5,
    borderColor:'#ccc'
  },
  img:{
    height:198,
    width:300,
  },
  btns:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20
  },
  btn:{
    width:60,
    height:30,
    borderColor: '#0089FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:3,
    marginRight:20,
  },
});
