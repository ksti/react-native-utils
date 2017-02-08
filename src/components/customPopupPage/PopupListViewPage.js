
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
 * @providesModule PopupListViewPage
 * @flow
 */

/*
控件功能：弹出框，基于 PopupPage 的示例，弹出一个 ListView，支持常用动画包括没有动画
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
import PopupPage from './PopupPage'

var animConfigs = {
  isRTL: true,
}

export default class PopupListViewPage extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          ...this.state,
          ds: ds.cloneWithRows(['xxxxxxyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', 'x', 'o', 'o']),
        }
    }

    componentDidMount(){
      //
      
    }

    show = (animateConfigs, width, height) => {
        this.PopupPage.show(animateConfigs, width, height);
    }

    render(){
        var animType = this.props.animateType || 'popup';
        var position = this.props.position || 'absolute';
        return (
          <PopupPage
            ref={(PopupPage) => {this.PopupPage = PopupPage}}
            animateType={animType}
            position={position}
            height={this.props.height}
          >
            <ListView
              enableEmptySections={true}
              dataSource={this.state.ds}
              renderRow={this._renderRow}
            />
          </PopupPage>
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


