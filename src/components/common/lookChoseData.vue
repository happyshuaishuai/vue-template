/*
|--------------------------------------------------------------------------
| 组件 查看已选菜品
|--------------------------------------------------------------------------
|
| author：辜小芸
| data： vuex.userInfo
| DOTO:  备注
|
*/
<template>
    <el-dialog :title="title" :visible.sync="dialogSelectDishesVisible" @close="cancelDialog">
        <div class="mealPop">
            <div class="info" v-if="type=='0'">
                <span class="text-tip">提成名称：{{choseDishes.info.name}}</span>
                <span class="text-tip">提成方式：{{['百分比','金额'][Number(choseDishes.info.income_type)-1]}}</span>
            </div>
            <div class="info" v-if="type=='1'">
                <span class="text-tip">赠送规则名称：{{choseDishes.info.giving_name}}</span>
                <span class="text-tip">赠送岗位：{{choseDishes.info.post_name}}</span>
            </div>
            <div style="height:20px;"></div>
            <el-table v-if="popType=='dishes'" :data="choseDishes.dishes_detail" border stripe style="width: 100%" height="54vh">
                <el-table-column prop="dishes_name" label="菜品名称" align="center"></el-table-column>
                <el-table-column prop="dishes_specification" label="规格" align="center"></el-table-column>
                <el-table-column prop="dishes_price" label="价格" align="center"></el-table-column>
            </el-table>
            <el-table v-if="popType=='person'"  :data="choseDishes.staff_detail" border stripe style="width: 100%" height="54vh">
                <el-table-column prop="staff_department" label="所在部门" align="center"></el-table-column>
                <el-table-column prop="staff_name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="staff_phone" label="电话" align="center"></el-table-column>
            </el-table>
        </div>
        <!-- <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="cancelDialog" size="small">关 闭</el-button>
        </div> -->
    </el-dialog>
</template>

<script>
    import Vue from 'vue' // 你的引入描述
    import { departmentListApi,getKeywordStaffApi } from '../../service/commonApi.js'   // api接口
    import {mapState, mapMutations, mapActions} from 'vuex'   // vuex
    // import {saoMaGun} from "../../../../utils/index"    // 公用函数

    export default {
        name: 'customerInfo',
        data() {
            return {
                dialogSelectDishesVisible: true, // 选择菜品弹窗是否显示
                title:''
            }
        },
        components: {},
        props:['choseDishes','popType','type'],
        created() {
        },
        computed: {
            ...mapState({
                userInfo: state => state.login.userInfo
            })
        },
        mounted() {
            console.log(this.popType)
            if(this.popType=='dishes'){
                this.title = `已选菜品(${this.choseDishes.dishes_detail.length})`;
            }else if(this.popType=='person'){
                this.title = `已选员工(${this.choseDishes.staff_detail.length})`;
            }
        },
        methods: {
            // ...mapMutations(['']),
            // ...mapActions(['']),           
            /**关闭弹框
             * @param 无
             * returns 返回值的类型 {obj}
             */
            cancelDialog(){
                this.dialogSelectDishesVisible = false;
                this.$emit('closeChoseData')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../globalCss/var.less';
    @import "../../globalCss/commonStyle.less";
    // @import "style.less";
    .info{
        span{
            margin-right: 5vw;
            width: 50%;
            height: 36px;
        }
    }
</style>