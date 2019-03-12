import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 绩效管理 ****************************************************/
/**  赠送列表
   * parmer
   *  token:token
   * post: 岗位id
   * staff_name 员工名称
   * status 状态
   * per_page 每页多少条
   * page 当前页码
   */
  export function givingListApi (parmer) {
    return post(`${http}/system/single/givingList`, parmer);
  }

     /**  删除赠送
   * parmer
   *  token:token
   */
  export function delGivingApi (parmer) {
    return post(`${http}/system/single/delGiving`, parmer);
  }
    /**  结束赠送
   * parmer
   *  token:token
   */
  export function endGivingApi (parmer) {
    return post(`${http}/system/single/endGiving`, parmer);
  }
/**************************************************** 添加/修改绩效 ****************************************************/
  /**  添加赠送
   * parmer
   *  token:token
   */
  export function addGivingApi (parmer) {
    return post(`${http}/system/single/addGiving`, parmer);
  }

  /**  修改赠送
   * parmer
   *  token:token
   */
  export function updateGivingApi (parmer) {
    return post(`${http}/system/single/updateGiving`, parmer);
  }
   /**  获取岗位
   * parmer
   *  token:token
   */
  export function postListApi (parmer) {
    return post(`${http}/system/single/postList`, parmer);
  }
   /**  获取赠送规则详情
   * parmer
   *  token:token
   */
  export function editGivingApi (parmer) {
    return post(`${http}/system/single/editGiving`, parmer);
  }