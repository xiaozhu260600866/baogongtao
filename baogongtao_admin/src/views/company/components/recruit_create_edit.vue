<template>
  <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose" width="800px">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="margin:20px;width:60%;min-width:600px;"
    >
      <el-form-item label="企业" prop="company_id" :rules="[{ required: true, message: '企业不能为空'},]">
        <el-select v-model="ruleForm.company_id" placeholder="招聘类型" filterable>
          <el-option v-for="item in companyLists" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="职位名称" prop="job_position" :rules="[{ required: true, message: '职位姓名'},]">
        <el-input v-model="ruleForm.job_position" placeholder="职位姓名" />
      </el-form-item>
      <el-form-item label="招聘类型" prop="job_type" :rules="[{ required: true, message: '招聘类型不能为空'},]">
        <el-select v-model="ruleForm.job_type" placeholder="招聘类型">
          <el-option v-for="item in jobTypeArr" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="职位类型" prop="job_category" :rules="[{ required: true, message: '职位类型不能为空'},]">
        <el-cascader v-model="ruleForm.job_category" :options="positionCalss" />
      </el-form-item>
      <el-form-item label="薪资范围" prop="salary" :rules="[{ required: true, message: '职位类型不能为空'},]">
        <el-cascader v-model="ruleForm.salary" :options="emolumentArr" />
      </el-form-item>
      <el-form-item label="职位标签(福利待遇)" prop="job_tab" :rules="[{ required: true, message: '职位标签(福利待遇)不能为空'},]">
        <el-input v-model="ruleForm.job_tab" type="textarea" placeholder="以英文,号分隔" />
      </el-form-item>
      <el-form-item label="职位描述" prop="job_remark" :rules="[{ required: true, message: '职位描述'},]">
        <el-input v-model="ruleForm.job_remark" type="textarea" placeholder="职位描述" />
      </el-form-item>
      <el-form-item label="工作经验" prop="experience" :rules="[{ required: true, message: '工作经验不能为空'},]">
        <el-select v-model="ruleForm.experience" placeholder="工作经验">
          <el-option v-for="item in experienceArr" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="最低学历" prop="education" :rules="[{ required: true, message: '最低学历不能为空'},]">
        <el-select v-model="ruleForm.education" placeholder="最低学历">
          <el-option v-for="item in educationArr" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄要求" prop="age" :rules="[{ required: true, message: '职位类型不能为空'},]">
        <el-cascader v-model="ruleForm.age" :options="ageArr" />
      </el-form-item>
      <el-form-item label="工作地址" prop="work_place">
        <div class="flex" style="display: flex;">
          <div style="width:70%">
            <el-input v-model="ruleForm.work_place" />
          </div>
          <div style="width:30%">
            <el-button @click.prevent="chooseLocation()">重新定位</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="contact_name" :rules="[{ required: true, message: '联系人姓名'},]">
        <el-input v-model="ruleForm.contact_name" type="textarea" placeholder="联系人姓名" />
      </el-form-item>
      <el-form-item label="联系人电话" prop="contact_phone" :rules="[{ required: true, message: '联系号码'},]">
        <el-input v-model="ruleForm.contact_phone" type="textarea" placeholder="联系号码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <chooseLocation ref="chooseLocation" @callBack="locationCallBack" />
  </el-dialog>

</template>
<script>
	import chooseLocation from 'xiaozhu/vue/components/admin/chooseLocation'
	import {
		attributes
	} from '@/api/base'
	import {
		lists
	} from '@/api/company'
	export default {
		components: {
			chooseLocation
		},
		props: ['top'],
		data() {
			return {
				ruleForm: {
					address: ''
				},
				formAction: '/api/company/recruit-store',
				dialogFormVisible: false,
				companyLists: [],
				experienceArr: [],
				educationArr: [],
				emolumentArr: [],
				ageArr: [],
				jobTypeArr: [{
						value: 1,
						label: '社招全职'
					},
					{
						value: 2,
						label: '社招兼职'
					},
					{
						value: 3,
						label: '校招全职'
					},
					{
						value: 4,
						label: '校招兼职'
					}
				],
				jobShowAreaArr: [{
						value: 1,
						label: '普通职位'
					},
					{
						value: 2,
						label: '跨区职位'
					}
				],
				needArr: [{
					label: '服务类',
					value: '服务类',
					children: [{
						label: '工商财税法律',
						value: '工商财税法律'
					}]
				}, {
					label: '产品类',
					value: '产品类',
					children: [{
						label: '电子电工',
						value: '7'
					}]
				}]
			}
		},
		methods: {
			locationCallBack(res) {
				console.log(res)
				if (res.latlng) {
					this.$refs.chooseLocation.handleClose()
					this.$set(this.ruleForm, 'work_place', res.poiaddress)
					this.ruleForm.location_x = res.latlng.lng
					this.ruleForm.location_y = res.latlng.lat
				}
			},
			chooseLocation() {
				this.$refs.chooseLocation.ajax()
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.postAjax(this.formAction, this.ruleForm, msg => {
							if (msg.data.code == 0) {
								this.dialogFormVisible = false
								this.$parent.getListsData()
							}
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
			},
			ajax: function(params) {
				const ageTemp = []
				for (let i = 17; i < 60; i++) {
					const ageChildren = []
					ageChildren.push({
						label: '不限',
						value: '不限'
					})
					for (let j = i + 1; j < 60; j++) {
						ageChildren.push({
							label: j + '岁',
							value: j + '岁'
						})
					}
					if (i == 17) {
						ageTemp.push({
							label: '不限',
							value: '不限',
							children: ageChildren
						})
					} else {
						ageTemp.push({
							label: i + '岁',
							value: i + '岁',
							children: ageChildren
						})
					}
				}
				this.ageArr = ageTemp
				lists({}).then(res => {
					this.companyLists = res.data.lists
				})
				attributes({
					type: 10,
					source: 'app'
				}).then(res => {
					this.positionCalss = res.data.lists
				})
				attributes({
					type: 11,
					source: 'app'
				}).then(res => {
					this.experienceArr = res.data.lists
				})
				attributes({
					type: 12,
					source: 'app'
				}).then(res => {
					this.emolumentArr = res.data.lists
				})
				attributes({
					type: 13,
					source: 'app'
				}).then(res => {
					this.educationArr = res.data.lists
				})
				this.dialogFormVisible = true
				if (params) {
					this.ruleForm = params
					this.ruleForm.job_category = this.ruleForm.job_category ? this.ruleForm.job_category.split('/')
					: []
					this.ruleForm.salary = this.ruleForm.salary ? this.ruleForm.salary.split('-') : []
					this.ruleForm.age = this.ruleForm.age ? this.ruleForm.age.split('-') : []
				} else {
					this.ruleForm = {
						cover: [],
						sort: 0
					}
				}
			},
			handleClose() {
				this.dialogFormVisible = false
			}
		}
	}
</script>
