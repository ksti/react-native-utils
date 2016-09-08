
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
 * @providesModule PopupFormPageDetail1
 * @flow
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
    StyleSheet,
    Animated,
    Dimensions,
    ListView,
    Text,
    Easing,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native'

import {
  Platform
} from 'react-native'

import Form from 'react-native-form'

import PopupPage from '../customPopupPage/PopupPage'
import ScrollContainer from '../../containers/ScrollContainer'
import FormView from '../FormView'
var Lightbox = require('react-native-lightbox');
import GlobalSize from "../../common/GlobalSize";
import PublicToast from "../../components/PublicToast";
export default class PopupFormPageDetail1 extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          ds: props.dataSource ? ds.cloneWithRows(props.dataSource) : ds.cloneWithRows([]),
          width: props.width || Dimensions.get('window').width ,
          height: props.height || 128,
          leftWidth: props.leftWidth || 85,
        }
    }

    componentDidMount(){
      //
      
    }

    dismiss = (animateConfigs) => {
        this.PopupPage.dismiss(animateConfigs);
    }

    show = (animateConfigs, width, height) => {
        this.setState({
          width: width || this.state.width,
          height: height || this.state.height,
        });
        this.PopupPage.show(animateConfigs, width, height);
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
            <Text style={[styles.text, {textAlign:'left'/*, backgroundColor: 'purple'*/, marginLeft: 4}]}>
                {this.props.headerLeftText}
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
               // onPress={()=>this._onPressButton()}
              style={[
                styles.btnBorder,
                {
                  flexDirection: 'row', alignSelf: 'center', alignItems: 'center'/*, backgroundColor: 'green'*/
                },
                {
                  width: (this.state.width - this.state.leftWidth - 54) / 3,
                  height: 24,
                }
              ]}
            >
              <Text style={[styles.text, {color: 'orange'}]}>
                {'合格'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
               // onPress={()=>this._onPressButton()}
              style={[
                styles.btnBorder,
                {
                  flexDirection: 'row', alignSelf: 'center', alignItems: 'center'/*, backgroundColor: 'green'*/
                },
                {
                  width: (this.state.width - this.state.leftWidth - 54) / 3,
                  height: 24,
                }
              ]}
            >
              <Text style={[styles.text, {color: 'orange'}]}>
                {'不合格'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
               // onPress={()=>this._onPressButton()}
              style={[
                styles.btnBorder,
                {
                  flexDirection: 'row', alignSelf: 'center', alignItems: 'center'/*, backgroundColor: 'green'*/
                },
                {
                  width: (this.state.width - this.state.leftWidth - 54) / 3,
                  height: 24,
                }
              ]}
            >
              <Text style={[styles.text, {color: 'orange'}]}>
                {'不涉及'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      );
    }

    _renderCustomView2 = () => {
       let   imagedata = ["1","2"];
      return (
          <View style={[styles.viewbg,{borderBottomColor:'#dedede',borderBottomWidth:0.5,paddingTop:2,paddingBottom:2}]}>
              <Text style={styles.tvhint}>验收照片
                  <Text style={{color:'red', fontSize: 14}}>
                      {'*'}
                  </Text> 
              
              </Text>
              <ScrollView
                  style={[{overflow: 'hidden'}]}
                  contentContainerStyle={[{
                         justifyContent: 'center',
                         backgroundColor: '#ffffff',
                         alignItems: 'center',
                        }]}
                  horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={{flexDirection: 'row', overflow: 'hidden'}}>
                      {this.rederImageView([],0)}
                  </View>
              </ScrollView>
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
                    style={{marginTop: 10}}
                    leftText='验收标准'
                    leftTextStyle={{width: this.state.leftWidth}}
                    rightText={this.props.inspectionStandard}
                    rightTextStyle={{width: this.state.width - (this.state.leftWidth) - 12}}
                />
                <FormView
                  type='custom'
                  name="inspectionResult"
                >
                  <View
                      style={{flex: 1, backgroundColor: 'green', flexDirection: 'column', alignItems: 'center', marginTop: 4}}
                  >
                      {this._renderCustomView1()}
                  </View>
                </FormView>
                <FormView
                  type='custom'
                  name="inspectionPhoto"
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
                  inputProps={{
                      placeholder:"请说明不合格原因",
                      multiline:false,
                      keyboardType:'default',
                      accessibilityLabel:"I am the accessibility label for text input",
                      autoCapitalize:"none"
                  }}
                  leftText='不合格说明'
                  redText='*'
                  leftTextStyle={{width: this.state.leftWidth}}
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
          </PopupPage>
        );
    }


    rederImageView = (imageList,rowID)=> {
        var lineArr = [];
        for (var i = 0; i < imageList.length + 1; i++) {
            let dta = imageList[i];
            if (imageList.length == 0 || i == imageList.length) {
                lineArr.push(<TouchableOpacity onPress={()=>{this.addImage(rowID)}} underlayColor='transparent' key={i}
                                               style={{width:80,height:80,margin:5,alignSelf:'center',justifyContent: 'center',backgroundColor:'transparent',}}>
                    <Image
                        style={{width:80,height:80,margin:5, resizeMode:'contain' , alignSelf:'center',justifyContent: 'center',backgroundColor:'transparent',}}
                        source={require('../../../resource/images/App/jiahao.png')}//source={require('../../../resource/images/App/Setting.png')}//
                    />

                </TouchableOpacity>);
            } else {
                lineArr.push(<TouchableOpacity onPress={()=>{this.ImageOnclick(dta)}} underlayColor='transparent'
                                               key={i}
                                               style={{width:80,height:80,margin:5,alignSelf:'center',justifyContent: 'center',backgroundColor:'transparent',}}>
                    <Lightbox underlayColor="#ffffff" navigator={this.props.navigator}>
                        <Image

                            style={{width:GlobalSize.DeviceWidth,height:GlobalSize.DeviceHeight, resizeMode:'contain' , alignSelf:'center',justifyContent: 'center',backgroundColor:'transparent',}}
                            source={{ uri: 'http://p1.qhimg.com/t01080c5ee1710adea2.png' }}//source={require('../../../resource/images/App/Setting.png')}//
                        />
                    </Lightbox>

                </TouchableOpacity>);
            }
        }
        return (
            lineArr
        );
    }

    ImageOnclick = (dta)=> {
        PublicToast.showMessage(dta + "");
    }
    addImage = (rowID)=> {
        PublicToast.showMessage(rowID+"添加照片");
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
    // fontSize: 15,
    color: '#3b3b3b',
  },
  row: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  btnBorder: {
      borderWidth: 1,
      borderColor: 'orange',
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
        fontSize: 14, color: '#666666', justifyContent: 'center', alignItems: 'flex-start', minWidth: 85
    },
});


