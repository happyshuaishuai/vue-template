import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 餐段管理 **************************************************** /
/**  餐段列表   
   * parmer
   *  token:token
   */
  export function getMealPeriodList (parmer) {
    return post(`${http}/system/single/mealPeriodList`,parmer);
  }

  /**  添加餐段接口
   * parmer
   *  token:token
   *  id：菜品分类ID
   */
  export function addMealPeriod (parmer) {
    return post(`${http}/system/single/addMealPeriod`,parmer);
  }

   /**  获取餐段菜品接口（修改时用）
   * parmer
   *  token:token
   *  id：菜品分类ID
   */
  export function getDishes (parmer) {
    return post(`${http}/system/single/getDishes`,parmer);
  }
  
  /**  修改餐段接口
   * parmer
   *  token:token
   *  id：菜品分类ID
   */
  export function updateMealPeriod (parmer) {
    return post(`${http}/system/single/updateMealPeriod`,parmer);
  }

  /**  删除餐段
   * parmer
   *  token:token
   *  id：菜品分类ID
   */
  export function delMealPeriod (parmer) {
    return post(`${http}/system/single/delMealPeriod`,parmer);
  }
  
  export default{
    getMealPeriodList,
    addMealPeriod,
    getDishes,
    updateMealPeriod,
    delMealPeriod
  }