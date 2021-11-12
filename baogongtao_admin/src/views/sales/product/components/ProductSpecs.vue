<template>
  <div>
    <div>
      <el-form-item label="规格开关" prop="specs_status">
        <el-switch v-model="formData.specs_status" on-text="" off-text="" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item v-if="formData.specs_status" label="商品规格" prop="is_share_distribution">
        <div v-for="(v,index) in tableData2" class="rc-sku">
          <div>
            <el-form-item label="规格名" prop="is_share_distribution" class="group-title">
              <el-input v-model="v.name" style="width: 140px;" />
              <div class="a" @click="tableData2.splice(index,1)"><i class="el-icon-error bb" /></div>
            </el-form-item>
            <div class="flex flex-wrap group-value">
              <el-form-item
                v-for="(children,childrenIndex) in v.children"
                label="规格值"
                class="xiaozhuChildren mb10"
                prop="is_share_distribution"
                style="position: relative;float: left;"
              >
                <el-input v-model="children.name" style="width:140px;" />
                <div class="a" @click="tableData2[index].children.splice(childrenIndex,1)"><i class="el-icon-error aa" /></div>
              </el-form-item>
              <!-- <a href="javascripr:;" class="pt10" @click="addChildren(index)">添加规格值</a> -->
              <el-button size="small" plain class="mb10 ml15" @click="addChildren(index)">添加规格值</el-button>
            </div>
          </div>
        </div>
        <div :title="tableData2.length >=3 ? '最多支持三级规格':''">
          <el-button type="primary" class="zent-btn" :disabled="tableData2.length>=3 ? true :false" @click="add">
            添加规格项目 </el-button>
        </div>
      </el-form-item>
    </div>
    <div style="margin-top: 20px;margin-left: 100px;">
      <el-table v-if="tableData2.length && show" :data="tableData" border style="width: 100%;" :span-method="objectSpanMethod">
        <el-table-column v-for="field in fields" :prop="field.prop" :label="field.label" min-width="100" />
        <el-table-column prop="price" label="价格" min-width="100">
          <template scope="scope">
            <div class="el-input el-input--medium"><input v-model="scope.row.price" type="text" autocomplete="off" class="el-input__inner"></div>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100">
          <template scope="scope">
            <div class="el-input el-input--medium"><input v-model="scope.row.stock" type="text" autocomplete="off" class="el-input__inner"></div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="pic" label="图片" width="100">
                    <template scope="scope">
                        <my-upload class="proImg typeImg" upurl="product" :uploadLength="1" :fileList="scope.row.pic"
                            :sizearr="300" type="2"></my-upload>
                    </template>
                </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['formData'],
        data() {
            return {
                arr: [
                    { price: 0 }
                ],
                firstSpan: [],
                test: '',
                secondSpan: [],
                fields: [],
                show: false,
                tableData2: [],
                rowArr: [],
                tableData: []
            }
        },
        watch: {
            tableData2: {
                handler(newValue, oldValue) {
                    this.forMataTable()
                },
                deep: true
            }
        },
        mounted() {
            // this.forMataTable();
        },
        methods: {
            add() {
                if (this.tableData2.length >= 3) {
                    return false
                }

                if (this.tableData2.length == 0) {
                    this.tableData2.push({
                        name: '',
                        price: '',
                        pic: [],
                        children: [{
                            name: '',
                            price: ''
                        }]
                    })
                } else if (this.tableData2.length == 1) {
                    this.tableData2.push({
                        name: '',
                         price: '',
                        pic: [],
                        children: [{
                            name: '',
                            price: ''
                        }]
                    })
                } else if (this.tableData2.length == 2) {
                    this.tableData2.push({
                        name: '',
                        price: '',
                        pic: [],
                        children: [{
                            name: '',
                            price: ''
                        }]
                    })
                }
            },
            addChildren(parentIndex) {
                this.tableData2[parentIndex].children.push({
                    name: '',
                    price: ''
                })
            },
            forMataTable() {
                // 判断规格里最大的行数；
                if (!this.formData.specs_status) return false

                let maxRow = 0
                this.show = false
                const fields = []
                // this.tableData=[];
                this.tableData2.forEach((v, index) => {
                    if (this.tableData2.length == 1) {
                        maxRow = 1
                    } else {
                        if (index != 0) {
                            maxRow = maxRow == 0 ? this.tableData2[index].children.length : maxRow * this.tableData2[
                                index].children.length
                        }
                        // 如果是第一行；
                    }
                    fields.push({
                        label: v.name,
                        prop: v.name
                    })
                })

                this.fields = fields
                const data = []
                let rowIndex = 0
                console.log(123)
                console.log(this.tableData)
                this.tableData2[0].children.forEach((v, index) => {
                    let twoKey_ = this.tableData2.length >= 3 ? this.tableData2[2].children.length - 1 : 0
                    let twoKey__ = 0
                    let treeKey_ = this.tableData2.length >= 3 ? this.tableData2[2].children.length - 1 : 0
                    let treeKey__ = 0
                    for (var i = 0; i < maxRow; i++) {
                        data.push([])
                        data[data.length - 1].prop = ''
                        data[data.length - 1].price = this.tableData[rowIndex] ? this.tableData[rowIndex].price : 0
                        data[data.length - 1].stock = this.tableData[rowIndex] ? this.tableData[rowIndex].stock : 0
                        if (this.tableData[rowIndex]) {
                            console.log(rowIndex)
                            // data[data.length - 1].pic = this.splitCover(this.tableData[rowIndex].pic, "product");
                        } else {
                            /*
                            if (this.$parent.$parent.$parent.$parent.data.detail && this.$parent.$parent.$parent
                                .$parent.data.detail.thumb_pic && !data[data.length - 1].pic ) {
                                data[data.length - 1].pic =[];
                            } else {
                                data[data.length - 1].pic = []
                            }
                            */

                            if (this.formData.price) {
                                data[data.length - 1].price = this.formData.price
                            }
                            if (this.formData.stock) {
                                data[data.length - 1].stock = this.formData.stock
                            }
                        }
                        if (this.tableData2.length >= 1) {
                            data[data.length - 1][this.tableData2[0].name] = v.name
                        }
                        if (this.tableData2.length >= 2) {
                            data[data.length - 1][this.tableData2[1].name] = this.tableData2[1].children[
                                    twoKey__]
                                ? this.tableData2[1].children[twoKey__].name : ''

                            if (i >= twoKey_ && this.tableData2.length >= 2) {
                                twoKey_ += this.tableData2.length >= 3 ? this.tableData2[2].children.length : 1
                                twoKey__++
                            }
                        }
                        if (this.tableData2.length >= 3) {
                            data[data.length - 1][this.tableData2[2].name] = this.tableData2[2].children[
                                    treeKey__]
                                ? this.tableData2[2].children[treeKey__].name : ''
                            if (i >= treeKey_ && this.tableData2.length >= 3) {
                                treeKey_ += this.tableData2[2].children.length
                                treeKey__ = 0
                            } else {
                                treeKey__++
                            }
                        }
                        rowIndex++
                    }
                })
                // this.tableData = data;

                this.$set(this.$data, 'tableData', data)
                const secondSpan = [0]
                const firstSpan = [0]
                this.firstSpan = []
                this.secondSpan = []
                data.forEach((v, index) => {
                    if (this.tableData2.length >= 3) {
                        const name = v[this.tableData2[0].name] + v[this.tableData2[1].name]
                        if (!this.in_array(name, secondSpan)) {
                            secondSpan.push(name)
                            this.secondSpan.push(index)
                        }
                    }
                    if (!this.in_array(v[this.tableData2[0].name], firstSpan)) {
                        firstSpan.push(v[this.tableData2[0].name])
                        this.firstSpan.push(index)
                    }
                })
                console.log(this.tableData)
                this.show = true
            },
            objectSpanMethod({
                row,
                column,
                rowIndex,
                columnIndex
            }) {
                // 如果是第一列

                if (columnIndex === 0) {
                    let infoNum = 0
                    if (this.in_array(rowIndex, this.firstSpan)) {
                        this.tableData.forEach(msg => {
                            if (row[this.tableData2[0].name] == msg[this.tableData2[0].name]) {
                                infoNum++
                            }
                        })
                        return {
                            rowspan: infoNum,
                            colspan: 1
                        }
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                } else if (columnIndex == 1 && this.tableData2.length > 2) {
                    let infoNum = 0

                    if (this.in_array(rowIndex, this.secondSpan)) {
                        this.tableData.forEach(msg => {
                            if ((row[this.tableData2[0].name] + row[this.tableData2[1].name]) == msg[this.tableData2[
                                    0].name] + msg[this.tableData2[1].name]) {
                                infoNum++
                            }
                        })

                        return {
                            rowspan: infoNum,
                            colspan: 1
                        }
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            }
        }
    }
</script>

<style>
    .rc-sku {
        background-color: #fff;
        padding: 10px;
        border: 1px solid #e5e5e5;
        margin-bottom: 10px;
    }

    .xiaozhuChildren:hover .aa {
        display: block;
        color: #f00;
    }

    .group-title:hover .bb {
        display: block;
    }

    .el-icon-error {
        position: absolute;
        right: 5px;
        top: 10px;
        display: none;
        cursor: pointer;
    }

    .group-title {
        position: relative;
        margin: 0;
        background-color: #f5f5f5;
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        padding: 10px 0;
    }
    .group-value{
        padding: 10px 0;
    }

    .typeImg .div-img {
        width: 40px !important;
    }

    .typeImg .avatar {
        width: 40px !important;
        height: 40px !important;
        border-radius: 3px;
    }
</style>
