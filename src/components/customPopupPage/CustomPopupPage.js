
/**
 * @author GJS <1353990812@qq.com>
 *
 * GJS reserves all rights not expressly granted.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 GJS
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule CustomPopupPage
 * @flow
 */

/*
控件功能：弹出框，normal pop up 动画
相关界面：...
*/

'use strict';

import React,{
    Component
} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    ListView,
    Text,
    Easing,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
} from 'react-native'

import {
  Platform
} from 'react-native'

import BasePopupPage from './BasePopupPage'

var animConfigs = {
  isRTL: true,
}

export default class CustomPopupPage extends BasePopupPage{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          ...this.state,
          ds: ds.cloneWithRows(['xxxxxxyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', 'x', 'o', 'o']),
        }
    }

    dismissAnimate = (animateConfigs) => {
      if (animateConfigs && typeof animateConfigs.animate === 'function') {
        animateConfigs.animate();
        return;
      };
      Animated.sequence([            // 首先执行decay动画，结束后同时执行spring和twirl动画
        // Animated.decay(position, {   // 滑行一段距离后停止
        //   velocity: {x: gestureState.vx, y: gestureState.vy}, // 根据用户的手势设置速度
        //   deceleration: 0.997,
        // }),
        Animated.parallel([          // 在decay之后并行执行：
          // Animated.spring(position, {
          //   toValue: {x: 0, y: 0}    // 返回到起始点开始
          // }),
          // Animated.timing(twirl, {   // 同时开始旋转
          //   toValue: 360,
          // }),        
          Animated.timing(this.state.bounceValueAnimated, {
            toValue: 0, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
          }),
          Animated.timing(this.state.fadeInOpacity, {
            toValue: 0, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
          }),
        ]),
      ]).start();                    // 执行这一整套动画序列
      
    }

    showAnimate = (animateConfigs, width, height) => {
      
      if (animateConfigs && typeof animateConfigs.animate === 'function') {
        animateConfigs.animate(width, height);
        return;
      };

      var ratio = this.state.height / this.state.width;
      this.setState({
        width: width || this.state.width,
        height: height || this.state.height,
        // widthAnimated: 1*100,
        // heightAnimated: ratio*100,
        widthAnimated: width || this.state.width,
        heightAnimated: height || this.state.height,
      });

      Animated.timing(this.state.bounceValueAnimated, {
        // toValue: this.state.width/100, // 目标值
        toValue: 1, // 目标值
        duration: 200, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
      Animated.timing(this.state.fadeInOpacity, {
        toValue: 0.4, // 目标值
        duration: 200, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
    }

    componentDidMount(){
      //
      console.log('this.state.widthAnimated.__getValue(): --> ' + this.state.widthAnimated.__getValue());
      console.log('this.state.heightAnimated.__getValue(): --> ' + this.state.heightAnimated.__getValue());
      // console.log('this.state.translateAnimated: --> (' + this.state.translateAnimated.__getValue().x + ', ' + this.state.translateAnimated.__getValue().y + ')');
    }

    render(){
        return this.renderBaseContainer(
          {
            style: {
              // top: (Dimensions.get('window').height - this.state.heightAnimated) / 2,
              // left: (Dimensions.get('window').width - this.state.widthAnimated) / 2,
            },
            children: (
              <ListView
                enableEmptySections={true}
                dataSource={this.state.ds}
                renderRow={this._renderRow}
                // style={{
                //   flex: 1,
                //   flexDirection: 'row', // 这句竟然能让横向滚动。。
                //   alignSelf: 'flex-start',
                //   backgroundColor: 'orange',
                // }}
              />
            )
          }
        );
    }

    _renderRow=(rowData: Object, sectionID: number, rowID: number) =>{
      return (
        <TouchableOpacity style={{flex: 1}}>
            <View style={[styles.row, {backgroundColor: rowID === '0' ? 'blue' : 'green'}]}>
              <Text style={[styles.text, {fontSize:15,color:'#3b3b3b',marginLeft:0,marginTop:13}]}>
                {rowData}
              </Text>
            </View>
            <View style={{width:Dimensions.get('window').width,height:0.7,backgroundColor:'#D0D0D0'}}/>
        </TouchableOpacity>
      );
    }
}

const side = animConfigs.isRTL ? 'right' : 'left';
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
  },
  modalContainer: {
    position: 'absolute',
    [side] : 0,
    top: 0,
  },
  text: {
    textAlign: 'center',
    marginLeft: 6,
    marginTop: 13,
    flex: 1,
    fontSize: 15,
    color: '#3b3b3b',
  },
  overlay:{
      position: 'absolute',
      zIndex: 998,
      backgroundColor: 'black',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
  },
  container:{
      // position: 'absolute',
      position: 'relative',
      // flex: 1,
      alignSelf: 'center',
      zIndex: 999,
      backgroundColor: '#ffffff',
      // top: 0,
      // left: 0,
  },
  row: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    overflow: 'hidden',
  },
});


