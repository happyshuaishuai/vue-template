/*
|
|--------------------------------------------------------------------------
| 组件 公用头部
|--------------------------------------------------------------------------
|
| author：薛帅
| data： treemenudata.
| DOTO:  无限分机菜单
*/

<template>
    <li >
        <div @click.stop="clickMenu(treemenudata)" @click="nostopClick(treemenudata)" :class="{'selected': selectedId == treemenudata.BMBM}" v-if="treemenudata._child">
            <el-submenu 
                :index="setIndex" >
                        <span slot="title" :class="{'selected': selectedId == treemenudata.BMBM,'buleColor':setIndex == initSele}">
                                {{treemenudata.BMMC}}
                            </span>
                        <treemenu v-for="(_item , index) in treemenudata._child" 
                            :treemenudata="_item" 
                            v-if="treemenudata._child"
                            :selectedId.sync="selectedId"
                            @seleTreemenus = "seleTreemenu"
                            :initSele="initSele"
                            :setIndex="renderIndex(index)">
                      </treemenu>
                      <el-menu-item 
                        v-show="false"
                        :index="setIndex" >  </el-menu-item>
            </el-submenu>
        </div>
        <div  @click.stop="clickMenuItem(treemenudata)"  v-if="!treemenudata._child" 
       >
            <el-menu-item 
             :class="{'noselected':selectedId != treemenudata.BMBM,'sss':selectedId == treemenudata.BMBM }"
             :index="setIndex" >
            {{treemenudata.BMMC}} 
        </el-menu-item>
        </div>
    </li>
        
</template>

<script>
import treemenu from "../common/treemenu"
 import store from 'vuex';
export default {
  
    name:"treemenu",
    
     components: {
        treemenu
     },

     computed:{
        sele(){
            return this.store.treeMenu.state.selectedId;
        }
     },
      mounted() {
        //   this.selectedId_ = this.selectedId;
      },
      props: {
            treemenudata: {
                type: Object,
                default: {},
            },
            setIndex:{
                type: String,
                default: "1-1",
            },
            selectedId:{
                type: String,
                default: "No Sele",
            },
            initSele:{
                 type: String,
                default: "1",
            }
        },
     data() {
        return {
           selectedId_:'123',
           initS:true,
        }
     },
     methods:{
        //  菜单index
         renderIndex(index){
             return this.setIndex +'-'+(index+1);
         },
          //  菜单index
         setIndexFN(){
             return this.setIndex;
         },
        
        // 点击有子级的菜单事件
          clickMenu(data){
             //this.selectedId_ = data.BMBM;
                this.seleTreemenu(data.BMBM);
               
                this.$router.push({
                    name: "personManage",
                    params: { FLAG: data.FLAG, BMBM: data.BMBM }
                });
                 sessionStorage.setItem("openIndex", this.setIndexFN());
         },

         //包含未展开操作的点击，
         nostopClick(data){
              this.seleTreemenu(data.BMBM);
         },
        // 点击没有子级的菜单事件
         clickMenuItem(data){
              this.initS = false;
            this.seleTreemenu("No Sele")
             this.$router.push({
                name: "personManage",
                params: { FLAG: data.FLAG, BMBM: data.BMBM }
             });
             sessionStorage.setItem("openIndex", this.setIndexFN());
         },

        // 通讯与父组件
        seleTreemenu(data){
             console.log(data,"child_send_value")
             this.$emit('seleTreemenus',data);
        },

     },
}

</script>

<style lang="less">
.selected{
    color: #409EFF !important;
    background: aliceblue !important;
}
.noselected{
    .is-active{
         color: #303133 ;
    }
    color: #303133 ;
}
.sss{
     color: #409EFF ;
       .is-active{
         color: #409EFF;
    }
}
.buleColor{
         color: #409EFF !important;
}
</style>
