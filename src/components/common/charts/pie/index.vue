/*
|--------------------------------------------------------------------------
| 组件 Echarts pie
|--------------------------------------------------------------------------
| 
| author：xx
| data： vuex.userInfo
| DOTO:  Echarts pie组件，
|
*/
<template>
    <div id="pie" :style="{width:width,height:height}"></div>
</template>
<script>
 import Vue from 'vue' // 你的引入描述
  import '!style-loader!css-loader!less-loader!./style.less'; // 你的引入描述
export default {
    name: 'pie',
      data() {
        return {}
      },
      components: {
      },
      computed: {
      },
      mounted() {
          this.setOption();
      },
      props:{
        pieData:{
            type: Array,
            default:[{value:100,name:"暂无数据"}]
        },
        pieValue:{},
        width:{
            type: String,
            default:'100%',
        },
        height:{
            type: String,
            default:'380px',
        },
      },
      watch:{
        pieData(){
            this.setOption();
        }
      },
      methods: {
        /**
         * 绘制柱状体方法
         * @param 参数1说明 {data} 图标数据
         * @returns 返回值的类型 {}
         */
        setOption(){
            let titleData=[];
            this.pieData.forEach(item=>{
                titleData.push(item.name)
            });
           var option =  {
            tooltip: {trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)" },
            legend: {orient: 'horizontal',  y: 'bottom',
            data:titleData},
            series: [{name:'客户等级分析统计',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: { normal: {show: false, position: 'center'},
            emphasis: { show: true,textStyle: {fontSize: '30', fontWeight: 'bold'}}},
            labelLine: {normal: {show: false} },
            data:this.pieData}]};
          let myChart = this.$echarts.init(document.getElementById('pie'));
          myChart.setOption(option);
        },
      }
}
</script>

