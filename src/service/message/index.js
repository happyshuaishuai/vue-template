import {
    get,
    post
} from '../axiosConfig'

import reHttp from '../http.js'

/**
 * 统计商品售卖信息
 */
export function newData(pro) {
    return post(`${reHttp}/api/crm/order_news_data`,pro)
}
/**
 * 消息列表 
 */
export function newDataList(parameter) {
    return get(`${reHttp}/api/crm/news_list?status=${parameter.status}&buyStart=${parameter.buyStart}&buyEnd=${parameter.buyEnd}&per_page=${parameter.per_page}&page=${parameter.page}&store_id=${parameter.store_id}`)
}
/**
 * 新消息列表 
 */
export function getSearchDataList(parameter) {
    return get(`${reHttp}/api/crm/news_list?order_info=${parameter.order_info}&per_page=${parameter.per_page}&page=${parameter.current_page}&store_id=${parameter.store_id}`)
}
/**
 * 更新消息
 */
export function refrechNews(parameter) {
    return post(`${reHttp}/api/crm/news_edit`,parameter)
}
/**
 * 批量更改订单状态
 */
export function refrechNewMany(parameter) {
    return post(`${reHttp}/api/crm/news_edit_status`,parameter)
}
export default {
   newData,
   newDataList,
   refrechNews,
   refrechNewMany,
   getSearchDataList
}