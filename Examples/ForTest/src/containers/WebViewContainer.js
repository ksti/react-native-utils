import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar';

import BaseContainer  from './BaseContainer'

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    webViewStyle: {
        flex: 1
    }
});

export default class WebViewContainer extends BaseContainer {
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){
        console.log('请求地址:'+this.props.url);
        if (this.props.url) {
            //网络请求流程详情
        }else{
            alert('not found');
        }
    }
    render() {
        return (
                <View style={[styles.container, this.props.style]}>
                    {this.defaultRenderNavigationBar()}
                    <WebView style={styles.webViewStyle}
                        automaticallyAdjustContentInsets={false}
                        source={{uri:this.props.url}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        startInLoadingState={true}
                        scalesPageToFit={true}
                        />
                </View>
        );
    }
}
