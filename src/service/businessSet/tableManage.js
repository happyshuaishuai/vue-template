import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 桌位设置 **************************************************** /
 /**  get桌位列表接口
   * parmer
   *  token:token
   */
  export function getTableList (parmer) {
    return post(`${http}/system/single/tableList`,parmer);
  }

  /**  添加桌位接口
   * parmer
   *  token:token
   */
  export function addTable (parmer) {
    return post(`${http}/system/single/addTable`,parmer);
  }

   /**  修改桌位接口
   * parmer obj
   */
  export function updateTable (parmer) {
    return post(`${http}/system/single/updateTable`,parmer);
  }

   /**  删除桌位接口
   * parmer obj
   */
  export function delTable (parmer) {
    return post(`${http}/system/single/delTable`,parmer);
  }
  /**  get区域列表接口
   * parmer obj
   */
  export function getRegionList (parmer) {
    return post(`${http}/system/single/regionList`,parmer);
  }

  /**  区域下拉
   * parmer obj
   */
  export function regionDropdown (parmer) {
    return post(`${http}/system/single/regionDropdown`,parmer);
  }

  /**  出品部门列表
   * parmer obj
   */
  export function drawerDepartment (parmer) {
    return post(`${http}/system/single/drawerDepartment`,parmer);
  }

  /**  添加区域接口
   * parmer obj
   */
  export function addRegion (parmer) {
    return post(`${http}/system/single/addRegion`,parmer);
  }

  /**  删除区域
   * parmer obj
   */
  export function delRegion (parmer) {
    return post(`${http}/system/single/delRegion`,parmer);
  }

  /**  修改区域
   * parmer obj
   */
  export function updateRegion (parmer) {
    return post(`${http}/system/single/updateRegion`,parmer);
  }

  /**  修改区域
   * parmer obj
   */
  export function editTable (parmer) {
    return post(`${http}/system/single/editTable`,parmer);
  }

  
  
  


  


  

  

  export default{
    getTableList,
    addTable,
    updateTable,
    delTable,
    getRegionList,
    regionDropdown,
    drawerDepartment,
    addRegion,
    delRegion,
    updateRegion,
    editTable
  }