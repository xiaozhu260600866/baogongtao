<!--
使用：
1.components: {
        'my-class':()=>import('xiaozhu/vue/components/admin/class.vue')
    }
2.      <my-class top="2%" ref="category" :type="type" formAction="/admin/article/"></my-class>   //注意formAction 是方法 的前缀
 -->
<template id="class">
    <el-dialog title="新建\编辑类别" :visible.sync="dialogVisible" width="1000px" :top="top" :before-close="handleClose" :closeOnClickModal="false">
        <div>
            <table class="table table-hover mt10" v-loading="listLoading">
                <thead>
                    <tr class="ta_th_tr">
                        <th width="50">排序</th>
                        <th width="220">名称</th>
                        <th width="120">显示/隐藏</th>
                        <th width="200" v-if="pageUrl">url链接</th>
                        <th width="200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(v,key) in lists">
                        <tr class="active" :id="'tr_'+v.id">
                            <td align="center">
                                <input type="text" name="sort" class="form-control input_w50 text_center v_name noborder"
                                    @blur="blurField(v.id,v.sort,'sort')" :id="'sort_'+v.id" v-model="v.sort" />
                            </td>
                            <td>
                                <div class="flex">
                                    <i class="ico_sh" :data-id="v.id" @click="toggleChild(v.id)"><img src="https://niu-shop-app.doxinsoft.com/images/arrow_down.png" /></i>
                                    <input type="text" name="sort" v-model="v.name" class="form-control input_w200 v_name noborder"
                                        @blur="blurField(v.id,v.name,'name')" />
                                </div>
                            </td>
                            <td align="center">
                                <el-switch v-model="v.can_show" on-text="" off-text="" :active-value="1"
                                    :inactive-value="0" @change="blurField(v.id,v.can_show,'can_show')"> </el-switch>
                            </td>
                            <td v-if="pageUrl">
                                <div>
                                    <div>{{pageUrl + v.id}}</div>
                                </div>
                            </td>
                            <td class="flex-center">
                                <a v-if="canupload" href="javascript:;" class="btn btn-sm btn-default mr5" @click="uploadPic(v.id,v.cover)">{{ v.cover ? '已上传图片' :'上传图片' }}</a>
                                <div v-if="getSiteName == 'https://renda.doxinsoft.com/'">
                                    <a href="javascript:;" class="fs12 btn btn-default del_fc" :data-id="v.id"
                                        :data-url="formAction" @click="delfc(formAction,v.id,key)" v-if="!in_array(v.id,[97,91,88,87,86])">删除父类别</a>
                                </div>
                                <div v-else>
                                    <a href="javascript:;" class="fs12 btn btn-default del_fc" :data-id="v.id"
                                        :data-url="formAction" @click="delfc(formAction,v.id,key)">删除父类别</a>
                                </div>
                            </td>
                        </tr>
                        <template v-if="v.zclass">
                            <template v-for="(son,key2) in v.zclass">
                                <tr :class="'zclass_'+v.id" :id="'tr_'+son.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                                    <td align="center">
                                        <input type="text" name="sort" class="form-control input_w50 text_center v_name noborder"
                                            @blur="blurField(son.id,son.sort,'sort')" v-model="son.sort" />
                                    </td>
                                    <td class="ope01 seclist pl50">
                                        <input type="text" name="sort" class="form-control input_w200 v_name noborder"
                                            @blur="blurField(son.id,son.name,'name')" v-model="son.name" />
                                    </td>
                                    <td align="center">
                                        <el-switch v-model="son.can_show" on-text="" off-text="" :active-value="1"
                                            :inactive-value="0" @change="blurField(son.id,son.can_show,'can_show')">
                                        </el-switch>
                                    </td>
                                    <td v-if="pageUrl">
                                          <div>{{pageUrl + son.id}}</div>
                                    </td>
                                    <td align="center">
                                        <a v-if="canupload" href="javascript:;" class="btn btn-sm btn-default" @click="uploadPic(son.id,son.cover)">{{ son.cover ? '已上传图片' :'上传图片' }}</a>
                                        <a href="javascript:;" class="btn btn-sm btn-default del_zc" :data-id="son.id"
                                            :data-url="formAction" @click="delzc(formAction,son.id,key,key2)">删除子类别</a>
                                    </td>
                                </tr>
                            </template>
                            <!-- 添加子类别 -->
                            <tr :class="' zclass_'+v.id" :id="'add_btn_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                                <td></td>
                                <td colspan="4" class="ope01 seclist pl50"><a @click="addZc(v.id)" href="javascript:;"
                                        class="btn btn-sm" :data-id="v.id"><span class="glyphicon glyphicon-plus-sign"></span>
                                        新增子类别</a>
                                </td>
                            </tr>
                            <tr :id="'add_form_'+v.id" style="display:none">
                                <td align="center">
                                    <input type="text" v-model="sort" name="sort" class="form-control input_w50 text_center" />
                                </td>
                                <td :colspan="pageUrl ? 3 : 2" class="ope01 seclist pl50">
                                    <input type="text" v-model="name" name="name" class="form-control input_w300"
                                        datatype="*" />
                                </td>
                                <td align="center">
                                    <input class="btn btn-sm btn-default plr20" value="提交" type="submit" @click="addClass(v.id)">
                                    <input class="btn btn-sm btn-default plr20" type="button" :data-id="v.id" value="取消"
                                        @click="cancelAdd(v.id)">
                                </td>
                            </tr>
                        </template>
                    </template>
                    <tr id="add_btn_">
                        <td></td>
                        <td colspan="4" class="ope01 seclist"><a href="javascript:;" @click="addZc('')" class="btn btn-sm"
                                data-id=""><span class="glyphicon glyphicon-plus-sign"></span> 新增父类别</a>
                        </td>
                    </tr>
                    <tr id="add_form_" style="display:none">
                        <td align="center">
                            <input type="hidden" name="fid" value="0" />
                            <input type="text" name="sort" class="form-control input_w50 text_center" v-model="sort" />
                        </td>
                        <td class="ope01 seclist" :colspan="pageUrl ? 3 : 2">
                            <input type="text" name="name" class="form-control input_w300" datatype="*" v-model="name" />
                        </td>
                        <td align="center">
                            <input class="btn btn-sm btn-default plr20" type="submit" value="提交" @click="addClass(0)">
                            <input class="btn btn-sm btn-default plr20" type="button" data-id="" value="取消" @click="cancelAdd('')">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 上传图片 -->
        <el-dialog title="提示" :visible.sync="uploadVisible" size="tiny" :before-close="uploadClose" append-to-body>
            <div class="el-form-item">
                <my-upload upurl="product" :uploadLength="1" :fileList="fileList" :sizearr="[120]" opentype="ablank" label="上传图片" message="最佳尺寸：640*640"></my-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadsubmit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 上传图片结束 -->
    </el-dialog>
