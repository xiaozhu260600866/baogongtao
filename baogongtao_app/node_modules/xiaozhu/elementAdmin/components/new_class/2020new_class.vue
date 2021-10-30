<template>
    <div>
        <div v-if="diag">
            <!-- 如果是弹出层 -->
			
            <el-dialog title="类别" :visible.sync="dialogVisible" :width="(width +60) + 'px'" :before-close="handleClose">
				<div class="dx-header">
					<div style="padding: 4px 40px 4px 0;">
						<el-input placeholder="搜索名称" prefix-icon="el-icon-search" v-model="searchValue"></el-input>
						<div class="pointer"
							style="position: absolute;right: 25px;top: 30px;font-size: 26px;color: #666;font-weight: bold;"
							v-permission="['client','hr.department.operate']" @click="add"><i class="el-icon-plus" style="font-size: 26px;"></i>
						</div>
					</div>
				</div>
                 <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table--medium dx-xiaozhu"
                     style="width: 100%;">
                     <div class="el-table__header-wrapper">
                         <table cellspacing="0" cellpadding="0" border="0" class="el-table__header">
                             <colgroup>
                                 <col name="el-table_2_column_5" :width="v.width" v-for="v in fields" v-if="!v.tableHidden">
                                 <col name="el-table_2_column_5" width="300">
                             </colgroup>
                             <thead class="has-gutter">
                                 <tr class="">
                                     <th colspan="1" rowspan="1" class="el-table_2_column_6 is-leaf" v-for="v in fields" v-if="!v.tableHidden">
                                         <div class="cell">{{v.label}}</div>
                                     </th>
                                     <th colspan="1" rowspan="1" class="el-table_2_column_6 is-leaf">
                                         <div class="cell">操作</div>
                                     </th>
                                 </tr>
                             </thead>
                         </table>
                     </div>
                     <div class="el-table__body-wrapper is-scrolling-none">
                         <table cellspacing="0" cellpadding="0" border="0" class="el-table__body">
                             <colgroup>
                                 <col name="el-table_2_column_5" :width="v.width" v-for="v in fields" v-if="!v.tableHidden">
                                 <col name="el-table_2_column_5" width="300">
                             </colgroup>
                             <div v-if="lists.length == 0" class="flex-middle flex-center" :style="'width:'+width + 'px;height:57px'">
                                 暂无数据
                             </div>
                             <mychildren ref="children"  @clickCallBack="clickCallBack" :lists="lists" :fields="fields" :lev="lev" :parent="parent" @createEditCallBack="createEditCallBack"
                                 :width="width" :classChildrenHidden="classChildrenHidden" :formAction="formAction">
                                 <div :slot="'append_class_table_'+ field.prop" slot-scope="scope" v-for="field in fields">
                                     <slot :name="'append_class_table_'+ field.prop" :row="scope.row" />
                                 </div>
                             </mychildren>
                         </table>
                     </div>

                 </div>
            </el-dialog>
        </div>
         <!-- 如果不是弹出层 -->
        <div v-else>
			<div class="dx-header">
				<div style="padding: 4px 40px 4px 0;">
					<el-input placeholder="搜索名称" prefix-icon="el-icon-search"></el-input>
					<div class="pointer"
						style="position: absolute;right: 10px;top: 12px;font-size: 26px;color: #666;font-weight: bold;"
						v-permission="['client','hr.department.operate']" @click="add"><i class="el-icon-plus" style="font-size: 26px;"></i>
					</div>
				</div>
			</div>
			
            <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table--medium"
                style="width: 100%;">
                <div class="el-table__header-wrapper">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header">
                        <colgroup>
                            <col name="el-table_2_column_5" :width="v.width" v-for="v in fields" v-if="!v.tableHidden">
                            <col name="el-table_2_column_5" width="300">
                        </colgroup>
                        <thead class="has-gutter">
                            <tr class="">
                                <th colspan="1" rowspan="1" class="el-table_2_column_6 is-leaf" v-for="v in fields" v-if="!v.tableHidden">
                                    <div class="cell">{{v.label}}</div>
                                </th>
                                <th colspan="1" rowspan="1" class="el-table_2_column_6 is-leaf">
                                    <div class="cell">操作</div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="el-table__body-wrapper is-scrolling-none">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__body">
                        <colgroup>
                            <col name="el-table_2_column_5" :width="v.width" v-for="v in fields" v-if="!v.tableHidden">
                            <col name="el-table_2_column_5" width="300">
                        </colgroup>
                        <div v-if="lists.length == 0" class="flex-middle flex-center" :style="'width:'+width + 'px;height:57px'">
                            暂无数据
                        </div>
					
                        <mychildren @clickCallBack="clickCallBack" ref="children" :lists="lists" :fields="fields" :lev="lev" :parent="parent" @createEditCallBack="createEditCallBack"
                            :width="width" :classChildrenHidden="classChildrenHidden" :formAction="formAction">
                            <div :slot="'append_class_table_'+ field.prop" slot-scope="scope" v-for="field in fields">
                                <slot :name="'append_class_table_'+ field.prop" :row="scope.row" />
                            </div>
                        </mychildren>

                    </table>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import mychildren from "./children.vue";
    export default {
        props: {
            diag: {
                type: Boolean,
                default: false
            },
            classChildrenHidden: {
                type: Boolean,
                default: false
            },
            formAction: {
                type: String,
                default: '',
            },
            no: {
                type: String,
                default: '',
            },
            data: {
                type: Array,
                default: function() {
                    return []
                }
            },
            type: {
                type: Number,
                default: 0
            },
            addLev: {
                type: Number,
                default: 3
            },
            canupload: {
                type: Boolean,
                default: false
            },
            fields: {
                type: Object,
                default: function() {
                    return [{
                            label: '排序',
                            prop: 'sort',
                            width: 100,
                            type: 'text',
                            defaultValue: 100,
                            datatype: 'require|integer'
                        },
                        {
                            label: '名称',
                            prop: 'name',
                            type: 'text',
                            width: 200,
                            datatype: 'require'
                        },
                        // {
                        //     label: '页面路径',
                        //     prop: 'url',
                        //     type: 'text',
                        //     width: 200,
                        //     append_class_table_url:0,
                        //     datatype: 'require'
                        // },
                        {
                            label: '隐藏/显示',
                            prop: 'can_show',
                            type: 'switch',
                            width: 100,
                            defaultValue: 1,
                        },
                        {
                            label: '上传图片',
                            prop: 'cover',
                            type: 'upload',
                            width: 150,
                            allowUpLoadNum: 1,
                            upurl: 'product'
                        },
                        {
                            label: '编号',
                            prop: 'id',
                            width: 100
                        },
                    ]
                }
            }

        },
        components: {
            mychildren
        },
        created() {
            if (this.data.length) {
                this.lists = JSON.parse(JSON.stringify(this.forMatData(this.data, this.type)));
            }
            if (!this.canupload) {
                this.fields.forEach((v, key) => {
                    if (v.type == 'upload') {
                        this.fields.splice(key, 1);
                    }
                })
            }
            // if(this.no){
            //     this.fields.push({
            //         label:'自写编号',prop:'no',width:80,datatype:'require',type:'text'
            //     });
            // }

        },
        methods: {
			clickCallBack(item){
				this.$emit("clickCallBack",item);
			},
			add(){
				
				 this.$refs.children.add();
			},
            ajax(){
                this.diag = true;
                this.dialogVisible = true;
                this.formAction = this.formAction + "class?type=" + this.type + '&token=' + Math.random() * 10;
                this.getAjax(this, {}, msg => {
                     this.lists = JSON.parse(JSON.stringify(this.forMatData(this.data.lists, this.type)));
                });
            },
            handleClose(done) {
				  this.dialogVisible = false;
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //         done();
                //     })
                //     .catch(_ => {});
            },
            forMatData(lists, type) {
                var res = [] // 定义一个不不赋值的变量
                var parentData = [];
                var find = function(lists, type) {
                    lists.forEach((item) => { // 利用foreach循环遍历
				
                        item.iconShow = false;
                        item.show = false;
                        if (item.fid == 0 && item.type == type) {
								
                            item.show = true;
                            parentData.push(item);
                        }
                        if (item.type == type) // 判断递归结束条件
                        {
                            res.push(item);
                        }
                        if (item.zclass && item.zclass.length > 0) // 判断chlidren是否有数据
                        {
                            find(item.zclass, type) // 递归调用
                        }
                    })
                }
				
                find(lists, type)
                var find2 = function(lists, parent, parent_id) {
                    parent.children = [];
                    lists.forEach((item) => { // 利用foreach循环遍历
                        if (item.fid == parent_id) {
                            parent.children.push(item);
                            find2(lists, item, item.id);
                        }
                    })
                }
                parentData.forEach(parent => {
                    find2(res, parent, parent.id);
                })
                return parentData
            },
            createEditCallBack(row) {
                if (row.authType == 'edit') {} else {
                    console.log(this.parent)
                    if (!this.parent) {
                        this.lists.push(JSON.parse(JSON.stringify(row)));
                        this.lists[this.lists.length - 1].show = true;
                        this.lists[this.lists.length - 1].iconShow = true;
                        this.lists[this.lists.length - 1].children = [];
                        this.lists.forEach(v => {
                            v.show = true;
                        })
                    } else {

                        this.parent.children.push(JSON.parse(JSON.stringify(row)));
                        this.parent.children[this.parent.children.length - 1].show = true;
                        this.parent.children[this.parent.children.length - 1].iconShow = true;
                        this.parent.children[this.parent.children.length - 1].children = [];
                        this.parent.children.forEach(v => {
                            v.show = true;
                        })
                    }


                    // this.lists.push(row);
                    // this.lists[this.lists.length -1].show = true;
                    // this.lists[this.lists.length -1].iconShow = true;
                    // this.lists[this.lists.length -1].children = [];
                    this.lists = JSON.parse(JSON.stringify(this.lists));
                    console.log(this.lists)
                }
            }
        },
        mounted() {
            this.fields.forEach(v => {
				if(!v.tableHidden){
					  this.width += parseInt(v.width);
				}
              
            })
            this.width += 300
        },
        data() {
            return {
				searchValue:'',
                lev: 0,
                width: 0,
                parent: {},
                dialogVisible: false,
                name: 'class',
                lists: []
            }
        }
    }
</script>

<style>
    .CinputWidth {
        width: 500px;
    }

    .CinputWidth .el-input__inner {
        border-color: #dcdfe6 !important;
    }

    .OinputWidth {
        width: 100px;
    }

    .OinputWidth .el-input__inner {
        border-color: #dcdfe6 !important;
    }
  .dx-xiaozhu .el-table__header thead tr th {
        background: #f5f7fa;
    }
</style>
