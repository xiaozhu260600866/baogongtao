export default {
    canAppendUrl(url, data) {
        const historyUrl = wx.getStorageSync('historyUrl')
        if (historyUrl[url] != undefined) {
            const lastData = historyUrl[url][historyUrl[url].length - 1]
            if (lastData.url == url && lastData.data == data) {
                return false
            }
        }

        return true
    },
    urlAppend(url, data) {
        if (this.canAppendUrl(url, data)) {
            const historyUrl = wx.getStorageSync('historyUrl') ? wx.getStorageSync('historyUrl') : {}
            if (historyUrl[url] == undefined) {
                historyUrl[url] = new Array()
            }
            historyUrl[url].push({ url: url, data: data })
            wx.setStorageSync('historyUrl', historyUrl)
        }
    },
    delUrl(url) {
        const historyUrl = wx.getStorageSync('historyUrl')
        if (historyUrl) {
            for (const i in historyUrl) {
                if (i == url) {
                    delete historyUrl[i]
                }
            }
        }
        wx.setStorageSync('historyUrl', historyUrl)
    }

}
