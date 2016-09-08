
import React, { Component } from 'react';
import {AppState} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './src/reduxDataFlow/reducers';
import AppRoot from './AppRoot';

import {storageUtil} from 'react-native-utils-gjs'
import GlobalSize from './src/common/GlobalSize'

//apply thunk
const createStoreWithThunk = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithThunk(reducer);

var storeState = store.getState();
console.log(storeState);
global.storageUtil = storageUtil;

export default class App extends Component {
    componentDidMount(){
        console.log('App.js DidMount:',AppState.currentState);
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount(){
        console.log('App.js willUnMount');
        AppState.removeEventListener('change',this._handleAppStateChange);
    }
    _handleAppStateChange=(appState)=>{
        console.log('Change AppState:',appState);
        let currentDate = new Date();
        if (appState == 'inactive') {
            //记录当前时间
            global.storageUtil.setKeyValue('inactiveTime',currentDate);
        }else if (appState == 'background') {
            //inactive->background---唤醒--->active
        }else {//active
            
        }
    }



	render() {
		return (
			<Provider store={store}>
			    <AppRoot />
			</Provider>
		);
	}
}
