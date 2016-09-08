/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';

import { AppRegistry } from 'react-native';
import App from './App';

console.ignoredYellowBox = [
  // github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];
// console.disableYellowBox= true;


  // BackAndroid.addEventListener('hardwareBackPress',function(){
  //      ToastAndroid.show('收到点击返回键信息...',ToastAndroid.SHORT);
  //       Actions.pop();
  //       return true;
  // });




AppRegistry.registerComponent('ForTest', () => App);
