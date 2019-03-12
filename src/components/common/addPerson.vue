/*
|--------------------------------------------------------------------------
| 组件 公用添加人员弹框
|--------------------------------------------------------------------------
|
| author：辜小芸
| data： vuex.userInfo
| DOTO:  备注
|
*/
<template>
    <el-dialog title="选择员工" :visible.sync="dialogSelectDishesVisible" @close="cancelDialog" append-to-body>
        <div class="mealPop flex">
            <div class="mealPopLeft flex1">
                <div class="flex">
                    <!-- <div><el-input v-model="keyword" placeholder="请输入姓名" size="small"></el-input></div> -->
                    <div class="flex1"><el-input v-model="keyword" placeholder="请输入姓名" size="small" @keyup.enter.native="onkeydown" @input="changeHandle(keyword)"></el-input></div>
                    <div v-if="keyword" style="width:30px;margin-left:15px;"><el-button @click="keyword='';changeHandle()" type="text" size="small">取 消</el-button></div>
                </div>
                <div class="flex left-main">
                    <div class="type-dishe" v-if="!keyword">
                        <div class="title">部门名称</div>
                        <div class="type-box">
                            <el-tree
                                :data="typeData"
                                node-key="id"
                                :default-expanded-keys="[activeTypeId]"
                                :default-checked-keys="[activeTypeId]"
                                :props="props"
                                :highlight-current="true"
                                @node-click="nodeClickHandle">
                            </el-tree>
                        </div>
                    </div>
                    <div class="flex1 left-dishe-list">
                        <div class="dishe-list-box">
                            <div class="all-col">
                                <el-checkbox v-model="checkAll" :disabled="responseList.length<=0" :checked="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            </div>
                            <div class="dishe-list">
                                <div v-if="!responseList.length>0" style="text-align:center;color:#bbb;">请选择部门</div>
                                    <div class="dishe-list-item flex" v-for="(item,index) in responseList" :key="index">
                                        <div>
                                            <el-checkbox :checked="item.check" v-model="item.check" style="width:1vw" @change="handleCheckedCitiesChange(item)"></el-checkbox>
                                        </div>
                                        <div class="flex1">{{item.staff_name}}</div>
                                        <div class="flex1">{{item.staff_phone}}</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mealPopright">
                <div class="dishe-list-box">
                    <div class="title">已选员工（{{checkedListArr.length}}）</div>
                    <div class="dishe-list">
                        <div v-if="!checkedListArr.length>0" style="text-align:center;color:#bbb;">暂未选择员工</div>
                        <div class="dishe-list-item flex" v-for="(item,index) in checkedListArr" :key="index">
                            <div class="flex1">{{item.staff_name}}</div>
                            <div class="flex1">{{item.staff_phone}}</div>
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
    import { departmentListApi,getKeywordStaffApi } from '../../service/commonApi.js'   // api接口
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
                props:{
                    children: '_child',
                    label: 'name'
                },
                isIndeterminate: false,
                checkAll: false,
                responseList:[], // 获取的列表
                checkedListArr:[], // 选中的列表

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
            this.getDepartmentList();
            this.dishesArr.forEach((item,index)=>{
                item.check = true;
            })
            this.checkedListArr = JSON.parse(JSON.stringify(this.dishesArr)); 
        },
        methods: {
            // ...mapMutations(['']),
            // ...mapActions(['']),           
            /**获取所有员工分类
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getDepartmentList() {
                let {code, data, error} = await departmentListApi();
                if (code == 200) {
                    this.typeData = data;
                    
                }
            },
            /**点击左边分类时的操作
             * @param 无
             * returns 返回值的类型 {obj}
             */
            nodeClickHandle(data){  
                this.activeTypeId = data.id;          
                this.getPerson(data.id);
            },
            /**根据分类ID获取人员
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getPerson(id){
                let {code, data, error} = await getKeywordStaffApi({id:id,keyword:this.keyword});
                if(code == 200){
                    let isAllCheckStatus = true,
                    i=0;
                    data.forEach((item,index)=>{
                        let status = false;
                        this.checkedListArr.forEach((item1,index1)=>{
                            if(item.staff_id == item1.staff_id){
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
            /**输入关键字后加车
             * @param 无
             * returns 返回值的类型 {obj}
             */
            onkeydown(event){
                if(event.keyCode==13){
                    this.getPerson();
                }
            },
            /**输入关键字后立即执行
             * @param 无
             * returns 返回值的类型 {obj}
             */
            changeHandle(){
                if(this.keyword){
                    this.getPerson();
                }else{
                    this.getPerson(this.activeTypeId);
                }
            },
            // 全选
            handleCheckAllChange(value){
                this.responseList.forEach((item,index)=>{
                    if(value){
                        let status = false;
                        this.checkedListArr.forEach((item1,index1)=>{
                            if(item.staff_id == item1.staff_id){
                                status = true;
                            }
                        })
                        if(!status){
                            this.checkedListArr.push(item);
                        }   
                        item.check = true;
                    }else{
                        this.checkedListArr.forEach((item1,index1)=>{
                            if(item.staff_id == item1.staff_id){
                                this.checkedListArr.splice(index1,1);
                            }
                        })
                        item.check = false;
                    } 
                })
                
                this.checkAll = value;
                // this.isIndeterminate = !value;
            },
            // 单选
            handleCheckedCitiesChange(data){
                if(data.check) {
                        this.checkedListArr.push(data);
                }else{
                    this.checkedListArr.forEach((item, index) => {
                        if(data.staff_id == item.staff_id) {
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
                    if(item.staff_id == this.checkedListArr[i].staff_id){
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
                this.$emit('cancelPop')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../globalCss/var.less';
    @import "../../globalCss/commonStyle.less";
    // @import "style.less";
    .el-tree-node__content{
        height: 34px;
    }
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        background-color: red
    }
</style>