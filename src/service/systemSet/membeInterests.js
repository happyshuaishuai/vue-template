import {get,post} from "../axiosConfig.js";
import http from "../http.js";

  /*********************************************************** 等级管理  ***********************************************************/


  /**  获取等级列表
   * parmer
   *  token:token
   */
  export function MemberGradeIndexApi (parmer) {
    return get(`${http}/reserve/reserve/MemberGradeIndex`);
  }
   /**  删除等级
   * parmer
   *  token:token
   * id：等级ID
   */
  export function MemberGradeDelesApi (parmer) {
    return post(`${http}/reserve/reserve/MemberGradeDeles`,parmer);
  }
  /**  切换等级状态
   * parmer
   *  token:token
   * id：等级ID
   */
  export function MemberGradeSwitchApi (parmer) {
    return post(`${http}/reserve/reserve/MemberGradeSwitch`,parmer);
  }
  /**  添加等级
   * parmer
   *  token:token
   */
  export function MemberGradeAddApi (parmer) {
    return post(`${http}/reserve/reserve/MemberGradeAdd`,parmer);
  }
  /**  修改等级
   * parmer
   *  token:token
   */
  export function MemberGradeUpdateApi (parmer) {
    return post(`${http}/reserve/reserve/MemberGradeDetails`,parmer);
  }
   /**  获取等级信息
   * parmer
   *  token:token
   */
  export function MemberGradeDetailsApi (parmer) {
    return get(`${http}/reserve/reserve/MemberGradeDetails?id=${parmer.id}`);
  }



   /********************************************** 积分成长规则  ***********************************************************/


  /**  获取配置文件
   * parmer
   *  token:token
   */
  export function MemberIntegralConfigDetailsApi (parmer) {
    return get(`${http}/reserve/reserve/MemberIntegralConfigDetails`);
  }
  /**  获取配置文件
   * parmer
   *  token:token
   */
  export function MemberIntegralConfigEditApi (parmer) {
    return post(`${http}/reserve/reserve/MemberIntegralConfigDetails`,parmer);
  }

      /********************************************** 储值赠送  ***********************************************************/


  /**  会员储值赠送列表
   * parmer
   *  token:token
   */
  export function MemberValueGiveIndexApi (parmer) {
    return get(`${http}/reserve/reserve/MemberValueGiveIndex`);
  }
  /**  删除储值赠送
   * parmer
   *  token:token
   * id:储值ID
   */
  export function MemberValueGiveDelesApi (parmer) {
    return post(`${http}/reserve/reserve/MemberValueGiveDeles`,parmer);
  }
  /**  添加储值赠送
   * parmer
   *  token:token
   * id:储值ID
   */
  export function MemberValueGiveAddApi (parmer) {
    return post(`${http}/reserve/reserve/MemberValueGiveAdd`,parmer);
  }
  /**  修改储值赠送
   * parmer
   *  token:token
   * id:储值ID
   */
  export function MemberValueGiveUpdateApi (parmer) {
    return post(`${http}/reserve/reserve/MemberValueGiveDetails`,parmer);
  }
  /**  获取储值赠送详情
   * parmer
   *  token:token
   * id:储值ID
   */
  export function MemberValueGiveInfoApi (parmer) {
    return get(`${http}/reserve/reserve/MemberValueGiveDetails?id=${parmer.id}`);
  }
  /**  修改消费顺序
   * parmer
   *  token:token
   */
  export function MemberConsumptionConfigUpdateApi (parmer) {
    return post(`${http}/reserve/reserve/MemberConsumptionConfigDetails`,parmer);
  }
  /**  获取消费顺序
   * parmer
   *  token:token
   */
//   export function MemberConsumptionConfigInfoApi (parmer) {
//     return get(`${http}/reserve/reserve/MemberConsumptionConfigDetails`);
//   }

    /********************************************** 会员营销  ***********************************************************/


  /**  会员营销列表
   * parmer
   *  token:token
   */
  export function MemberMarketingIndexApi (parmer) {
    return get(`${http}/reserve/reserve/MemberMarketingIndex?page=${parmer.page}&per_page=${parmer.per_page}`);
  }

   /**  添加会员营销
   * parmer
   *  token:token
   */
  export function MemberMarketingAddApi (parmer) {
    return post(`${http}/reserve/reserve/MemberMarketingAdd`,parmer);
  }

   /**  修改会员营销
   * parmer
   *  token:token
   */
  export function MemberMarketingUpdateApi (parmer) {
    return post(`${http}/reserve/reserve/MemberMarketingDetails`,parmer);
  }
  /**  获取会员营销详情
   * parmer
   *  token:token
   */
  export function MemberMarketingdetailsApi (parmer) {
    return get(`${http}/reserve/reserve/MemberMarketingDetails?id=${parmer.id}`);
  }
  /**  切换会员营销状态
   * parmer
   *  token:token
   */
  export function MemberMarketingSwitchApi (parmer) {
    return post(`${http}/reserve/reserve/MemberMarketingSwitch?`,parmer);
  }
   /**  获取会员列表
   * parmer
   *  token:token
   */
  export function MemberIndexApi (parmer) {
    return post(`${http}/reserve/reserve/MemberIndex?`,parmer);
  }
  /**  发券
   * parmer
   *  token:token
   */
  export function MemberVoucherdateApi (parmer) {
    return post(`${http}/reserve/reserve/MemberVoucherdate?`,parmer);
  }



  