
import React,{

}from 'react';
import{
    Platform,
    ToastAndroid,
}from 'react-native';

import Toast from 'react-native-root-toast';

var PublicToast={
    //显示提示文本
    showMessage(message){

        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT)
        } else {
            Toast.show(message,{
                position:0,
                duration:1000,
            })
        }
    },
    //打印文本
    logMessage(message){
        console.log(message);
    }
}

module.exports = PublicToast;
