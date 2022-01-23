<template>
  <el-dialog
    v-if="dialogFormVisible"
    title="新建\编辑1111"
    :visible.sync="dialogFormVisible"
    :top="top ? top : '50px'"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :width="createEditDiagWidth"
    class="createDiag"
  >
    <el-form ref="ruleForm" :model="ruleForm" :label-width="createEditLabel" class="demo-ruleForm create-box">
      <div v-for="field in newFields" class="flex">
        <el-form-item v-for="v in field" :label="v.label" :prop="v.prop" :rules="getRule(v)">
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
          >
            <el-option
              v-for="q in data[v.datakey]"
              v-if="data[v.datakey]"
              :label="q.label"
              :value="q.value"
            />
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
          <div v-if="v.type=='radio'">
            <el-radio
              v-for="q in data[v.datakey]"
              v-if="data[v.datakey]"
              v-model="ruleForm[v.prop]"
              :label="q.value"
            >{{ q.label }}</el-radio>
            <el-radio v-for="q in v.data" v-if="v.data" v-model="ruleForm[v.prop]" :label="q.value">
              {{ q.label }}
            </el-radio>
          </div>
          <div v-if="v.type == 'searchRadio'">
            <el-button @click="searchRadio(v,ruleForm[v.prop])">{{ v.label }}</el-button>
            <el-tag v-if="ruleForm[v.name]" type="gray">{{ ruleForm[v.name] }}</el-tag>
          </div>
          <div v-if="v.type == 'searchCheckbox'">

            <div v-if="v.result && v.result == 'table'">
              <el-button @click="searchCheckbox(v,ruleForm[v.prop])">{{ v.label }}</el-button>
              <el-table v-if="ruleForm[v.resultProp].length" :data="ruleForm[v.resultProp]" style="width: 100%">

                <el-table-column :prop="v.rowName" label="商家名称" width="180" />
                <el-table-column prop="amount" label="核销金额">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.amount"><template slot="append">元</template></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="ruleForm[v.resultProp].splice(scope.$index,1)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else>
              <el-button @click="searchCheckbox(v,ruleForm[v.prop])">{{ v.label }}</el-button>
              <el-tag
                v-for="(button,buttonKey) in ruleForm[v.name]"
                v-if="ruleForm[v.name]"
                type="gray"
                closable
                @close="closeButton(buttonKey,v.name,v.prop)"
              >{{ button }}</el-tag>
            </div>

          </div>
          <div v-if="v.type == 'editor'" class="el-form-item">
            <div :class="['el-form-item__content',v.class? v.class : '' ]" :style="v.style ? v.style : '' ">
              <Tinymce v-if="!v.disabled" ref="editor" v-model="ruleForm[v.prop]" :height="300" />
              <div v-else v-html="ruleForm[v.prop]" />
            </div>
          </div>
          <template v-if="v['append_form_'+v.prop]" scope="scope">
            <slot name="content" :row="ruleForm" :field="'append_form_'+v.prop" />
          </template>
        </el-form-item>
      </div>
      <el-form-item v-if="!disabled" class="createEdit_nav">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
    <chooseLocation ref="chooseLocation" @callBack="locationCallBack" />
    <searchAll ref="searchAll" @callBack="searchCallBack" />
    <searchAll2 ref="searchAll2" @callBack="searchCallBack2" />
  </el-dialog>
