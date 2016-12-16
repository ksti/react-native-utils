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

import ImagePickerCrop from 'react-native-image-crop-picker';

const base64 = require('base64-js');

export default ImagePickerLib_cropPicker = {

    /*
     * 照片选取
     */

    /* 单选照片 */
    showSinglePicker : (props: Object) => {
      ImagePickerCrop.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        ...props.pickerOptions,
      }).then(image => {
        // You can display the image using either data...
        /* base64 and byteArray
        const source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};
        const imageDataBase64 = 'data:image/jpeg;base64,' + image.data;
        const imageDataByteArray = base64.toByteArray(image.data);
        */
        // or a reference to the platform specific asset location
        let fileUri;
        let fileName;
        if (Platform.OS === 'ios') {
          const source = {uri: image.path.replace('file://', ''), isStatic: true};      
          fileUri = image.path.replace('file://', '');
          fileName = fileUri.split('/').pop();
        } else {
          const source = {uri: image.path, isStatic: true};
          fileUri = image.path;
          fileName = fileUri.split('/').pop();
        }
        // 回调选择的图片
        props.handleImage && props.handleImage(image, fileUri, fileName, props.identifierParams);
      }).catch(error => {
        console.log('showSinglePicker error:' + error.message);
        if (error.code === 'picker_cancel') {
          console.log('已取消操作')
        };
        // 回调出错信息
        props.handleImageError && props.handleImageError(error, props.identifierParams);
      });
    },

    /* 多选照片 */
    showMutiplePicker : (props: Object) => {
      ImagePickerCrop.openPicker({
        // multiple: true,
        includeBase64: true,
        ...props.pickerOptions,
        multiple: true,
      }).then(images => {
        let imagesData = [];
        images.forEach(function(image, index) {
            // You can display the image using either data...
            /* base64 and byteArray
            const source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};
            const imageDataBase64 = 'data:image/jpeg;base64,' + image.data;
            const imageDataByteArray = base64.toByteArray(image.data);
            */
            // or a reference to the platform specific asset location
            let fileUri;
            let fileName;
            if (Platform.OS === 'ios') {
              const source = {uri: image.path.replace('file://', ''), isStatic: true};      
              fileUri = image.path.replace('file://', '');
              fileName = fileUri.split('/').pop();
            } else {
              const source = {uri: image.path, isStatic: true};
              fileUri = image.path;
              fileName = fileUri.split('/').pop();
            }
            // 回调选择的图片
            imagesData.push({image, fileUri, fileName});
        });
        // 回调选择的图片
        props.handleImages && props.handleImages(images, imagesData, props.identifierParams);
      }).catch(error => {
        console.log('showMutiplePicker error:' + error.message);
        if (error.code === 'picker_cancel') {
          console.log('已取消操作')
        };
        // 回调出错信息
        props.handleImagesError && props.handleImagesError(error, props.identifierParams);
      });
    },

    /* 拍照 */
    selectFromCamera : (props: Object) => {
      ImagePickerCrop.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        ...props.pickerOptions,
      }).then(image => {
        // You can display the image using either data...
        /* base64 and byteArray
        const source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};
        const imageDataBase64 = 'data:image/jpeg;base64,' + image.data;
        const imageDataByteArray = base64.toByteArray(image.data);
        */
        // or a reference to the platform specific asset location
        let fileUri;
        let fileName;
        if (Platform.OS === 'ios') {
          const source = {uri: image.path.replace('file://', ''), isStatic: true};      
          fileUri = image.path.replace('file://', '');
          fileName = fileUri.split('/').pop();
        } else {
          const source = {uri: image.path, isStatic: true};
          fileUri = image.path;
          fileName = fileUri.split('/').pop();
        }
        // 回调选择的图片
        props.handleImage && props.handleImage(image, fileUri, fileName, props.identifierParams);
      }).catch(error => {
        console.log('selectFromCamera error:' + error.message);
        if (error.code === 'picker_cancel') {
          console.log('已取消操作')
        };
        // 回调出错信息
        props.handleImageError && props.handleImageError(error, props.identifierParams);
      });
    },
}

