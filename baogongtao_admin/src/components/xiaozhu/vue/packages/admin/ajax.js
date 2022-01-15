const ajax = function() {};
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'
ajax.install = (Vue, options) => {
    /*ajax get请求*/

    Vue.prototype.getAjax = (that, data, fun) => {
        return new Promise((resolve, reject) => {
            document.getElementById("share-overlay").style.display = "inline";
            that.data.listLoading = true;

            let url = Vue.prototype.urlApendOpenid(that.formAction, that);
            let nextPage = that.data.nextPage;
            if (nextPage) {
                that.data.thisPage = nextPage;
            }
             let storagePage = sessionStorage.getItem(that.formAction);
            if(!that.data.thisPage && storagePage){

                 that.data.nextPage = storagePage;
                 that.data.thisPage = storagePage;
                 url = Vue.prototype.urlApendOpenid(that.formAction, that);
            }else{
                sessionStorage.setItem(that.formAction,that.data.thisPage);
            }
            //data.token = that.data.token;
            Vue.prototype.$http.get(Vue.prototype.getSiteName() + url, {
                params: data
            }).then(msg => {
                document.getElementById("share-overlay").style.display = "none";
                if ("status" in msg.data && msg.data.status == 4) {
                    alert(msg.data.message);
                    localStorage.removeItem("userInfo");
                    //that.$router.push("/login/index");
                    if(msg.data.version && msg.data.version ==1){
                      that.$store.dispatch('user/logout')
                      setTimeout(()=>{
                        that.$router.push(`/login?redirect=${that.$route.fullPath}`)
                      },100);

                    }

                    return false;
                }
                if ("lists" in msg.data && "current_page" in msg.data.lists) {
                    that.data.thisPage = msg.data.lists.current_page;
                    that.data.total = msg.data.lists.total;
                    that.data.lists = msg.data.lists.data;
                    for (var i in msg.data) {
                        if (i != "lists") {
                            that.$set(that.data, i, msg.data[i]);
                        }
                    }
                } else {
                    for (var i in msg.data) {
                        that.$set(that.data, i, msg.data[i]);
                    }
                }
                that.data.url = data.url;

                that.data.show = true;
                that.data.listLoading = false;
                if (fun) fun(that.data);
                resolve(that.data);
            }).catch(function(err) {
                document.getElementById("share-overlay").style.display = "none";
                //Vue.prototype.getError("服务器繁忙");
            });
        });
    }
    /*ajax post 请求*/

    Vue.prototype.postAjax = (url, data, fun, notLoading) => {
        url = Vue.prototype.urlApendOpenid(url);

        if (!notLoading) {
            Vue.prototype.showLoading();
        }
        return new Promise((resolve, reject) => {
             console.log(data);
            Vue.prototype.$http.post(localStorage.getItem('siteName') + url, data).then(msg => {

                if ("status" in msg.data && msg.data.status == 4) {
                    alert(msg.data.message);
                    localStorage.removeItem("userInfo");
                    return false;
                }
                if ('message' in msg.data && msg.data.status == 3) { //判断对像是否存在url的属性
                    Vue.prototype.getError(msg.data.message);
                }
                if ('message' in msg.data && msg.data.status == 2) { //判断对像是否存在url的属性
                    Vue.prototype.getSuccess(msg.data.message);
                }
                Vue.prototype.hideLoading();
                if(fun)fun(msg);
                resolve(msg);
            }).catch(function(err) {
                console.log(err);
                Vue.prototype.hideLoading();
                //Vue.prototype.getError("服务器繁忙");
            });;
        });

    };

    Vue.prototype.urlApendOpenid = (url, that) => {
        if (Vue.prototype.getUser()) {
            let userInfo = {
                id: Vue.prototype.getUser().id,
                role: Vue.prototype.getUser().role
            };
            if (url.indexOf('?') != -1) {
                url += "&source=admin&userInfo=" + JSON.stringify(userInfo)
            } else {
                url += "?source=admin&userInfo=" + JSON.stringify(userInfo)
            }
        }
        if (that && that.data.nextPage) {
            if (url.indexOf('?') != -1) {
                url += "&page=" + that.data.nextPage;
            } else {
                url += "?page=" + that.data.nextPage;
            }
        }
        if (url.indexOf('?') != -1) {
            url += "&token=" +store.getters.token
              
        } else {
            url += "?token=" +store.getters.token

        }
	
		if (store.getters.client_id) {
			 url += "&client_id=" +store.getters.client_id
			
		}
        if (localStorage.getItem('city')) {
            if (url.indexOf('?') != -1) {
                url += "&city=" + Vue.prototype.getUser().city;
            } else {
                url += "?city=" + Vue.prototype.getUser().city;
            }
        }

        if (that && that.data && that.data.query) {
            for (var key in that.data.query) {
                if (that.data.query[key]) {
                    /*检查是否日期类型*/
                    if (Object.prototype.toString.call(that.data.query[key]) == '[object Array]' && that.data.query[
                            key].length == 2) {
                        if (Object.prototype.toString.call(that.data.query[key][0]) == '[object Date]') {
                            let start_date = that.data.query[key][0].getFullYear() + "-" + (that.data.query[key]
                                [0].getMonth() + 1) + "-" + that.data.query[key][0].getDate();
                            let end_date = that.data.query[key][1].getFullYear() + "-" + (that.data.query[key][
                                1
                            ].getMonth() + 1) + "-" + that.data.query[key][1].getDate();
                            if (url.indexOf('?') != -1) {
                                url += "&" + key + '_start' + "=" + start_date;
                                url += "&" + key + '_end' + "=" + end_date;
                            } else {
                                url += "?" + key + '_start' + "=" + start_date;
                                url += "?" + key + '_end' + "=" + end_date;
                            }
                        };
                        if (Object.prototype.toString.call(that.data.query[key][0]) == '[object Number]') {
                            that.data.query[key] = that.data.query[key][1];
                            if (url.indexOf('?') != -1) {
                                url += "&" + key + "=" + that.data.query[key];
                            } else {
                                url += "?" + key + "=" + that.data.query[key];

                            }
                        };


                    } else {
                        if (url.indexOf('?') != -1) {
                            url += "&" + key + "=" + that.data.query[key];
                        } else {
                            url += "?" + key + "=" + that.data.query[key];

                        }
                    }
                }
            }
        }
        return url;
    }

}

export default ajax;