
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
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule BasePopupPage
 * @flow
 */

/*
控件功能：弹出框，基础控件，提供定制弹框的功能
相关界面：...
子类继承：覆写 showAnimate(animateConfigs, width, height) 定制弹出动画，
        覆写 dismissAnimate() 定制消散动画，
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
    InteractionManager,
} from 'react-native'

import {
  Platform
} from 'react-native'

var animConfigs = {
  isRTL: true,
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
  baseContainer: { 
    zIndex:888, 
    backgroundColor:'transparent',
    // backgroundColor:'#fff123',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
      position: 'absolute',
      zIndex: 998,
      backgroundColor: 'black',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // justifyContent: 'center',
      // flexDirection: 'column',
      // alignItems: 'center',
  },
  container: {
      // position: 'absolute',
      position: 'relative',
      // flex: 1, // 不要这句
      alignSelf: 'center',
      zIndex: 999,
      backgroundColor: '#ffffff',
      // top: 0,
      // left: 0,
      overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    marginLeft: 6,
    marginTop: 13,
    flex: 1,
    fontSize: 15,
    color: '#3b3b3b',
  },
  row: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export default class BasePopupPage extends Component{
    constructor(props) {
        super(props);
        this.defaultStyle = {
          flex: 0, // 神奇，竟然就解决了下面这个问题（rn0.32.1 的时候ios还不报下面的错误）
          /*
          Invalid layout for (500)<RCTView: 0x7fa4d2533ee0; reactTag: 500; frame = (207 368; 0 0); transform = [0, 0, 0, 0, 0, 0]; clipsToBounds = YES; layer = <CALayer: 0x6080002370e0>>. position: {207, nan}. bounds: {{0, 0}, {276, nan}}
          Invalid layout for (537)<RCTView: 0x7fa4cff504e0; reactTag: 537; frame = (0 201; 414 0); clipsToBounds = YES; layer = <CALayer: 0x60000043a4a0>>. position: {207, nan}. bounds: {{0, 0}, {414, nan}}
          */
          height: 0,
          overflow: 'hidden',
        };
        this.absoluteContainer = {
          flex: 1, 
          position: 'absolute', 
          zIndex:888, 
          // width: Dimensions.get('window').width,
          // height: Dimensions.get('window').height,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor:'transparent',
          // backgroundColor:'#fff123',
        };
        this.relativeContainer = {
          // flex: 1, // 不要这句
          position: 'relative', 
          zIndex:888, 
          backgroundColor:'transparent',
        };
        this.state = {
          disablePointerEvents: props.disablePointerEvents || false,
          position: props.position || 'absolute',
          width: props.width || Dimensions.get('window').width * 2 / 3,
          height: props.height || 128,
          widthAnimated: new Animated.Value(props.width || Dimensions.get('window').width * 2 / 3),
          heightAnimated: new Animated.Value(0),
          bounceValueAnimated: props.scale ? new Animated.Value(props.scale) : new Animated.Value(0),
          // translateAnimated: new Animated.ValueXY(0, 1),
          // translateAnimated: {
          //   tx: 0,
          //   ty: 0, 
          // },
          translateAnimated: [0, 0],
          rotateAnimated: new Animated.Value(0),
          opacityAnimated: new Animated.Value(0),
          fadeInOpacity: new Animated.Value(0),
          // containerStyle: props.position === 'relative' ? this.relativeContainer : this.defaultStyle,
          containerStyle: this.defaultStyle,

        }
    }

    componentDidMount() {
      //
      // console.log('this.state.widthAnimated.__getValue(): --> ' + this.state.widthAnimated.__getValue());
      // console.log('this.state.heightAnimated.__getValue(): --> ' + this.state.heightAnimated.__getValue());
      // console.log('this.state.translateAnimated: --> (' + this.state.translateAnimated.__getValue().x + ', ' + this.state.translateAnimated.__getValue().y + ')');
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
          Animated.timing(this.state.heightAnimated, {
            toValue: 0, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
          }),
        ]),
      ]).start();                    // 执行这一整套动画序列
      
    }

    //
    dismiss = (animateConfigs) => {
        this.dismissAnimate(animateConfigs);
        this.clearPosition();
    }

    showAnimate = (animateConfigs, width, height) => {
      this.setState({
        width: width || this.state.width,
        height: height || this.state.height,
      });
      if (animateConfigs && typeof animateConfigs.animate === 'function') {
        animateConfigs.animate(width, height);
        return;
      };
      Animated.timing(this.state.bounceValueAnimated, {
        toValue: 1, // 目标值
        duration: 200, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
      Animated.timing(this.state.fadeInOpacity, {
        toValue: 0.4, // 目标值
        duration: 200, // 动画时间
        easing: Easing.linear // 缓动函数
      }).start();
      Animated.timing(this.state.heightAnimated, {
         toValue: this.state.height, // 目标值
         duration: 200, // 动画时间
         easing: Easing.linear // 缓动函数
      }).start();
    }

    //
    show = (animateConfigs, width, height) => {
        this.settingPosition();
        this.showAnimate(animateConfigs, width, height);
    }

    settingPosition = () => {
      this.setState({
        containerStyle: this.state.position === 'absolute' ? this.absoluteContainer : this.relativeContainer,
      });
    }

    clearPosition = () => {
      InteractionManager.runAfterInteractions(() => {
         // ...需要长时间同步执行的任务...
          // var clearStyle = this.props.position === 'relative' ? this.relativeContainer : this.defaultStyle;
          var clearStyle = this.defaultStyle;
          this.setState({
            containerStyle: clearStyle,
          });
      });
    }

    _onClikBackground = () => {
      if (this.props.onClikBackground) {
        this.props.onClikBackground();
      } else {
        this.dismiss();
      }
    }

    renderBaseContainer = (popupBody) => {
        console.log('containerStyle: ' + this.state.containerStyle)
        this.anim = this.anim || new Animated.Value(0);
        var baseStyle = popupBody && popupBody.baseStyle ? popupBody.baseStyle : null;
        var popupStyle = popupBody && popupBody.style ? popupBody.style : null;
        var popupChildren = popupBody && popupBody.children ? popupBody.children : this.props.children;
        return(
          <View
            pointerEvents={'auto'}
            style={[
              this.state.containerStyle,
            ]}
          >
            <View
              pointerEvents={this.state.disablePointerEvents?'none':'auto'}
              style={[styles.baseContainer, this.state.containerStyle, baseStyle]}
            >
              <TouchableOpacity 
                onPress={this._onClikBackground} 
                pointerEvents={this.state.disablePointerEvents?'none':'auto'} 
                style={[styles.overlay, {backgroundColor: 'transparent'}]} 
              >
                <Animated.View 
                  pointerEvents={this.state.disablePointerEvents?'none':'auto'}
                  style={[styles.overlay, {opacity: this.state.fadeInOpacity}]}
                />
              </TouchableOpacity>

              <Animated.View
                pointerEvents={this.state.disablePointerEvents?'none':'auto'}
                style={
                  [
                    styles.container, 
                    { 
                      // backgroundColor: 'red',
                      // top: (Dimensions.get('window').height - this.state.height) / 2,
                      // left: (Dimensions.get('window').width - this.state.width) / 2,
                      width: this.state.widthAnimated, 
                      height: this.state.heightAnimated,
                      // transform: [   // Array order matters
                      //   {scale: this.anim.interpolate({
                      //     inputRange: [0, 1],
                      //     outputRange: [1, 4],
                      //   })},
                      //   {translateX: this.anim.interpolate({
                      //     inputRange: [0, 1],
                      //     outputRange: [0, 500],
                      //   })},
                      //   {rotate: this.anim.interpolate({
                      //     inputRange: [0, 1],
                      //     outputRange: [
                      //       '0deg', '360deg' // 'deg' or 'rad'
                      //     ],
                      //   })},
                      // ]

                      transform: [  // `transform`是一个有序数组（动画按顺序执行）
                        {
                          scale: this.state.bounceValueAnimated,  // 将`bounceValue`赋值给 `scale`
                        }, 
                        {
                          // translate: [this.state.translateAnimated.__getValue().x, this.state.translateAnimated.__getValue().y]
                          translate: this.state.translateAnimated
                        },
                        {
                          rotate: this.state.rotateAnimated.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                              '0deg', '360deg' // 'deg' or 'rad'
                            ],
                          })
                        },
                      ],
                      
                    },
                    popupStyle,
                  ]
                } 
              >
                <View 
                  style={{
                    position: 'relative', 
                    flex: 1, 
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',

                  }} 
                >
                  {popupChildren}
                </View>
              </Animated.View >
            </View>
          </View>
        );
    }

    render(){
        return(
          this.renderBaseContainer()
        );
    }
}




