import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /*********************************************************** 日志列表  ***********************************************************/


  /**  获取日志列表
   * parmer
   *  token:token
   */
  export function logIndexApi (parmer) {
    return post(`${http}/reserve/reserve/logIndex`,parmer);
  }