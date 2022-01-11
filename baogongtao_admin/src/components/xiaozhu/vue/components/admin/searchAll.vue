
<template>
    <section>
        <el-dialog :title="'选择' " :visible.sync="dialogVisible" :top="top" :before-close="handleClose" append-to-body>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" id="search">
                   <el-form-item v-for="v in searchFields" :label="v.label">
                        <el-input :placeholder="'请输入'+v.label"  v-model="data.query[v.prop]" v-if="!v.type || v.type == 'text'"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="toSearch">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleClose">选中关闭</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" style="margin-right: 10px;background: white;z-index: 999">
                <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" v-loading="data.listLoading"
                    style="width:100%" @selection-change="selsChange">
                    <el-table-column type="selection" min-width="30"> </el-table-column>
                    <el-table-column :prop="v.prop"  :label="v.label" :width="v.width" :align="v.align ? v.align:'left'" :min-width="v.minWidth" v-for="(v,key) in tableFields">
                    </el-table-column>
                </el-table>
            </el-col>

            <div class="toolbar" style='margin:50px 0' v-if="data.lists">
                <el-pagination @current-change="handleCurrentChange" :current-page="data.current_page" :page-sizes="[15]"
                    :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
                </el-pagination>
            </div>
        </el-dialog>
    </section>
</template>
<style type="text/css" scoped="">
</style>
<script type="text/javascript">
    export default {
        props: ['top'],
        data() {
            return {
                dialogVisible: false,
                data: this.formatData(this),
                formAction: '',
                page: 1,
                tableFields:[],
                searchFields:[],
                name: '',
                fclassArr: [],
                department: 0,
                classVal: 0,
                company_name:'',
                sels: [],
            }
        },
        methods: {
            ajax(row,value) {
                if(row){
                  this.tableFields = row.tableFields;
                  this.searchFields = row.searchFields;
                 
                  this.formAction = row.url;
                 
                  this.dialogVisible = true;
                }
				 this.searchFields.page = this.page;
				  console.log(this.searchFields);

                this.getAjax(this, this.searchFields, msg => {
                    $(".el-dialog").css({
                        height: '100%',
                  });

                    // $(".el-dialog").css({
                    //     height: '100%',
                    // });
                    // if (this.fclassArr.length == 0) {
                    //     this.fclassArr = msg.department;
                    // }
                    // if (product_str) {
                    //     this.$nextTick(() => {
                    //         product_str = product_str.split(",");
                    //         msg.lists.forEach(v => {
                    //             if (this.in_array(v.id, product_str)) {
                    //                 this.sels.push(v);
                    //                 this.$refs.multipleTable.toggleRowSelection(v, checked);
                    //             };
                    //         });
                    //     });
                    //     let checked = true;
                    // }
                });
            },
            selsChange(sels) {
                console.log(this.$refs.multipleTable);
                this.sels = sels;
            },
            handleClose() {
                this.dialogVisible = false;
                this.$emit('callBack', this.sels);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getAjax(this, {page:this.page}, msg => {
                    $(".el-dialog").css({
                        height: '100%',
                  });
				});
            },
            toSearch() {
                this.ajax();
            },
            handleNodeClick(data, e, b) {
                if (e.childNodes.length == 0) {
                    if (e.level == 1) {
                        this.department = data.value;
                    } else {
                        this.department = data.value;
                    }
                    this.ajax();
                }

            },
        }
    }
</script>
