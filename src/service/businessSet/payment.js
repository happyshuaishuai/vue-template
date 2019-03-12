import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /*********************************************************** 站点设置  ***********************************************************/


  /**  获取支付方式列表
   * parmer
   *  token:token
   */
  export function getPaymentListApi (parmer) {
    return post(`${http}/system/single/paymentList`,parmer);
  }
   /**  排序
   * parmer
   *  token:token
   */
  export function sortOperateApi (parmer) {
    return post(`${http}/system/single/sortOperate`,parmer);
  }
   /**  修改付款方式
   * parmer
   *  token:token
   */
  export function updatePaymentApi (parmer) {
    return post(`${http}/system/single/updatePayment`,parmer);
  }
  /**  添加付款方式
   * parmer
   *  token:token
   */
  export function addPaymentApi (parmer) {
    return post(`${http}/system/single/addPayment`,parmer);
  }