import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /******************** 系统设置  ********************/



  /******************** 门店信息  ********************/


  /**  获取门店配置
   * parmer
   *  token:token
   */
  export function getStoreConfig (parmer) {
    return get(`${http}/reserve/reserve/StoreConfig`);
  }

  /**  更新门店配置
   * parmer
   *  token:token
   */
  export function updateStoreConfig (parmer) {
    return post(`${http}/reserve/reserve/StoreConfig`,parmer);
  }

  

  export default{
    getStoreConfig,
    updateStoreConfig
  }