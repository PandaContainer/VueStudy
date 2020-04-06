/**
 * 自定义ajax插件
 */
const install = function (Vue) {
	const ajax = function (options = {}) {
		options.type = (options.type || 'GET').toUpperCase();
		
		let data = [];
		if(options.data) {
			for(let key in options.data) {
				data.push(encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]));
			}
			if(data.length > 0) {
				data = data.join('&');
			} else {
				data = null;
			}
		} else {
			data = null;
		}
		
		var xhr = null;
		if (window.XMLHttpRequest) {// code for all new browsers
			xhr =  new XMLHttpRequest();
		} else if (window.ActiveXObject) {// code for IE5 and IE6
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (xhr == null) {
			alert('Your browser does not support XMLHTTP.');
			return;
		}
		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4) { // 4 = "loaded"
				const status = xhr.status;
				if(status >= 200 && status < 300) {
					options.error && 
					options.success(xhr.responseText, xhr.responseXML);
				} else {
					options.error && options.error(status);
				}
			}
		}
		if (options.type === 'GET') {
			xhr.open('GET', options.url + (data != null ? '?' + data : ''), true);
			xhr.send(null);
		} else if (options.type === 'POST') {
			xhr.open('POST', options.url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		}
	};
	Vue.prototype.$ajax = ajax;
};

export default install;