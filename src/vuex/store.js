import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import login from './modules/login';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        login
    },
    // 全局公用state
    state: {
    },
    // 全局公用mutations
    mutations: {
        change(val){
        },
        changeMotherFucker(state,value){
            this.state.store_id = value
        },
        changeJesusChrist(state,value){
            this.state.store_name = value
        },
    },
    // 全局公用actions
    actions: {

    },
    plugins: [createPersistedState()]
  })

export default store;  
//"$store.commit('addOne')

