var message = function() {}
message.install = function(Vue, options) {
    Vue.prototype.getAlert = function(title) {
        Vue.prototype.Dialog({
            title: '提示',
            message: title,
            skin: 'ios'
        })
    }
    Vue.prototype.getSuccess = function(title) {
        Vue.prototype.Toast.success(title)
    }
    Vue.prototype.getError = function(title) {
        Vue.prototype.Toast.fail(title)
    }

    Vue.prototype.getConfirm = function(title, fun, err) {
        Vue.prototype.Dialog.confirm({
            title: '提示',
            message: title,
            skin: 'ios',
            showCancelButton: true
        }).then(function() {
            fun()
            return false
        }).catch(function() {
            err()
            return false
        })
    }
    Vue.prototype.showLoading = function() {
        document.getElementById('loadingToast').style.display = 'inline'
    }

    Vue.prototype.hideLoading = function() {
        document.getElementById('loadingToast').style.display = 'none'
    }
    Vue.prototype.showUploading = function() {
         document.getElementById('loadingUpload').style.display = 'inline'
    }
    Vue.prototype.hideUploading = function() {
         document.getElementById('loadingUpload').style.display = 'none'
    }
}
export default message
