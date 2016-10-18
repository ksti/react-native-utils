/**
 * @author GJS <1353990812@qq.com>
 *
 * GJS reserves all rights not expressly granted.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 GJS
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * 
 */

'use strict';

const GlobalStorageUtil = {

    getValue : function(strKey, strId, callback) {
      //读取信息
      if (global.storageUtil) {
        global.storageUtil.getValue(strKey, strId)
        .then((result)=>{
            console.log('result: ' + result);
            if (callback) {
              callback(null, result);
            };
        })
        .catch((error)=>{
            console.log('error: ' + error);
            if (callback) {
              callback(error, null);
            };
        })
      } else {
        if (callback) {
          callback({message: 'global.storageUtil is null'}, null);
        };
      }
    },

    setKeyValue : function(strKey, objectValue, callback) {
        //保存信息
        if (global.storageUtil) {
          global.storageUtil.setKeyValue(strKey, objectValue).then((result) => {
              console.log('result: ' + result);
              if (callback) {
                callback(null, true);
              };
          }).catch(error => {
              console.log('error: ' + error);
              if (callback) {
                callback(error, null);
              };
          });
        } else {
          if (callback) {
            callback({message: 'global.storageUtil is null'}, null);
          };
        }
    },

    setKeyIdValue : function(strKey, strId, objectValue, callback) {
        //保存信息
        if (global.storageUtil) {
          global.storageUtil.setKeyValue(strKey, strId, objectValue).then((result) => {
              console.log('result: ' + result);
              if (callback) {
                callback(null, true);
              };
          }).catch(error => {
              console.log('error: ' + error);
              if (callback) {
                callback(error, null);
              };
          });
        } else {
          if (callback) {
            callback({message: 'global.storageUtil is null'}, null);
          };
        }
    },

    removeKey : function(strKey, strId, callback) {
      //保存信息
      if (global.storageUtil) {
        global.storageUtil.removeKey(strKey, strId).then((result) => {
            console.log('result: ' + result);
            if (callback) {
              callback(null, true);
            };
        }).catch(error => {
            console.log('error: ' + error);
            if (callback) {
              callback(error, null);
            };
        });
      } else {
        if (callback) {
          callback({message: 'global.storageUtil is null'}, null);
        };
      }
    },
}

module.exports = GlobalStorageUtil;

