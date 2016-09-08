
import React,{Component} from 'react'
import {Scene} from 'react-native-router-flux';

import Login from './src/Page/Login'
import InitialRoot from './src/Page/InitialRoot'

module.exports =
(
	<Scene key="root" hideNavBar={true}>
	    <Scene key='initialRoot' component={InitialRoot}/>
	    <Scene key='loginIn' type='reset' initial={true} component={Login}/>
	    {require('./src/Page/Project1/Scenes')}
	    {require('./src/__test/scenesForTest')}
	</Scene>
    
);




