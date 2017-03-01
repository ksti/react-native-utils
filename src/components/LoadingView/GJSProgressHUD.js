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
 * @providesModule GJSProgressHUD
 * @flow
 */

'use strict';

/** 使用
 *  <GJSProgressHUD ref={ref => this.progressHUD = ref} />
 *
 *
 *
 */
import React, { PropTypes } from 'react';

import {
    StyleSheet,
    Dimensions,
    Image,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class GJSProgressHUD extends React.Component {

    static LOADING_WIDTH = 100;
    static LOADING_HEIGHT = 80;

    static propTypes = {
        style: View.propTypes.style,

        /*
         * 
         */
        text: PropTypes.string,
        textStyle: PropTypes.any,
        pointerEvents: PropTypes.bool,
        bottomStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
        timeout: PropTypes.number,
        onLoadingTimeout: PropTypes.func,
    };

    static defaultProps = {
        pointerEvents: false,
        timeout: 0,
    };

    constructor(props) {
        super(props);
        this.isShown = false;
        this.state = {
            customHUD: (<View />),
        }
        this.offsetX = 0;
        this.offsetY = 0;
        this.timeout = props.timeout;
        this.onLoadingTimeout = props.onLoadingTimeout;
        this.timeoutEvent = undefined;

    }

    render() {
        return this.state.customHUD;
    }

    show(text, pointerEvents) {
        // if (!this.isShown) {
            if (typeof(text) == 'boolean') {
                pointerEvents = text;
                text = '';
            }
            text = text ? text : this.props.text;
            this.setState({
                customHUD: this.props.customHUD || this._renderLoading({
                    ...this.props,
                    text: text,
                    pointerEvents: pointerEvents
                })
            });
            if (this.timeout > 0) {
                this.timeoutEvent = setTimeout(() => {
                    if (this.isShown) {
                        this.dismiss();
                        this.onLoadingTimeout && this.onLoadingTimeout();
                    }
                }, this.timeout);
            }
            this.isShown = true;
            
        // }
    }

    dismiss() {
        if (this.isShown) {
            this.setState({
                customHUD: (<View />)
            });
            this.isShown = false;
            this.timeoutEvent && clearInterval(this.timeoutEvent);
        }
    }

    setLoadingOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    setLoadingTimeout(timeout, onLoadingTimeout) {
        this.timeout = timeout;
        this.onLoadingTimeout = onLoadingTimeout;
        return this;
    }

    clearLoadingTimeout() {
        this.timeout = 0;
        this.onLoadingTimeout = undefined;
    }

    _renderLoading(props) {
        let bodyWidth = Dimensions.get('window').width;
        if (props.loadingStyle && props.loadingStyle.width) {
            bodyWidth = props.loadingStyle.width;
        };
        return(
            <View pointerEvents={!!props && props.pointerEvents ? 'none' : 'auto'}
                style={
                    [
                        styles.absolute,
                    ]
                }
            >
                <View 
                    style={
                        [
                            styles.container,
                        ]
                    }
                >
                    <View 
                        style={
                            [
                                styles.body,
                                props.loadingStyle,
                            ]
                        }
                    >
                        <ActivityIndicator
                            animating={true}
                            size='small'
                            {...this.props.indicatorProps}
                            style={
                                [
                                    styles.indicator,
                                    props.indicatorStyle,
                                ]
                            }
                        />
                        <Text 
                            style={
                                [
                                    styles.loadingText,
                                    {maxWidth: bodyWidth - 40, },
                                    props.textStyle,
                                ]
                            }
                        >
                            {props.text}
                        </Text>
                    </View>
                </View>
            </View>
          );
    }

}

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        zIndex:888, 
        backgroundColor:'transparent',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    body: {
        zIndex:888, 
        backgroundColor:'transparent',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        // flex: 1,
        padding: 4,
    },
    loadingText: {
        color: '#a7a7a7',
        backgroundColor: 'transparent',
        fontSize: 20,
        // fontWeight:'bold',
        // flex: 1, // 不应该加 flex, 让 Text 自动撑开
    },
    indicator: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
    }
});

module.exports = GJSProgressHUD