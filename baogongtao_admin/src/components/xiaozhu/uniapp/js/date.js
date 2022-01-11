const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.dateToString = (obj,type) => {
		 let month = obj.getMonth() + 1 <10 ? '0'+(obj.getMonth() + 1) : obj.getMonth() + 1;
		 if(!type) return  obj.getFullYear() + '-' + month + '-' + obj.getDate()
		 return obj.getFullYear() + '-' + month + '-' + obj.getDate() + ' ' + obj.getHours() + ':' + obj.getMinutes();
	};
	 //根据年月份取该月多少天
	Vue.prototype.getCountDays = (dateAndMonth) => {
	     dateAndMonth=dateAndMonth.replace(new RegExp(/-/gm) ,"/");
	     //Vue.prototype.getError(dateAndMonth+'');
	     dateAndMonth= new Date(dateAndMonth+'/01');
	     return new Date(dateAndMonth.getFullYear(), (dateAndMonth.getMonth() + 1), 0).getDate()
	    
	}
	

}
export default myfun;
