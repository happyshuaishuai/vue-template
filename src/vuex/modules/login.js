const state = {
    userInfo: [
        {a:0},
        [],
        [],
        []
    ],  // 用户信息  从后台获取到的信息，数组，0表示用户基本信息，1表示显示的模块，2表示部门数据
    authority: null,
    checkedDepartment: {}, // 已选择的部门数据
    open_index:'', // 左侧菜单默认index
    store_date:'',// 当前营业时间
}

const actions = {
    SAVE_USERINFO({ commit }, param) {
        commit("save_userInfo", param)
    },
    SAVE_OPTIONS({ commit }, param) {
        commit("save_options", param)
    },
    SAVE_CHECKEDEPARTMENT({ commit }, param) {
        commit("saveDepartment", param)
    },
    SAVE_OPEN_INDEX({commit},param){
        commit("save_open_index", param)
    },
    SAVE_STORE_DATE({commit},param){
        commit('save_store_date',param)
    }
    //async SET_AUTHORITY ({commit},param) {
    //    const data = await getAuthority();
    //    // alert('获取成功');
    //    commit("setAuthority",data);
    //}
}
                           
const mutations = {
    /**
     * 保存用户信息
     * @param obj
     */
    save_userInfo(state, param) {
        state.userInfo = param
    },
    /**
     * 保存在侧菜单indexx
     * @param obj
     */
    save_open_index(state, param) {
        state.open_index = param
    },
    /**
     * 保存当前营业时间
     * @param obj
     */
    save_store_date(state, param) {
        state.store_date = param
    },

     /**
     * 获取全局权限配置信息
     * @param obj
     */
      setAuthority (state,param) {
          state.authority = param
      },
    /**
     * 保存部门的数据
     * @param obj
     */
    save_options(state, param) {
        state.options = param;
    },
    /**
     * 保存选择部门的数据
     * @param obj
     */
    saveDepartment(state, param) {
        state.checkedDepartment = param;
    }
        
}

export default {
    state,
    actions,
    mutations
}