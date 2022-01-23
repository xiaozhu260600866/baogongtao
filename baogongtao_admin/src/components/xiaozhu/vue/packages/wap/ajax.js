var ajax = function() {}

ajax.install = function(Vue, options) {
    /* ajax get请求*/
    Vue.prototype.getAjax = function(that, data, fun) {
        that.data.show = false
        document.getElementById('share-overlay').style.display = 'inline'

        that.data.canLoadMore = true
        var url = urlApendOpenid(that.formAction, that)
        var nextPage = that.data.nextPage
        if (nextPage) {
            that.data.canLoadMore = false
            that.data.thisPage = nextPage
        }

        Vue.prototype.$http.get(Vue.prototype.getSiteName() + url, { params: data }).then(function(msg) {
            document.getElementById('share-overlay').style.display = 'none'
            if (msg.data.status == 9) {
                localStorage.clear()
                sessionStorage.clear()
                Vue.prototype.goto('/wap/login')
            }
            if ('lists' in msg.data && 'current_page' in msg.data.lists) { // 判断是否有分页
                var lastPage = msg.data.lists.last_page
                var nextPage = parseInt(msg.data.lists.current_page)
                that.data.nextPage = nextPage
                if (lastPage > nextPage) { // 如果还有下一页
                    that.data.hasMore = true
                } else {
                    that.data.hasMore = false
                }
                if (nextPage >= 2) {
                    for (var i = 0; i < msg.data.lists.data.length; i++) {
                        var v = msg.data.lists.data[i]
                        that.data.lists.data.push(v)
                    }
                }
            }
            that.data.canLoadMore = true
            that.data.url = data.url
            if (!nextPage || nextPage < 2) {
                for (var i in msg.data) {
                    // alert(i+':'+msg.data[i]);
                    // alert(msg.data[i]);
                    that.$set(that.data, i, msg.data[i])
                }
                localStorage.setItem('formAction', that.formAction)
            }
            that.data.show = true
            fun(that.data)
        })
    }
    /* ajax post 请求*/

    Vue.prototype.postAjax = function(url, data, fun, notLoading) {
        url = urlApendOpenid(url)
        if (!notLoading) {
            Vue.prototype.showLoading()
        }
        Vue.prototype.$http.post(localStorage.getItem('siteName') + url, data).then(function(msg) {
            if ('message' in msg.data && msg.data.status == 3) { // 判断对像是否存在url的属性
                Vue.prototype.getError(msg.data.message)
            }
            if ('message' in msg.data && msg.data.status == 2) { // 判断对像是否存在url的属性
                Vue.prototype.getSuccess(msg.data.message)
            }
            if ('status' in msg.data && msg.data.status == 9) {
                localStorage.clear()
                sessionStorage.clear()
                // Vue.prototype.goto("/wap/login");
                window.location.href = localStorage.getItem('siteName') + '#wap/login'
                // console.log(Vue);
                // Vue.$router.push({path:'/wap/login'});
            }
            Vue.prototype.hideLoading()
            fun(msg)
        })
    }
}

// 通过正则匹配获取当前页面的url中的参数
function getUrlArgObject() {
    var args = new Object()
    var url = window.location.href
    var url = url.substr(url.indexOf('?') + 1)
    var pairs = url.split('&') // 在逗号处断开
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=') // 查找name=value
        if (pos == -1) { // 如果没有找到就跳过
            continue
        }
        var argname = pairs[i].substring(0, pos) // 提取name
        var value = pairs[i].substring(pos + 1) // 提取value
        args[argname] = unescape(value) // 存为属性
    }
    return args // 返回对象
}

function urlApendOpenid(url, that) {
    var userInfo = localStorage.getItem('userInfo')
    var openid = localStorage.getItem('openid')
    var site_name = localStorage.getItem('site_name')
    var api_token = localStorage.getItem('api_token')
    // alert(openid);
    if (openid && !api_token) {
        if (url.indexOf('?') != -1) {
            url += '&source=app&userInfo=' + userInfo + '&api_token=' + openid + '&openid=' + openid + '&site_name=' + site_name
        } else {
            url += '?source=app&userInfo=' + userInfo + '&api_token=' + openid + '&openid=' + openid + '&site_name=' + site_name
        }
    }
    if (openid && api_token) {
        if (url.indexOf('?') != -1) {
            url += '&source=app&userInfo=' + userInfo + '&api_token=' + api_token + '&openid=' + openid + '&site_name=' + site_name
        } else {
            url += '?source=app&userInfo=' + userInfo + '&api_token=' + api_token + '&openid=' + openid + '&site_name=' + site_name
        }
    }

    if (that && that.data.nextPage) {
        if (url.indexOf('?') != -1) {
            url += '&page=' + that.data.nextPage
        } else {
            url += '?page=' + that.data.nextPage
        }
    }
    // var params = getUrlArgObject();
    if (that && that.data && that.data.query) {
        for (var key in that.data.query) {
            if (url.indexOf('?') != -1) {
                url += '&' + key + '=' + that.data.query[key]
            } else {
                url += '?' + key + '=' + that.data.query[key]
            }
        }
    }

    return url
}

export default ajax
