/**
 * @author GJS <1353990812@qq.com>
 *
 * GJS reserves all rights not expressly granted.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 GJS
 */

var FileUtil = require('../common/FileUtil');

// require the module
// var RNFS = require('react-native-fs');

var RNFS = FileUtil.RNFS;  
var downloadUrl = 'http://lorempixel.com/400/200/';
var downloadLargeUrl = 'http://ipv4.download.thinkbroadband.com/100MB.zip';
var downloadRedirectUrl = 'http://buz.co/rnfs/download-redirect.php';
var uploadUrl1 = 'http://buz.co/rnfs/upload-tester.php';

var downloadHeaderUrl = 'http://buz.co/rnfs/download-tester.php';
var downloadHeaderPath = RNFS.DocumentDirectoryPath + '/headers.json';

var jobId = -1;



export const _testRNFS = {

    testReadMainBundlePath: function() {
        // get a list of files and directories in the main bundle
        RNFS.readDir(RNFS.MainBundlePath)
          .then((result) => {
            console.log('GOT RESULT MainBundlePath:', result);

            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
          })
          .then((statResult) => {
            if (statResult[0].isFile()) {
              // if we have a file, read it
              return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
          })
          .then((contents) => {
            // log the file contents
            console.log(contents);
          })
          .catch((err) => {
            console.log(err.message, err.code);
          });
    },
    testReadFirstFileFromPath: function(path) {
        // get a list of files and directories in the path
        RNFS.readDir(path)
          .then((result) => {
            console.log('GOT RESULT DocumentDirectoryPath:', result);

            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
          })
          .then((statResult) => {
            if (statResult[0].isFile()) {
              // if we have a file, read it
              return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
          })
          .then((contents) => {
            // log the file contents
            console.log(contents);
          })
          .catch((err) => {
            console.log(err.message, err.code);
          });
    },
    testReadFileFromPath: function(path) {
        if (RNFS.exists(path)) {
            console.log('file exists at path:', path);
            Promise.all([RNFS.stat(path), path])
              .then((statResult) => {
                if (statResult[0].isFile()) {
                  // if we have a file, read it
                  return RNFS.readFile(statResult[1], 'utf8');
                } else if (statResult[0].isDirectory()) {
                    console.log('this is a directory');
                    this.testReadFirstFileFromPath(path);
                    return Promise.resolve(null, false);
                } else {
                    console.log('unknown');
                }
              })
              .then((contents) => {
                // log the file contents
                console.log('文件内容', contents);
              })
              .catch((err) => {
                console.log(err.message, err.code);
              });
        } else {
            console.log('file not exist at path:', path);
        }
        
    },
    testCreateFile: function(path) {

        // create a path you want to write to
        var path = RNFS.DocumentDirectoryPath + '/test.txt';

        if (!RNFS.exists(path)) {
            // write the file
            RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
              .then((success) => {
                console.log('FILE WRITTEN!');
              })
              .catch((err) => {
                console.log(err.message);
              });
        };  
    },
    testDeleteFile: function(path) {

        // create a path you want to write to
        var path = RNFS.DocumentDirectoryPath + '/test.txt';

        if (!RNFS.exists(path)) {
            // write the file
            RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
              .then((success) => {
                console.log('FILE WRITTEN!');
              })
              .catch((err) => {
                console.log(err.message);
              });
        };  
    },
    
}

export function testRNFS() {
    // _testRNFS.testReadMainBundlePath();
    // _testRNFS.testReadFirstFileFromPath(RNFS.DocumentDirectoryPath);
    // _testRNFS.testCreateFile();
    // _testRNFS.testReadFileFromPath(RNFS.DocumentDirectoryPath);

    //
    var RNFS = FileUtil.RNFS;
    var path = RNFS.DocumentDirectoryPath;
    // FileUtil.readFileFromPath(path);

    FileUtil.isFile(path).then((isFile) => {
        console.log('FileUtil.isFile:', isFile);
    });
    FileUtil.isDirectory(path).then((isDirectory) => {
        console.log('FileUtil.isDirectory:', isDirectory);
    });

    path = RNFS.DocumentDirectoryPath + '/test.txt';
    FileUtil.isFile(path).then((isFile) => {
        console.log('FileUtil.isFile--->:', isFile);
    });
    FileUtil.isDirectory(path).then((isDirectory) => {
        console.log('FileUtil.isDirectory--->:', isDirectory);
    });

    FileUtil.readFile(path, 'utf8', function (error, result) {
        if (error) {
            console.log('callback error:', error.message);
        } else {
            console.log('callback result:', result);
        }
        
    }).then(() => {
        FileUtil.deleteFile(path)
            .then(() => {
                console.log('删除成功');
                FileUtil.createFile(path, 'hello world!', 'utf8').then(() => {
                    FileUtil.readFile(path, 'base64', function (error, result) {
                        if (error) {
                            console.log('callback error:', error.message);
                        } else {
                            console.log('callback result:', result);
                        }
                    });
                });
            });
    });

    //
    FileUtil.readFile(RNFS.DocumentDirectoryPath + '/01.png', 'base64', function (error, result) {
        if (error) {
            console.log('callback error:', error.message);
        } else {
            console.log('callback result:', result);
        }
        
    });

    //
    // Random file name needed to force refresh...
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;
    // Download the file then read it, it should contain the headers we sent
    FileUtil.downloadFile(downloadUrl, downloadDest, false).then(result => {
        return RNFS.readFile(downloadDest, 'base64');
    }).then(content => {
        console.log('download file content:', content);
    }).catch(err => {
        console.log(err.message);
    });

    //
    downloadHeaderTest();

    //
    uploadFileTest();

    
}

//
function downloadHeaderTest() {
  var headers = {
    'foo': 'Hello',
    'bar': 'World'
  };

  //
  var RNFS = FileUtil.RNFS;
  // Download the file then read it, it should contain the headers we sent
  FileUtil.downloadFile(downloadHeaderUrl, downloadHeaderPath, true, { headers }).then(res => {
    return RNFS.readFile(downloadHeaderPath, 'utf8');
  }).then(content => {
    var headers = JSON.parse(content);
    console.log('headers[\'HTTP_FOO\']: ' + headers['HTTP_FOO']);
    console.log('headers[\'HTTP_BAR\']: ' + headers['HTTP_BAR']);

    console.log('Headers downloaded successfully');
  }).catch(err => {
    console.log(err.message);
  });
}

function uploadFileTest () {
    //
    var RNFS = FileUtil.RNFS;
    const uploadSrc = `${RNFS.DocumentDirectoryPath}/upload.txt`;

    // 测试
    var testUploadUrl = 'http://posttestserver.com/post.php';

    RNFS.writeFile(uploadSrc, 'Some stuff to upload', 'utf8').then(() => {
      var progress1 = data => {
        var text = JSON.stringify(data);
        console.log('progress1 text: ' + text);
      };

      var begin1 = res => {
        jobId = res.jobId;
      };

      var files = [{ name: 'myfile', filename: 'upload.txt', filepath: uploadSrc, filetype: 'text/plain' }];

      var options = {
        beginCallback: begin1,
        progressCallback: progress1
      };

      // // const ret = FileUtil.uploadFiles(uploadUrl1, files, options);
      // const ret = FileUtil.uploadFiles(testUploadUrl, files, options);

      // jobId = ret.jobId;

      // return ret.promise.then((result) => {
      //   console.log('result.jobId: ' + result.jobId);
      //   console.log('result.responseData: ' + result.responseData);
      //   console.log('result.response: ' + result.response);
      // });


      FileUtil.uploadFiles(testUploadUrl, files, options).then((result) => {
        console.log('result.jobId: ' + result.jobId);
        console.log('result.responseData: ' + result.responseData);
        console.log('result.response: ' + result.response);
      }).catch(err => {
        console.log(err.message);
      });

    }).catch(err => {
        console.log(err.message);
    });
}

// module.exports = testFileRead;
// export default testFileRead;


// module.exports = {
//   testRNFS,
// }
export default {
  testRNFS,
}
