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
 * @providesModule httpRequest
 * @flow
 */

/**
 * @param {Object} obj
 * @return {String}
 */
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

// fetch(url, {
//     method: 'post',
//     body: toQueryString({
//         'firstParam': 'yourValue',
//         'secondParam':'yourOtherValue'
//     })
// })

// fetch with time out
function _fetch(fetch_promise, timeout) {
    if (!timeout) {
      return fetch_promise;
    };
    var abort_fn = null;

    //这是一个可以被reject的promise
    var abort_promise = new Promise(function(resolve, reject) {
           abort_fn = function() {
              // reject('abort promise');
              reject({
                TypeError: 'HTTP Error 408 - Request Timeout',
                code: 408,
                message: 'time out',
              });
           };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
     var abortable_promise = Promise.race([
           fetch_promise,
           abort_promise
     ]);

     setTimeout(function() {
           abort_fn();
      }, timeout);

     return abortable_promise;
}

//usage:
// _fetch(fetch('//a.com/b/c'), 2000)
//     .then(function(res) {
//         console.log(res)
//     }, function(err) {
//         console.log(err);
//     });


// Promise to execute the func
function _Promise(func: Function) {
    if (typeof func === 'function') {
      return new Promise(function(resolve, reject) {
        // 做一些异步操作的事情，然后……
        // 执行 func
        try {
          let ret = func();
          resolve(ret);
        } catch (err) {
          reject(err);
        }
      });
    };
}



/**
 * @param {String} url
 * @param {String} username
 * @param {String} password
 * @return {String}
 */
function strUrlForFtpSite(url, username, password) { 
  return "ftp://" + username 
  + ":" + password + "@" + url;
}

/**
 * 保留引用
 */
var _this = null

/**
 * @param
 * @param
 * @param
 * @return
 */
function httpRequest(normal: Boolean) {

  /**
   * 保存服务器返回的原始数据
   */
  this._response = null;

  /**
   * 是否自行处理服务器返回的原始数据
   */
  this.handleResponse = false;

  /**
   * 内置 XMLHttpRequest
   */
  this.xhr = new XMLHttpRequest();

  /**
   * 取消状态
   */
  this.cancelled = false;

  /**
   * 请求超时
   */
  this.timeout = 30000;

  /**
   * 请求内容类型，对应设置不同的请求头和body
   */
  this.contentType = 'json';

  /**
   * 保存服务器返回的原始数据
   */
  this.normal = normal ? normal : false;

  /**
   * @private
   * 默认请求头部信息
   */
  this.defualtHeaders = {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
    'Content-Type': 'application/json',
  };

  /**
   * @private
   * 默认请求头部信息
   */
  this._defualtHeaders = {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
    'Content-Type': 'application/json',
  };

  /**
   * 由外部自定义头部信息，推荐通过setRequestHeader
   */
  this.headers = null;

  /**
   * @param {Object} headers
   * 设置默认请求头部信息
   */
  this.setRequestHeader = function(headers: Object) {
    this.headers = Object.assign({}, this.defualtHeaders, this.headers, headers);
  }

  /**
   * @private
   * @param {Object} headers
   * 设置默认请求头部信息
   */
  this._setDefualtHeader = function(headers: Object) {
    this._defualtHeaders = Object.assign({}, this._defualtHeaders, headers);
  }

  /**
   * @param {Number} timeout
   * 设置请求超时
   */
  this.setTimeout = function(timeout: Number) {
    this.timeout = timeout;
  }

};



/**
 * @param {Object} headers
 * 设置默认请求头部信息
 */
httpRequest.prototype.setRequestHeader = function(headers: Object) {
  this.headers = Object.assign({}, this.defualtHeaders, this.headers, headers);
}

/**
 * @param {String} apiUrl
 * @param {Object} parameter
 * @param {Function} callback
 */
httpRequest.prototype.requestWithUrl = function(apiUrl: string, parameter: Object, callback: Function) {
  this._response = null; // 清空response
  var requestUrl = apiUrl;
  if (parameter) { // parameter 直接进来就是json对象
    /*
    //jsonParameter = JSON.parse(parameter);
    jsonParameter = JSON.stringify(parameter);
    if (jsonParameter) {
      console.log('---jsonParameter: ' + jsonParameter);
      requestUrl += '?';
      for(var key in parameter){
        requestUrl += (key + '=' + parameter[key] + '&');
      }

      //encodeURIComponent(query)
    }
    */
    if (Object.keys(parameter).length > 0) {
      requestUrl += '?';
      for(var key in parameter){
        requestUrl += (key + '=' + parameter[key] + '&');
      }
      requestUrl = requestUrl.substring(0,requestUrl.length-1);
    };
    //encodeURIComponent(query)
  } else {
    // With no query,
  }

  console.log('---requestUrl: ' + requestUrl);
  //
  /* 保存代码，加入 timeout
  fetch(requestUrl).then((response) => {
    this._response = response;
    if (this.handleResponse) {
      return Promise.resolve();
    };
    return response.json();
  },
  err => {
    if (callback) {
      callback(err, null, this._response);
      console.log('***error: ' + error.TypeError);
    };
  })
  .then((responseData) => {
    if (callback) {
      console.log('***responseData: ' + responseData);
      callback(null, responseData, this._response); // (error, responseData, response)
    }
  },
  err => {
    if (callback) {
      callback(err, null, this._response); // (error, responseData, response)
    }
  })
  .done();
  */
    _fetch(fetch(requestUrl), this.timeout)
    .then((response) => {
      this._response = response;
      if (this.handleResponse === true) {
        return Promise.resolve();
      };
      return response.json();
    },
    err => {
      return Promise.reject(err);
    })
    .then((responseData) => {
      if (callback) {
        console.log('***responseData: ' + responseData);
        callback(null, responseData, this._response); // (error, responseData, response)
      }
    },
    err => {
      if (callback) {
        callback(err, null, this._response); // (error, responseData, response)
      }
    })
    .done();
},

/**
 * @param {String} apiUrl
 * @param {Object} parameter
 * @param {Function} callback
 */
httpRequest.prototype.requestGetWithUrl = function(apiUrl: string, parameter: Object, callback: Function) {
    this._response = null; // 清空response
    var requestUrl = apiUrl;
    if (parameter) { // parameter 直接进来就是json对象
          /*
          //jsonParameter = JSON.parse(parameter);
          jsonParameter = JSON.stringify(parameter);
          if (jsonParameter) {
            console.log('---jsonParameter: ' + jsonParameter);
            requestUrl += '?';
            for(var key in parameter){
              requestUrl += (key + '=' + parameter[key] + '&');
            }
            //encodeURIComponent(query)
          }
          */

          if (Object.keys(parameter).length > 0) {
            requestUrl += '?';
            for(var key in parameter){
              requestUrl += (key + '=' + parameter[key] + '&');
            }
            requestUrl = requestUrl.substring(0,requestUrl.length-1);
          };
      //encodeURIComponent(query)
    } else {
      // With no query,
    }
    console.log('---requestUrl: ' + requestUrl);
    console.log('---JSON.stringify(parameter): ' + JSON.stringify(parameter));

    if (this.normal === false) {
      if (global.accessToken && global.accessToken.length > 0) {
        this._setDefualtHeader({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.accessToken,
        });
      }
    };

    if (this.headers) {
      this.setRequestHeader(this.headers); // 合并 this.defualtHeaders
    };

    //
    console.log('post-header',this.headers?this.headers:this._defualtHeaders);

    //
    /* 保留代码，加入 timeout
    .then((response) => {
      this._response = response;
      if (this.handleResponse) {
        return Promise.resolve();
      };
      return response.json();
    },
    err => {
      if (callback) {
        callback(err, null, this._response);
        console.log('***error: ' + error.TypeError);
      };
    })
    .then((responseData) => {
      if (callback) {
        console.log('***responseData: ' + responseData);
        callback(null, responseData, this._response); // (error, responseData, response)
      }
    },
    err => {
      if (callback) {
        callback(err, null, this._response); // (error, responseData, response)
      }
    })
    .done();
    */
    _fetch(fetch(requestUrl, {
      method: 'GET',
      headers: this.headers?this.headers:this._defualtHeaders,
    }), this.timeout)
    .then((response) => {
      this._response = response;
      if (this.handleResponse === true) {
        return Promise.resolve();
      };
      return response.json();
    },
    err => {
      return Promise.reject(err);
    })
    .then((responseData) => {
      if (callback) {
        console.log('***responseData: ' + responseData);
        callback(null, responseData, this._response); // (error, responseData, response)
      }
    },
    err => {
      if (callback) {
        callback(err, null, this._response); // (error, responseData, response)
      }
    })
    .done();


},

/**
 * @param {String} apiUrl
 * @param {Object} parameter
 * @param {Function} callback
 */
httpRequest.prototype.requestPostWithUrl = function(apiUrl: string, parameter: Object, callback: Function) {
  this._response = null; // 清空response

  var requestUrl = apiUrl;

  console.log('---requestUrl: ' + requestUrl);
  console.log('---contentType: ' + this.contentType);
  console.log('---JSON.stringify(parameter): ' + JSON.stringify(parameter));

  var headerParams = this._defualtHeaders;
  var bodyParams = JSON.stringify(parameter);
  if (this.contentType === 'form') {
    headerParams = {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    bodyParams = toQueryString(parameter);
  }

  let accessToken = global.accessToken;
  if (this.normal === false) {
    if (accessToken && accessToken.length > 0) {
        headerParams.Authorization = 'Bearer '+ accessToken;
    }
  };

  this._setDefualtHeader(headerParams);
  if (this.headers) {
    this.setRequestHeader(this.headers); // 合并 this.defualtHeaders
  };

  console.log('post-header', this.headers?this.headers:this._defualtHeaders);

  //
  /* 保留代码，加入 timeout
  fetch(requestUrl, {
    method: 'POST',
    headers: this.headers?this.headers:this._defualtHeaders,
    body: bodyParams,
  })
  .then((response) => {
    this._response = response;
    if (this.handleResponse) {
      return Promise.resolve();
    };
    return response.json();
  },
  err => {
    if (callback) {
      callback(err, null, this._response);
      console.log('***error: ' + error.TypeError);
    };
  })
  .then((responseData) => {
    if (callback) {
      console.log('***responseData: ' + responseData);
      callback(null, responseData, this._response); // (error, responseData, response)
    }
  },
  err => {
    if (callback) {
      callback(err, null, this._response); // (error, responseData, response)
    }
  })
  .done();
  */

  _fetch(fetch(requestUrl, {
    method: 'POST',
    headers: this.headers?this.headers:this._defualtHeaders,
    body: bodyParams,
  }), this.timeout)
  .then((response) => {
    this._response = response;
    if (this.handleResponse === true) {
      return Promise.resolve();
    };
    return response.json();
  },
  err => {
    return Promise.reject(err);
  })
  .then((responseData) => {
    if (callback) {
      console.log('***responseData: ' + responseData);
      callback(null, responseData, this._response); // (error, responseData, response)
    }
  },
  err => {
    if (callback) {
      callback(err, null, this._response); // (error, responseData, response)
    }
  })
  .done();




},

/**
 * @param {String} apiUrl
 * @param {Object} parameter
 * @param {Function} callback
 */
httpRequest.prototype.download = function(apiUrl: string, parameter: Object, callback: Function) {
  this._response = null; // 清空response
  var requestUrl = apiUrl;
  if (parameter) { // parameter 直接进来就是json对象
        /*
        //jsonParameter = JSON.parse(parameter);
        jsonParameter = JSON.stringify(parameter);
        if (jsonParameter) {
          console.log('---jsonParameter: ' + jsonParameter);
          requestUrl += '?';
          for(var key in parameter){
            requestUrl += (key + '=' + parameter[key] + '&');
          }
          //encodeURIComponent(query)
        }
        */

        if (Object.keys(parameter).length > 0) {
          requestUrl += '?';
          for(var key in parameter){
            requestUrl += (key + '=' + parameter[key] + '&');
          }
          requestUrl = requestUrl.substring(0,requestUrl.length-1);
        };
    //encodeURIComponent(query)
  } else {
    // With no query,
  }
  console.log('---requestUrl: ' + requestUrl);
  console.log('---JSON.stringify(parameter): ' + JSON.stringify(parameter));

  this._setDefualtHeader({
    'Accept': 'text/plain, application/json, application/octet-stream',
    'Accept-Charset': 'utf-8',
  });

  if (this.normal === false) {
    if (global.accessToken && global.accessToken.length > 0) {
      this._setDefualtHeader({
        'Accept': 'text/plain, application/json, application/octet-stream',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.accessToken,
      });
    }
  };

  if (this.headers) {
    this.setRequestHeader(this.headers); // 合并 this.defualtHeaders
  };

  //
  console.log('post-header',this.headers?this.headers:this._defualtHeaders);

  //
  this.xhr && this.xhr.abort();

  let errorOccured = true;
  var xhr = this.xhr || new XMLHttpRequest();
  var contentSize = 0;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.HEADERS_RECEIVED) {
      contentSize = parseInt(xhr.getResponseHeader('Content-Length'), 10);
      console.log('HEADERS_RECEIVED.');
    } else if (xhr.readyState === xhr.LOADING) {
      console.log('LOADING...');
      if (this.downloadProgress) {
        if (xhr.responseType === 'text' || xhr.responseType === '') {
          var responseText = xhr.responseText;
          if (responseText) {
            if (contentSize > 0) {
              this.downloadProgress(responseText.length / contentSize);
            };
          }
        }
      };
    } else if (xhr.readyState === xhr.DONE) {
      this._response = xhr;
      console.log('DONE!');
      if (this.cancelled === true) {
        this.cancelled = false;
        if (callback) {
            callback({message: ('cancelled: ' + xhr.response)}, null, this._response); // (error, responseData, response)
        };
        return;
      }
      if (xhr.status === 200) {
        console.log('Download complete!');
        errorOccured = false;
      } else if (xhr.status !== 0) {
        console.log('Error: Server returned HTTP status of ' + xhr.status + ' ' + xhr.response);
        if (callback) {
            callback({message: ('Error: Server returned HTTP status of ' + xhr.status + ' ' + xhr.response)}, null, this._response); // (error, responseData, response)
        };
      } else {
        console.log('Error: ' + xhr.response);
        if (callback) {
            callback({message: ('Error: ' + xhr.response)}, null, this._response); // (error, responseData, response)
        };
      }
    }
  };

  // xhr.onprogress = (oEvent) => {
  //   if (oEvent.lengthComputable) {
  //     var percentComplete = oEvent.loaded / oEvent.total;
  //     // ...
  //     if (this.updateProgress) {
  //       this.updateProgress(percentComplete, oEvent.currentTarget);
  //     };
  //   } else {
  //     // Unable to compute progress information since the total size is unknown
  //   }
  // }

  xhr.onload = (oEvent) => {
    this._response = xhr;
    if (errorOccured) {
      return;
    };
    if (xhr.responseType === 'arraybuffer' || xhr.responseType === 'blob') {
      var arrayBuffer = xhr.response; // Note: not oReq.responseText
      // var blob = xhr.response; // arraybuffer 和 blob 都可以
      if (arrayBuffer) {
        var byteArray = new Uint8Array(arrayBuffer);
        // for (var i = 0; i < byteArray.byteLength; i++) {
        //   // do something with each byte in the array
        // }
        if (callback) {
            callback(null, byteArray, this._response); // (error, responseData, response)
        };
      }
    } else if (xhr.responseType === 'text' || xhr.responseType === '' || xhr.responseType === 'json') {
      var responseText = xhr.responseText;
      if (callback) {
          callback(null, responseText, this._response); // (error, responseData, response)
      };
    } else {
      if (callback) {
          callback(null, xhr.response, this._response); // (error, responseData, response)
      };
    }

  };

  xhr.addEventListener("progress", updateProgress.bind(this));
  xhr.addEventListener("load", transferComplete.bind(this));
  xhr.addEventListener("error", transferFailed.bind(this));
  xhr.addEventListener("abort", transferCanceled.bind(this));

  // ...

  // progress on transfers from the server to the client (downloads)
  function updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total;
      // ...
      if (this.updateProgress) {
        this.updateProgress(percentComplete, oEvent.currentTarget);
      };
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }

  function transferComplete(evt) {
    console.log("The transfer is complete.");
    if (this.transferComplete) {
      this.transferComplete(evt.currentTarget.response, evt.currentTarget);
    };
  }

  function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
    if (this.transferFailed) {
      this.transferFailed(evt.currentTarget.response, evt.currentTarget);
    };
  }

  function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
    if (this.transferCanceled) {
      this.transferCanceled(evt.currentTarget.response, evt.currentTarget);
    };
  }

  xhr.open('GET', requestUrl);
  var _allHeaders = this.headers?this.headers:this._defualtHeaders;
  Object.keys(_allHeaders).map((id, index) => {
      xhr.setRequestHeader(id, _allHeaders[id]);
  })
  // xhr.responseType = "arraybuffer"; // arraybuffer
  // xhr.responseType = "blob"; // blob
  // xhr.responseType = "text"; // text
  xhr.responseType = this.responseType?this.responseType:'arraybuffer';

  xhr.send();
  this.xhr = xhr;

},

