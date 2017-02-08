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
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

// https://github.com/sunnylqm/react-native-storage/blob/master/README-CHN.md

// 请勿使用require('react-native-storage')语法, 否则在react native 0.16之后的版本中会报错.
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

// sleep time expects milliseconds
function timeout (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!
// timeout(500).then(() => {
//     // Do something after the sleep!
// });

function sleep(delay)
{
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
  
//usage
//wait for 3 seconds
// sleep(3000);


// 封装用于存储app常量的方法
var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 10000,

  // 数据过期时间，默认一整天（1000 * 3600 * 24秒）
  // defaultExpires: 1000 * 3600 * 24,
  defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 更新日志
  // 0.1.3

  // 现在需要在初始化时指定存储引擎(AsyncStorage或window.localStorage)，否则数据不会持久保存。
  // 查看源码才知道。。
  /*
    constructor(options = {}) {
      let me = this;

      me._SIZE = options.size || 1000;   // maximum capacity
      me.sync = options.sync || {};      // remote sync method
      me.defaultExpires = options.defaultExpires !== undefined ?
        options.defaultExpires : 1000 * 3600 * 24;
      me.enableCache = options.enableCache !== false;
      me._s = options.storageBackend || null;
      me._innerVersion = 11;
      me.cache = {};

      if (me._s && me._s.setItem) {
        try {
          var promiseTest = me._s.setItem('__react_native_storage_test', 'test');
          me.isPromise = (promiseTest && promiseTest.then) ? true : false;
        }
        catch (e) {
          console.warn(e);
          delete me._s;
          throw e;
        }
      } else {
        console.warn(`Data would be lost after reload cause there is no storageBackend specified!
        \nEither use localStorage(for web) or AsyncStorage(for React Native) as a storageBackend.`)
      }

      me._mapPromise = me.getItem('map').then( map => {
        me._m = me._checkMap(map && JSON.parse(map) || {});
        // delete me._mapPromise;
      });
    }
  */
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage, // 好吧，文档有更新，但是我不知道。。看来当初没有watch是不应该的。。坑

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync同步方法，无缝返回最新数据。
  // https://github.com/sunnylqm/react-native-storage/issues/23
  // 如果你用的是0.1.0之前的版本，那么对于key-only的数据来说，确实没有真正意义的过期。过期后会触发同名sync函数（如果存在），如果不存在，则仍然返回过期的数据。
  // 0.1.0的版本开始，如果没有同名sync函数，则会触发catch。另外 30000表示的是30秒，而不是3分钟
  sync : {
    // 同步方法的具体说明会在后文提到
  }
})

