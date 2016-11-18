
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
 * @providesModule FlowLayoutImageView
 * @flow
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

let listdata = new Array().concat(media, plusImage);

export default class FlowLayoutImageView extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var imgDs = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        plusImage = props.plusImage || plusImage;
        listdata = new Array().concat(props.imageSource, plusImage);

        this.state = {
          width: props.width || Dimensions.get('window').width,
          imageDataSource: imgDs.cloneWithRows(listdata),
          images: listdata,
        }
    }

    componentDidMount(){
      //
      
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.imageSource) {
        listdata = new Array().concat(nextProps.imageSource, plusImage);
        this.setState({
          imageDataSource: this.state.imageDataSource.cloneWithRows(listdata),
        })
      };
    }

    _renderImageListView = () => {
      return (
          <View >
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
        var imageWidth = (this.state.width - rowMax * margin * 2 - 8 * 2) / rowMax;
        var imageHeight = imageWidth + 10;

        // overlay
        var overlay = null;
        if ((this.props.showMore === true || this.props.hiddenWhenMax === false) && imageCount > showMax && rowID === String(showMax - 1)) {
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
        var itemView;
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
                  }}
                  // source={require('../../../../images/App/jiahao.png')}
                  source={source}
              />
            </TouchableOpacity>
          )
          if (this.props.disabled === true) {
            itemView = null; // 去掉加号
          };
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

    imageOnClick = (dta, rowID) => {
      if (this.props.imageOnClick) {
        this.props.imageOnClick(dta, rowID);
      };     
    }
    addImage = (rowID) => {
      if (this.props.addImage) {
        this.props.addImage(rowID);
      };
    }

    render(){
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


