<template>
    <div class="demo-box">
        <div class='demo-top-box'>
            <span>预算日期</span>
            <span>2018-5</span>
        </div>
        <div class='demo-top-box'>
            <span>添加项目</span>
            <span></span>
            <div class='select-box'  @click='clickShow()'>
               点击展开/或者点击隐藏
            </div>
           <div class='count-box' v-if='isShow'>
                <div class='count-item' v-for="item in list_end" :key="item.name" @click='selectChange(item)' v-if='item.isShow'>
                    <span>{{item.name}}</span>
                    <span class='change-yes' v-if='item.check'>选中</span>
                </div>
           </div>
        </div>
        <div class='count-box'>
            <div class='count-item'>
                <span>项目</span>
                <span>金额</span>
                <span>备注</span>
            </div>
            <div class='count-item'  v-for="item in list" :key="item.name" v-if='item.isShow'>
                <span>{{item.name}}</span>
                <span>{{item.money}}</span>
                <div class='count-item'  v-for="_item in item.children" :key="_item.name" v-if='_item.isShow'>
                    <span>{{_item.name}}</span>
                    <span>{{_item.money}}</span>
                </div>
            </div>
            <div class='count-item'>
                <span>合计</span>
                <span>{{total}}</span>
            </div>
            <div class='btn'>
                <el-button @click='submit()'>提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'demo',
        data() {
            return {
                isShow: false,//是否显示所有项目数据
                list_end: [//所有最后一级的数据
                    {
                        id: 101,
                        pid: 1,
                        name: '洋酒赠送',
                        money: 100,
                        check: false,//是否选中
                        isShow: true,
                    },
                    {
                        id: 102,
                        pid: 1,
                        name: '红酒赠送',
                        money: 100,
                        check: false,
                        isShow: true,
                    },
                    {
                        id: 103,
                        pid: 1,
                        name: '香槟赠送',
                        money: 100,
                        check: false,
                        isShow: true,
                    },
                    {
                        id: 201,
                        pid: 2,
                        name: '销售部提成',
                        money: 100,
                        check: false,
                        isShow: true,
                    },
                    {
                        id: 202,
                        pid: 2,
                        name: '服务部提成',
                        money: 100,
                        check: false,
                        isShow: true,
                    },
                    {
                        id: 203,
                        pid: 2,
                        name: '其他各部门提成',
                        money: 100,
                        check: false,
                        isShow: true,
                    },
                ],
                list: [//总的添加项目数据
                    {
                        id: 1,
                        name: "赠送成本",
                        money: 0,
                        pid: '',
                        isShow: false,
                        children: [
                            {
                                id: 101,
                                pid: 1,
                                name: '洋酒赠送',
                                money: 100,
                                isShow: false,
                            },
                            {
                                id: 102,
                                pid: 1,
                                name: '红酒赠送',
                                money: 100,
                                isShow: false,
                            },
                            {
                                id: 103,
                                pid: 1,
                                name: '香槟赠送',
                                money: 100,
                                isShow: false,
                            },
                        ]
                    },
                    {
                        id: 2,
                        name: "各部门提成",
                        money: 0,
                        pid: '',
                        isShow: false,
                        children: [
                            {
                                id: 201,
                                pid: 2,
                                name: '销售部提成',
                                money: 100,
                                isShow: false,
                            },
                            {
                                id: 202,
                                pid: 2,
                                name: '服务部提成',
                                money: 100,
                                isShow: false,
                            },
                            {
                                id: 203,
                                pid: 2,
                                name: '其他各部门提成',
                                money: 100,
                                isShow: false,
                            },
                        ]
                    }
                ],
                total: 0,//总金额
                postData: []//提交数据
            }
        },
        mounted() {

        },
        methods: {
             /**
             * 提交数据
             */
            async submit() {
                let _self = this;
                this.list_end.forEach(function(item) {
                    if(item.check) {
                        let obj = {
                            id: item.id,
                            money: item.money
                        }
                        _self.postData[_self.postData.length] = obj;
                    }
                })
                
                //所有的数据 
            },
             /**
             * 点击选择 是否显示 添加项目 的 所有子级数据
             */
            async clickShow () {
                this.isShow = !this.isShow;
                let _self = this;
                this.list_end.forEach(function(item) {
                    if (item.check) {
                        item.isShow = false;
                    }
                })
                
                //计算第一级的钱 和 总金额
                _self.total = 0;
                this.list.forEach(function(element) {
                    element.money = 0;
                    _self.list_end.forEach(function(item) {
                        if (item.check && item.pid == element.id) {
                          element.money = Number(element.money) + item.money;
                         
                        }
                    })
                    _self.total = Number(_self.total) + Number(element.money);
                }, this);
                
            },
             /**
             * 点击选择添加项目的数据
             */
            async selectChange (val) {
                val.check = true;
                let _self = this;
                this.list.forEach(function(element) {
                    let index = 0;
                    _self.list_end.forEach(function(item) {
                        if (item.check && item.pid == element.id) {
                            index++;
                            _self.showList(item,item.id);
                        }
                    })
                    if (index > 0) {
                        element.isShow = true;
                    }
                }, this);
            },
            /**
             * 是否显示某一条数据
             */
            async showList(_item,id) {
                this.list.forEach(function(element) {
                    if (element.children) {
                        element.children.forEach(function(item) {
                            if (item.id == id && !item.isShow) {
                                item.isShow = true;
                            }
                        })
                    }
                }, this);
            }
        }
    }
</script>
<style lang="less" scoped>
    .demo-box {
        width: 500px;
        min-height: 200px;
        background: #ddd;
        padding: 20px;
        .demo-top-box {
            width: 100%;
            height: 40px;
            background: #ccc;
            line-height: 40px;
            margin: 10px 0;
            position: relative;
            span {
                display: inline-block;
                margin: 0 10px;
            }
            .select-box {
                display: inline-block;
            }
            .count-box {
               background: #999;
               position: absolute;
               top: 20px;
               z-index: 1; 
            }
        }
        .count-box {
            width: 100%;
            min-height: 200px;
            background: #eee;
            margin-top: 20px;
            .count-item {
                min-height: 40px;
                line-height: 40px;
                
                margin: 0 10px;
                span {
                    display: inline-block;
                    width: 30%;
                    text-align: center;
                }
            }
        }
    }
    .btn {
        margin: 0 auto;
        text-align: center;
        padding-top: 20px;
    }
</style>