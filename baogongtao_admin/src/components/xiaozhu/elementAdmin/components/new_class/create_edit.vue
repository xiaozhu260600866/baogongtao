<template>
  <div>
    <el-dialog title="新建或编辑" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" append-to-body>
      <el-form ref="ruleForm" :model="ruleForm" class="pt20" create-edit-label="100px">

        <el-form-item v-if="parent && type == 'add'" label="父级名称" class="flex">
          <el-input v-model="parent.name" :disabled="true" />
        </el-form-item>
        <el-form-item
          v-for="v in fields"
          v-if="v.type && !v.levShow || v.levShow == lev"
          :label="v.label"
          :prop="v.prop"
          class="flex"
          :rules="v.type == 'password' && ruleForm.id ? '' : getRule(v)"
        >
          <el-input v-if="v.type == 'text'" v-model="ruleForm[v.prop]" :disabled="v.disabled" :style="v.style ? v.style : '' " />
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
          >
            <el-option v-for="q in data[v.datakey]" v-if="data[v.datakey]" :label="q.label" :value="q.value" />
            <el-option v-for="q in v.data" v-if="v.data" :label="q.label" :value="q.value" />
          </el-select>
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

          <div v-if="v.type == 'location' && !v.levShow || v.type == 'location' && v.levShow == lev" class="flex">
            <el-input v-model="ruleForm[v.prop]" class="CinputWidth" :disabled="v.disabled" :style="v.style ? v.style : '' " />
            <el-button @click.prevent="chooseLocation()">重新定位</el-button>
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
          <template v-if="v['append_form_'+v.prop]" scope="scope">
            <slot name="content" :row="ruleForm" :field="'append_form_'+v.prop" />
          </template>
          <template v-if="v['append_form_'+lev+'_'+v.prop]" scope="scope">
            <slot name="content" :row="ruleForm" :field="'append_form_'+lev+'_'+v.prop" />
          </template>
        </el-form-item>

        <el-form-item class="absolute-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <chooseLocation ref="chooseLocation" @callBack="locationCallBack" />

    </el-dialog>

  </div>
</template>

<script>
	import chooseLocation from '../chooseLocation'
    export default {
		components: {
			chooseLocation

		},
        props: ['fields', 'formAction', 'lev'],
        data() {
            return {
                dialogVisible: false,
                ruleForm: {},
                type: 'add',
                parent: {}
            }
        },
        methods: {

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
                                const re =
                                    /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+))(:\d+)?(\/.*)?(\?.*)?(#.*)?$/
                                if (!re.test(value)) {
                                    console.log(value)
                                    this.getError(v.label + 'url不正确')
                                    return false
                                }
                            }
                        }
                    }
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        for (let i = 0; i < this.fields.length; i++) {
                            const v = this.fields[i]
                            if (v.type == 'date' && this.ruleForm[v.prop] && typeof this.ruleForm[v.prop] ===
                                'object') {
                                const val = this.dateToString(this.ruleForm[v.prop])
                                this.$set(this.ruleForm, v.prop, val)
                            }
                            if (v.type == 'dateTime' && this.ruleForm[v.prop] && typeof this.ruleForm[v.prop] ===
                                'object') {
                                const val = this.dateToString(this.ruleForm[v.prop], 1)
                                this.$set(this.ruleForm, v.prop, val)
                            }
                        }

                        this.ruleForm.authType = this.type
                        if (this.type == 'add' && this.parent) {
                            this.ruleForm.fid = this.parent.id
                        } else if (this.type == 'add' && !this.parent) {
                            this.ruleForm.fid = 0
                        }
                        this.ruleForm.type = this.getParent().type
                        this.postAjax(this.getParent().formAction + 'class', this.ruleForm).then(msg => {
                            if (msg.data.status == 2) {
                                this.ruleForm.id = msg.data.id
                                this.$emit('callBack', this.ruleForm)
                                this.dialogVisible = false
                            }
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            getParent() {
                let parent = this.$parent
                while (parent) {
                    if (parent.name != 'class') {
                        parent = parent.$parent
                    } else {
                        return parent
                        break
                    }
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
            init(row, parent) {
                this.parent = this.getParent().parent
                if (row) {
                    this.ruleForm = row
                    this.type = 'edit'
                    this.fields.forEach(v => {
                        if (v.type == 'upload') {
                            const uploadVal = row[v.prop] ? this.splitCover(row[v.prop], v.upurl) : []

                           this.$set(this.ruleForm, v.prop, uploadVal)
                        }
                    })
                } else {
                    this.type = 'add'
                    this.fields.forEach(v => {
                        if (v.type == 'upload') {
                            this.$set(this.ruleForm, v.prop, [])
                        } else {
                            this.$set(this.ruleForm, v.prop, v.defaultValue || '')
                        }
                    })
                }

                this.dialogVisible = true
            },
            handleClose(done) {
               this.dialogVisible = false
            }
        }
    }
</script>

<style>
</style>
