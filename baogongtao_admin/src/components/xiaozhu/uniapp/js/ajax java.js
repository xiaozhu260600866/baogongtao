const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.postAjax = (url, data, notLoading) => {
		if (!notLoading) {
			uni.showLoading({
				title: '加载中',
			})
		}
		if (url != "/ajax/form-id") {
			Vue.prototype.updateHistory();
		}


		url = urlApendOpenid(url);
		return new Promise((resolve, reject) => {
			uni.request({
				url: Vue.prototype.getSiteName() + url,
				data: data,
				method: 'POST',

				header: {
					//'custom-header': 'hello' //自定义请求头信息
					'Authorization': uni.getStorageSync("token")
				},
				success: (msg) => {
					uni.hideLoading();
					if (msg.statusCode != 200) {
						//Vue.prototype.getError("服务器繁忙");
						return false;
					}



					if ('message' in msg.data && msg.data.status == 3) { //判断对像是否存在url的属性
						Vue.prototype.getError(msg.data.message);
					}
					if ('message' in msg.data && msg.data.status == 2) { //判断对像是否存在url的属性
						Vue.prototype.getSuccess(msg.data.message);
					}
					resolve(msg);
				}
			});

		})

	}
	Vue.prototype.getAjax = (that, data, notLoading) => {


		that.data.canLoadMore = true;
		if (that.data.nextPage < 2) {
			that.$set(that.data, "show", false);
		}

		let nextPage = that.data.nextPage;
		if (nextPage) {
			that.data.canLoadMore = false;
			that.data.thisPage = nextPage;
		}



		//that.$set(that.data, "show", true);
		that.$set(that.data, "query", that.$mp.query);
		if (!notLoading) {
			if (!nextPage || nextPage == 1) {
				uni.showLoading({
					title: '加载中',
				})
			}
		}
		return new Promise((resolve, reject) => {
			let openid = uni.getStorageSync('openid');
			if (!openid) {
				uni.hideLoading();
				return false;
				resolve({});
			}


			that.formAction.forEach((formActionData, formActionDataIndex) => {
				let canForEach = that.data.nextPage > 1 && formActionData.mapperValues !=
					"lists" ? false : true;
				if (canForEach) {
					let url = formActionData.formAction;
					url = urlApendOpenid(url, that);
					uni.request({
						url: Vue.prototype.getSiteName() + url,
						data: data,
						header: {
							//'custom-header': 'hello' //自定义请求头信息
							'Authorization': uni.getStorageSync("token")
						},
						success: (msg) => {
							if (msg.statusCode != 200) {
								Vue.prototype.getError("服务器繁忙");
								return false;
							}
							if (msg.data.code == 3) {
								if ("message" in msg.data) {
									Vue.prototype.getError(msg.data.message);
								}
								setTimeout(() => {
									Vue.prototype.goto(msg.data.url);
								}, 1000);
								return false;
							}
							//判断有没有映射
							if (formActionData.mapperKeys) {
								
								formActionData.mapperKeys.split(",").forEach((
									mapperKey, index) => {
									let value = formActionData.mapperValues
										.split(",")[index];

									if (value == "lists" &&
										"current_page" in msg.data[
											mapperKey]) {
										that.data.canLoadMore = true;
										console.log(msg.data[mapperKey]);
										let lastPage = msg.data[mapperKey]
											.last_page;
										let nextPage = parseInt(msg.data[
											mapperKey].current_page);
										that.data.lastPage = parseInt(msg
											.data[mapperKey].last_page);
										that.data.nextPage = nextPage;
										if (lastPage > nextPage) { //如果还有下一页
											that.data.hasMore = true;
										} else {
											that.data.hasMore = false;
										}
									}
									if (that.data.nextPage > 1) {
										console.log("bba");
										msg.data[mapperKey].data.forEach((v,
											i) => {
											that.data.lists.data
												.push(v);
										});
										console.log(that.data.lists);
									} else {

										that.$set(that.data, value, msg
											.data[mapperKey]);
									}

								});
							}else{
								//如果没有映射；就把全部字段填充到data
							
								for (var i in msg.data) {
									that.$set(that.data, i, msg.data[i]);
								}
								
							}

							if (formActionDataIndex == that.formAction.length - 1) {
								uni.hideLoading();
								that.$set(that.data, "show", true);
								uni.stopPullDownRefresh();
								resolve(msg.data);
							}


						}
					});
				}


			})

			return;
			uni.request({
				url: Vue.prototype.getSiteName() + url,
				data: data,
				header: {
					//'custom-header': 'hello' //自定义请求头信息
					'Authorization': uni.getStorageSync("token")
				},
				success: (msg) => {

					uni.hideLoading();
					if (msg.statusCode != 200) {
						Vue.prototype.getError("服务器繁忙");
						return false;
					}
					if (msg.data.status == 3) {
						if ("message" in msg.data) {
							Vue.prototype.getError(msg.data.message);
						}
						setTimeout(() => {
							Vue.prototype.goto(msg.data.url);
						}, 1000);
						return false;
					}
					if ("lists" in msg.data && "current_page" in msg.data.lists) { //判断是否有分页
						let lastPage = msg.data.lists.last_page;
						let nextPage = parseInt(msg.data.lists.current_page);
						that.data.lastPage = parseInt(msg.data.lists.last_page);
						that.data.nextPage = nextPage;
						if (lastPage > nextPage) { //如果还有下一页

							that.data.hasMore = true;
						} else {
							that.data.hasMore = false;
						}
						if (nextPage >= 2) {

							msg.data.lists.data.forEach((v, i) => {
								that.data.lists.data.push(v);
							});
						}
					}
					if ("cardLog" in msg.data && "current_page" in msg.data.cardLog &&
						nextPage >= 2) { //判断是否有分页
						msg.data.cardLog.data.forEach((v, i) => {
							that.data.cardLog.data.push(v);
						});
					}

					if (!nextPage || nextPage < 2) {
						for (var i in msg.data) {
							that.$set(that.data, i, msg.data[i]);
						}
						that.$set(that.data, "show", true);
					}
					that.data.canLoadMore = true;
					uni.stopPullDownRefresh();
					resolve(msg.data);
				}
			});
		})
	};


	Vue.prototype.getAjaxForApp = (that, data, notLoading) => {

		let url = that.formAction;
		that.data.canLoadMore = true;

		let nextPage = that.data.nextPage;
		if (nextPage) {
			that.data.canLoadMore = false;
			that.data.thisPage = nextPage;
		}
		url = urlApendOpenidForApp(url, that);


		//that.$set(that.data, "show", true);
		that.$set(that.data, "query", that.$mp.query);
		// if (!notLoading) {
		// 	if (!nextPage || nextPage == 1) {
		// 		uni.showLoading({
		// 			title: '加载中',
		// 		})
		// 	}
		// }
		return new Promise((resolve, reject) => {
			let openid = uni.getStorageSync('openid');


			uni.request({
				url: Vue.prototype.getSiteName() + url,
				data: data,
				header: {
					//'custom-header': 'hello' //自定义请求头信息
				},
				success: (msg) => {

					//uni.hideLoading();
					if (msg.statusCode != 200) {
						Vue.prototype.getError("服务器繁忙");
						return false;
					}
					if (msg.data.status == 3) {
						if ("message" in msg.data) {
							Vue.prototype.getError(msg.data.message);
						}
						setTimeout(() => {
							Vue.prototype.goto(msg.data.url);
						}, 1000);
						return false;
					}
					if ("lists" in msg.data && "current_page" in msg.data.lists) { //判断是否有分页
						let lastPage = msg.data.lists.last_page;
						let nextPage = parseInt(msg.data.lists.current_page);
						that.data.lastPage = parseInt(msg.data.lists.last_page);
						that.data.nextPage = nextPage;
						if (lastPage > nextPage) { //如果还有下一页

							that.data.hasMore = true;
						} else {
							that.data.hasMore = false;
						}
						if (nextPage >= 2) {

							msg.data.lists.data.forEach((v, i) => {
								that.data.lists.data.push(v);
							});
						}
					}
					if ("cardLog" in msg.data && "current_page" in msg.data.cardLog &&
						nextPage >= 2) { //判断是否有分页
						msg.data.cardLog.data.forEach((v, i) => {
							that.data.cardLog.data.push(v);
						});
					}

					if (!nextPage || nextPage < 2) {
						for (var i in msg.data) {
							that.$set(that.data, i, msg.data[i]);
						}
						that.$set(that.data, "show", true);
					}
					that.data.canLoadMore = true;
					uni.stopPullDownRefresh();
					resolve(msg.data);
				}
			});
		})
	};

}




