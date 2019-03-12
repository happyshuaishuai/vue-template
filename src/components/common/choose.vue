/*
|--------------------------------------------------------------------------
| 组件  菜品选择   </component>
|--------------------------------------------------------------------------
|
| author：薛帅
| data： 
| DOTO:  
|
*/
<template>
<div>
    <addDishesPerson 
        :dishesArr="sele_data" 
        v-if="openChoose" 
        @cancelPop="closeDishesPopHandle"
         >
    </addDishesPerson>
</div>
    
    
</template>

<script>
import addDishesPerson from '../common/addDishes.vue' // 引入添加菜品或者人员的公共组件
export default {
  name: "chooseD", //弹窗
  data() {
    return {
        sele_data:[],
    };
  },
  mounted() {
      
  },
  components:{addDishesPerson},
  
  props: {
    chooseData: {
      type: Array,
      default: []
    },
    openChoose:{
        type:Boolean,
        default : false,
    },
  },
 watch:{
    openChoose(value1,value2){
        this.sele_data = this.chooseData;
    }
   },
  methods: {
    updateChoose__(methodsType,methodsData) {
        this.sele_data.splice(methodsData.index,1)
        this.$emit("updateChoose", this.sele_data);
    },
    closeOpenChoose_(){
        this.$emit("closeOpenChoose", false);
    },
    addDishesPerson_(){
        this.dialogSelectDishesVisible = true;
        this.sele_data = this.chooseData;
    },
     // 关闭选择菜品弹框
    closeDishesPopHandle(data){
        // this.dialogSelectDishesVisible = false;
         this.$emit("closeOpenChoose", false);
        if(data){
            // var obj={};  
            // obj=JSON.parse(JSON.stringify(data)); //this.templateData是父组件传递的对象  
            this.sele_data = data;
            this.$emit("updateChoose", data);
            // this.$emit("updateChoose", this.chooseData);
        }
    },
  }
};
</script>
<style lang="less" scoped>
.yuan{
    width: 110px;
    display: inline-block;
    height: 110px;
    border: 1px solid rgba(0,0,0,.1);;
    border-radius: 50%;
    text-align: center;
    margin: 0 30px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
    margin-top: 14px;
    padding: 0 10px;
}
.iii{
    position: relative;
    left: 2vw;
    font-size: 16px;
    color: red;
    font-weight: bolder;
    cursor: pointer;
    border: 1px solid;
    border-radius: 50%;
    background: #fafafa;
}
.all-bar-box{
    margin-top: -40px;
}
.set22{
    margin-top: -40px;
}
.add{
    color: #409EFF;
}
.addBtn{
    cursor: pointer;
    height:40px;
    margin-top: 35px;
}
.addBoxshadow{
    box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 0.4);
    border-color:rgba(64, 158, 255, 0.2) !important;
}
</style>