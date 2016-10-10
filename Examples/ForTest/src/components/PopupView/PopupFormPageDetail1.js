
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
 * 
 */

/*
控件功能：验收详情页弹出框，基于 PopupPage 的示例，弹出一个 表单页，支持常用动画包括没有动画
相关界面：验收详情页
*/

'use strict';

import React,{
    Component
} from 'react'
import {
    View,
    Modal,
    StyleSheet,
    Animated,
    Dimensions,
    ListView,
    Text,
    Easing,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView,
} from 'react-native'

import {
  Platform
} from 'react-native'

import {
  Form, 
  FormView, 
  PopupPage, 
  ScrollContainer, 
  SeePhotoBrowser, 
  FlowLayoutImageView,
} from 'react-native-utils-gjs'

import PhotoBrowser from 'react-native-photo-browser';
import GlobalSize from "../../common/GlobalSize";
import PublicToast from "../PublicToast";

var media = [
  {
    photo: 'http://p1.qhimg.com/t01080c5ee1710adea2.png',
    selected: false,
    caption: '图片1',
  },
  {
    photo: 'http://p1.qhimg.com/t01080c5ee1710adea2.png',
    selected: false,
    caption: '图片2',
  },
  {
    photo: 'http://p1.qhimg.com/t01080c5ee1710adea2.png',
    selected: false,
    caption: '图片3',
  },
  {
    photo: 'http://p1.qhimg.com/t01080c5ee1710adea2.png',
    selected: false,
    caption: '图片4',
  },
  {
    photo: 'http://p1.qhimg.com/t01080c5ee1710adea2.png',
    selected: false,
    caption: '图片5',
  },
  // {
  //   name: '加号',
  //   // uri: require('../../../../images/App/jiahao.png'),
  //   uri: 'file:../../../../images/App/jiahao.png',
  //   local: require('../../../../images/App/jiahao.png'),
  // }
];

