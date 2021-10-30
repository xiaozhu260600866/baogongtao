function get_param_url(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(url.indexOf("?") + 1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}


function getSiteName() {
    return window.location.href.split(".")[0].split("//")[1];
}




function shareWecharUrl(url) {

    var shareUrl = $("#shareUrl").val();
    if (shareUrl.indexOf('distribution') != -1) {
        var distribution = get_param_url("distribution", shareUrl);
        if (url.indexOf("?") != -1) {
            url += "&distribution=" + distribution;
        } else {
            url += "?distribution=" + distribution;
        }
    }
    var name = $("#web_title").val();
    wx.ready(function() {
        wx.onMenuShareTimeline({
            title: name, // 分享标题
            link: url, // 分享链接
            imgUrl: $("#web_logo").val(), // 分享图标
            success: function() {

            },
            cancel: function() {}
        });
        wx.onMenuShareAppMessage({
            title: name, // 分享标题
            desc: $("#web_title").attr("data-value"), // 分享描述
            link: url, // 分享链接
            imgUrl: $("#web_logo").val(), // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {

            },
            complete: function() {

            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}

function openPopup(obj) {
    $(obj).popup();
}

function closePopup() {
    $.closePopup();
}

function ajaxVue(url, method, data, fun) {
    showLoading_vue();
    $.ajax({
        url: url,
        type: method,
        dataType: "json",
        data: data,
        success: function(msg) {
            hideLoading_vue();
            if (msg.status == 2) {
                if ("message" in msg) {
                    alert(msg.message);
                }

                fun(msg);
            } else {
                alert(msg.message);
                return false;
            }
        }
    })
}

function getPrompt(fun) {
    $.prompt({
        text: "提现金额不得少于10元",
        title: "请输入提现金额",
        empty: false,
        onOK: function(text) {
            var amount = parseFloat(text);
            /* if (amount <= 20 || isNaN(amount)) {
                 alert("少于20元不能提现谢谢");
                 window.location.reload();
                 return false;
             }*/
            if (amount < 10) {
                alert("小于10元不能提现谢谢");
                window.location.reload();
                return false;
            }
            fun(amount);
        },
        onCancel: function() {
            console.log("取消了");
        },
        input: ''
    });
}

function getPrompt2(fun) {
    $.prompt({
        text: "提现金额不得少于20元",
        title: "请输入提现金额",
        empty: false,
        onOK: function(text) {
            var amount = parseFloat(text);
            /* if (amount <= 20 || isNaN(amount)) {
                 alert("少于20元不能提现谢谢");
                 window.location.reload();
                 return false;
             }*/
            if (amount < 20) {
                alert("小于20元不能提现谢谢");
                window.location.reload();
                return false;
            }
            fun(amount);
        },
        onCancel: function() {
            console.log("取消了");
        },
        input: ''
    });
}
/*URL参数替换。参数一：替换的URL，参数二：是参数，参数三：是值。。如changeURLPar(url,page,2)*/
/*第一是url*/
/*第二是参数*/
/*第三是参数的值*/
function changeCity() {
    $("#home-city").cityPicker({
        title: "选择所在地",
        onChange: function(picker, values, displayValues) {
            var city = displayValues[0] + displayValues[1] + displayValues[2];
            console.log(city);
            $("#home-city").val(city);
        }
    });
}

function takeDate(myDate) {
    let start_month_ = parseInt((myDate.getMonth() + 1));
    if (start_month_ < 10) start_month_ = "0" + start_month_;
    return myDate.getFullYear() + "-" + start_month_ + "-" + myDate.getDate()
}

function getDate(obj) {
    $(obj).datetimePicker();
}

function delVue(id, tablename, fun) {
    $.confirm("是否要删除", function() {
        showLoading_vue();
        $.ajax({
            url: '/ajax/mydel',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                _token: $("#token").val(),
                tablename: tablename
            },
            success: function(msg) {
                hideLoading_vue();
                fun(msg);
            }
        })
    }, function() {
        //取消操作
    });
}

function changeOrderStatus(id, fun, status, message) {
    $.confirm(message, function() {
        showLoading_vue();
        $.ajax({
            url: '/user/change-order-status',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                _token: $("#token").val(),
                status: status
            },
            success: function(msg) {
                hideLoading_vue();
                fun(msg);
            }
        })
    }, function() {
        //取消操作
    });
}

function changeIntegralStatus(data, fun, message) {
    $.confirm(message, function() {
        showLoading_vue();
        $.ajax({
            url: '/integral/change-integral-status',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(msg) {
                hideLoading_vue();
                fun(msg);
            }
        })
    }, function() {
        //取消操作
    });
}

function showLoading_vue() {
    $.showLoading();
}

function hideLoading_vue() {
    $.hideLoading();
}

function paramsUrl(that) { //查看是否有路由转多个参数,如果有就一一替换 
    var params = getUrlArgObject();
    for (var key in params) {
        that.formAction = formatUrl(that.formAction, key, params[key]);
    }
}
//通过正则匹配获取当前页面的url中的参数
function getUrlArgObject() {
    var args = new Object();
    var url = window.location.href;
    var url = url.substr(url.indexOf("?") + 1);
    var pairs = url.split("&"); //在逗号处断开  
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value  
        if (pos == -1) { //如果没有找到就跳过  
            continue;
        }
        var argname = pairs[i].substring(0, pos); //提取name  
        var value = pairs[i].substring(pos + 1); //提取value  
        args[argname] = unescape(value); //存为属性  
    }
    return args; //返回对象  
}
//取url其中一个参数
function get_param(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var url = window.location.href;
    var r = url.substr(url.indexOf("?") + 1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function formatPageUrl(page, url) {
    if (url.indexOf("?")) {
        if (url.indexOf("page")) {
            return changeURLPar(url, "page", page);
        } else {
            return url + "&page=" + page;
        }
    } else {
        return url + "?page=" + page;
    }
}
/*URL参数替换。参数一：替换的URL，参数二：是参数，参数三：是值。。如changeURLPar(url,page,2)*/
function changeURLPar(destiny, par, par_value) {
    var pattern = par + '=([^&]*)';
    var replaceText = par + '=' + par_value;
    if (destiny.match(pattern)) {
        var parAndValue = par + "=" + par_value;
        var tmp = '/(?![?&])(' + par + ')=\\w+/gi';
        tmp = destiny.replace(eval(tmp), parAndValue);
        return (tmp);
    } else {
        if (destiny.match('[\?]')) {
            return destiny + '&' + replaceText;
        } else {
            return destiny + '?' + replaceText;
        }
    }
    return destiny + '\n' + par + '\n' + par_value;
}
/*第一是url*/
/*第二是参数*/
/*第三是参数的值*/
function formatUrl(url, par, par_value) {
    if (url.indexOf("?") >= 0) {
        if (url.indexOf(par) >= 0) {
            return changeURLPar(url, par, par_value);
        } else {
            console.log(par_value);
            return url + "&" + par + "=" + par_value;
        }
    } else {
        console.log(par_value);
        return url + "?" + par + "=" + par_value;
    }
}

function scrollVue(that) {
    if (that.busy) return;
    that.busy = true;
    setTimeout(function() {
        var thisPage = that.thisPage;
        that.thisPage = thisPage + 1;
        var nextPage = that.thisPage;
        var lastPage = that.lastPage;
        that.formAction = formatPageUrl(nextPage, that.formAction);
        if (lastPage >= nextPage) { //如果还有下一页
            that.hasMore = true;
            setTimeout(function() {
                $.ajax({
                    url: that.formAction,
                    type: 'get',
                    dataType: 'json',
                    data: {},
                    success: function(msg) {
                        that.thisPage = msg.lists.current_page;
                        that.lastPage = msg.lists.last_page;
                        for (var i = 0; i < msg.lists.data.length; i++) {
                            that.listData.push(msg.lists.data[i]);
                        }
                        if (that.lastPage < that.thisPage) that.hasMore = true;
                        else that.hasMore = false;
                        that.busy = false;
                    }
                })
            }, 300);
        } else {}
    }, 1000);
}

function getAjaxVaildFormBefore(fun, that) {
    $(".validform_ajax").Validform({
        tiptype: function(msg, o) {
            if (o.type == 3) getError(msg);
        },
        datatype: {
            "realname": /^[^%$&'"<>%*]{1,}$/,
            "birthday": /^\d{4}-\d{2}-\d{2}$/,
            "phone": /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/,
            "price": /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
            "str": /^[^'"*]{1,}$/,
            "idcardno": /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
        },
        tipSweep: true,
        showAllError: false,
        ajaxPost: true,
        beforeSubmit: function(data) {
            //console.log(that);return false;
            showLoading_vue;
            if (that.productData.length == 0) {
                alert("您还没有选择产品，请不要提交");
                return;
            }
            var str = "<input name='_token' value='" + $("#token").val() + "' type='hidden'>";
            var productDatas = JSON.stringify(that.productData);
            var productData = "<input name='productData' value='" + productDatas + "' type='hidden'>";
            $(".validform_ajax").append(str);
            $(".validform_ajax").append(productData);
        },
        callback: function(msg) {
            if ($(window).width() < 700) {
                hideLoading_vue();
            } else {
                $(".loading-bg").hide();
                $(".loading").hide();
            }　　　　
            if (msg.status == 2) {
                if ("message" in msg) {
                    getSuccess(msg.message);
                }
                if (typeof(fun) != "undefined") {
                    fun(msg);
                }
                return false;
            }
            getError(msg.message);
            if (typeof(fun) != "undefined") {
                fun(msg);
            }
        },
        sucmsg: null,
        ignoreHidden: true
    });
}

function getAjaxVaildForm(fun) {
    $(".validform_ajax").Validform({
        tiptype: function(msg, o) {
            if (o.type == 3) getError(msg);
        },
        datatype: {
            "realname": /^[^%$&'"<>%*]{1,}$/,
            "birthday": /^\d{4}-\d{2}-\d{2}$/,
            "phone": /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/,
            "price": /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
            "str": /^[^'"*]{1,}$/,
            "idcardno": /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
        },
        tipSweep: true,
        showAllError: false,
        ajaxPost: true,
        beforeSubmit: function(data) {
            showLoading_vue;
            var str = "<input name='_token' value='" + $("#token").val() + "' type='hidden'>";
            $(".validform_ajax").append(str);
        },
        callback: function(msg) {
            if ($(window).width() < 700) {
                hideLoading_vue();
            } else {
                $(".loading-bg").hide();
                $(".loading").hide();
            }　　　　
            if (msg.status == 2) {
                if ('url' in msg) { //判断对像是否存在url的属性
                    if ("message" in msg) {
                        getLocation(msg.message, msg.url);
                    } else {
                        window.location.href = msg.url;
                    }
                    return false;
                }
                if ('reload' in msg) { //判断对像是否存在url的属性
                    getReload(msg.message);
                    return false;
                }
                if ("message" in msg) {
                    getSuccess(msg.message);
                }
                if (typeof(fun) != "undefined") {
                    fun(msg);
                }
                return false;
            }
            getError(msg.message);
            if (typeof(fun) != "undefined") {
                fun(msg);
            }
        },
        sucmsg: null,
        ignoreHidden: true
    });
}

function getSuccess(msg) {
    $.toast(msg, function() {});
}

function getError(msg) {
    $.toast(msg, "cancel", function(toast) {});
}


function implodeCover(fileList) {

    var newFileList = [];
    for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].response) newFileList.push(fileList[i].response);
        else newFileList.push(fileList[i].name);
    }
    console.log(newFileList);
    return newFileList;
}

function splitCover(cover, path) {
    var fileList = [];
    var covers = cover.split(",");
    for (var i = 0; i < covers.length; i++) {
        if (covers[i]) fileList.push({ name: covers[i], url: '/upload/images/' + path + '/' + covers[i] });
        /* else fileList.push({name:covers[i],url:'/images/nopic.jpg'});*/

    }
    return fileList;
}