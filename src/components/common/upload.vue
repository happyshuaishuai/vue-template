/*
|-------------------------------------------------------------------------- | 上传组件 |--------------------------------------------------------------------------
|
| author：xx
| how it works：
<Upload :uploadUrl="url" @getUploadList="getUploadList" alreadyList="arr" disabled="false"></Upload>
| param: url = 当前上传页面的后端请求地址 | getUploadList = 返回最终的图片队列，在页面commit的时候一起发给后端 | alreadyList = 获取到已经上传的图片列表，格式为 [{name:"",url:""}]
| disabled = 是否禁用
*/


<template>
    <div class="allManage">
        <el-upload class="upload-demo" :action="url" :on-success="success" :on-preview="handlePreview"
                   :on-remove="handleRemove" :before-upload="beforeUpload"
                   :before-remove="beforeRemove" list-type="picture" multiple :disabled="disabled"
                   :file-list="alreadyList">

            <el-button size="small" type="primary">
                点击上传
            </el-button>

            <div slot="tip" class="el-upload__tip">
                单个文件大小不能超过2MB, 建议分辨率 860X1024, 图片格式为 .jpg　.jpeg　.png
            </div>

        </el-upload>

        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </div>
</template>
<script>
    import Vue from 'vue'
    import {getOldFilelist} from '../../service/commodityManagement/index.js'
    import reHttp from '../../service/http'

    export default {
        name: 'upload',
        data() {
            return {
                url: `${reHttp}/api/administrative/uplode_file`,
                /*
                * fileList Arr
                * 已经或者准备上传的文件列表数据(test)
                */
                fileList: [],
                /*
                * dialogImageUrl string
                * 图片展示窗口的图片
                */
                dialogImageUrl: '',
                dialogVisible: false // 是否展示图片预览
            }
        },
        props: {
            // uoload上传的后端接收地址
            uploadUrl: {
                type: String,
                default: "fuck",
                required: true
            },
            alreadyList: {
                type: Array,
                default: [],
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            let showBtn = document.getElementsByClassName("el-upload--picture")[0];
            let showText = document.getElementsByClassName("el-upload__tip")[0];
            if (this.disabled) {
                showBtn.style.setProperty('display', 'none');
                showText.style.setProperty('display', 'none');
            } else {
                showBtn.style.setProperty('display', 'inline-none');
                showText.style.setProperty('display', 'inline-none');
            }
        },
        watch: {},
        methods: {

            getInit() {
                // this.fileList = this.alreadyList;
            },

            /**
             * 抽出url为单独数组，准备发送给后端
             * @param arr
             */
            addUrlArr(arr) {
                let urlArr = arr.map(item => {
                    let obj = {};
                    if (item.response) {
                        obj.name = item.response.name;
                        obj.url = '/uplode_file' + item.response.url.split('uplode_file')[1];
                    } else {
                        obj.name = item.name;
                        obj.url = '/uplode_file' + item.url.split('uplode_file')[1];
                    }
                    return obj;
                });
                return urlArr;
            },
            /**
             * 单个文件上传成功后的回调
             * @param | response=后端返回 file=当前上传的文件 fileList=已经上传的文件队列
             */
            success(response, file, fileList) {
                let newList = this.fileList.concat(this.alreadyList);
                this.$emit('getUploadList', {accessory: this.addUrlArr(fileList)});
            },
            /**
             *
             * @param ;
             */
            beforeRemove(file, fileList) {

            },
            /**
             * 删除
             * @param obj
             */
            handleRemove(file, fileList) {
                this.fileList = fileList;
                if (fileList.length == 0) {
                    this.$emit('getUploadList', {accessory: ""});
                } else {
                    this.$emit('getUploadList', {accessory: this.addUrlArr(fileList)});
                }
            },
            /*上传之前检查
            *
            * 此限制为上传图片
            * */
            beforeUpload(e) {
                if (e.size > 2097152) {
                    this.$message('上传文件过大，请重新选择');
                    return false
                }

                let reg = /\.(jpg|jpeg|png|JPG|PNG|JPEG)$/;
                
                if (!reg.test(e.name.toLowerCase())) {
                    this.$message('上传文件格式不正确，请重新选择');
                    return false
                }
            },
            /**
             * 点击已经上传的文件链接
             * @param file（当前文件对象信息）
             */
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                // let reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
                let reg = /\.(jpg|jpeg|png|JPG|PNG|JPEG)$/;

                if (!reg.test(file.name.toLowerCase())) {
                    window.open(file.url)
                } else {
                    this.dialogVisible = true;
                }
            },
            /**
             * 超过限制时
             * @param obj
             */
            handleExceed(files, fileList) {
                // this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }
        }
    }

</script>
<style lang="less">
    .upload-demo {
        width: 700px;
    }

    .el-upload-list__item-name {
        position: relative;
        left: -80px;
        text-indent: 100px;
        z-index: 999;
    }

    .el-upload-list__item {
        width: calc(~"50% - 5px");
        display: inline-block;
        margin-right: 5px;
    }
</style>