export default class PopupFormPageDetail1 extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var imgDs = new ListView.DataSource({rowHasChanged: (r1, r2) => true});

        this.state = {
          ds: props.dataSource ? ds.cloneWithRows(props.dataSource) : ds.cloneWithRows([]),
          images: props.imageSource,
          infoData: props.infoData || {
            headerLeftText: props.headerLeftText, // 头部左边标题
            headerRightText: props.headerRightText, // 头部右边按钮标题
            inspectionStandard: props.inspectionStandard, // 验收标准
            statusGDQ: props.statusGDQ || '1', // 合格不合格不涉及 状态 1(合格)2(不合格)3(不涉及)
          },
          width: props.width || Dimensions.get('window').width ,
          height: props.height || 128,
          leftWidth: props.leftWidth || 85,
          configPhotoBrowser: {
            media: props.imageSource || media,
            initialIndex: 0,
            displayNavArrows: false,
            displayActionButton: false,
            displaySelectionButtons: false,
            startOnGrid: false,
            enableGrid: true,
          },
        }
    }

    componentDidMount(){
      //
      
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.images) {
        this.setState({
          images: nextProps.imageSource,
          infoData: nextProps.infoData || this.state.infoData,
        })
      };
    }

    setInfoData = (infoData) => {
      this.setState({
        infoData: infoData || this.state.infoData,
      })
    }

    dismiss = (animateConfigs) => {
        this.PopupPage.dismiss(animateConfigs);
    }

    show = (animateConfigs, width, height) => {
        this.setState({
          width: width || this.state.width,
          height: height || this.state.height,
        });
        this.PopupPage.show(animateConfigs, this.state.width, this.state.height);
    }

    _onPressGDQ = (status) => {
      let infoData = this.state.infoData;
      if (infoData) {
        infoData.statusGDQ = status || infoData.statusGDQ;
        this.setState({
          infoData: infoData,
        });
      };
    }

    _onPressButton = () => {
      if (this.props.onClose) {
        this.props.onClose();
      };
    }

    onClikBackground = () => {
      if (this.props.onClikBackground) {
        this.props.onClikBackground();
      };
    }

    _renderViewHeader = () => {
      var closeButton = this.props.closeButton || (
        <Text style={[styles.text, {textAlign:'right', marginRight: 4}]}>
          {this.state.infoData.headerRightText}
        </Text>
      );
      return (
        <View
          style={{flexDirection: 'column'}}
        >
          <View
            style={{flexDirection: 'row'/*, justifyContent: 'flex-start'*/, alignItems: 'center', top: 0, left: 0, right: 0, height: 44/*, backgroundColor: 'orange'*/}}
          >
            <Text style={[styles.text, {textAlign:'left'/*, backgroundColor: 'purple'*/, marginLeft: 4}]}>
                {this.state.infoData.headerLeftText}
            </Text>
            <TouchableOpacity
               onPress={()=>this._onPressButton()}
               style={{flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center'/*, backgroundColor: 'green'*/}}
            >
              {closeButton}
            </TouchableOpacity>
          </View>

          <View style={{width:Dimensions.get('window').width, height:0.7, backgroundColor:'#D0D0D0'}}/>
        </View>
        
      );
    }

    _renderCustomView1 = () => {
      var marginValue = 8;
      return (
        <View
          style={{flexDirection: 'row'/*, justifyContent: 'flex-start'*/, alignItems: 'center', top: 0, left: 0, right: 0, height: 44/*, backgroundColor: 'orange'*/}}
        >
          <Text style={[styles.text, {textAlign:'left'/*, backgroundColor: 'purple'*/, marginLeft: 4, width: this.state.leftWidth}]}>
              {'验收结果'}
              <Text style={{color:'red'}}>
                  {'*'}
              </Text>
          </Text>

          <View
             style={{
              flexDirection: 'row', 
              alignSelf: 'stretch', 
              alignItems: 'center'/*, backgroundColor: 'green'*/, 
              width: this.state.width - this.state.leftWidth,
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity
              onPress={()=>this._onPressGDQ('1')}
              style={[
                styles.btnBorder,
                {
                  flexDirection: 'row', alignSelf: 'center', alignItems: 'center'/*, backgroundColor: 'green'*/
                },
                {
                  width: (this.state.width - this.state.leftWidth - 3 * marginValue * 2) / 3,
                  height: 24,
                  margin: marginValue,
                  backgroundColor: this.state.infoData.statusGDQ === '1' ? '#ff5001' : 'white',
                }
              ]}
            >
              <Text style={[styles.text, {color: this.state.infoData.statusGDQ === '1' ? 'white' : '#ff5001'}]}>
                {'合格'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this._onPressGDQ('2')}
              style={[
                styles.btnBorder,
                {
                  flexDirection: 'row', alignSelf: 'center', alignItems: 'center'/*, backgroundColor: 'green'*/
                },
                {
                  width: (this.state.width - this.state.leftWidth - 3 * marginValue * 2) / 3,
                  height: 24,
                  margin: marginValue,
                  backgroundColor: this.state.infoData.statusGDQ === '2' ? '#ff5001' : 'white',
                }
              ]}
            >
              <Text style={[styles.text, {color: this.state.infoData.statusGDQ === '2' ? 'white' : '#ff5001'}]}>
                {'不合格'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this._onPressGDQ('3')}
              style={[
                styles.btnBorder,
                {
                  flexDirection: 'row', alignSelf: 'center', alignItems: 'center'/*, backgroundColor: 'green'*/
                },
                {
                  width: (this.state.width - this.state.leftWidth - 3 * marginValue * 2) / 3,
                  height: 24,
                  margin: marginValue,
                  backgroundColor: this.state.infoData.statusGDQ === '3' ? '#ff5001' : 'white',
                }
              ]}
            >
              <Text style={[styles.text, {color: this.state.infoData.statusGDQ === '3' ? 'white' : '#ff5001'}]}>
                {'不涉及'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      );
    }

    _renderCustomView2 = () => {
      return (
          <View style={[styles.viewbg,{borderBottomColor:'#dedede',borderBottomWidth:0.5,paddingTop:2,paddingBottom:2}]}>
              <Text style={styles.tvhint}>验收照片
                  <Text style={{color:'red', fontSize: 14}}>
                      {'*'}
                  </Text> 
              
              </Text>
              <FlowLayoutImageView 
                width={this.state.width - this.state.leftWidth}
                // style={{flex: 1}}
                imageSource={this.state.images}
                imageOnClick={this.ImageOnClick}
                addImage={this.addImage}
              />
          </View>
        
      );
    }

    ImageOnClick = (dta, rowID)=> {
        PublicToast.showMessage(dta + "");
        let options = {editable: true};
        this.seePhotoBrowser.show(Number(rowID), this.state.images, options);      
    }
    addImage = (rowID)=> {
        PublicToast.showMessage(rowID+"添加照片");
        let images = this.state.images;
        images.splice(rowID, 0, {
          photo: 'http://p1.qhimg.com/t01080c5ee1710adea2.png',
          selected: false,
          caption: '新加图片'+rowID,
        });
        // update state
        this.setState({
          images: images,
        })
    }

    _onBack = (newDatas) => {
      console.log('newDatas: ' + newDatas);
      let images = newDatas;
      // update state
      this.setState({
        images: images,
      })
    }

    _renderModalPhotoBrowser = () => {
      const {
        media,
        initialIndex,
        displayNavArrows,
        displayActionButton,
        displaySelectionButtons,
        startOnGrid,
        enableGrid,
      } = this.state.configPhotoBrowser;

      return (
        <View>
          <SeePhotoBrowser
            ref={(ref) => {this.seePhotoBrowser = ref}}
            modal={true}
            editable={true}
            alldata={media}
            initialIndex={initialIndex}
            onBack={(newDatas) => this._onBack(newDatas)}
          />
        </View>
      );
    }

    _renderBody = () => {
      return (
        <View 
          style={styles.container}
        >
          {this._renderViewHeader()}
          <ScrollContainer style={{flex: 1, backgroundColor: 'white'}}>
            <Form ref='formContainer' style={{marginTop:0}}>
                <FormView
                    type='text'
                    name="inspectionStandard"
                    setStateSelf={true}
                    style={{marginTop: 10}}
                    leftText='验收标准'
                    leftTextStyle={{width: this.state.leftWidth, color: '#3b3b3b'}}
                    rightText={this.state.infoData.inspectionStandard}
                    rightTextStyle={{width: this.state.width - (this.state.leftWidth) - 12}}
                />
                <FormView
                    type='custom'
                    name="inspectionResult"
                    setStateSelf={true}
                >
                  <View
                      style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'column', alignItems: 'center', marginTop: 4}}
                  >
                      {this._renderCustomView1()}
                  </View>
                </FormView>
                <FormView
                    type='custom'
                    name="inspectionPhoto"
                    setStateSelf={true}
                >
                  <View
                      style={{flex: 1, backgroundColor: '#ffffff', flexDirection: 'column', alignItems: 'center', marginTop: 4}}
                  >
                      {this._renderCustomView2()}
                  </View>
                </FormView>
                <FormView
                    type='input'
                    name="explanation"
                    setStateSelf={true}
                    inputProps={{
                        placeholder:"请说明不合格原因",
                        multiline:false,
                        keyboardType:'default',
                        accessibilityLabel:"I am the accessibility label for text input",
                        autoCapitalize:"none"
                    }}
                    leftText='不合格说明'
                    redText='*'
                    leftTextStyle={{width: this.state.leftWidth, color: '#3b3b3b'}}
                    inputStyle={{width: this.state.width - (this.state.leftWidth) - 12}}
              />
            </Form>
        </ScrollContainer>
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
            height={this.props.height}
            onClikBackground={this.onClikBackground}
          >
            {this._renderBody()}
            {this._renderModalPhotoBrowser()}
          </PopupPage>
          
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
    flex: 1,
    // fontSize: 15,
    color: '#3b3b3b',
  },
  list: {
    // justifyContent: 'space-around',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  btnBorder: {
      borderWidth: 1,
      borderColor: '#ff5001',
      borderRadius: 5,
  },
  viewbg: {
      minHeight: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 10,
      borderTopColor: '#dedede',
      borderTopWidth: 0.5,
      overflow: 'hidden'
  },
  tvhint: {
      fontSize: 14, color: '#3b3b3b', alignSelf: 'flex-start', alignItems: 'flex-start', minWidth: 85, marginLeft: 4,
  },
});


