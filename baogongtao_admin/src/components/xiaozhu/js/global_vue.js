    var loading = '<div id="loadingToast" class="weui_loading_toast" style="display:none;">';
    loading += ' <div class="weui_mask_transparent"></div>';
    loading += ' <div class="weui_toast">';
    loading += ' <div class="weui_loading">';
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_0"></div>';
    loading += '  <div class="weui_loading_leaf weui_loading_leaf_1"></div>';
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_2"></div>';
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_3"></div>';
    loading += '  <div class="weui_loading_leaf weui_loading_leaf_4"></div>';
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_5"></div>';
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_6"></div>';
    loading += '  <div class="weui_loading_leaf weui_loading_leaf_7"></div>';
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_8"></div>';
    loading += '<div class="weui_loading_leaf weui_loading_leaf_9"></div>';
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_10"></div>';
    loading += '<div class="weui_loading_leaf weui_loading_leaf_11"></div>';
    loading += '</div>';
    loading += '<p class="weui_toast_content">数据加载中</p>';
    loading += '</div>';
    loading += '</div>';
    $("body").append(loading);

    function getSiteName() {
        return window.location.href.split(".")[0].split("//")[1];
    }

    function isSiteName(siteName) {
        if (getSiteName() == siteName) return false
        else return true
    }

    function hasPermission(url) {

        var user = localStorage.getItem('user');
        if (!user) return true;
        user = JSON.parse(user);
        if (user.role == 1) return true;

        var checkArr = user.role_menus;
        return in_array(url, checkArr);
    }

    function in_array(search, array) {
        for (var i in array) {
            if (array[i] == search) {
                return true;
            }
        }
        return false;
    }

    function showPic(cover, file) {
        var cover = cover.split(",");
        for (var i = 0; i < cover.length; i++) {
            if (cover[i]) cover[i] = "/upload/images/" + file + "/" + cover[i];
        }
        var pb1 = $.photoBrowser({
            items: cover,
        });
        pb1.open();
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
                return url + "&" + par + "=" + par_value;
            }
        } else {
            return url + "?" + par + "=" + par_value;
        }
    }

    function showPageMsg(msg) {
        $("#wappop").html(msg);
        $("#wappop").show();
        $("#wappop").animate({
            'margin-top': '50px'
        }, 200, function() {
            setTimeout(function() {
                $("#wappop").hide();
            }, 3000)
        });
    }

    function myicheck() {
        $('input[type=checkbox],input[type=radio]').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
    }

    function selectAll() {
        $('.selectAll').on('ifChecked', function(event) { //ifCreated 事件应该在插件初始化之前绑定 
            $('.i-checks').iCheck('check');
        });
        $('.selectAll').on('ifUnchecked', function(event) { //ifCreated 事件应该在插件初始化之前绑定 
            $('.i-checks').iCheck('uncheck');
        });
    }

    function deleteAll(that) {
        if (!confirm("确认要删除吗!!")) {
            return false;
        } else {
            var checkId = "";
            $('.i-checks').each(function(index, obj) {
                if ($(obj).is(":checked")) {
                    checkId += $(obj).val() + "|";
                }
            });
            if (checkId == "") return;
            getAjaxJson("/ajax/mydelall", "post", {
                idstr: checkId,
                _token: $("#token").val(),
                tablename: that.tableName
            }, function(msg) {
                that.lists = [];
                that.ajax();
            });
        }
    }

    function deleteAll_el(that) {
        var checkId = "";
        for (var i = 0; i < that.sels.length; i++) {
            checkId += that.sels[i].id + "|";
        }
        that.$confirm('此操作将永久删除该文件, 是否继续6?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if (checkId == "") return;
            that.listLoading = true;
            that.$http.post("/ajax/mydelall", {
                idstr: checkId,
                _token: $("#token").val(),
                tablename: that.tableName
            }).then(response => {
                that.listLoading = false;
                that.lists = [];
                that.ajax();
            }, response => {
                // error callback
            })
        }).catch(() => {
            that.listLoading = false;
            vueError(that, "已取消操作");
        });
    }

    function searchFields(that, product_id, pickup_user_id) {
        var date = that.searchFields.searchDate;
        var data = "";
        for (var key in that.searchFields) {
            if (key != 'searchDate') data += key + "=" + that.searchFields[key] + "&";
            else {
                if (date) {
                    data += "start_date=" + date[0].getFullYear() + "-" + (date[0].getMonth() + 1) + "-" + date[0].getDate() + "&";
                    data += "end_date=" + date[1].getFullYear() + "-" + (date[1].getMonth() + 1) + "-" + date[1].getDate() + "&";
                }
            }
        }
        if (that.formAction.indexOf("?") >= 0) that.formAction += "&" + data;
        else that.formAction += '?' + data;
        if (product_id && !pickup_user_id) {
            that.ajax(product_id);
        } else if (pickup_user_id) {
            that.ajax(product_id, pickup_user_id);
        } else {
            that.ajax();
        }

    }

    function vueAjaxJsonPost(url, data, fun, that) {
        showLoading();
        that.$http.post(url, data).then(msg => {
            hideLoading();
            if (msg.data.status == 2) {
                vueSuccess(that, msg.data.message);
                fun(msg);
            } else {
                vueError(that, msg.data.message);
            }
        }, response => {})
    }

    function changeAdminOrderStatus(id, fun, status, message, that) {
        that.$confirm(message, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            showLoading();
            $.ajax({
                url: '/admin/order/change-order-status',
                type: 'post',
                dataType: 'json',
                data: { id: id, _token: $("#token").val(), status: status },
                success: function(msg) {
                    hideLoading();
                    fun(msg);
                }
            }, response => {})
        }).catch(() => {
            vueError(that, "已取消操作");
        });

    }

    function del_vue(item, index, that) {

        that.$confirm('此操作将永久删除该文件, 是否继续?3', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.listLoading = true;
            that.$http.post("/ajax/mydel", {
                id: item.id,
                _token: $("#token").val(),
                tablename: that.tableName
            }).then(response => {
                that.listLoading = false;
                that.lists.data.splice(index, 1);
                vueSuccess(that, "操作成功")
            }, response => {})
        }).catch(() => {
            that.listLoading = false;
            vueError(that, "已取消操作");
        });
    }

    function del_vuex(item, index, that) {

        that.$confirm('此操作将永久删除该文件, 是否继续4?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.$store.state.mutations.listLoading = true;
            that.$http.post("/ajax/mydel", {
                id: item.id,
                _token: $("#token").val(),
                tablename: that.tableName
            }).then(response => {
                that.$store.state.mutations.listLoading = false;
                that.$store.state.mutations.listData.splice(index, 1);
                vueSuccess(that, "操作成功")
            }, response => {})
        }).catch(() => {
            that.$store.state.mutations.listLoading = false;
            vueError(that, "已取消操作");
        });
    }

    function deleteAll_vuex(that) {
        var checkId = "";
        for (var i = 0; i < that.sels.length; i++) {
            checkId += that.sels[i].id + "|";
        }
        that.$confirm('此操作将永久删除该文件, 是否继续5?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if (checkId == "") return;
            that.$store.state.mutations.listLoading = true;
            that.$http.post("/ajax/mydelall", {
                idstr: checkId,
                _token: $("#token").val(),
                tablename: that.tableName
            }).then(response => {
                that.$store.state.mutations.listLoading = false;
                that.$store.state.mutations.listData = [];
                that.ajax();
            }, response => {
                // error callback
            })
        }).catch(() => {
            that.$store.state.mutations.listLoading = false;
            vueError(that, "已取消操作");
        });
    }

    function vueSuccess(that, message) {
        that.$message({
            type: 'success',
            message: message
        });
    }

    function vueError(that, message) {
        that.$message({
            type: 'info',
            message: message
        });
    }

    function showLoading() {
        $(".weui_loading_toast").show();
    }

    function hideLoading() {
        $(".weui_loading_toast").hide();
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

    function splitCover(cover, path) {
        var fileList = [];
        var covers = cover.split(",");
        for (var i = 0; i < covers.length; i++) {
            if (covers[i]) fileList.push({ name: covers[i], url: '/upload/images/' + path + '/' + covers[i] });
            /* else fileList.push({name:covers[i],url:'/images/nopic.jpg'});*/

        }
        return fileList;
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