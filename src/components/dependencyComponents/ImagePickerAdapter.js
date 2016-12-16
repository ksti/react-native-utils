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

import ImagePickerLib_cropPicker from './ImagePickerLib_cropPicker';
import ImagePickerLib_yuanxinCamare from './ImagePickerLib_yuanxinCamare';

const base64 = require('base64-js');

export default ImagePickerSheet = {
    /*
     * 照片选取
     */

    /* 单选照片 */
    showSinglePicker : (pickerComponent: String, props: Object) => {
      switch (pickerComponent) {
          case 'react-native-image-crop-picker': // 'react-native-image-crop-picker'
              //
              ImagePickerLib_cropPicker.showSinglePicker(props);
              break;
          case 'react-native-yuanxincamera': // 'react-native-yuanxincamera'
              //
              ImagePickerLib_yuanxinCamare.showSinglePicker(props);
              break;

          default:
              break;
      };
    },

    /* 多选照片 */
    showMutiplePicker : (pickerComponent: String, props: Object) => {
      switch (pickerComponent) {
          case 'react-native-image-crop-picker': // 'react-native-image-crop-picker'
              //
              ImagePickerLib_cropPicker.showMutiplePicker(props);
              break;
          case 'react-native-yuanxincamera': // 'react-native-yuanxincamera'
              //
              ImagePickerLib_yuanxinCamare.showMutiplePicker(props);
              break;

          default:
              break;
      };
    },

    /* 拍照 */
    selectFromCamera : (pickerComponent: String, props: Object) => {
      switch (pickerComponent) {
          case 'react-native-image-crop-picker': // 'react-native-image-crop-picker'
              //
              ImagePickerLib_cropPicker.selectFromCamera(props);
              break;
          case 'react-native-yuanxincamera': // 'react-native-yuanxincamera'
              //
              ImagePickerLib_yuanxinCamare.selectFromCamera(props);
              break;

          default:
              break;
      };
    },
}

