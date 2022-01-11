const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.getError = (content) => {
		// uni.showModal({
		// 	title: '提示',
		// 	content: content,
		// 	showCancel: false,
		// 	success: function(res) {
		// 		if (res.confirm) {} else if (res.cancel) {}
		// 	}
		// })
		uni.showToast({
			title: content,
			icon: 'none',
			duration: 2000
		})
	};
	Vue.prototype.getSuccess = (content) => {
			uni.showToast({
				title: content,
				icon: 'none',
				duration: 2000
			})
		},
		Vue.prototype.getConfirm = (title, fun) => {
			return new Promise((resolve, reject) => {
				uni.showModal({
					title: '提示',
					content: title,
					success: function(res) {
						if (res.confirm) {
							if(fun)fun();
							resolve();
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			});
		}

}
export default myfun;
