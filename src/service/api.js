import {get, post, gPost} from './axiosConfig'
import reHttp from './http'

/******************** 登录 ********************/
/**
 * 登录
 */
export function loginHandle(mobile, password) {
    return post(`${reHttp}/personal/login`, {mobile: mobile, password: password, system: 'crmsys'})
}

/**
 * 单点登录
 */
export function signLoginHandle(timestamp, mobile, signature) {
    //return get('/api/personal/login?timestamp='+timestamp+'&mobile='+mobile+'&signature='+signature)
    return get(`${reHttp}/personal/login?timestamp=${timestamp}&mobile=${mobile}&signature=${signature}&system=crmsys`)
}

/******************** 头部 ********************/
/**
 * 修改密码
 */
export function updatePassword(submitData) {
    return post(`${reHttp}/api/basics/update_password`, submitData)
}

export default {
    loginHandle,
    updatePassword,
    signLoginHandle
}

/******************** 全局 ********************/
/**
 * 二维码获取
 */
export function getQRcode(submitData) {
    return post(`${reHttp}/api/crm/member_QRcode`, submitData)
}


/***************************************************************/

//登录，拿到token
export function loginCenter(mobile, password) {
    return gPost({
        url: `http://crmapi.kx910.com/api/basics/auth`,
        data: {
            mobile: mobile, password: password
        }
    })
}

//获取业务数据
export function getPowerList(domain, token) {
    return gPost({
        url: `http://crmapi.kx910.com/api/basics/power_list`,
        data: {
            domain,
            authorization: token
        },

    })
}


