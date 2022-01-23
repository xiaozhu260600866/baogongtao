import history from './history.js'
const myfun = function() {}
myfun.install = (Vue, options) => {
    Vue.prototype.in_array = (search, array) => {
        for (var i in array) {
            if (array[i] == search) {
                return true
            }
        }
        return false
    }
    Vue.prototype.back = () => {
        wx.navigateBack({})
    },
    Vue.prototype.getQQvideoLink = (videoSrc, callBack) => {
                videoSrc = videoSrc.split('.html')
                videoSrc = videoSrc[0].split('/')
                videoSrc = videoSrc[videoSrc.length - 1]
                const url = 'https://vv.video.qq.com/getinfo?vids=' + videoSrc + '&platform=101001&charge=0&otype=json'
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
                      callBack({ url: url, title: title })
                    }
                })
    }
    Vue.prototype.getAuthPhoneNumber = (e, success, error) => {
        const session_key = wx.getStorageSync('session_key')
        if (e.mp.detail.encryptedData) {
             Vue.prototype.postAjax('/user/check-phone', { encryptedData: e.mp.detail.encryptedData, iv: e.mp.detail.iv, session_key: session_key }, msg => {
                if (msg.data.status == 3) {
                     Vue.prototype.getError('授权失败')
                    return false
                }
                success(msg)
                // this.goto('/pages/user/message/send/main?to_userid=' + this.data.user.id, 1);
            })
        } else {
            error()
            // this.goto('/pages/user/message/send/main?to_userid=' + this.data.user.id, 1);
        }
    }
    Vue.prototype.getConfirm = (title, fun) => {
        wx.showModal({
            title: '提示',
            content: title,
            success: function(res) {
                if (res.confirm) {
                    fun()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
    // 异步函数
    Vue.prototype.getStorage = (name) => {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: name,
                success(res) {
                    resolve(res.data)
                }
            })
        })
    }
     // 异步函数
    Vue.prototype.shareSource = (that, title, notShareSource) => {
        console.log(notShareSource)
        if (!notShareSource)that.data.query.shareSource = 'share'
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]
        const urlPre = currentPage.route
        let scope = ''
        for (const i in that.data.query) {
            if (that.data.query[i])scope += i + '=' + that.data.query[i] + '&'
        }
        var reg = /&$/gi
        scope = scope.replace(reg, '')
        const path = urlPre + '?' + scope
        console.log(path)
          return {
            path: path,
            title: title,
            fail: res => {

            }
        }

        // let scope = that.data.query.join("&");
        // console.log(scope);
    }
    Vue.prototype.previewImage = (url, purl) => {
        var url = Vue.prototype.getSiteName() + '/upload/images/' + purl + '/' + url
        console.log(url)
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        })
    }

    Vue.prototype.toFixed = (amount) => {
            if (amount && amount > 0) {
                amount = parseFloat(amount)
                return amount.toFixed(2)
            }
            return amount
        },
        Vue.prototype.setTitle = (title) => {
            if (title.length > 10) {
                title = title.substring(0, 10) + '...'
            }
            wx.setNavigationBarTitle({
                title: title // 页面标题为路由参数
            })
        },
        Vue.prototype.formId = (formId, fun) => {
            Vue.prototype.postAjax('/ajax/form-id', { formId: formId }, msg => {
                if (msg.data.status == 2) {
                    fun(msg)
                }
            }, 'notloading')
        }
    Vue.prototype.goto = (url, type) => {
        if (type && type == 2) {
            wx.switchTab({
                url: url
            })
            return false
        }
        if (!type) {
            wx.redirectTo({
                url: url
            })
        } else {
            wx.navigateTo({
                url: url
            })
        }
    }
    Vue.prototype.delHistoryUrl = (url) => {
        history.delUrl(url)
    }
    Vue.prototype.end = (that) => {
        that.$set(that.data, 'show', false)
        that.$set(that.data, 'nextPage', 1)
        that.$set(that.data, 'query', {})
        // that.data.show = false;
    }
    // 取自己的地理位置
    Vue.prototype.getMyAddress = (that) => {
        that.data.show = false
        wx.getLocation({
            type: 'wgs84',
            success: res => {
                wx.setStorageSync('location_x', res.latitude)
                wx.setStorageSync('location_y', res.longitude)
                if (that) {
                    that.$refs.page.ajax('notloading')
                }
            }
        })
    }

    Vue.prototype.location = (x, y, address) => {
        console.log(x)
        console.log(y)
        wx.openLocation({
            latitude: parseFloat(x),
            longitude: parseFloat(y),
            scale: 18,
            name: address,
            address: address
        })
    }
    Vue.prototype.postAjax = (url, data, fun, notLoading) => {
        if (!notLoading) {
            wx.showLoading({
                title: '加载中'
            })
        }
        url = urlApendOpenid(url)
        wx.request({
            url: wx.getStorageSync('siteName') + url,
            method: 'post',
            data: data,
            header: {
                'Accept': 'application/json'
            },
            success: msg => {
                wx.hideLoading()
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
                fun(msg)
            }
        })
    }
    Vue.prototype.getSiteName = (item) => {
        return wx.getStorageSync('siteName')
    }
    Vue.prototype.formatData = (that) => {
        /*  let pages = getCurrentPages() //获取加载的页面
          let currentPage = pages[pages.length - 1] //获取当前页面的对象
          let url = currentPage.route;*/
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
            getUser: wx.getStorageSync('userInfo')
        }
    }
    Vue.prototype.getError = (content) => {
        /* wx.showToast({
            title: content,
            image: '/image/icon/warn.png',
            duration: 2000
        })*/
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: false,
            success: function(res) {
                if (res.confirm) {

                } else if (res.cancel) {

                }
            }
        })
    }
    Vue.prototype.toDown = () => {
        setTimeout(() => {
            wx.pageScrollTo({
                scrollTop: 20000,
                duration: 50
            })
        }, 500)
    }

    Vue.prototype.getSuccess = (content) => {
        wx.showToast({
            title: content,
            icon: 'none',
            duration: 2000
        })
    }
    Vue.prototype.phone = (phone) => {
        wx.makePhoneCall({ phoneNumber: phone })
    }
    Vue.prototype.copy = (content) => {
        wx.setClipboardData({
            data: content,
            success: () => {
                Vue.prototype.getSuccess('复制成功')
            }

        })
    }
    Vue.prototype.getAjax = (that, method, data, fun, notLoading) => {
        const timer = setInterval(() => {
            wx.getStorage({
                key: 'openid',
                success: res => {
                    // console.log('a');
                    // that.$set(that.data, "show", false);

                    clearInterval(timer)
                    // that.data.getUser = res.data;
                    if (that.data.getUser.phone) {
                        that.data.getUser.phone.split('', 3)
                        const phone = that.data.getUser.phone.substring(0, 3) + '****' + that.data.getUser.phone.substring(8, 11)
                        that.$set(that.data.getUser, 'phoneSubstring', phone)
                    }
                    that.data.canLoadMore = true

                    let url = that.formAction
                    const nextPage = that.data.nextPage
                    if (nextPage) {
                        that.data.canLoadMore = false
                        that.data.thisPage = nextPage
                    }
                    url = urlApendOpenid(url, that)
                    that.$set(that.data, 'historyUrl', url)
                    that.$set(that.data, 'historyData', JSON.stringify(data))
                    // console.log(that.keepAlive);
                    if (that.$root.$mp.query) {
                        if (that.$root.$mp.query.historyUrl || (that.keepAlive != undefined && !that.keepAlive)) {
                            Vue.prototype.delHistoryUrl(url)
                        }
                    }
                    if (history.canAppendUrl(url, JSON.stringify(data)) || (that.keepAlive != undefined && !that.keepAlive)) {
                        if (!notLoading) {
                            if (!nextPage || nextPage == 1) {
                                wx.showLoading({
                                    title: '加载中'
                                })
                            }
                        }

                        wx.request({
                            url: wx.getStorageSync('siteName') + url,
                            method: method,
                            data: data,
                            header: {
                                'Accept': 'application/json'
                            },
                            success: (msg) => {
                                wx.hideLoading()
                                if (msg.statusCode != 200) {
                                    // Vue.prototype.getError("服务器繁忙");
                                    return false
                                }
                                if (msg.data.status == 3) {
                                    Vue.prototype.getError('无权限访问')
                                    setTimeout(() => {
                                        Vue.prototype.goto('/pages/distribution/add/main')
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
                                that.data.canLoadMore = true

                                that.data.url = data.url
                                if (!nextPage || nextPage < 2) {
                                    for (var i in msg.data) {
                                        that.$set(that.data, i, msg.data[i])
                                    }
                                }
                                wx.stopPullDownRefresh()
                                that.$set(that.data, 'show', true)

                                history.urlAppend(url, JSON.stringify(data))

                                fun(that.data)
                            }
                        })
                    } else {
                        that.data.show = true
                    }
                }
            })
        }, 500)
    }
}

function urlApendOpenid(url, that) {
    var openid = wx.getStorageSync('openid')
    var userinfo = wx.getStorageSync('userInfo')
    var site_name = wx.getStorageSync('site_name')
    userinfo = JSON.stringify(userinfo)
    if (url.indexOf('?') != -1) {
        url += '&openid=' + openid + '&api_token=' + openid + '&source=wechatapp&userinfo=' + userinfo + '&site_name=' + site_name
    } else {
        url += '?openid=' + openid + '&api_token=' + openid + '&source=wechatapp&userinfo=' + userinfo + '&site_name=' + site_name
    }
    if (that && that.data.nextPage) {
        url += '&page=' + that.data.nextPage
    }
    var city = wx.getStorageSync('city')
    if (city) {
        if (url.indexOf('?') != -1) {
            url += '&city=' + city
        } else {
            url += '?city=' + city
        }
    }
    var card_user_id = wx.getStorageSync('card_user_id')
    if (card_user_id) {
        if (url.indexOf('?') != -1) {
            url += '&card_user_id=' + card_user_id
        } else {
            url += '?card_user_id=' + card_user_id
        }
    }
    var location_x = wx.getStorageSync('location_x')
    var location_y = wx.getStorageSync('location_y')
    if (location_x) {
        if (url.indexOf('?') != -1) {
            url += '&location_x=' + location_x + '&location_y=' + location_y
        } else {
            url += '?location_x=' + location_x + '&location_y=' + location_y
        }
    }

    if (that && that.$root.$mp.query) {
        for (var i in that.$root.$mp.query) {
            if (i in that.data.query) {
                if (that.$root.$mp.query[i] != that.data.query[i]) {
                  that.$set(that.data.query, i, that.$root.$mp.query[i])
                }
            } else {
                that.$set(that.data.query, i, that.$root.$mp.query[i])
            }
            delete that.$root.$mp.query[i]
        }
        for (var i in that.data.query) {
            if (that.data.query[i]) {
                if (url.indexOf('?') != -1) {
                    url += '&' + i + '=' + that.data.query[i]
                } else {
                    url += '?' + i + '=' + that.data.query[i]
                }
            }
        }
    }

    return url
}

/* Vue.prototype.loadingDarray=(loading,num)=>{

}*/

export default myfun
