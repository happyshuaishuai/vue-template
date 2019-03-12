/*
|--------------------------------------------------------------------------
| 组件  生效时间   </component>
|--------------------------------------------------------------------------
|
| author：薛帅
| data： 
| DOTO:  
|
*/
<template>
    <div class="sell-time-item" style="background-color: #fafafa;">
        <div>
            <el-form-item label="活动时间：" required>
                <el-col :span="6">
                    <el-form-item prop="effectiveData.date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="effectiveData.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                <el-col :span="6">
                    <el-form-item prop="effectiveData.date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="effectiveData.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="星期：" prop="effectiveData.type">
                <el-checkbox-group v-model="effectiveData.type">
                <el-checkbox label="星期一" name="type"></el-checkbox>
                <el-checkbox label="星期二" name="type"></el-checkbox>
                <el-checkbox label="星期三" name="type"></el-checkbox>
                <el-checkbox label="星期四" name="type"></el-checkbox>
                <el-checkbox label="星期五" name="type"></el-checkbox>
                <el-checkbox label="星期六" name="type"></el-checkbox>
                <el-checkbox label="星期日" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="时间范围：" required>
                <el-col :span="6">
                    <el-form-item prop="effectiveData.date2">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="effectiveData.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2" style="text-align:center;">至</el-col>
                <el-col :span="6">
                    <el-form-item prop="effectiveData.date2">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="effectiveData.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </div>
    </div>
</template>

<script>
import addDishesPerson from '../common/addDishes.vue' // 引入添加菜品或者人员的公共组件
export default {
  name: "effectiveTime", //弹窗
  data() {
    return {
        dialogSelectDishesVisible:false,
    };
  },
  mounted() {},
  components:{addDishesPerson},
  props: {
    effectiveData: {
      type: Object,
      default: {}
    },
  },
  methods: {
    updateChoose(methodsType,methodsData) {
        this.$emit("updateChoose", methodsType,methodsData);
    },
    addDishesPerson_(){
        this.dialogSelectDishesVisible = true;
    },
    closeDishesPopHandle(data){
        this.dialogSelectDishesVisible = data;
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
    font-size: 2vw;
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