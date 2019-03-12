/*
|--------------------------------------------------------------------------
| 组件 数据分析定制table表格
|--------------------------------------------------------------------------
| 
| author：薛帅
| data： tableData
| DOTO:  数据分析定制table表格组件
|
*/
<template>
    <div>
    <table class="zxTable" border="1" v-for="(item_,index_) in num" style="margin-bottom:10px;float: left;">
      <tr v-for="item in tableData">
        <td style="width:120px" class="column" v-if="item.name !=''">{{item.name}}</td>
         <td style="width:120px" v-for="(childData,index) in item.data" v-if="index  == index_*row_number">{{childData.value}} </td>
        <td style="width:120px" v-for="(childData,index) in item.data " v-if="(index > (index_*row_number)) && (index< (index_+1)*row_number)">{{childData.value}}</td>
      </tr>
    </table>
    </div>
</template>

<script>
import Vue from 'vue' // 你的引入描
import '!style-loader!css-loader!less-loader!./style.less'; // 你的引入描述
  
export default {
    name: 'tablee',
      data() {
        return {
          // row_number:7,
        }
      },
      components: {
      },
      computed: {
        num:function(){
            let a= parseInt(this.tableData[0].data.length / this.row_number) ;
            let res=[];
            for(let i=0;i<=a;i++){
              res.push({v:i});
            }
         return res;
        },
         row_number() {
            return parseInt(window.screen.width / 100 /2);
        },
      },
      mounted  () {
      },
      props:{
        // table数据  
        tableData:{
            type: Array,
            default:[],
        }
      },
      methods: {
      }
}
</script>

