/*
|--------------------------------------------------------------------------
| 组件 公用添加菜品员弹框
|--------------------------------------------------------------------------
|
| author：辜小芸
| data： vuex.userInfo
| DOTO:  备注
|
*/
<template>
    <el-dialog title="选择菜品" :visible.sync="dialogSelectDishesVisible" @close="cancelDialog" append-to-body>
        <div class="mealPop flex">
            <div class="mealPopLeft flex1">
                <div class="flex">
                    <div class="flex1"><el-input v-model="keyword" placeholder="请输入菜品名称或助记码搜索" size="small" @keyup.enter.native="onkeydown" @input="changeHandle(keyword)"></el-input></div>
                    <div v-if="keyword" style="width:30px;margin-left:15px;"><el-button @click="keyword='';changeHandle()" type="text" size="small">取 消</el-button></div>
                </div>
                <div class="flex left-main">
                    <div class="type-dishe" v-if="!keyword">
                        <div class="title">消费类型</div>
                        <div class="type-box">
                            <div :class="item.id==activeTypeId?'type-item active':'type-item'" @click="nodeClickHandle(item.id)" v-for="item in typeData" :key="item.id">{{item.dishes_category_name}}</div>
                            <!-- <el-tree
                                :data="typeData"
                                node-key="id"
                                :props="props"
                                :highlight-current="true"
                                @node-click="nodeClickHandle">
                            </el-tree> -->
                        </div>
                    </div>
                    <div class="flex1 left-dishe-list">
                        <div class="dishe-list-box">
                            <div class="all-col">
                                <el-checkbox v-model="checkAll" :disabled="responseList.length<=0" :checked="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            </div>
                            <div class="dishe-list">
                                <div v-if="!responseList.length>0" style="text-align:center;color:#bbb;">请选择分类</div>
                                    <div class="dishe-list-item flex" v-for="(item,index) in responseList" :key="index">
                                        <div>
                                            <el-checkbox :checked="item.check" v-model="item.check" style="width:1vw" @change="handleCheckedCitiesChange(item)"></el-checkbox>
                                        </div>
                                        <div class="flex1">{{item.dishes_name}}</div>
                                        <div class="unit" style="width:3vw;padding:0 5px;">{{item.dishes_specification}}</div>
                                        <div class="sell-status" style="width:2vw">{{['停售','在售'][Number(item.sale_status)]}}</div>
                                        <div class="price" style="width:4vw">￥{{item.dishes_price}}</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mealPopright">
                <div class="dishe-list-box">
                    <div class="title">已选菜品（{{checkedListArr.length}}）</div>
                    <div class="dishe-list">
                        <div v-if="!checkedListArr.length>0" style="text-align:center;color:#bbb;">暂未选择菜品</div>
                        <div class="dishe-list-item flex" v-for="(item,index) in checkedListArr" :key="index">
                            <div class="flex1">{{item.dishes_name}}</div>
                            <div class="unit" style="width:3vw;padding:0 5px;">{{item.dishes_specification}}</div>
                            <div class="sell-status" style="width:2vw">{{['停售','在售'][Number(item.sale_status)]}}</div>
                            <div class="price" style="width:4vw">￥{{item.dishes_price}}</div>
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
    import {  getDishesCategorytApi,getCategoryDishesApi,departmentListApi,getKeywordStaffApi,getCategoryComboApi } from '../../service/commonApi.js'   // api接口
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
                activeTypeId:'',
                isIndeterminate: false,
                checkAll: false,
                responseList:[], // 获取的列表
                checkedListArr:[], // 选中的列表
            }
        },
        components: {},
        props:['dishesArr','source'],
        created() {
        },
        computed: {
            ...mapState({
                userInfo: state => state.login.userInfo
            })
        },
        mounted() {
            console.log(this.source,'source')
            this.getDishesCategoryt();
            if(this.source == 'performance'){
                this.typeData.push({
                    id:'-1',
                    dishes_category_name: "套餐"
                })
                this.getCombo();
            }
            this.dishesArr.forEach((item,index)=>{
                item.check = true;
            })
            this.checkedListArr = JSON.parse(JSON.stringify(this.dishesArr));   
        },
        methods: {
            // ...mapMutations(['']),
            // ...mapActions(['']),    
            /**获取套餐
             * @param 无
             * returns 返回值的类型 {obj}
             */     
            async getCombo(){
                let {code,data,error} = await getCategoryComboApi({id:'-1'});
                let isAllCheckStatus = true,
                    i=0;
                    data.forEach((item,index)=>{
                        let status = false;
                        this.checkedListArr.forEach((item1,index1)=>{
                            if(item.dishes_id == item1.dishes_id){
                                item.check = true;
                                status = true;
                            }
                        })
                        if(!status){
                            item.check = false;
                            isAllCheckStatus = false;
                        }else{
                            i++;
                        }
                    })
                    if(data.length==0){
                        isAllCheckStatus = false;
                    }
                    this.responseList = data;
                    this.checkAll = isAllCheckStatus;
                    this.isIndeterminate = i>0 && i<this.responseList.length;
            }, 
            /**获取所有菜品分类
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getDishesCategoryt() {
                let {code, data, error} = await getDishesCategorytApi();
                if (code == 200) {
                    this.activeTypeId = data[0].id;
                    this.nodeClickHandle(data[0].id);
                    this.typeData = data;
                    if(this.source == 'performance'){
                        this.typeData.push({
                            id:'-1',
                            dishes_category_name: "套餐"
                        })
                    }
                    
                }
            },
            onkeydown(event){
                if(event.keyCode==13){
                    this.getCategoryDishes();
                }
            },
            changeHandle(){
                if(this.keyword){
                    this.getCategoryDishes();
                }else{
                    this.getCategoryDishes(this.activeTypeId);
                }
            },
            /**点击左边分类时的操作
             * @param 无
             * returns 返回值的类型 {obj}
             */
            nodeClickHandle(id){
                this.activeTypeId = id;
                if(id=='-1'){
                    this.getCombo();
                }else{
                    this.getCategoryDishes(id);
                }
            },

            /**获取分类下的所有菜品
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getCategoryDishes(id) {
                let {code, data, error} = await getCategoryDishesApi({id:id,keyword:this.keyword});
                if (code == 200) {
                    let isAllCheckStatus = true,
                    i=0;
                    data.forEach((item,index)=>{
                        let status = false;
                        this.checkedListArr.forEach((item1,index1)=>{
                            if(item.dishes_id == item1.dishes_id && item.specification_id == item1.specification_id){
                                item.check = true;
                                status = true;
                            }
                        })
                        if(!status){
                            item.check = false;
                            isAllCheckStatus = false;
                        }else{
                            i++;
                        }
                    })
                    if(data.length==0){
                        isAllCheckStatus = false;
                    }
                    this.responseList = data;
                    this.checkAll = isAllCheckStatus;
                    this.isIndeterminate = i>0 && i<this.responseList.length;
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
                this.$emit('cancelPop',param)
            },
            /**取消弹框
             * @param 无
             * returns 返回值的类型 {obj}
             */
            cancelDialog(){
                this.dialogSelectDishesVisible = false;
                this.$emit('cancelPop');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../globalCss/var.less';
    @import "../../globalCss/commonStyle.less";
    // @import "style.less";
</style>