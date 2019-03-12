/* |-------------------------------------------------------------------------- | 权限弹窗组件 |--------------------------------------------------------------------------
| | 彭浩 | how it works：

<template>

<el-dialog title="所属部门" :visible.sync="dialogTableVisible">
  <el-table :data="departmentList" border> 
    <el-table-column property="departmentName" label="部门全称"></el-table-column>
    <el-table-column property="post" label="岗位名称" width="200"></el-table-column>
    <el-table-column property="role" label="角色" v-if="roleShowState"></el-table-column>
  </el-table>
   <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">关闭</el-button>
  </div>
</el-dialog>
</template>

<script>
    export default {
        name: "popup", //弹窗
        data() {
            return {
                // departmentList: []  //弹窗列表数据
                // roleShowState: true,
            }
        },
        mounted() {
        },
        props: {
            departmentList: {
                type: Array,
                default: [],
            },
            roleShowState: {
                type: Boolean,
                default: true,
            },
            dialogTableVisible:{
                type: Boolean,
                default: false,
            }
        },
        methods: {
            closeDialog(){
                  this.$emit('closePopup',false);
            },
        }
    }

</script>
<style lang="less" scoped>
    /*弹窗*/

    .maskAdmin {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 2000;
        .maskAdmin-alert {
            /*// padding: 30px 50px 30px 42px;*/
            background-color: #fff;
            border-radius: 5px;
            position: absolute;
            top: 15%;
            left: 25.7%;
            color: #858585;
            .maskAdmin-alert-main {
                min-width: 800px;
                max-width: 950px;
                padding: 0 30px 0 30px;
                border-radius: 5px;
                height: 450px;
                div:nth-child(1) {
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-between;
                    p:nth-child(1) {
                        color: #000;
                        font-size: 20px;
                        margin-left: 40px;
                    }
                    /*p:nth-child(2) {
                        cursor: pointer;
                    }*/
                }
                ul:nth-child(2) {
                    margin-top: 50px;
                    padding: 0;
                    min-height: 280px;
                    li {
                        display: flex;
                    }
                    .maskAdmin-alert-main-title {
                        p:nth-child(1) {
                            width: 640px;
                            text-align: center;
                            /*margin-left: 106px;*/
                        }
                        p:nth-child(2) {
                            width: 160px;
                            text-align: center;
                        }
                        p:nth-child(3) {
                            width: 140px;
                            text-align: center;
                        }
                    }
                    .maskAdmin-alert-main-list {
                        height: 70px;
                        line-height: 70px;
                        border-bottom: 1px solid #cecece;
                        p:nth-child(1) {
                            text-align: center;
                            width: 640px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        p:nth-child(2) {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            /*margin-left: 21px;*/
                            width: 160px;
                            text-align: center;
                        }
                        p:nth-child(3) {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 140px;
                            text-align: center;
                        }
                    }
                }
                div:nth-child(3) {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                }
            }
        }
    }
</style>