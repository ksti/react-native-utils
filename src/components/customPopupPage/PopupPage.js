
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
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @providesModule PopupPage
 * @flow
 */

/*
控件功能：弹出框，支持常用动画包括没有动画
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

export default class PopupPage extends BasePopupPage{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          ...this.state,
          ds: ds.cloneWithRows(['x', 'x', 'o', 'o']),
        }
    }

    componentDidMount(){
      //
      // console.log('this.state.widthAnimated.__getValue(): --> ' + this.state.widthAnimated.__getValue());
      // console.log('this.state.heightAnimated.__getValue(): --> ' + this.state.heightAnimated.__getValue());
      // console.log('this.state.translateAnimated: --> (' + this.state.translateAnimated.__getValue().x + ', ' + this.state.translateAnimated.__getValue().y + ')');
    }

    defaultDismissNone = () => {
      return {
        binding: this,
        animate: function(width, height) {
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
              Animated.timing(this.binding.state.fadeInOpacity, {
                toValue: 0, // 目标值
                duration: 0, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
              Animated.timing(this.binding.state.heightAnimated, {
                toValue: 0, // 目标值
                duration: 0, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
            ]),
          ]).start();                    // 执行这一整套动画序列
        }
      };
    }

    defaultDismissPopup = () => {
      return {
        binding: this,
        animate: function() {
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
              Animated.timing(this.binding.state.bounceValueAnimated, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
              Animated.timing(this.binding.state.fadeInOpacity, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
            ]),
          ]).start();                    // 执行这一整套动画序列
        }
      }
    }

    defaultDismissDropDown = () => {
      return {
        binding: this,
        animate: function() {
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
              Animated.timing(this.binding.state.fadeInOpacity, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
              Animated.timing(this.binding.state.heightAnimated, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
            ]),
          ]).start();                    // 执行这一整套动画序列
        }
      }
    }

    defaultDismissLTR = () => {
      return {
        binding: this,
        animate: function() {
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
              Animated.timing(this.binding.state.fadeInOpacity, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
              Animated.timing(this.binding.state.widthAnimated, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
            ]),
          ]).start();                    // 执行这一整套动画序列
        }
      }
    }

    defaultDismissOpenUp = () => {
      return {
        binding: this,
        animate: function() {
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
              Animated.timing(this.binding.state.fadeInOpacity, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
              Animated.timing(this.binding.state.heightAnimated, {
                toValue: 0, // 目标值
                duration: 200, // 动画时间
                easing: Easing.linear // 缓动函数
              }),
            ]),
          ]).start();                    // 执行这一整套动画序列
        }
      }
    }

    defaultDismiss = () => {
      switch (this.props.animateType) {
          case 'none': {
              return this.defaultDismissNone();
          }
          case 'dropdown': {
              return this.defaultDismissDropDown();
          }
          case 'bottomup': {
              return this.defaultDismissDropDown();
          }
          case 'ltr': {
              return this.defaultDismissLTR();
          }
          case 'rtl': {
              return this.defaultDismissLTR();
          }
          case 'ltrtop': {
              return this.defaultDismissLTR();
          }
          case 'ltrbottom': {
              return this.defaultDismissLTR();
          }
          case 'rtltop': {
              return this.defaultDismissLTR();
          }
          case 'rtlbottom': {
              return this.defaultDismissLTR();
          }
          case 'rowcenter': {
              return this.defaultDismissLTR();
          }
          case 'rowtop': {
              return this.defaultDismissLTR();
          }
          case 'rowbottom': {
              return this.defaultDismissLTR();
          }
          case 'openup': {
              return this.defaultDismissOpenUp();
          }
          case 'popup': {
              return this.defaultDismissPopup();
          }
          default: {
              return this.defaultDismissPopup();
          }
      }
    }

    dismissAnimate = (animateConfigs = this.defaultDismiss()) => {
      if (animateConfigs && typeof animateConfigs.animate === 'function') {
        animateConfigs.animate();
        return;
      };

      this.defaultDismiss().animate();
    }

    //
    dismiss = (animateConfigs) => {
        this.dismissAnimate(animateConfigs);
        this.clearPosition(); // 继承自BasePopupPage,用来清掉绝对/相对布局,重置默认样式
    }

    defaultShowNone = () => {
      return {
        binding: this,
        animate: function(width, height) {
          this.binding.setState({
            // width: width || this.binding.state.width, // 0 会当做 false 处理。。
            // height: height || this.binding.state.height, // 0 会当做 false 处理。。
            width: width >= 0 ? width : this.binding.state.width,
            height: height >= 0 ? height : this.binding.state.height,
            // heightAnimated: height ? new Animated.Value(height) : new Animated.Value(this.binding.state.height),
            // heightAnimated: height || this.binding.state.height,
          }, () => {
            Animated.timing(this.binding.state.fadeInOpacity, {
              toValue: 0.4, // 目标值
              duration: 0, // 动画时间
              easing: Easing.linear // 缓动函数
            }).start();
            Animated.timing(this.binding.state.heightAnimated, {
               toValue: this.binding.state.height, // 目标值
               duration: 0, // 动画时间
               easing: Easing.linear // 缓动函数
            }).start();
          });
        }
      };
    }

    defaultShowPopup = () => {
      return {
        binding: this,
        animate: function(width, height) {
          // var ratio = this.binding.state.height / this.binding.state.width;
          // this.binding.setState({
          //   width: width || this.binding.state.width,
          //   height: height || this.binding.state.height,
          //   widthAnimated: 1,
          //   heightAnimated: ratio,
          // });
          
          // Animated.timing(this.binding.state.bounceValueAnimated, {
          //   toValue: this.binding.state.width, // 目标值
          //   duration: 200, // 动画时间
          //   easing: Easing.linear // 缓动函数
          // }).start();
          // Animated.timing(this.binding.state.fadeInOpacity, {
          //   toValue: 0.4, // 目标值
          //   duration: 200, // 动画时间
          //   easing: Easing.linear // 缓动函数
          // }).start();

          var ratio = this.binding.state.height / this.binding.state.width;
          this.binding.setState({
            // width: width || this.binding.state.width, // 0 会当做 false 处理。。
            // height: height || this.binding.state.height, // 0 会当做 false 处理。。
            width: width >= 0 ? width : this.binding.state.width,
            height: height >= 0 ? height : this.binding.state.height,
            // widthAnimated: 1*100,
            // heightAnimated: ratio*100,
            widthAnimated: width ? new Animated.Value(width) : new Animated.Value(this.binding.state.width),
            heightAnimated: height ? new Animated.Value(height) : new Animated.Value(this.binding.state.height),
          }, () => {
            Animated.timing(this.binding.state.bounceValueAnimated, {
              // toValue: this.state.width/100, // 目标值
              toValue: 1, // 目标值
              duration: 200, // 动画时间
              easing: Easing.linear // 缓动函数
            }).start();
            Animated.timing(this.binding.state.fadeInOpacity, {
              toValue: 0.4, // 目标值
              duration: 200, // 动画时间
              easing: Easing.linear // 缓动函数
            }).start();
          });
        }
      };
    }

    defaultShowDropDown = () => {
      return {
        binding: this,
        animate: function(width, height) {
          this.binding.setState({
            // width: width || this.binding.state.width, // 0 会当做 false 处理。。
            // height: height || this.binding.state.height, // 0 会当做 false 处理。。
            width: width >= 0 ? width : this.binding.state.width,
            height: height >= 0 ? height : this.binding.state.height,
          }, () => {
            Animated.timing(this.binding.state.fadeInOpacity, {
              toValue: 0.4, // 目标值
              duration: 200, // 动画时间
              easing: Easing.linear // 缓动函数
            }).start();
            Animated.timing(this.binding.state.heightAnimated, {
               toValue: this.binding.state.height, // 目标值
               duration: 200, // 动画时间
               easing: Easing.linear // 缓动函数
            }).start();
          });
        }
      };
    }

    defaultShowLTR = () => { // left to right
      return {
        binding: this,
        animate: function(width, height) {
          this.binding.setState({
            // width: width || this.binding.state.width, // 0 会当做 false 处理。。
            // height: height || this.binding.state.height, // 0 会当做 false 处理。。
            width: width >= 0 ? width : this.binding.state.width,
            height: height >= 0 ? height : this.binding.state.height,
            // widthAnimated: new Animated.Value(0),
            // heightAnimated: height ? new Animated.Value(height) : new Animated.Value(this.binding.state.height),
          }, () => {
            Animated.timing(this.binding.state.fadeInOpacity, {
              toValue: 0.4, // 目标值
              duration: 200, // 动画时间
              easing: Easing.linear // 缓动函数
            }).start();
            Animated.timing(this.binding.state.widthAnimated, {
               toValue: this.binding.state.width, // 目标值
               duration: 200, // 动画时间
               easing: Easing.linear // 缓动函数
            }).start();
          }); 
        }
      };
    }

    defaultShowOpenUp = () => {
      return {
        binding: this,
        animate: function(width, height) {
          this.binding.setState({
            // width: width || this.binding.state.width, // 0 会当做 false 处理。。
            // height: height || this.binding.state.height, // 0 会当做 false 处理。。
            width: width >= 0 ? width : this.binding.state.width,
            height: height >= 0 ? height : this.binding.state.height,
          }, () => {
            Animated.timing(this.binding.state.fadeInOpacity, {
              toValue: 0.4, // 目标值
              duration: 200, // 动画时间
              easing: Easing.linear // 缓动函数
            }).start();
            Animated.timing(this.binding.state.heightAnimated, {
               toValue: this.binding.state.height, // 目标值
               duration: 200, // 动画时间
               easing: Easing.linear // 缓动函数
            }).start();
          });
        }
      };
    }

    defaultShow = () => {
      switch (this.props.animateType) {
          case 'none': {
              return this.defaultShowNone();
          }
          case 'dropdown': {
              return this.defaultShowDropDown();
          }
          case 'bottomup': {
              return this.defaultShowDropDown();
          }
          case 'ltr': {
              return this.defaultShowLTR();
          }
          case 'rtl': {
              return this.defaultShowLTR();
          }
          case 'ltrtop': {
              return this.defaultShowLTR();
          }
          case 'ltrbottom': {
              return this.defaultShowLTR();
          }
          case 'rtltop': {
              return this.defaultShowLTR();
          }
          case 'rtlbottom': {
              return this.defaultShowLTR();
          }
          case 'rowcenter': {
              return this.defaultShowLTR();
          }
          case 'rowtop': {
              return this.defaultShowLTR();
          }
          case 'rowbottom': {
              return this.defaultShowLTR();
          }
          case 'openup': {
              return this.defaultShowOpenUp();
          }
          case 'popup': {
              return this.defaultShowPopup();
          }
          default: {
              return this.defaultShowPopup();
          }
      }
    }

    showAnimate = (animateConfigs, width, height) => {      
      if (animateConfigs && typeof animateConfigs.animate === 'function') {
        animateConfigs.animate(width, height);
        return;
      };
      
      this.defaultShow().animate(width, height);
    }

    //
    show = (animateConfigs, width, height) => {
        this.settingPosition(); // 继承自BasePopupPage,用来设置绝对/相对布局
        animateConfigs = animateConfigs || this.defaultShow();
        this.showAnimate(animateConfigs, width, height);
    }

    _renderNone = () => {
      this.state.bounceValueAnimated = new Animated.Value(1);
      return this.renderBaseContainer();
    }

    _renderDropDown = () => {
      this.state.bounceValueAnimated = new Animated.Value(1);
      return this.renderBaseContainer(
        {
          style: {
            top: 0,
            // left: (Dimensions.get('window').width - this.state.widthAnimated) / 2,
            alignSelf: 'flex-start',
          }
        }
      );
    }

    _renderBottomUp = () => {
      this.state.bounceValueAnimated = new Animated.Value(1);
      return this.renderBaseContainer(
        {
          style: {
            bottom: 0,
            alignSelf: 'flex-end', // open-up from the center
            // alignSelf: 'center', // open-up from the center
            // alignSelf: 'flex-start' & 'center', // same with 'center'
          }
        }
      );
    }

    _renderLTR = (align) => {
      this.state.bounceValueAnimated = new Animated.Value(1);
      this.state.heightAnimated._value = this.state.height;
      this.state.widthAnimated._value = 0;
      return this.renderBaseContainer(
        {
          baseStyle: {
            justifyContent: 'flex-start',
          },
          style: {
            left: 0,
            alignSelf: align, // 
          }
        }
      );
    }

    _renderRTL = (align) => {
      this.state.bounceValueAnimated = new Animated.Value(1);
      this.state.heightAnimated._value = this.state.height;
      this.state.widthAnimated._value = 0;
      return this.renderBaseContainer(
        {
          baseStyle: {
            justifyContent: 'flex-end',
          },
          style: {
            right: 0,
            alignSelf: align, // 
          }
        }
      );
    }

    _renderRowCenter = (align) => {
      this.state.bounceValueAnimated = new Animated.Value(1);
      this.state.heightAnimated._value = this.state.height;
      this.state.widthAnimated._value = 0;
      return this.renderBaseContainer(
        {
          style: {
            left: 0,
            alignSelf: align, // 
          }
        }
      );
    }

    _renderOpenUp = () => {
      this.state.bounceValueAnimated = new Animated.Value(1);
      return this.renderBaseContainer(
        {
          style: {
            top: 0,
            // left: (Dimensions.get('window').width - this.state.widthAnimated) / 2,
          }
        }
      );
    }

    _renderPopup = () => {
      // this.state.bounceValueAnimated = new Animated.Value(0); // 这都能是坑
      return this.renderBaseContainer(
        {
          style: {
            // top: (Dimensions.get('window').height - this.state.heightAnimated) / 2,
            // left: (Dimensions.get('window').width - this.state.widthAnimated) / 2,
          }
        }
      );
    }

    render(){
        switch (this.props.animateType) {
            case 'none': {
                return this._renderNone();
            }
            case 'dropdown': {
                return this._renderDropDown();
            }
            case 'bottomup': {
                return this._renderBottomUp();
            }
            case 'ltr': {
                return this._renderLTR('center');
            }
            case 'rtl': {
                return this._renderRTL('center');
            }
            case 'ltrtop': {
                return this._renderLTR('flex-start');
            }
            case 'ltrbottom': {
                return this._renderLTR('flex-end');
            }
            case 'rtltop': {
                return this._renderRTL('flex-start');
            }
            case 'rtlbottom': {
                return this._renderRTL('flex-end');
            }
            case 'rowcenter': {
                return this._renderRowCenter('center');
            }
            case 'rowtop': {
                return this._renderRowCenter('flex-start');
            }
            case 'rowbottom': {
                return this._renderRowCenter('flex-end');
            }
            case 'openup': {
                return this._renderOpenUp();
            }
            case 'popup': {
                return this._renderPopup();
            }
            default: {
                return this._renderPopup();
            }
        }
    }

}

const styles = StyleSheet.create({
  //
});


