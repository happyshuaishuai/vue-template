const state = {
    customerInfo:{}, // 选中的客户信息
    orderId:''  // 订单ID
}

const mutations = {
    save_customerInfo(state, param) {
        state.customerInfo = param
    },
    save_orderId(state, param) {
        state.orderId = param
    },
}

const actions = {
    // SAVE_CUSTOMERINFO({ commit }, param) {
    //     commit("save_customerInfo", param)
    // },
}

export default {
    state,
    actions,
    mutations
}