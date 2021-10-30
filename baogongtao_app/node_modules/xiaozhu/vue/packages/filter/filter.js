const Filter = function() {};

Filter.install = (Vue, options) => {
    Vue.filter('getCover', function(value, path, size) {
            var cover = value.split(",");
            for (var i = 0; i < cover.length; i++) {
                if (i == 0) return '/upload/images/' + path + '/' + size + "_" + cover[i];
            }
        }),
        Vue.filter('hasPermission', function(value, url) {
            console.log(url);
            return false;
            /*var user = sessionStorage.getItem('user');
            user = JSON.parse(user);
            if(user.role==1) return true;
            var checkArr = user.role_menus;
            return in_array(url,checkArr);*/
        }),
        Vue.filter('datetimeFilter', function(value, type) {
            if (value !== null && typeof value === 'object') {
                let year = value.getFullYear()
                let month = value.getMonth() + 1

                let date = value.getDate()
                let hour = value.getHours()
                let minute = value.getMinutes()
                return type === 'date' ? `${year}-${month}-${date}` : `${year}-${month}-${date} ${hour}:${minute}`
            } else {
                return value
            }
        })

}
export default Filter;