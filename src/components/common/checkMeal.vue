/*
|--------------------------------------------------------------------------
| 组件 公用添加菜品或者添加人员弹框
|--------------------------------------------------------------------------
|
| author：辜小芸
| data： vuex.userInfo
| DOTO:  备注
|
*/
<template>
    <el-dialog title="选择可选分组" :visible.sync="dialogSelectGroupVisible" @close="closePop">
        <div class="mealPop flex">
            <div class="mealPopLeft flex1">
                <div><el-input v-model="queryCondition.group_name" placeholder="请输入菜品名称或助记码搜索" size="small"></el-input></div>
                <div class="left-main">
                    <el-table ref="multipleTable" :data="groupList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column prop="group_name" label="分组名称" align="center"></el-table-column>
                        <el-table-column prop="dishes_name" label="菜品" align="center"> </el-table-column>
                        <el-table-column prop="rule" label="规则" width="120" show-overflow-tooltip align="center"> </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="mealPopright">
                <div class="dishe-list-box">
                    <div class="title">已选分组（{{checkedListArr.length}}）</div>
                    <div class="dishe-list">
                        <div class="dishe-list-item flex" v-for="item in checkedListArr" :key="item.id">
                            <div class="flex1">{{item.group_name}}</div>
                            <!-- <div class="unit" style="width:2vw">瓶</div>
                            <div class="sell-status" style="width:3vw">在售</div>
                            <div class="price" style="width:4vw">￥200.00</div>-->
                            <div class="iconfont icon-jian del-dishe" @click="delCheckedDataHandle(item.id)"></div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="closePop" size="small">取 消</el-button>
            <el-button type="primary" @click="closePop" size="small">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import Vue from 'vue' // 你的引入描述
    import { allGroupListApi  } from '../../service/commonApi.js'   // api接口
    import {mapState, mapMutations, mapActions} from 'vuex'   // vuex
    // import {saoMaGun} from "../../../../utils/index"    // 公用函数

    export default {
        name: 'customerInfo',
        data() {
            return {
                dialogSelectGroupVisible: true, // 选择菜品弹窗是否显示
                queryCondition:{
                    group_name:''
                },
                groupList:[],
                checkedListArr:[], // 选中的列表
            }
        },
        props:['mealArr'],
        components: {},
        created() {
        },
        computed: {
            ...mapState({
                userInfo: state => state.login.userInfo
            })
        },
        mounted() {
            this.getGroupList();
            this.checkedListArr = JSON.parse(JSON.stringify(this.mealArr));
            console.log(this.groupList,'1231231313')
            // this.$nextTick(()=>{
            //     this.$refs.multipleTable.toggleRowSelection(this.groupList[0],true);
            // })
            
        },
        methods: {
            // ...mapMutatins(['']),
            // ...mapActions(['']),
            
            /**获取分组列表
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getGroupList() {
                let {code, data, error} = await allGroupListApi(this.queryCondition);
                if (code == 200) {
                    this.groupList = data;                 
                    setTimeout(() => {
                        this.groupList.forEach(item => {
                            this.mealArr.forEach(item1 => {
                                if(item.id==item1.id){
                                    this.$refs.multipleTable.toggleRowSelection(item, true)
                                }
                            })
                        })
                    }, 500)                    
                }
            },
            handleSelectionChange(val){
                this.checkedListArr = val;
            },
            delCheckedDataHandle(id){
                this.checkedListArr.forEach((item,index)=>{
                    if(item.id == id){
                        this.checkedListArr.splice(index,1);
                    }
                })
            },
            closePop(){
                this.dialogSelectGroupVisible = false;
                this.$emit('cancelPop',this.checkedListArr)
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../globalCss/var.less';
    @import "../../globalCss/commonStyle.less";
    // @import "style.less";
</style>