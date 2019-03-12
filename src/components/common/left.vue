<template>
    <el-aside
        width="15vw"
        style="background-color: #252525;position: fixed; height: 100%; z-index: 20;"
    >
        <div
            class="slimScrollDiv"
            style="position: relative; overflow: hidden; width: auto; height:90%;"
        >
            <div class="scroll-sidebar" style="overflow: auto; width: auto; height: 100%;">
                <el-menu
                    v-if="false"
                    @select="openIndexHandle"
                    :collapse-transition="true"
                    menu-trigger="click"
                    style="border:none"
                    :unique-opened="true"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                    :default-active="open_index">   
                    <div v-for="item in leftPermissions" :key="item.id">
                        <!-- <el-menu-item-group> -->
                            <el-menu-item :index="String(item.id)" @click="goto(item.english_name_var)"  v-if="item.english_name_var == 'log'" style="padding-left: 4vw !important;">
                                <i :class="'iconfont pubIco icon-caozuorizhi'"></i>
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        <!-- </el-menu-item-group> -->
                        <el-submenu :index="String(item.id)" v-else>
                            <template slot="title">
                                <i :class="'iconfont pubIco '+item.english_name_var"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item
                                    v-if="item._child && childitem.english_name_var"
                                    v-for="childitem in item._child"
                                    :index="String(childitem.id)"
                                    :key="childitem.id"
                                    @click="goto(childitem.english_name_var)"
                                >{{childitem.name}}</el-menu-item>
                                <el-submenu
                                    style="padding-left:2vw"
                                    v-if="item._child && !childitem.english_name_var"
                                    v-for="childitem in item._child"
                                    :index="String(childitem.id)"
                                    :key="childitem.id"
                                >
                                    <template slot="title">
                                        <i class="iconfont pubIco icon-kehuqunzu"></i>
                                        <span slot="title">{{childitem.name}}</span>
                                    </template>
                                    <el-menu-item-group v-if="childitem._child && childitem._child.length > 0">
                                        <el-menu-item
                                        
                                            v-if="chilitem3.english_name_var"
                                            v-for="chilitem3 in childitem._child"
                                            :index="String(chilitem3.id)"
                                            :key="chilitem3.id"
                                            @click="goto(chilitem3.english_name_var)"
                                        >{{chilitem3.name}}</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu-item-group>
                                    
                        </el-submenu>
                    </div>
                </el-menu>
                <!-- :default-active="open_index" -->
                <el-menu
               
                    @select="openIndexHandle"
                    collapse-transition="true"
                    menu-trigger="click"
                    style="border:none"
                    unique-opened="true"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                >
                    <el-submenu index="11" v-if="cheack_auth('客户管理')">
                        <template slot="title">
                            <i class="iconfont pubIco icon-jiagou"></i>
                            <span slot="title">菜单1</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item
                                index="1"
                                @click="goto('customerInfo')"
                            >模块1</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                   
                </el-menu>
            </div>
        </div>
    </el-aside>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import store from "../../vuex/store";
import { getAuth,getStoreDate } from "../../service/authority/index.js";
export default {
    name: "Left",
    data() {
        return {
            // open_index: sessionStorage.getItem("openIndex") || "", // 当前打开菜单的index
            menu_data: [],
            menu_data_api_error: false,
            isCollapse: false,
            screenWidth: document.body.clientWidth
        };
    },
    props:['defaultIndex'],
    computed: {
        ...mapState({
            permissions: state => state.login.userInfo.permissions || [],
            open_index: state=> state.login.open_index
        }),
        leftPermissions(){
            let result=[];
            if(this.permissions){
                this.permissions.forEach((item) => {
                    if(item.name =='后台管理系统'){
                      if(item._child)
                        result = item._child
                    }
                });
            }
            return result
        },
        // open_index(){
        //     let openIndex = sessionStorage.getItem("openIndex") || "";// 当前打开菜单的index
        //     return openIndex;
        // } 
    },
    watch: {
        screenWidth(val) {
            if (!this.timer) {
                this.screenWidth = val;
                this.timer = true;
                let that = this;
                setTimeout(function() {
                    that.timer = false;
                }, 400);
            }
        }
    },
    mounted() {
        // this.get_auth();
        parseInt(this.screenWidth) <= 1366
            ? (this.isCollapse = true)
            : (this.isCollapse = false);
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
                parseInt(this.screenWidth) <= 1366
                    ? (that.isCollapse = true)
                    : (that.isCollapse = false);
            })();
        };
    },
    methods: {
        ...mapMutations(["save_authdata"]),
        ...mapActions(['SAVE_OPEN_INDEX']),
        goto(path) {
            this.$router.push({
                name: path
            });
        },
        openIndexHandle(data, indexPath) {
            // sessionStorage.setItem("openIndex", data);
            this.SAVE_OPEN_INDEX(data)
            // console.log('22222')
        },
        async get_auth() {
            const { code, data, message } = await getAuth();
            if (code == 200) {
                this.menu_data = data;
            } else {
                this.menu_data_api_error = true;
            }
        },
        cheack_auth(c_name) {
            return true;
            var state = false;
            if (!this.menu_data) return true;
            for (var i = 0; i < this.menu_data.length; i++) {
                if (this.menu_data[i].name == c_name) {
                    state = true;
                }
                if (this.menu_data[i]._child) {
                    for (var j = 0; j < this.menu_data[i]._child.length; j++) {
                        if (this.menu_data[i]._child[j].name == c_name) {
                            state = true;
                        }
                    }
                }
            }
            if (this.menu_data_api_error == true) return true;
            return state;
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        }
    }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 15vw;
    min-height: 400px;
}
.el-menu-item-group__title {
    display: none;
}
@media screen and (max-width: 3366px) {
    .el-aside {
        width: 70px !important;
    }
    .el-menu-item:hover {
        color: #fff !important;
    }

    .crmRight {
        width: calc(100% - 70px) !important;
        margin-left: 70px !important;
    }
}
@media screen and (min-width: 1367px) {
    .el-aside {
        width: 15vw !important;
    }

    .crmRight {
        width: calc(100% - 15vw) !important;
        margin-left: 15vw !important;
    }
}
.el-aside ul {
    background: #252525;
}

.el-aside .el-menu-item,.el-submenu__title,.el-menu-item i,.el-submenu__title i {
    color: #fff !important;
}

 .el-menu-item.is-active,.el-menu-item.is-active i {
    color: #409eff !important;
  }

.el-submenu__title:hover {
    background-color: #1b1b1b !important;
}

.el-menu-item:focus,
.el-menu-item:hover {
    background-color: #1b1b1b !important;
}

.pubIco {
    position: relative;
    left: -20px;
    color: #fff;
}

.el-submenu__title {
    padding-left: 4vw !important;
}

.el-menu > .el-menu-item {
    /* padding-left: 4vw !important; */
    /*color: #fff;*/
}

.el-menu-item-group > ul > .el-menu-item {
    padding-left: 6vw !important;
}

.el-menu-item i {
    color: #fff;
}
</style>