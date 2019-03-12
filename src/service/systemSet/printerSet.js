import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /*********************************************************** 打印机管理  ***********************************************************/


  /**  获取打印机配置列表
   * parmer
   *  token:token
   */
  export function PrintingIndexApi (parmer) {
    return get(`${http}/reserve/reserve/PrintingIndex`);
  }
  /**  删除打印机配置
   * parmer
   *  token:token
   */
  export function PrintingDelesApi (parmer) {
    return post(`${http}/reserve/reserve/PrintingDeles`,parmer);
  }

    /*********************************************************** 添加/修改打印机配置  ***********************************************************/
    /**  添加打印机配置
   * parmer
   *  token:token
   */
  export function PrintingAddApi (parmer) {
    return post(`${http}/reserve/reserve/PrintingAdd`,parmer);
  }
   /**  获取打印机配置
   * parmer
   *  token:token
   */
  export function PrintingDetailsApi (parmer) {
    return get(`${http}/reserve/reserve/PrintingDetails?id=${parmer.id}`);
  }
   /**  更新打印机配置
   * parmer
   *  token:token
   */
  export function PrintingUpdateApi (parmer) {
    return post(`${http}/reserve/reserve/PrintingDetails`,parmer);
  }
   /**  获取小票列表
   * parmer
   *  token:token
   */
  export function getTicketListApi (parmer) {
    return get(`${http}/reserve/reserve/MemberTicketIndex`,parmer);
  }
   /**  获取出口部门列表
   * parmer
   *  token:token
   */
  export function drawerDepartmentApi (parmer) {
    return post(`${http}/system/single/drawerDepartment`,parmer);
  }

  /*********************************************************** 菜品厨打设置  ***********************************************************/
 /**  获取厨打设置列表
   * parmer
   *  token:token
   */
  export function PrintingRelationIndexApi (parmer) {
    return post(`${http}/reserve/reserve/PrintingRelationIndex`,parmer);
  }
  /**  获取所有菜品分类
   * parmer
   *  token:token
   */
  export function getDishesCategorytApi (parmer) {
    return post(`${http}/system/single/getDishesCategory`, parmer);
  }
  /**  修改打印机档口
   * parmer
   *  token:token
   */
  export function PrintingRelationDetailsApi (parmer) {
    return post(`${http}/reserve/reserve/PrintingRelationDetails`, parmer);
  }