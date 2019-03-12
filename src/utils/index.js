import store from "../vuex/store";
import { MessageBox, Message } from "element-ui";
import { get, post } from "../service/axiosConfig";
import { getQRcode } from "../service/api.js";
import reHttp from "../service/http";
/**
 * 检测角色是否有某个操作权限
 * @param APPID
 * @param
 * @param
 * @returns {boolean}
 */

export function havePower(APPID) {
  const powerData = store.state.login.authority.data; //[obj,obj..]
  const havePower = powerData.some((item, index) => {
    if (item.APPID == APPID) {
      return true;
    }
  });
  return havePower;
}

/**
 * 检测角色当前的权限列表
 * @param APPID
 * @param
 * @param
 * @returns {boolean}
 */

export function powerList() {
  const powerData = store.state.login.authority.data; //[obj,obj..]
  const powerLists = powerData.map((item, index) => {
    return item.MC;
  });
  // console.log(powerLists)
  return powerLists;
}

/**
 * 时间格式化
 */
export function getNowFormatDate(date) {
  // console.log(date)
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hours = date.getHours();

  let minutes = date.getMinutes();
  let secondes = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (secondes >= 0 && secondes <= 9) {
    secondes = "0" + secondes;
  }
  let currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    hours +
    seperator2 +
    minutes +
    seperator2 +
    secondes;
  return currentdate;
}

/**
 * 消息提示框
 */
export function openMessgeTip(message, title) {
  MessageBox.alert(message, title, {
    confirmButtonText: "确定",
    callback: action => {}
  });
}

/**
 * 确认消息
 */
export function confirmFun(message, type, callback) {
  MessageBox.confirm(message, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type
  })
    .then(() => {
      callback();
    })
    .catch(() => {});
}

/**
 *无需确认消息提示框 1秒后自动关闭
 */
export function messageHints(message, type) {
  Message({
    message: message,
    type: type,
    duration: 1000
  });
}

export function eachTreeData(data, name, value, childName) {
  let result = [];
  if (data) {
    data.forEach(function(item) {
      if (item[name] == value) {
        result.push(item);
      } else if (item[childName]) {
        result = result.concat(
          eachTreeData(item[childName], name, value, childName)
        );
      }
    });
  }
  return result;
}

export function eachTreeData2(data, name, value, childName) {
  let result = [];
  if (data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i][name] == value && data[i]["power_permission_id"] != "") {
        result.push(value);
      }
      if (data[i][childName]) {
        result = result.concat(
          eachTreeData2(data[i][childName], name, value, childName)
        );
      }
    }
  }
  return result;
}
/**
 *判断字符串个数
 */
export function limitLength(str, byteLength) {
  let newStr = str.replace(/[^\x00-\xff]/g, "**");
  let length = newStr.length;
  if (length * 1 <= byteLength * 1) {
    return true;
  }
  let limitDate = newStr.substr(0, byteLength);
  let count = 0;
  let limitvalue = "";
  for (let i = 0; i < limitDate.length; i++) {
    let flat = limitDate.substr(i, 1);
    if (flat == "*") {
      count++;
    }
  }
  let size = 0;
  let istar = newStr.substr(byteLength * 1 - 1, 1);
  if (count % 2 == 0) {
    //当为偶数时
    size = count / 2 + (byteLength * 1 - count);
    limitvalue = str.substr(0, size);
  } else {
    //当为奇数时
    size = (count - 1) / 2 + (byteLength * 1 - count);
    limitvalue = str.substr(0, size);
  }
  return false;
}

export function saoMaGun(callBack) {
  let codeString = "";
  let lastTime;
  let that = this;
  document.onkeydown = function(e) {
    let code = e.which;
    let nextTime = new Date().getTime();
    // ps：数字开头和字母开头，有区别
    if (codeString == "") {
      console.log(String.fromCharCode(code), "String.fromCharCode(code)");
      if (code != 16) {
        codeString += String.fromCharCode(code);
      }
    }
    // 时间间隔判断，是键盘输入，还是扫码枪输入的。
    if (nextTime - lastTime <= 30) {
      if (code != 16) {
        codeString += String.fromCharCode(code);
      }
    }
    lastTime = nextTime;
  };
  document.onkeypress = async function(e) {
    let param = "";
    if (e.which == 13) {
      param = {
        QRcode: codeString.toString()
      };
      let csyData = null;
      const { data: data1 } = await getQRcode(param);
      if (data1.member_code == "") {
        param.QRcode = param.QRcode.slice(1);
        const { data: data2 } = await getQRcode(param);
        csyData = data2;
        if (csyData == "") {
          Message({
            message: "扫码未读取成功，请重新扫码",
            duration: 1000
          });
        }
      } else {
        console.log(param.slice(1), "data1.member_code != ''");
        csyData = data1;
      }
      callBack(csyData.member_code);
      // console.log(codeString,"扫码枪第一次扫出的加密值")
      codeString = "";
      param = "";
      codeString = "";
      param = "";
      lastTime = "";
    }
    param = "";
  };
}
/**
 *数组去重
 */
export function duplicateRemoval(ary) {
  for (var i = 0; i < ary.length; i++) {
    for (var j = i + 1; j < ary.length; j++) {
      if (ary[i] == ary[j]) {
        ary.splice(j, 1);
        j--;
      }
    }
  }
  return ary;
}

/**封装element tree组件 node-click 方法
 * @param 传递给 data 属性的数组中该节点所对应的对象，this.$refs.tree
 * @param 节点对应的 Node
 * @param 是否展开
 * returns 返回值的类型 {obj}
 */
export function rewrite_node_click1(theTree, chilNode, alwaysExpand) {
  var store = theTree.store;
  store.setCurrentNode(chilNode);
  theTree.$emit(
    "current-change",
    store.currentNode ? store.currentNode.data : null,
    store.currentNode
  );
  if (alwaysExpand) {
    if (theTree.currentNode.expanded) {
    } else {
      theTree.currentNode.handleExpandIconClick();
    }
  } else {
    if (theTree.expandOnClickNode) {
      theTree.currentNode.handleExpandIconClick();
    }
  }
  theTree.$emit("node-click", chilNode.data, chilNode, theTree);
}

export function rewrite_node_click(theTree, chilNode, alwaysExpand) {
        const store = theTree.store;
        store.setCurrentNode(chilNode);
        theTree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
        theTree.currentNode = that;
        if (theTree.expandOnClickNode) {
            theTree.currentNode.handleExpandIconClick();
        }
        if (theTree.checkOnClickNode && !chilNode.disabled) {
            theTree.currentNode.handleCheckChange(null, {
            target: { checked: !chilNode.checked }
          });
        }
        theTree.$emit("node-click", chilNode.data, chilNode, theTree);
  }

export default {
  havePower,
  powerList,
  getNowFormatDate,
  openMessgeTip,
  messageHints,
  confirmFun,
  eachTreeData,
  saoMaGun,
  limitLength,
  duplicateRemoval,
  eachTreeData2,
  rewrite_node_click
};
