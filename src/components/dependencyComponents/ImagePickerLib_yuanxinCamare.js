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
 */

/*
 * 拍照、从相册选择图片 
 */
import React, {PropTypes, Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    Platform,
    Dimensions,
    ScrollView,
    ListView,
    InteractionManager,
    NetInfo,
    TouchableOpacity,
} from "react-native";

//引入yuanxincamera
import { ImageManager, ReadImageManager } from 'react-native-yuanxincamera';

const base64 = require('base64-js');

export default ImagePickerLib_yuanxinCamera= {

    /* 转换图片对象 */
    _transformImageResult : (imageResult) => {
        // You can display the image using either data...
        /* base64 and byteArray
        const source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};
        const imageDataBase64 = 'data:image/jpeg;base64,' + image.data;
        const imageDataByteArray = base64.toByteArray(image.data);
        */
        // or a reference to the platform specific asset location
        let fileUri;
        let fileName;
        let source;
        if (Platform.OS === 'ios') {
          source = {uri: imageResult.filePath.replace('file://', ''), isStatic: true};      
          fileUri = imageResult.filePath.replace('file://', '');
          fileName = fileUri.split('/').pop();
        } else {
          source = {uri: imageResult.filePath, isStatic: true};
          fileUri = 'file://' + imageResult.filePath;
          fileName = fileUri.split('/').pop();
        }

        return {
          image: {
            path: imageResult.filePath,
            data: imageResult.imageData, 
          },
          fileUri,
          fileName,
        }
    },

    /* 自身迭代处理每张图片 */
    _handleImageResult : (operateIndex, originalArray, images, imagesData, callback) => {
      if (operateIndex < originalArray.length) {
        let imageInfo = originalArray[operateIndex];
        //4.获取单张图片Base 64
        ReadImageManager.readImage({
            filePath: imageInfo.filePath,// 手机本地存储路径 必填        
            scale: 1,//图片压缩比例，不改变大小的怀况下,最大值为1,最小值是0
            width: 0,//默认是0 不做大小缩放处理 与height 相关 
            height: 0,//默认是0 不做大小缩放处理 与width 相关
            objectKey: '', //唯一id 。
        }).then(result => {
            console.log('readImage result:' + result);
            let imageResultData = this.ImagePickerLib_yuanxinCamera._transformImageResult(result);
            if (images) {
              images.push(imageResultData.image);
            };
            if (imagesData) {
              imagesData.push(imageResultData);
            };
            // 操作位+1
            operateIndex++;
            this.ImagePickerLib_yuanxinCamera._handleImageResult(operateIndex, originalArray, images, imagesData, callback);
        }).catch(ex => {
            console.log(ex);
            // 操作位+1
            operateIndex++;
            this.ImagePickerLib_yuanxinCamera._handleImageResult(operateIndex, originalArray, images, imagesData, callback);
        });
      } else {
        if (callback) {
          callback(images, imagesData);
        };
      }      
    },

    /* 处理返回的所有图片 */
    _handleImageResults : (imageResult, type, callback) => {
      let imagesInfo;
      switch (type) {
          case 'showImagePicker': // 'showImagePicker'
              let imageArray = JSON.parse(imageResult.data);
              imagesInfo = [];
              imageArray.forEach(function(imagePath, index) {
                  imagesInfo.push({
                    filePath: imagePath,
                    type: 0,
                  });
              });
              //
              this.ImagePickerLib_yuanxinCamera._handleImageResult(0, imagesInfo, new Array(), new Array(), callback);
              break;
          case 'launchImageLibrary': // 'launchImageLibrary'
              imagesInfo = new Array().concat(imageResult);
              //
              this.ImagePickerLib_yuanxinCamera._handleImageResult(0, imagesInfo, new Array(), new Array(), callback);
              break;
          case 'launchCamera': // 'launchCamera'
              imagesInfo = [];
              imagesInfo.push({
                  filePath: imageResult.FilePathPic,
                  type: imageResult.type,
              });
              //
              this.ImagePickerLib_yuanxinCamera._handleImageResult(0, imagesInfo, new Array(), new Array(), callback);
              break;

          default:
              break;
      };      
    },

    /*
     * 照片选取
     */

    /* 单选照片 */
    showSinglePicker : (props: Object) => {
      /*
      //1.选照片 
      //=> 返回结果 type 0->z照片 1->视频 ( {filePath = “”;type = 0;},….. )
      ImageManager.showImagePicker({
          maxCount: 1,  //最多能选几张 默认是9
          photoAlbumName: '',//照相保存相册名字  不给是项目名称
          videoAlumName: '',//小视频保存相册名字 不给是项目名称
          isShowCamera: false,//false->不显示内部照相 true->显示内部照相 默认是显示
          columnNumber: 4,//选择照片时显示几数列  默认是4
      }).then(result => {
          console.log(result);
          this.ImagePickerLib_yuanxinCamera._handleImageResults(result, 'showImagePicker', (images, imagesData) => {
            let image = images[0];
            let imageData = imagesData[0];
            // 回调选择的图片
            props.handleImage && props.handleImage(image, imageData.fileUri, imageData.fileName, props.identifierParams);
          });
      }).catch(er => {
          console.log('showSinglePicker error:' + er);
          // 回调出错信息
          props.handleImageError && props.handleImageError(er, props.identifierParams);
      });
      */

      //2.选视频 或选照片
      // => 返回结果 type 0->照片 1->视频 ( {filePath = “”;type = 0;},….. )
      ImageManager.launchImageLibrary({
          IsChoose: 0, // 0 图片 1视频  默认是选照片
          videoAlumName: '',//小视频保存相册名字 不给是项目名称
          photoAlbumName: '',//照相保存相册名字  不给是项目名称
          isShowCamera: false,//false ->不显示内部照相 true->显示内部照相
          columnNumber: 4,//选择照片时显示几数列 默认是4
          maxCount: 1,//最多选择个数 默认是3个
          maxSecond: 6,//内部录制小视频最长秒数  默认是6秒
      }).then(result => {
          console.log(result);
          this.ImagePickerLib_yuanxinCamera._handleImageResults(result, 'launchImageLibrary', (images, imagesData) => {
            let image = images[0];
            let imageData = imagesData[0];
            // 回调选择的图片
            props.handleImage && props.handleImage(image, imageData.fileUri, imageData.fileName, props.identifierParams);
          });
      }).catch(er => {
          console.log('showSinglePicker error:' + er);
          // 回调出错信息
          props.handleImageError && props.handleImageError(er, props.identifierParams);
      });
    },

    /* 多选照片 */
    showMutiplePicker : (props: Object) => {
      let maxCount = 9;
      if (props.pickerOptions && props.pickerOptions.maxFiles) {
        maxCount = props.pickerOptions.maxFiles;
      };
      /*
      //1.选照片 
      //=> 返回结果 type 0->z照片 1->视频 ( {filePath = “”;type = 0;},….. )
      ImageManager.showImagePicker({
          maxCount: maxCount,  //最多能选几张 默认是9
          photoAlbumName: '',//照相保存相册名字  不给是项目名称
          videoAlumName: '',//小视频保存相册名字 不给是项目名称
          isShowCamera: false,//false->不显示内部照相 true->显示内部照相 默认是显示
          columnNumber: 4,//选择照片时显示几数列  默认是4
      }).then(result => {
          console.log(result);
          this.ImagePickerLib_yuanxinCamera._handleImageResults(result, 'showImagePicker', (images, imagesData) => {
            let image = images[0];
            let imageData = imagesData[0];
            // 回调选择的图片
            props.handleImages && props.handleImages(images, imagesData, props.identifierParams);
          });
      }).catch(er => {
          console.log('showMutiplePicker error:' + er);
          // 回调出错信息
          props.handleImageError && props.handleImageError(er, props.identifierParams);
      });
      */

      //2.选视频 或选照片
      // => 返回结果 type 0->照片 1->视频 ( {filePath = “”;type = 0;},….. )
      ImageManager.launchImageLibrary({
          IsChoose: 0, // 0 图片 1视频  默认是选照片
          videoAlumName: '',//小视频保存相册名字 不给是项目名称
          photoAlbumName: '',//照相保存相册名字  不给是项目名称
          isShowCamera: false,//false ->不显示内部照相 true->显示内部照相
          columnNumber: 4,//选择照片时显示几数列 默认是4
          maxCount: maxCount,//最多选择个数 默认是3个
          maxSecond: 6,//内部录制小视频最长秒数  默认是6秒
      }).then(result => {
          console.log(result);
          props.handlingMultipleImages && props.handlingMultipleImages();
          this.ImagePickerLib_yuanxinCamera._handleImageResults(result, 'launchImageLibrary', (images, imagesData) => {
            let image = images[0];
            let imageData = imagesData[0];
            // 回调选择的图片
            props.handleImages && props.handleImages(images, imagesData, props.identifierParams);
          });
      }).catch(er => {
          console.log('showMutiplePicker error:' + er);
          // 回调出错信息
          props.handleImagesError && props.handleImagesError(er, props.identifierParams);
      });
    },

    /* 拍照 */
    selectFromCamera : (props: Object) => {
      //3.拍照 和录视频
      // => 返回结果 type 0->z照片 1->视频 {filePath = “”;type = 0;}
      ImageManager.launchCamera({
          IsCamera: 0,// 0 拍照 1录制视频
          videoAlumName: '',//小视频保存相册名字 不给是项目名称
          photoAlbumName: '',//照相保存相册名字  不给是项目名称
          maxSecond: 6,//录制小视频最长秒数
      }).then(result => {
          console.log(result);
          this.ImagePickerLib_yuanxinCamera._handleImageResults(result, 'launchCamera', (images, imagesData) => {
            let image = images[0];
            let imageData = imagesData[0];
            // 回调选择的图片
            props.handleImage && props.handleImage(image, imageData.fileUri, imageData.fileName, props.identifierParams);
          });
      }).catch(er => {
          console.log('selectFromCamera error:' + er);
          // 回调出错信息
          props.handleImageError && props.handleImageError(er, props.identifierParams);
      });
    },
}

