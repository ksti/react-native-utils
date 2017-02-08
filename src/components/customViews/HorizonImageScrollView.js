
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
 * @providesModule HorizonImageScrollView
 * @flow
 */

'use strict';

import React,{
    Component
} from 'react'
import {
    PanResponder,
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

let plusImage = require('../../resource/images/ic_plus_soild.png')
let unknownImage = require('../../resource/images/unknown.png');

export default class HorizonImageScrollView extends Component {

    static propTypes = {
        style: View.propTypes.style,

        /*
         * 是否禁止编辑操作
         */
        disabled: PropTypes.bool,

        /*
         * 图片样式
         */
        imageStyle: PropTypes.object,
    };

    static defaultProps = {
        imageStyle: {
          resizeMode: 'cover',
          backgroundColor: '#eaeaea',
        }
    };
    
    constructor(props){
        super(props);

        plusImage = props.plusImage || plusImage;

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

        this.state = {
          imageslist: props.imageslist || [],
        }
    }

    componentDidMount(){
      //
      
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.imageslist) {
        this.setState({
          imageslist: nextProps.imageslist,
        })
      };
    }

    isSupported(mimeTypeOrExt) {
      if (typeof mimeTypeOrExt !== 'string') return false;
      let supported = false;
      this.supportedMimeType.map((mimeTypeObject, index) => {
          if (supported) {
            return true;
          };
          if (mimeTypeOrExt === mimeTypeObject.mimeType) {
              supported = true;
              return supported;
          } else {
            let supportedExt = mimeTypeObject.ext;
            supportedExt.map((ext, extIndex) => {
                if (mimeTypeOrExt === ext) {
                  supported = true;
                  return supported;
                };
            });
          }
      });
      return supported;
    }

    _handleOnscroll = (e) => {
      if (this.props.onScroll) {
        this.props.onScroll(e);
      };
    }

    _renderImageSrollView = () => {
      return (
          <View >
              <ScrollView
                  {...this.props}
                  style={[{ overflow: 'hidden' }]}
                  contentContainerStyle={styles.scrollContainer}
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false}
                  onScroll={(e) => this._handleOnscroll(e)}
              >
                  <View style={styles.rowContainer}>
                      {this._renderImageView(this.state.imageslist) }
                  </View>
              </ScrollView>
          </View>
        
      );
    }

    _renderImageView = (images) => {
        let lineArr = [];
        let imageLength = this.props.disabled === true ? images.length : images.length + 1;
        for (let i = 0; i < imageLength; i++) {
            let index  = Math.max(0, i - 1);
            if (this.props.disabled === true) {
              index  = i;
            };
            let dta = images[index];
            let source;
            let isSupported = true;
            if (dta && dta.mimeTypeOrExt) {
              isSupported = this.isSupported(dta.mimeTypeOrExt);
              if (!isSupported) {
                source = this.props.unknownImage || unknownImage;
              }
            }
            if (isSupported) {
              if (dta && dta.photo) {
                  // create source objects for http/asset strings
                  // or directly pass uri number for local files
                  source = typeof dta.photo === 'string' ? { uri: dta.photo } : dta.photo;
              }
            } else {
              source = this.props.unknownImage || unknownImage;
            }

            if ( this.props.disabled !== true && (images.length === 0 || i === 0) ) {
                lineArr.push(
                  <TouchableOpacity onPress={() => this.addImage() } underlayColor='transparent' key={i}
                    style={styles.imageContainer}
                  >
                    <Image
                        style={[styles.image, {...this.props.imageStyle}, {backgroundColor: 'transparent'}]}
                        source={plusImage}
                    />
                  </TouchableOpacity>
                );
            } else {
                lineArr.push(
                  <TouchableOpacity 
                    onPress={ () => this.imageOnClick(dta, index) } 
                    underlayColor='transparent'
                    key={i}
                    style={styles.imageContainer}>
                    <Image
                        style={[styles.image, {...this.props.imageStyle}]}
                        source={source}
                    />
                  </TouchableOpacity>
                );
            }
        }
        return (
            lineArr
        );
    }

    imageOnClick = (dta, index) => {
      if (this.props.imageOnClick) {
        this.props.imageOnClick(dta, index);
      };     
    }
    addImage = () => {
      if (this.props.addImage) {
        this.props.addImage();
      };
    }

    render(){
        return (
          <View {...this.props}>
            {this._renderImageSrollView()}
          </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row', 
    overflow: 'hidden',
  },
  scrollContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80, 
    height: 80, 
    margin: 5, 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
  },
  image: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain', 
    alignSelf: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    flex: 1,
    color: 'black',
  },
});


