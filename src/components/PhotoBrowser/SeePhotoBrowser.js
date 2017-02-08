
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
 * @providesModule SeePhotoBrowser
 * @flow
 */

import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    Dimensions,
    InteractionManager,
    ScrollView,
    Modal,
    ActionSheetIOS
} from "react-native";
import PhotoBrowser from "react-native-photo-browser";
// import {Actions} from "react-native-router-flux";

import Loading from "../LoadingView/LoadingDialog";
import LoadingView from "../LoadingView/LoadingView";
import MyDialog from "../Dialog/MyDialog";

/**
 * 查看照片 资源地址 https://github.com/ksti/react-native-photo-browser
 */
export default  class SeePhotoBrowser extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            renderPlaceholderOnly: true,
            alldata: props.alldata || [],//图片地址数组
            deletedData: [],
            initialIndex: props.initialIndex || 0,//当前点击的位置   如果只有1张照片   不传或者传0
            editable: props.editable,
            showPhotoBrowser: false,
            // PhotoBrowser configs
            configPhotoBrowser: {
                media: props.alldata || media,
                initialIndex: props.initialIndex || 0,
                displayNavArrows: false,
                displayActionButton: false,
                displaySelectionButtons: false,
                startOnGrid: false,
                enableGrid: props.enableGrid || false,
                forceLoadPhoto: false,
            }
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    show = (initialIndex, alldata, mergeState) => {
      // update state
      this.setState({
        ...mergeState,
        alldata: alldata || this.state.alldata,
        initialIndex: initialIndex || this.state.initialIndex,
        showPhotoBrowser: true,
        configPhotoBrowser: {
          ...this.state.configPhotoBrowser,
          initialIndex: initialIndex,
          media: alldata || this.state.alldata,
        },
      });
    }

    dismiss = () => {
      // update state
      this.setState({
        showPhotoBrowser: false,
      });
    }

    _onBack = () => {
      if (this.props.onBack) {
        this.props.onBack(this.state.alldata, this.state.deletedData);
      };
      if (this.props.modal === true) {
        this.dismiss();
      } else {
        // Actions.pop();
      }
    }

    _onSelectionChanged(media, index, selected) {
      console.log(`${media.photo} selection status: ${selected}`);
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
      if (this.state.editable === false) {
        return null;
      };
      return (
        <View style={{marginTop: 16, marginRight: 8, alignItems: 'center'}}>
          <Image 
            style={{width: 24, height: 24}}
            source={require('../../resource/images/ic_delete_photo.png')}
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
          if (this.props.onTopRight) {
            this.props.onTopRight(selectedMedia, isFullScreen);
          };
        };
        // is not full screen return
        return;
      };

      if (this.props.onTopRight) {
        this.props.onTopRight(currentMedia, isFullScreen);
      };
      gallery && gallery.deleteImageRef(currentIndex);
      let initialIndex = Math.max(0, currentIndex - 1);
      let images = this.state.alldata;
      let deletedImages = this.state.deletedData;
      if (images.length > 0) {
        let deletedImage = images.splice(currentIndex, 1); // 删掉选中的照片
        deletedImages.push(deletedImage[0]); // push deletedImage
        
        // update state
        this.setState({
          alldata: images,
          deletedData: deletedImages,
          configPhotoBrowser: {
            ...this.state.configPhotoBrowser,
            initialIndex: initialIndex,
            media: images,
            forceLoadPhoto: true,
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
        forceLoadPhoto,
      } = this.state.configPhotoBrowser;

      return (
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.showPhotoBrowser}>
          <View
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <PhotoBrowser
              onBack={() => this._onBack()}
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
              forceLoadPhoto={forceLoadPhoto}
              notSupportedError={'移动端不支持查阅此文件，请到PC端查阅'}
            />
          </View>
        </Modal>
      );
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <LoadingView text="正在加载..."/>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        if (this.props.modal === true) {
          return (
              <View style={{flex:1,backgroundColor:'white'}}>
                  {this._renderModalPhotoBrowser()}
                  <MyDialog isOverlayClickClose={true} ref={ (MyDialog) => { this.MyDialog = MyDialog } }/>
              </View>
          ); 
        } else {
          return (
              <View style={{flex:1,backgroundColor:'white'}}>
                  {this.renderImage()}
                  <MyDialog isOverlayClickClose={true} ref={ (MyDialog) => { this.MyDialog = MyDialog } }/>
              </View>
          ); 
        }        
    }

    renderImage = ()=> {
        const {
            media,
            initialIndex,
            displayNavArrows,
            displayActionButton,
            displaySelectionButtons,
            startOnGrid,
            enableGrid,
            forceLoadPhoto,
        } = this.state.configPhotoBrowser;

        return (
            <View style={{flex: 1}}>
                <PhotoBrowser
                    onBack={() => this._onBack()}
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
                    forceLoadPhoto={forceLoadPhoto}
                    notSupportedError={'移动端不支持查阅此文件，请到PC端查阅'}
                />
            </View>
        )

    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

