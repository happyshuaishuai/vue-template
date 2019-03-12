/*
|--------------------------------------------------------------------------
| 组件  xxx   path：/home/customerInfo
|--------------------------------------------------------------------------
|
| author：
| data： 
| DOTO:  
|
*/
<template>
    <div class="customer">
        <div class="customer-content">

            <!--头部-->
            <div class="head-box">
                <span class="text">模块名字</span>
            </div>

          
        </div>
    </div>
</template>

<script>
    import Vue from 'vue' // 你的引入描述
    // import {   } from '../../../../service/xxx/index'   // api接口
    import {mapState, mapMutations, mapActions} from 'vuex'   // vuex
    // import {saoMaGun} from "../../../../utils/index"    // 公用函数

    export default {
        name: 'customerInfo',
        data() {
            return {
            }
        },
        components: {},
        created() {
        },
        computed: {
            ...mapState({
                userInfo: state => state.login.userInfo
            })
        },
        mounted() {
        },
        methods: {
            // ...mapMutations(['']),
            // ...mapActions(['']),

            /**获取基础信息
             * @param 无
             * returns 返回值的类型 {obj}
             */
            async getXXX() {
                // let {code, data, message} = await xxx();
                // if (code == 200) {
                //     this.getCustomerTotalData = data;
                // }
            },


            /**
             * 页面跳转
             */
            togo(path, data) {
                // this.$router.push({name: path});
            }

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../globalCss/var.less';
    @import "style.less";
</style>
  