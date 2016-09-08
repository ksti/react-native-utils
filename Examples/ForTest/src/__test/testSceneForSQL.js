// import React from 'react-native';

import React,{Component} from 'react'
// import {Scene} from 'react-native-router-flux';
// 
// // test list
// import TestsListView from './testsListView'
// // test pages
// // import TestFile from './testFile'
// import TestImagePicker from './testImagePicker'
// import TestPopupPage from './testPopupPage'
// import TestPopupSelecter from './testPopupSelecter'
// import SQLiteDemo from '../Page/SQLiteDemo'
// import ProjReadyHome from '../Page/PreValidate/ProjReadyHome'
import {Scene} from 'react-native-router-flux';

import SQLiteDemo from '../Page/BaseConstruct/SQLiteDemo'
import ProjReadyHome from '../Page/PreValidate/ProjReadyHome'


module.exports =
(<Scene key='SQL'>
    <Scene key="SQLDemo" hideNavBar={true} component={SQLiteDemo} />
    <Scene key="SQLReady" hideNavBar={true} component={ProjReadyHome} />
</Scene>);
