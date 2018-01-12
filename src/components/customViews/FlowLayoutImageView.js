
/**
 * @author GJS <1353990812@qq.com>
 *
 * GJS reserves all rights not expressly granted.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 GJS
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
 * @providesModule FlowLayoutImageView
 * @flow
 */

'use strict';

import React, { PropTypes, Component } from "react";
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

let media = [
  {
    photo: 'http://www.iyi8.com/uploadfile/2016/0424/20160424115032400.jpg',
    selected: false,
    caption: '图片1',
  },
  {
    photo: 'http://www.iyi8.com/uploadfile/2016/0424/20160424115032116.jpg',
    selected: false,
    caption: '图片2',
  },
  {
    photo: 'http://www.iyi8.com/uploadfile/2016/0424/20160424113910552.jpg',
    selected: false,
    caption: '图片3',
  },
  {
    photo: 'http://www.iyi8.com/uploadfile/2015/1215/20151215122358935.jpg',
    selected: false,
    caption: '图片4',
  },
  {
    photo: 'http://www.iyi8.com/uploadfile/2016/0225/20160225124617786.jpg',
    selected: false,
    caption: '图片5',
  },
  {
    photo: 'http://www.iyi8.com/uploadfile/2014/0829/20140829063742850.jpg',
    selected: false,
    caption: '图片6',
  },
];

let plusImage = {
  photo: require('../../resource/images/ic_plus_soild.png'),
  selected: false,
  caption: '加号',
}

let unknownImage = require('../../resource/images/unknown.png');

// let listdata = new Array().concat(media, plusImage);

export default class FlowLayoutImageView extends Component {

    static propTypes = {
        style: View.propTypes.style,

        /*
         * 宽度
         */
        width: PropTypes.number,

        /*
         * 数据源
         */
        imageSource: PropTypes.array,

        /*
         * 每行数量
         */
        rowItemCount: PropTypes.number,

        /*
         * 最大显示数量
         */
        max: PropTypes.number,

        /*
         * 达到最大限制时是否隐藏
         */
        hiddenWhenMax: PropTypes.bool,

        /*
         * 达到最大限制时是否显示更多
         */
        showMore: PropTypes.bool,

        /*
         * 是否禁止编辑操作
         */
        disabled: PropTypes.bool,

        /*
         * 图片样式
         */
        imageStyle: PropTypes.object,

        /*
         * 添加图片
         */
        addImage: PropTypes.func,

        /*
         * '删除'图标, 一般为<Image>
         */
        deletIcon: PropTypes.element,

        /*
         * '删除'图标样式, 给默认的deletIcon用
         */
        deletIconStyle: View.propTypes.style,

        /*
         * '删除'图标样式, 给默认的deletIcon用
         */
        showDelete: PropTypes.bool,

        /*
         * 图片被点击时
         */
        imageOnClick: PropTypes.func,

        /*
         * 图片被删除时
         */
        imageOnDelete: PropTypes.func,
    };

    static defaultProps = {
        width: Dimensions.get('window').width,
        imageSource: [],
        rowItemCount: 4,
        imageRatio: 1,
        max: 9,
        hiddenWhenMax: true,
        showMore: false,
        disabled: false,
        imageStyle: {
            backgroundColor: '#eaeaea',
        }
    };

    constructor(props){
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let imgDs = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        plusImage = props.plusImage || plusImage;
        let listdata = new Array().concat(props.imageSource, plusImage);

        this.supportedMimeType = [
            {
                mimeType: 'image/jpeg',
                ext: [
                    'jpe',
                    'jpeg',
                    'jpg',
                ],
            },
            {
                mimeType: 'image/png',
                ext: [
                    'png',
                    'x-png',
                ],
            },
        ]

        // state
        this.state = {
            width: props.width || Dimensions.get('window').width,
            imageDataSource: imgDs.cloneWithRows(listdata),
            images: listdata,
        }
    }
    componentWillReceiveProps = (nextProps) => {
        this._handleNextProps(nextProps);
    }

    isSupported = (mimeTypeOrExt) => {
        if (!mimeTypeOrExt) return true; // 默认支持
        if (typeof mimeTypeOrExt !== 'string') return false;
        let lowercaseMimeTypeOrExt = mimeTypeOrExt.toLowerCase();
        let supported = false;
        this.supportedMimeType.map((mimeTypeObject, index) => {
            if (supported) {
                return true;
            };
            if (lowercaseMimeTypeOrExt === mimeTypeObject.mimeType) {
                supported = true;
                return supported;
            } else {
                let supportedExt = mimeTypeObject.ext;
                supportedExt.map((ext, extIndex) => {
                    if (lowercaseMimeTypeOrExt === ext) {
                        supported = true;
                        return supported;
                    };
                });
            }
        });
        return supported;
    }

    _handleNextProps = (nextProps) => {
        if (nextProps.imageSource) {
            let listdata = new Array().concat(nextProps.imageSource, plusImage);
            this.setState({
                imageDataSource: this.state.imageDataSource.cloneWithRows(listdata),
                images: listdata,
            })
        };
    }

