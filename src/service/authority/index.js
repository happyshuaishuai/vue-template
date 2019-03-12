import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /******************** 设置管理  ********************/




  /******************** 充值区间  ********************/


  /**  充值设置列表
   * parmer
   *  token:token
   */
  export function getAuth (parmer) {
    return get(`${http}/api/crm/crm_data_menu`);
  }

/**  充值设置列表
   * parmer
   *  token:token
   */
  export function keepLogin (parmer) {
    return post(`${http}/system/single/keepLogin`,parmer);
  }

       /**  获取营业时间
   * parmer
   *  token:token
   */
 export function getStoreDate (parmer) {
  return post(`${http}/frontend/common/storeDate`,parmer);
}