var storageUtil = Object.assign({}, Storage.prototype, {

  // 封装用于存储app常量的方法
  storage : storage,
  /*
       最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
       对于web : window.storage = storage;
       对于react native : global.storage = storage;
       这样在之后的任意位置即可以直接调用storage
  */
  initialStorage : function(globalStorage) {
    this.storage = globalStorage;
  },

  setKeyValue : function(strKey, objectValue) {
    // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
    // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。

    var _this = this;

    return new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      // 存储
      _this.storage.save({
        key: strKey,  //注意:请不要在key中使用_下划线符号!
        rawData: objectValue,

        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        // expires: 1000 * 3600
        expires: null,
      }).then(ret => {
        //如果找到数据，则在then方法中返回
        // console.log(ret.userid);
        // return ret.value;
        // return ret;
        // if (/* 一切正常 */ret) {
        //   resolve(ret);
        // }

        resolve(ret);

      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err);
        // return err;
        reject(err);
      });
    });
  },

  setKeyIdValue : function(strKey, strId, objectValue) {
    // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
    // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。

    var _this = this;
    return new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      // 存储
      _this.storage.save({
        key: strKey,  // 注意:请不要在key中使用_下划线符号!
        id: strId,   // 注意:请不要在id中使用_下划线符号!
        rawData: objectValue,
        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        // expires: 1000 * 3600
        expires: null,
      }).then(ret => {
        //如果找到数据，则在then方法中返回
        // console.log(ret.userid);
        // return ret.value;
        // return ret;
        // if (/* 一切正常 */ret) {
        //   resolve(ret);
        // }

        resolve(ret);

      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err);
        // return err;
        reject(err);
      });
    });
  },

  getValue : function(strKey, strId) {

    var _this = this;

    let flag = true;
    let result = null;

    var promise = new Promise(function(resolve, reject) {
      let params = strId ? {
        key: strKey,
        id: strId,

        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
        autoSync: true,

        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用同步方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true
      } : {
        key: strKey,

        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
        autoSync: true,

        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用同步方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true        
      }

      // 做一些异步操作的事情，然后……
      // 读取
      _this.storage.load(params).then(ret => {
        //如果找到数据，则在then方法中返回
        // console.log(ret.userid);
        // return ret.value;
        // return ret;
        // if (/* 一切正常 */ret) {
        //   resolve(ret);
        // }
        resolve(ret);
        flag = false;
        result = ret;
      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err);
        // return err;
        reject(err);
        flag = false;
      });
    });
    return promise; // 返回 promise ，异步
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
  getBatchData : function(arr) {

    var _this = this;

    var promise = new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      // 读取批量数据

      // 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
      // 会在需要时分别调用相应的同步方法，最后统一返回一个有序数组。
      // storage.getBatchData([
      //     { key: 'loginState' },
      //     { key: 'checkPoint', syncInBackground: false },
      //     { key: 'balance' },
      //     { key: 'user', id: '1009' }
      // ])
      // .then(results => {
      //   results.forEach( result => {
      //     console.log(result);
      //   })
      // })

      _this.storage.getBatchData(arr).then(ret => {
        //如果找到数据，则在then方法中返回
        // console.log(ret.userid);
        // return ret.value;
        // return ret;
        // if (/* 一切正常 */ret) {
        //   resolve(ret);
        // }

        resolve(ret);

      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err);
        // return err;
        reject(err);

      });


    });

    return promise;


  },

  getBatchDataWithIds : function(strKey, arr) {

    var _this = this;

    var promise = new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      // 读取批量数据

      //根据key和一个id数组来读取批量数据
      // storage.getBatchDataWithIds({
      //   key: 'user',
      //   ids: ['1001', '1002', '1003']
      // })
      // .then( ... )

      _this.storage.getBatchDataWithIds({
        key: strKey,
        ids: arr
      }).then(ret => {
        //如果找到数据，则在then方法中返回
        // console.log(ret.userid);
        // return ret.value;
        // return ret;
        // if (/* 一切正常 */ret) {
        //   resolve(ret);
        // }

        resolve(ret);

      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err);
        // return err;
        reject(err);

      });


    });

    return promise;


  },

  getIdsForKey : function(strKey) {
    // 获取某个key下的所有id
    var _this = this;

    var promise = new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      // 获取某个key下的所有id
      _this.storage.getIdsForKey(strKey).then(ret => {
        //如果找到数据，则在then方法中返回
        // console.log(ret.userid);
        // return ret.value;
        // return ret;
        // if (/* 一切正常 */ret) {
        //   resolve(ret);
        // }

        resolve(ret);

      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err);
        // return err;
        reject(err);

      });


    });

    return promise;


  },
  
  getAllDataForKey : function(strKey) {
    // 获取某个key下的所有数据
    var _this = this;

    var promise = new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      // 获取某个key下的所有数据
      _this.storage.getAllDataForKey(strKey).then(ret => {
        //如果找到数据，则在then方法中返回
        // console.log(ret.userid);
        // return ret.value;
        // return ret;
        // if (/* 一切正常 */ret) {
        //   resolve(ret);
        // }

        resolve(ret);

      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        // console.warn(err);
        // return err;
        reject(err);

      });


    });

    return promise;


  },

  // --------------------------------------------------

  removeKey : function(strKey, strId) {
    // 删除单个数据
    var _this = this;
    let params = strId ? {
      key: strKey,
      id: strId,
    } : {
      key: strKey,     
    }

    return new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      // 删除
      _this.storage.remove(params).then(ret => {

        resolve(ret);

      }).catch(err => {

        reject(err);

      });


    });

  },

  clearMap : function(strKey) {
    // !! 清除某个key下的所有数据
    var _this = this;

    return new Promise(function(resolve, reject) {
      // 做一些异步操作的事情，然后……
      if (strKey) {
        // !! 清除某个key下的所有数据
        _this.storage.clearMapForKey(strKey).then(ret => {

          resolve(ret);

        }).catch(err => {

          reject(err);

        });
      } else {
        // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
        _this.storage.clearMap().then(ret => {

          resolve(ret);

        }).catch(err => {

          reject(err);

        });
      }

    });

  },

});

