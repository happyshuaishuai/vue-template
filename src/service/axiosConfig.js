import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import md5 from 'js-md5';
import Vue from 'vue';
import {confirmFun} from "../utils/index.js"
import reHttp from "../service/http.js"
// console.log(store,"sssss")

// axios 配置
// axios.defaults.timeout = 5000; //延迟模拟
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://newtest.kqmis.com/personal';

//POST传参序列化，以及全局token
axios.interceptors.request.use((config) => {

    //  config.headers['Access-Control-Allow-Origin'] = '*';
    //  config.headers['Access-Control-Allow-Methods']='POST';
    //  config.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type';

    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }

    return config;
}, (error) => {   // 这里是返回状态码不为200时候的错误处理
    // console.log(error, "error")
    return Promise.reject(error);
});

// 添加请求拦截器 (可以在这里加token， config.headers.Authorization = `token ${store.state.token}`)
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么(status == 200)
    return config;
}, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.code == 300 && response.data.error.msg == "登录已过期") {
        confirmFun("登录已过期，请重新登录", "warning", () => {
            location.href="http://"+location.host;
        });
        return response;
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么(status != 200)
    return Promise.reject(error);
});


export function post(url, params) {
    // console.log(url,"ajax_url")

    let access = true;// 该接口是否有权限
    // if (url.indexOf("/login") != -1) {
    //     access = true;
    // } else {
    //     for (var i = 0; i < store.state.login.userInfo[3].length; i++) {
    //         if (url.indexOf(store.state.login.userInfo[3][i]) != -1 && store.state.login.userInfo[3][i] != "/") {
    //             access = true;
    //             break;
    //         } else {
    //             access = false;
    //         }
    //     };
    // }

    if ( !!access ) {
        // if (store.state.login.userInfo.YHBM && params) {
        if ( params && !params.token) {
            params.token =localStorage.userInfo ? JSON.parse(localStorage.userInfo).token:'' || store.state.login.userInfo.token ;
        } else if (!params) {
            let par = {
                token:  localStorage.userInfo ? JSON.parse(localStorage.userInfo).token:'' || store.state.login.userInfo.token ||'',
            }
            params = par;
        }
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } else {
        confirmFun("对不起，没有授予您该功能的权限", "warning")
    }


}

export function get(url, params) {

    // console.log(url,"ajax_url")

    let access = true;// 该接口是否有权限
    // for (var i = 0; i < store.state.login.userInfo[3].length; i++) {
    //     if (url.indexOf(store.state.login.userInfo[3][i]) != -1 && store.state.login.userInfo[3][i] != "/") {
    //         access = true;
    //         break;
    //     } else {
    //         access = false;
    //     }
    // };

    if ( !!access ) {
        let link = url.indexOf('?') >= 0 ? '&' : '?';
        if (store.state.login.userInfo.token) {
            console.log(store.state.login.userInfo.token)
            url = `${url}${link}token=${store.state.login.userInfo.token}`;
        }
    
        return new Promise((resolve, reject) => {
            axios.get(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch(error => {
                    reject(error)
                })
        })
    } else {
        confirmFun("对不起，没有授予您该功能的权限", "warning")
    }

}

export function gPost(o) {
    return new Promise((resolve, reject) => {
        o.method = 'post';
        axios.request(o)
            .then(
                res => {
                    resolve(res.data);
                }, err => {
                    reject(err);
                })
            .catch(error => {
                reject(error)
            })
    })
}

export default {
    get,
    post,
    gPost
}