function urlApendOpenidForApp(url, that) {


	if (that && that.data.nextPage) {
		url += "&page=" + that.data.nextPage;
	}
	var city = uni.getStorageSync('city');
	if (city) {
		if (url.indexOf('?') != -1) {
			url += "&city=" + city;
		} else {
			url += "?city=" + city;
		}
	}
	var distribution = uni.getStorageSync('distribution');
	if (distribution) {
		if (url.indexOf('?') != -1) {
			url += "&distribution=" + distribution;
		} else {
			url += "?distribution=" + distribution;
		}
	}
	var location_x = uni.getStorageSync('location_x');
	var location_y = uni.getStorageSync('location_y');
	if (location_x) {
		if (url.indexOf('?') != -1) {
			url += "&location_x=" + location_x + "&location_y=" + location_y;
		} else {
			url += "?location_x=" + location_x + "&location_y=" + location_y;
		}
	}

	if (that) {
		if (url.indexOf('?') != -1) {
			url += "&";
		} else {
			url += "?";
		}
		console.log(that.$mp.query);
		for (var i in that.$mp.query) {
			if (that.$mp.query[i] && i != 'city') {
				if (i == "scene") {
					console.log(that.$mp.query[i].split("%2C"));
					that.$mp.query[i].split("%2C").forEach(v => {
						let arr = v.split("%3A");
						if (arr.length >= 2) {
							url += arr[0] + "=" + arr[1] + "&";
							if (arr[0] == 'distribution') {
								uni.setStorageSync("distribution", arr[1]);
							}
						} else {
							url += "scene=" + arr[0] + "&";
						}

					});
				} else {
					if (i == 'distribution') {
						uni.setStorageSync("distribution", that.$mp.query[i]);
					}
					url += i + "=" + that.$mp.query[i] + "&";

				}

			}

		}
	}
	//console.log(url);

	return url;
}


