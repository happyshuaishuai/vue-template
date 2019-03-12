/**
 * uEditor地址
 * 后端API 开发环境\测试环境\线上环境
 */
let url = location.host;
let reHttp = 'http://crmb.test.com';
let uEditorUrl = '';
if (url == 'localhost:8888' || url == '192.168.188.65:8001') {
    //需要配置 url 的子域名
    uEditorUrl = 'http://crm.test.com/up';

} else if (url == 'crm.test.com') {
    //需要配置 url 的子域名
    uEditorUrl = 'http://crm.test.com/up';

} else if (url == 'rs2.kx910.com') {
    //需要配置 url 的子域名
    uEditorUrl = 'http://rs2.kx910.com/up';

}

export default uEditorUrl