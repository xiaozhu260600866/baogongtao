<!--
使用：
1.components: {
        'my-category':()=>import('xiaozhu/vue/components/admin/category.vue')
    }
2.      <my-category :lists="lists"  actionPrefix="/admin/system" actionUrl="/admin/system" canupload="0" type="0"></my-category>的前缀
 -->
<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr class="ta_th_tr">
          <th>排序</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(v,key) in lists" v-if="v.type==type">
          <tr :id="'tr_'+v.id" class="active">
            <td><input :id="'sort_'+v.id" v-model="v.sort" type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(v.id,v.sort,'sort')"></td>
            <td>
              <i v-if="hasSon" class="float_l ico_sh" :data-id="v.id" @click="toggleChild(v.id,$event)"><img :src="getSiteName + '/images/arrow_right.png'"></i>
              <input v-model="v.name" type="text" name="sort" class="form-control input_w300 v_name noborder" @blur="blurField(v.id,v.name,'name')"></td>
            <td>
              <a v-if="canupload" href="javascript:;" class="btn btn-primary" @click="uploadPic(v.id,v.cover)">{{ v.cover ? '已上传图片' :'上传图片' }}</a>
              <a href="javascript:;" class="btn btn-default del_fc" :data-id="v.id" :data-url="actionUrl" @click="delfc(getSiteName+actionUrl,v.id,key)">删除</a>
            </td>
          </tr>
          <template v-if="v.zclass">
            <template v-for="(son,key2) in v.zclass">
              <tr :id="'tr_'+son.id" :class="'zclass_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                <td><input v-model="son.sort" type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(son.id,son.sort,'sort')"></td>
                <td class="ope01 seclist" style="padding-left:50px;">
                  <input v-model="son.name" type="text" name="sort" class="form-control input_w300 v_name noborder" @blur="blurField(son.id,son.name,'name')">
                </td>
                <td>
                  <a href="javascript:;" class="btn btn-default del_zc" :data-id="son.id" :data-url="actionUrl"@click="delzc(getSiteName+actionUrl,son.id,key,key2)">删除子类别</a>
                  <a v-if="canupload" href="javascript:;" class="btn btn-primary" @click="uploadPic(son.id,son.cover)">{{ son.cover ? '已上传图片' :'上传图片' }}</a>
                </td>
              </tr>
            </template>
            <!-- 添加子类别 -->
            <tr :id="'add_btn_'+v.id" :class="' zclass_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
              <td />
              <td colspan="2" class="ope01 seclist" style="padding-left:50px;"><a href="javascript:;" class="btn" :data-id="v.id" @click="addZc(v.id)"><span class="glyphicon glyphicon-plus-sign" /> 新增子类别</a>
              </td>
            </tr>
            <tr :id="type+'add_form_'+v.id" style="display:none">
              <td>
                <input v-model="sort" type="text" name="sort" class="form-control input_w50 text_center"></td>
              <td class="ope01 seclist" style="padding-left:50px;">
                <input v-model="name" type="text" name="name" class="form-control input_w300" datatype="*">
              </td>
              <td>
                <input class="btn btn-primary" value="提交" @click="addClass(v.id)">
                <input class="btn btn-default" type="button" :data-id="v.id" value="取消" @click="cancelAdd(v.id)">
              </td>
            </tr>
          </template>
        </template>
        <tr :id="type+'add_btn_'">
          <td />
          <td colspan="2" class="ope01 seclist" style="padding-left:50px;"><a href="javascript:;" class="btn btn-primary" data-id="" @click="addZc('')"><span class="glyphicon glyphicon-plus-sign" /> 新增</a>
          </td>
        </tr>
        <tr :id="type+'add_form_'" style="display:none">
          <td>
            <input type="hidden" name="fid" value="0">
            <input v-model="sort" type="text" name="sort" class="form-control input_w50 text_center"></td>
          <td class="ope01 seclist" style="padding-left:50px;">
            <input v-model="name" type="text" name="name" class="form-control input_w300" datatype="*">
          </td>
          <td>
            <input class="btn btn-primary" value="提交" @click="addClass(0)"> <input class="btn btn-default" type="button" data-id="" value="取消" @click="cancelAdd('')"></td>
        </tr>
      </tbody> <!-- 如果不是职称就显示这个内容 -->
    </table>
    <!-- 上传图片 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <div class="el-form-item">
        <label class="el-form-item__label" style="width:100px">上传图片</label>
        <my-upload upurl="product" :upload-length="1" :file-list="fileList" :sizearr="[120]" opentype="ablank" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadsubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传图片结束 -->
  </div>
