<template>
  <div class="dx-main">
    <div class="list-box">
      <div class="ptools p0 mb10 clearfix">
        <div class="search-box f-left" />
        <div class="f-right">
          <el-button type="primary" @click="handelCreate"><i class="el-icon-plus" /> 发布{{ className }}</el-button>
        </div>
      </div>
      <el-table v-loading="listLoading" :data="listData.data" :empty-text="'暂无' + className" border style="width: 100%" @selection-change="selectChange">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="published_date" align="center" label="发布日期" width="150" />
        <el-table-column label="操作" align="right" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handelEdit(scope.$index, scope.row)"><i class="el-icon-edit" /> 编辑</el-button>
            <el-button size="mini" type="danger" @click="handelDelete(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottom mt10 clearfix">
        <div class="f-left"><el-button type="danger" :disabled="this.selectLists.length===0" @click="selectDelete"><i class="el-icon-delete-solid" /> 批量删除</el-button></div>
        <div class="f-right">
          <pagination v-show="listData.total>0" :total="listData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getArticleLists(2)" />
        </div>
      </div>

      <el-dialog v-if="formVisible" :visible.sync="formVisible" :title="formTitle + className" :close-on-click-modal="false" width="1000px" top="5vh">
        <el-form ref="formData" :model="formData" label-width="100px">
          <el-row>
            <el-col :xs="24">
              <el-form-item label="文章标题" prop="title" :rules="[{ required: true, message: '文章标题不能为空'}]">
                <el-input v-model="formData.title" />
              </el-form-item>
            </el-col>
            <el-col :xs="24">
              <el-form-item label="封面图片">
                <tyt-upload :length="1" :file-list="formData.coverArr" path-name="article" :thumbsize="[300]" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="发布日期" prop="published_date">
                <el-date-picker v-model="formData.published_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="状态" prop="status">
                <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="文章内容" prop="content">
                <Tinymce ref="editor" v-model="formData.content" :height="300" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formVisible = false">取 消</el-button>
          <el-button type="primary" @click="articleSubmitForm('formData')">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { lists, store, del } from '@/api/article'
import Pagination from '@/components/Pagination'
import TytUpload from '@/components/Tytrock/components/UploadImg'
import Tinymce from '@/components/Tinymce'
export default {
	components: { TytUpload, Tinymce, Pagination },
	props: {
		companyId: {
			type: Number,
			default: 0
		},
		classId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			listLoading: false,
			listData: this.listsDefault(this),
			listQuery: this.listQuery(this, 5),
			formVisible: false,
			className: this.class_id == 2 ? '企业动态' : '企业招聘',
			formTitle: '',
			formData: {
				company_id: this.company_id,
				class_id: this.class_id,
				title: '',
				coverArr: [],
				published_date: this.getNowDate(),
				status: 1,
				content: ''
			},
			selectLists: []
		}
	},
	mounted() {
		this.listQuery.company_id = this.company_id
		this.listQuery.class_id = this.class_id
		this.getListsData()
	},
	methods: {
		getListsData() {
			this.listLoading = true
			lists(this.listQuery).then(res => {
				this.listData = res.data.lists
				this.listLoading = false
			})
		},
		searchForm() {
			this.getListsData()
		},
		handelCreate() {
			this.formTitle = '发布'
			this.formData.title = ''
	    	this.formData.coverArr = []
	    	this.formData.published_date = this.getNowDate()
	    	this.formData.status = 1
	    	this.formData.content = ''
			this.formVisible = true
		},
		handelEdit(index, row) {
	    	this.formTitle = '编辑'
	    	this.formData.id = row.id
	    	this.formData.title = row.title
	    	this.formData.coverArr = row.coverUrlArr
	    	this.formData.published_date = row.published_date
	    	this.formData.status = row.status
	    	this.formData.content = row.content
	    	this.formVisible = true
	    },
	    handelDelete(index, row) {
	    	this.tytConfirm({ msg: '确认要删除该文章吗？' }, this).then(obj => {
    			del({ id: row.id }).then(res => {
    				obj.instance.confirmButtonLoading = false
					this.$message.success(res.msg)
					this.listData.data.splice(index, 1)
					obj.done()
				})
	    	}).catch(obj => { obj.instance.confirmButtonLoading = false })
	    },
	    articleSubmitForm(formName) {
	    	this.$refs[formName].validate((valid) => {
				if (valid) {
					const coverObj = this.formData.coverArr
					if (coverObj.length) {
						const coverArr = []
						coverObj.forEach(v => {
						    coverArr.push(v.response)
						})
						this.formData.cover = coverArr.join(',')
					} else this.formData.cover = ''

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
	    },
		selectChange(sels) {
			this.selectLists = sels
		},

		selectDelete() {
			this.$confirm('确认要删除所选文章吗？').then(res => {
	            del({ id: this.selectLists2IdStr(this.selectLists) }).then(res => {
					this.$message.success(res.msg)
					this.getListsData()
				})
	        }).catch(res => {})
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>
