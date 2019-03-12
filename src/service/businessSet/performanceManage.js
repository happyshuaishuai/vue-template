import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 绩效管理 ****************************************************/
/**  绩效列表
   * parmer
   *  token:token
   * name: 提成名称
   * income_type 提成类型
   * status 状态
   * per_page 每页多少条
   * page 当前页码
   */
  export function performanceListApi (parmer) {
    return post(`${http}/system/single/performanceList`, parmer);
  }
  /**  删除绩效
   * parmer
   * token:token
   * id:绩效id
   */
  export function delPerformanceApi (parmer) {
    return post(`${http}/system/single/delPerformance`, parmer);
  }
  /**  结束绩效
   * parmer
   * token:token
   * id:绩效id
   */
  export function endPerformanceApi (parmer) {
    return post(`${http}/system/single/endPerformance`, parmer);
  }

  /**************************************************** 添加绩效 ****************************************************/
  /**  添加绩效
   * parmer
   * *  token:token
   */
  export function addPerformanceApi (parmer) {
    return post(`${http}/system/single/addPerformance`, parmer);
  }
  /**  获取绩效详情
   * parmer
   * *  token:token
   */
  export function editPerformanceApi (parmer) {
    return post(`${http}/system/single/editPerformance`, parmer);
  }
   /**  修改绩效
   * parmer
   * *  token:token
   */
  export function updatePerformanceApi (parmer) {
    return post(`${http}/system/single/updatePerformance`, parmer);
  }


