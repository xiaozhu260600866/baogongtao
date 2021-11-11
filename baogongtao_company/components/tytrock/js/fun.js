const fun = function() {};
fun.install = (Vue, options) => {
	
	Vue.prototype.back = () => {
		uni.navigateBack({})
	},
	
	Vue.prototype.linkTo = (url, type,refreshUrl) => {
		if(refreshUrl){
			uni.setStorageSync('refreshUrl',refreshUrl);
		}
		if (type && type == 2) {
			uni.switchTab({
				url: url
			})
			return false;
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
	
	
	Vue.prototype.timeoutLinkTo = (that,url,type=1) => {
		setTimeout(()=>{
			if(url=='back') uni.navigateBack()
			else that.linkTo(url,type)
		},1000)
	}
	
	Vue.prototype.pageLoading = (that,state=true) => {
		that.$refs.page.pageLoading = state;
	},
	Vue.prototype.submitLoading = (that,state=true,text="操作中...") => {
		that.$refs.page.submitLoadingText = text;
		that.$refs.page.submitLoading = state;
	},
	
	//是否为空
	Vue.prototype.isNullOrEmpty = (value) => {
		return (value === null || value === '' || value === undefined) ? true : false;
	},
	
	Vue.prototype.isArray = (value) => {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(value);
		} else {
			return Object.prototype.toString.call(value) === '[object Array]';
		}
	},
	Vue.prototype.isObject = (value) => {
		return Object.prototype.toString.call(value) === '[object Object]';
	},
	Vue.prototype.isFunction = (value) => {
		return typeof value === 'function';
	},
	Vue.prototype.isString = (value) => {
		return typeof value === 'string';
	},
	Vue.prototype.isBoolean = (value) => {
		return typeof value === 'boolean';
	},
	Vue.prototype.isNumber = (value) => {
		return typeof value === 'number' && !isNaN(value);
	},
	
	Vue.prototype.previewImage = (url) => {
		uni.previewImage({
			current: url, // 当前显示图片的http链接
			urls: [url] // 需要预览的图片http链接列表
		})
	},
	
	Vue.prototype.setTitle = (title) => {
		if (title.length > 15) {
			title = title.substring(0, 15) + '...';
		}
		uni.setNavigationBarTitle({
			title: title //页面标题为路由参数
		})
	},
	
	Vue.prototype.in_array = (search, array) => {
		for (var i in array) {
			if (array[i] == search) {
				return true;
			}
		}
		return false;
	},
	
	Vue.prototype.copy = (content) => {
		uni.setClipboardData({
			data: content,
			success: () => {
				Vue.prototype.getSuccess('复制成功');
			}
		});
	},
	
	Vue.prototype.callPhone = (phone) => {
		uni.makePhoneCall({
			phoneNumber: phone
		})
	},
	
	//手机号码验证
	Vue.prototype.verifyMobile = (value) => {
		return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
	},
	
	Vue.prototype.location = (x, y, address) => {
		wx.openLocation({
			latitude: parseFloat(x),
			longitude: parseFloat(y),
			scale: 18,
			name: address,
			address: address
		})
	},
	
	/**
	 * 计算n天后的日期
	 * initDate：开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd
	 * days:天数
	 * flag：返回值， 年与日之间的分隔符， 默认为xxxx年xx月xx日格式
	 */
	Vue.prototype.getDateAfter = (initDate, days, flag) => {
		
		if(!days){
			return initDate;
		}
		initDate = initDate.replace(/-/g,'');
		var date;
		// 是否设置了起始日期
		if(!initDate){ // 没有设置初始化日期，就默认为当前日期
	        date = new Date();  
		}else{
			var year = initDate.substring(0,4);
			var month = initDate.substring(4,6);
			var day = initDate.substring(6,8);
			date = new Date(year, month-1, day); // 月份是从0开始的
		}
		date.setDate(date.getDate() + days);
	 
		var yearStr = date.getFullYear();
		var monthStr = ("0"+(date.getMonth()+1)).slice(-2, 8); // 拼接2位数月份
		var dayStr = ("0"+date.getDate()).slice(-2, 8); // 拼接2位数日期
		var result = "";
		if(!flag){
			result = yearStr+"年"+monthStr+"月"+dayStr+"日";
		}else{
			result = yearStr+flag+monthStr+flag+dayStr;
		}
		return result;
	},
	
	//计算n年(y)或n月(M)或n日(d)前后的日期
	Vue.prototype.initDefaultDate = (n,timeUnit) => {
	    var curr_date = new Date();
	    if (timeUnit === 'd') {
	    curr_date.setDate(curr_date.getDate() + n);
	    } else if (timeUnit === 'M') {
	        curr_date.setMonth(curr_date.getMonth() + n);
	    } else if (timeUnit === 'y') {
	        curr_date.setFullYear(curr_date.getFullYear() + n);
	    }
	    var strYear = curr_date.getFullYear();
	    var strMonth = curr_date.getMonth()+1;
	    var strDay = curr_date.getDate();
	    var strHours = curr_date.getHours();
	    var strMinutes = curr_date.getMinutes();
		
		strMonth = strMonth<10?'0'+strMonth:strMonth;
		strDay =  strDay<10?'0'+strDay:strDay;
	 
	    var datastr = strYear + '-' + strMonth + '-' + strDay;
	    //var datastr = strYear + '-' + formatNumber(strMonth) + '-' + formatNumber(strDay) +' '+ formatNumber(strHours) + ':' + formatNumber(strMinutes);
	    return datastr;
	}
	
	Vue.prototype.filterDate = (string,type)=>{
		 let date=string.replace(new RegExp(/-/gm) ,"/");
		 let dateObj= new Date(date);
		 let month = dateObj.getMonth() + 1 <10 ? '0'+(dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
		 if(type == 'm'){
		 	return month;
		 }else if(type == 'Y'){
		 	return dateObj.getFullYear();
		 }else if(type == 'd'){
		 	return dateObj.getDate();
		 }else if(type == 'Y-m'){
		 	return  dateObj.getFullYear() + '-' + month;
		 }else if(type == 'm-d'){
		 	return month + '-' + dateObj.getDate();
		 
		 }else if(type == 'Y-m-d'){
		 	 dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate()
		 }else if(type == 'Y-m-d H:i'){
		 	return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate() + ' ' + dateObj.getHours();
		 }else if(type == "Y-m-d H:i:s"){
		 	 return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();
		 }
	
		 if(!type) return  dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate()
		 return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();
	},
	
	Vue.prototype.getAge = (str)=>{
	    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
	    if(r==null)return   false;
	
	    var d= new Date(r[1],r[3]-1,r[4]);
	    var returnStr = "输入的日期格式错误！";
	
	    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){
	
	        var date = new Date();
	        var yearNow = date.getFullYear();
	        var monthNow = date.getMonth() + 1;
	        var dayNow = date.getDate();
	
	        var largeMonths = [1,3,5,7,8,10,12], //大月， 用于计算天，只在年月都为零时，天数有效
	            lastMonth = monthNow -1>0?monthNow-1:12,  // 上一个月的月份
	            isLeapYear = false, // 是否是闰年
	            daysOFMonth = 0;    // 当前日期的上一个月多少天
	
	        if((yearNow%4===0&&yearNow%100!==0)||yearNow%400===0){  // 是否闰年， 用于计算天，只在年月都为零时，天数有效
	            isLeapYear = true;
	        }
	
	        if(largeMonths.indexOf(lastMonth)>-1){
	            daysOFMonth = 31;
	        }else if(lastMonth===2){
	            if(isLeapYear){
	                daysOFMonth = 29;
	            }else{
	                daysOFMonth = 28;
	            }
	        }else{
	            daysOFMonth = 30;
	        }
	
	        var Y = yearNow - parseInt(r[1]);
	        var M = monthNow - parseInt(r[3]);
	        var D = dayNow - parseInt(r[4]);
	        if(D < 0){
	            D = D + daysOFMonth; //借一个月
	            M--;
	        }
	        if(M<0){  // 借一年 12个月
	            Y--;
	            M = M + 12; //
	        }
	
	        if(Y<0){
	            returnStr = "出生日期有误！";
	
	        }else if(Y===0){
	            if(M===0){
	                returnStr = D+"天";
	            }else{
	                returnStr = M+"月";
	            }
	        }else{
				returnStr = Y+"岁";
				/*
	            if(M===0){
	                returnStr = Y+"岁";
	            }else{
	                returnStr = Y+"Y"+M+"M";
	            }
				*/
	        }
	
	    }
	
	    return returnStr;
	},
	
	//获取缓存
	Vue.prototype.getStorage = (name, callBack) => {
		return new Promise((resolve, reject) => {
			uni.getStorage({
				key: name,
				success(res) {
					if (callBack) callBack();
					resolve(res.data)
				},
				fail: res => {
					if (callBack) callBack();
					resolve(res)
				}
			})
		})
	},
	
	Vue.prototype.getParent = (that) => {
		let parent = that.$parent;
		while (parent) {
			if (parent.mpType != 'page') {
				parent = parent.$parent;
			} else {
				return parent;
				break;
			}
		}
	},
	
	Vue.prototype.apiRequest = (url, postData, method, hideLoading, type,urlNotApi) => {
		//接口请求
		if (!hideLoading) {
			uni.showLoading({
				mask: true,
				title: '',
			})
		}
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
	   
		//console.log(sign);
		return new Promise((resolve, reject) => {
			let sysUrl = urlNotApi==1?api.url:api.interfaceUrl;
			uni.request({
				url: sysUrl + url,
				data: postData,
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
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
	},
	
	Vue.prototype.wechatPay = (jssdk) => {
		jssdk = JSON.parse(jssdk);
		return new Promise((resolve, reject) => {
			//console.log(jssdk)
			//微信支付
			wx.requestPayment({
				//'appId': "wx5a7764389b995046",
				'timeStamp': jssdk.timeStamp,
				'nonceStr': jssdk.nonceStr,
				'package': jssdk.package,
				'signType': jssdk.signType,
				'paySign': jssdk.paySign,
				'success': res => {
					//发送模板消息结束
					//if(success) success();
					resolve(res);
				},
				'fail': res => {
					console.log(jssdk);
					//if(fail) fail();
					reject(res);
				},
				'complete': res =>{
					console.log(res)
				}
			})

		});
	}
}
export default fun;