<template>
    <div>
        <div v-for="(v,index) in lists" class="flex flex-middle xiaozhu-lists" :style="'flex-wrap: wrap;width:'+width+'px'" v-if="v.show"  @click="toClick(v)">
            <div v-for="field in fields" v-if="!field.tableHidden" :style="{width:field.width+'px',height:'53px',borderBottom:'1px solid #EEF1F9'}"
                class="flex-middle">
                <div class="cell" >
                    <div v-if="!field['append_class_table_'+field.prop]">
                        <span v-if="field.prop == 'name'" :style="{paddingLeft:20* lev + 'px'}">
                            <a href="javascript:;" v-if="canChldrenShow(v)">
                                <i :class="!v.iconShow ? 'el-icon el-icon-arrow-right' : 'el-icon el-icon-arrow-down'"
                                    @click="v.iconShow = !v.iconShow;showDown(v.children,v.iconShow,v)"></i>
                            </a>
                            {{v[field.prop]}}
                        </span>
                        <span v-else-if="field.type == 'switch'">
                            <el-switch v-model="v[field.prop]" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="changeModel(v,field.prop)"></el-switch>
                        </span>
                        <span v-else-if="field.type == 'upload'" class='p20'>

                              <a :href="getImageUrl(v[field.prop],field.upurl)" v-if="v[field.prop] &&  v[field.prop].length>0"><img :src="getImageUrl(v[field.prop],field.upurl)" alt="" style="width:100px;height: 50px;" ></a>
                        </span>
                        <span v-else class="a">{{v[field.prop]}}  </span>
                     </div>
                     
                    <slot :name="'append_class_table_'+field.prop" :row="v" :$index='index'
                        v-if="field['append_class_table_'+field.prop]" />
                </div>
            </div>
            <div :style="{width:'300px',height:'53px',borderBottom:'1px solid #EEF1F9'}" class="flex-middle">
                <el-button type="primary" size="mini" @click="edit(v)">编辑</el-button>
                <el-button type="primary" size="mini" @click="addChildren(v)" v-if="canChldrenShow(v,1)">新增下级</el-button>
                <el-button type="primary" size="mini" @click="del(v,index)">删除</el-button>
            </div>
            <mychildren v-if="v.children" :lists="v.children" :fields="fields" :lev="lev+1" :width="width">
                
               <div :slot="'append_class_table_'+ field.prop" slot-scope="scope" v-for="field in fields">
                   <slot :name="'append_class_table_'+ field.prop" :row="scope.row" />
               </div>
                
            </mychildren>
        </div>
      <!--  <div class="flex  mt20">
            <el-button v-if="lev == 0" type="primary" @click="add">新增一级分类</el-button>
        </div> -->
        <createEdit ref="createEdit" :fields="fields" @callBack="createEditCallBack" :parent="parent" :formAction="formAction" :lev="lev"></createEdit>
    </div>
</template>

<script>
    import createEdit from "./create_edit.vue"
    export default {
        name: 'mychildren',
        components: {
            createEdit
        },
        methods: {
			toClick(item){
				console.log(item)
				this.$emit("clickCallBack",item);
			},
            getImageUrl(value,upurl){
                 let uploadVal  = value ? this.splitCover(value,upurl) : [];
                 return uploadVal.length ?uploadVal[0].url:'';
            },
            changeModel(item,field){
                console.log(item,field)
				
                this.postAjax(this.getParent().formAction + 'ajaxclass',{
                    id:item.id,
                    t:field,
                    v:item[field],
                    type: 'update_class'
                }).then(msg=>{
                     this.lists.splice(index,1);
                });

            },
            getParent() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.name != 'class') {
                        parent = parent.$parent;
                    } else {
                        return parent;
                        break;
                    }
                }

            },
            addChildren(parent) {
                this.getParent().parent = parent;
                this.$refs.createEdit.init('');
            },
            createEditCallBack(row) {
                if (row.authType == 'edit') {
                    for (let key in row) {
                        this.item[key] = row[key];
                    }
                }
                this.getParent().createEditCallBack(row)

            },
            add() {
                this.getParent().parent = "";
                this.$refs.createEdit.init();
            },
            edit(v) {
                //v.name = "123456";
                this.item = v;
                this.$refs.createEdit.init(JSON.parse(JSON.stringify(v)));
            },
            del(v, index) {
				
                this.getConfirm("是否确认删除类别1",msg=>{
                    
                    this.postAjax(this.getParent().formAction+'ajaxclass',{
                        v:v.id,
                        type: 'del_zc'
                    }).then(msg=>{
                         this.lists.splice(index,1);
                    });
                });
            },
            canChldrenShow(v,add) {
                if (this.getParent().classChildrenHidden) {
                    return false;
                }
                if(this.lev >= this.getParent().addLev -1 ){

                       return false;
                }
                if(!add){

                    if (!v.children || v.children.length == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
                return true;

            },
            showDown(v, show,parent) {
                console.log(show)
                console.log(parent);
                v.forEach(children => {
                    children.show = show;
                    children.show = show;
                    // if (children.children) {
                    //     this.showDown(children.children);
                    // }
                })

            }
        },
        props: ['lists', 'fields', 'lev', 'width', 'classChildrenHidden', 'parent','formAction'],
        date() {
            return {
                item: {}
            }
        }
    }
</script>

<style>
	.xiaozhu-lists hover{
		cursor:pointer
	}
</style>
