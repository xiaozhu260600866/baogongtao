const message = function() {}
message.install = (Vue, options) => {
    Vue.prototype.getAlert = (title) => {
        Vue.prototype.Dialog({
            title: '提示',
            message: title,
            skin: 'ios'
        })
    }
    Vue.prototype.getConfirm = (title, fun) => {
        return new Promise((resolve, reject) => {
            Vue.prototype.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (fun)fun()
                resolve()
            }).catch(() => {
                Vue.prototype.getError('已取消操作')
            })
        })
    }
    Vue.prototype.getSuccess = (title) => {
        Vue.prototype.$message.success(title)
    }
    Vue.prototype.getError = (title) => {
        Vue.prototype.$message.error(title)
    }
    Vue.prototype.showLoading = () => {
        document.getElementById('loadingToast').style.display = 'inline'
    }

    Vue.prototype.hideLoading = () => {
        document.getElementById('loadingToast').style.display = 'none'
    }
}
export default message
