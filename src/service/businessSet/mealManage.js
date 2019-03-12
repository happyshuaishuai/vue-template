import {get,post} from "../axiosConfig.js";
import http from "../http.js";

 
/**************************************************** 套餐管理 ****************************************************/
/**  套餐列表
   * parmer
   *  token:token
   * name: 套餐名称
   * status 状态
   * per_page 每页多少条
   * page 当前页码
   */
  export function comboListApi (parmer) {
    return post(`${http}/system/single/comboList`, parmer);
  }
  /**  删除套餐
   * parmer
   *  token:token
   * name: 套餐名称
   * status 状态
   * per_page 每页多少条
   * page 当前页码
   */
  export function delComboApi (parmer) {
    return post(`${http}/system/single/delCombo`, parmer);
  }

  /**************************************************** 添加/修改套餐 ****************************************************/
/**  查询套餐
 * * parmer
   *  token:token
   *  id: 套餐ID
   */
  export function editComboApi (parmer) {
    return post(`${http}/system/single/editCombo`, parmer);
  }
  /**  添加套餐
   * * * parmer
   */
  export function addComboApi (parmer) {
    return post(`${http}/system/single/addCombo`, parmer);
  }
  /**  修改套餐
   * * * parmer
   */
  export function updateComboApi (parmer) {
    return post(`${http}/system/single/updateCombo`, parmer);
  }

    /****************************************************可选分组设置****************************************************/
/**  查询可选分组
 * * parmer
   *  token:token
   *  name: 名称
   * combo:套餐对应的分组id 来自套餐下拉
   * per_page
   * page
   */
  export function groupListApi (parmer) {
    return post(`${http}/system/single/groupList`, parmer);
  }
  /**  删除可选分组
 * * parmer
   *  token:token
   *  id:分组ID
   */
  export function delGroupApi (parmer) {
    return post(`${http}/system/single/delGroup`, parmer);
  }

      /****************************************************添加/修改可选分组****************************************************/
/**  添加可选分组
 * * parmer
   *  token:token
   */
  export function addGroupApi (parmer) {
    return post(`${http}/system/single/addGroup`, parmer);
  }
  /**  修改可选分组
 * * parmer
   *  token:token
   */
  export function updateGroupApi (parmer) {
    return post(`${http}/system/single/updateGroup`, parmer);
  }
  /**  查询可选分组
 * * parmer
   *  token:token
   */
  export function editGroupApi (parmer) {
    return post(`${http}/system/single/editGroup`, parmer);
  }