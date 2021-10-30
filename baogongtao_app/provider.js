//如果是微信小程序
let extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
console.log(extConfig);
uni.setStorageSync('site_name', extConfig.site_name);
uni.setStorageSync('role_type', extConfig.role_type);
uni.setStorageSync('source', 'wechatapp');
uni.login({
	provider: 'weixin',
	success: function(res) {
		console.log(JSON.stringify(res));
		if (res.code && !res.authResult) {
			let url = uni.getStorageSync('siteName') + '/getOpenOpenId?site_name=' + uni.getStorageSync('site_name') +
				'&code=' + res.code;
			uni.request({
				url: url,
				data: {},
				header: {
					//'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {
					uni.setStorageSync('openid', msg.data.data.openid);
					uni.setStorageSync('session_key', msg.data.data.session_key);

				}
			});
		} else {

			uni.request({
				url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + res.authResult.access_token + '&openid=' + res.authResult
					.openid,
				data: {},
				header: {
					//'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {
					uni.setStorageSync('openid', res.authResult.openid);
					let userInfo = {
						nickName: msg.data.nickname,
						unionid: res.authResult.unionid,
						avatarUrl: msg.data.headimgurl,
						openid: msg.data.openid,
					}
					console.log(JSON.stringify(userInfo));
					uni.setStorageSync('userInfo', userInfo);
					uni.setStorageSync('unionid', res.authResult.unionid);
					uni.setStorageSync('source', 'Android');
				}
			});
			//console.log(res.authResult.openid);
		}

	}
});
