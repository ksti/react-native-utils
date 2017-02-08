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

import ActionSheet from 'react-native-actionsheet';
import ImagePickerAdapter from './ImagePickerAdapter';

const base64 = require('base64-js');

const actionSheetButtons = ['取消', '拍照', '从相册选取',];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

function isArray(obj) {  
	return Object.prototype.toString.call(obj) === '[object Array]';   
}

export default class ImagePickerSheet extends Component {
	static propTypes = {
        style: View.propTypes.style,
        /*
         * 标题
         */
        title: PropTypes.string,
        /*
         * 图片选择组件
         */
        pickerComponent: PropTypes.string,
        /*
         * 图片裁剪可选项
         */
        pickerOptions: PropTypes.object,      
        /*
         * 回调图片
         */
        handleImage: PropTypes.func,
        /*
         * 回调错误信息
         */
        handleImageError: PropTypes.func,
        /*
         * 是否多选
         */
        showMutiple: PropTypes.bool,
        /*
         * 回调多选图片
         */
        handleImages: PropTypes.func,
        /*
         * 回调多选错误信息
         */
        handleImagesError: PropTypes.func,
    };

    static defaultProps = {
    	title: '选择照片',
      pickerComponent: 'react-native-image-crop-picker',
      // pickerComponent: 'react-native-yuanxincamera',
    };

    constructor(props) {
        super(props);
        this.state = {
          pickerOptions: props.pickerOptions,
        }
    }

    /*
     * 照片选取
     */

    /* 单选照片 */
    showSinglePicker = () => {
      ImagePickerAdapter.showSinglePicker(this.props.pickerComponent, {
        ...this.props,
        pickerOptions: this.state.pickerOptions,
        identifierParams: this.identifierParams,
      });
    }

    /* 多选照片 */
    showMutiplePicker = () => {
      ImagePickerAdapter.showMutiplePicker(this.props.pickerComponent, {
        ...this.props,
        pickerOptions: this.state.pickerOptions,
        identifierParams: this.identifierParams,
      });
    }

    /* 拍照 */
    selectFromCamera = () => {
      ImagePickerAdapter.selectFromCamera(this.props.pickerComponent, {
        ...this.props,
        pickerOptions: this.state.pickerOptions,
        identifierParams: this.identifierParams,
      });
    }

    show = (identifierParams, pickerOptions) => {
        this.identifierParams = identifierParams;
        this.setState({
          pickerOptions: pickerOptions,
        }, () => {
          this.ActionSheet.show();
        })        
    }

    _handlePress = (index) => {
        switch (index) {
            case CANCEL_INDEX: { // 取消
                break;
            }
            case DESTRUCTIVE_INDEX: { // 拍照
                this.selectFromCamera();
                break;
            }
            case 2: { // 相册
                if (this.props.showMutiple === true) {
                    this.showMutiplePicker();
                } else {
                    this.showSinglePicker();
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    _renderActionSheet = () => {
      return(
        <ActionSheet 
            ref={(o) => this.ActionSheet = o}
            title={this.props.title || '选择照片'}
            options={actionSheetButtons}
            cancelButtonIndex={CANCEL_INDEX}
            destructiveButtonIndex={DESTRUCTIVE_INDEX}
            onPress={this._handlePress.bind(this)}
        />
      )
    }

    render(){
        return this._renderActionSheet();
    }
}