</template>
<style type="text/css">
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
        border-bottom-width: 1px;
        text-align: center;
    }

    .table tbody tr:first-child td {
        border-top: 0;
    }

    .table td,
    .table th {
        padding: 10px 5px;
        vertical-align: middle;
    }
</style>
<script type="text/javascript">
    export default {
        data: function() {
            return {
                ruleForm: {},
                getSiteName: this.getSiteName(),
                data: {},
                name: "",
                sort: 0,
                fid: '',
                lists: [],
                uploadVisible: false,
                fileList: [],
                dialogVisible: false,
                listLoading: false,
            }
        },
        mounted: function() {
            //this.$parent.ajax();
            setTimeout(this.nameFocus, 1000);
        },
        props: ['formAction', 'canupload', 'type', 'top', 'pageUrl','online'], //父类的数据
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            ajax: function() {
                this.dialogVisible = true;
                this.listLoading = true;
                let oldFromAction = this.formAction;
                this.formAction = this.formAction + "class?type=" + this.type + '&token=' + Math.random() * 10+'&online='+this.online;
                this.getAjax(this, {}, msg => {
                    this.lists = msg.lists;
                    this.listLoading = false;
                    this.formAction = oldFromAction;
                });
            },
            handleClose() {
                this.$parent.ajax();
                this.dialogVisible = false;
            },

            addClass: function(pid) {
                var url = this.formAction + "class";
                this.postAjax(url, {
                    name: this.name,
                    sort: this.sort,
                    fid: pid,
                    type: this.type,
					online:this.online,
                }, msg => {
                    if (msg.data.status == 2) {

                        $("#add_form_" + pid).hide();
                        $("#add_btn_" + pid).show();
                        $('#add_form_').hide();
                        $("#add_btn_").show();
                        /*$(".add_zc").show();*/
                        this.name = "";
                        this.sort = 0;
                        this.fid = pid;
                        this.show = true;
                        //this.lists = msg.data.lists;
                        this.ajax();
                    }
                }, this);
            },
            nameFocus: function() {
                $(".v_name").focus(function() {
                    $(this).removeClass('noborder');
                });
            },
            addZc: function(id) {
                $("#add_btn_" + id).hide();
                $("#add_form_" + id).show();
            },
            cancelAdd: function(id) {
                $("#add_btn_" + id).show();
                $("#add_form_" + id).hide();
            },
            delzc: function(url, id, parentKey, childrenKey) { /*删除子类*/
                var that = this;
                if (!confirm("确认要删除吗？")) {
                    return false;
                } else {
                    var url = this.formAction + "ajaxclass";
                    var dataid = id;
                    this.postAjax(url, {
                        v: id,
                        type: 'del_zc'
                    }, msg => {
                        if (msg.data.status == 2) {
                            that.lists[parentKey].zclass.splice(childrenKey, 1);
                            that.ajax();
                        }
                    });
                }
            },
            /*删除子类结束*/
            delfc: function(url, id, key) { /*删除父类开始*/
                var that = this;
                if (!confirm("删除父分类将会把其子分类一同删除，确认要删除吗？")) {
                    return false;
                } else {
                    var url = this.formAction + "ajaxclass";
                    var dataid = id;
                    this.postAjax(url, {
                        v: id,
                        type: 'del_fc'
                    }, msg => {
                        if (msg.data.status == 2) {
                            that.lists.splice(key, 1);
                            that.ajax();
                        }
                    });
                }
            },
            /*删除父类结束*/
            toggleChild: function(fid) {
                $(".zclass_" + fid).toggle();
            },
            blurField: function(id, name, type) {
                var dataid = id;
                var datat = name;
                var datatype = type;
                var value = name;
                var url = this.formAction + "ajaxclass";
                this.postAjax(url, {
                    type: 'update_class',
                    t: datatype,
                    id: id,
                    v: value
                }, msg => {

                });

                $("#tr_" + id).find("input").addClass('noborder');
            },
            uploadClose() {
                this.uploadVisible = false;
            },
            uploadsubmit() {
                var cover = this.implodeCover(this.fileList);
                var data = {
                    cover: cover,
                    id: this.uploadId
                }
                this.postAjax(this.formAction + "uploadpic", data, msg => {
                    if (msg.data.status == 2) {
                        this.uploadVisible = false;
                        this.ajax();
                    }
                }, this)
            },
            uploadPic(id, cover) {
                this.uploadVisible = true;
                this.uploadId = id;
                if (cover) this.fileList = this.splitCover(cover, "product");
                else this.fileList = [];
                console.log(this.fileList);
            }

        },
        components: {


        }
    }
</script>
