/* |-------------------------------------------------------------------------- | 页面 用户管理-菜单管理 |--------------------------------------------------------------------------
| | author：彭浩 | DOTO: 备注 | */
<template>
    <div class="menuManagement">
        <div class="callBackUser">
            <p>
                <el-button type="primary" @click="callBack">返回上一级</el-button>
            </p>
            <p>
                <el-button type="primary" @click="saveBtn">保存</el-button>
            </p>
        </div>
        <div class="menu-title-user">
            <ul>
                <li>菜单信息</li>
                <li>操作权限</li>
            </ul>

            <ul>
                <li>
                    <el-tree v-loading="loading" :data="treeData" @check="changeTree" @node-click="getTreeData" @check-change="getTreeData2" :highlight-current="true" :expand-on-click-node="false"
                        show-checkbox node-key="id" ref="tree" :filter-node-method="filterNode" :default-expanded-keys="defaultChecked"
                        :props="defaultProps">
                    </el-tree>
                </li>
                <li v-if="lastPage">
                    <p v-for="item in checkBoxList" @change="changeCheck">
                        <el-checkbox v-model="item.check">{{item.name}}</el-checkbox>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from "../../service/userManagement/index";
// import $ from 'jquery'
import {
  messageHints,
  duplicateRemoval,
  eachTreeData
} from "../../utils/index";
export default {
  name: "",
  data() {
    return {
        loading:false,
      qufen: "1",
      hideTextArr: [],
      csyData: [],
      parent_id: null,
      checkBoxList: [],
      mathArr:[],
      treeData: [
        //树组件的List
        // {
        //     "id": "30",
        //     "parent_id": null,
        //     "name": "test",
        //     "type": "menu"
        // },
        // {
        //     "id": "1",
        //     "parent_id": "0",
        //     "name": "WEB总部",
        //     "type": "menu",
        //     "_child": [
        //         {
        //             "id": "7",
        //             "parent_id": "1",
        //             "name": "总部下的人事系统",
        //             "type": "menu",
        //             "_child": [
        //                 {
        //                     "id": "8",
        //                     "parent_id": "7",
        //                     "name": "人事系统下权限模块",
        //                     "type": "menu",
        //                     "_child": [
        //                         { name: "增加", id: "1", "type": "false" },
        //                         { name: "删除", id: "2", "type": "false" },
        //                         { name: "导出", id: "3", "type": "false" },
        //                         { name: "导入", id: "4", "type": "false" },
        //                         { name: "查看", id: "5", "type": "false" },
        //                         { name: "审核", id: "6", "type": "false" },
        //                         { name: "查询", id: "7", "type": "false" },
        //                         { name: "打印", id: "8", "type": "false" },
        //                         { name: "增加1", id: "9", "type": "false" },
        //                         { name: "增加3", id: "10", "type": "false" }
        //                     ]
        //                 },
        //                 {
        //                     "id": "11",
        //                     "parent_id": "7",
        //                     "name": "人事系统下的人员页面",
        //                     "type": "menu"
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     "id": "2",
        //     "parent_id": "0",
        //     "name": "WEB门店-平台",
        //     "type": "menu",
        //     "_child": [
        //         {
        //             "id": "12",
        //             "parent_id": "2",
        //             "name": "编码中心_板块",
        //             "type": "menu",
        //             "_child": [
        //                 {
        //                     "id": "13",
        //                     "parent_id": "12",
        //                     "name": "用户信息_模块",
        //                     "type": "menu",
        //                     "_child": [
        //                         {
        //                             "id": "14",
        //                             "parent_id": "13",
        //                             "name": "用户详情_页面",
        //                             "type": "menu",
        //                             "_child": [
        //                                 {
        //                                     "id": "15",
        //                                     "parent_id": "14",
        //                                     "name": "分配权限",
        //                                     "type": "button"
        //                                 },
        //                                 {
        //                                     "id": "16",
        //                                     "parent_id": "14",
        //                                     "name": "清空口令",
        //                                     "type": "button"
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "id": "19",
        //             "parent_id": "2",
        //             "name": "门店运营",
        //             "type": "menu",
        //             "_child": [
        //                 {
        //                     "id": "20",
        //                     "parent_id": "19",
        //                     "name": "存酒管理",
        //                     "type": "menu"
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     "id": "28",
        //     "parent_id": "0",
        //     "name": "人事系统",
        //     "type": "menu",
        //     "_child": [
        //         {
        //             "id": "29",
        //             "parent_id": "28",
        //             "name": "test111",
        //             "type": "menu"
        //         }
        //     ]
        // },
        // {
        //     "id": "3",
        //     "parent_id": "0",
        //     "name": "钉钉手机端",
        //     "type": "menu"
        // },
        // {
        //     "id": "4",
        //     "parent_id": "0",
        //     "name": "钉钉电脑端",
        //     "type": "menu"
        // },
        // {
        //     "id": "5",
        //     "parent_id": "0",
        //     "name": "微信",
        //     "type": "menu"
        // },
        // {
        //     "id": "6",
        //     "parent_id": "0",
        //     "name": "人事系统",
        //     "type": "menu"
        // }
      ],
      defaultProps: {
        //树组件的配置
        children: "_child",
        label: "name",
        visible: "type"
      },
      store: [], //所有数据存放
      treeId: "", //当前选中的树节点的ID
      checkTreeData: "", //当前选中的树节点的所有数据
      checkedList: [], //选中的树节点ID
      lastPage: false, //是否显示操作按钮
      defaultChecked: [], //默认勾选和展开的树
      getCheckedId: [], //获取到所勾选的权限
      isFirst: true, //让获取已有权限只获取一次
      getCheckedBtnId: [], //获取已选中的按钮权限
      filterText: "",
      ary: []
    };
  },
  props: ["routerName", "type"],
  mounted() {
    var that = this;
    this.getpermissionTree().then(() => {
      let _this = this;
      this.filterText = "button";
      this.getArray(this.treeData);
      this.getTreeLastParent(this.treeData);
      setTimeout(function() {
        $(".el-tree-node__label").filter(function() {
            this.mathArr=[];
          if (
            _this.hideTextArr.indexOf($(this).text()) != "-1" &&
            that.hideLastNodeCssMeth($(this).text())
          ) {
            $(this)
              .prev()
              .prev()
              .hide();
          }
        });
      }, 0);
    });

    var data = JSON.parse(this.$route.query.row);
    if (this.type == "角色") {
      this.getRoleCheck({ token: "", role_id: data.role_id }).then(res => {
        // for (var i = 0; i < res.data.length; i++) {
        //     this.getCheckedId.push(res.data[i].power_permission_id)
        //     this.defaultChecked[i] = parseInt(res.data[i].parent_id)
        // }
        // for (var i = 0; i < this.defaultChecked.length; i++) {
        //     for (var j = i + 1; j < this.defaultChecked.length; j++) {
        //         if (this.defaultChecked[i] == this.defaultChecked[j]) {
        //             this.defaultChecked.splice(j, 1)
        //             j--
        //         }
        //     }
        // }
        // for (var i = 0; i < res.data.length; i++) {
        //     this.getCheckedBtnId.push({ ID: res.data[i].parent_id, list: [] })
        //     this.defaultChecked[i] = parseInt(res.data[i].parent_id)
        // }
        // for (var i = 0; i < this.defaultChecked.length; i++) {
        //     for (var j = i + 1; j < this.defaultChecked.length; j++) {
        //         if (this.defaultChecked[i] == this.defaultChecked[j]) {
        //             this.defaultChecked.splice(j, 1)
        //             j--
        //         }
        //     }
        // }
        // for (var i = 0; i < this.getCheckedBtnId.length; i++) {
        //     for (var j = i + 1; j < this.getCheckedBtnId.length; j++) {
        //         if (this.getCheckedBtnId[i].ID == this.getCheckedBtnId[j].ID) {
        //             this.getCheckedBtnId.splice(j, 1)
        //             j--
        //         }
        //     }
        // }

        // for (var i = 0; i < res.data.length; i++) {
        //     for (var j = 0; j < this.getCheckedBtnId.length; j++) {
        //         if (res.data[i].parent_id == this.getCheckedBtnId[j].ID) {
        //             this.getCheckedBtnId[j].list.push(res.data[i].power_permission_id)
        //         }
        //     }

        // }

        if (res.code == 200) {
          var arr = [];
          var checkedLastNode = []; //选中的末级节点
          for (var i = 0; i < res.data.length; i++) {
            arr.push({ ID: res.data[i].parent_id, list: [] });
          }

          for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < res.data.length; j++) {
              for (var a = 0; a < res.data[j].power.length; a++) {
                if (res.data[j].power[a].has_power == 1) {
                  checkedLastNode.push(res.data[j].power[a].id);
                }
                that.defaultChecked.push(arr[i].ID);
                if (arr[i].ID == res.data[j].parent_id) {
                  if (res.data[j].power[a].has_power == 1) {
                    arr[i].list.push({
                      id: res.data[j].power[a].id,
                      name: res.data[j].power[a].name,
                      check: true
                    });
                  } else {
                    arr[i].list.push({
                      id: res.data[j].power[a].id,
                      name: res.data[j].power[a].name,
                      check: false
                    });
                  }
                }
              }
            }
          }

          this.defaultChecked = duplicateRemoval(this.defaultChecked);
          this.store = arr;
          this.checkedList = this.defaultChecked;

          checkedLastNode = duplicateRemoval(checkedLastNode);
          this.$refs.tree.setCheckedKeys(checkedLastNode);
        } else {
          messageHints(res.message, "error");
        }
      });
    } else {
      // for (var i = 0; i < data.power.length; i++) {
      //     this.getCheckedId.push(data.power[i].power_permission_id)
      //     this.defaultChecked[i] = parseInt(data.power[i].parent_id)
      // }
      // for (var i = 0; i < this.defaultChecked.length; i++) {
      //     for (var j = i + 1; j < this.defaultChecked.length; j++) {
      //         if (this.defaultChecked[i] == this.defaultChecked[j]) {
      //             this.defaultChecked.splice(j, 1)
      //             j--
      //         }
      //     }
      // }

      this.getUserPower({ YHBM: data.YHBM }).then(res => {
        if (res.code == 200) {
          var arr = [];
          var checkedLastNode = []; //选中的末级节点
          for (var i = 0; i < res.data.length; i++) {
            arr.push({ ID: res.data[i].parent_id, list: [] });
          }

          for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < res.data.length; j++) {
              for (var a = 0; a < res.data[j].power.length; a++) {
                if (res.data[j].power[a].has_power == 1) {
                  checkedLastNode.push(res.data[j].power[a].id);
                }

                this.defaultChecked.push(arr[i].ID);
                if (arr[i].ID == res.data[j].parent_id) {
                  if (res.data[j].power[a].has_power == 1) {
                    arr[i].list.push({
                      id: res.data[j].power[a].id,
                      name: res.data[j].power[a].name,
                      check: true
                    });
                  } else {
                    arr[i].list.push({
                      id: res.data[j].power[a].id,
                      name: res.data[j].power[a].name,
                      check: false
                    });
                  }
                }
              }
            }
          }
          that.defaultChecked = duplicateRemoval(that.defaultChecked);
          that.store = arr;
          that.checkedList = that.defaultChecked;
          checkedLastNode = duplicateRemoval(checkedLastNode);
          // for (var i = 0; i < checkedLastNode.length; i++) {
          //     if (checkedLastNode[i].id == 203) {
          //     }

          // }
          that.$refs.tree.setCheckedKeys(checkedLastNode);
        } else {
          messageHints(res.message, "error");
        }
      });
      // for (var i = 0; i < data.power.length; i++) {
      //     this.getCheckedBtnId.push({ ID: data.power[i].parent_id, list: [] })
      //     this.defaultChecked[i] = parseInt(data.power[i].parent_id)
      // }

      // for (var i = 0; i < this.getCheckedBtnId.length; i++) {
      //     for (var j = i + 1; j < this.getCheckedBtnId.length; j++) {
      //         if (this.getCheckedBtnId[i].ID == this.getCheckedBtnId[j].ID) {
      //             this.getCheckedBtnId.splice(j, 1)
      //             j--
      //         }
      //     }
      // }
      // for (var i = 0; i < data.power.length; i++) {
      //     for (var j = 0; j < this.getCheckedBtnId.length; j++) {
      //         if (data.power[i].parent_id == this.getCheckedBtnId[j].ID) {
      //             this.getCheckedBtnId[j].list.push(data.power[i].power_permission_id)
      //         }
      //     }

      // }

      // this.getLastTreeNode()
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {

    eachTreeData1(data, name, value, childName) {
      var taht = this;
      if (data) {
        data.forEach(item => {
          if (item[name] == value) {
            taht.mathArr = item;
          } else if (item[childName]) {
              taht.eachTreeData1(item[childName], name, value, childName)
          }
        });
      }
    },

    hideLastNodeCssMeth(name) {
        let result= false;
      this.eachTreeData1(this.treeData, "name", name, "_child");
      if(this.mathArr._child){
          if(this.mathArr._child[0].type == 'button'){
               result=true;
          }
      }
      return result
    },

    /**
     *   递归获取到所有末级节点的父级
     */
    getTreeLastParent(data) {
      for (var i in data) {
        if (data[i].lastParentPage) {
          this.hideTextArr.push(data[i].name);
        }

        this.getTreeLastParent(data[i]._child);
      }
    },
    /**
     *   递归获取到所有末级节点的父ID
     */
    getArray(data) {
      for (var i in data) {
        if (data[i]._child == undefined) {
          this.ary.push(data[i].parent_id);
        }

        this.getArray(data[i]._child);
      }
      this.addType(this.treeData);
    },
    /**
     *   递归给所有末级节点的父级添加标识
     */
    addType(data) {
      for (var i in data) {
        for (var j = 0; j < this.ary.length; j++) {
          if (data[i].id == this.ary[j]) {
            data[i].lastParentPage = true;
            break;
          }
        }
        this.addType(data[i]._child);
      }
    },

    filterNode(value, data, node) {
      return data.type != value;
      // return true
    },
    //////////////////////////////////////////////调用API函数//////////////////////////////////////////////
    /**
     *   获取权限树
     * @param  token   :  token
     */
    async getpermissionTree() {
        this.loading =true;
      var callBackData = await api.GetpermissionTree();
      if (callBackData.code == 200) {
        this.treeData = callBackData.data;
      }
      this.loading=false;
    },
    /**
     *   获取某个页面下的按钮权限
     * @param token      	是	string	token
     * @param parent_id	是	string	权限树接口列表的id
     */
    async getPageJurisdiction(data) {
      var callBackData = await api.GetPageJurisdiction(data);
      return callBackData;
    },
    /**
            *  修改管理员权限接口(用户管理)
            * @param  data   :  token	是	string	token
                                YHBM	是	string	管理员编码
                                powers	是	string	权限，用英文逗号链接 如 1,2,3
            */
    async updateUserJurisdiction(data) {
      var callBackData;
      callBackData = await api.UpdateUserJurisdiction(data);
      return callBackData;
    },
    /**
     *   角色权限更新（菜单管理 -----角色）
     * @param token	        是	string	token
     * @param role_id	    是	string	角色id
     * @param permissions	是	string	权限id, 英文逗号隔开 如 1,2,3
     */
    async updateRolePermission(data) {
      var callBackData;
      callBackData = await api.UpdateRolePermission(data);
      return callBackData;
    },
    /**
     *   查询角色拥有的权限接口
     * @param token	是	string	token
     * @param role_id	是	string	角色id
     */
    async getRoleCheck(data) {
      var callBackData;
      callBackData = await api.GetRoleCheck(data);
      return callBackData;
    },
    /**
     *   查询管理员拥有的权限(人员)
     * @param token	是	string	token
     * @param YHBM	是	string	管理员编码
     */
    async getUserPower(data) {
      var callBackData;
      callBackData = await api.GetUserPower(data);
      return callBackData;
    },

    //////////////////////////////////////////////触发函数//////////////////////////////////////////////
    /**
     *   改变树某个节点的check时获取这个节点的数据
     * @param  e   :该节点的数据
     * @param  data   :此节点的详情
     */
    changeTree(e, data) {
      this.isFirst = false;
      if (e.lastParentPage == undefined) {
        this.lastPage = false;
      } else {
        this.lastPage = true;
      }
      this.treeId = e.id;
      this.checkTreeData = e;
      this.checkedList = this.$refs.tree.getCheckedKeys();
      var checked = false;
      for (var i = 0; i < this.checkedList.length; i++) {
        if (this.checkedList[i] == e.id) {
          checked = true;
          break;
        } else {
          checked = false;
        }
      }

      this.storePush(checked).then(() => {
        for (var i = 0; i < this.store.length; i++) {
          if (this.store[i].ID == e.id) {
            for (var j = 0; j < this.store[i].list.length; j++) {
              this.store[i].list[j].check = checked;
            }
          }
        }
      });
    },

    getTreeData2(e, node) {
      if (this.qufen == "1" && e.id == this.$refs.tree.getCurrentKey()) {
        var checked = false;
        this.checkedList = this.$refs.tree.getCheckedKeys();
        for (var i = 0; i < this.checkedList.length; i++) {
          if (this.checkedList[i] == e.id) {
            checked = true;
            break;
          } else {
            checked = false;
          }
        }
        for (var i = 0; i < this.store.length; i++) {
          if (this.store[i].ID == e.id) {
            for (var j = 0; j < this.store[i].list.length; j++) {
              this.store[i].list[j].check = checked;
            }
          }
        }
      }
      this.qufen = "1";
    },
    /**
     *   点击树某个节点获取这个节点的数据
     * @param  e   :该节点的数据
     */
    getTreeData(e, node) {
      console.log(this.$refs.tree.getCheckedKeys());
      var checked = false;
      this.checkedList = this.$refs.tree.getCheckedKeys();
      for (var i = 0; i < this.checkedList.length; i++) {
        if (this.checkedList[i] == e.id) {
          checked = true;
          break;
        } else {
          checked = false;
        }
      }
      for (var i = 0; i < this.store.length; i++) {
        if (this.store[i].ID == e.id) {
          for (var j = 0; j < this.store[i].list.length; j++) {
            this.store[i].list[j].check = checked;
          }
        }
      }

      if (e.lastParentPage == undefined) {
        this.lastPage = false;
      } else {
        this.lastPage = true;
      }
      this.checkTreeData = e;
      this.treeId = e.id;
      var bool = false;
      this.storePush(false).then(() => {
        for (var i = 0; i < this.store.length; i++) {
          if (e.id == this.store[i].ID) {
            for (var j = 0; j < this.store[i].list.length; j++) {
              if (this.store[i].list[j].check == true) {
                bool = true;
                break;
              } else {
                bool = false;
              }
            }
          }
        }
        // this.checkedList
        // var ary = this.$refs.tree.getCheckedNodes();  //返回所有选中的节点
        // for (var key in ary) {
        //     this.checkedList.push(ary[key].parent_id)   //得到末级父级的节点ID数组
        // }

        // this.checkedList = duplicateRemoval(this.checkedList)     //去重
        // var ary1 = this.$refs.tree.getHalfCheckedKeys()   //返回所有半选节点

        // for (var i = 0; i < this.checkedList.length; i++) {
        //     if (ary1.indexOf(this.checkedList[i]) != -1) {
        //         this.checkedList.splice(i, 1);
        //         i--
        //     }
        // }

        if (bool == false) {
          var trueOrFalse = false;
          for (var i = 0; i < this.checkedList.length; i++) {
            if (e.id == this.checkedList[i]) {
              trueOrFalse = true;
              break;
            } else {
              trueOrFalse = false;
            }
          }

          for (var i = 0; i < this.store.length; i++) {
            for (var a = 0; a < this.store[i].list.length; a++) {
              if (this.store[i].ID == e.id && trueOrFalse) {
                this.store[i].list[a].check = true;
              } else {
              }
            }
          }
        }
      });
    },
    /**
     *   将数据存入sstore
     * @param  checked   :选择的树节点是否是选中状态
     */
    async storePush(checked) {
      var getTreeCheckList = this.$refs.tree.getCheckedKeys(true);
      for (var i = 0; i < this.store.length; i++) {
        for (var j = 0; j < getTreeCheckList.length; j++) {
          for (var a = 0; a < this.store[i].list.length; a++) {
            if (this.store[i].list[a].id == getTreeCheckList[j]) {
              this.store[i].list[a].check = true;
            }
          }
        }
      }

      this.checkBoxList = [];
      if (this.store.length < 1) {
        await this.getPageJurisdiction({
          token: "",
          parent_id: this.treeId
        }).then(res => {
          if (res.code == 200) {
            var bool = false;
            this.checkBoxList = res.data;
            this.store.push({ ID: this.treeId, list: this.checkBoxList });
          }
        });
      } else {
        var trueOrFalse = false;
        for (var i = 0; i < this.store.length; i++) {
          if (this.store[i].ID == this.treeId) {
            trueOrFalse = false;
            this.checkBoxList = this.store[i].list;
            break;
          } else {
            trueOrFalse = true;
          }
        }
        if (trueOrFalse) {
          await this.getPageJurisdiction({
            token: "",
            parent_id: this.treeId
          }).then(res => {
            if (res.code == 200) {
              var bool = false;
              if (this.store.length > 0) {
                for (var i = 0; i < this.store.length; i++) {
                  if (this.store[i].ID == this.treeId) {
                    bool = true;
                    break;
                  } else {
                    bool = false;
                  }
                }
                if (bool) {
                  for (var i = 0; i < this.store.length; i++) {
                    for (var j = 0; j < res.data.length; j++) {
                      if (res.data[i].check == undefined) {
                        res.data[i].check = false;
                      }
                      for (var a = 0; a < this.store[i].list.length; a++) {
                        if (res.data[j].id == this.store[i].list[a]) {
                          if (checked) {
                            res.data[j].check = true;
                          }
                        }
                      }
                    }
                  }
                } else {
                  for (var b = 0; b < res.data.length; b++) {
                    if (res.data[b].check == undefined) {
                      if (checked) {
                        res.data[b].check = true;
                      } else {
                        res.data[b].check = false;
                      }
                    }
                  }
                }
              } else {
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].check == undefined) {
                    if (checked) {
                      res.data[i].check = true;
                    } else {
                      res.data[i].check = false;
                    }
                  }
                }
              }
              var checkedTree = false;
              this.checkBoxList = res.data;
              this.store.push({ ID: this.treeId, list: this.checkBoxList });
              // var ary = this.$refs.tree.getCheckedKeys()

              // for (var i = 0; i < ary.length; i++) {
              //     if (ary[i] == this.treeId) {
              //         checkedTree = true
              //         break;
              //     } else {
              //         checkedTree = false
              //     }
              // }
              // if (checkedTree == false) {
              //     for (var j = 0; j < this.store.length; j++) {
              //         for (var a = 0; a < this.store[j].list.length; a++) {
              //             for (var b = 0; b < res.data.length; b++) {
              //                 if (this.store[j].list[a].id == res.data[b].id) {
              //                     this.store[j].list[a].check = false
              //                 }
              //             }
              //         }
              //     }
              // }
            }
          });
        }
      }
    },

    /*
            *  点击多选框触发
            * @param  none
            */
    changeCheck() {
      this.qufen = "2";
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };

      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      var bool = false;
      for (var i = 0; i < this.store.length; i++) {
        if (this.store[i].ID == this.treeId) {
          this.store[i].list = this.checkBoxList;
        }
      }
      var checkedAry = this.$refs.tree.getCheckedKeys(true);
      for (var j = 0; j < checkedAry.length; j++) {
        for (var i = 0; i < this.checkBoxList.length; i++) {
          if (checkedAry[j] == this.checkBoxList[i].id) {
            checkedAry.splice(j, 1);
            j--;
          }
        }
      }
      for (var i = 0; i < this.checkBoxList.length; i++) {
        if (this.checkBoxList[i].check) {
          checkedAry.push(this.checkBoxList[i].id);
        }
      }
      this.$refs.tree.setCheckedKeys(checkedAry);

      // for (var i = 0; i < this.checkBoxList.length; i++) {
      //     if (this.checkBoxList[i].check == true) {
      //         bool = true
      //         break;
      //     } else {
      //         bool = false
      //     }
      // }

      // if (bool) {
      //     this.checkedList.push(this.treeId)
      // } else {

      //     this.checkedList.remove(this.treeId)
      // }
      // this.checkedList = duplicateRemoval(this.checkedList)

      // this.$refs.tree.setCheckedKeys(this.checkedList)
    },
    /*
            *  保存按钮
            * @param  none
            */
    saveBtn() {
      var data = JSON.parse(this.$route.query.row);
      var arr1 = [];
      for (var i = 0; i < this.store.length; i++) {
        for (var j = 0; j < this.store[i].list.length; j++) {
          for (var a = 0; a < this.getCheckedId.length; a++) {
            if (this.store[i].list[j].id == this.getCheckedId[a]) {
              if (this.store[i].list[j].check == false) {
                this.getCheckedId.splice(a, 1);
                a--;
              }
            }
          }
        }
      }
      for (var i = 0; i < this.store.length; i++) {
        for (var j = 0; j < this.store[i].list.length; j++) {
          if (this.store[i].list[j].check) {
            arr1.push(this.store[i].list[j].id);
          }
        }
      }

      for (var i = 0; i < this.getCheckedId.length; i++) {
        arr1.push(this.getCheckedId[i]);
      }
      for (var i = 0; i < arr1.length; i++) {
        for (var j = i + 1; j < arr1.length; j++) {
          if (arr1[i] == arr1[j]) {
            arr1.splice(j, 1);
            j--;
          }
        }
      }
      var arr2 = this.$refs.tree.getCheckedKeys();
      var arr3 = this.$refs.tree.getHalfCheckedKeys();
      arr2 = arr2.concat(arr1);
      arr2 = arr2.concat(arr3);

      // 去重操作 by薛帅
      Array.prototype.distinct = function() {
        var arr = this,
          result = [],
          i,
          j,
          len = arr.length;
        for (i = 0; i < len; i++) {
          for (j = i + 1; j < len; j++) {
            if (arr[i] == arr[j]) {
              j = ++i;
            }
          }
          result.push(arr[i]);
        }
        return result;
      };
      arr2 = arr2.distinct();
      //测试过程中发现下面代码的data出现过更新不及时的问题，by 薛帅
      setTimeout(() => {
        if (this.type == "角色") {
          this.updateRolePermission({
            role_id: data.role_id,
            permissions: arr2.join()
          }).then(res => {
            if (res.code == 200) {
              messageHints(res.data, "success");
            } else {
              messageHints(res.message, "error");
            }
          });
        } else {
          this.updateUserJurisdiction({
            YHBM: data.YHBM,
            powers: arr2.join()
          }).then(res => {
            if (res.code == 200) {
              messageHints(res.data, "success");
            } else {
              messageHints(res.message, "error");
            }
          });
        }
        this.$emit("toUpdate", true);
      }, 100);
    },
    /*
            *  返回上一级
            * @param  none
            */
    callBack() {
      this.$emit("toUpdate", true);
      this.$router.push(`/home/${this.routerName}`);
    }
  }
};
</script>
<style lang="less">
.menuManagement {
  .callBackUser {
    margin-left: 20px;
    display: flex;
    margin-bottom:20px;
    p:nth-child(2) {
      margin-left: 15px;
    }
  }
  .menu-title-user {
    ul:nth-child(1) {
      display: flex;
      height: 52px;
      margin-left: 20px;
      background-color: #5ba7f2;
      color: #fff;
      li:nth-child(1) {
        width: 33%;
        text-align: center;
        line-height: 52px;
        border-right: 1px solid #c9c9c9;
      }
      li:nth-child(2) {
        width: 66%;
        text-align: center;
        line-height: 52px;
      }
    }
    ul:nth-child(2) {
      padding: 0;
      /*margin-top: -13px;*/
      margin-left: 20px;
      display: flex;
      li {
        padding-top: 13px;
      }
      li:nth-child(1) {
        font-size: 21px;
        width: 33%;
        border-right: 1px solid #ebebeb;
        max-height: 700px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
      li:nth-child(2) {
        width: 66%;
        display: flex;
        flex-wrap: wrap;
        padding-top: 50px;
        padding-left: 60px;
        p {
          width: 200px;
          height: 50px;
          text-align: center;
        }
      }
    }
  }
  .el-tree-node__content {
    height: 45px !important;
}
}
</style>