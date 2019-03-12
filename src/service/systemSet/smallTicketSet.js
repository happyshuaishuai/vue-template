import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /*********************************************************** 小票管理  ***********************************************************/


  /**  获取小票列表
   * parmer
   *  token:token
   */
  export function MemberTicketIndexApi (parmer) {
    return get(`${http}/reserve/reserve/MemberTicketIndex`);
  }
   /**  获取当前小票模板
   * parmer
   *  token:token
   */
  export function MemberTicketIndexAllApi (parmer) {
    return get(`${http}/reserve/reserve/MemberTicketIndexAll?pid=${parmer.id}`);
  }
   /**  切换小票选中状态
   * parmer
   *  token:token
   */
  export function MemberTicketSwitchApi (parmer) {
    return post(`${http}/reserve/reserve/MemberTicketSwitch?`,parmer);
  }