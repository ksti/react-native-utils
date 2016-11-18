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
 * @providesModule FlowLayoutItemView
 * @flow
 */

/*
 * 瀑布流模块布局视图
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

export default class FlowLayoutItemView extends Component {
	static propTypes = {
        style: View.propTypes.style,
        /*
         * 被平分的宽度
         */
        width: PropTypes.number,
        /*
         * 每行的item数量
         */
        rowItemNumber: PropTypes.number,
        /*
         * 数据源
         */
        dataSource: PropTypes.array,        
        /*
         * 文本高度
         */
        itemTextHeight: PropTypes.string,
        /*
         * 图片最小宽度
         */
        minImageWidth: PropTypes.string,
        /*
         * 文本样式
         */
        textStyle: PropTypes.object,
    };

    static defaultProps = {
        width: Dimensions.get('window').width,
    };

    constructor(props) {
        super(props);
    }

    _renderFlowLayoutList = () => {
      return(
        <View
          style={[styles.container, this.props.style, {width: this.props.width}]}
        >
          <ListView
              enableEmptySections={true}
              contentContainerStyle={styles.list}
              dataSource={this.props.dataSource}
              renderRow={this._renderRow}
          />
        </View>
      )
    }

    /*
     * 渲染item
    */
    _renderRow = (rowData, sectionID, rowID) => {
        let data = rowData.name;
        let minImageWidth = this.props.minImageWidth || 25;

        let rowItemNumber = this.props.rowItemNumber || 4;
        let margin = 4;
        let textTopMargin = 5;
        let textHeight = this.props.itemTextHeight || 20;
        let equalWidth = (this.props.width - margin * 2 * rowItemNumber) / rowItemNumber;
        let equalHeight = (this.props.width - margin * 2 * rowItemNumber) / rowItemNumber + textHeight;
        let imageWidth = Math.min(equalWidth - 20, minImageWidth);
        let imageHeight = Math.min(equalWidth - 20, minImageWidth);
        equalHeight = imageHeight + textTopMargin + textHeight;
        return (
            <TouchableHighlight
                key={`${rowID}`}
                style={{ backgroundColor: "#ffffff", }}
                underlayColor="#ffffff"
                onPress={() => { this.props.onPress &&this.props.onPress(rowData, sectionID, rowID) } }>
                <View
                    style={{ width: equalWidth, height: equalHeight, alignItems: 'center', margin: margin, marginBottom: 10, }}>
                    <Image
                        style={{ width: imageWidth, height: imageHeight, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center', }}
                        source={rowData.image} />
                    <Text
                        style={[styles.text, { alignItems: "center", justifyContent: 'center', marginTop: textTopMargin }, this.props.textStyle]}>{data}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render(){
        return this._renderFlowLayoutList();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        justifyContent: 'flex-start' || 'space-around',
        paddingLeft: 0,
        paddingRight: 0
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        color: '#3b3b3b', //标题黑色
        fontSize: 14,
    },
});

