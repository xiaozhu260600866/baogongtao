const directive = function() {};

directive.install = (Vue, options) => {
    Vue.directive("waploading", function(el, obj) {　　 /*el.max=bind.value.max;*/
        var paddingTop = $(el).attr("data-paddingtop") ? $(el).attr("data-paddingtop") : '20px';
        if (obj.value == "正在加载") { /*加载中*/
            //$(el).find("div,li,a").hide();

            if ($(".weui-loadmore").length == 0) {
                 var str = '<div class="weui-loadmore loadmore" style="padding-top:' + paddingTop + '">';
                 str += '<i class="weui-loading"></i>';
                 str += ' <span class="weui-loadmore__tips">正在加载</span>';
                 str += '</div>';
                 $(el).append(str);
             }
        } else if (obj.value == "没有更多数据了") { /*没有数据*/
            //$(el).find("div,li,a").hide();
            $(".loadmore").remove();
            setTimeout(() => {
                if ($(".no-more").length == 0) {
                    var str = '<div class="no-more loadmore" style="padding-top:' + paddingTop + '">';
                    str += '<div class="weui-loadmore weui-loadmore_line">';
                    str += '<span class="weui-loadmore__tips">没有更多数据了</span>';
                    str += '</div>';
                    str += '</div>';
                    $(el).append(str);
                }
            }, 1500)
        } else if (obj.value == "暂无数据") { /*暂无数据*/
            //$(el).find("div,li,a").hide();
             $(".loadmore").remove();
            if ($(".no-more").length == 0) {
                var str = '<div class="no-more loadmore" style="padding-top:' + paddingTop + '">';
                    str += '<div class="weui-loadmore weui-loadmore_line">';
                    str += '<span class="weui-loadmore__tips">暂无数据</span>';
                    str += '</div>';
                    str += '</div>';
                    $(el).append(str);
            }

        } else { /*如果有数据，但没有第二页的话，就不要显示*/
             
        }
    })
    Vue.directive("class", (el, obj) => {
        let value = obj.value;
        let valueArr = value.split(" ");
        for (var i = 0; i < valueArr.length; i++) {
            let propertyString = valueArr[i].split(/[0,1,2,3,4,5,6,7,8,9]/);
            let property = propertyString[0];
            let size = propertyString[2] ? propertyString[2] : 'px';
            let val = valueArr[i].replace(/[^0-9]/ig, "");
            $(el).css(property, val + size);
        }
    })
}
export default directive;