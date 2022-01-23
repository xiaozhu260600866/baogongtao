const myfun = function() {}
myfun.install = (Vue, options) => {
	Vue.prototype.toFixed = (amount) => {
		return amount.toFixed(2)
	},
	Vue.prototype.space = (lat1, lng1, lat2, lng2) => {
	  console.log(lat1, lng1, lat2, lng2)
	  var radLat1 = lat1 * Math.PI / 180.0
	  var radLat2 = lat2 * Math.PI / 180.0
	  var a = radLat1 - radLat2
	  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
	  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
	  s = s * 6378.137
	  s = Math.round(s * 10000) / 10000
	  return s // 单位千米
	}
	Vue.prototype.updateUrl = (urlArr) => {
		for (let i = 0; i < urlArr.length; i++) {
			const url = urlArr[i]
			const updateUrl = uni.getStorageSync('updateUrl') || []
			let canPush = true
			for (let j = 0; j < updateUrl.length; j++) {
				const v = updateUrl[j]
				if (url == v) canPush = false
			}
			if (canPush) {
				updateUrl.push(url)
				uni.setStorageSync('updateUrl', updateUrl)
			}
		}
	}
	Vue.prototype.onShow = (that, type) => {
		const pages = getCurrentPages() // 获取加载的页面
		const currentPage = pages[pages.length - 1] // 获取当前页面的对象
		const url = '/' + currentPage.route // 当前页面url
	   const updateUrl = uni.getStorageSync('updateUrl') || []
	   for (let j = 0; j < updateUrl.length; j++) {
			const v = updateUrl[j]
			if (url == v) {
                if (type) {
                   window.location.reload()
                } else {
                    that.ajax()
                }

				updateUrl.splice(j, 1)
				uni.setStorageSync('updateUrl', updateUrl)
				break
			}
	   }
	}
	Vue.prototype.payUniapp = (res, callBack, callBack2) => {
			res = JSON.parse(res)
			return new Promise((resolve, reject) => {
				if (uni.getStorageSync('source') == 'wap') {
					const wx = require('xiaozhu/weixin-js-sdk')
					wx.chooseWXPay({
						'timestamp': res.timeStamp,
						'nonceStr': res.nonceStr,
						'package': res.package,
						'signType': res.signType,
						'paySign': res.paySign,
						success: function(res) {
							// if(fcallBack) callBack();
							callBack()
						},
						fail: res => {
							callBack2()
						}
					})
				} else {
					// 微信支付
					wx.requestPayment({
						'timeStamp': res.timeStamp,
						'nonceStr': res.nonceStr,
						'package': res.package,
						'signType': res.signType,
						'paySign': res.paySign,
						'success': res => {
							// 发送模板消息结束
							if (callBack)callBack()
							resolve()
						},
						'fail': res => {
							if (callBack)callBack()
							resolve()
						}
					})
				}
			})
		},
		Vue.prototype.createAddressUniapp = (callBack, source) => {
			console.log('0017')
			console.log(source)
			return new Promise((resolve, reject) => {
				if (uni.getStorageSync('source') == 'wap') {
					const wx = require('xiaozhu/weixin-js-sdk')
					wx.openAddress({
						success: res => {
							res.address = res.provinceName + res.cityName + res.countyName + res.detailInfo
							if (source) {
								var url = '/wechatapp/user/address-add'
							} else {
								var url = '/shop/user/address-add'
							}
							Vue.prototype.postAjax(url, {
								name: res.userName,
								phone: res.telNumber,
								address: res.address,
								default: 0
							}).then(msg => {
								if (callBack) callBack(1)
								resolve(1)
							})
						},
						fail: res => {
							if (callBack) callBack(0)
							resolve(0)
						}
					})
				} else {
					uni.chooseAddress({
						success: res => {
							res.address = res.provinceName + res.cityName + res.countyName + res.detailInfo
							if (source) {
								var url = '/wechatapp/user/address-add'
							} else {
								var url = '/shop/user/address-add'
							}
							Vue.prototype.postAjax(url, {
								name: res.userName,
								phone: res.telNumber,
								address: res.address,
								default: 0
							}).then(msg => {
								if (callBack) callBack(1)
								resolve(1)
							})
						},
						fail: res => {
							if (callBack) callBack(0)
							resolve(0)
						}
					})
				}
			})
		}
	Vue.prototype.back = () => {
			uni.navigateBack({})
		},

		Vue.prototype.previewImage = (url, purl) => {
			if (url.indexOf('ttp') != -1) {
				console.log('0070')
			} else {
				 url = Vue.prototype.getSiteName() + '/upload/images/' + purl + '/' + url
			}

			console.log(url)
			uni.previewImage({
				current: url, // 当前显示图片的http链接
				urls: [url] // 需要预览的图片http链接列表
			})
		},
		Vue.prototype.setTitle = (title) => {
			if (title.length > 15) {
				title = title.substring(0, 15) + '...'
			}
			uni.setNavigationBarTitle({
				title: title // 页面标题为路由参数
			})
		},
		Vue.prototype.in_array = (search, array) => {
			for (var i in array) {
				if (array[i] == search) {
					return true
				}
			}
			return false
		},
		Vue.prototype.getSiteName = (item) => {
			return uni.getStorageSync('siteName')
		}
	Vue.prototype.formatData = (that) => {
		return {
			canLoadMore: false,
			hasMore: false,
			thisPage: 1,
			lastPage: 1,
			nextPage: 1,
			lists: [],
			url: '',
			show: false,
			canLoadMore: true,
			query: {},
			loadingArray: [1, 2, 3, 4, 5, 6],
			loadingDarray: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			],
			source: uni.getStorageSync('source'),
			getUser: uni.getStorageSync('userInfo')
		}
	}
	Vue.prototype.goto = (url, type, refreshUrl) => {
		    if (refreshUrl) {
				uni.setStorageSync('refreshUrl', refreshUrl)
			}
			if (type && type == 2) {
				uni.switchTab({
					url: url
				})
				return false
			}
			if (!type) {
				uni.redirectTo({
					url: url
				})
			} else {
				uni.navigateTo({
					url: url
				})
			}
		},
		Vue.prototype.hasMore = (that) => {
			console.log(that.data)
			if (that.data.canLoadMore && that.data.hasMore) {
				that.data.nextPage = that.data.nextPage + 1
				that.ajax()
			}
		},
		Vue.prototype.getParent = (that) => {
			let parent = that.$parent
			while (parent) {
				if (parent.mpType != 'page') {
					parent = parent.$parent
				} else {
					return parent
					break
				}
			}
		},
		Vue.prototype.shareSource = (that, title, notShareSource) => {
			// console.log(title);
			if (!notShareSource) that.data.query.shareSource = 'share'
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const urlPre = currentPage.route
			let scope = ''
			for (const i in that.data.query) {
				if (that.data.query[i]) scope += i + '=' + that.data.query[i] + '&'
			}
			var reg = /&$/gi
			scope = scope.replace(reg, '')
			let path = urlPre + '?' + scope
			const city = uni.getStorageSync('city')
			if (city) {
				path += '&city=' + city
			}
			console.log(path)
			if (that.data.query.shareImg) {
				console.log('002')
				return {
					path: path,
					title: title,
					imageUrl: that.data.query.shareImg,
					fail: res => {

					}
				}
			} else {
				return {
					path: path,
					title: title,
					fail: res => {

					}
				}
			}

			// let scope = that.data.query.join("&");
			// console.log(scope);
		}
	// 异步函数
	Vue.prototype.getStorage = (name, callBack) => {
			return new Promise((resolve, reject) => {
				uni.getStorage({
					key: name,
					success(res) {
						if (callBack) callBack()
						resolve(res.data)
					},
					fail: res => {
						if (callBack) callBack()
						resolve(res)
					}
				})
			})
		},
		Vue.prototype.formId = (formId, fun) => {
			return new Promise((resolve, reject) => {
				Vue.prototype.postAjax('/ajax/form-id', {
					formId: formId
				}, 'notLoading').then(msg => {
					if (fun) fun()
					resolve(msg.data)
				})
			})
		},
		Vue.prototype.copy = (content) => {
			uni.setClipboardData({
				data: content,
				success: () => {
					Vue.prototype.getSuccess('复制成功')
				}

			})
		}
	Vue.prototype.phone = (phone) => {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		Vue.prototype.toDown = () => {
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 20000,
					duration: 50
				})
			}, 500)
		},
		Vue.prototype.location = (x, y, address) => {
			console.log(x)
			console.log(y)
			console.log(address)
			wx.openLocation({
				latitude: parseFloat(x),
				longitude: parseFloat(y),
				scale: 18,
				name: address,
				address: address
			})
		}
	Vue.prototype.getMyAddress = (that, callBack) => {
		that.data.show = false
		return new Promise((resolve, reject) => {
			if (uni.getStorageSync('source') == 'wap') {
				const wx = require('xiaozhu/weixin-js-sdk')
				setTimeout(() => {
					wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: res => {
							console.log(12)
							uni.setStorageSync('location_x', res.latitude)
							uni.setStorageSync('location_y', res.longitude)
							if (that) {
								if (callBack) callBack()
								resolve(res)
							}
						},
						fail: res => {
							uni.setStorageSync('location_x', '22.59514')
							uni.setStorageSync('location_y', '113.07845')
							consoel.log(res)
						},
						cancel: res => {
							uni.setStorageSync('location_x', '22.59514')
							uni.setStorageSync('location_y', '113.07845')
							consoel.log(res)
						}
					})
				}, 1000)
			} else {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						uni.setStorageSync('location_x', res.latitude)
						uni.setStorageSync('location_y', res.longitude)
						if (that) {
							if (callBack) callBack()
							resolve()
						}
					},
					fail: res => {
						uni.setStorageSync('location_x', '22.59514')
						uni.setStorageSync('location_y', '113.07845')
						if (callBack) callBack()
						resolve()
					},
					complete: res => {

					}
				})
			}
		})
	}
	Vue.prototype.getAuthPhoneNumber = (e, success, error) => {
		const session_key = uni.getStorageSync('session_key')
		if (e.detail.encryptedData) {
			Vue.prototype.postAjax('/user/check-phone', {
				encryptedData: e.detail.encryptedData,
				iv: e.detail.iv,
				session_key: session_key
			}).then(msg => {
				console.log(msg)
				if (msg.data.status == 3) {
					Vue.prototype.getError('授权失败')
					return false
				}
				success(msg)
			})
		} else {
			error()
			// this.goto('/pages/user/message/send/main?to_userid=' + this.data.user.id, 1);
		}
	}
	Vue.prototype.getOptions = function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
		var url = window.location.href
		var r = url.substr(url.indexOf('?') + 1).match(reg)
		if (name == 'audit' && r != null) return decodeURI(r[2]) == 0 ? null : decodeURI(r[2])
		if (r != null) return decodeURI(r[2])
		return null
	}
	Vue.prototype.getVideoCover = (value) => {
		const res = []
		if (value) {
			const videoArr = value.split(',')
			videoArr.forEach(v => {
				res.push(
						{ filename: v, videoCover: v.split('mp4')[0] + 'jpg' }
				)
			})
		}

		return res
	}
	Vue.prototype.getQQvideoLink = (videoSrc, callBack) => {
		videoSrc = videoSrc.split('.html')
		videoSrc = videoSrc[0].split('/')
		videoSrc = videoSrc[videoSrc.length - 1]
		const url = 'https://vv.video.qq.com/getinfo?vids=' + videoSrc + '&platform=101001&charge=0&otype=json'
		return new Promise((resolve, reject) => {
			wx.request({
				url: url,
				data: {},
				method: 'GET',
				success: res => {
					let data = res.data.split('QZOutputJson=')
					data = data[1].replace(/(.*);/, '$1')
					data = JSON.parse(data)
					data = data.vl.vi[0]
					const fvkey = data.fvkey
					const fn = data.fn
					let url = data.ul.ui[0].url
					const title = data.ti
					url = url + fn + '?vkey=' + fvkey
					if (callBack) {
						callBack({
							url: url,
							title: title
						})
					}
					resolve({
						url: url,
						title: title
					})
				}
			})
		})
	}
}
export default myfun
