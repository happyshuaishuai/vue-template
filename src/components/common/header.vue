/*
|--------------------------------------------------------------------------
| 组件 公用头部
|--------------------------------------------------------------------------
|
| author：辜小芸
| data： vuex.userInfo
| DOTO:  备注
|
*/

<template>
      <div class="homeHeader" v-bind:style="styleObject" style="z-index:10000;">
            <!--<a v-if="returnFatherShow" href="http://crm.kqmis.com/#/home" class="returnFather"><i class="el-icon-d-arrow-left"></i>&nbsp&nbsp返回</a>-->
            <div class="logo-l" @click="jump">
                <!--<img :src="bgColorBlue ? '../../assets/img/home/logo-white.png' : '../../assets/img/home/logo.png' " />-->
                <img src='../../assets/img/home/logo-white.png'/>
                <!-- <i class="iconfont icon-xigushangbologo"></i> -->
                <span>希古尚博</span>
            </div>
            <div class="logo-r">
                <p>收银系统-后台管理系统</p>
                <br>
                <p>Customer Relationship Management</p>
            </div>
            <div class="logo-message" v-if="userInfoIsShow">
                <!--部门选择下拉框-->
                <!--<el-cascader :options="userInfo[2]" :props="props" :change-on-select='true' :show-all-levels="false" size="mini" :placeholder="currentDepartment">-->
                <!--</el-cascader>-->
               
                <!--头部下拉菜单-->
                <!-- <span>
                  <el-select v-model="areaValue" size="mini" class="areaSelect" placeholder="请选择" @change="areaChange">
                    <el-option
                      v-for="item in areaoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </span> -->
                <span class="changePwd" style="margin-right: 10px;" @click="jumpMessage" v-if="!return_fuck_button_auth('/api/crm/crm_data_menu') && newDatasLenth > 0">
                    <el-badge :value="newDatasLenth" @click="jumpMessage" class="item" style="padding-right: 10px;"  v-bind:class="{ blue: messageColor }">
                           <i class="iconfont icon-xiaoxi2" @click="jumpMessage"></i>消息管理
                    </el-badge>
                </span>
                 <!-- <span class="changePwd" style="margin-right: 10px;" @click="jumpMessage" v-else>
                    <i class="iconfont icon-xiaoxi2" @click="jumpMessage"></i>消息管理
                   </span>   -->
                <span>hi,{{userInfo.staff_name}}</span>
                 <span >
                    {{store_name}}
                </span>
                <span v-if="screenWidth > 1025">{{store_date}}</span>
                <!-- <span class="changePwd" @click="changePwdDialog" v-bind:class="{ blue: blueColor }">
                    <i class="iconfont icon-xiugaimima" style="font-size: 20px;position: relative;top: 2px;"></i>修改密码
                </span> -->
                <span class="signOut">
                  <a :href="outUrl">
                    <i class="iconfont icon-tuichu1" style="font-size: 22px;position: relative;top: 3px;"></i>
                    退出
                  </a>
                </span>
                <span style="margin-right: 20px;">
                  <i class="iconfont icon-fanhui1"></i>
                  <a v-if="returnFatherShow"  :href="returnUrl" class="returnFather" style="color:#fff">返回主页</a>
               </span>
            </div>
          <el-dialog
                  title="修改密码"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  :before-close="handleClose">
                
              <!--<div class="change-pwd-content1">-->
                  <div class="change-pwd-bar flex">
                      <div class="change-pwd-tip">原密码：</div>
                      <div class="flex1"><el-input v-model="oldPassword" placeholder="请输入原密码"></el-input></div>
                  </div>
                  <div class="change-pwd-bar flex">
                      <div  class="change-pwd-tip">新密码：</div>
                      <div class="flex1" ><el-input v-model="password" placeholder="请输入新密码" ></el-input></div>
                  </div>
                  <div class="change-pwd-bar flex">
                      <div  class="change-pwd-tip">确认密码：</div>
                      <div class="flex1"><el-input v-model="remPassword" placeholder="请重复新密码" ></el-input></div>
                  </div>
              <!--</div>-->
              <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false,blueColor=false">取 消</el-button>
                <el-button type="primary" @click="changePwdHandle">确 定</el-button>
              </span>
          </el-dialog>
      </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { updatePassword } from "../../service/api";