</template>
<script>
	import chooseLocation from './chooseLocation'
	import searchAll from './searchAll'
	import searchAll2 from './searchAll'
	import Tinymce from './Tinymce'
	export default {
		components: {
			chooseLocation,
			Tinymce,
			searchAll,
			searchAll2
		},
		props: ['top', 'fields', 'data', 'createAction', 'editAction', 'createEditDiagWidth', 'createEditLabel'],
		data() {
			return {
				ruleForm: {},
				formAction: '',
				dialogFormVisible: false,
				integral: 0,
				row: {},
				newFields: [],
				disabled: false,
				result: ''
			}
		},
		methods: {
			closeButton(key, name, prop) {
				this.ruleForm[name].splice(key, 1)
				this.ruleForm[prop].splice(key, 1)
			},
			searchCheckbox(row, value) {
				this.row = row
				this.$refs.searchAll2.ajax(row, value)
			},
			searchCallBack2(row) {
				if (row.length) {
					row.forEach((v, key) => {
						if (this.row.result && this.row.result == 'table') {
							this.ruleForm[this.row.name].push(v[this.row.rowName])
							this.ruleForm[this.row.prop].push(v.id)
							this.ruleForm[this.row.resultProp].push({
								id: v.id,
								company_name: v[this.row.rowName],
								amount: 0
							})
						} else {
							this.ruleForm[this.row.name].push(v[this.row.rowName])
							this.ruleForm[this.row.prop].push(v.id)
						}

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
							vaild.push({
								required: true,
								message: row.label + '不能为空'
							})
						}
					}
					return vaild
				} else {
					return []
				}
			},
			submitForm(formName) {
				// 验证开始
				for (let i = 0; i < this.fields.length; i++) {
					const v = this.fields[i]
					const value = this.ruleForm[v.prop]
					if (v.datatype) {
						const vaildArr = v.datatype.split('|')
						for (var j = 0; j < vaildArr.length; j++) {
							if (vaildArr[j] == 'require') {
								if (!value && value !== 0) {
									this.getError('请输入' + v.label)
									return false
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
							}
						}
					}
				}

				// 验证结束
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$emit('submitBeforeCallBack', this.ruleForm)
						for (let i = 0; i < this.fields.length; i++) {
							const v = this.fields[i]
							if (v.type == 'date' && this.ruleForm[v.prop] && typeof this.ruleForm[v.prop] ===
								'object') {
								const val = this.dateToString(this.ruleForm[v.prop])
								this.$set(this.ruleForm, v.prop, val)
							}
						}
						// console.log(this.ruleForm);
						// return false;
						this.postAjax(this.formAction, this.ruleForm, msg => {
							if (msg.data.status == 2) {
								this.$emit('submitAfterCallBack', this.ruleForm)
								this.dialogFormVisible = false
								this.$parent.ajax()
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
				let rows = 0
				const rowsArr = []
				for (let i = 0; i < this.fields.length; i++) {
					const v = this.fields[i]
					if (params.id && v.editDisabled) {
						v.disabled = true
					} else {
						v.disabled = false
					}
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

						if (v.type == 'upload') {
							const uploadVal = params[v.prop] ? this.splitCover(params[v.prop], v.upurl) : []
							this.$set(this.ruleForm, v.prop, uploadVal)
						} else if (v.type == 'editor') {
							this.$nextTick(msg => {
								// this.$refs.editor2[0].setContent('');

								this.$refs.editor2[0].setContent(params[v.prop])
								// this.$set(this.ruleForm,v.prop,this.ruleForm[v.prop]);
							})
							// this.$set(this.ruleForm,v.prop,params[v.prop]);
						} else if (v.type == 'searchCheckbox') {
							if (v.result && v.result == 'table') {
								this.result = 'table'
								if (this.ruleForm[ v.resultProp]) {
									this.$set(this.ruleForm, v.resultProp, JSON.parse(this.ruleForm[ v.resultProp]))
								}
							}
							params[v.prop] = params[v.prop]
							const val_ = params[v.prop] && typeof params[v.prop] === 'string' ? params[v.prop].split(
								',') : []
							this.$set(this.ruleForm, v.prop, val_)
							const name_ = params[v.name] && typeof params[v.name] === 'string' ? params[v.name].split(
								',') : []
							this.$set(this.ruleForm, v.name, name_)
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
						if (this.$refs.editor2 && this.$refs.editor2.length) {
 this.$refs.editor2[0].setContent(
							'')
}
					})

					this.ruleForm = {}
					for (let i = 0; i < this.fields.length; i++) {
						const v = this.fields[i]
						const defaultValue = v.defaultValue == undefined ? '' : v.defaultValue
						if (v.type == 'upload') {
							this.$set(this.ruleForm, v.prop, [])
						} else if (v.type == 'searchCheckbox') {
							if (v.result && v.result == 'table') {
								this.result = 'table'
								this.$set(this.ruleForm, v.resultProp, [])
							}
							this.$set(this.ruleForm, v.prop, [])
							this.$set(this.ruleForm, v.name, [])
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
	.createDiag .el-dialog {
		height: calc(100% - 100px);
	}

	.createDiag .el-dialog__body {
		height: calc(100% - 150px);
		overflow-y: scroll;
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
</style>
