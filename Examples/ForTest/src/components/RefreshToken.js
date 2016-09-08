import React,{

}from 'react';
import{
    Platform,
    ToastAndroid,
}from 'react-native';

import Toast from 'react-native-root-toast';
import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from '../common/GlobalSize'

import { Actions } from 'react-native-router-flux';
let HTTPRequest = new httpRequest();

var RefreshToken={

    refreshToken(){
        //显示提示文本
        let parameter = {
            grant_type:'refresh_token',
            refresh_token:global.refreshToken,
        }
        console.log('refresh_token:',global.refresh_token);
        let urlStr = GlobalSize.BaseURL+'passport/oauth/token';
        HTTPRequest.requestPostWithUrl(urlStr,parameter,function(error,responseData, response){
            if (error) {
                console.log('登录失败');
                Actions.loginIn();
            }else {
                console.log('token刷新成功'+responseData);
                // Actions.tabbar();
            }
        })
    }
}

module.exports = RefreshToken;
