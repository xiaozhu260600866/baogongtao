<!--
使用：
1.components: {
		'my-class':()=>import('xiaozhu/vue/components/admin/class.vue')
	}
2.      <my-class top="2%" ref="category" :type="type" formAction="/admin/article/"></my-class>   //注意formAction 是方法 的前缀
 -->
<template id="class">
  <el-dialog
    title="新建\编辑类别"
    :visible.sync="dialogVisible"
    width="1000px"
    :top="top"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div>
      <table v-loading="listLoading" class="table" cellpadding="0" cellspacing="0">
        <thead>
          <tr class="ta_th_tr">
            <th>排序</th>
            <th>名称</th>
            <th>显示/隐藏</th>
            <th v-if="pageUrl">url链接</th>
            <th v-if="no" align="center">编码</th>
            <th v-if="remark">说明</th>
            <th align="center">编号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(v,key) in lists">
            <tr :id="'tr_'+v.id">
              <td align="center" class="sort">
                <input
                  :id="'sort_'+v.id"
                  v-model="v.sort"
                  type="text"
                  name="sort"
                  class="table-input"
                  @blur="blurField(v.id,v.sort,'sort')"
                >
              </td>
              <td class="name">
                <div class="flex">
                  <i class="ico_sh" :data-id="v.id" @click="toggleChild(v.id)"><img
                    v-if="!classChildrenHidden"
                    src="https://boss.doxinsoft.com/images/arrow_down.png"
                  ></i>
                  <input v-model="v.name" type="text" name="sort" class="table-input" @blur="blurField(v.id,v.name,'name')">
                </div>
              </td>
              <td align="center">
                <el-switch
                  v-model="v.can_show"
                  on-text=""
                  off-text=""
                  :active-value="1"
                  :inactive-value="0"
                  @change="blurField(v.id,v.can_show,'can_show')"
                />
              </td>
              <td v-if="pageUrl">
                <div>{{ pageUrl + v.id }}</div>
              </td>
              <td v-if="no" align="center">
                <div class="flex">
                  <i class="ico_sh" :data-id="v.id" @click="toggleChild(v.id)" />
                  <input v-model="v.no" type="text" name="sort" class="table-input" @blur="blurField(v.id,v.no,'no')">
                </div>
              </td>
              <td v-if="remark">
                <div class="flex">
                  <i class="ico_sh" :data-id="v.id" @click="toggleChild(v.id)" />
                  <input v-model="v.remark" type="text" name="sort" class="table-input" @blur="blurField(v.id,v.remark,'remark')">
                </div>
              </td>
              <td>
                <div class="flex">
                  {{ v.id }}
                </div>
              </td>
              <td class="flex-center">
                <div v-if="canupload" class="nav nav-primary" @click="uploadPic(v.id,v.cover)">{{ v.cover ? '已上传图片' :'上传图片' }}</div>
                <div v-if="getSiteName == 'https://renda.doxinsoft.com/'">
                  <div
                    v-if="!in_array(v.id,[97,91,88,87,86])"
                    class="nav nav-danger"
                    :data-id="v.id"
                    :data-url="formAction"
                    @click="delfc(formAction,v.id,key)"
                  >删除父类别</div>
                </div>
                <div v-else>
                  <div class="nav nav-danger" :data-id="v.id" :data-url="formAction" @click="delfc(formAction,v.id,key)">删除父类别</div>
                </div>
              </td>
            </tr>
            <template v-if="v.zclass">
              <template v-for="(son,key2) in v.zclass">
                <tr :id="'tr_'+son.id" :class="'zclass_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                  <td align="center" class="sort">
                    <input
                      v-model="son.sort"
                      type="text"
                      name="sort"
                      class=" table-input"
                      @blur="blurField(son.id,son.sort,'sort')"
                    >
                  </td>
                  <td class="ope01 seclist pl50">
                    <input
                      v-model="son.name"
                      type="text"
                      name="sort"
                      class="table-input"
                      @blur="blurField(son.id,son.name,'name')"
                    >
                  </td>
                  <td align="center">
                    <el-switch
                      v-model="son.can_show"
                      on-text=""
                      off-text=""
                      :active-value="1"
                      :inactive-value="0"
                      @change="blurField(son.id,son.can_show,'can_show')"
                    />
                  </td>
                  <td v-if="pageUrl">
                    <div>{{ pageUrl + son.id }}</div>
                  </td>
                  <td v-if="no" class="ope01 seclista">
                    <input
                      v-model="son.no"
                      type="text"
                      name="no"
                      class="table-input"
                      @blur="blurField(son.id,son.no,'no')"
                    >
                  </td>
                  <td v-if="remark" class="ope01 seclist ">
                    <input
                      v-model="son.remark"
                      type="text"
                      name="remark"
                      class="table-input"
                      @blur="blurField(son.id,son.remark,'remark')"
                    >
                  </td>
                  <td class="ope01 seclist">
                    {{ son.id }}
                  </td>
                  <td align="center">
                    <div v-if="canupload" class="nav nav-primary" @click="uploadPic(son.id,son.cover)">{{ son.cover ? '已上传图片' :'上传图片' }}</div>
                    <div class="nav nav-danger" :data-id="son.id" :data-url="formAction" @click="delzc(formAction,son.id,key,key2)">删除子类别</div>
                  </td>
                </tr>
              </template>
              <!-- 添加子类别 -->
              <tr :id="type+'add_btn_'+v.id" :class="' zclass_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                <td />
                <td colspan="4" class="pl50">
                  <div class="nav nav-primary" :data-id="v.id" @click="addZc(v.id)">新增子类别</div>
                </td>
              </tr>
              <tr :id="type+'add_form_'+v.id" class="addson" style="display:none">
                <td class="sort" align="center">
                  <input v-model="sort" type="text" name="sort" class="table-input">
                </td>
                <td :colspan="pageUrl ? 3 : 2" class="name pl50">
                  <input v-model="name" type="text" name="name" class="table-input" datatype="*">
                </td>
                <td v-if="no" class="name">
                  <input v-model="no_" type="text" name="no" class="table-input ml15" datatype="*">
                </td>
                <td v-if="remark" class="name">
                  <input v-model="remark_" type="text" name="remark" class="table-input ml15" datatype="*">
                </td>
                <td align="center">
                  <div class="nav nav-primary" type="submit" @click="addClass(v.id)">提交</div>
                  <div class="nav" type="button" :data-id="v.id" @click="cancelAdd(v.id)">取消</div>
                </td>
              </tr>
            </template>
          </template>
          <tr :id="type + 'add_btn_'">
            <td />
            <td colspan="4" class="ope01 seclist">
              <div class="nav nav-primary" data-id="" @click="addZc('')"><span class="glyphicon glyphicon-plus-sign" />
                新增父类别</div>
            </td>
          </tr>
          <tr :id="type + 'add_form_'" style="display:none">
            <td class="sort" align="center">
              <input type="hidden" name="fid" value="0">
              <input v-model="sort" type="text" name="sort" class="table-input">
            </td>
            <td class="name" :colspan="pageUrl ? 3 : 2">
              <input v-model="name" type="text" name="name" class="table-input ml15" datatype="*">
            </td>
            <td v-if="no" class="name">
              <input v-model="no_" type="text" name="no" class="table-input ml15" datatype="*">
            </td>
            <td align="center">
              <div class="nav  nav-primary" type="submit" @click="addClass(0)">提交</div>
              <div class="nav" type="button" data-id="" @click="cancelAdd('')">取消</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 上传图片 -->
    <el-dialog title="提示" :visible.sync="uploadVisible" size="tiny" :before-close="uploadClose" append-to-body>
      <div class="el-form-item">
        <my-upload
          upurl="product"
          :upload-length="1"
          :file-list="fileList"
          :sizearr="[120]"
          opentype="ablank"
          label="上传图片"
          message="最佳尺寸：640*640"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadsubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传图片结束 -->
  </el-dialog>
