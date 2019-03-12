import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 菜品分类管理 **************************************************** /
 /**  编辑全单折扣
   * parmer
   *  token:token
   */
  export function editAllOrderDisccount (parmer) {
    return post(`${http}/system/single/editAllOrderDisccount`, parmer);
  }

  /**  添加全单折扣
   * parmer
   *  token:token
   */
  export function addAllOrderDisccount (parmer) {
    return post(`${http}/system/single/addAllOrderDisccount`, parmer);
  }

  /**  更新全单折扣
   * parmer
   *  token:token
   */
  export function updateAllOrderDisccount(parmer) {
    return post(`${http}/system/single/updateAllOrderDisccount`, parmer);
  }

  /**  优惠管理列表
   * parmer
   *  token:token
   */
  export function getSaleList(parmer) {
    return post(`${http}/system/single/saleList`, parmer);
  }

   /**  手动结束优惠
   * parmer
   *  token:token
   */
  export function manualEnd(parmer) {
    return post(`${http}/system/single/manualEnd`, parmer);
  }

  /**  获取菜品分类接口
   * parmer
   *  token:token
   */
  export function getDishesCategory(parmer) {
    return post(`${http}/system/single/dishesCategory`, parmer);
  }

  /**  添加整单方案折扣
   * parmer
   *  token:token
   */
  export function addTotalOrderDisccount(parmer) {
    return post(`${http}/system/single/addTotalOrderDisccount`, parmer);
  }

  /**  编辑整单方案折扣
   * parmer
   *  token:token
   */
  export function editTotalOrderDisccount(parmer) {
    return post(`${http}/system/single/editTotalOrderDisccount`, parmer);
  }


  /**  更新整单方案折扣
   * parmer
   *  token:token
   */
  export function updateTotalOrderDisccount(parmer) {
    return post(`${http}/system/single/updateTotalOrderDisccount`, parmer);
  }

  /**  添加特价菜
   * parmer
   *  token:token
   */
  export function addSpecialDish(parmer) {
    return post(`${http}/system/single/addSpecialDish`, parmer);
  }

  /**  编辑特价菜
   * parmer
   *  token:token
   */
  export function editSpecialDish(parmer) {
    return post(`${http}/system/single/editSpecialDish`, parmer);
  }

  /**  编辑特价菜
   * parmer
   *  token:token
   */
  export function updateSpecialDish(parmer) {
    return post(`${http}/system/single/updateSpecialDish`, parmer);
  }

  /**  添加相同菜品第二份优惠
   * parmer
   *  token:token
   */
  export function addSecondDisccount(parmer) {
    return post(`${http}/system/single/addSecondDisccount`, parmer);
  }

  /**  编辑相同菜品第二份优惠
   * parmer
   *  token:token
   */
  export function editSecondDisccount(parmer) {
    return post(`${http}/system/single/editSecondDisccount`, parmer);
  }

  /**  更新相同菜品第二份优惠
   * parmer
   *  token:token
   */
  export function updateSecondDisccount(parmer) {
    return post(`${http}/system/single/updateSecondDisccount`, parmer);
  }

  /**  添加买一赠一
   * parmer
   *  token:token
   */
  export function addBuySend(parmer) {
    return post(`${http}/system/single/addBuySend`, parmer);
  }

  /**  编辑买一赠一
   * parmer
   *  token:token
   */
  export function editBuySend(parmer) {
    return post(`${http}/system/single/editBuySend`, parmer);
  }

  /**  更新买一赠一
   * parmer
   *  token:token
   */
  export function updateBuySend(parmer) {
    return post(`${http}/system/single/updateBuySend`, parmer);
  }

  

  

  


  
  

  

  

  


  


  
  

  



  
  

  export default{
    editAllOrderDisccount,
    addAllOrderDisccount,
    updateAllOrderDisccount,
    getSaleList,
    manualEnd,
    getDishesCategory,
    addTotalOrderDisccount,
    editTotalOrderDisccount,
    updateTotalOrderDisccount,
    addSpecialDish,
    editSpecialDish,
    updateSpecialDish,
    addSecondDisccount,
    editSecondDisccount,
    updateSecondDisccount,
    addBuySend,
    editBuySend,
    updateBuySend
  }