    _renderDeleteOverlay = (rowData, sectionID, rowID) => {
        if (!this.props.showDelete || this.props.disabled) {
            return null;
        }
        // deleteOverlay
        let deletIcon = this.props.deletIcon || <Image source={require('../../resource/images/ic_sub.png')} style={[{ width: 30, height: 30 }, this.props.deletIconStyle]} />;
        let deleteOverlay = (
            <View
                style={{
                    position: 'absolute',
                    justifyContent :'center',
                    alignItems: 'center',
                    top: 0,
                    right: 0,
                }}
            >
                <View
                    style={{
                        width: 40,
                        height: 40,
                        alignSelf:'center',
                        justifyContent: 'center',
                        backgroundColor:'transparent',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.imageOnDelete(rowData, rowID)}
                        style={{
                            width: 40,
                            height: 40,
                            alignSelf:'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {deletIcon}
                    </TouchableOpacity>
                </View>
            </View>
        );
        return deleteOverlay;
    }

    _renderImageListView = () => {
        return (
            <View >
                <ListView
                    enableEmptySections={true}
                    contentContainerStyle={styles.list}
                    initialListSize={this.props.max + 1}
                    dataSource={this.state.imageDataSource}
                    renderRow={this._renderImagesRow.bind(this)}
                />
            </View>
        );
    }

    _renderImagesRow = (rowData, sectionID, rowID) => {
        let showMax = this.props.max;
        // let imageCount = this.state.imageDataSource.getRowCount();
        let imageCount = this.state.images.length;
        let hiddenCondition = this.props.hiddenWhenMax ? (Number(rowID) > showMax - 1) : (Number(rowID) > showMax - 1 && Number(rowID) < imageCount - 1);
        // if (Number(rowID) > showMax - 1 && Number(rowID) < imageCount - 1) {
        // if (Number(rowID) > showMax - 1) { // 超过 showMax 隐藏加号
        if (hiddenCondition) {
            return null;
        }

        if (this.props.disabled === true) {
            if (rowID === String(imageCount - 1)) { // 加号
                return null; // disabled 加号直接去掉
            }
        };

        // source
        let source;
        let isSupported = true;
        if (rowData && rowData.mimeTypeOrExt) {
            isSupported = this.isSupported(rowData.mimeTypeOrExt);
            if (!isSupported) {
                source = this.props.unknownImage || unknownImage;
            }
        }
        if (isSupported) {
            if (rowData && rowData.photo) {
                // create source objects for http/asset strings
                // or directly pass uri number for local files
                source = typeof rowData.photo === 'string' ? { uri: rowData.photo } : rowData.photo;
            }
        } else {
            source = this.props.unknownImage || unknownImage;
        }

        // layout
        let rowMax = this.props.rowItemCount;
        let margin = 4;
        let ratio = this.props.imageRatio;
        ratio = ratio > 0 ? ratio : 1;
        let imageWidth = (this.state.width - rowMax * margin * 2 - 8 * 2) / rowMax;
        let imageHeight = imageWidth * ratio + 10;

        // overlay
        let overlay = null;
        if ((this.props.showMore === true || this.props.hiddenWhenMax === false) && (imageCount > showMax) && (rowID === String(showMax - 1))) {
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
                    <View
                        style={{
                            width: imageWidth,
                            height: imageHeight,
                            alignSelf:'center',
                            justifyContent: 'center',
                            backgroundColor:'transparent',
                        }}
                    >
                        <Text
                            style={{
                                // width: imageWidth,
                                // height: imageHeight,
                                alignSelf:'center',
                                justifyContent: 'center',
                                backgroundColor:'transparent',
                                color: 'white',
                            }}
                        >
                            更多...
                        </Text>
                    </View>
                </View>
            );
        }

        //
        let itemView;
        if (rowID === String(imageCount - 1)) { // 加号
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
                            ...this.props.imageStyle,
                            ...rowData.imageStyle,
                        }}
                        // source={require('../../../../images/App/jiahao.png')}
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
                        this.imageOnClick(rowData, rowID)
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
                                ...this.props.imageStyle,
                                ...rowData.imageStyle,
                            }}
                            source={source}
                        />
                        {overlay}
                        {this._renderDeleteOverlay(rowData, sectionID, rowID)}
                    </View>

                </TouchableHighlight>
            )
        }

        return (
            <View
                key={`FlowLayoutImageView_${rowID}`}
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

    imageOnClick = (dta, rowID) => {
        if (this.props.imageOnClick) {
            this.props.imageOnClick(dta, rowID);
        };
    }
    imageOnDelete = (dta, rowID) => {
        if (this.props.imageOnDelete) {
            this.props.imageOnDelete(dta, rowID);
        };
    }
    addImage = (rowID) => {
        if (this.props.addImage) {
            this.props.addImage(rowID);
        };
    }

    render() {
        return (
            <View {...this.props}>
                {this._renderImageListView()}
            </View>

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
        color: '#3b3b3b', // 标题黑色
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
    viewbg: {
        minHeight: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        borderTopColor: '#eaeaea', // 边框分割线
        borderTopWidth: 0.5,
        overflow: 'hidden'
    },
});


