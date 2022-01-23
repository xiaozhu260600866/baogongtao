<template>
  <div>
    <div v-if="lev == 0 && !auth" :class="['flex-middle dx-item',getTreeAct() == -1 ? 'liAct':'']" @click="$emit('callBack',{id:-1})">
      <div class="w-b80 flex-middle pl30" @click="act({id:-1})">
        <div :class="['fs-12 node-deptTree pl10',getTreeAct() == -1 ? 'liAct':'']" style="height: 20px;"><i class="iconfont icon-user pr5" />全部</div>
      </div>
      <!---->
    </div>
    <ul>
      <li v-for="(v,key) in data" v-if="show">
        <div :class="['flex-middle dx-item',getTreeAct() == v.id ? 'liAct':'']">
          <div class="w-b80 flex-middle pl15" @click="act(v)">
            <div @click="toggle(v)">
              <span v-for="i in lev" v-if="lev>0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <i v-if="v.children" :class="['dx-icon node-deptTree fs-12 fw-bold', v.open ? 'el-icon-minus':'el-icon-plus' ]" />
              <span v-else class="dx-icon" style="margin-right: 14px" />
            </div>
            <div :class="['fs-12 node-deptTree pl10',getTreeAct() == v.id ? 'liAct':'']" style="height:20px;width:100%" @click="dxClick(v)"><i class="iconfont icon-user pr5" />{{ v.name }} </div>
          </div>
          <div v-if="auth==1" class="w-b30 auth">
            <button class="dx-btn dx-btn-sm dx-btn-blue" @click="$refs.createEditClass.ajax(v,formAction,'add')" @callBack="callBack">新建下级</button>
            <button class="dx-btn dx-btn-sm dx-btn-blue" @click="$refs.createEditClass.ajax(v,formAction,'edit')" @callBack="callBack">修改</button>
            <button class="dx-btn dx-btn-sm dx-btn-blue" @click="del(v,key,formAction)" @callBack="callBack">删除</button>
          </div>
        </div>
        <treeLi2 v-if="v.children" :data="v.children" :lev="getLev(v)" :show="v.open" :form-action="formAction" :auth="auth" @callBack="dxClick" />
      </li>
    </ul>
    <div v-if="auth && auth == 2 && lev==0" class="mt20 w-b100 flex-center" @click="dxClick('')">
      <button class="dx-btn dx-btn-blue w-b20 text-center">确定</button>
    </div>
    <createEditClass ref="createEditClass" @callBack="callBack" />
  </div>
</template>
<style type="text/css" scoped="">
.node-deptTree {
    color: #2f4056;
    font-weight: 500;
}

.dx-item {
    height: 39px;
    border: 1px solid #ddd;
    cursor: pointer;
}

.dx-item .auth {
    display: none
}

.dx-item:hover .auth {
    display: block;
}

.addClass {
    height: 60px
}

.dx-icon {
    margin-right: 1px;

}

.liAct {
    color: #FFFFFF !important;
    background-color: #009688 !important;
}

</style>
<script type="text/javascript">
import createEditClass from './create_edit_class'
export default {
    name: 'TreeLi2',
    components: {
        createEditClass
    },
    props: ['data', 'lev', 'show', 'formAction', 'auth'],
    data() {
        return {
            actIndex: -1
        }
    },
    mounted() {
        sessionStorage.setItem('treeAct', -1)
        $('.dx-item').hover(function() {
            $(this).addClass('bg-e')
        }, function() {
            $(this).removeClass('bg-e')
        })
    },
    methods: {
        act(v) {
            sessionStorage.setItem('treeAct', v.id)
        },
        getTreeAct() {
            return sessionStorage.getItem('treeAct')
        },
        dxClick(v) {
            if (this.auth == 2 && !v) {
                this.getParent().treeLiCallBack()
                 return false
            }
            if (this.auth == 2) {
                this.getParent().selectVal = v
            }
            this.$emit('callBack', v)
        },
        getParent() {
            let parent = this.$parent
            while (parent) {
                if (parent.$options._componentTag != 'my-class') {
                    parent = parent.$parent
                } else {
                    return parent
                    break
                }
            }
        },
        del(v, key, formAction) {
            if (!confirm('确认要删除吗？')) {
                return false
            } else {
                var url = this.formAction + 'ajaxclass'
                this.postAjax(url, { v: v.id, type: 'del_fc' }, msg => {
                    if (msg.data.status == 2) {
                        this.getParent().ajax()
                    }
                })
            }
        },
        callBack(v) {
            this.getParent().ajax()
        },
        toggle(v) {
            if (v.children) {
                this.$set(v, 'open', !v.open)
            }
        },
        getLev(v) {
            var lev = parseInt(this.lev)
            if (v && v.children) {
                lev++
            } else {
                lev = 0
            }
            console.log(lev)
            return lev
        }

    }
}

</script>
