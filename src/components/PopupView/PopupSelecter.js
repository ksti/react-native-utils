
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
 * @providesModule PopupSelecter
 * @flow
 */

/*
 * 控件功能：弹出框，基于 PopupPage 的示例，弹出一个 ListView，支持常用动画包括没有动画
 * 相关界面：选择合格率
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

import PopupPage from '../customPopupPage/PopupPage'

export default class PopupSelecter extends Component{
    static propTypes = {
        /*
         * 宽度
         */
        width: React.PropTypes.number,
        /*
         * 高度
         */
        height: React.PropTypes.number,
        /*
         * 动画类型
         */
        animateType: React.PropTypes.string,
        /*
         * 绝对布局或相对布局
         */
        position: React.PropTypes.string,
        /*
         * 是否去掉头视图
         */
        noHeader: React.PropTypes.bool,
        /*
         * 自定义头视图
         */
        customHeader: React.PropTypes.element,
        /*
         * 关闭按钮
         */
        closeButton: React.PropTypes.element,
        /*
         * 自定义渲染行
         */
        renderRow: React.PropTypes.func,
        /*
         * 头视图右边文本样式
         */
        headerRightTextStyle: Text.propTypes.style,
        /*
         * 头视图右边文本
         */
        headerRightText: React.PropTypes.string,
        /*
         * 头视图左边文本样式
         */
        headerLeftTextStyle: Text.propTypes.style,
        /*
         * 头视图左边文本
         */
        headerLeftText: React.PropTypes.string,
        /*
         * 分割线样式
         */
        separateStyle: View.propTypes.style,
        /*
         * 关闭时触发的回调函数
         */
        onClose: React.PropTypes.func,
        /*
         * 关闭时触发的回调函数
         */
        onSelect: React.PropTypes.func,
    };

    static defaultProps = {
    };

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          ds: props.dataSource ? ds.cloneWithRows(props.dataSource) : ds.cloneWithRows([]),
          // width: props.width || Dimensions.get('window').width * 2 / 3, // 0 会当做 false 处理。。
          // height: props.height || 128,
          width: props.width >= 0 ? props.width : Dimensions.get('window').width * 2 / 3,
          height: props.height >= 0 ? props.height : 128,
        }
    }

    componentDidMount(){
      //
      
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.dataSource) {
        this.setState({
          ds: this.state.ds.cloneWithRows(nextProps.dataSource),
        })
      };
    }

    dismiss = (animateConfigs) => {
        this.PopupPage.dismiss(animateConfigs);
    }

    show = (animateConfigs, width, height) => {
        this.setState({
          // width: width || this.state.width, // 0 会当做 false 处理。。
          // height: height || this.state.height, // 0 会当做 false 处理。。
          width: width >= 0 ? width : this.state.width,
          height: height >= 0 ? height : this.state.height,
        }, () => {
          this.PopupPage.show(animateConfigs, this.state.width, this.state.height);
        });        
    }

    _onPressButton = () => {
      if (this.props.onClose) {
        this.props.onClose();
      };
    }

    _onSelect = (rowData, sectionID, rowID) => {
      if (this.props.onSelect) {
        this.props.onSelect(rowData, sectionID, rowID);
      };
    }

    _renderViewHeader = () => {
      if (this.props.noHeader === true) {
        return null;
      };
      if (this.props.customHeader) {
        return this.props.customHeader;
      };
      var closeButton = this.props.closeButton || (
        <Text style={[styles.text, {textAlign:'right', marginRight: 4}, this.props.headerRightTextStyle]}>
          {this.props.headerRightText}
        </Text>
      );
      return (
        <View
          style={{flexDirection: 'column'}}
        >
          <View
            style={{flexDirection: 'row'/*, justifyContent: 'flex-start'*/, alignItems: 'center', top: 0, left: 0, right: 0, height: 44/*, backgroundColor: 'orange'*/}}
          >

            <Text style={[styles.text, {textAlign:'left'/*, backgroundColor: 'purple'*/,marginLeft: 4}, this.props.headerLeftTextStyle]}>

                {this.props.headerLeftText}
            </Text>
            <TouchableOpacity
               onPress={()=>this._onPressButton()}
               style={{flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center'/*, backgroundColor: 'green'*/}}
            >
              {closeButton}
            </TouchableOpacity>
          </View>

          <View style={[{width:Dimensions.get('window').width, height:0.7, backgroundColor:'#D0D0D0'}, this.props.separateStyle]}/>
        </View>
        
      )
    }

    _renderBody = () => {
      const renderRow = this.props.renderRow || this._renderRow;
      return (
        <View 
          style={styles.container}
        >
          {this._renderViewHeader()}
          <ListView
            enableEmptySections={true}
            dataSource={this.state.ds}
            renderRow={renderRow}
          />
        </View>
      );
    }

    render(){
        var animType = this.props.animateType || 'popup';
        var position = this.props.position || 'absolute';
        return (
          <PopupPage
            ref={(PopupPage) => {this.PopupPage = PopupPage}}
            animateType={animType}
            position={position}
            width={this.props.width}
            height={this.props.height}
          >
            {this._renderBody()}
          </PopupPage>
        );
    }

    _renderRow=(rowData: Object, sectionID: number, rowID: number) =>{
      return (
        <TouchableOpacity 
          style={{flex: 1}}
          onPress={() => this._onSelect(rowData, sectionID, rowID)}
        >
            <View style={[styles.row, rowData.rowStyle]}>
              <Text style={[styles.text, {fontSize:15, color:'#3b3b3b', marginLeft:0, marginTop:13}, rowData.textStyle]}>
                {rowData.text}
              </Text>
            </View>
            <View style={[{width:Dimensions.get('window').width, height:0.7, backgroundColor:'#D0D0D0'}, this.props.separateStyle]}/>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
    marginLeft: 6,
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


