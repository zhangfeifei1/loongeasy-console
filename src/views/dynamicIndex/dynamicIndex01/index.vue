<template>
  <div>
    <div style="margin-top:25px;padding-left:100px">
      <div style="display:inline-block;width:150px">
        <el-button type="primary" @click="addNewAPP()">新建APP</el-button>
      </div>
      <div style="display:inline-block;width:100px">
        <el-button type="primary" @click="pubComponentMgmt()">管理公共组件</el-button>
      </div>
    </div>
    <div style="margin-top:30px;padding-left:100px">
      <el-card v-for="(item,index) in appData" :key="index" shadow="always" class="appCard">
        <div style="text-align: center">
          <!-- <img src="../../../assets/appicon/修王.jpg" width="80px" height="80px" style="border-radius:40px;margin:0 auto"> -->
          <div style="margin-top:15px;color: #015252;;font-size:18px;font-weight:700;font-family:Microsoft YaHei">{{ item.appName }}</div>
          <div style="margin-top:15px;color: #015252;;font-size:14px;font-weight:700">{{ item.appType }}</div>
          <div style="margin-top:12px;color: #267878; font-size:8px">{{ item.appStatus }}</div>
          <div style="margin-top:12px; font-size:16px">{{ item.appTheme }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

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
      appData: [
        {
          appIcon: '../../../assets/appicon/修王.jpg',
          appName: 'MobileApp',
          appType: '移动应用',
          appStatus: '灰度测试状态',
          appTheme: '国庆节日主题'
        }, {
          appIcon: '../../../assets/appicon/修王.jpg',
          appName: 'MobileApp',
          appType: '移动应用',
          appStatus: '灰度测试状态',
          appTheme: '国庆节日主题'
        }, {
          appIcon: '../../../assets/appicon/修王.jpg',
          appName: 'MobileApp',
          appType: '移动应用',
          appStatus: '灰度测试状态',
          appTheme: '国庆节日主题'
        }, {
          appIcon: '../../../assets/appicon/修王.jpg',
          appName: 'MobileApp',
          appType: '移动应用',
          appStatus: '灰度测试状态',
          appTheme: '国庆节日主题'
        }
      ]
    }
  },
  created() {

  },
  methods: {
    // 跳转新建APP
    addNewAPP() {
      this.$router.push({
        name: 'AddNew'
      })
    },
    pubComponentMgmt() {
      this.$router.push({
        name: 'PubComponentMgmt'
      })
    }

  }
}
</script>>

<style lang="scss" scoped>
.wrapper {
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
        font-size: 10px;
        color: #267878;
        margin-top: 7px;
        display: inline-block;
      }
    }
  }
}
.appCard {
  float:left;
  width:200px;
  height:250px;
  border-radius: 10px;
  margin-right: 60px;
  margin-bottom: 35px;
}
.appCard:hover{
  box-shadow: 5px 5px 5px 5px rgba(#015252, 0.308);;
}
</style>
