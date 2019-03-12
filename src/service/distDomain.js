/*
* 在此处添加生产环境前端页面资源的一级域名，例如：domain.com
* 单点登录的平台必须在同一个一级域名下
* */
let url = location.host;

let domain = '';
if (url.indexOf('localhost') >= 0) {
    domain = 'localhost'
}
if (url.indexOf('kx910') >= 0) {
    domain = '.kx910.com'
}
if (url.indexOf('kqmis') >= 0) {
    domain = '.kqmis.com'
}
export {domain}