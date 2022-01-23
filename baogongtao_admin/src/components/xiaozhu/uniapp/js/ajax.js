const myfun = function() {}
myfun.install = (Vue, options) => {
	Vue.prototype.postAjax = (url, data, notLoading) => {
		if (!notLoading) {
			uni.showLoading({
				title: '加载中'
			})
		}
		 if (url != '/ajax/form-id') {
			  Vue.prototype.updateHistory()
		 }

		url = urlApendOpenid(url)
		return new Promise((resolve, reject) => {
			uni.request({
				url: Vue.prototype.getSiteName() + url,
				data: data,
				method: 'POST',
				header: {
					// 'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {
					uni.hideLoading()
					if (msg.statusCode != 200) {
						// Vue.prototype.getError("服务器繁忙");
						return false
					}

					if ('message' in msg.data && msg.data.status == 3) { // 判断对像是否存在url的属性
						Vue.prototype.getError(msg.data.message)
					}
					if ('message' in msg.data && msg.data.status == 2) { // 判断对像是否存在url的属性
						Vue.prototype.getSuccess(msg.data.message)
					}
					resolve(msg)
				}
			})
		})
	}
	Vue.prototype.getAjax = (that, data, notLoading) => {
		let url = that.formAction
		that.data.canLoadMore = true
		if (that.data.nextPage < 2) {
			that.$set(that.data, 'show', false)
		}

		const nextPage = that.data.nextPage
		if (nextPage) {
			that.data.canLoadMore = false
			that.data.thisPage = nextPage
		}
		url = urlApendOpenid(url, that)

		// that.$set(that.data, "show", true);
		that.$set(that.data, 'query', that.$mp.query)
		if (!notLoading) {
			if (!nextPage || nextPage == 1) {
				uni.showLoading({
					title: '加载中'
				})
			}
		}
		return new Promise((resolve, reject) => {
			const openid = uni.getStorageSync('openid')
			if (!openid) {
				uni.hideLoading()
				return false
				resolve({})
			}

			uni.request({
				url: Vue.prototype.getSiteName() + url,
				data: data,
				header: {
					// 'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {
					uni.hideLoading()
					if (msg.statusCode != 200) {
						Vue.prototype.getError('服务器繁忙')
						return false
					}
					if (msg.data.status == 3) {
						if ('message' in msg.data) {
							Vue.prototype.getError(msg.data.message)
						}
						setTimeout(() => {
							Vue.prototype.goto(msg.data.url)
						}, 1000)
						return false
					}
					if ('lists' in msg.data && 'current_page' in msg.data.lists) { // 判断是否有分页
						const lastPage = msg.data.lists.last_page
						const nextPage = parseInt(msg.data.lists.current_page)
						that.data.lastPage = parseInt(msg.data.lists.last_page)
						that.data.nextPage = nextPage
						if (lastPage > nextPage) { // 如果还有下一页
							that.data.hasMore = true
						} else {
							that.data.hasMore = false
						}
						if (nextPage >= 2) {
							msg.data.lists.data.forEach((v, i) => {
								that.data.lists.data.push(v)
							})
						}
					}
					if ('cardLog' in msg.data && 'current_page' in msg.data.cardLog && nextPage >= 2) { // 判断是否有分页
						msg.data.cardLog.data.forEach((v, i) => {
							that.data.cardLog.data.push(v)
						})
					}

					if (!nextPage || nextPage < 2) {
						for (var i in msg.data) {
							that.$set(that.data, i, msg.data[i])
						}
						that.$set(that.data, 'show', true)
					}
					that.data.canLoadMore = true
					uni.stopPullDownRefresh()
					resolve(msg.data)
				}
			})
		})
	}

	Vue.prototype.getAjaxForApp = (that, data, notLoading) => {
		let url = that.formAction
		that.data.canLoadMore = true

		const nextPage = that.data.nextPage
		if (nextPage) {
			that.data.canLoadMore = false
			that.data.thisPage = nextPage
		}
		url = urlApendOpenidForApp(url, that)

		// that.$set(that.data, "show", true);
		that.$set(that.data, 'query', that.$mp.query)
		// if (!notLoading) {
		// 	if (!nextPage || nextPage == 1) {
		// 		uni.showLoading({
		// 			title: '加载中',
		// 		})
		// 	}
		// }
		return new Promise((resolve, reject) => {
			const openid = uni.getStorageSync('openid')

			uni.request({
				url: Vue.prototype.getSiteName() + url,
				data: data,
				header: {
					// 'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {
					// uni.hideLoading();
					if (msg.statusCode != 200) {
						Vue.prototype.getError('服务器繁忙')
						return false
					}
					if (msg.data.status == 3) {
						if ('message' in msg.data) {
							Vue.prototype.getError(msg.data.message)
						}
						setTimeout(() => {
							Vue.prototype.goto(msg.data.url)
						}, 1000)
						return false
					}
					if ('lists' in msg.data && 'current_page' in msg.data.lists) { // 判断是否有分页
						const lastPage = msg.data.lists.last_page
						const nextPage = parseInt(msg.data.lists.current_page)
						that.data.lastPage = parseInt(msg.data.lists.last_page)
						that.data.nextPage = nextPage
						if (lastPage > nextPage) { // 如果还有下一页
							that.data.hasMore = true
						} else {
							that.data.hasMore = false
						}
						if (nextPage >= 2) {
							msg.data.lists.data.forEach((v, i) => {
								that.data.lists.data.push(v)
							})
						}
					}
					if ('cardLog' in msg.data && 'current_page' in msg.data.cardLog && nextPage >= 2) { // 判断是否有分页
						msg.data.cardLog.data.forEach((v, i) => {
							that.data.cardLog.data.push(v)
						})
					}

					if (!nextPage || nextPage < 2) {
						for (var i in msg.data) {
							that.$set(that.data, i, msg.data[i])
						}
						that.$set(that.data, 'show', true)
					}
					that.data.canLoadMore = true
					uni.stopPullDownRefresh()
					resolve(msg.data)
				}
			})
		})
	}
}