/**
 * @param {String} apiUrl
 * @param {Object} parameter
 * @param {Function} callback
 */
httpRequest.prototype.upload = function(apiUrl: string, parameter: Object, callback: Function) {
  this._response = null; // 清空response

  var requestUrl = apiUrl;

  console.log('---requestUrl: ' + requestUrl);
  console.log('---contentType: ' + this.contentType);
  console.log('---JSON.stringify(parameter): ' + JSON.stringify(parameter));

  var headerParams = this._defualtHeaders;
  var bodyParams = JSON.stringify(parameter);
  if (this.contentType === 'form') {
    headerParams = {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    bodyParams = toQueryString(parameter);
  }

  let accessToken = global.accessToken;
  if (this.normal === false) {
    if (accessToken && accessToken.length > 0) {
        headerParams.Authorization = 'Bearer '+ accessToken;
    }
  };

  this._setDefualtHeader(headerParams);
  if (this.headers) {
    this.setRequestHeader(this.headers); // 合并 this.defualtHeaders
  };

  console.log('post-header', this.headers?this.headers:this._defualtHeaders);

  _upload = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', requestUrl);

    var _allHeaders = this.headers?this.headers:this._defualtHeaders;
    Object.keys(_allHeaders).map((id, index) => {
        xhr.setRequestHeader(id, _allHeaders[id]);
    });

    xhr.onload = () => {
      this._response = xhr;
      if (xhr.status !== 200) {
        console.log(
          'Upload failed',
          'Expected HTTP 200 OK response, got ' + xhr.status
        );
        if (callback) {
            callback(
              {message: ('Upload failed: ' + 'Expected HTTP 200 OK response, got ' + xhr.status)}, 
              xhr.response, 
              this._response
            ); // (error, responseData, response)
        };
        return;
      }
      if (!xhr.responseText) {
        console.log(
          'Upload failed',
          'No response payload.'
        );
        if (callback) {
            callback(
              {message: ('Upload failed: ' + 'No response payload.')}, 
              xhr.response, 
              this._response
            ); // (error, responseData, response)
        };
        return;
      }
      // var index = xhr.responseText.indexOf('http://www.posttestserver.com/');
      // if (index === -1) {
      //   alert(
      //     'Upload failed',
      //     'Invalid response payload.'
      //   );
      //   return;
      // }
      // var url = xhr.responseText.slice(index).split('\n')[0];
      // Linking.openURL(url);

      if (this.handleResponse === true) {
        if (callback) {
            callback(
              null, 
              xhr.response, 
              this._response
            ); // (error, responseData, response)
        };
      } else {
        // try {
        //   if (callback) {
        //     console.log('***responseData: ' + JSON.parse(xhr.responseText));
        //     callback(null, JSON.parse(xhr.responseText), this._response); // (error, responseData, response)
        //   }
        // } catch (err) {
        //   if (callback) {
        //     callback(err, xhr.responseText, this._response); // (error, responseData, response)
        //   }
        // }

        _Promise(() => {
          return JSON.parse(xhr.responseText);
        })        
        .then((responseData) => {
          if (callback) {
            console.log('***responseData: ' + responseData);
            callback(null, responseData, this._response); // (error, responseData, response)
          }
        },
        err => {
          if (callback) {
            callback(err, xhr.responseText, this._response); // (error, responseData, response)
          }
        });
      }
      
    };

    var formdata = new FormData();
    // if (this.state.randomPhoto) {
    //   formdata.append('image', {...this.state.randomPhoto, name: 'image.jpg'});
    // }

    Object.keys(parameter).map((id, index) => {
        formdata.append(id, parameter[id]);
    });

    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        // // if (event.lengthComputable) {
        // //   this.setState({uploadProgress: event.loaded / event.total});
        // // }
        if (event.lengthComputable) {
          var percentComplete = event.loaded / event.total;
          // ...
          if (this.updateProgress) {
            this.updateProgress(percentComplete, event.currentTarget);
          };
        } else {
          // Unable to compute progress information since the total size is unknown
        }
      };
    }

    xhr.addEventListener("progress", updateProgress.bind(this));
    xhr.addEventListener("load", transferComplete.bind(this));
    xhr.addEventListener("error", transferFailed.bind(this));
    xhr.addEventListener("abort", transferCanceled.bind(this));

    // ...

    // progress on transfers from the server to the client (downloads)
    function updateProgress (oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
        // ...
        if (this.updateProgress) {
          this.updateProgress(percentComplete, oEvent.currentTarget);
        };
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    }

    function transferComplete(evt) {
      console.log("The transfer is complete.");
      if (this.transferComplete) {
        this.transferComplete(evt.currentTarget.responseText, evt.currentTarget);
      };
    }

    function transferFailed(evt) {
      console.log("An error occurred while transferring the file.");
      if (this.transferFailed) {
        this.transferFailed(evt.currentTarget.responseText, evt.currentTarget);
      };
    }

    function transferCanceled(evt) {
      console.log("The transfer has been canceled by the user.");
      if (this.transferCanceled) {
        this.transferCanceled(evt.currentTarget.responseText, evt.currentTarget);
      };
    }

    xhr.send(formdata);
    this.xhr = xhr;
  }

  _upload();
},

