<!--
使用：
1.components: {
        'my-category':()=>import('xiaozhu/vue/components/admin/category.vue')
    }
2.      <my-category :lists="lists"  actionPrefix="/admin/system" actionUrl="/admin/system" canupload="0" type="0"></my-category>的前缀
 -->
<template>
	<div>
		<table class="table table-hover" cellpadding="0" cellspacing="0">
			<thead>
				<tr class="ta_th_tr">
					<th>排序</th>
					<th >名称</th>
					<th  v-if="url">url</th>
					<th >操作</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(v,key) in lists" v-if="v.type==type">
					<tr class="active" :id="'tr_'+v.id">
						<td class="sort">
							<input type="text" name="sort" class="table-input" @blur="blurField(v.id,v.sort,'sort')" :id="'sort_'+v.id" v-model="v.sort" />
						</td>
						<td class="flex">
							<i v-if="hasSon" class="ico_sh" :data-id="v.id"  @click="toggleChild(v.id,$event)"><img src="https://boss.doxinsoft.com/images/arrow_down.png" /></i>
							<input type="text" name="sort" v-model="v.name" class="table-input" @blur="blurField(v.id,v.name,'name')" />
            </td>
            <td  v-if="url">
            	<input type="text" name="url" v-model="v.url" class="table-input" @blur="blurField(v.id,v.url,'url')" />
            </td>
						<td align="center">
							<div v-if="canupload" class="nav nav-primary" @click="uploadPic(v.id,v.cover)">{{ v.cover ? '已上传图片' :'上传图片' }}</div>
							<div class="nav nav-danger" :data-id="v.id" :data-url="actionUrl" @click="delfc(getSiteName+actionUrl,v.id,key)">删除</div>
						</td>
					</tr>
					<template v-if="v.zclass">
						<template v-for="(son,key2) in v.zclass">
							<tr :class="'zclass_'+v.id" :id="'tr_'+son.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
								<td class="sort">
									<input type="text" name="sort" class="table-input" @blur="blurField(son.id,son.sort,'sort')" v-model="son.sort" /></td>
								<td class="ope01 seclist pl50">
									<input type="text" name="sort" class="table-input" @blur="blurField(son.id,son.name,'name')" v-model="son.name" />
								</td>
                <td class="ope01 seclist pl50" v-if="url">
                	<input type="text" name="url" class="table-input" @blur="blurField(son.id,son.url,'url')" v-model="son.url" />
                </td>
								<td>
									<div v-if="canupload" class="nav nav-primary" @click="uploadPic(son.id,son.cover)">{{ son.cover ? '已上传图片' :'上传图片' }}</div>
									<div class="nav nav-danger" :data-id="son.id" :data-url="actionUrl"@click="delzc(getSiteName+actionUrl,son.id,key,key2)">删除子类别</div>
								</td>
							</tr>
						</template>
						<!-- 添加子类别 -->
						<tr :class="' zclass_'+v.id" :id="'add_btn_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
							<td></td>
							<td colspan="2" class="ope01 seclist" style="padding-left:50px;"><a @click="addZc(v.id)" href="javascript:;" class="btn" :data-id="v.id"><span class="glyphicon glyphicon-plus-sign"></span> 新增子类别</a>
							</td>
						</tr>
						<tr :id="type+'add_form_'+v.id" style="display:none">
							<td>
								<input type="text" v-model="sort" name="sort" class="form-control input_w50 text_center" /></td>
							<td class="name pl50">
								<input type="text" v-model="name" name="name" class="form-control input_w300" datatype="*" />
							</td>
              <td class="name pl50" v-if="url">
              	<input type="text" v-model="url" name="url" class="form-control input_w300" datatype="*" />
              </td>
							<td align="center">
								<div class="nav nav-primary" @click="addClass(v.id)">提交</div>
								<div class="nav" :data-id="v.id" @click="cancelAdd(v.id)">取消</div>
							</td>
						</tr>
					</template>
				</template>
				<tr :id="type+'add_btn_'">
					<td></td>
					<td colspan="2"><div @click="addZc('')" class="nav nav-primary" data-id="">新增</div>
					</td>
				</tr>
				<tr :id="type+'add_form_'" style="display:none">
					<td class="sort">
						<input type="hidden" name="fid" value="0" />
						<input type="text" name="sort" class="form-control input_w50 text_center" v-model="sort" /></td>
					<td class="ope01 seclist pl15">
						<input type="text" name="name" class="form-control input_w300" datatype="*" v-model="name" />
					</td>
          <td class="ope01 seclist pl15" v-if="url">
          	<input type="text" name="url" class="form-control input_w300" datatype="*" v-model="url_" />
          </td>
					<td align="center">
						<div class="nav  nav-primary" type="submit" @click="addClass(0)">提交</div>
						<div class="nav" type="button" data-id="" @click="cancelAdd('')">取消</div>
					</td>
				</tr>
			</tbody> <!-- 如果不是职称就显示这个内容 -->
		</table>
		<!-- 上传图片 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
			<div class="el-form-item">
				<label class="el-form-item__label" style="width:100px">上传图片</label>
				<my-upload upurl="product" :uploadLength="1" :fileList="fileList" :sizearr="[120]" opentype="ablank"></my-upload>
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
.table input[type="text"],
.table input[type="password"],
.table input[type="datetime"],
.table input[type="datetime-local"],
.table input[type="date"],
.table input[type="month"],
.table input[type="time"],
.table input[type="week"],
.table input[type="number"],
.table input[type="email"],
.table input[type="url"],
.table input[type="search"],
.table input[type="tel"],
.table input[type="color"]
{border-radius: 0;color: #858585;padding: 5px 4px;font-size: 14px;font-family: inherit;-webkit-box-shadow: none;box-shadow: none;-webkit-transition-duration: .1s;transition-duration: .1s;box-sizing: border-box;line-height: 20px;height: 32px;}
.table {box-sizing: border-box;width: 100%;}
.table thead tr.ta_th_tr {background: #EEF1F9;border: 0;height: 50px;}

.btn,
.btn-default,
.btn:focus,
.btn-default:focus {background-color: #abbac3 !important;border-color: #abbac3;color: white}

.el-dialog__body {padding: 0 20px 20px;}
.table td:nth-child(2) {margin-top: -1px;}
.table thead th {border-bottom-width: 0;text-align: center;}
.table tbody tr:hover{background-color: #ECECEC;}
.table tbody tr td{border-bottom: 1px solid #EEF1F9;}
.table tbody tr:first-child td {border-top: 0;}
.table td,
.table th {padding: 10px 5px;vertical-align: middle;}
.table .table-input{border: 1px transparent solid;border-radius: 4px;background-color: transparent;outline: none;}
.table .sort .table-input{width: 60px;text-align: center;}
.table .name .table-input{width: 100%;}

.table .table-input:active,
.table .table-input:focus{background-color: #fff;}
.table .nav{padding: 4px 15px;border: 1px solid #dcdfe6;background-color: #fff;color:#606266;border-radius: 4px;margin: 0 6px;font-size: 14px;display: inline-block;}
.table .nav-primary{background-color: #409eff;border-color: #409eff;color: #fff;}
.table .nav-danger{background-color: #f56c6c;border-color: #f56c6c;color: #fff;}
.table .addson .table-input{border-color: #ddd;background-color: #fff;}
</style>

</style>
<script type="text/javascript">
export default {
	data: function() {
		return {
			name: "",
			sort: 0,
			jiaoyan_score: 0,
			keyan_score: 0,
			getSiteName: this.getSiteName(),
			fid: '',
      url_:'',
			show: false,
			uploadId: 0,
			dialogVisible: false,
			fileList: [],
		}
	},
	updated: function() {

	},
	mounted: function() {
		setTimeout(this.nameFocus, 1500);
	},
	props: ['actionUrl', 'lists', 'canupload', 'type', 'actionPrefix', 'hasSon','url'], //父类的数据
	methods: {
		addClass: function(pid) {
			var url = this.actionUrl + "/class";
			var that = this;
			this.postAjax(url, { _token: $("#token").val(), url:this.url_,name: this.name, sort: this.sort, fid: pid, type: this.type, jiaoyan_score: this.jiaoyan_score, keyan_score: this.keyan_score }, function(msg) {
				if (msg.data.status == 2) {
					that.lists = msg.data.lists;
					$("#" + that.type + "add_form_" + pid).hide();
					$("#" + that.type + "add_btn_" + pid).show();
					$('#' + that.type + 'add_form_').hide();
					$("#" + that.type + "add_btn_").show();
					/*$(".add_zc").show();*/
					that.name = "";
					that.sort = 0;
					that.fid = pid;
					that.show = true;
				}
			});
		},

		nameFocus: function() {
			//alert($(".v_name").length);
			$(".v_name").focus(function() {
				$(this).removeClass('noborder');
			});
		},
		addZc: function(id) {
			$("#" + this.type + "add_btn_" + id).hide();
			$("#" + this.type + "add_form_" + id).show();
		},
		cancelAdd: function(id) {
			if (!id) {
				$("#" + this.type + "add_btn_" + id).show();
				$("#" + this.type + "add_form_" + id).hide();
			} else {

				$("#" + this.type + "add_btn_" + id).show();
				$("#" + this.type + "add_form_" + id).hide();
			}

		},
		delzc: function(url, id, parentKey, childrenKey) {
			let that = this;
			if (!confirm("确认要删除吗？")) {
				return false;
			} else {
				var url = this.actionUrl + "/ajaxclass";
				var dataid = id;
				this.postAjax(url, { type: 'del_zc', v: dataid }, msg => {
					that.lists[parentKey].zclass.splice(childrenKey, 1);
				});

			}
		},
		/*删除子类结束*/
		delfc: function(url, id, key) { /*删除父类开始*/
			let that = this;
			if (!confirm("确认要删除吗？")) {
				return false;
			} else {
				var dataid = id;
				var url = this.actionUrl + "/ajaxclass";
				this.postAjax(url, { type: 'del_fc', v: dataid }, msg => {
					that.lists.splice(key, 1);
				});
			}
		},
		/*删除父类结束*/
		blurField: function(id, name, type) {
			var dataid = id;
			var datat = name;
			var datatype = type;
			var value = name;
			var url = this.actionUrl + "/ajaxclass";
			this.postAjax(url, { type: 'update_class', t: datatype, id: id, v: value }, msg => {

			}, "notloading");
			$("#tr_" + id).find("input").addClass('noborder');
		},
		toggleChild: function(fid, event) {
			$(".zclass_" + fid).toggle();
			let obj = event.currentTarget;
			if ($(".zclass_" + fid).is(':hidden')) {
				$(obj).find('img').attr('src', 'https://renda.doxinsoft.com/images/arrow_right.png');
			} else {
				$(obj).find('img').attr('src', 'https://renda.doxinsoft.com/images/arrow_down.png');
			}
		},
		handleClose(done) {
			this.dialogVisible = false;
		},
		uploadPic(id, cover) {

			this.dialogVisible = true;
			this.uploadId = id;
			if (cover) this.fileList = this.splitCover(cover, "product");
			else this.fileList = [];
		},
		uploadsubmit() {
			var cover = this.implodeCover(this.fileList);
			this.postAjax(this.actionUrl + "/uploadpic", { cover: cover, id: this.uploadId }, msg => {
				this.dialogVisible = false;
				this.lists = msg.data.lists;
			})
		},

	},

	components: {

	}


}

</script>
