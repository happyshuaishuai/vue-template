/*
|--------------------------------------------------------------------------
| 组件 公用 添加套餐
|--------------------------------------------------------------------------
|
| author：薛帅
| data： vuex.userInfo
| DOTO:  备注
|
*/
<template>
    <el-dialog title="选择套餐" :visible.sync="dialogSelectDishesVisible" @close="cancelDialog">
        <div class="mealPop flex">
            <div class="mealPopLeft flex1">
                <div><el-input v-model="keyword" placeholder="请输入套餐名称搜索" size="small"></el-input></div>
                <div class="flex left-main">
                    <div class="flex1">
                        <div class="dishe-list-box">
                            <div class="all-col">
                                <el-checkbox v-model="checkAll" :checked="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            </div>
                            <div class="dishe-list">
                                <div v-if="!responseList.length>0" style="text-align:center;color:#bbb;">请选择分类</div>
                                    <div class="dishe-list-item flex" v-for="(item,index) in responseList" :key="index">
                                        <div>
                                            <el-checkbox :checked="item.check" v-model="item.check" style="width:1vw" @change="handleCheckedCitiesChange(item)"></el-checkbox>
                                        </div>
                                        <div class="flex1">{{item.combo_name}}</div>
                                        <!-- <div class="unit" style="width:2vw">{{item.combo_number}}</div> -->
                                        <div class="sell-status" style="width:2vw">{{['停售','在售'][Number(item.sale_status)]}}</div>
                                        <div class="price" style="width:4vw">￥{{item.combo_price}}</div>
                                    </div>
                            </div>
                        </div>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="queryCondition.page"
                            :page-sizes="[10, 20, 50]"
                            :page-size="queryCondition.per_page"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryCondition.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="mealPopright">
                <div class="dishe-list-box">
                    <div class="title">已选套餐（{{checkedListArr.length}}）</div>
                    <div class="dishe-list">
                        <div v-if="!checkedListArr.length>0" style="text-align:center;color:#bbb;">暂未选择套餐</div>
                        <div class="dishe-list-item flex" v-for="(item,index) in checkedListArr" :key="index">
                            <div class="flex1">{{item.combo_name}}</div>
                            <!-- <div class="unit" style="width:2vw">{{item.combo_number}}</div> -->
                            <div class="sell-status" style="width:2vw">{{['停售','在售'][Number(item.sale_status)]}}</div>
                            <div class="price" style="width:4vw">￥{{item.combo_price}}</div>
                            <div class="iconfont icon-jian del-dishe" @click="removeHandle(index)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="cancelDialog" size="small">取 消</el-button>
            <el-button type="primary" @click="closePop" size="small">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import Vue from 'vue' // 你的引入描述
    import {  getDishesCategorytApi,getCategoryDishesApi,departmentListApi,getKeywordStaffApi } from '../../service/commonApi.js'   // api接口
    import {getComboList,editCombo} from '../../service/ipad/index.js'
    import {mapState, mapMutations, mapActions} from 'vuex'   // vuex
    // import {saoMaGun} from "../../../../utils/index"    // 公用函数

    export default {
        name: 'customerInfo',
        data() {
            return {
                dialogSelectDishesVisible: true, // 选择菜品弹窗是否显示
                keyword:'', // 菜品助记码
                queryCondition:{},
                typeData:[],
                props:{
                    children: 'children',
                    label: 'dishes_category_name'
                },
                isIndeterminate: false,
                checkAll: false,
                responseList:[], // 获取的列表
                checkedListArr:[], // 选中的列表
                queryCondition:{
                    per_page:10,
                    page:1,
                    total:0
                },
            }
        },
        components: {},
        props:['dishesArr'],
        created() {
        },
        computed: {
            ...mapState({
                userInfo: state => state.login.userInfo
            })
        },
        mounted() {
            this.getCategoryDishes();
            this.dishesArr.forEach((item,index)=>{
                item.check = true;
            })
            this.checkedListArr = JSON.parse(JSON.stringify(this.dishesArr));   
        },
        methods: {
             /**获取基础信息
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getDishesCategoryt() {
                let {code, data, message} = await getComboList();
                if (code == 200) {
                    this.getCustomerTotalData = data;
                    
                }
            },

            /**获取基础信息
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async editCombo_(item) {
                let param={
                    id:item.id
                };
                let {code, data, message} = await editCombo(param);
                if (code == 200) {
                    item.dishes_detail = data.dishes_detail;
                }
            },

           

            /**点击左边分类时的操作
             * @param 无
             * returns 返回值的类型 {obj}
             */
            nodeClickHandle(data){
                this.getCategoryDishes(data.id);
            },

            /**获取分类下的所有菜品
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getCategoryDishes(id) {
                let {code, data, error} = await getComboList({id:id,name:this.keyword,page:this.queryCondition.page,per_page:this.queryCondition.per_page});
                if (code == 200) {
                    data.data.forEach((item)=>{
                        item.beizhu ='字数限制20个字符';
                    })
                   this.responseList = data.data;
                   this.queryCondition.total =data.toal;
                   this.responseList.forEach((item)=>{
                        this.editCombo_(item);
                    });
                }
            },
            // 全选
            handleCheckAllChange(value){
                this.responseList.forEach((item,index)=>{
                    if(value){
                        let status = false;
                        this.checkedListArr.forEach((item1,index1)=>{
                            if(item.dishes_id == item1.dishes_id && item.specification_id == item1.specification_id){
                                status = true;
                            }
                        })
                        if(!status){
                            this.checkedListArr.push(item);
                        }   
                        item.check = true;
                    }else{
                        this.checkedListArr.forEach((item1,index1)=>{
                            if(item.dishes_id == item1.dishes_id && item.specification_id == item1.specification_id){
                                this.checkedListArr.splice(index1,1);
                            }
                        })
                        item.check = false;
                    } 
                })
                
                this.checkAll = value;
            },
            // 单选
            handleCheckedCitiesChange(data){
                if(data.check) {
                        this.checkedListArr.push(data);
                }else{
                    this.checkedListArr.forEach((item, index) => {
                        if(data.dishes_id == item.dishes_id && data.specification_id == item.specification_id) {
                            this.checkedListArr.splice(index, 1);
                            return;
                        }
                    }) 
                }
                let isAllCheckStatus = true,
                    i=0;
                this.responseList.forEach((item,index)=>{
                    if(!item.check){
                        isAllCheckStatus = false;
                    }else{
                        i++;
                    }
                    
                })
                this.checkAll = isAllCheckStatus;
                this.isIndeterminate = i>0 && i<this.responseList.length;
            },
            /**移除选择的菜品
             * @param 无
             * returns 返回值的类型 {obj}
             */
            removeHandle(i){
                console.log(i)
                this.responseList.forEach((item,index)=>{
                    if(item.dishes_id == this.checkedListArr[i].dishes_id && item.specification_id == this.checkedListArr[i].specification_id){
                        item.check = false;
                    }
                })
                this.checkedListArr.splice(i,1);
            },
            /**关闭弹框
             * @param 无
             * returns 返回值的类型 {obj}
             */
            closePop(){
                this.dialogSelectDishesVisible = false;
                let param = JSON.parse(JSON.stringify(this.checkedListArr));
                param.forEach((item,index)=>{
                    delete item.check;
                })
                this.$emit('cancelPop2',param)
            },
            /**取消弹框
             * @param 无
             * returns 返回值的类型 {obj}
             */
            cancelDialog(){
                this.dialogSelectDishesVisible = false;
                this.$emit('cancelPop2');
            },
            handleSizeChange(val){
                this.queryCondition.per_page =val;
            },
            handleCurrentChange(val){
                this.queryCondition.page =val;
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../globalCss/var.less';
    @import "../../globalCss/commonStyle.less";
    // @import "style.less";
</style>