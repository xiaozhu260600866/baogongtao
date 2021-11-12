<template>
  <div class="app-container" style="padding-bottom: 100px;">
    <el-row v-loading="loading">
      <el-form ref="form" :model="formData" label-width="100px">
        <el-col :span="24">
          <div class="dx-container">
            <div class="p15"><el-page-header :content="pageTitle" @back="goBack" /></div>
          </div>
        </el-col>
        <el-col :span="24" class="mt10">
          <div class="dx-container">
            <el-tabs v-model="activeName" type="border-card">
              <el-tab-pane label="基本信息" name="info">
                <el-row>
                  <el-col :xs="24">
                    <el-form-item label="产品分类" prop="class_id" :rules="[{ required: true, message: '请选择产品分类'}]">
                      <el-cascader v-model="formData.class_id" :options="classData" :props="{checkStrictly: true, expandTrigger: 'hover' ,value:'id',label:'name'}" placeholder="请选择产品分类" style="width: 400px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item label="产品名称" prop="name" :rules="[{ required: true, message: '产品名称不能为空'}]">
                      <el-input v-model="formData.name" style="width:400px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="产品单价" prop="price">
                      <el-input v-model="formData.price" type="text"><template slot="append">元</template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="产品编号" prop="no">
                      <el-input v-model="formData.no" type="text" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="产品条码" prop="code">
                      <el-input v-model="formData.code" type="text" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="运费" prop="price_freight">
                      <el-input v-model="formData.price_freight" type="text"><template slot="append">元</template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="产品型号" prop="model">
                      <el-input v-model="formData.model" type="text" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="单位" prop="unit">
                      <el-input v-model="formData.unit" type="text" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="产品原价" prop="price_orginal">
                      <el-input v-model="formData.price_orginal" type="text"><template slot="append">元</template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="库存" prop="stock">
                      <el-input v-model="formData.stock" type="text" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="销量" prop="sales">
                      <el-input v-model="formData.sales" type="number" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="是否上架" prop="status">
                      <el-switch v-model="formData.status" on-text="" off-text="" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="是否热销" prop="hot">
                      <el-switch v-model="formData.hot" on-text="" off-text="" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="8">
                    <el-form-item label="是否首页推荐" prop="recommend_index">
                      <el-switch v-model="formData.recommend_index" on-text="" off-text="" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item label="产品图片">
                      <tyt-upload :length="5" :file-list="formData.cover" :path-name="uploadCoverPath" :thumbsize="[300,600]" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item label="产品介绍" style="width:100%;">
                      <Tinymce ref="editor" v-model="formData.content" :height="300" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="产品规格" name="specs">
                <product-specs ref="specs" :form-data="formData" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>

        <div class="fixed-btn">
          <el-button @click="resetForm('form')"><i class="el-icon-refresh-left" /> 重 置</el-button>
          <el-button type="primary" @click="submitForm('form')"><i class="el-icon-check" /> 提 交</el-button>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { classes, detail, store } from '@/api/shop/product'
import TytUpload from '@/components/Tytrock/components/UploadImg'
import Tinymce from '@/components/Tinymce'
import ProductSpecs from './components/ProductSpecs.vue'

export default {
	name: 'ProductCreate',
	components: { TytUpload, Tinymce, ProductSpecs },
	data() {
		return {
			pageTitle: '新增产品',
			detailData: {},
			loading: false,
			formData: { id: '', category: 1, name: '', cover: [], price: '', price_cost: '', unit: '', stock: 0, sales: 0, status: 1, hot: 0, recommend_index: 1, specs_status: 0 },
			classData: [],
			uploadCoverPath: this.$store.getters.client_id + '/product',
			activeName: 'info'
		}
	},
	mounted() {
		console.log(this.$store.getters)
		this.init()
	},
	methods: {
		init() {
			classes().then(res => {
				this.classData = this.getTreeData(res.data.lists)
			})
			if (this.$route.query.id > 0) {
				this.detailData.id = this.$route.query.id
				this.pageTitle = '编辑产品'
				this.loading = true
				detail(this.detailData).then(res => {
					this.loading = false
					this.detailData = res.data.data
					if (res.data.data) {
						this.formData = res.data.data
						this.formData.cover = res.data.data.coverUrlArr

						// 如果有规格
                        if (this.detailData.specs_status) {
                            this.$nextTick(() => {
                                this.$refs.specs.tableData = this.detailData.specsArr
                                this.$refs.specs.tableData2 = this.detailData.specsArr2
                            })
                        }
					}
				})
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 如果有规格
                    const res = []
                    if (this.formData.specs_status) {
                        console.log(this.$refs.specs)
                        let specs = this.$refs.specs.tableData
                        const specs2 = this.$refs.specs.tableData2
                        specs.forEach((v, index) => {
                            console.log(index)
                            res.push({

                                price: v.price,
                                stock: v.stock
                                // pic: v.pic
                            })
                            if (specs2.length >= 1) {
                                res[res.length - 1][specs2[0].name] = v[specs2[0].name]
                            }
                            if (specs2.length >= 2) {
                                res[res.length - 1][specs2[1].name] = v[specs2[1].name]
                            }
                            if (specs2.length >= 3) {
                                res[res.length - 1][specs2[2].name] = v[specs2[2].name]
                            }
                        })
                        specs = res

                        // let specsJsonData = JSON.stringify(specs);// 转成JSON格式
						// let specsResult = $.parseJSON(specsJsonData);
                        this.formData.specs = specs

                        // let specs2JsonData = JSON.stringify(specs2);// 转成JSON格式
						// let specs2Result = $.parseJSON(specs2JsonData);
                        this.formData.specs2 = specs2
                    }

					const coverObj = this.formData.cover
					const coverArr = []
					coverObj.forEach(v => {
					    coverArr.push(v.response)
					})
					this.formData.cover_str = coverArr.join(',')
					console.log(this.formData)

					store(this.formData).then(res => {
						this.$message.success(res.msg)
						this.$store.dispatch('tagsView/delView', this.$route)
						this.$router.push({ path: '/sales/product/lists' })
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
	    goBack() {
	    	this.$router.go(-1)
	    }
	}
}
</script>

<style>
</style>
