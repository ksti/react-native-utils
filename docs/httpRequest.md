
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
