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
 * @providesModule FormView
 * @flow
 */

/*
    表单样式：
    属性:
        1.type-表单类型(text, input, date, select, submit, custom)
        2.noSeparator 是否加分割线
        3.separatorColor 分割线颜色
        4.separatorTop 分割线距离上个组件间隙
        5.separatorHeight 分割线高度
        6.leftText 左边文字
        7.leftTextStyle 左边文字样式
        8.rightText 右边文字
        9.rightTextStyle 右边文字样式
        10.inputStyle 右边布局样式（最初是为'input'类型设计,现在通用）
        11.inputProps 'input'类型的表单textInput组件属性定制
        12.defaultInputVale 默认输入值
        13.rightAttributeStrs 自定义右边文本
        14.enableRightTouch 是否启用右侧文本点击
        15.enableAccessory 是否启用右侧文本显示附加视图（比如右箭头>）
        16.accessoryView 自定义右侧文本附加视图
*/

import React,{Component} from 'react'
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native'

import Form from 'react-native-form'

const limitWidth = 60;
const limitHeight = 40;
const flexInput = 3;

var flexByWidth = function(width) {
    var totalWidth = Dimensions.get("window").width;
    // console.log('width/' + 'totalWidth:' + width + '/' + totalWidth);
    var left = totalWidth-width;
    return width>left?Math.ceil(width/left):1; // 向上取整
}

export default class FormView extends Component{

