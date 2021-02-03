<template>
  <div>
    <div style="margin:30px 0px 10px 50px;height:80px">
      <template>
        <el-upload
          ref="PubComponentFromUpload"
          class="upload-demo"
          action="/pmobile/diffpackage/mpaas/sys/upload"
          :headers="headersToken"
          :file-list="PubComponentFileList"
          :auto-upload="false"
          :on-change="PubComponentUploadChange"
          :on-remove="PubComponentUploadRemove"
          :on-success="PubComponentSuccessCallback"
          :on-error="PubComponentErrorCallback"
          style="width:350px"
        >
          <el-button slot="trigger" type="primary" class="el-icon-folder-opened">选择文件</el-button>
          <el-button type="success" class="el-icon-upload2" @click="uploadSubmit()">点击上传</el-button>
        </el-upload>
      </template>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/util'
export default {
  filters: {
    typeFilter(data) {
      if (data === '0') {
        return '普通组'
      } else if (data === '1') {
        return '正则组'
      }
    }
  },
  data() {
    return {
      PubComponentFileList: [],
      PubComponentUploadFlag: false
    }
  },
  created() {
    const token1 = getToken()
    this.headersToken = {
      'Authorization': 'Bearer ' + token1
    }
  },
  methods: {
    // 提交文件
    uploadSubmit() {
      this.$refs.PubComponentFromUpload.submit()
    },
    // PubComponent上传文件
    PubComponentUploadChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      if (fileList.length === 0) {
        this.PubComponentFileList = []
      } else {
        this.PubComponentFileList = [fileList[fileList.length - 1]]
      }
    },
    // PubComponent移除文件
    PubComponentUploadRemove() {
      this.$refs.PubComponentFromUpload.clearFiles()
      this.PubComponentFileList = []
    },
    // PubComponent上传成功后回调
    PubComponentSuccessCallback(response) {
      response = JSON.parse(response.response)
      this.PubComponentUploadFlag = true
      this.$refs.PubComponentFromUpload.clearFiles()
      this.PubComponentFileList = []
      this.$nextTick(() => {
        if (this.PubComponentUploadFlag === false) {
          return
        }
        // 其他属性处理
        // const params = this.form
        // allConfig(params).then(res => {
        //   if (res.data) {
        //     this.$message({
        //       message: '提交成功！',
        //       type: 'success'
        //     })
        //   }
        // }).finally(() => {

        // })
      })
    },
    // PubComponent上传失败后回调
    PubComponentErrorCallback() {
      this.PubComponentUploadFlag = false
      this.$refs.PubComponentFromUpload.clearFiles()
      this.PubComponentFileList = []
      this.$message({
        message: 'PubComponent证书文件上传失败！',
        type: 'error'
      })
    }

  }
}
</script>>

<style lang="scss" scoped>
.wrPubComponenter {
  .margin-b20 {
    margin-bottom: 20px;
  }
  .add-white-line {
    display: flex;
    margin-bottom: 20px;
    .add-white_label {
      width: 120px;
    }
    .add-white_cont {
      flex: 1;
      font {
        font-size: 12px;
        color: #606266;
        margin-top: 7px;
        display: inline-block;
      }
    }
  }
}
.PubComponentCard {
  float:left;width:170px;height:250px;margin-right:50px;margin-bottom:35px;
}
.PubComponentCard:hover{
  box-shadow: 2px 4px 12px 5px rgba(42, 110, 238, 0.308);;
}
</style>
