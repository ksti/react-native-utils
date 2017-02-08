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
 * @providesModule CustomListView
 * @flow
 */

// 自定义一个简易的CustomListView(此处不是采用继承自ListView的做法,完善性尚不足,性能也不好,主要用于尝试绕过ListView机制的限制)
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

function isArray(obj) {  
	return Object.prototype.toString.call(obj) === '[object Array]';   
}

export default class CustomListView extends Component {
	static propTypes = {
        style: View.propTypes.style,
        /*
         * 列表数据源
         */
        alldata: PropTypes.array,
    };

    static defaultProps = {
    	alldata: [],
    };

    constructor(props) {
        super(props);
    }

    _onLayout = (event) => {
        const {width, height} = event.nativeEvent.layout;
        let visibleLength = !this.props.horizontal ? height : width;
        this.props.onLayout && this.props.onLayout(event); 
    }

    _onContentSizeChange = (contentWidth, contentHeight) => {
        this.props.onContentSizeChange && this.props.onContentSizeChange(contentWidth, contentHeight); 
    }

    _renderRow = (rowData: Object, sectionID: Number, rowID: Number) => {
        return this.props.renderRow && this.props.renderRow(rowData, sectionID, rowID);
    }

    _renderFooter = () => {
        return this.props.renderFooter && this.props.renderFooter();
    }

    _renderSection = (sectionData: Object, sectionID: Number) => {
        let sectionComponents = [];
        sectionData.map((rowData, rowID)=>{
            sectionComponents.push(this._renderRow(rowData, sectionID, rowID));
        });
        return (
        	<View key={`section_${sectionID}`}>
        		{sectionComponents}
        	</View>
    	);
    }

    _renderBody = (datas) => {
        let bodyComponents = [];
        let type = typeof datas; // object..
        if (!isArray(datas)) {
            return;
        } else {
            if (datas[0] && isArray(datas[0])) {
                datas.map((sectionData, sectionID)=>{
                    bodyComponents.push(this._renderSection(sectionData, sectionID));                    
                });
            } else {
                bodyComponents.push(this._renderSection(datas, 0));
            }
        }
        
        return bodyComponents;
    }

    render(){
        return (
            <ScrollView
                style={{ overflow: 'hidden', }}
                contentContainerStyle={{overflow: 'hidden'}}
                // scrollEnabled={false}
            	{...this.props}
                onLayout={this._onLayout}
                onContentSizeChange={this._onContentSizeChange}
            >
                {this._renderBody(this.props.alldata)}
                {this._renderFooter()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        flex: 1,
        // fontSize: 15,
        color: '#3b3b3b',
    },
    list: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },

});

