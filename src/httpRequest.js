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
    };
    //encodeURIComponent(query)
  } else {
    // With no query,
  }

  console.log('---requestUrl: ' + requestUrl);
  //
  fetch(requestUrl).then((response) => {
    this._response = response;
    if (this.handleResponse) {
      return Promise.resolve();
    };
    return response.json();
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
  .catch((error) => {
    if (callback) {
      callback(error, null, this._response);
      console.log('***error: ' + error.TypeError);
    };
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
          };
          
          
      //encodeURIComponent(query)
    } else {
      // With no query,
    }
    console.log('---requestUrl: ' + requestUrl);
    console.log('---JSON.stringify(parameter): ' + JSON.stringify(parameter));

    if (!this.normal) {
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
    fetch(requestUrl, {
      method: 'GET',
      headers: this.headers?this.headers:this._defualtHeaders,
    })
    .then((response) => {
      this._response = response;
      if (this.handleResponse) {
        return Promise.resolve();
      };
      return response.json();
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
    .catch((error) => {
      if (callback) {
        callback(error, null, this._response);
        console.log('***error: ' + error);
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
  if (this.contentType == 'form') {
    headerParams = {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    bodyParams = toQueryString(parameter);
  }

  let accessToken = global.accessToken;
  if (!this.normal) {
    if (accessToken && accessToken.length > 0) {
        headerParams.Authorization = 'Bearer '+ accessToken;
    }
  };  

  this._setDefualtHeader(headerParams);
  if (this.headers) {
    this.setRequestHeader(this.headers); // 合并 this.defualtHeaders
  };

  console.log('post-header', this.headers?this.headers:this._defualtHeaders);

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
  .catch((error) => {
    if (callback) {
      callback(error, null, this._response); //
      console.log('***error: ' + error);
    };
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

  if (!this.normal) {
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
      console.log('DONE!');
      if (this.cancelled) {
        this.cancelled = false;
        return;
      }
      if (xhr.status === 200) {
        alert('Download complete!');
      } else if (xhr.status !== 0) {
        alert('Error: Server returned HTTP status of ' + xhr.status + ' ' + xhr.responseText);
      } else {
        alert('Error: ' + xhr.responseText);
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

  xhr.open('GET', requestUrl);
  var _allHeaders = this.headers?this.headers:this._defualtHeaders;
  Object.keys(_allHeaders).map((id, index) => {
      xhr.setRequestHeader(id, _allHeaders[id]);
  })
  // xhr.responseType = "arraybuffer"; // arraybuffer
  // xhr.responseType = "blob"; // blob
  // xhr.responseType = "text"; // text
  xhr.responseType = this.responseType?this.responseType:'';

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
  if (this.contentType == 'form') {
    headerParams = {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    bodyParams = toQueryString(parameter);
  }

  let accessToken = global.accessToken;
  if (!this.normal) {
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
      var index = xhr.responseText.indexOf('http://www.posttestserver.com/');
      if (index === -1) {
        alert(
          'Upload failed',
          'Invalid response payload.'
        );
        return;
      }
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

  _upload();
}

module.exports = httpRequest;
