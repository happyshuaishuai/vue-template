/**
 * 后端API 开发环境\测试环境\线上环境
 */
let url = location.host;
let reHttp = 'http://crmapi.kqmis.com';
let domain = '';
if (url.indexOf('localhost:8') >= 0 ) {
    reHttp = '/api';
    domain = '.kqmis.com'
}else if(url.indexOf('192.168.188.116') >= 0){
    reHttp = 'http://192.168.188.116:81';
}else if(url.indexOf('192.168.188.216') >= 0){
    reHttp = 'http://192.168.188.216:81';
}
export default reHttp