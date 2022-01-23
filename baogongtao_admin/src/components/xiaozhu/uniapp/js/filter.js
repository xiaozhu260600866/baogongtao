const myfun = function() {}
myfun.install = (Vue, options) => {
	Vue.prototype.filterImage = (val, type) => {
		return Vue.prototype.getSiteName() + '/upload/images/' + type + '/' + val
	}
	Vue.prototype.filterDate = (string, type) => {
		 const date = string.replace(new RegExp(/-/gm), '/')
		 const dateObj = new Date(date)
		 const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1
		 if (type == 'm') {
		 	return month
		 } else if (type == 'Y') {
		 	return dateObj.getFullYear()
		 } else if (type == 'd') {
		 	return dateObj.getDate()
		 } else if (type == 'Y-m') {
		 	return dateObj.getFullYear() + '-' + month
		 } else if (type == 'm-d') {
		 	return month + '-' + dateObj.getDate()
		 } else if (type == 'Y-m-d') {
		 	 dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate()
		 } else if (type == 'Y-m-d H:i') {
		 	return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate() + ' ' + dateObj.getHours()
		 } else if (type == 'Y-m-d H:i:s') {
		 	 return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes()
		 }

		 if (!type) return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate()
		 return dateObj.getFullYear() + '-' + month + '-' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes()
	}
}
export default myfun