function urlApendOpenid(url, that) {

	let openid = uni.getStorageSync('openid')

	let site_name = uni.getStorageSync('site_name');

	let api_token = uni.getStorageSync('unionid') ? uni.getStorageSync('unionid') : openid;

	if (url.indexOf('?') != -1) {

		url += "&openid=" + openid

	} else {
		url += "?openid=" + openid

	}

	if (that && that.data.nextPage) {
		url += "&page=" + that.data.nextPage;
	}
	var city = uni.getStorageSync('city');
	if (city) {
		if (url.indexOf('?') != -1) {
			url += "&city=" + city;
		} else {
			url += "?city=" + city;
		}
	}
	var distribution = uni.getStorageSync('distribution');
	if (distribution) {
		if (url.indexOf('?') != -1) {
			url += "&distribution=" + distribution;
		} else {
			url += "?distribution=" + distribution;
		}
	}

	var location_x = uni.getStorageSync('location_x');
	var location_y = uni.getStorageSync('location_y');
	if (location_x) {
		if (url.indexOf('?') != -1) {
			url += "&location_x=" + location_x + "&location_y=" + location_y;
		} else {
			url += "?location_x=" + location_x + "&location_y=" + location_y;
		}
	}

	if (that) {
		if (url.indexOf('?') != -1) {
			url += "&";
		} else {
			url += "?";
		}
		for (var i in that.$mp.query) {
			if (that.$mp.query[i] && i != 'city') {
				if (i == "scene") {
					console.log(that.$mp.query[i].split("%2C"));
					let scene = unescape(that.$mp.query[i]);
					scene.split("&").forEach(v => {
						let arr = v.split("=");
						if (arr.length >= 2) {
							url += arr[0] + "=" + arr[1] + "&";
							if (arr[0] == 'distribution') {
								uni.setStorageSync("distribution", arr[1]);
							}
							if (arr[0] == 'merchantUserId') {
								uni.setStorageSync("merchantUserId", arr[1]);
							}
						} else {
							url += "scene=" + arr[0] + "&";
						}
					});
				} else {
					if (i == 'distribution') {
						uni.setStorageSync("distribution", that.$mp.query[i]);
					}
					url += i + "=" + that.$mp.query[i] + "&";

				}

			}

		}
	}
	return url;
}
export default myfun;
