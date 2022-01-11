var myfun = function() {};

/*myfun.install = (Vue, options) => {
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
  Vue.prototype.getSiteName = function() {
    return localStorage.getItem('siteName');
  }
   Vue.prototype.getStorage = function(name) {
      return sessionStorage.getItem(name) ? sessionStorage.getItem(name) : -1;
  }
  Vue.prototype.goto = function(url, openType) {
    if (openType && openType == 'navigate') {
      this.$store.commit('setTransition', 'turn-on');
    }
    this.$router.push({ path: url });
  }
  Vue.prototype.back = function(router){
      router.back(-1);
  }
   
  Vue.prototype.getOptions = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var url = window.location.href;
    var r = url.substr(url.indexOf("?") + 1).match(reg);
    if (name == 'audit' && r != null) return decodeURI(r[2]) == 0 ? null : decodeURI(r[2]);;
    if (r != null) return decodeURI(r[2]);
    return null;
  }
  Vue.prototype.in_array = function(search, array) {
    for (var i in array) {
      if (array[i] == search) {
        return true;
      }
    }
    return false;
  }
  Vue.prototype.setTitle = function(title) {
    document.title = title;
  }
 
  Vue.prototype.formatData = function(that) {
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
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '',
      query: getUrlArgObject()
    }
  };



}

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



export default myfun;