import { Cascader } from "element-ui";
import { clearAllCookie } from "../../utils/cookie";
import { getAuth } from "../../service/authority/index.js";
import { newDataList } from "../../service/message/index.js";
import VueCookies from 'vue-cookies'
import reHttp from "../../service/http.js"
//单点登录使用的domain
import {domain} from '../../service/distDomain'
   import {eachTreeData2} from '../../utils/index.js'
export default {
  name: "my-header",
  data() {
    return {
      userInfoIsShow: true, // 头部右边是否显示
      oldPassword: "", // 头部右边是否显示
      password: "", // 头部右边是否显示
      remPassword: "", // 头部右边是否显示
      centerDialogVisible: false, // 修改密码弹框是否显示
      props: {
        value: "BMBM",
        label: "BMMC",
        children: "_child"
      },
      areaoptions:[
        {
          value:null,
          label:"全部"
        }
      ],
      time:null,
      areaValue:null,
      currentDepartment: "", // 当前选中的部门
      bgColorBlue: true,
      styleObject: {
        color: "#fff",
        backgroundColor: "#1b1b1b",
      },
     // screenWidth: document.body.clientWidth, // 屏幕可见宽
      menu_data: [], //菜单权限
      menu_data_api_error: false,
      store_name: "",
      newDatasLenth: 0, // 未读信息
      getMessagePushLenthInterval: null, //定时器,
      setupAuthState: false,
      showState:false,//订单消息显隐
      blueColor:false,
      messageColor:false,
      setColor:false,
      returnUrl:'',//返回主页的URL
      outUrl:'',//退出的URL
    };
  },
  props: {
    returnFatherShow: {
      default: true
    }
  },
  mounted() {
    let url = location.host;
    if(url.indexOf('192.168.188.116') >= 0){
        this.returnUrl = 'http://192.168.188.116/site/#/home';
        this.outUrl = 'http://192.168.188.116/site';
    }else if(url.indexOf('192.168.188.216') >= 0){
        this.returnUrl = 'http://192.168.188.216/site/#/home';
        this.outUrl = 'http://192.168.188.216/site';
    }
    let that = this;
    // if (!!localStorage.vuex) {
    //   this.store_name = JSON.parse(localStorage.vuex).login.userInfo[0].BMMC;
    // }
    //  this.store_name=str.parseJSON(localStorage.vuex)
    if (location.hash == "#/" || location.hash == "#/login") {
      this.userInfoIsShow = false;
    }
    if (location.hash == "#/" || location.hash == "#/home") {
      this.bgColorBlue = false;
    }
    let department = localStorage.getItem("department");
    if (department) {
      this.currentDepartment = department;
    } else {
      this.currentDepartment = this.checkedDepartment.BMMC;
    }
    if (location.hash != "#/" && location.hash != "#/login" && !that.setupAuthState) {
        // that.get_auth();
      that.getMessagePushLenthInterval = setInterval(() => {
        that.getNewDataList();
      }, 10000);
    }
    
    // if (localStorage.vuex) {
    //   let arrs = JSON.parse(localStorage.vuex).login.userInfo[3][2]._child[6]._child[1]
    //   if(arrs.id!=""&&arrs.power_permission_id!=''){
    //       this.showState=true
    //   }else{
    //       this.showState=false
    //   }
    // }
    // let initAreaOptions  = [];
    // if (localStorage.vuex) {
    //   initAreaOptions = JSON.parse(localStorage.vuex).login.userInfo[0].store;
    // }
     // 头部下拉菜单
  //    if (initAreaOptions.length > 0) {
  //      let initOptions;
  //      let allValueArr;
  //      initOptions = initAreaOptions.map((item)=>{
  //         let obj = {
  //           value:item.store_id,
  //           label:item.store_name
  //         }
  //         return obj;
  //      });
  //      allValueArr = initAreaOptions.map((item)=>{
  //         return item.store_id;
  //      }).join();
  //     let allNameArr= initAreaOptions.map((item)=>{
  //         return item.store_name;
  //      }).join();
  //      console.log(allValueArr,1231123131312313)
  //      initOptions.unshift({value:allValueArr,label:"全部"});
  //      console.log(initOptions)
  //      this.areaoptions = initOptions;
  //      this.changeMotherFucker(allValueArr);// 默认第一次进来，传全部的store_id
  //      this.changeJesusChrist(allNameArr + ',全部');
  //    } else {
  //      this.changeMotherFucker(null);
  //      this.changeJesusChrist(null);
  //    }
  //     setInterval(() => {
  //               let date = new Date();
  //      this.time = this.$utils.getNowFormatDate(date);
  //           }, 1000)
  },
  computed: {
    /*catch store.data*/
    ...mapState({
      userInfo: state => state.login.userInfo,
      store_id: state => state.store_id, // 头部下拉菜单
      checkedDepartment: state => state.login.checkedDepartment,
      store_name_:state => state.store_name, // 头部下拉菜单
      click_state:state => state.click_state, // 头部菜单css-click
      store_date:state => state.login.store_date // 当前营业时间
      
    }),
    // time: function() {
    //   let date = new Date();
    //   return this.$utils.getNowFormatDate(date);
    // },
      screenWidth() {
      return window.screen.width;
    },
  },
  methods: {
    /*catch store.mutation*/
    ...mapMutations(["setName", "setAuthority", "saveDepartment","changeMotherFucker","changeJesusChrist","clickStateCss"]),
    /*catch store.action*/
    ...mapActions(["SAVE_USERINFO"]),
    return_fuck_button_auth(url){
      return false;//
                var regList= eachTreeData2( this.userInfo[3][1]._child,'url',url,'_child');
                return !regList.length>0;
            },
    // 头部下拉菜单
    async areaChange(value){
      this.changeMotherFucker(value);
      let change_label;
      this.areaoptions.forEach((item) => {
        if(item.value == value)
          change_label = item.label;
      });
      if(change_label =='全部'){
          change_label = this.areaoptions.map((item)=>{
            return item.label;
          })
        change_label = change_label.join(',')
      }
    
      this.changeJesusChrist(change_label);
    },

    changePwdDialog() {
      // this.centerDialogVisible = true;
      this.blueColor=true
      this.messageColor=false
      this.setColor=false
        this.$router.push({
                    path: '/Revise'
        });
    },
    async changePwdHandle() {
      if (!this.oldPassword || !this.password || !this.remPassword) {
        this.$utils.openMessgeTip("请填写完整信息", "提示");
        return;
      } else if (this.password != this.remPassword) {
        this.$utils.openMessgeTip("新密码与确认密码不一致", "提示");
        return;
      }
      let submitData = {
        password: this.password,
        rem_password: this.remPassword,
        old_password: this.oldPassword,
        mobile: this.userInfo[0].SMS
      };
      const { code, data, message } = await updatePassword(submitData);
      if (code == 200) {
        this.centerDialogVisible = false;
        this.blueColor=false
        this.$message({
          message: "恭喜你，密码修改成功！",
          type: "success"
        });
      } else {
        this.$utils.openMessgeTip(message, "提示");
      }
    },
    handleChange(value) {},
    handleClose(){
      //如果之前是点击的
      if(this.click_state == 'message'){
        this.jumpMessage();
      }
      if(this.click_state == 'setup'){
         this.jumpSetup();
      }
      this.blueColor=false
      this.centerDialogVisible = false
    },
    logOut() {
      this.$router.push({ path: "/" });
      VueCookies.remove('passport','/',domain);
      VueCookies.remove('nameAndPwd','/',domain);
      let userInfo = [{}, [], []];
      this.SAVE_USERINFO(userInfo);
      localStorage.clear();
      // clearAllCookie();
    },
    jump() {
      if (location.hash == "#/" || location.hash == "#/login") {
        this.$router.push({ path: "/" });
      } else {
        this.$router.push({ path: "/home" });
      }
    },
    jumpSetup() {
      this.clickStateCss('setup');
      this.$router.push({ path: "/home/setup" });
      this.setColor=true
      this.messageColor=false
    },
    jumpMessage() {
      this.clickStateCss('message');
      this.$router.push({ path: "/home/allMessage" });
      this.messageColor=true
      this.setColor=false
    },
    async get_auth() {
      let that = this;
      const { code, data, message } = await getAuth();
      if (code == 200) {
        this.menu_data = data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].name == "设置") {
            that.setupAuthState = true;
          }
          if (!!data[i]._child) {
            for (var j = 0; j < data[i]._child.length; j++) {
              if (data[i]._child[j].name == "设置") {
                that.setupAuthState = true;
              }
            }
          }
        }
      } else {
        this.menu_data_api_error = true;
      }
    },
  /**
     *  获取当前营业时间
     */
    async getStoreDate(){
      let {code,data,error} = await getStoreDate();
      console.log(data)
    },
    /**
     * getNewData 获取订单汇总
     */
    async getNewDataList() {
      return false;
        let that = this;
      let parameter = {
        status: 1,
        buyStart: "",
        buyEnd: "",
        page:1,
        per_page: 10,
        store_id:this.store_id.split(',') || '',
      };
      await newDataList(parameter).then(res => {
        if (res.code == 200) {
          let lenth_ = res.data.total;
        //   for (var lable of res.data.data) {
        //     // if (lable.status == "3") {
        //     //   lenth_++;
        //     // }
        //     lenth_++;
        //   }
        if(lenth_>99){
            that.newDatasLenth = '99+'
        }else{
             that.newDatasLenth = lenth_;
        }
        }
      });
    }
  },
  watch: {
    $route: function(to, from) {
      if (this.$route.path === "/" || this.$route.path === "/home") {
        this.bgColorBlue = false;
      } else {
        this.bgColorBlue = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
    .homeHeader {
        width: 100%;
        // padding: 10px 3vw;
        // padding: 10px 50px 10px 50px;
        padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 3vw;
        background-color: #fff;
        height: 60px;
        color: #777;
        min-width: 1466px;
    .areaSelect {
        width: 110px;
    }
    .returnFather {
    // position: absolute;
    // left: 20px;
    // top: 20px;
        text-decoration: none;
        color: #fff;
    // border: 1px solid rgba(0, 0, 0, .2);
    // padding: 3px;
    // border-radius: 4px;
    // box-shadow: 1px 0.5px 2px #000;
    i {
        color: #fff
    }
    }
    .logo-l,
    .logo-r {
        height: 100%;
        padding: 0 10px;
        float: left;
    }
    .logo-l {
        border-right: 2px solid #e6e6e6;
        cursor: pointer;
    img {
        vertical-align: middle;
    }
    }
    .logo-r {
        line-height: 10px;
        margin-top: 5px;
    p:nth-child(1) {
        font-weight: bold
    }
    p:nth-child(3) {
        font-size: 12px;
    }
    }
    .logo-message {
        float: right;
        position: relative;
        height: 100%; //width: 50vw;
    //display: flex;
    //justify-content: space-between;
        padding-top: 8px;
    // align-items: center;
        font-size: 14px;
    span {
        margin-left: 20px;
    }
    span i {
        padding-right: 8px;
    }
    .changePwd,
    .signOut {
        cursor: pointer;
    }
    .signOut a{
      color: #fff;
      text-decoration: none;
    }
    }
    .change-pwd-bar {
        margin-bottom: 15px;
        height: 40px;
    .change-pwd-tip {
        width: 70px;
        line-height: 40px;
        text-align: right;
    }
    }
    }
</style>