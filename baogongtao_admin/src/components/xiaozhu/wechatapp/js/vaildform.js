const vaildform = function() {};
vaildform.install = (Vue, options) => {
    Vue.prototype.vaildForm = (that, fun) => {
        var ruleform = that.ruleform;
        var vaildate = that.vaildate;
        var res = false;
        setTimeout(() => {
            for (var v in vaildate) {
                for (var r in ruleform) {
                    if (v == r) {
                        var name = vaildate[v].name;
                        var vaildArr = vaildate[v].vaild.split("|");
                        var value = ruleform[r];
                        for (var i = 0; i < vaildArr.length; i++) {
                            let isChinaese = new RegExp("[\\u4E00-\\u9FFF]+", "g")
                            if (vaildArr[i] == "require" || (isChinaese.test(value) && value.indexOf('请选择') != -1)) {
                                if (!value) {
                                    Vue.prototype.getError(name + "必填");
                                    res = false;
                                    return fun(res);

                                }
                            } else if (vaildArr[i] == "phone") {
                                var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
                                if (!phoneReg.test(value)) {
                                    Vue.prototype.getError("手机格式不正确");
                                    res = false;
                                    return fun(res);
                                    return false;
                                }
                            } else if (vaildArr[i] == "integer") {
                                if (isNaN(value) == true) {
                                    Vue.prototype.getError(name + "请填写正确的数字");
                                    res = false;
                                    return fun(res);
                                    return false;
                                }
                            } else if (vaildArr[i] == "price") {
                                var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                                if (!reg.test(value)) {
                                    Vue.prototype.getError(name + "请填写正确的金额");
                                    res = false;
                                    return fun(res);
                                    return false;
                                }
                            } else if (vaildArr[i] == "array") {
                                if (value.length == 0) {
                                    Vue.prototype.getError(name + "必填");
                                    res = false;
                                    return fun(res);
                                    return false;
                                }
                            }
                        }

                    }
                }
            }
            res = true;
            return fun(res);
        }, 100)
    }
    Vue.prototype.uploadImageForWechat = (event, that, fun) => {
        let name = event.mp.currentTarget.dataset.name;
        let upurl = event.mp.currentTarget.dataset.upurl;
        let thumbsize = event.mp.currentTarget.dataset.thumbsize;
        let allowuploadnum = event.mp.currentTarget.dataset.allowuploadnum;
        if (that.ruleform[name]) {
            if (that.ruleform[name].length >= parseInt(allowuploadnum)) {
                Vue.prototype.getError("只允许上传" + allowuploadnum + "图片");
                return false;
            }

        }
        let uploadUrl = that.getSiteName + '/ajax/app-upload-pic';
        console.log(uploadUrl);
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                var tempFilePaths = res.tempFilePaths;
                wx.showLoading({
                    title: '上传中',
                })
                wx.uploadFile({ //上传服务器
                    url: uploadUrl, //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    header: {
                        'content-type': 'multipart/form-data'
                    },
                    formData: {
                        'upurl': upurl,
                    },
                    success: res => {
                        let data = JSON.parse(res.data);
                        let file = data.filename;

                        if (!that.ruleform[name]) that.ruleform[name] = [];
                        that.ruleform[name].push(file);

                        Vue.prototype.postAjax("/ajax/image-resize", { type: upurl, value: file, size: [thumbsize] }, msg => {}, that);
                        wx.hideLoading();
                        fun();
                    },
                    fail: function(res) {
                        console.log(res);
                    },
                    complete: function(res) {
                        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                    }
                })
            }
        })
    }
    Vue.prototype.updateHeadImg=(fun)=>{
       let uploadUrl =  Vue.prototype.getSiteName()+ '/ajax/app-upload-pic';
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                var tempFilePaths = res.tempFilePaths;
                wx.showLoading({
                    title: '上传中',
                })
                wx.uploadFile({ //上传服务器
                    url: uploadUrl, //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    header: {
                        'content-type': 'multipart/form-data'
                    },
                    formData: {
                        'upurl': "card",
                    },
                    success: res => {
                        let data = JSON.parse(res.data);
                        let file = data.filename;
                        wx.hideLoading();
                        let newFile =  Vue.prototype.getSiteName()+'/upload/images/card/'+file;
                        fun(newFile);
                    },
                    fail: function(res) {
                        console.log(res);
                    },
                    complete: function(res) {
                        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
                    }
                })
            }
        })     
    }

    /*用于删除图片*/
    Vue.prototype.delImageForWechat = (event, that) => {
        let name = event.mp.currentTarget.dataset.name;
        let key = event.mp.currentTarget.dataset.key;
        wx.showModal({
            title: '提示',
            content: "是否真的删除?",
            success: res => {
                if (res.confirm) {
                    that.ruleform[name].splice(key, 1);
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }


}


export default vaildform;