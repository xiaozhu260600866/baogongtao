<template>
  <div>
    <el-dialog
      v-if="dialogFormVisible && !noDialog"
      title="新建\编辑"
      :visible.sync="dialogFormVisible"
      :top="top ? top : '50px'"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :width="createEditDiagWidth"
      append-to-body
      class="createDiag"
      :class="lengthDiag?'lengthDiag':''"
    >
      <el-form ref="ruleForm" :model="ruleForm" :label-width="createEditLabel" class="demo-ruleForm create-box">
        <div v-for="field in newFields" class="flex">
          <el-form-item
            v-for="v in field"
            :label="v.label"
            :prop="v.prop"
            :rules="v.type == 'password' && ruleForm.id ? '' : getRule(v)"
          >
            <el-input v-if="v.type == 'text'" v-model="ruleForm[v.prop]" :disabled="v.disabled" :style="v.style?v.style:'width: 200px'" />
            <el-switch
              v-if="v.type == 'switch'"
              v-model="ruleForm[v.prop]"
              on-text=""
              off-text=""
              :active-value="1"
              :inactive-value="0"
            />
            <el-input
              v-if="v.type == 'password'"
              v-model="ruleForm[v.prop]"
              :disabled="v.disabled"
              type="password"
              :style="v.style?v.style:'width: 200px'"
            />
            <el-date-picker
              v-if="v.type == 'date'"
              v-model="ruleForm[v.prop]"
              type="date"
              placeholder="选择日期"
              :disabled="v.disabled"
              :style="v.style?v.style:'width: 200px'"
            />
            <el-date-picker
              v-if="v.type == 'dateTime'"
              v-model="ruleForm[v.prop]"
              type="datetime"
              placeholder="选择日期"
              :disabled="v.disabled"
              :style="v.style?v.style:'width: 200px'"
            />
            <el-input
              v-if="v.type == 'textarea'"
              v-model="ruleForm[v.prop]"
              type="textarea"
              :disabled="v.disabled"
              :autosize="{ minRows: 2, maxRows: 4}"
              :style="v.style?v.style:'width: 200px'"
            />
            <el-select
              v-if="v.type == 'select'"
              v-model="ruleForm[v.prop]"
              placeholder="请选择"
              :disabled="v.disabled"
              :style="v.style?v.style:'width: 200px'"
              :multiple="v.multiple ? v.multiple : false"
              clearable
            >
              <el-option v-for="q in data[v.datakey]" v-if="data[v.datakey] && q.value!=0" :label="q.label" :value="q.value" />
              <el-option v-for="q in v.data" v-if="v.data" :label="q.label" :value="q.value" />
            </el-select>
            <div v-if="v.type == 'manyselect'">
              <el-cascader
                v-model="ruleForm[v.prop]"
                placeholder="请输入要搜索的分类"
                expand-trigger="hover"
                :options="data[v.datakey]"
                :props="{multiple: v.multiple ? v.multiple : false}"
              />
            </div>
            <div v-if="v.type == 'location'" class="flex">
              <el-input v-model="ruleForm[v.prop]" class="CinputWidth" :disabled="v.disabled" :style="v.style?v.style:'width: 200px'" />
              <el-button v-if="!v.disabled" @click.prevent="chooseLocation()">重新定位</el-button>
            </div>
            <div v-if="v.type == 'upload'">
              <my-upload
                :upurl="v.upurl"
                :upload-length="v.allowUpLoadNum"
                :file-list="ruleForm[v.prop]"
                :sizearr="300"
              />
              <p class="fs-12 fc-9 lh-20 mt5">{{ v. uploadMessage || '最佳尺寸：750*750' }}</p>
            </div>

            <div v-if="v.type=='radio'">
              <el-radio v-for="q in data[v.datakey]" v-if="data[v.datakey]" v-model="ruleForm[v.prop]" :label="q.value">{{ q.label }}</el-radio>
              <el-radio v-for="q in v.data" v-if="v.data" v-model="ruleForm[v.prop]" :label="q.value">{{ q.label }}</el-radio>
            </div>

            <div v-if="v.type == 'searchRadio'">
              <el-button @click="searchRadio(v,ruleForm[v.prop])">{{ v.label }}</el-button>
              <el-tag v-if="ruleForm[v.name]" type="gray">{{ ruleForm[v.name] }}</el-tag>
            </div>
            <div v-if="v.type == 'searchCheckbox'">
              <el-button @click="searchCheckbox(v,ruleForm[v.prop])">{{ v.label }}</el-button>
              <el-tag
                v-for="(button,buttonKey) in ruleForm[v.name]"
                v-if="ruleForm[v.name]"
                type="gray"
                closable
                @close="closeButton(buttonKey,v.name,v.prop)"
              >{{ button }}</el-tag>
            </div>
            <div v-if="v.type == 'editor'" class="el-form-item">
              <div :class="['el-form-item__content',v.class? v.class : '' ]" :style="v.style?v.style:'width: 200px'">
                <Tinymce v-if="!v.disabled" ref="editor" v-model="ruleForm[v.prop]" :height="300" />
                <div v-else v-html="ruleForm[v.prop]" />
              </div>
            </div>
            <template v-if="v['append_form_'+v.prop]" scope="scope">
              <slot name="content" :row="ruleForm" :field="'append_form_'+v.prop" />
            </template>
          </el-form-item>
        </div>
        <el-form-item v-if="!disabled" class="absolute-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div v-if="noDialog" class="app-container dx-container mt5">

      <el-form ref="ruleForm" :model="ruleForm" :label-width="createEditLabel || '100px'" class="demo-ruleForm create-box">
        <div class="dx-main xiaozhufrom pb50">
          <div class="list-box mt20">
            <div v-for="field in newFields" class="flex">
              <el-form-item
                v-for="v in field"
                :label="v.label"
                :prop="v.prop"
                :rules="v.type == 'password' && ruleForm.id ? '' : getRule(v)"
                class="flex"
                style="width:100%"
              >
                <el-input
                  v-if="v.type == 'text'"
                  v-model="ruleForm[v.prop]"
                  :disabled="v.disabled"
                  :style="v.style ? v.style : '' "
                />
                <el-switch
                  v-if="v.type == 'switch'"
                  v-model="ruleForm[v.prop]"
                  on-text=""
                  off-text=""
                  :active-value="1"
                  :inactive-value="0"
                />
                <el-input
                  v-if="v.type == 'password'"
                  v-model="ruleForm[v.prop]"
                  :disabled="v.disabled"
                  type="password"
                  :style="v.style ? v.style : '' "
                />
                <el-date-picker
                  v-if="v.type == 'date'"
                  v-model="ruleForm[v.prop]"
                  type="date"
                  placeholder="选择日期"
                  :disabled="v.disabled"
                  :style="v.style ? v.style : '' "
                />
                <el-date-picker
                  v-if="v.type == 'dateTime'"
                  v-model="ruleForm[v.prop]"
                  type="datetime"
                  placeholder="选择日期"
                  :disabled="v.disabled"
                  :style="v.style ? v.style : '' "
                />
                <el-input
                  v-if="v.type == 'textarea'"
                  v-model="ruleForm[v.prop]"
                  type="textarea"
                  :disabled="v.disabled"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :style="v.style ? v.style : '' "
                />
                <el-select
                  v-if="v.type == 'select'"
                  v-model="ruleForm[v.prop]"
                  placeholder="请选择"
                  :disabled="v.disabled"
                  :style="v.style ? v.style : '' "
                  :multiple="v.multiple ? v.multiple : false"
                  clearable
                >
                  <el-option v-for="q in data[v.datakey]" v-if="data[v.datakey] && q.value!=0" :label="q.label" :value="q.value" />
                  <el-option v-for="q in v.data" v-if="v.data" :label="q.label" :value="q.value" />
                </el-select>
                <div v-if="v.type == 'location'" class="flex">
                  <el-input
                    v-model="ruleForm[v.prop]"
                    class="CinputWidth"
                    :disabled="v.disabled"
                    :style="v.style ? v.style : '' "
                  />
                  <el-button v-if="!v.disabled" @click.prevent="chooseLocation()">重新定位</el-button>
                </div>
                <div v-if="v.type == 'upload'">
                  <my-upload
                    :upurl="v.upurl"
                    :upload-length="v.allowUpLoadNum"
                    :file-list="ruleForm[v.prop]"
                    :sizearr="300"
                  />
                  <p class="fs-12 fc-9 lh-20 mt5">{{ v. uploadMessage || '最佳尺寸：750*750' }}</p>
                </div>
                <div v-if="v.type == 'uploadFile'" class="upload-file-group">
                  <uploadFile2
                    :file-list="ruleForm[v.prop]"
                    :accept="v.accept"
                    :upurl="v.upurl"
                    :action="v.action"
                    :allow-suffix="v.allowSuffix"
                  />
                  <div class="file-right">
                    <el-input
                      v-for="(filename,filenamekey) in ruleForm[v.prop]"
                      v-model="ruleForm['upload_file_name_'+filenamekey]"
                      class="mb10"
                      :placeholder="'请填写文件名称'+(filenamekey +1)"
                    />
                  </div>
                </div>
                <div v-if="v.type == 'manyselect'">
                  <el-cascader
                    v-model="ruleForm[v.prop]"
                    placeholder="请输入要搜索的分类"
                    expand-trigger="hover"
                    :options="data[v.datakey]"
                    style="width:300px"
                    :props="{multiple: v.multiple ? v.multiple : false}"
                  />
                </div>
                <div v-if="v.type=='radio'">
                  <el-radio
                    v-for="q in data[v.datakey]"
                    v-if="data[v.datakey]"
                    v-model="ruleForm[v.prop]"
                    :label="q.value"
                  >{{ q.label }}</el-radio>
                  <el-radio v-for="q in v.data" v-if="v.data" v-model="ruleForm[v.prop]" :label="q.value">{{ q.label }}</el-radio>
                </div>
                <div v-if="v.type == 'searchRadio'">
                  <el-button @click="searchRadio(v,ruleForm[v.prop])">{{ v.label }}</el-button>
                  <el-tag v-if="ruleForm[v.name]" type="gray">{{ ruleForm[v.name] }}</el-tag>
                </div>
                <div v-if="v.type == 'searchCheckbox'">
                  <el-button @click="searchCheckbox(v,ruleForm[v.prop])">{{ v.label }}</el-button>
                  <el-tag
                    v-for="(button,buttonKey) in ruleForm[v.name]"
                    v-if="ruleForm[v.name]"
                    type="gray"
                    closable
                    @close="closeButton(buttonKey,v.name,v.prop)"
                  >{{ button }}</el-tag>
                </div>
                <div v-if="v.type == 'editor'" class="el-form-item mt5">

                  <div :class="['el-form-item__content',v.class? v.class : '' ]" :style="v.style ? v.style : 'width:100%' ">
                    <Tinymce ref="editor" v-model="ruleForm[v.prop]" :height="300" />
                  </div>
                </div>

                <template v-if="v['append_form_'+v.prop]" scope="scope">
                  <slot name="content" :row="ruleForm" :field="'append_form_'+v.prop" />
                  <slot :name="'append_form_'+v.prop" :row="ruleForm" />
                </template>
              </el-form-item>
            </div>

            <el-form-item v-if="!disabled" class="fixed-btn flex-center" style="width:100%">
              <div class="flex-center">
                <el-button type="primary" @click="submitForm('ruleForm')">提交 {{ newfields2 }}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>

    </div>
    <chooseLocation ref="chooseLocation" @callBack="locationCallBack" />
    <searchAll ref="searchAll" @callBack="searchCallBack" />
    <searchAll2 ref="searchAll2" @callBack="searchCallBack2" />
  </div>
