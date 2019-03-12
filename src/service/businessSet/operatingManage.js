import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 经营设置 **************************************************** /
/**  经营设置主页   
   * parmer
   *  token:token
   */
  export function businessIndex (parmer) {
    return post(`${http}/system/single/businessIndex`,parmer);
  }

  /**  更新/新建经营设置
   * parmer
   *  token:token
   *  id：菜品分类ID
   */
  export function businessSet (parmer) {
    return post(`${http}/system/single/businessSet`,parmer);
  }
  
  export default{
    businessIndex,
    businessSet
  }