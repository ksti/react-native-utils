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
        // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
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
        // 使用key和id来保存数据，一般是保存同类别（key）的大量数据。
        // 这些"key-id"数据有一个保存上限，即在初始化storage时传入的size参数。
        // 在默认上限参数下，第1001个数据会覆盖第1个数据。
        // 覆盖之后，再读取第1个数据，会返回catch或是相应的同步方法。
        if (global.storageUtil) {
          global.storageUtil.setKeyIdValue(strKey, strId, objectValue).then((result) => {
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

    getIdsForKey : function(strKey, callback) {
      // 获取某个key下的所有id
      if (global.storageUtil) {
        global.storageUtil.getIdsForKey(strKey).then((result) => {
            console.log('result: ' + result);
            if (callback) {
              callback(null, result);
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

    getAllDataForKey : function(strKey, callback) {
      // 获取某个key下的所有数据
      if (global.storageUtil) {
        global.storageUtil.getAllDataForKey(strKey).then((result) => {
            console.log('result: ' + result);
            if (callback) {
              callback(null, result);
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

    /*
    // 读取批量数据
    // getBatchData 和 getBatchDataWithIds
    // 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
    // 会在需要时分别调用相应的同步方法，最后统一返回一个有序数组。
    storage.getBatchData([
        { key: 'loginState' },
        { key: 'checkPoint', syncInBackground: false },
        { key: 'balance' },
        { key: 'user', id: '1009' }
    ])
    .then(results => {
      results.forEach( result => {
        console.log(result);
      })
    })

    //根据key和一个id数组来读取批量数据
    storage.getBatchDataWithIds({
      key: 'user',
      ids: ['1001', '1002', '1003']
    })
    .then( ... )

    getBatchData 和 getBatchDataWithIds 这两个方法除了参数形式不同，还有个值得注意的差异。
    getBatchData会在数据缺失时挨个调用不同的sync方法(因为key不同)。
    但是getBatchDataWithIds却会把缺失的数据统计起来，将它们的id收集到一个数组中，然后一次传递给对应的sync方法(避免挨个查询导致同时发起大量请求)，
    所以你需要在服务端实现通过数组来查询返回，还要注意对应的sync方法的参数处理（因为id参数可能是一个字符串，也可能是一个数组的字符串）。
    */
    getBatchData : function(arr, callback) {
      if (global.storageUtil) {
        global.storageUtil.getBatchData(arr).then((result) => {
            console.log('result: ' + result);
            if (callback) {
              callback(null, result);
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
    
    getBatchDataWithIds : function(strKey, arr, callback) {
      if (global.storageUtil) {
        global.storageUtil.getBatchDataWithIds(strKey, arr).then((result) => {
            console.log('result: ' + result);
            if (callback) {
              callback(null, result);
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
      // 删除单个数据
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

    clearMap : function(strKey, callback) {
      // !! 清除某个key下的所有数据
      if (global.storageUtil) {
        global.storageUtil.clearMap(strKey).then((result) => {
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

