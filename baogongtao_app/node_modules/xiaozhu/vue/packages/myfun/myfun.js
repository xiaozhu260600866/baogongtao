const myfun = function() {};

myfun.install = (Vue, options) => {
    Vue.prototype.hasPermission = (value, url) => {
        return true;
    };
    Vue.prototype.getDate = value => {
        let myDate = new Date(Date.parse(value));
        let start_month_ = parseInt((myDate.getMonth() + 1));
        if (start_month_ < 10) start_month_ = "0" + start_month_;

        return myDate.getFullYear() + "-" + start_month_ + "-" + myDate.getDate()

    };
    Vue.prototype.getUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    };
    Vue.prototype.getSiteName = () => {

        return window.location.href.split("com")[1]
    };
    Vue.prototype.postAjax = (that, fun) => {
            showLoading();
            let url = that.formAction;
            if (that.ruleForm.cover) that.ruleForm.cover = implodeCover(that.fileList);
            if (that.editor) that.ruleForm.content = that.editor.getContent();
            that.ruleForm._token = $("#token").val()
            that.$http.post(url, that.ruleForm).then(msg => {
                hideLoading();
                if (msg.data.status == 2) {
                    vueSuccess(that, msg.data.message);
                    fun(msg);
                } else {
                    vueError(that, msg.data.message);
                }
            }, response => {})


        },
        Vue.prototype.vaildForm = (obj, ruleForm) => {

            $(obj).find("div").each((i, v) => {
                let vaildArr = $(v).attr("datatype");
                if (vaildArr != undefined) {
                    vaildArr = vaildArr.split("|");
                    let name = $(v).find("label").html();
                    if (!name) {
                        name = $(v).find('.weui-cell__bd').text();
                    }
                    let field = $(v).attr("datafield");
                    let value = ruleForm[field];
                    for (let i = 0; i < vaildArr.length; i++) {
                        if (vaildArr[i] == "require") {
                            let isChinaese = new RegExp("[\\u4E00-\\u9FFF]+", "g")
                            console.log(value);
                            if (!value || (isChinaese.test(value) && value.indexOf('请选择') != -1)) {
                                getError(name + "不能为空");
                                return false;
                            }

                        } else if (vaildArr[i] == "phone") {
                            let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                            if (!phoneReg.test(value)) {
                                getError("手机格式不正确");
                                return false;
                            }
                        } else if (vaildArr[i] == "integer") {
                            if (isNaN(value) == true) {
                                getError(name + "请填写正确的数字");
                                return false;
                            }
                        } else if (vaildArr[i] == "price") {
                            let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                            if (!reg.test(value)) {
                                getError(name + "请填写正确的金额");
                                return false;
                            }
                        } else if (vaildArr[i] == "idcardno") {
                            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                            if (!reg.test(value)) {
                                getError(name + "请填写正确的身份证号码");
                                return false;
                            }
                        } else if (vaildArr[i] == "chinaname") {
                            let reg = /^[\u4e00-\u9fa5]{2,4}$/;
                            if (!reg.test(value)) {
                                getError(name + "真实姓名填写有误");
                                return false;
                            }
                        }
                    }

                }
            });
        }
}
export default myfun;