function urlApendOpenidForApp(url, that) {
	const openid = uni.getStorageSync('openid')

	const site_name = uni.getStorageSync('site_name')
    const source = uni.getStorageSync('source')
	const api_token = uni.getStorageSync('unionid') ? uni.getStorageSync('unionid') : openid
	if (url.indexOf('?') != -1) {
		url += '&openid=' + openid + '&api_token=' + api_token + '&source=' + source +
			'&site_name=' + site_name
	} else {
		url += '?openid=' + openid + '&api_token=' + api_token + '&source=' + source +
			'&site_name=' + site_name
	}
	if (that && that.data.nextPage) {
		url += '&page=' + that.data.nextPage
	}
	var city = uni.getStorageSync('city')
	if (city) {
		if (url.indexOf('?') != -1) {
			url += '&city=' + city
		} else {
			url += '?city=' + city
		}
	}
	var distribution = uni.getStorageSync('distribution')
	if (distribution) {
		if (url.indexOf('?') != -1) {
			url += '&distribution=' + distribution
		} else {
			url += '?distribution=' + distribution
		}
	}
	var location_x = uni.getStorageSync('location_x')
	var location_y = uni.getStorageSync('location_y')
	if (location_x) {
		if (url.indexOf('?') != -1) {
			url += '&location_x=' + location_x + '&location_y=' + location_y
		} else {
			url += '?location_x=' + location_x + '&location_y=' + location_y
		}
	}

	if (that) {
		if (url.indexOf('?') != -1) {
			url += '&'
		} else {
			url += '?'
		}
		console.log(that.$mp.query)
		for (var i in that.$mp.query) {
			if (that.$mp.query[i] && i != 'city') {
				if (i == 'scene') {
					console.log(that.$mp.query[i].split('%2C'))
					that.$mp.query[i].split('%2C').forEach(v => {
						  const arr = v.split('%3A')
						  if (arr.length >= 2) {
						  	url += arr[0] + '=' + arr[1] + '&'
						  	if (arr[0] == 'distribution') {
						  		uni.setStorageSync('distribution', arr[1])
						  	}
						  } else {
							  url += 'scene=' + arr[0] + '&'
						  }
					})
				} else {
					if (i == 'distribution') {
						uni.setStorageSync('distribution', that.$mp.query[i])
					}
					url += i + '=' + that.$mp.query[i] + '&'
				}
			}
		}
	}
	// console.log(url);

	return url
}

