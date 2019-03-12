import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /******************** 架构设置  ********************/

  /**  部门列表
   * parmer
   *  token:token
   */
  export function getDepartList (parmer) {
    return post(`${http}/system/single/departmentList`,parmer);
  }

  /**  add部门列表
   * parmer
   *  token:token
   */
  export function addDepartList (parmer) {
    return post(`${http}/system/single/addDepartment`,parmer);
  }

  /**  update部门列表
   * parmer
   *  token:token
   */
  export function updateDepartment (parmer) {
    return post(`${http}/system/single/updateDepartment`,parmer);
  }

  /** del部门列表
   * parmer
   *  token:token
   */
  export function delDepartment (parmer) {
    return post(`${http}/system/single/delDepartment`,parmer);
  }


  /********************** 员工 *******************/
  

  /* get员工列表接口
   * parmer
   * token:token
   */
  export function getStaffList (parmer) {
    return post(`${http}/system/single/staffList`,parmer);
  }

  /* add 员工接口
   * parmer
   * token:token
   */
  export function addStaff (parmer) {
    return post(`${http}/system/single/addStaff`,parmer);
  }

  /* add 员工接口
   * parmer
   * token:token
   */
  export function getPostList (parmer) {
    return post(`${http}/system/single/postList`,parmer);
  }

  /* 员工离职
   * parmer
   * token:token
   */
  export function dimissionStaff (parmer) {
    return post(`${http}/system/single/dimissionStaff`,parmer);
  }

  /* 修改员工
   * parmer
   * token:token
   */
  export function updateStaff (parmer) {
    return post(`${http}/system/single/updateStaff`,parmer);
  }

  /* 修改员工
   * parmer
   * token:token
   */
  export function addPost(parmer) {
    return post(`${http}/system/single/addPost`,parmer);
  }

    /* 修改员工
   * parmer
   * token:token
   */
  export function delPost(parmer) {
    return post(`${http}/system/single/delPost`,parmer);
  }

  
  
  


  

  





  

 

  export default {
    getDepartList,
    addDepartList,
    updateDepartment,
    delDepartment,
    getStaffList,
    addStaff,
    getPostList,
    dimissionStaff,
    updateStaff,
    addPost,
    delPost
 }