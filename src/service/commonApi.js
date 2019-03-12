import {get,post} from "./axiosConfig.js";
import http from "./http.js";

/**  获取所有菜品分类
   * parmer
   *  token:token
   */
  export function getDishesCategorytApi (parmer) {
    return post(`${http}/system/single/getDishesCategory`, parmer);
  }

  /**  获取分类下的所有菜品
   * parmer
   *  token:token
   *  id:分类ID
   */
  export function getCategoryDishesApi (parmer) {
    return post(`${http}/system/single/getCategoryDishes`, parmer);
  }

  /**  获取所有员工分类
   * parmer
   *  token:token
   */
  export function departmentListApi (parmer) {
    return post(`${http}/system/single/departmentList`, parmer);
  }
   /**  获取分类下的所有员工
   * parmer
   *  token:token
   *  id:分类ID
   */
  export function getKeywordStaffApi (parmer) {
    return post(`${http}/system/single/getKeywordStaff`, parmer);
  }
   /**  获取所有分组
   * parmer
   *  token:token
   *  id:分类ID
   */
  export function allGroupListApi (parmer) {
    return post(`${http}/system/single/allGroupList`, parmer);
  }
  /**  获取套餐
   * parmer
   *  token:token
   *  id:分类ID
   */
  export function getCategoryComboApi (parmer) {
    return post(`${http}/system/single/getCategoryCombo`, parmer);
  }



  

