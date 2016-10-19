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
 * @providesModule fileUtil
 * @flow
 */

'use strict';
// require modules
const RNFS = require('react-native-fs');

var jobIds = [];

var _response;

const fileUtil = {
    RNFS: RNFS,

    isFile: function(path: String, callback: Function) {
        return RNFS.exists(path)
                  .then((exist) => {
                    console.log('then exists?', exist);
                    if (exist) {
                      console.log('file exists at path:', path);
                      return Promise.all([RNFS.stat(path), path])
                                .then((statResult) => {
                                  var isFile = statResult[0].isFile();
                                  if (callback) {
                                    callback(null, isFile);
                                  };
                                  return Promise.resolve(isFile);
                                })
                                .catch((err) => {
                                  console.log(err.message, err.code);
                                  if (callback) {
                                    callback(err, null);
                                  };
                                  return Promise.reject(err);
                                });
                    } else {
                      console.log('file not exist at path:', path);
                      if (callback) {
                        callback(null, false);
                      };
                      return Promise.resolve(false);
                    }
                  })
                  .catch((err) => {
                    console.log('err exists:', err);
                    if (callback) {
                      callback(err, null);
                    };
                    return Promise.reject(err);
                  });

    },

    isDirectory: function(path: String, callback: Function) {
        return RNFS.exists(path)
                  .then((exist) => {
                    console.log('then exists?', exist);
                    if (exist) {
                      console.log('file exists at path:', path);
                      return Promise.all([RNFS.stat(path), path])
                                .then((statResult) => {
                                  var isDirectory = statResult[0].isDirectory();
                                  if (callback) {
                                    callback(null, isDirectory);
                                  };
                                  return Promise.resolve(isDirectory);
                                })
                                .catch((err) => {
                                  console.log(err.message, err.code);
                                  if (callback) {
                                    callback(err, null);
                                  };
                                  return Promise.reject(err);
                                });
                    } else {
                      console.log('file not exist at path:', path);
                      if (callback) {
                        callback(null, false);
                      };
                      return Promise.resolve(false);
                    }
                  })
                  .catch((err) => {
                    console.log('err exists:', err);
                    if (callback) {
                      callback(err, null);
                    };
                    return Promise.reject(err);
                  });

    },

    /*
    mkdir(filepath: string, options?: MkdirOptions): Promise<void>

    type MkdirOptions = {
      NSURLIsExcludedFromBackupKey?: boolean; // iOS only
    };
    Create a directory at filepath. Automatically creates parents and does not throw if already exists (works like Linux mkdir -p).

    (IOS only): The NSURLIsExcludedFromBackupKey property can be provided to set this attribute on iOS platforms. Apple will reject apps for storing offline cache data that does not have this attribute.
    */

    createDir: function(filepath: string, options?: MkdirOptions, callback: Function) {
      return RNFS.mkdir(filepath, options)
              .then((result) => {
                if (callback) {
                  callback(null, true);
                };
                return Promise.resolve(true);
              })
              .catch((err) => {
                console.log(err.message, err.code);
                if (callback) {
                  callback(err);
                };
                return Promise.reject(err);
              });
    },

    readDir: function(path:String, callback: Function) {
      return RNFS.exists(path)
              .then((exist) => {
                console.log('then exists?', exist);
                if (exist) {
                  console.log('file exists at path:', path);
                  return RNFS.readDir(path)
                    .then((result) => {
                      console.log('GOT RESULT DocumentDirectoryPath:', result);
                      if (callback) {
                        callback(result);
                      };
                      return Promise.resolve(result);
                    })
                    .catch((err) => {
                      console.log(err.message, err.code);
                      if (callback) {
                        callback(err);
                      };
                      return Promise.reject(err);
                    });
                } else {
                  console.log('file not exist at path:', path);
                  if (callback) {
                    callback({message: 'file not exist'});
                  };
                  return Promise.reject({message: 'file not exist'});
                }
              })
              .catch((err) => {
                console.log('err exists:', err);
                if (callback) {
                  callback(err);
                };
                return Promise.reject(err);
              });
    },

    readFile: function(path: String, encoding?: string = 'utf8', callback: Function) {
      return RNFS.exists(path)
                .then((exist) => {
                  console.log('then exists?', exist);
                  if (exist) {
                    console.log('file exists at path:', path);
                    Promise.all([RNFS.stat(path), path])
                      .then((statResult) => {
                        if (statResult[0].isFile()) {
                          console.log('this is a file');
                          // if we have a file, read it
                          return RNFS.readFile(statResult[1], encoding);
                        } else if (statResult[0].isDirectory()) {
                            console.log('this is a directory');
                            return this.readDir(path, callback);
                        } else {
                            console.log('unknown');
                            if (callback) {
                              callback({message: 'unknown err'});
                            };
                            return Promise.reject({message: 'unknown err'});
                        }
                      })
                      .then((contents) => {
                        // log the file contents
                        console.log('文件内容:', contents);
                        if (callback) {
                          callback(null, contents);
                        };
                        return Promise.resolve(contents);
                      })
                      .catch((err) => {
                        console.log(err.message, err.code);
                        if (callback) {
                          callback(err);
                        };
                        return Promise.reject(err);
                      });
                  } else {
                    console.log('file not exist at path:', path);
                    if (callback) {
                      callback({message: 'file not exist'});
                    };
                    return Promise.reject({message: 'file not exist'});
                  }
                })
                .catch((err) => {
                  console.log('err exists:', err);
                  if (callback) {
                    callback(err);
                  };
                  return Promise.reject(err);
                });
    },

    createFile: function(path: String, contents: any, encoding: ?String = 'utf8', options: Object, callback: Function) {

        // create a path you want to write to
        // var path = RNFS.DocumentDirectoryPath + '/test.txt';

        return RNFS.exists(path)
                  .then((exist) => {
                    console.log('then exists?', exist);
                    if (!exist) {
                      //
                    } else {
                      if (callback) {
                        callback(null, true);
                      };
                      if (options.overwrite === false) {
                        return Promise.resolve(true);
                      };
                    }
                    // write the file
                    RNFS.writeFile(path, contents, encoding)
                      .then(() => {
                        console.log('FILE WRITTEN!');
                        if (callback) {
                          callback(null, true);
                        };
                        return Promise.resolve(true);
                      })
                      .catch((err) => {
                        console.log(err.message);
                        if (callback) {
                          callback(err, null);
                        };
                        return Promise.reject(err);
                      });
                  })
                  .catch((err) => {
                    console.log('err exists:', err.message);
                    if (callback) {
                      callback(err, null);
                    };
                    return Promise.reject(err);
                  });
    },

    deleteFile: function(path: String, callback: Function) {

        // create a path you want to write to
        // var path = RNFS.DocumentDirectoryPath + '/test.txt';

        return RNFS.exists(path)
                  .then((exist) => {
                    console.log('then exists?', exist);
                    if (exist) {
                      // unlink the file
                      return RNFS.unlink(path)
                            .then(() => {
                              console.log('FILE DELETED');
                              if (callback) {
                                callback(null, true);
                              };
                              return Promise.resolve(true);
                            })
                            // `unlink` will throw an error, if the item to unlink does not exist
                            .catch((err) => {
                              console.log(err.message);
                              if (callback) {
                                callback(err, null);
                              };
                              return Promise.reject(err);
                            });
                    } else {
                      if (callback) {
                        callback({message: 'file not exist'});
                      };
                      return Promise.resolve(false);
                    }
                  })
                  .catch((err) => {
                    console.log('err exists:', err);
                    if (callback) {
                      callback(err, null);
                    };
                    return Promise.reject(err);
                  });
    },

    downloadFile: function (url, downloadDest, background, downloadOptions, callback: Function) {
      _response = null; // 清空response

      var progress = data => {
        var percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
        var text = `Progress ${percentage}%`;
        console.log('progress ---: ' + text);
        if (this.downloadProgress) {
          this.downloadProgress(jobId, percentage);
        };
      };

      var begin = res => {
        console.log('Download has begun');
        if (this.downloadBegin) {
          this.downloadBegin(jobId, res);
        };
      };

      var progressDivider = 1;

      // this.setState({ imagePath: { uri: '' } });

      // Random file name needed to force refresh...
      downloadDest = downloadDest ? downloadDest : `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;

      // const ret = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progress, background, progressDivider });
      var options = { fromUrl: url, toFile: downloadDest, begin, progress, background, progressDivider };

      Object.assign(options, downloadOptions);

      const ret = RNFS.downloadFile(options);

      var jobId = ret.jobId;
      jobIds[jobId] = jobId; // ...

      // return ret.promise.then(res => {
      //   return Promise.resolve().then(() => {
      //     return Promise.resolve(JSON.stringify(res))
      //       .then((responseData) => {
      //         var response = { jobId: jobId, responseData: responseData, info: { uri: 'file://' + downloadDest } }
      //         return Promise.resolve(response);
      //       }).catch(err => {
      //         Object.assign(err, { jobId: jobId });
      //         return Promise.reject(err);
      //       })
      //   });
      // }).catch(err => {
      //     Object.assign(err, { jobId: jobId });
      //     return Promise.reject(err);
      // });

      return ret.promise.then(res => {
          _response = res;
          jobIds[jobId] = null;
          if (typeof res !== 'string') {
            // var response = { jobId: jobId, responseData: responseData, info: { uri: 'file://' + downloadDest } }
            if (callback) {
              callback(null, res, _response);
            };
            return Promise.resolve(res); // res 就是 JSON 对象
          };

          return Promise.resolve(JSON.stringify(res)).then((responseData) => {
            // var response = { jobId: jobId, responseData: responseData, info: { uri: 'file://' + downloadDest } }
            if (callback) {
              callback(null, responseData, _response);
            };
            return Promise.resolve(responseData);
          },
          err => {
            Object.assign(err, { jobId: jobId, response: res });
            if (callback) {
              callback(err, null, _response);
            };
            return Promise.reject(err);
          });
        }).catch(err => {
          jobIds[jobId] = null;
          Object.assign(err, { jobId: jobId });
          if (callback) {
            callback(err, null, _response);
          };
          return Promise.reject(err);
        });
    },

    stopDownload: function (jobId) {
      if (jobId === jobIds[jobId]) {
        RNFS.stopDownload(jobId);
        jobIds[jobId] = null;
      } else {
        console.log('There is no download to stop');
      }
    },

    uploadFiles: function (uploadUrl, files, uploadOptions, callback: Function) {
      if (!uploadUrl) {
        return;
      };
      // const uploadSrc = `${RNFS.DocumentDirectoryPath}/upload.txt`;

      var jobId = -1;

      var progress1 = data => {
        var text = JSON.stringify(data);
        console.log('progress1:' + text);
        if (this.uploadProgress) {
          this.uploadProgress(jobId, text);
        };
      };

      var begin1 = res => {
        jobId = res.jobId;
        if (this.uploadBegin) {
          this.uploadBegin(jobId);
        };
      };

      // [{ name: 'myfile', filename: 'upload.txt', filepath: uploadSrc, filetype: 'text/plain' }]
      var options = {
        toUrl: uploadUrl,
        files: files,
        beginCallback: begin1,
        progressCallback: progress1
      };

      Object.assign(options, uploadOptions);

      const ret = RNFS.uploadFiles(options)

      jobId = ret.jobId;

      return ret.promise.then(res => {
        _response = res;
        return JSON.parse(res.body);
      }).then((responseData) => {
        if (callback) {
          callback(null, jobId, responseData, _response);
        };
        return Promise.resolve({ jobId:jobId, responseData: responseData, response: res });
      },
        err => {
          if (callback) {
            callback(err, jobId, null, _response);
          };
          return Promise.resolve({ jobId:jobId, responseData: null, response: _response });
      }).catch((err) => {
        Object.assign(err, { jobId:jobId });
        if (callback) {
          callback(err, jobId, null, _response);
        };
        return Promise.reject(err);
      });

      // var promise = ret.promise.then(res => {
      //   var response = JSON.parse(res.body);
      //   // console.log('response.myfile.name: ', response.myfile.name);
      //   // console.log('response.myfile.name: ', response.myfile.type);
      //   // console.log('response.myfile.name: ', response.myfile.size);
      //   return Promise.resolve({ jobId:jobId, responseData: response, response: res });
      // }).catch(err => {
      //   Object.assign(err, { jobId: jobId });
      //   return Promise.reject(err);
      // });

      // return { jobId: jobId, promise: promise }
    },

}

module.exports = fileUtil;
