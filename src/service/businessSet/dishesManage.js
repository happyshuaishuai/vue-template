import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 菜品分类管理 **************************************************** /
/**  菜品分类列表
   * parmer
   *  token:token
   */
  export function categoryListApi (parmer) {
    return post(`${http}/system/single/categoryList`, parmer);
  }
  /**  出品部门列表接口
   * parmer
   *  token:token
   */
  export function drawerDepartmentApi (parmer) {
    return post(`${http}/system/single/drawerDepartment`,parmer);
  }

  /**  删除菜品分类
   * parmer
   *  token:token
   *  id：菜品分类ID
   */
  export function delCategorytApi (parmer) {
    return post(`${http}/system/single/delCategory`,parmer);
  }
   /**  添加菜品分类
   * parmer obj
   *  token:token
   *  category_name：分类名称
   *  drawer：出品部门
   *  giving：是否赠送
   *  distribution：是否配送
   */
  export function addCategoryApi (parmer) {
    return post(`${http}/system/single/addCategory`,parmer);
  }
   /**  修改菜品分类
   * parmer obj
   *  token:token
   *  id：菜品分类ID
   *  category_name：分类名称
   *  drawer：出品部门
   *  giving：是否赠送
   *  distribution：是否配送
   */
  export function updateCategoryApi (parmer) {
    return post(`${http}/system/single/updateCategory`,parmer);
  }

  /**************************************************** 菜品管理 **************************************************** /
/**  菜品列表
   * parmer
   *  token:token
   *  dish_name: 名称
   *  sale_status: 状态
   *  category_id: 分类
   *  page: 当前页
   */
  export function dishesListApi (parmer) {
    return post(`${http}/system/single/dishesList`, parmer);
  }
  /**  删除菜品
   * parmer
   *  token:token
   *  id：菜品ID
   */
  export function delDishestApi (parmer) {
    return post(`${http}/system/single/delDishes`,parmer);
  }

    /**************************************************** 添加/修改菜品 **************************************************** /
/**  添加菜品
   * parmer
   */
  export function addDishesApi (parmer) {
    return post(`${http}/system/single/addDishes`,parmer);
  }
  /**  修改菜品
   * parmer
   */
  export function updateDishesApi (parmer) {
    return post(`${http}/system/single/updateDishes`,parmer);
  }
   /**  获取菜品编码
   * parmer
   */
  export function getDishNumberApi (parmer) {
    return post(`${http}/system/single/getDishNumber`,parmer);
  }
  /**  添加菜品
   * parmer
   */
  export function editDishesApi (parmer) {
    return post(`${http}/system/single/editDishes`,parmer);
  }