function urlApendOpenid(url, that) {
	var merchant_no = uni.getStorageSync('merchant_no')
	const source = uni.getStorageSync('source')
	if (merchant_no && source == 'wechatapp') {
		url = url.replace('shop', 'wechatapp')
		if (url.indexOf('?') != -1) {
			url += '&merchant_no=' + merchant_no
		} else {
			url += '?merchant_no=' + merchant_no
		}
	}
	const openid = uni.getStorageSync('openid')

	const site_name = uni.getStorageSync('site_name')

	const api_token = uni.getStorageSync('unionid') ? uni.getStorageSync('unionid') : openid

	if (url.indexOf('?') != -1) {
		url += '&openid=' + openid + '&api_token=' + api_token + '&source=' + source + '&site_name=' + site_name
	} else {
		url += '?openid=' + openid + '&api_token=' + api_token + '&source=' + source + '&site_name=' + site_name
	}
	console.log(url)
	if (that && that.data.nextPage) {
		url += '&page=' + that.data.nextPage
	}
	var city = uni.getStorageSync('city')
	if (city) {
		if (url.indexOf('?') != -1) {
			url += '&city=' + city
		} else {
			url += '?city=' + city
		}
	}
	var waterCityData = uni.getStorageSync('waterCityData')
	if (waterCityData) {
		if (url.indexOf('?') != -1) {
			url += '&waterCity=' + waterCityData.province + ',' + waterCityData.city + ',' + waterCityData.town + ',' + waterCityData.area + '&town=' + waterCityData.area
		} else {
			url += '?waterCity=' + waterCityData.province + ',' + waterCityData.city + ',' + waterCityData.town + ',' + waterCityData.area + '&town=' + waterCityData.area
		}
	}

	var unionid = uni.getStorageSync('unionid')
	if (unionid) {
		if (url.indexOf('?') != -1) {
			url += '&unionid=' + unionid
		} else {
			url += '?unionid=' + unionid
		}
	}

	var card_user_id = uni.getStorageSync('card_user_id')
	if (card_user_id) {
		if (url.indexOf('?') != -1) {
			url += '&card_user_id=' + card_user_id
		} else {
			url += '?card_user_id=' + card_user_id
		}
	}
	var distribution = uni.getStorageSync('distribution')
	if (distribution) {
		if (url.indexOf('?') != -1) {
			url += '&distribution=' + distribution
		} else {
			url += '?distribution=' + distribution
		}
	}
	var merchantUserId = uni.getStorageSync('merchantUserId')
	if (merchantUserId) {
		if (url.indexOf('?') != -1) {
			url += '&merchantUserId=' + merchantUserId
		} else {
			url += '?merchantUserId=' + merchantUserId
		}
	}
	var location_x = uni.getStorageSync('location_x')
	var location_y = uni.getStorageSync('location_y')
	if (location_x) {
		if (url.indexOf('?') != -1) {
			url += '&location_x=' + location_x + '&location_y=' + location_y
		} else {
			url += '?location_x=' + location_x + '&location_y=' + location_y
		}
	}

	if (that) {
		if (url.indexOf('?') != -1) {
			url += '&'
		} else {
			url += '?'
		}
		for (var i in that.$mp.query) {
			if (that.$mp.query[i] && i != 'city') {
				if (i == 'scene') {
					console.log(that.$mp.query[i].split('%2C'))
					const scene = unescape(that.$mp.query[i])
					scene.split('&').forEach(v => {
						 const arr = v.split('=')
						 if (arr.length >= 2) {
						 	url += arr[0] + '=' + arr[1] + '&'
						 	if (arr[0] == 'distribution') {
						 		uni.setStorageSync('distribution', arr[1])
						 	}
							if (arr[0] == 'merchantUserId') {
								uni.setStorageSync('merchantUserId', arr[1])
							}
						 } else {
						 	 url += 'scene=' + arr[0] + '&'
						 }
					})
				} else {
					if (i == 'distribution') {
						uni.setStorageSync('distribution', that.$mp.query[i])
					}
					url += i + '=' + that.$mp.query[i] + '&'
				}
			}
		}
	}
	let userinfo = uni.getStorageSync('userInfo')
	if (userinfo && userinfo.nickName) {
		if (userinfo.nickName.indexOf('&') != -1) {
			userinfo.nickName = userinfo.nickName.replace(/&/g, '*')
		}
		if (userinfo.nickName.indexOf('#') != -1) {
			userinfo.nickName = userinfo.nickName.replace(/#/g, '*')
		}
	}

	userinfo = JSON.stringify(userinfo)
	url += '&userinfo=' + userinfo

	return url
}
export default myfun
