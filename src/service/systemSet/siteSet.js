import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /*********************************************************** 站点设置  ***********************************************************/


  /**  站点列表
   * parmer
   *  token:token
   */
  export function siteSetupListApi (parmer) {
    return post(`${http}/system/single/siteSetupList`);
  }
  /**  获取站点信息
   * parmer
   *  token:token
   */
  export function getSiteInfoApi (parmer) {
    return get(`${http}/system/single/editSiteSetup?id=${parmer.id}`);
  }
  /**  添加站点
   * parmer
   *  token:token
   */
  export function addSiteSetupApi (parmer) {
    return post(`${http}/system/single/addSiteSetup`,parmer);
  }
  /**  修改站点
   * parmer
   *  token:token
   */
  export function editSiteSetupApi (parmer) {
    return post(`${http}/system/single/editSiteSetup`,parmer);
  }
   /**  删除站点
   * parmer
   *  token:token
   */
  export function siteSetupDelApi (parmer) {
    return post(`${http}/system/single/siteSetupDel`,parmer);
  }