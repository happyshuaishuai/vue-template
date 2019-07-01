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
