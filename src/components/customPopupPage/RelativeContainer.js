
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
 * @providesModule RelativeContainer
 * @flow
 */

/*
控件功能：弹出框相对布局容器
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

export default class RelativeContainer extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
      return (
        <View 
          {...this.props}
          pointerEvents='box-none'
          // style={{
          //   flex: 1, 
          //   position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, 
          //   zIndex: 888,
          //   overflow: 'hidden',
          // }}
          style={[
            {
              // flex: 1, 
              height: 1, 
              zIndex: 888,
              overflow: 'visible',
              backgroundColor: 'transparent',
            },
            this.props.style,
          ]}
        >
          {this.props.children}
        </View>
      );
    }

}

const styles = StyleSheet.create({
  //
});


