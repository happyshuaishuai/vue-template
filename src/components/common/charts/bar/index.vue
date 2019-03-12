/*
|--------------------------------------------------------------------------
| 组件 Echarts bar组件，
|--------------------------------------------------------------------------
| 
| author：薛帅
| data： vuex.userInfo
| DOTO:  Echarts bar组件，
|
*/
<template>
    <div id="bar" :style="{width:width,height:height}"></div>
</template>
<script>
    import Vue from 'vue' // 你的引入描述
    import '!style-loader!css-loader!less-loader!./style.less'; // 你的引入描述
    export default {
        name: 'bar',
          data() {
            return {}
          },
          components: {
          },
          computed: {
          },
          mounted  () {
              this.setOption();
          },
          props:{
            barData:{
              type: Object,
              default: ()=>{
                  return  {
                    barName:["初始化1","初始化2"],
                    barValue:[1,2]
                  }      
              }
            },
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
            barData(value1,value2){
                this.setOption();
            }
          },
          methods: {
            /**
             * 绘制饼图体方法
             * @param 参数1说明 {data} 图标数据
             * @returns 返回值的类型 {}
             */
            setOption(){
              let that = this;
              var option = {
                color: ['#3398DB'],
                tooltip : {trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }},
                grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
                xAxis : [{
                        type : 'category',
                        data :that.barData.barName,
                        axisTick: {alignWithLabel: true}}],
                        yAxis : [{type : 'value'}],
                        series : [{
                        name:'人数',
                        type:'bar',
                        barWidth: '60%',
                        data:that.barData.barValue
                    }]};
              let myChart = this.$echarts.init(document.getElementById('bar'));
              myChart.setOption(option);
            },
          }
    }
</script>

