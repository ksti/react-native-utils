
import { combineReducers } from 'redux'

var assign = require('object-assign');

import LoginReducer from './LoginReducer'
import FlowCenterReducer from './FlowCenterReducer'

var reducers = assign({},
	LoginReducer,
	FlowCenterReducer,
);

module.exports = reducers;
