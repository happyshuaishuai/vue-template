<template>
  <div class="home">
    <myHeader :storeDate = "storeDate"></myHeader>
    <div class="container" style="width:100%;background-color: #fff;">
      <div class="crmContent">
          <Left class="crmLeft" :default-index="defaultIndex"></Left>
          <div class="crmRight">
              <router-view/>
          </div>
      </div>
      <!--<div class="common-footer">xuecs</div>-->
    </div>
  </div>
</template>

<script >
  import Vue from 'vue'
  import myHeader from '../common/header'
  import Left from '../common/left.vue'
  import {mapState,mapMutations,mapActions} from 'vuex';
  import '!style-loader!css-loader!less-loader!./style.less';
  import {keepLogin,getStoreDate} from '../../service/authority/index.js'

  export default {
    name: 'index',
    data() {
      return {
        footerIsShow:true, // 公共底部是否显示
        module: '', // 模块
        defaultIndex:'', //  在侧菜单默认选择项的ID
        storeDate:''// 当前营业时间
      }
    },
    components: {
      myHeader,Left
    },
    computed: {
      /*catch store.data*/
      ...mapState({
          userInfo: state => state.login.userInfo
      })
    },
    mounted  () {
      this.keepLogin_();
    },
      methods: {
         /*catch store.mutation*/
        ...mapMutations(['setName', 'setAuthority', 'saveDepartment']),
            /*catch store.action*/
        ...mapActions(['SAVE_USERINFO', 'SET_AUTHORITY', 'SAVE_OPTIONS','SAVE_OPEN_INDEX','SAVE_STORE_DATE']),
        async keepLogin_(){
          let that = this;
          let param={
            token : this.$route.query.token
          };
          let href = location.href;
          if(href.indexOf('home?token=') == -1){
            return;
          }
          const {code,data,error} = await keepLogin(param);
          if(code == 200){
              this.SAVE_USERINFO(data);
              //获取当前营业时间
              this.getStoreDate();  
              let result=[];
              if(data.permissions){
                data.permissions.forEach(item=>{
                  if(item.name =='后台管理系统'){
                    result = item._child;
                  }
                })
                try{
                  function leftHandle(child){
                      child.forEach((item,index)=>{
                      if(item.english_name_var && item.english_name_var.indexOf('icon')==-1){
                        // sessionStorage.setItem('openIndex',String(item.id));
                        // that.defaultIndex = String(item.id);
                        that.SAVE_OPEN_INDEX(String(item.id));
                        throw new Error(item.english_name_var)
                      }else{
                        if(item._child){
                          leftHandle(item._child);
                        }
                      }
                    })
                  }
                  leftHandle(result);
                }
                catch(e){
                  that.$router.push({name: e.message});
                }
              }
            // }  
          }
        },
         /**
           *  获取当前营业时间
          */
        async getStoreDate(){
          let {code,data,error} = await getStoreDate();
          if(code==200){
            // this.storeDate = data.store_date.substring(0,10)
            this.SAVE_STORE_DATE(data.store_date.substring(0,10))
          }
        },
      }
    }
</script>
