<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>
<style lang = 'less'>
    @import './globalCss/var.less';
    @import './globalCss/cover.less';
    @import './globalCss/root.less';
    /*字体图标*/
    /* @import 'http://at.alicdn.com/t/font_729010_3iv9wsswste.css'; */
    /*大logo背景*/
    .bg-left {
        position: fixed;
        left: 0;
        width: 190px;
        height: 415px;
    }

    .bg-right {
        position: fixed;
        right: 0;
        width: 315px;
        height: 630px;
    }
    .homeHeader{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2001;
    }
</style>
