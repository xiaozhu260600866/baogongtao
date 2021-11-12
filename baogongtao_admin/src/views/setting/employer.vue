<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="用人单位管理" />
          <div class="dx-main">
            <div class="ptools clearfix">

              <div class="f-right">
                <el-button type="primary" @click="handelCreate"><i class="el-icon-plus" /> 新增用人单位</el-button>
              </div>
            </div>

            <div class="list-box">

              <el-table v-loading="listsData.listLoading" :data="listsData.data" border style="width: 100%" @selection-change="selsChange">
                <template slot="empty">
                  <div class="empty-div">
                    <div><svg-icon icon-class="dx-empty" /></div>
                    <p>暂无</p>
                  </div>
                </template>
                <el-table-column type="selection" align="center" width="55" />
                <el-table-column prop="name" label="单位名称" />
                <el-table-column prop="address" label="生产经营地址" align="center" />
                <el-table-column prop="charger" label="负责人" align="center" width="120" />
                <el-table-column prop="type" label="经济类型" align="center" width="120" />
                <el-table-column prop="phone" label="联系电话" align="center" width="140" />
                <el-table-column label="操作" align="center" width="80" fixed="right">
                  <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                      <el-button icon="el-icon-more" circle size="mini" />
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="getCommandData(scope.$index, scope.row,'edit')"><i class="el-icon-edit" /> 编辑</el-dropdown-item>
                        <el-dropdown-item divided class="fc-danger" :command="getCommandData(scope.$index, scope.row,'delete')"><i class="el-icon-delete" /> 删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <div class="list-bottom clearfix">
                <div class="f-left">
                  <!-- <el-button type="danger" @click="selectDelete" :disabled="this.selectLists.length===0"><i class="el-icon-delete-solid"></i> 批量删除</el-button> -->
                </div>
                <div class="f-right">
                  <pagination v-show="listsData.total>0" :total="listsData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListsData" />
                </div>
              </div>

            </div>

            <el-dialog v-if="formVisible" :visible.sync="formVisible" :title="formTitle + '用人单位'" :close-on-click-modal="false" width="1000px" top="5vh">
              <el-form ref="formData" :model="formData" label-width="120px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="单位名称" prop="name" :rules="[{required: true, message: '请输入用人单位名称'}]">
                      <el-input v-model="formData.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="生产经营地址" prop="address">
                      <el-input v-model="formData.address" />
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="12" :lg="12">
                    <el-form-item label="法定代表人" prop="charger">
                      <el-input v-model="formData.charger" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <el-form-item label="经济类型" prop="type">
                      <el-input v-model="formData.type" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <el-form-item label="联系电话" prop="phone">
                      <el-input v-model="formData.phone" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item label="印章图片">
                      <tyt-upload :length="1" :file-list="formData.stampArr" path-name="stamp" :thumbsize="[300]" />
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { lists, store, del } from '@/api/employer'
import Pagination from '@/components/Pagination'
import TytUpload from '@/components/Tytrock/components/UploadImg'
export default {
	components: { Pagination, TytUpload },
	data() {
		return {
			listQuery: this.queryDefault(this),
			listsData: this.listsDefault(this),
			formVisible: false,
			formTitle: '',
			formData: {
		    	type: '',
		    	name: '',
		    	address: '',
		    	phone: '',
		    	charger: '',
		    	stampArr: []
			},
			showVisible: false
		}
	},
	mounted() {
		this.getListsData()
	},
	methods: {
		getListsData() {
			lists(this.listQuery).then(res => {
				this.listsData = res.data.lists
			})
		},
		getCommandData(index, row, command) {
            return {
                'index': index,
                'row': row,
                'command': command
            }
        },
		handleCommand(command) {
			if (command.command == 'edit') {
				this.formTitle = '修改'
				this.formData.id = command.row.id
				this.formData.name = command.row.name
				this.formData.address = command.row.address
				this.formData.charger = command.row.charger
				this.formData.type = command.row.type
				this.formData.phone = command.row.phone
				this.formData.stampArr = command.row.stampUrlArr
				this.formVisible = true
			} else if (command.command == 'delete') {
				this.tytConfirm({ msg: '确认要删除该用人单位吗？' }, this).then(obj => {
	    			del({ id: command.row.id }).then(res => {
	    				obj.instance.confirmButtonLoading = false
						this.$message.success(res.msg)
						this.listsData.data.splice(command.index, 1)
						obj.done()
					})
		    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
			}
		},

		selsChange: function(sels) {
			// console.log(sels)
			this.selectLists = sels
		},
		/*
		handleSelectCommand(command) {
	        if(command == 'del'){
	        	this.$confirm('确认要删除所选转账记录吗？').then(res => {
		            del({id:this.selectLists2IdStr(this.selectLists)}).then(res => {
						this.$message.success(res.msg);
						this.getListsData();
					})
		        }).catch(res => {});
	        }
	    },
		*/
		selectDelete() {
			this.$confirm('确认要删除所选用人单位吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},

		searchForm() {
			this.getListsData()
		},
		/*
		sortAction(e){
			this.listQuery.order_filed = e.prop;
			this.listQuery.order_by = e.order=="ascending"?'ASC':'DESC';
			//console.log(this.listQuery)
			this.getListsData();
		},
		*/
		handelCreate() {
			this.formTitle = '创建'
			/*
			this.$nextTick(()=>{
                this.$refs['formData'].resetFields();
            })
            */
            this.formData = {
		    	type: '',
		    	name: '',
		    	address: '',
		    	phone: '',
		    	charger: '',
	    		stampArr: []
			}
			this.formVisible = true
		},
		submitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
				if (valid) {
					const stampObj = this.formData.stampArr
					if (stampObj.length) {
						const stampArr = []
						stampObj.forEach(v => {
						    stampArr.push(v.response)
						})
						this.formData.stamp = stampArr.join(',')
					} else this.formData.stamp = ''

					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.formVisible = false
						this.getListsData()
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
	    }
	}
}
</script>

<style>
</style>