/**
 * @param {String} apiUrl
 * @param {Object} parameter
 * @param {Function} callback
 * 暂时不支持 FTP, 要支持FTP需自己用原生代码实现, 导出为组件供 js 调用, Android 和 iOS 各自实现一套
 * fetch 和 利用 XMLHttpRequest 最终都是调用的原生组件：RCTNetwork
 * RCTNetwork 目前只支持(canHandleRequest)5种request:
 * 1.RCTHTTPRequestHandler
 * 2.RCTFileRequestHandler
 * 3.RCTDataRequestHandler
 * 4.RCTImage/RCTImageStoreManager
 * 5.RCTImage/RCTImageLoader
 */
httpRequest.prototype.uploadFTP = function(apiUrl: string, username: string, password: string, parameter: Object, callback: Function) {
  this._response = null; // 清空response

  var requestUrl = apiUrl;

  console.log('---requestUrl: ' + requestUrl);
  console.log('---contentType: ' + this.contentType);
  console.log('---JSON.stringify(parameter): ' + JSON.stringify(parameter));

  var headerParams = this._defualtHeaders;
  var bodyParams = JSON.stringify(parameter);
  if (this.contentType === 'form') {
    headerParams = {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    bodyParams = toQueryString(parameter);
  }

  let accessToken = global.accessToken;
  if (this.normal === false) {
    if (accessToken && accessToken.length > 0) {
        headerParams.Authorization = 'Bearer '+ accessToken;
    }
  };

  this._setDefualtHeader(headerParams);
  if (this.headers) {
    this.setRequestHeader(this.headers); // 合并 this.defualtHeaders
  };

  console.log('post-header', this.headers?this.headers:this._defualtHeaders);

  var xhr = new XMLHttpRequest();
  var ftpUrl = strUrlForFtpSite(requestUrl, username, password);
  xhr.open('PUT', ftpUrl, true, username, password);

  var _allHeaders = this.headers?this.headers:this._defualtHeaders;
  Object.keys(_allHeaders).map((id, index) => {
      xhr.setRequestHeader(id, _allHeaders[id]);
  });

  xhr.onload = () => {
    if (xhr.status !== 200) {
      alert(
        'Upload failed',
        'Expected HTTP 200 OK response, got ' + xhr.status
      );
      return;
    }
    if (!xhr.responseText) {
      alert(
        'Upload failed',
        'No response payload.'
      );
      return;
    }
    // var index = xhr.responseText.indexOf('http://www.posttestserver.com/');
    // if (index === -1) {
    //   alert(
    //     'Upload failed',
    //     'Invalid response payload.'
    //   );
    //   return;
    // }
    // var url = xhr.responseText.slice(index).split('\n')[0];
    // Linking.openURL(url);
  };

  var formdata = new FormData();
  // if (this.state.randomPhoto) {
  //   formdata.append('image', {...this.state.randomPhoto, name: 'image.jpg'});
  // }

  Object.keys(parameter).map((id, index) => {
      formdata.append(id, parameter[id]);
  });

  if (xhr.upload) {
    xhr.upload.onprogress = (event) => {
      console.log('upload onprogress', event);
      // // if (event.lengthComputable) {
      // //   this.setState({uploadProgress: event.loaded / event.total});
      // // }
      if (event.lengthComputable) {
        var percentComplete = event.loaded / event.total;
        // ...
        if (this.updateProgress) {
          this.updateProgress(percentComplete, event.currentTarget);
        };
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    };
  }

  xhr.addEventListener("progress", updateProgress.bind(this));
  xhr.addEventListener("load", transferComplete.bind(this));
  xhr.addEventListener("error", transferFailed.bind(this));
  xhr.addEventListener("abort", transferCanceled.bind(this));

  // ...

  // progress on transfers from the server to the client (downloads)
  function updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total;
      // ...
      if (this.updateProgress) {
        this.updateProgress(percentComplete, oEvent.currentTarget);
      };
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }

  function transferComplete(evt) {
    console.log("The transfer is complete.");
    if (this.transferComplete) {
      this.transferComplete(evt.currentTarget.responseText, evt.currentTarget);
    };
  }

  function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
    if (this.transferFailed) {
      this.transferFailed(evt.currentTarget.responseText, evt.currentTarget);
    };
  }

  function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
    if (this.transferCanceled) {
      this.transferCanceled(evt.currentTarget.responseText, evt.currentTarget);
    };
  }

  xhr.send(formdata);
  this.xhr = xhr;
}

module.exports = httpRequest;
