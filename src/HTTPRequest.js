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
 * 保存服务器返回的原始数据
 */
var _response = null

/**
 * @param {Array} result
 * @param {Array} keys
 * @param {String} value
 */
var httpRequest = {

  /**
   * 请求内容类型，对应设置不同的请求头和body
   */
  contentType: 'json',

  /**
   * @private
   * 默认请求头部信息
   */
  _defualtHeaders: {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
    'Content-Type': 'application/json',
  },

  /**
   * 由外部自定义头部信息，推荐通过setRequestHeader
   */
  headers: null,

  /**
   * @param {Object} headers
   * 设置默认请求头部信息
   */
  setRequestHeader: function(headers: Object) {
    this.headers = Object.assign({}, this._defualtHeaders, this.headers, headers);
  },

  /**
   * @private
   * @param {Object} headers
   * 设置默认请求头部信息
   */
  _setDefualtHeader: function(headers: Object) {
    this._defualtHeaders = Object.assign({}, this._defualtHeaders, headers);
  },

  /**
   * @param {String} apiUrl
   * @param {Object} parameter
   * @param {Function} callback
   */
  requestWithUrl: function(apiUrl: string, parameter: Object, callback: Function) {
    _response = null; // 清空response
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
      requestUrl += '?';
      for(var key in parameter){
        requestUrl += (key + '=' + parameter[key] + '&');
      }
      //encodeURIComponent(query)
    } else {
      // With no query,
    }

    console.log('---requestUrl: ' + requestUrl);
    //
    fetch(requestUrl).then((response) => {
      _response = response;
      return response.json()
    })
    .then((responseData) => {
      if (callback) {
        console.log('***responseData: ' + responseData);
        callback(null, responseData, _response); // (error, responseData, response)
      };
    })
    .catch((error) => {
      if (callback) {
        callback(error, null, _response);
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
  requestGetWithUrl: function(apiUrl: string, parameter: Object, callback: Function) {
      _response = null; // 清空response
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

            requestUrl += '?';
            for(var key in parameter){
              requestUrl += (key + '=' + parameter[key] + '&');
            }
        //encodeURIComponent(query)
      } else {
        // With no query,
      }
      console.log('---requestUrl: ' + requestUrl);
      console.log('---JSON.stringify(parameter): ' + JSON.stringify(parameter));

      if (global.accessToken && global.accessToken.length > 0) {
        this._setDefualtHeader({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.accessToken,
        });
      }

      if (this.headers) {
        this.setRequestHeader(this.headers); // 在_setDefualtHeader之后调用，合并_defualtHeaders
      };

      //
      console.log('post-header',this.headers?this.headers:this._defualtHeaders);
      //
      fetch(requestUrl, {
        method: 'GET',
        headers: this.headers?this.headers:this._defualtHeaders,
      })
      .then((response) => {
        _response = response;
        return response.json()
      })
      .then((responseData) => {
        if (callback) {
          console.log('***responseData: ' + responseData);
          callback(null, responseData, _response); // (error, responseData, response)
        }
      })
      .catch((error) => {
        if (callback) {
          callback(error, null, _response);
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
  requestPostWithUrl: function(apiUrl: string, parameter: Object, callback: Function) {
    _response = null; // 清空response

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
    if (accessToken && accessToken.length > 0) {
        headerParams.Authorization = 'Bearer '+ accessToken;
    }

    this._setDefualtHeader(headerParams);
    if (this.headers) {
      this.setRequestHeader(this.headers); // 在_setDefualtHeader之后调用，合并_defualtHeaders
    };

    console.log('post-header', this.headers?this.headers:this._defualtHeaders);

    fetch(requestUrl, {
      method: 'POST',
      headers: this.headers?this.headers:this._defualtHeaders,
      body: bodyParams,
    })
    .then((response) => {
      _response = response;
      return response.json()
    })
    .then((responseData) => {
      if (callback) {
          console.log('***responseData: ' + responseData);
          callback(null, responseData, _response); // (error, responseData, response)
      };
    })
    .catch((error) => {
      if (callback) {
        callback(error, null, _response);
        console.log('***error: ' + error);
      };
    })
    .done();
    




  },

};

module.exports = httpRequest;
