
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

import {Form, FormView, PopupPage, ScrollContainer} from 'react-native-utils-gjs'
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
  //   // uri: require('../../../resource/images/App/jiahao.png'),
  //   uri: 'file:../../../resource/images/App/jiahao.png',
  //   local: require('../../../resource/images/App/jiahao.png'),
  // }
];

const plusImage = {
  photo: require('../../../resource/images/App/jiahao.png'),
  selected: false,
  caption: '加号',
}

let listdata = new Array().concat(media, plusImage);

export default class PopupFormPageDetail1 extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var imgDs = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        listdata = new Array().concat(props.imageDataSource, {
          photo: require('../../../resource/images/App/jiahao.png'),
          selected: false,
          caption: '加号',
        });

        this.state = {
          ds: props.dataSource ? ds.cloneWithRows(props.dataSource) : ds.cloneWithRows([]),
          imageDataSource: imgDs.cloneWithRows(listdata),
          images: listdata,
          width: props.width || Dimensions.get('window').width ,
          height: props.height || 128,
          leftWidth: props.leftWidth || 85,
          showPhotoBrowser: false,
          configPhotoBrowser: {
            media: props.imageDataSource || media,
            initialIndex: 0,
            displayNavArrows: false,
            displayActionButton: false,
            displaySelectionButtons: false,
            startOnGrid: false,
            enableGrid: true,
          }
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
        this.PopupPage.show(animateConfigs, this.state.width, this.state.height);
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
               // onPress={()=>this._onPressButton()}
              style={[
                styles.btnBorder,
                {
                  flexDirection: 'row', alignSelf: 'center', alignItems: 'center'/*, backgroundColor: 'green'*/
                },
                {
                  width: (this.state.width - this.state.leftWidth - 3 * marginValue * 2) / 3,
                  height: 24,
                  margin: marginValue,
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
                  width: (this.state.width - this.state.leftWidth - 3 * marginValue * 2) / 3,
                  height: 24,
                  margin: marginValue,
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
                  width: (this.state.width - this.state.leftWidth - 3 * marginValue * 2) / 3,
                  height: 24,
                  margin: marginValue,
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
      return (
          <View style={[styles.viewbg,{borderBottomColor:'#dedede',borderBottomWidth:0.5,paddingTop:2,paddingBottom:2}]}>
              <Text style={styles.tvhint}>验收照片
                  <Text style={{color:'red', fontSize: 14}}>
                      {'*'}
                  </Text> 
              
              </Text>
              <ListView
                  enableEmptySections={true}
                  contentContainerStyle={styles.list}
                  dataSource={this.state.imageDataSource}
                  renderRow={this._renderImagesRow}
              />
          </View>
        
      );
    }

    _renderImagesRow = (rowData, sectionID, rowID) => {
        var showMax = this.props.max || 9;
        var imageCount = this.state.imageDataSource.getRowCount();
        var hiddenCondition = this.props.hiddenWhenMax ? (Number(rowID) > showMax - 1) : (Number(rowID) > showMax - 1 && Number(rowID) < imageCount - 1);
        // if (Number(rowID) > showMax - 1 && Number(rowID) < imageCount - 1) {
        // if (Number(rowID) > showMax - 1) { // 超过 showMax 隐藏加号
        if (hiddenCondition) {
            return null;
        }
        // overlay
        var overlay = null;
        if ((this.props.showMore || !this.props.hiddenWhenMax) && imageCount > showMax && rowID === String(showMax - 1)) {
            //
            overlay = (
                <View
                    style={{
                        position: 'absolute',
                        justifyContent :'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.4,
                        backgroundColor: 'black',
                    }}
                >
                        <Text
                            style={{
                              width: imageWidth,
                              height: imageHeight,
                              alignSelf:'center',
                              justifyContent: 'center',
                              backgroundColor:'transparent',
                              color: 'white',
                            }}
                        >
                            更多...
                        </Text>
                </View>
            );
        }

        // source
        let source;
        if (rowData.photo) {
          // create source objects for http/asset strings
          // or directly pass uri number for local files
          source = typeof rowData.photo === 'string' ? { uri: rowData.photo } : rowData.photo;
        }

        // layout
        var rowMax = 4;
        var margin = 4;
        var imageWidth = (this.state.width - this.state.leftWidth - rowMax * margin * 2 - 8 * 2) / rowMax;
        var imageHeight = imageWidth + 10;
        var itemView;
        if (rowID === String(imageCount - 1)) {
          itemView = (
            <TouchableOpacity onPress={()=>{this.addImage(rowID)}} underlayColor='transparent' 
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                }}
            >
              <Image
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    resizeMode: 'cover', 
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                  // source={require('../../../resource/images/App/jiahao.png')}
                  source={source}
              />
            </TouchableOpacity>
          )
        } else {
            itemView = (
                <TouchableHighlight
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                    }}
                    underlayColor="#ffffff"
                    onPress={ ()=>{
                        this.ImageOnClick(rowData, rowID)
                      }
                    }
                >
                    <View
                        style={{
                            justifyContent :'center',
                            alignItems: 'center',
                        }}
                    >
                            <Image
                                style={{
                                  width: imageWidth,
                                  height: imageHeight,
                                  resizeMode:'cover', 
                                  alignSelf:'center',
                                  justifyContent: 'center',
                                  backgroundColor:'transparent',
                                }}
                                source={source}
                            />
                            {overlay}
                    </View>

                </TouchableHighlight>
            )
        }

        return (
            <View 
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    // marginTop: 4,
                    margin: 4,
                }}
            >
                {itemView}
            </View>
        );
    }

    ImageOnClick = (dta, rowID)=> {
        PublicToast.showMessage(dta + "");
        // update state
        this.setState({
          showPhotoBrowser: true,
          configPhotoBrowser: {
            ...this.state.configPhotoBrowser,
            initialIndex: Number(rowID),
          },
        });
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
          imageDataSource: this.state.imageDataSource.cloneWithRows(images),
          images: images,
          configPhotoBrowser: {
            ...this.state.configPhotoBrowser,
            media: images.slice(0, images.length - 1),
          },
        })
    }

    _onSelectionChanged(media, index, selected) {
      alert(`${media.photo} selection status: ${selected}`);
    }

    _onActionButton(media, index) {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showShareActionSheetWithOptions({
          url: media.photo,
          message: media.caption,
        },
        () => {},
        () => {});
      } else {
        alert(`handle sharing on android for ${media.photo}, index: ${index}`);
      }
    }

    _renderTopRightView() {
      return (
        <View style={{marginTop: 16, marginRight: 8, alignItems: 'center'}}>
          <Image 
            style={{width: 24, height: 24}}
            source={require('../../../resource/images/App/ic_delete_photo.png')} 
          />
        </View>
        
      );
    }

    _onTopRight = (currentMedia, currentIndex, gallery, isFullScreen, mediaList) => {
      console.log('currentMedia:' + currentMedia + 'currentIndex:' + currentIndex);
      if (!isFullScreen) {
        let selectedMedia = [];
        mediaList.map((media, i)=> {
          if (media.selected) {
            selectedMedia.push(media);
          };
        });
        if (selectedMedia.length > 0) {
          // ...
          console.log('selectedMedia: ' + selectedMedia);
        };
        // is not full screen return
        return;
      };
      gallery && gallery.deleteImageRef(currentIndex);
      let initialIndex = Math.max(0, currentIndex - 1);
      let images = this.state.images;
      if (images.length > 1) {
        images.splice(currentIndex, 1); // 删掉选中的照片
        // update state
        this.setState({
          imageDataSource: this.state.imageDataSource.cloneWithRows(images),
          images: images,
          configPhotoBrowser: {
            ...this.state.configPhotoBrowser,
            initialIndex: initialIndex,
            media: images.slice(0, images.length - 1),
          },
        })
      } else {
        this.setState({
          imageDataSource: this.state.imageDataSource.cloneWithRows(images),
          images: images,
          configPhotoBrowser: {
            ...this.state.configPhotoBrowser,
            initialIndex: initialIndex,
            media: images.slice(0, images.length - 1),
          },
        })
      }
      
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
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.showPhotoBrowser}>
          <View
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <PhotoBrowser
              onBack={() => this.setState({showPhotoBrowser: false})}
              mediaList={media}
              initialIndex={initialIndex}
              displayNavArrows={displayNavArrows}
              displaySelectionButtons={displaySelectionButtons}
              displayActionButton={displayActionButton}
              startOnGrid={startOnGrid}
              enableGrid={enableGrid}
              useCircleProgress
              onSelectionChanged={this._onSelectionChanged}
              onActionButton={this._onActionButton}
              onTopRight={this._onTopRight}
              topRightView={this._renderTopRightView()}
              topRightStyle={{overflow: 'hidden'}}
              useGallery={true}
            />
          </View>
        </Modal>
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
                    leftTextStyle={{width: this.state.leftWidth, color: '#3b3b3b'}}
                    rightText={this.props.inspectionStandard}
                    rightTextStyle={{width: this.state.width - (this.state.leftWidth) - 12}}
                />
                <FormView
                  type='custom'
                  name="inspectionResult"
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
      fontSize: 14, color: '#3b3b3b', alignSelf: 'flex-start', alignItems: 'flex-start', minWidth: 85, marginLeft: 4,
  },
});


