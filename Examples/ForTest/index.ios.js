/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { AppRegistry } from 'react-native';

import App from './App';

console.ignoredYellowBox = [
  // github.com/facebook/react-native/issues/9093
  'Warning: You are manually calling a React.PropTypes validation',
];
console.disableYellowBox = true;
AppRegistry.registerComponent('ForTest', () => App);
