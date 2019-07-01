<template>
    <div class="home-g" v-if="display">
    <!--<div class="home-g">-->
        <div class="home-center">
            <div class="left-logo">
                <!-- <p><img src="../../assets/img/login/logo-white.png" alt=""></p> -->
                <p>vue解决方案</p>
                <p>vue解决方案</p>
            </div>
            <div class="right-login">
                <p class="title">登录 / Sign In</p>
                <p class="input">
                    <i class="iconfont icon-dianhua" :style="{color: this.isPhoneFocus?'white':''}"></i>
                    <input
                            autocomplete='off'
                            @focus="input(1)"
                            @blur="blur(1)"
                            :style="{color: this.isPhoneFocus?'white':'#444a59'}"
                            type="text" placeholder="手 机" v-model="mobile" @keyup="toLogin($event)"/>
                </p>
                <p class="input">
                    <i class="iconfont icon-mima" :style="{color: this.isPwdFocus?'white':''}"></i>
                    <input
                            autocomplete='off'
                            @focus="input(2)"
                            @blur="blur(2)"
                            :style="{color: this.isPwdFocus?'white':'#444a59'}"
                            type="password" placeholder="密 码" v-model="password" @keyup="toLogin($event)"/>
                </p>
                <p>
                    <label class="remberPwd">
                        <i class="dot" :style="{background: this.isRemberPwd?'#409efe':''}"></i>
                        <input type="checkbox" v-model="isRemberPwd"/>记住密码
                    </label>
                </p>
                <p><input class="login-button" type="button" @click="loginCenter" value="登 录"/></p>
            </div>

            <p class="home-center-bottom-title"> xuecs @</p>
        </div>
        <img class="bg-left" src="../../assets/img/common/bg-left.png" alt="">
        <img class="bg-right" src="../../assets/img/common/bg-right.png" alt="">
        <!--<myHeader :returnFatherShow="isLogin"></myHeader>-->
        <!--<div class="home-center">-->
            <!--<div class="home-center-row">-->
                <!--<div>-->
                    <!--&lt;!&ndash;背景图&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="home-center-row-login-todo">-->
                    <!--<p class="title">用户登录</p>-->
                    <!--<div class="content">-->
                        <!--<p><input type="text" v-model="mobile" autocomplete="off" placeholder="请输入手机号"-->
                                  <!--@keyup="toLogin($event)"/>-->
                            <!--&lt;!&ndash;<label><img src="../../assets/img/login/iPhone.png" alt=""></label>&ndash;&gt;-->
                        <!--</p>-->
                        <!--<p><input type="password" v-model="password" autocomplete="off" placeholder="请输入密码"-->
                                  <!--@keyup="toLogin($event)"/>-->
                        <!--<p><label class="remberPwd"><input type="checkbox"-->
                                                           <!--v-model="isRemberPwd">记住密码</label><span></span></p>-->
                        <!--&lt;!&ndash;<label><img src="../../assets/img/login/password.png" alt=""></label></p>&ndash;&gt;-->
                        <!--<p><input type="button" @click="login" id="login" value="登 录"/></p>-->
                        <!--&lt;!&ndash;<p><input type="button" @click="loginCenter" id="login" value="登 录"/></p>&ndash;&gt;-->

                        <!--&lt;!&ndash;<p><input type="checkbox"><label>记住密码？</label></p>&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<p class="home-center-bottom-title"> 成都墨提斯科技有限公司版权所有</p>-->
        <!--</div>-->
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations,
        mapActions
    } from 'vuex';
    import myHeader from '../common/header'
    import 'regenerator-runtime/runtime'
    import {
        loginHandle,
        signLoginHandle,
        loginCenter,
        getPowerList
    } from '../../service/api'
    import cookie from '../../utils/cookie.js'

    import VueCookies from 'vue-cookies'
    //单点登录使用的domain
    import {domain} from '../../service/distDomain'
    console.log(domain,'domain');
    export default {
        name: 'login',
        components: {
            myHeader
        },
        data() {
            return {
                isLogin: false,
                mobile: "", // 手机号
                password: "", // 密码
                isRemberPwd: false, // 是否记住密码
                popup: false,
                treeData: [],
                defaultProps: {
                    children: '_child',
                    label: 'BMMC',
                    value: "BMBM"
                },
                checkedDepartment: "",

                display: false,
                isPhoneFocus:false,
                isPwdFocus:false
            }
        },
        mounted() {
            let currentTime = Date.parse(new Date()) / 1000;
            let {expired = 0, token} = JSON.parse(cookie.getCookie('passport')) || {};

            if (expired <= currentTime) {
                //登录过期或者从未登录过
                // this.open('请登录');
                // this.$utils.openMessgeTip("请登录", '提示');
                console.log('请登录');
                this.display = true;
            } else {
                this.getPowerList(token)
            }

            let nameAndPwd = JSON.parse(cookie.getCookie('nameAndPwd'));
            // console.log(nameAndPwd,'nameAndPwd');
            if (nameAndPwd) {
                this.mobile = nameAndPwd.mobile;
                this.password = nameAndPwd.password;
                this.isRemberPwd = true;
            } else {
                this.mobile = '';
                this.password = '';
                this.isRemberPwd = false;
            }
            // console.log(this.isRemberPwd,'isRemberPwd');
            //下面是模拟登陆
            if (this.$route.query.timestamp && this.$route.query.mobile && this.$route.query.signature, this.$route.query.department) {
                localStorage.setItem('department', this.$route.query.department)
                // this.signLogin()
            }
             this.$router.push({
                path: "/home"
            })
        },
        methods: {
            /*catch store.mutation*/
            ...mapMutations(['setName', 'setAuthority', 'saveDepartment']),
            /*catch store.action*/
            ...mapActions(['SAVE_USERINFO', 'SET_AUTHORITY', 'SAVE_OPTIONS']),
            input(f) {
                f == 1 ? this.isPhoneFocus = true : this.isPwdFocus = true
            },
            blur(b) {
                b == 1 ? this.isPhoneFocus = false : this.isPwdFocus = false
            },
            async loginCenter() {
                let userInfo = [{},
                    [],
                    []
                ];
                this.SAVE_USERINFO(userInfo); // 应该可以不要

                //验证输入
                if (!this.mobile || !this.password) {
                    this.$utils.openMessgeTip("用户名或密码不能为空", '提示')
                    return;
                } else if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
                    this.$utils.openMessgeTip("请输入正确手机号", '提示')
                    return;
                }
                //登录request
                const {data, code, message} = await loginCenter(this.mobile, this.password);
                if (code === 200) {
                    this.getPowerList(data.token);
                    VueCookies.set("passport", JSON.stringify(data), '7d', '/', domain);

                    /******************/
                    if (this.isRemberPwd) {
                        let nameAndPwd = {
                            mobile: this.mobile,
                            password: this.password
                        };

                        VueCookies.set("nameAndPwd", JSON.stringify(nameAndPwd), '7d', '/', domain)
                    } else {
                        VueCookies.remove("nameAndPwd", '/', domain)
                    }
                    /******************/

                } else {
                    this.$utils.openMessgeTip(message, '提示')
                }
            },
            //get menu list
            async getPowerList(token) {
                const {code, data, message} = await getPowerList('crm_pc', token);
                if (code == 200) {
                    this.SAVE_USERINFO(data);
                    this.popup = true;
                    this.treeData = data[2];

                    this.$router.push({
                        path: "/home"
                    })
                } else {
                    VueCookies.remove('passport', '/', domain);
                    location.reload();
                    this.$utils.openMessgeTip(message, '提示')
                }
            },


            async login() {

                // 开发UI周期的临时无条件登录
                // this.$router.push({
                //     path: "/home"
                // });
                // return false;


                let userInfo = [{},
                    [],
                    []
                ];
                this.SAVE_USERINFO(userInfo);
                if (!this.mobile || !this.password) {
                    this.$utils.openMessgeTip("用户名或密码不能为空", '提示')
                    return;
                } else if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
                    this.$utils.openMessgeTip("请输入正确手机号", '提示')
                    return;
                }
                const {
                    code,
                    data,
                    message
                } = await loginHandle(this.mobile, this.password);

                if (code == 200) {
                    this.SAVE_USERINFO(data);
                    this.popup = true;
                    this.treeData = data[2];
                    if (this.isRemberPwd) {
                        let nameAndPwd = {
                            mobile: this.mobile,
                            password: this.password
                        }
                        cookie.setCookie("nameAndPwd", JSON.stringify(nameAndPwd), 7)
                    } else {
                        cookie.setCookie("nameAndPwd", null, 7)
                    }

                    this.$router.push({
                        path: "/home"
                    })
                } else {
                    this.$utils.openMessgeTip(message, '提示')
                }
            },
            async signLogin() {
                const {
                    code,
                    data,
                    message
                } = await signLoginHandle(this.$route.query.timestamp, this.$route.query.mobile, this.$route.query.signature);
                if (code == 200) {
                    this.SAVE_USERINFO(data);
                    this.$router.push({
                        path: '/home'
                    });
                } else {
                    this.$utils.openMessgeTip(message, '提示')
                }
            },
            handleNodeClick(data) {
                this.checkedDepartment = data;
            },
            checkDepartment() { //完成部门选择 点击OK 触发的事件
                //        if (this.checkedDepartment) {
                //          this.saveDepartment(this.checkedDepartment);
                //          this.$router.push({ path: "/home" })
                //        } else {
                //          this.$utils.openMessgeTip('请先选择一个部门!','提示')
                //        }
            },
            toLogin(ev) {
                if (ev.key == "Enter") {
                    this.loginCenter()
                }
            },
        }
    }
</script>

<style lang="less">
    @import "style.less";
</style>