module.exports.storageUtil = storageUtil;


/* 示例
 *
 // 使用key和id来保存数据，一般是保存同类别（key）的大量数据。
  // 这些"key-id"数据有一个保存上限，即在初始化storage时传入的size参数。
  // 在默认上限参数下，第1001个数据会覆盖第1个数据。
  // 覆盖之后，再读取第1个数据，会返回catch或是相应的同步方法。
  var userA = {
    name: 'A',
    age: 20,
    tags: [
      'geek',
      'nerd',
      'otaku'
    ]
  };

  storage.save({
    key: 'user',  // 注意:请不要在key中使用_下划线符号!
    id: '1001',   // 注意:请不要在id中使用_下划线符号!
    rawData: userA,
    expires: 1000 * 60
  });

  //load 读取
  storage.load({
    key: 'user',
    id: '1001'
  }).then(ret => {
    // 如果找到数据，则在then方法中返回
    console.log(ret.userid);
  }).catch(err => {
    // 如果没有找到数据且没有同步方法，
    // 或者有其他异常，则在catch中返回
    console.warn(err);
  })

// --------------------------------------------------

// 获取某个key下的所有id
storage.getIdsForKey('user').then(ids => {
    console.log(ids);
});

// 获取某个key下的所有数据
storage.getAllDataForKey('user').then(users => {
    console.log(users);
});

// !! 清除某个key下的所有数据
storage.clearMapForKey('user');

// --------------------------------------------------

// 删除单个数据
storage.remove({
    key: 'lastPage'
});
storage.remove({
    key: 'user',
    id: '1001'
});

// !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
storage.clearMap();


// 同步远程数据（刷新）
storage.sync = {
  //同步方法的名字必须和所存数据的key完全相同
  //方法接受的参数为一整个object，所有参数从object中解构取出
  //这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  user(params){
    let { id, resolve, reject } = params;
    fetch('user/', {
      method: 'GET',
      body: 'id=' + id
    }).then(response => {
      return response.json();
    }).then(json => {
      //console.log(json);
      if(json && json.user){
        storage.save({
          key: 'user',
          id,
          rawData: json.user
        });
        // 成功则调用resolve
        resolve && resolve(json.user);
      }
      else{
        // 失败则调用reject
        reject && reject(new Error('data parse error'));
      }
    }).catch(err => {
      console.warn(err);
      reject && reject(err);
    });
  }
}

// 有了上面这个sync方法，以后再调用storage.load时，如果本地并没有存储相应的user，那么会自动触发storage.sync.user去远程取回数据并无缝返回。

storage.load({
  key: 'user',
  id: '1002'
}).then(...)

// 读取批量数据

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

// 这两个方法除了参数形式不同，还有个值得注意的差异。
// getBatchData会在数据缺失时挨个调用不同的sync方法(因为key不同)。
// 但是getBatchDataWithIds却会把缺失的数据统计起来，将它们的id收集到一个数组中，然后一次传递给对应的sync方法(避免挨个查询导致同时发起大量请求)
// ，所以你需要在服务端实现通过数组来查询返回，还要注意对应的sync方法的参数处理（因为id参数可能是一个字符串，也可能是一个数组的字符串）。

*/
