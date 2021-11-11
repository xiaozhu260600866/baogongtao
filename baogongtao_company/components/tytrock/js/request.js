import store from '@/store'
//import encry from 'common/encry.js'

const service = ({url, method, data, hideLoading=true}) => {
	//接口请求
	if (!hideLoading) {
		uni.showLoading({
			mask: true,
			title: '',
		})
	}
	data.openid = uni.getStorageSync('openid');
	/*
	postData.openid = uni.getStorageSync('openid');
	postData.apiId = api.appId;
   
	let newPostData = postData;
	newPostData.apiSecret = api.appSecret;
	let arr=[];
	for(var key in newPostData){
		arr.push(key)
	}
	arr.sort();
	let str='';
	for(var i in arr){
		str +=arr[i]+newPostData[arr[i]]
	}
	str = encry.sha1(str);
	let sign = str.toUpperCase();
	postData.sign = sign;
	delete postData.apiSecret;
	*/
   
	//console.log(sign);
	return new Promise((resolve, reject) => {
		let sysUrl = store.state.apiInterfaceUrl;
		uni.request({
			url: sysUrl + url,
			data: data,
			method: method, //'GET','POST'
			dataType: 'json',
			success: (res,statusCode,header) => {
				console.log('===header===')
				console.log(header)
				!hideLoading && uni.hideLoading()
				resolve(res.data)
			},
			fail: (res) => {
				if (!hideLoading) {
					this.toast("网络不给力，请稍后再试~")
					//uni.hideLoading()
				}
				reject(res)
			}
		})
	})
}

export default service