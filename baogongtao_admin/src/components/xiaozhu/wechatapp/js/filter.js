const filter = function() {}
filter.install = (Vue, options) => {
	Vue.prototype.getCover = (item, val) => {
        // item.thumb_pic = Vue.prototype.getSiteName()+"/upload/images/product/"+item.thumb_pic;
         item['new_' + val] = Vue.prototype.getSiteName() + '/upload/images/product/' + item[val]
    }
    Vue.prototype.getNum = (item, val) => {
        item['new_' + val] = parseInt(item[val])
    }
}
export default filter
