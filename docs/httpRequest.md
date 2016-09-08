
## 简介

        
>示例：
        

```
	import httpRequest from '../../common/HTTPRequest'
	HTTPRequest = new httpRequest();
	
	...
	
	// post 请求 表单形式：会按表单形式上传参数
	HTTPRequest.contentType = 'form';
	HTTPRequest.setRequestHeader({
    	'Content-Type': 'application/x-www-form-urlencoded',
	});
	HTTPRequest.requestPostWithUrl(urlStr,parameter,function(error,responseData, response){
		if (error) {
			// error
		}else {
			if (responseData) {
				// responseData
			}else {
				// null
			}
		}
	});
	

```

```
	// get 请求 
	HTTPRequest.requestGetWithUrl(strURL,parameter,
        function(error,responseData,response){
		if (error) {
			if (response.status == 401) {
			    // 401
			}
		} else {
			if (responseData) {
				// responseData
			}else {
				// null
			}
		}
	});

```

```
	// 测试下载
	HTTPRequest.downloadProgress = (progress) => {
		console.log(progress);
	}
	HTTPRequest.responseType = 'arraybuffer';
	HTTPRequest.download('http://www.gutenberg.org/cache/epub/100/pg100.txt');

```

```
	// 测试上传
	var uploadParamters = Object.assign({}, this.state.textParams, {'image': {...this.state.randomPhoto, name: 'image.jpg'}});
	httpRequest.upload('http://posttestserver.com/post.php', uploadParamters);
	httpRequest.updateProgress = (progress) => {
		console.log(progress);
	}
	httpRequest.transferComplete = (responseText, response) => {
		var tempXhr = response;
		var index = tempXhr.responseText.indexOf('http://www.posttestserver.com/');
		if (index === -1) {
			AlertIOS.alert(
				'Upload failed',
				'Invalid response payload.'
			);
			return;
		}
		var url = tempXhr.responseText.slice(index).split('\n')[0];
		Linking.openURL(url);
	}

```

```
	// 自行处理返回数据
	HTTPRequest.handleResponse = true;
	HTTPRequest.requestGetWithUrl(strURL,parameter,
		function(error,responseData,response){
		  if (error) {
		      console.log('error: --> ' + error.message + 'response: --> ' + response);
		      response.text().then((text) => {
		        console.log('response text: -- > ' + text);
		      }).catch( err => {
		        console.log('catch error: --> ' + err.message);
		      });
		  }else {
		      if (responseData) {
		          console.log('responseData: --> ' + responseData);
		      }else {
		          console.log('response: --> ' + response);
		          response.text().then((text) => {
		            console.log('response text: --> ' + text);
		          }).catch( err => {
		            console.log('catch error: --> ' + err.message);
		          });
		      }
		  }
		});

```

```
	// 设置请求超时
	// HTTPRequest.timeout = 1000; // 1s
	HTTPRequest.setTimeout(1000); // 1s

```