</template>

<style type="text/css" scoped="scoped">
    @import url("../../css/class.css");
    @import url("../../wechatapp/css/global.css");

    textarea,
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
    .table input[type="color"] {
        border-radius: 0;
        color: #858585;
        padding: 5px 4px;
        font-size: 14px;
        font-family: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-transition-duration: .1s;
        transition-duration: .1s;
        box-sizing: border-box;
        line-height: 20px;
        height: 32px;
    }

    .table {
        box-sizing: border-box;
        width: 100%;
    }

    .table thead tr.ta_th_tr {
        background: #EEF1F9;
        border: 0;
        height: 50px;
    }

    .btn,
    .btn-default,
    .btn:focus,
    .btn-default:focus {
        background-color: #abbac3 !important;
        border-color: #abbac3;
        color: white
    }

    .el-dialog__body {
        padding: 0 20px 20px;
    }

    .table td:nth-child(2) {
        margin-top: -1px;
    }

    .table thead th {
        border-bottom-width: 0;
        text-align: center;
    }

    .table tbody tr:hover {
        background-color: #ECECEC;
    }

    .table tbody tr td {
        border-bottom: 1px solid #EEF1F9;
    }

    .table tbody tr:first-child td {
        border-top: 0;
    }

    .table td,
    .table th {
        padding: 10px 5px;
        vertical-align: middle;
    }

    .table .table-input {
        border: 1px transparent solid;
        border-radius: 4px;
        background-color: transparent;
        outline: none;
    }

    .table .sort .table-input {
        width: 60px;
        text-align: center;
    }

    .table .name .table-input {
        width: 100%;
    }

    .table .table-input:active,
    .table .table-input:focus {
        background-color: #fff;
    }

    .table .nav {
        padding: 4px 15px;
        border: 1px solid #dcdfe6;
        background-color: #fff;
        color: #606266;
        border-radius: 4px;
        margin: 0 6px;
        font-size: 14px;
        display: inline-block;
    }

    .table .nav-primary {
        background-color: #409eff;
        border-color: #409eff;
        color: #fff;
    }

    .table .nav-danger {
        background-color: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
    }

    .table .addson .table-input {
        border-color: #ddd;
        background-color: #fff;
    }
