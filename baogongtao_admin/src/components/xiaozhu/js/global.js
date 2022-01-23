var myfun = function() {}

/* myfun.install = (Vue, options) => {
  Vue.prototype.getSiteName = () => {
    return localStorage.getItem('siteName');
  }
  //取url其中一个参数
  Vue.prototype.getOptions = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var url = window.location.href;
    var r = url.substr(url.indexOf("?") + 1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  Vue.prototype.setTitle=(title)=>{
    $("title").html(title);
  }

  Vue.prototype.formatData = (that) => {
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
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
    }
  };

}*/

myfun.install = function(Vue, options) {
  Vue.prototype.dateToString = function(obj, type) {
    let month = obj.getMonth() + 1
    month = month < 10 ? '0' + month : month
    const date = obj.getDate() < 10 ? '0' + obj.getDate() : obj.getDate()
    if (!type) return obj.getFullYear() + '-' + month + '-' + date
    return obj.getFullYear() + '-' + month + '-' + date + ' ' + obj.getHours() + ':' + obj.getMinutes() + ':' + obj.getSeconds()
  }
  Vue.prototype.getCookie = function(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        var c_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  }
}
export default myfun
