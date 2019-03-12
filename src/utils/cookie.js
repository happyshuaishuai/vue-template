export function setCookie(cname, cvalue, exdays,domain) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = `expires=${d.toGMTString()}`
    // document.cookie = `${cname}=${cvalue}; ${expires}`
    document.cookie = `${cname}=${cvalue};${expires};domain=${domain};path=/`

}
  
  export  function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  }
  
  export function getAllCookie() {
    let cookieStr = document.cookie
    return cookieStr.split(";")
      .map((v) => v.replace(/^\s/, "").split("="))
      .reduce((x, y) => {
        let [k, v] = y
        x[k] = v
        return x
      }, {})
  }
  
  export function clearAllCookie(){ 
    let keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
      for (var i = keys.length; i--;) 
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    } 
  }

export default {
    setCookie,
    getCookie,
    getAllCookie,
    clearAllCookie
}