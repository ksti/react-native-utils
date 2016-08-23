
## 简介

        
>示例：
        

```
	import HTTPRequest from '../../common/HTTPRequest'
	
	...
	
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
