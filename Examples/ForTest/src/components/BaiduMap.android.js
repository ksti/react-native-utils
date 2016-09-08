/*
百度地图ReactNative封装类
*/

import {PropTypes} from 'react'
import { View,requireNativeComponent } from 'react-native';

var iface = {
  name: 'RCTBaiduMap',
  propTypes: {
    ...View.propTypes,
    mode: PropTypes.number,
    trafficEnabled: PropTypes.bool,
    heatMapEnabled: PropTypes.bool,
    marker:PropTypes.array
  }
}

module.exports = requireNativeComponent('RCTBaiduMap', iface);
