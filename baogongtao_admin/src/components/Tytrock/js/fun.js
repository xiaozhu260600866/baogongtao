const fun = function() {}

fun.install = (Vue, options) => {
	Vue.prototype.tytConfirm = (opt, that) => {
        return new Promise((resolve, reject) => {
			that.$msgbox({
				title: '提示',
				type: 'warning',
				message: opt.msg,
				showInput: opt.showInput,
				inputPlaceholder: opt.inputPlaceholder,
				inputType: opt.inputType,
				inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				inputErrorMessage: '邮箱格式不正确',
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				confirmButtonLoading: false,
				beforeClose: (act, instance, done) => {
		    		if (act === 'confirm') {
		    			// console.log(instance);
		    			if (opt.showInput) {
		    				if (!instance.inputValue) {
			    				that.$message.error(opt.inputPlaceholder)
			    				return
			    			}
		    			}
		            	instance.confirmButtonLoading = true
		            	instance.confirmButtonText = '操作中...'

						resolve({ done: done, instance: instance })

		    //         	action({action:'to-examine',id:this.detailData.id}).then(res => {
		    //         		instance.confirmButtonLoading = false;
						// 	this.$message.success(res.msg);
						// 	this.detailData = res.data.data;
						// 	done();
						// })
		    		} else {
		    			done()
		    		}
		  		}
			}).then(act => {
				reject()
			}).catch(() => {
				reject()
	        })
		})
    }

    Vue.prototype.msgSuccess = (msg, that) => {
    	that.$message.success(msg)
    }
    Vue.prototype.msgError = (msg, that) => {
    	that.$message.error(msg)
    }

    // 计算n年(y)或n月(M)或n日(d)前后的日期
    Vue.prototype.initDefaultDate = (n, timeUnit) => {
	    var curr_date = new Date()
	    if (timeUnit === 'd') {
	    curr_date.setDate(curr_date.getDate() + n)
	    } else if (timeUnit === 'M') {
	        curr_date.setMonth(curr_date.getMonth() + n)
	    } else if (timeUnit === 'y') {
	        curr_date.setFullYear(curr_date.getFullYear() + n)
	    }
	    var strYear = curr_date.getFullYear()
	    var strMonth = curr_date.getMonth() + 1
	    var strDay = curr_date.getDate()
	    var strHours = curr_date.getHours()
	    var strMinutes = curr_date.getMinutes()

		strMonth = strMonth < 10 ? '0' + strMonth : strMonth
		strDay = strDay < 10 ? '0' + strDay : strDay

	    var datastr = strYear + '-' + strMonth + '-' + strDay
	    // var datastr = strYear + '-' + formatNumber(strMonth) + '-' + formatNumber(strDay) +' '+ formatNumber(strHours) + ':' + formatNumber(strMinutes);
	    return datastr
	}
}

export default fun
