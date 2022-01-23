const myfun = function() {}
import store from '@/store'
myfun.install = (Vue, options) => {
    Vue.prototype.getMath = (m, n) => {
        var num = Math.floor(Math.random() * (m - n) + n)
        return num
    }
    Vue.prototype.checkPermission = (value) => {
       if (value && value instanceof Array && value.length > 0) {
         const roles = store.getters && store.getters.roles
           console.log(roles)
           console.log('00')
         const permissionRoles = value

         const hasPermission = roles.some(role => {
           return permissionRoles.includes(role)
         })

         if (!hasPermission) {
           return false
         }
         console.log(hasPermission)
         console.log('11')
         return true
       } else {
         console.error(`need roles! Like v-permission="['admin','editor']"`)
         return false
       }
    }
    Vue.prototype.toFixed = (amount) => {
            if (amount && amount > 0) {
                amount = parseFloat(amount)
                return amount.toFixed(2)
            }

            return amount
    },
    Vue.prototype.getDate = (obj) => {
        return obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate()
    }
    Vue.prototype.goto = function(url, openType) {
        if (openType && openType == 'navigate') {
            this.$store.commit('setTransition', 'turn-on')
        }
        this.$router.push({ path: url })
    }
    Vue.prototype.getSiteName = () => {
        return localStorage.getItem('siteName')
    }
    // 取url其中一个参数
    Vue.prototype.getOptions = (name) => {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var url = window.location.href
        var r = url.substr(url.indexOf('?') + 1).match(reg)
        if (r != null) return decodeURI(r[2])
        return null
    }
    Vue.prototype.in_array = (search, array) => {
        for (var i in array) {
            if (array[i] == search) {
                return true
            }
        }
        return false
    }
    Vue.prototype.makeMenu = (roleArr, leftMenu, type) => {
        const isAdmin = type == 'isAdmin' ? Vue.prototype.getUser().role == 1 : false
        for (var i = 0; i < leftMenu.length; i++) {
            if (!leftMenu[i].hidden) {
                if (Vue.prototype.in_array(leftMenu[i].url, roleArr) || isAdmin) {
                    leftMenu[i].isCheck = true
                } else {
                    leftMenu[i].isCheck = false
                }
                for (var j = 0; j < leftMenu[i].children.length; j++) {
                    var son = leftMenu[i].children[j]
                    if (Vue.prototype.in_array(son.url, roleArr) || isAdmin) {
                        son.isCheck = true
                    } else {
                        son.isCheck = false
                    }
                    if (!son.hidden) {
                        if ('children' in son) {
                            for (var k = 0; k < son.children.length; k++) {
                                var grand = son.children[k]
                                if (Vue.prototype.in_array(grand.url, roleArr) || isAdmin) {
                                    grand.isCheck = true
                                } else {
                                    grand.isCheck = false
                                }
                                if (!grand.hidden) {
                                    if ('children' in grand) {
                                        for (var q = 0; q < grand.children.length; q++) {
                                            var grand2 = grand.children[q]
                                            if (Vue.prototype.in_array(grand2.url, roleArr) || isAdmin) {
                                                grand2.isCheck = true
                                            } else {
                                                grand2.isCheck = false
                                            }
                                        }
                                    } else {}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
     Vue.prototype.makeMenuStaff = (roleArr, leftMenu, type) => {
        const isAdmin = type == 'isAdmin' ? Vue.prototype.getUser().role == 1 : false
        for (var i = 0; i < leftMenu.length; i++) {
            if (!leftMenu[i].hidden) {
                if (Vue.prototype.in_array(leftMenu[i].url, roleArr) || isAdmin) {
                   leftMenu[i].hidden = false
                } else {
                    leftMenu[i].hidden = true
                }
                for (var j = 0; j < leftMenu[i].children.length; j++) {
                    var son = leftMenu[i].children[j]
                    if (Vue.prototype.in_array(son.url, roleArr) || isAdmin) {
                        son.hidden = false
                    } else {
                        son.hidden = true
                    }
                    if (!son.hidden) {
                        if ('children' in son) {
                            for (var k = 0; k < son.children.length; k++) {
                                var grand = son.children[k]
                                if (Vue.prototype.in_array(grand.url, roleArr) || isAdmin) {
                                    grand.hidden = false
                                } else {
                                    grand.hidden = true
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    Vue.prototype.getUser = () => {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
    }
    Vue.prototype.splitCover = (cover, path) => {
        if (typeof cover === 'object') {
           return cover
        }
        if (!cover) {
            return false
        }
        const fileList = []
        const covers = cover.split(',')
        for (var i = 0; i < covers.length; i++) {
            const url = Vue.prototype.getSiteName() + '/upload/images/' + path + '/' + covers[i]

            if (covers[i]) {
				if (covers[i].indexOf('ttp') != -1) {
					 fileList.push({ name: covers[i], url: covers[i] })
				} else {
					fileList.push({ name: covers[i], url: url })
				}
			}
            /* else fileList.push({name:covers[i],url:'/images/nopic.jpg'});*/
        }
        return fileList
    }
    Vue.prototype.splitQiniu = (cover) => {
        if (typeof cover === 'object') {
           return cover
        }
        if (!cover) {
            return false
        }
        const fileList = []
        const covers = cover.split(',')
        for (var i = 0; i < covers.length; i++) {
            let end = covers[i].indexOf('mp4')
            if (end == -1) {
                end = covers[i].indexOf('MP4')
            }
            const start = covers[i].indexOf('com')
            const filename = covers[i].substr(start + 4, end - start - 1)

            if (covers[i]) fileList.push({ key: covers[i], status: 1, file: filename })
        }
        console.log(fileList)
        return fileList
    }
    Vue.prototype.implodeCover = (fileList) => {
        var newFileList = []
        for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].response) newFileList.push(fileList[i].response)
            else newFileList.push(fileList[i].name)
        }
        return newFileList
    }

    Vue.prototype.searchField = (that) => {
        that.data.nextPage = 1
        var date = that.searchFields.searchDate
        var audit_date = that.searchFields.audit_date
        var updated_at = that.searchFields.updated_at
        var created_at = that.searchFields.created_at
        var feedbacked_at = that.searchFields.feedbacked_at
        var data = ''
        for (var key in that.searchFields) {
            if (!Vue.prototype.in_array(key, ['searchDate', 'audit_date', 'updated_at', 'created_at', 'feedbacked_at'])) {
                 that.data.query[key] = that.searchFields[key]
            } else {
                if (date) {
                    that.data.query.start_date = date[0].getFullYear() + '-' + (date[0].getMonth() + 1) + '-' + date[0].getDate()
                    that.data.query.end_date = date[1].getFullYear() + '-' + (date[1].getMonth() + 1) + '-' + date[1].getDate()
                } else {
                    that.data.query.start_date = ''
                    that.data.query.end_date = ''
                }
                if (audit_date) {
                    that.data.query.audit_date_start = audit_date[0].getFullYear() + '-' + (audit_date[0].getMonth() + 1) + '-' + audit_date[0].getDate()
                    that.data.query.audit_date_end = audit_date[1].getFullYear() + '-' + (audit_date[1].getMonth() + 1) + '-' + audit_date[1].getDate()
                } else {
                    that.data.query.audit_date_start = ''
                    that.data.query.audit_date_end = ''
                }

                if (created_at) {
                    that.data.query.created_start_at = created_at[0].getFullYear() + '-' + (created_at[0].getMonth() + 1) + '-' + created_at[0].getDate()
                    that.data.query.created_end_at = created_at[1].getFullYear() + '-' + (created_at[1].getMonth() + 1) + '-' + created_at[1].getDate()
                } else {
                    that.data.query.created_start_at = ''
                    that.data.query.created_end_at = ''
                }
                if (feedbacked_at) {
                    that.data.query.feedbacked_start_at = feedbacked_at[0].getFullYear() + '-' + (feedbacked_at[0].getMonth() + 1) + '-' + feedbacked_at[0].getDate()
                    that.data.query.feedbacked_end_at = feedbacked_at[1].getFullYear() + '-' + (feedbacked_at[1].getMonth() + 1) + '-' + feedbacked_at[1].getDate()
                } else {
                    that.data.query.feedbacked_start_at = ''
                    that.data.query.feedbacked_end_at = ''
                }

                if (updated_at) {
                    that.data.query.updated_at_start = updated_at[0].getFullYear() + '-' + (updated_at[0].getMonth() + 1) + '-' + updated_at[0].getDate()
                    that.data.query.updated_at_end = updated_at[1].getFullYear() + '-' + (updated_at[1].getMonth() + 1) + '-' + updated_at[1].getDate()
                } else {
                     that.data.query.updated_at_start = ''
                     that.data.query.updated_at_end = ''
                }
            }
        }
        that.data.token = Math.random() * 10
        that.ajax()
    }
    Vue.prototype.del_vuex = (item, index, that, action) => {
        if (!action) action = '/ajax/mydel'
        Vue.prototype.getConfirm('此操作将永久删除该文件, 是否继续?1', () => {
            console.log(item)
            Vue.prototype.postAjax(action, { id: item.id, tablename: that.tableName }, msg => {
                that.data.lists.splice(index, 1)
                Vue.prototype.getSuccess('删除成功')
            })
        })
    }
    Vue.prototype.deleteAll = (that, action) => {
        if (!action) action = '/ajax/mydelall'
        let checkId = ''
        for (let i = 0; i < that.sels.length; i++) {
            checkId += that.sels[i].id + '|'
        }
        Vue.prototype.getConfirm('此操作将永久删除该文件, 是否继续?2', () => {
            Vue.prototype.postAjax(action, { idstr: checkId, tablename: that.tableName }, msg => {
                that.data.token = Math.random() * 10
                if (typeof that.ajax === 'function') {
                    that.ajax()
                } else {
                    console.log(that.$parent)
                    that.$parent.ajax()
                }
            })
        })
    }
    Vue.prototype.authJson = () => {
        const url = window.location.href
        let urlPre = url.split('vueadmin')[1]
        urlPre = '/vueadmin' + urlPre
        urlPre = urlPre.split('?')[0]
        const role_menu = Vue.prototype.getUser().role_menus
        return {
            canDel: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/del', role_menu),
            canEdit: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/edit', role_menu),
            canCreate: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/create', role_menu),
            canClass: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/class', role_menu),
            canAddDis: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/add-dis', role_menu),
            canGiveCoupon: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/give-coupon', role_menu),
            canAuth: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/auth', role_menu),
            canExport: Vue.prototype.getUser().role == 1 ? true : Vue.prototype.in_array(urlPre + '/export', role_menu)
        }
    }
    Vue.prototype.formatData = (that) => {
        return {
            canLoadMore: false,
            hasMore: false,
            thisPage: '',
            lastPage: 1,
            nextPage: '',
            total: 0,
            lists: [],
            url: '',
            token: 10 * Math.random(),
            show: false,
            listLoading: false,
            auth: Vue.prototype.authJson(),
            query: getUrlArgObject(),
            userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
        }
    }
}

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

export default myfun