</style>

<script type="text/javascript">
    export default {
        components: {

        },
        props: ['formAction', 'canupload', 'type', 'top', 'pageUrl', 'classChildrenHidden', 'no', 'remark'],
        data: function() {
            return {
                ruleForm: {},
                getSiteName: this.getSiteName(),
                data: {},
                name: '',
                sort: 0,
                fid: '',
                lists: [],
                no_: '',
                remark_: '',
                uploadVisible: false,
                fileList: [],
                dialogVisible: false,
                listLoading: false
            }
        },
        mounted: function() {
            // this.$parent.ajax();
            setTimeout(this.nameFocus, 1000)
        }, // 父类的数据
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            ajax: function() {
                this.dialogVisible = true
                this.listLoading = true
                const oldFromAction = this.formAction
                this.formAction = this.formAction + 'class?type=' + this.type + '&token=' + Math.random() * 10
                this.getAjax(this, {}, msg => {
                    this.lists = msg.lists
                    this.listLoading = false
                    this.formAction = oldFromAction
                })
            },
            handleClose() {
                this.$parent.ajax()
                this.dialogVisible = false
            },

            addClass: function(pid) {
                var url = this.formAction + 'class'
                this.postAjax(url, {
                    name: this.name,
                    sort: this.sort,
                    fid: pid,
                    no: this.no_,
                    remark: this.remark_,
                    type: this.type
                }, msg => {
                    if (msg.data.status == 2) {
                        $('#' + this.type + 'add_form_' + pid).hide()
                        $('#' + this.type + 'add_btn_' + pid).show()
                        $('#' + this.type + 'add_form_').hide()
                        $('#' + this.type + 'add_btn_').show()
                        /* $(".add_zc").show();*/
                        this.name = ''
                        this.sort = 0
                        this.fid = pid
                        this.show = true
                        // this.lists = msg.data.lists;
                        this.ajax()
                    }
                }, this)
            },
            nameFocus: function() {
                $('.v_name').focus(function() {
                    $(this).removeClass('noborder')
                })
            },
            addZc: function(id) {
                $('#' + this.type + 'add_btn_' + id).hide()
                $('#' + this.type + 'add_form_' + id).show()
            },
            cancelAdd: function(id) {
                $('#' + this.type + 'add_btn_' + id).show()
                $('#' + this.type + 'add_form_' + id).hide()
            },
            delzc: function(url, id, parentKey, childrenKey) { /* 删除子类*/
                var that = this
                if (!confirm('确认要删除吗？')) {
                    return false
                } else {
                    var url = this.formAction + 'ajaxclass'
                    var dataid = id
                    this.postAjax(url, {
                        v: id,
                        type: 'del_zc'
                    }, msg => {
                        if (msg.data.status == 2) {
                            that.lists[parentKey].zclass.splice(childrenKey, 1)
                            that.ajax()
                        }
                    })
                }
            },
            /* 删除子类结束*/
            delfc: function(url, id, key) { /* 删除父类开始*/
                var that = this
                if (!confirm('删除父分类将会把其子分类一同删除，确认要删除吗？')) {
                    return false
                } else {
                    var url = this.formAction + 'ajaxclass'
                    var dataid = id
                    this.postAjax(url, {
                        v: id,
                        type: 'del_fc'
                    }, msg => {
                        if (msg.data.status == 2) {
                            that.lists.splice(key, 1)
                            that.ajax()
                        }
                    })
                }
            },
            /* 删除父类结束*/
            toggleChild: function(fid) {
                if (!this.classChildrenHidden) {
                    $('.zclass_' + fid).toggle()
                }
            },
            blurField: function(id, name, type) {
                var dataid = id
                var datat = name
                var datatype = type
                var value = name
                var url = this.formAction + 'ajaxclass'
                this.postAjax(url, {
                    type: 'update_class',
                    t: datatype,
                    id: id,
                    v: value
                }, msg => {

                })

                $('#tr_' + id).find('input').addClass('noborder')
            },
            uploadClose() {
                this.uploadVisible = false
            },
            uploadsubmit() {
                var cover = this.implodeCover(this.fileList)
                var data = {
                    cover: cover,
                    id: this.uploadId
                }
                this.postAjax(this.formAction + 'uploadpic', data, msg => {
                    if (msg.data.status == 2) {
                        this.uploadVisible = false
                        this.ajax()
                    }
                }, this)
            },
            uploadPic(id, cover) {
                this.uploadVisible = true
                this.uploadId = id
                if (cover) this.fileList = this.splitCover(cover, 'product')
                else this.fileList = []
                console.log(this.fileList)
            }

        }
    }
</script>
