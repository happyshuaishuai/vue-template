import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /******************** 设置管理  ********************/




  /******************** 充值区间  ********************/


  /**  充值设置列表
   * parmer
   *  token:token
   */
//   export function getAuth (parmer) {
//     return get(`${http}/api/crm/crm_data_menu`);
//   }

 /**  套餐列表
   * parmer
   *  token:token
   */
  export function getComboList (parmer) {
    return post(`${http}/system/single/comboList`,parmer);
  }

  /**  编辑套餐
   * parmer
   *  token:token
   */
  export function editCombo (parmer) {
    return post(`${http}/system/single/editCombo`,parmer);
  }

  /**  菜单列表
   * parmer
   *  token:token
   */
  export function listMenu (parmer) {
    return post(`${http}/system/single/listMenu`,parmer);
  }

  /**  修改菜单
   * parmer
   *  token:token
   */
  export function editMenu (parmer) {
    return post(`${http}/system/single/editMenu`,parmer);
  }

  /**  删除菜单
   * parmer
   *  token:token
   */
  export function delMenu (parmer) {
    return post(`${http}/system/single/delMenu`,parmer);
  }

  /**  删除菜单
   * parmer
   *  token:token
   */
  export function addMenu (parmer) {
    return post(`${http}/system/single/addMenu`,parmer);
  }

  /**  添加菜品
   * parmer
   *  token:token
   */
  export function addTemplateList (parmer) {
    return post(`${http}/system/single/addTemplateList`,parmer);
  }

  /**  菜单详情
   * parmer
   *  token:token
   */
  export function menuTemplateInfo (parmer) {
    return post(`${http}/system/single/menuTemplateInfo`,parmer);
  }

  /**  字体详情
   * parmer
   *  token:token
   */
  export function getTypefaceInfo (parmer) {
    return post(`${http}/system/single/typefaceInfo`,parmer);
  }

  /**  字体选项
   * parmer
   *  token:token
   */
  export function getTypefaceList (parmer) {
    return post(`${http}/system/single/typefaceList`,parmer);
  }

  /**  添加字体
   * parmer
   *  token:token
   */
  export function addTypeface (parmer) {
    return post(`${http}/system/single/addTypeface`,parmer);
  }

  /**  修改字体
   * parmer
   *  token:token
   */
  export function updateTypeface (parmer) {
    return post(`${http}/system/single/updateTypeface`,parmer);
  }
  

  


  

  

  

  

  

  
  



  export default{
    getComboList,
    editCombo,
    listMenu,
    editMenu,
    delMenu,
    addMenu,
    menuTemplateInfo,
    getTypefaceInfo,
    getTypefaceList,
    addTypeface,
    updateTypeface
  }