    constructor(props){
        super(props);
        this.state = {
            inputValue: this.props.defaultInputValue || this.props.inputValue,
            showValue: this.props.showValue,
            inputHeight: 35,
            leftText: this.props.leftText,
            rightText: this.props.rightText,
            redText: this.props.redText,
            rightAttributeStrs: this.props.rightAttributeStrs,
        }
        this.values = {};
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.setStateSelf === true) {
            this.setState({
                leftText: nextProps.leftText || this.state.leftText,
                rightText: nextProps.rightText || this.state.rightText,
                inputValue: nextProps.defaultInputValue || nextProps.inputValue || this.state.inputValue,
                showValue: nextProps.showValue || this.state.showValue,
            })
        };
    }

    _onInputValueChanged = (value) => {
        if (this.props.onInputValueChanged) {
            this.props.onInputValueChanged(value);
        };
    }

    _onPressButton = () => {
        if (this.props.onPressButton) {
            this.props.onPressButton();
        };
    }

    _onSubmit = () => {
        var formRefs = this.props.formRefs;
        if (typeof formRefs === 'function') {
            var refs = Object.assign({}, formRefs());
            console.log('formRefs():' + refs);
            Object.keys(refs).map((id, index) => {
                var tempRef = refs[id];
                if (tempRef.state) {
                    this.values[id] = tempRef.state.inputValue;
                };
            });
            if (this.props.onSubmit) {
                this.props.onSubmit(this.values);
            };
        } else {
            if (this.props.onSubmit) {
                this.props.onSubmit();
            };
        }
    }

    _renderSeparator = () => {
        var mergeStyleBottomLine = {
            backgroundColor: this.props.separatorColor ? this.props.separatorColor : '#eaeaea',
            marginTop: this.props.separatorTop ? this.props.separatorTop : 4,
            height: this.props.separatorHeight !== undefined ? this.props.separatorHeight : 1,
        }
        if (!this.props.noSeparator) {
            // return (
            //     <View style={{height:10, flexDirection: 'row', alignItems: 'stretch'}}>
            //         <View style={[styles.bottomLine, mergeStyleBottomLine]} />
            //     </View>
            // )
            return (<View style={[styles.bottomLine, mergeStyleBottomLine]} />)
        };

    }

    _renderTextType = () => {
        var mergeStyleLeftText = this.props.leftTextStyle;
        var mergeStyleRightText = this.props.rightTextStyle;
        var leftWidthStyle = {};
        var rightWidthStyle = {};
        if (mergeStyleLeftText) {
            leftWidthStyle.width = mergeStyleLeftText.width;
            leftWidthStyle.height = mergeStyleLeftText.height;
        };
        if (mergeStyleRightText) {
            rightWidthStyle.width = mergeStyleRightText.width;
            rightWidthStyle.height = mergeStyleRightText.height;
            if (rightWidthStyle.width) {
                flexInput = flexByWidth(rightWidthStyle.width);
            };
        };

        var accessoryView = this.props.accessoryView?this.props.accessoryView:(
            <View style={{width: 20, alignItems: 'center'}}>
                <View style={{width:20,alignItems:'flex-end'}}>
                    <Image
                        source={this.props.accessoryImage || require('../../resource/images/ic_right_line.png')}
                        style={{height:15,width:15,marginRight:5}} />
                </View>
            </View>);

        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    <View style={[styles.columnContainer, {flex:1}, leftWidthStyle]}>
                        <Text style={[styles.leftText, mergeStyleLeftText]}>
                            {this.state.leftText}
                            <Text style={{color:'red'}}>
                                {this.state.redText}
                            </Text>
                            {this.props.attributeStrs}
                        </Text>
                    </View>
                    <TouchableOpacity
                       onPress={()=>this._onPressButton()}
                       style={[styles.rowContainer, {flex:flexInput+1}, rightWidthStyle]}
                       disabled={this.props.enableRightTouch?!this.props.enableRightTouch:true}
                    >
                        <View style={[styles.columnContainer, {flex:flexInput+1}]}>
                            <Text style={[styles.rightText, {textAlign:'left', alignSelf: 'flex-start'}, mergeStyleRightText]}>
                                {this.state.rightText}
                                {this.state.rightAttributeStrs}
                            </Text>
                            {this.props.children}
                        </View>
                        {this.props.enableAccessory?accessoryView:null}
                    </TouchableOpacity>
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderTextType2 = () => {
        var mergeStyleLeftText = this.props.leftTextStyle;
        var mergeStyleRightText = this.props.rightTextStyle;
        var leftView = null;
        var rightView = null;
        leftView = (function() {
            return(
                <View style={[styles.columnContainer]}>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                            {this.state.leftText}
                            <Text style={{color:'red'}}>
                                {this.state.redText}
                            </Text>
                            {this.props.attributeStrs}
                        </Text>
                        {this._renderRightTextButton({flex:flexInput+1, alignSelf:'stretch', marginRight:10, marginLeft:4})}
                    </View>
                </View>
            );
        }.bind(this))();

        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    {leftView}
                    {rightView}
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderLeftText = () => {
        var mergeStyleLeftText = this.props.leftTextStyle;
        if (this.props.leftText) {
            return(
                <Text style={[styles.leftText, mergeStyleLeftText]}>
                    {this.state.leftText}
                    <Text style={{color:'red'}}>
                        {this.state.redText}
                    </Text>
                    {this.props.attributeStrs}
                </Text>
            )
        };
    }

    _renderRightText = (flexStyle) => {
        var mergeStyleRightText = this.props.rightTextStyle;
        if (this.props.rightText) {
            return(
                <Text style={[styles.rightText, flexStyle, mergeStyleRightText]}>
                    {this.state.rightText}
                </Text>
            )
        }
    }

    _renderRightTextButton = (flexStyle) => {
        var mergeStyleLeftText = this.props.leftTextStyle;
        var mergeStyleRightText = this.props.rightTextStyle;
        var mergeStyleInput = this.props.inputStyle;

        var accessoryView = this.props.accessoryView?this.props.accessoryView:(
            <View style={{alignSelf:'flex-end'}}>
                <View style={{width:20,alignItems:'flex-end'}}>
                    <Image
                        source={this.props.accessoryImage || require('../../resource/images/ic_right_line.png')}
                        style={{height:15,width:15,marginRight:0}} />
                </View>
            </View>);

        return(
            <TouchableOpacity
               onPress={()=>this._onPressButton()}
               style={[{/*backgroundColor: 'purple',*/ marginRight: 10}, flexStyle, mergeStyleInput]}
               disabled={this.props.enableRightTouch?!this.props.enableRightTouch:true}
            >
                <View style={[styles.rowContainer, /*{backgroundColor: 'yellow'}*/]}>
                    <View style={[{flex: 1, flexDirection: 'column'}]}>
                        <View >
                            <Text style={[styles.rightText, /*{backgroundColor: 'red'},*/ flexStyle, mergeStyleRightText]}>
                                {this.state.rightText}
                                {this.state.rightAttributeStrs}
                            </Text>
                        </View>
                        <View >
                            {this.props.children}
                        </View>
                    </View>
                    <View style={{/*backgroundColor: 'green'*/}}>
                        {this.props.enableAccessory?accessoryView:null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderTextInput = (flexStyle) => {
        var mergeStyleInput = this.props.inputStyle;
        var mutilineHeight = 35;
        if (this.props.inputProps && this.props.inputProps.multiline) {
            mutilineHeight = 50;
        };
        return(
            <TextInput
                underlineColorAndroid='transparent'
                {...this.props.inputProps}
                onChange={(event) => {
                    var textHeight = 35;
                    if (this.props.inputProps.multiline) {
                        textHeight = event.nativeEvent.contentSize.height;
                    };
                    this.setState({
                        inputValue: event.nativeEvent.text,
                        showValue: event.nativeEvent.text,
                        inputHeight: textHeight,
                    });
                    this._onInputValueChanged(this.state.inputValue);
                }}
                style={[styles.input, flexStyle, {height: Math.max(mutilineHeight, this.state.inputHeight)}, mergeStyleInput]}
                value={this.state.showValue?this.state.showValue:this.state.inputValue}
            />
        )
    }

    _renderInputType = () => {
        var mergeStyleInput = this.props.inputStyle;
        var mergeStyleLeftText = this.props.leftTextStyle;
        var leftView = null;
        var rightView = null;
        if (this.props.leftText) {
            // leftTextView = this._renderLeftText();
            leftView = (function() {
                return(
                    <View style={[styles.columnContainer, {flex:flexInput+1}]}>
                        <View style={styles.rowContainer}>
                            <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                                {this.state.leftText}
                                <Text style={{color:'red'}}>
                                    {this.state.redText}
                                </Text>
                                {this.props.attributeStrs}
                            </Text>
                            {this._renderTextInput()}
                        </View>
                    </View>
                );
            }.bind(this))();
            //
            if (!this.props.rightText) {
                leftView = (function() {
                    return(
                        <View style={[styles.columnContainer]}>
                            <View style={styles.rowContainer}>
                                <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                                    {this.state.leftText}
                                    <Text style={{color:'red'}}>
                                        {this.state.redText}
                                    </Text>
                                    {this.props.attributeStrs}
                                </Text>
                                {this._renderTextInput({flex:flexInput+1, marginRight:10, marginLeft:4})}
                            </View>
                        </View>
                    );
                }.bind(this))();
            };
        } else {
            leftView = (function() {
                return(
                    <View style={[styles.columnContainer]}>
                        <View style={styles.rowContainer}>
                            {this._renderTextInput({marginLeft:10})}
                        </View>
                    </View>
                );
            }.bind(this))();
        }
        if (this.props.rightText) {
            rightView = (function() {
                return(
                    <View style={[styles.columnContainer, {flex:1}]}>
                        <View style={styles.rowContainer}>
                            {this._renderRightText()}
                            {this.props.children}
                        </View>
                    </View>
                );
            }.bind(this))();
        }

        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    {leftView}
                    {rightView}
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderDateInput = (flexStyle) => {
        var mergeStyleInput = this.props.inputStyle;

        // <TouchableOpacity onPress={()=>this._onPressButton()} style={{flexDirection: 'row'}}>
        //     <TextInput
        //         {...this.props.inputProps}
        //         style={[styles.input, flexStyle, {height: 35}, mergeStyleInput]}
        //         value={this.state.showValue?this.state.showValue:this.state.inputValue}
        //         editable={false}
        //     />
        // </TouchableOpacity>

        return(
            <View style={[styles.columnContainer, flexStyle, {/*backgroundColor: 'green'*/}, mergeStyleInput]}>
                <TouchableOpacity style={[{alignSelf: 'stretch', /*backgroundColor: 'purple',*/ height: 44}, mergeStyleInput]}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        {...this.props.inputProps}
                        style={[styles.input, flexStyle, {height: 35, marginLeft: 0, marginRight: 0}]}
                        value={this.state.showValue?this.state.showValue:this.state.inputValue}
                        editable={false}
                    />
                    <TouchableOpacity onPress={()=>this._onPressButton()} style={{position: 'absolute', top: 2, left: 2, bottom: 2, right: 2, /*backgroundColor: 'red'*/}}>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }

    _renderDateType = () => {
        var mergeStyleLeftText = this.props.leftTextStyle;
        var leftWidthStyle = {};
        var rightWidthStyle = {};
        if (mergeStyleLeftText) {
            leftWidthStyle.width = mergeStyleLeftText.width;
            leftWidthStyle.height = mergeStyleLeftText.height;
        };
        if (this.props.inputStyle) {
            rightWidthStyle.width = this.props.inputStyle.width;
            rightWidthStyle.height = this.props.inputStyle.height;
            if (rightWidthStyle.width) {
                flexInput = flexByWidth(rightWidthStyle.width);
            };
        };
        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {flex:1}, leftWidthStyle]}>
                        <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                            {this.state.leftText}
                            <Text style={{color:'red'}}>
                                {this.state.redText}
                            </Text>
                            {this.props.attributeStrs}
                        </Text>
                    </View>
                    <View style={[styles.columnContainer, {flex:flexInput+1}, rightWidthStyle]}>
                        {this._renderDateInput({alignSelf:'stretch', marginRight:10, marginLeft:4})}
                    </View>
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderDateType2 = () => {
        var mergeStyleInput = this.props.inputStyle;
        var mergeStyleLeftText = this.props.leftTextStyle;
        var leftView = null;
        var rightView = null;
        if (this.props.leftText) {
            // leftTextView = this._renderLeftText();
            leftView = (function() {
                return(
                    <View style={[styles.columnContainer, {flex:flexInput+1}]}>
                        <View style={styles.rowContainer}>
                            <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                                {this.state.leftText}
                                <Text style={{color:'red'}}>
                                    {this.state.redText}
                                </Text>
                                {this.props.attributeStrs}
                            </Text>
                            {this._renderDateInput()}
                        </View>
                    </View>
                );
            }.bind(this))();
            //
            if (!this.props.rightText) {
                leftView = (function() {
                    return(
                        <View style={[styles.columnContainer]}>
                            <View style={styles.rowContainer}>
                                <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                                    {this.state.leftText}
                                    <Text style={{color:'red'}}>
                                        {this.state.redText}
                                    </Text>
                                    {this.props.attributeStrs}
                                </Text>
                                {this._renderDateInput({flex:flexInput+1, alignSelf:'stretch', marginRight:10, marginLeft:4})}
                            </View>
                        </View>
                    );
                }.bind(this))();
            };
        } else {
            leftView = (function() {
                return(
                    <View style={[styles.columnContainer]}>
                        <View style={styles.rowContainer}>
                            {this._renderDateInput({marginLeft:10})}
                        </View>
                    </View>
                );
            }.bind(this))();
        }
        if (this.props.rightText) {
            rightView = (function() {
                return(
                    <View style={[styles.columnContainer, {flex:1}]}>
                        <View style={styles.rowContainer}>
                            {this._renderRightText()}
                            {this.props.children}
                        </View>
                    </View>
                );
            }.bind(this))();
        }

        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    {leftView}
                    {rightView}
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderSelectInput = (flexStyle) => {
        var mergeStyleLeftText = this.props.leftTextStyle;
        var mergeStyleInput = this.props.inputStyle;
        return(
            <View style={[styles.columnContainer, flexStyle, {/*backgroundColor: 'green'*/}, mergeStyleInput]}>
                <ButtonWithAccessory
                    accessoryImg={this.props.accessoryImg || require('../../resource/images/ic_down_fill.png')}
                    title={this.state.showValue?this.state.showValue:this.state.inputValue}
                    onPress={() => this._onPressButton()}
                    style={[{alignSelf: 'stretch', /*backgroundColor: 'purple',*/ marginLeft: 0, marginRight: 0, height: 44}, mergeStyleInput]}
                />
            </View>
        );
    }

    _renderSelectType = () => {
        var mergeStyleLeftText = this.props.leftTextStyle;
        var leftWidthStyle = {};
        var rightWidthStyle = {};
        if (mergeStyleLeftText) {
            leftWidthStyle.width = mergeStyleLeftText.width;
            leftWidthStyle.height = mergeStyleLeftText.height;
        };
        if (this.props.inputStyle) {
            rightWidthStyle.width = this.props.inputStyle.width;
            rightWidthStyle.height = this.props.inputStyle.height;
            if (rightWidthStyle.width) {
                flexInput = flexByWidth(rightWidthStyle.width);
            };
        };
        var titleWidth = rightWidthStyle.width?rightWidthStyle.width-24:120;
        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    <View style={[styles.rowContainer, {flex:1}, leftWidthStyle]}>
                        <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                            {this.state.leftText}
                            <Text style={{color:'red'}}>
                                {this.state.redText}
                            </Text>
                            {this.props.attributeStrs}
                        </Text>
                    </View>
                    <View style={[styles.columnContainer, {flex:flexInput+1}, rightWidthStyle]}>
                        <ButtonWithAccessory
                            accessoryImg={this.props.accessoryImg || require('../../resource/images/ic_down_fill.png')}
                            title={this.state.showValue?this.state.showValue:this.state.inputValue}
                            onPress={() => this._onPressButton()}
                            style={{marginTop: 4, marginLeft:4}}
                            titleWidth={titleWidth}
                        />
                    </View>
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderSelectType2 = () => {
        var mergeStyleInput = this.props.inputStyle;
        var mergeStyleLeftText = this.props.leftTextStyle;
        var leftView = null;
        var rightView = null;
        if (this.props.leftText) {
            // leftTextView = this._renderLeftText();
            leftView = (function() {
                return(
                    <View style={[styles.columnContainer, {flex:flexInput+1}]}>
                        <View style={styles.rowContainer}>
                            <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                                {this.state.leftText}
                                <Text style={{color:'red'}}>
                                    {this.state.redText}
                                </Text>
                                {this.props.attributeStrs}
                            </Text>
                            {this._renderSelectInput()}
                        </View>
                    </View>
                );
            }.bind(this))();
            //
            if (!this.props.rightText) {
                leftView = (function() {
                    return(
                        <View style={[styles.columnContainer]}>
                            <View style={styles.rowContainer}>
                                <Text style={[styles.leftText, {alignSelf:'flex-start' && 'center'}, mergeStyleLeftText]}>
                                    {this.state.leftText}
                                    <Text style={{color:'red'}}>
                                        {this.state.redText}
                                    </Text>
                                    {this.props.attributeStrs}
                                </Text>
                                {this._renderSelectInput({flex:flexInput+1, alignSelf:'stretch', marginRight:10, marginLeft:4})}
                            </View>
                        </View>
                    );
                }.bind(this))();
            };
        } else {
            leftView = (function() {
                return(
                    <View style={[styles.columnContainer]}>
                        <View style={styles.rowContainer}>
                            {this._renderSelectInput({marginLeft:10})}
                        </View>
                    </View>
                );
            }.bind(this))();
        }
        if (this.props.rightText) {
            rightView = (function() {
                return(
                    <View style={[styles.columnContainer, {flex:1}]}>
                        <View style={styles.rowContainer}>
                            {this._renderRightText()}
                            {this.props.children}
                        </View>
                    </View>
                );
            }.bind(this))();
        }

        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    {leftView}
                    {rightView}
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderSubmitType = () => {
        // const goToSubmit = () => this._onSubmit();
        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    <CustomButton
                        {...this.props}
                        style={this.props.buttonStyle}
                        title={this.props.title || '提交'}
                        titleStyle={this.props.titleStyle}
                        onPress={() => this._onSubmit()}
                    />
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    _renderCustomType = () => {
        return(
            <View style={styles.columnContainer}>
                <View style={styles.rowContainer}>
                    {this.props.children}
                </View>
                {this._renderSeparator()}
            </View>
        );
    }

    render(){
        switch (this.props.type) {
            case 'text': {
                return(
                    <View {...this.props}>
                        {this._renderTextType2()}
                    </View>
                );
            }
            case 'input': {
                return(
                    <View {...this.props}>
                        {this._renderInputType()}
                    </View>
                );
            }
            case 'date': {
                return(
                    <View {...this.props}>
                        {this._renderDateType2()}
                    </View>
                );
            }
            case 'select': {
                return(
                    <View {...this.props}>
                        {this._renderSelectType2()}
                    </View>
                );
            }
            case 'submit': {
                return(
                    <View {...this.props}>
                        {this._renderSubmitType()}
                    </View>
                );
            }
            case 'custom': {
                return(
                    <View {...this.props}>
                        {this._renderCustomType()}
                    </View>
                );
            }
            default: {
                return(
                    <View {...this.props}>
                        <View />
                    </View>
                );
            }
        }

    }
}

class CustomButton extends Component {
    constructor(props){
        super(props);
    }

    _renderButton = () => {
        var mergeImageStyle = {height:this.props.height};
        if (this.props.style && this.props.style.borderRadius) {
            mergeImageStyle = {height:this.props.height, borderRadius:this.props.style.borderRadius};
        };
        if (this.props.backgroundImage) {
            return(
                <TouchableOpacity onPress={()=>this.props.onPress()} style={[styles.customButton, this.props.style]}>
                    <Image
                        style={[styles.backgroundImage, mergeImageStyle]}
                        source={this.props.backgroundImage}
                    >
                        <View style={styles.overlay}>
                            <Text style={[styles.text, {alignSelf: 'center'}, this.props.titleStyle]} >
                                {this.props.title}
                            </Text>
                        </View>
                    </Image>
                </TouchableOpacity>
            );
        } else {
            return(
                <TouchableOpacity onPress={()=>this.props.onPress()} style={[styles.customButton, this.props.style]}>
                    <View
                        style={[{flex: 1, flexDirection: 'row', alignItems: 'center'}, mergeImageStyle]}
                    >
                        <View style={styles.overlay}>
                            <Text style={[styles.text, {alignSelf: 'center'}, this.props.titleStyle]} >
                                {this.props.title}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    render(){
        return(
            this._renderButton()
        );
    }
}

class ButtonWithAccessory extends Component{
    render(){
        return(
            <TouchableOpacity
               onPress={()=>this.props.onPress()}
               style={[{alignSelf: 'center'}, this.props.style]}
            >
               <View style={[styles.btnBorder, {alignSelf: 'stretch'}]}>
                     <Text style={[styles.btnTitle, {flex: 1,marginLeft: 4, marginRight: 4}]} numberOfLines={1}>{this.props.title}</Text>
                     <View style={{width:20,alignItems:'flex-end',marginRight: 4}}>
                        <Image
                            source={this.props.accessoryImg}
                            style={{height:15,width:15,marginRight:5}} />
                     </View>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles=StyleSheet.create({
    columnContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        // padding: 2,
    },
    rowContainer: {
        flex: 1,
        // justifyContent: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 2,
    },
    image: {
        width: 30,
        height: 30,
        margin: 2,
    },
    customButton: {
        flex: 1,
        // flexDirection: 'row', // 图片会横向拉伸
        // alignSelf: 'center',
        alignItems: 'center',
        backgroundColor:'#A7A7A7',
        height: 40,
        borderRadius: 5,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 4,
        marginBottom: 4,
        padding: 4,
    },
    backgroundImage: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        resizeMode: 'contain',
        // resizeMode: 'cover',
        // backgroundColor: 'purple',
        // margin: 4,
    },
    overlay: {
        flex: 1,
        alignSelf: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backgroundColor: 'transparent',
        padding: 4,
    },
    bottomLine: {
        height: 1,
        alignSelf: 'stretch',
        marginLeft: 1,
        marginRight: 1,
        marginTop: 4,
        backgroundColor: '#eaeaea',
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        // backgroundColor: 'red',
    },
    leftText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        margin: 4,
    },
    rightText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        margin: 4,
    },
    input: {
        flex: flexInput,
        alignSelf: 'center',
        height: 26,
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderRadius: 5,
        fontSize: 13,
        padding: 4,
        marginTop: 4,
    },
    btnBorder: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        height: 40,
        marginRight: 10,
        padding: 4,
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderRadius: 5,
    },
    btnTitle: {
        height: 18,
        alignSelf: 'center',
        textAlign: 'center',
    },
})