</template>
<style type="text/css">
textarea,
input[type="text"],
input[type="password"],
input[type="datetime"],
input[type="datetime-local"],
input[type="date"],
input[type="month"],
input[type="time"],
input[type="week"],
input[type="number"],
input[type="email"],
input[type="url"],
input[type="search"],
input[type="tel"],
input[type="color"] {
	border-radius: 0 !important;
	color: #858585;
	padding: 5px 4px;
	line-height: 1.2;
	font-size: 14px;
	font-family: inherit;
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
	-webkit-transition-duration: .1s;
	transition-duration: .1s;
}

.hidd {
	display: none
}

.table thead tr.ta_th_tr {
	background: #EEF1F9;
	border: 0;
	height: 50px;
}

.btn-primary,
.btn-primary:focus {
	background-color: #409EFF !important;
	border-color: #409EFF;
	color: white
}

.btn-default,
.btn-default:focus {
	background-color: #abbac3 !important;
	border-color: #abbac3;
	color: white
}

</style>
<script type="text/javascript">
export default {

	components: {

	},
	props: ['actionUrl', 'lists', 'canupload', 'type', 'actionPrefix', 'hasSon'],
	data: function() {
		return {
			name: '',
			sort: 0,
			jiaoyan_score: 0,
			keyan_score: 0,
			getSiteName: this.getSiteName(),
			fid: '',
			show: false,
			uploadId: 0,
			dialogVisible: false,
			fileList: []
		}
	},
	updated: function() {

	},
	mounted: function() {
		setTimeout(this.nameFocus, 1500)
	}, // 父类的数据
	methods: {
		addClass: function(pid) {
			var url = this.actionUrl + '/class'
			var that = this
			this.postAjax(url, { _token: $('#token').val(), name: this.name, sort: this.sort, fid: pid, type: this.type, jiaoyan_score: this.jiaoyan_score, keyan_score: this.keyan_score }, function(msg) {
				if (msg.data.status == 2) {
					that.lists = msg.data.lists
					$('#' + that.type + 'add_form_' + pid).hide()
					$('#' + that.type + 'add_btn_' + pid).show()
					$('#' + that.type + 'add_form_').hide()
					$('#' + that.type + 'add_btn_').show()
					/* $(".add_zc").show();*/
					that.name = ''
					that.sort = 0
					that.fid = pid
					that.show = true
				}
			})
		},

		nameFocus: function() {
			// alert($(".v_name").length);
			$('.v_name').focus(function() {
				$(this).removeClass('noborder')
			})
		},
		addZc: function(id) {
			$('#' + this.type + 'add_btn_' + id).hide()
			$('#' + this.type + 'add_form_' + id).show()
		},
		cancelAdd: function(id) {
			if (!id) {
				$('#' + this.type + 'add_btn_' + id).show()
				$('#' + this.type + 'add_form_' + id).hide()
			} else {
				$('#' + this.type + 'add_btn_' + id).show()
				$('#' + this.type + 'add_form_' + id).hide()
			}
		},
		delzc: function(url, id, parentKey, childrenKey) {
			const that = this
			if (!confirm('确认要删除吗？')) {
				return false
			} else {
				var url = this.actionUrl + '/ajaxclass'
				var dataid = id
				this.postAjax(url, { type: 'del_zc', v: dataid }, msg => {
					that.lists[parentKey].zclass.splice(childrenKey, 1)
				})
			}
		},
		/* 删除子类结束*/
		delfc: function(url, id, key) { /* 删除父类开始*/
			const that = this
			if (!confirm('确认要删除吗？')) {
				return false
			} else {
				var dataid = id
				var url = this.actionUrl + '/ajaxclass'
				this.postAjax(url, { type: 'del_fc', v: dataid }, msg => {
					that.lists.splice(key, 1)
				})
			}
		},
		/* 删除父类结束*/
		blurField: function(id, name, type) {
			var dataid = id
			var datat = name
			var datatype = type
			var value = name
			var url = this.actionUrl + '/ajaxclass'
			this.postAjax(url, { type: 'update_class', t: datatype, id: id, v: value }, msg => {

			}, 'notloading')
			$('#tr_' + id).find('input').addClass('noborder')
		},
		toggleChild: function(fid, event) {
			$('.zclass_' + fid).toggle()
			const obj = event.currentTarget
			if ($('.zclass_' + fid).is(':hidden')) {
				$(obj).find('img').attr('src', this.getSiteName + '/images/arrow_right.png')
			} else {
				$(obj).find('img').attr('src', this.getSiteName + '/images/arrow_down.png')
			}
		},
		handleClose(done) {
			this.dialogVisible = false
		},
		uploadPic(id, cover) {
			this.dialogVisible = true
			this.uploadId = id
			if (cover) this.fileList = this.splitCover(cover, 'product')
			else this.fileList = []
		},
		uploadsubmit() {
			var cover = this.implodeCover(this.fileList)
			this.postAjax(this.actionUrl + '/uploadpic', { cover: cover, id: this.uploadId }, msg => {
				this.dialogVisible = false
				this.lists = msg.data.lists
			})
		}

	}

}

</script>
