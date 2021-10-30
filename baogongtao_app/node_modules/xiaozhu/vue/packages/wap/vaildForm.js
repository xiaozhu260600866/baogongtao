var vaildForm = function() {};
vaildForm.install = function(Vue, options) {
  Vue.prototype.vaildForm = function(that) {
    var ruleform = that.ruleform;
    var vaildate = that.vaildate;
    for (var v in vaildate) {
      for (var r in ruleform) {
        if (v == r) {
          var name = vaildate[v].name;
          var vaildArr = vaildate[v].vaild.split("|");
          var value = ruleform[r];
          for (var i = 0; i < vaildArr.length; i++) {
            var isChinaese = new RegExp("[\\u4E00-\\u9FFF]+", "g")

            if (vaildArr[i] == "require" || (isChinaese.test(value) && value.indexOf('请选择') != -1)) {
              if (!value) {
                Vue.prototype.getError(name + "不能为空");
                return false;
              }
            } else if (vaildArr[i] == "phone") {
              var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
              if (!phoneReg.test(value)) {
                Vue.prototype.getError("手机格式不正确");
                return false;
              }
            } else if (vaildArr[i] == "integer") {
              if (isNaN(value) == true) {
                Vue.prototype.getError(name + "请填写正确的数字");
                return false;
              }
            } else if (vaildArr[i] == "price") {
              var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
              if (!reg.test(value)) {
                Vue.prototype.getError(name + "请填写正确的金额");
                return false;
              }
            } else if (vaildArr[i] == "array") {
              if (value.length == 0) {
                Vue.prototype.getError(name + "不能为空");
                return false;
              }
            }
          }

        }
      }
    }
    return true;
  }

}
export default vaildForm;
