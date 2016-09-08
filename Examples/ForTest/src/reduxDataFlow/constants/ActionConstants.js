/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

var keyMirror = require('keymirror');
var assign = require('object-assign');

import * as ActionConstants from './ActionConstantsIndex'

/* 参考写法
module.exports = keyMirror({

    //Login
    LOGIN_DOING: null,//loading
    LOGIN_IN: null,//logined in
    LOGIN_ERROR: null,//login error
    LOGIN_OUT: null,//exit out
});
*/


module.exports = assign({},
    ActionConstants,
);
