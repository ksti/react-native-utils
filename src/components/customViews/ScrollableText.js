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
 * @providesModule ScrollableText
 * @flow
 */

/*
 * 可滑动文本 和 自适应高度的 TextInput
 */
import React, {PropTypes, Component} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
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

// import ScrollContainer from '../../containers/ScrollContainer'

const textMinHeight = 20;

export default class ScrollableText extends Component {
	static propTypes = {
        style: View.propTypes.style,
        /*
         * @prop {String} type 
         * 'text': <Text/>
         * 'input': <TextInput/>
         */
        type: PropTypes.string,
        /*
         * TextInput props
         */
        ...TextInput.propTypes,
        /*
         * 容器样式
         */
        containerStyle: View.propTypes.style,
        /*
         * 文本样式
         */
        textStyle: Text.propTypes.style,
        /*
         * 文本输入框高度修正值
         */
        heightRevise: PropTypes.number,
    };

    static defaultProps = {
        type: 'text',
        heightRevise: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            textHeight: textMinHeight,
            switchToTextInput: false,
        }
    }

    _renderScrollableText = () => {
        // return(
        //     <ScrollContainer pointerEvents={'auto'} style={[{flex: 1, backgroundColor: 'transparent'}, this.props.containerStyle]}>
        //         <Text style={[styles.text, this.props.textStyle]}>
        //             {this.props.text}
        //         </Text>
        //     </ScrollContainer>
        // );
        return(
            <ScrollView pointerEvents={'auto'} style={[{flex: 1, backgroundColor: 'transparent'}, this.props.containerStyle]}>
                <Text style={[styles.text, this.props.textStyle]}>
                    {this.props.text}
                </Text>
            </ScrollView>
        );
    }

    // 根据 Text layout 变化更换 TextInput
    _onLayoutText = (e) => {
        const {x, y, width, height} = e.nativeEvent.layout;
        // PublicToast.showMessage('x==' + x + '----y==' + y + '----width==' + width + '----height==' + height);
        // PublicToast.showMessage('windowHeight==' + Dimensions.get('window').height);
        let textHeight = height > textMinHeight ? height : textMinHeight;
        let revisedTextHeight = textHeight + this.props.heightRevise;
        this.setState({
            switchToTextInput: true,
            textHeight: revisedTextHeight,
        });
    }

    _renderTextInput = () => {
        let textHeight = this.state.textHeight;
        let propsTextStyle = this.props.textStyle || this.props.style;
        let propsTextHeight = propsTextStyle.height;
        if (propsTextHeight && propsTextHeight > textHeight) {
            textHeight = propsTextHeight;
        };
        if (!this.state.switchToTextInput) {
            return(
                <View pointerEvents={'auto'} style={[{flex: 1, backgroundColor: 'transparent'}, this.props.containerStyle]}>
                    <Text 
                        style={[styles.text, this.props.textStyle]}
                        onLayout={this._onLayoutText}
                    >
                        {this.props.value || this.props.text}
                    </Text>
                </View>
            );
        } else {
            return(
                <View pointerEvents={'auto'} style={[{flex: 1, backgroundColor: 'transparent'}, this.props.containerStyle]}>
                    <TextInput 
                        {...this.props}
                        onChange={(event) => {
                            let textHeight = Math.max(textMinHeight, event.nativeEvent.contentSize.height);
                            this.setState({
                                textHeight: textHeight
                            });
                            this.props.onChange && this.props.onChange(event);
                        }}
                        style={[styles.text, propsTextStyle, {height: textHeight}]}
                    />
                </View>
            );
        }        
    }

    render(){
        if (this.props.type === 'text') {
           return this._renderScrollableText(); 
        } else {
            return this._renderTextInput();
        }        
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    text: {
        color: '#666666', //
        fontSize: 14,
    },
});