</template>
<script>
	import chooseLocation from './chooseLocation'
		import searchAll from './searchAll'
		import searchAll2 from './searchAll'
	import Tinymce from './Tinymce'
  import uploadFile2 from './uploadFile2.vue'
	export default {
		components: {
			chooseLocation,
			searchAll,
			searchAll2,
			Tinymce,
	  uploadFile2
		},
		props: ['top', 'fields', 'data', 'createAction', 'editAction', 'createEditDiagWidth', 'createEditLabel', 'noDialog', 'lengthDiag'],
		data() {
			return {
			ruleForm: { content: '' },
			formAction: '',
			dialogFormVisible: false,
			integral: 0,
			row: {},
			newFields: [],
			newfields2: '',
			disabled: false
			}
		},
	watch: {
	　　ruleForm: {
		handler(newValue, oldValue) {
		if (newValue.upload_file && newValue.upload_file.length) {
					newValue.upload_file.forEach((v, index) => {
					   if (!this.ruleForm['upload_file_name_' + index]) {
							this.$set(this.ruleForm, 'upload_file_name_' + index, v.name)
					   }
					})
			  }
		  },
		deep: true
	　　}
	},
		methods: {

			closeButton(key, name, prop) {
				this.ruleForm[name].splice(key, 1)
				this.ruleForm[prop].splice(key, 1)
			},
			searchCheckbox(row, value) {
				this.row = row
				this.$refs.searchAll2.ajax(row, value, 'checkbox')
			},
			searchCallBack2(row) {
				if (row.length) {
						row.forEach((v, key) => {
						this.ruleForm[this.row.name].push(v[this.row.rowName])
						this.ruleForm[this.row.prop].push(v.id)
						// this.$set(this.ruleForm,this.row.name,row[0][this.row.rowName]);
						// this.$set(this.ruleForm,this.row.prop,row[0].id);
					})
				} else {
					this.getError('您还没有选择')
					return false
				}
				console.log(this.ruleForm)
			},
			searchRadio(row, value) {
				this.row = row
				this.$refs.searchAll.ajax(row, value)
			},
			searchCallBack(row) {
				if (row.length > 1) {
					this.getError('只能选择一项')
					return false
				}
				if (row.length) {
					this.$set(this.ruleForm, this.row.name, row[0][this.row.rowName])
					this.$set(this.ruleForm, this.row.prop, row[0].id)
				} else {
					this.getError('您还没有选择')
					return false
				}
			},
			getRule(row) {
				if (row.datatype) {
					const vaildArr = row.datatype.split('|')
					const vaild = []
					for (var i = 0; i < vaildArr.length; i++) {
						if (vaildArr[i] == 'require') {
							vaild.push(
								{ required: true, message: row.label + '不能为空' }
							)
						}
					}
					return vaild
				} else {
					return []
				}
			},

			submitForm(formName) {
				// 验证开始
				// forStart
				for (let i = 0; i < this.fields.length; i++) {
					const v = this.fields[i]
					const value = this.ruleForm[v.prop]
					if (v.datatype) {
						const vaildArr = v.datatype.split('|')
						for (var j = 0; j < vaildArr.length; j++) {
								if (vaildArr[j] == 'require') {
									if (!value && value !== 0) {
										if (this.ruleForm.id && v.type == 'password') {
										} else {
											this.getError('请输入' + v.label)
											return false
										}
									}
								} else if (vaildArr[j] == 'phone') {
									var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
									if (!phoneReg.test(value)) {
										this.getError('手机号码格式不正确')
										return false
									}
								} else if (vaildArr[j] == 'integer') {
									if (isNaN(value) == true) {
										this.getError(v.label + '请填写正确的数字')
										return false
									}
								} else if (vaildArr[j] == 'price') {
									var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
									if (!reg.test(value)) {
										this.getError(v.label + '请填写正确的金额')
										return false
									}
								} else if (vaildArr[j] == 'array') {
									if (value.length == 0) {
										this.getError(v.label + '必填')
										return false
									}
								} else if (vaildArr[j] == 'url') {
									const re = /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+))(:\d+)?(\/.*)?(\?.*)?(#.*)?$/
									if (!re.test(value)) {
										console.log(value)
										this.getError(v.label + 'url不正确')
										return false
									 }
								}
						  }
					}
				}

				// 验证结束
				const upload_file_name = []
				this.$emit('submitBeforeCallBack', this.ruleForm)
				// return false;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						for (let i = 0; i < this.fields.length; i++) {
							const v = this.fields[i]
							if (v.type == 'date' && this.ruleForm[v.prop] && typeof this.ruleForm[v.prop] === 'object') {
								const val = this.dateToString(this.ruleForm[v.prop])
								this.$set(this.ruleForm, v.prop, val)
							}
						   if (v.type == 'dateTime' && this.ruleForm[v.prop] && typeof this.ruleForm[v.prop] === 'object') {
							 const val = this.dateToString(this.ruleForm[v.prop], 1)
							 this.$set(this.ruleForm, v.prop, val)
						   }
						  if (v.type == 'uploadFile' && this.ruleForm[v.prop] && this.ruleForm[v.prop].length) {
							 this.ruleForm[v.prop].forEach((u, uindex) => {
								console.log(this.ruleForm['upload_file_name_' + uindex])
								  if (this.ruleForm['upload_file_name_' + uindex]) {
									upload_file_name.push(this.ruleForm['upload_file_name_' + uindex])
								  }
							  })
							  if (upload_file_name.length != this.ruleForm[v.prop].length) {
								  this.getError('请填写文件名称')
								  return false
							  }
						   }
						}
						this.ruleForm.upload_file_name = upload_file_name.join(',')
						this.postAjax(this.formAction, this.ruleForm, msg => {
							if (msg.data.status == 2) {
								if (!this.noDialog) {
									this.dialogFormVisible = false
									this.$parent.ajax()
								} else {
                                    if (this.$route.fullPath.indexOf('edit') || this.$route.fullPath.indexOf('create')) {
                                       if (this.$store.state.tagsView.visitedViews.length > 1) {
                                           this.$store.state.tagsView.visitedViews.forEach((route, routeIndex) => {
                                                if (route.fullPath == this.$route.fullPath) {
                                                     this.$store.state.tagsView.visitedViews.splice(routeIndex, 1)
                                                }
                                           })
                                       }
                                    }

									this.$emit('submitAfterCallBack', this.ruleForm)

									this.$router.go(-1)
								}
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
			canPush(arr, value) {
				let canPush = true
				arr.forEach(v => {
					v.forEach(e => {
						if (e.label == value) {
							canPush = false
						}
					})
				})
				return canPush
			},
			ajax: function(params, data, fields, disabled) {
				console.log(this.newfields2)
				let rows = 0
				const rowsArr = []
				for (let i = 0; i < this.fields.length; i++) {
					const v = this.fields[i]
					if (v.column && v.column > 1) {
						rows += 1
						rowsArr.push(v.column)
					} else {
						rowsArr.push(1)
					}
				}
				const drow = parseInt(this.fields.length - rows)
				console.log(drow)
				// console.log(rowsArr);
				var newFields = []
				for (let i = 0; i < drow; i++) {
					const arr = []
					for (var j = 0; j < this.fields.length; j++) {
						const v = this.fields[j]
						if (this.canPush(newFields, v.label)) {
							if (v.column) {
								arr.push(v)
							} else {
								arr.push(v)
								break
							}
						}
					}
					newFields[i] = arr
				}
				this.newFields = newFields
				if (disabled) this.disabled = true
				this.dialogFormVisible = true
				if (params) {
					this.formAction = this.editAction + '?id=' + params.id
					this.ruleForm = params

					for (let i = 0; i < this.fields.length; i++) {
						const v = this.fields[i]
						if (v.editDisabled) {
							v.disabled = true
						} else {
							v.disabled = false
						}
						if (v.type == 'upload' || v.type == 'uploadFile') {
							   const uploadVal = params[v.prop] ? this.splitCover(params[v.prop], v.upurl) : []
							   this.$set(this.ruleForm, v.prop, uploadVal)
							   if (params['upload_file_name']) {
									const upload_file_name = params['upload_file_name'].split(',')
									upload_file_name.forEach((filename, filenameKey) => {
										this.$set(this.ruleForm, 'upload_file_name_' + filenameKey, filename)
									})
								}
						} else if (v.type == 'manyselect') {
							if (params[v.prop] && typeof params[v.prop] === 'string') {
								const res = []
									if (v.multiple) {
										  this.$set(this.ruleForm, v.prop, JSON.parse(params[v.prop]))
									} else {
										  params[v.prop].split(',').forEach(v => {
											res.push(parseInt(v))
										  })
										 this.$set(this.ruleForm, v.prop, res)
									}
								} else {
									this.$set(this.ruleForm, v.prop, [])
								}
								const selectVal = params[v.prop] && typeof params[v.prop] === 'string' ? params[v.prop].split(',') : []
						} else if (v.type == 'editor') {

							// this.$set(this.ruleForm,v.prop,params[v.prop]);
						} else if (v.type == 'searchCheckbox') {
							  params[v.prop] = '' + params[v.prop]
							  const val_ = params[v.prop] && typeof params[v.prop] === 'string' ? params[v.prop].split(',') : []
								this.$set(this.ruleForm, v.prop, val_)
							  const name_ = params[v.name] && typeof params[v.name] === 'string' ? params[v.name].split(',') : []
							  this.$set(this.ruleForm, v.name, name_)
						} else if (v.type == 'select' && v.multiple) {
							 if (params[v.prop] && typeof params[v.prop] === 'string') {
								const res_ = []
								params[v.prop].split(',').forEach(uq => {
									res_.push(parseInt(uq))
								 })
								this.$set(this.ruleForm, v.prop, res_)
							 }
						} else {
							this.$set(this.ruleForm, v.prop, params[v.prop])
						}
						this.$set(this.ruleForm, v.prop, this.ruleForm[v.prop])
					}
						console.log(this.ruleForm)
						this.$emit('createBeforeCallBack', this.ruleForm)
					// this.ruleForm.cover = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "appointment") : []
				} else {
					this.$nextTick(msg => {
							if (this.$refs.editor2 && this.$refs.editor2.length) this.$refs.editor2[0].setContent('')
					})
					this.ruleForm = {}
					for (let i = 0; i < this.fields.length; i++) {
						const v = this.fields[i]
						if (v.editDisabled) {
							v.disabled = false
						} else {
							v.disabled = false
						}
						const defaultValue = v.defaultValue == undefined ? '' : v.defaultValue
						if (v.type == 'upload' || v.type == 'uploadFile') {
							this.$set(this.ruleForm, v.prop, [])
						} else if (v.type == 'searchCheckbox') {
							this.$set(this.ruleForm, v.prop, [])
							this.$set(this.ruleForm, v.name, [])
						} else if (v.type == 'select' && v.multiple) {
							 this.$set(this.ruleForm, v.prop, [])
						} else if (v.type == 'date') {
							this.$set(this.ruleForm, v.prop, this.dateToString(new Date()))
						  } else {
							this.$set(this.ruleForm, v.prop, defaultValue)
						}
					}
					this.$emit('createBeforeCallBack', this.ruleForm)
					this.formAction = this.createAction
				}
			},
			handleClose() {
				this.dialogFormVisible = false
			},
			chooseLocation() {
				this.$refs.chooseLocation.ajax()
			},
			locationCallBack(res) {
				if (res.latlng) {
					this.$refs.chooseLocation.handleClose()
					this.$set(this.ruleForm, 'address', res.poiaddress)

					this.ruleForm.location_y = res.latlng.lng
					this.ruleForm.location_x = res.latlng.lat
				}
			}
		}
	}
</script>
<style type="text/css">
	.xiaozhufrom .el-form-item__content {
		margin-left: 0 !important;
		width: 100%
	}

	.createDiag .el-dialog {
		max-height: calc(100% - 100px);
		padding-bottom: 80px;
	}
	.lengthDiag .el-dialog{
		height: calc(100% - 100px);
	}

	.createDiag .absolute-btn {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-left: 35px;
	}

	.createDiag .el-dialog .el-dialog__body {
		position: initial;
		margin-bottom: 0;
	}

	.createDiag .el-dialog__body {
		height: calc(100% - 80px);
		overflow-y: scroll;
		padding: 20px;
	}

	.createDiag .createEdit_nav {
		position: absolute;
		bottom: 0;
		width: calc(100% - 40px);
		z-index: 9991;
		background: #fff;
		padding-top: 20px;
	}

	.createDiag .el-form-item {
		flex: 1;
	}

	.create-box .fixed-btn {
		margin-bottom: 0;
		padding: 15px 0 15px 230px;
	}
	.create-box .CinputWidth{margin-right: 10px;}
	.upload-file-group{display: flex;}
	.upload-file-group .file-right{flex: 1;margin-left: 20px;padding-top: 234px;}
</style>
