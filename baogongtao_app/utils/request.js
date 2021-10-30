import axios from '@/components/gangdiedao-uni-axios'
import store from '@/store'
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    if (process.env.NODE_ENV === 'development') {
		console.log(req)
		console.log(store.state.apiInterfaceUrl)
        console.log("请求地址：" + req.url, req.data || req.params)
    }
    //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${res.config.url}响应结果：`, res)
    }
}

// 创建自定义接口服务实例
const http = axios.create({
    baseURL: store.state.apiInterfaceUrl,
    timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        'Content-Type': 'application/json',
        //'X-Requested-With': 'XMLHttpRequest',
    },
	transformRequest: [function (data) {
	
		// 可以对data做任何操作
		data = data?data:{};
		if(uni.getStorageSync('openid')) data.openid = uni.getStorageSync('openid');
		if(uni.getStorageSync('wxUser')) data.wechat_user_id = uni.getStorageSync('wxUser').id;
		if(uni.getStorageSync('token')) data.token = uni.getStorageSync('token');
		data.client_id = store.state.clientId;
		return data;
		let resData = new FormData()
		for (const key of Object.keys(data)) {
		var val = data[key]===null?'':data[key];
		resData.append(key, val)
		}
		//console.log(typeof resData)
		return resData
	}]
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
    // code...
    // 获取本地存储的Cookie
    // const cookie = uni.getStorageSync('cookie')
    // 设置Cookie
    // config.headers.Cookie = cookie
	
    _reqlog(config)
    return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
    _reslog(response)
	var token = response.headers.Authorization
	if (token) {
		let tokenArr = token.split(" ");
		token = tokenArr[tokenArr.length-1];
		// 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
		store.commit('login', {token:token,isLogin: true})
	}
		
	const res = response.data
    // code...
    // 获取cookie
    // let headerStr = JSON.stringify(response.headers)
    // let cookie = (/(?:Set-Cookie).+;/.exec(headerStr)[0]).replace(/Set-Cookie|:|"/g, "")
    // if (cookie) {
        // uni.setStorage({
            // key: 'cookie',
            // data: cookie.split(';')[0]
        // })
    // }
    return res
}, error => {
    return Promise.reject(error.message)
})

export default http