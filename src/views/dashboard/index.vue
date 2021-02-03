<template>
  <div class="dashboard-container">
    <!-- 交易笔数：performance.tradeCount
  平均交易耗时:performance.useTime
  业务成功率:performance.businessSuccRate
  系统健康度:system.healthyDegree -->
    <div class="head">
      <div style="font-size:40px;"><i class="el-icon-s-promotion" style="color:#606266;font-size:34px;margin-right:14px;" /></div>
      <div style="margin-top:5px">
        <span style="font-size: 28px; font-weight: bold;color: #015252;margin-right:10px;">欢迎    {{ username }}</span>
        <span class="h3">访问 LoongEasy 后台管理系统</span>
      </div>
    </div>
    <div class="menu-box">
      <div class="menu-flex" style="margin-left:0">
        <div class="menu-item">
          <div class="menu-rate">
            <span>{{ perfor.userView||'0' }}</span>
          </div>
          <div class="menu-desc">
            <i class="el-icon-s-custom" style="color:#809c9c; font-size:50px; margin-left:20px;" />
            <span>独立访客量</span>
          </div>
        </div>
      </div>
      <div class="menu-flex">
        <div class="menu-item">
          <div class="menu-rate">
            <span>{{ perfor.tradeCount||'0' }}</span>
          </div>
          <div class="menu-desc">
            <img src="@/assets/images/tradeCount.png">
            <span>交易笔数</span>
          </div>
        </div>
      </div>
      <div class="menu-flex">
        <div class="menu-item">
          <div class="menu-rate">
            <span>{{ perfor.useTime||'0' }}</span>
          </div>
          <div class="menu-desc">
            <img src="@/assets/images/timeConsuming.png">
            <span>平均交易耗时</span>
          </div>
        </div>
      </div>
      <div class="menu-flex" style="margin-right:0">
        <div class="menu-item">
          <div class="menu-rate">
            <span>{{ (perfor.businessSuccRate||'0' ) |paramsFilter }}</span>
          </div>
          <div class="menu-desc">
            <img src="@/assets/images/successRate.png">
            <span>业务成功率</span>
          </div>
        </div>
      </div>
    </div>
    <div ref="echart" class="main">
      <!-- <div style="margin-left:60px">
        <el-radio-group v-model="searchRadio" size="mini" @change="searchRadioChange()">
          <el-radio-button label="小时" :disabled="true" />
          <el-radio-button label="天" />
        </el-radio-group>
      </div> -->

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getHomeList, getVisitList } from '@/api/homeApi'
import { clearInterval, setInterval } from 'timers'
import echarts from 'echarts'
export default {
  name: 'Dashboard',
  filters: {
    paramsFilter(value) {
      return value ? parseFloat(value).toFixed(2) + '%' : value
    }
  },
  data() {
    return {
      username: '',
      perfor: '',
      // sys: '',
      timer: '',
      // searchRadio: '天',
      xArr: [],
      yArr: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  destroyed() {
    clearInterval(this.timer)
  },
  mounted() {
    this.username = this.$store.state.user.userName
    getHomeList().then(res => {
      if (res.code === 0) {
        this.perfor = res.data.performance
        this.sys = res.data.system
        this.getCycle()
      }
    }).finally(res => {

    })
    const visitData = {
      days: 7
    }
    getVisitList(visitData).then(res => {
      if (res.code === 0) {
        this.xArr = []
        this.yArr = []
        this.visitCount = res.data
        for (var i = 0; i < this.visitCount.length; i++) {
          this.xArr.push(this.visitCount[i].days)
          this.yArr.push(this.visitCount[i].counts)
        }
        this.createEchart()
      }
    })
  },
  methods: {
    getCycle() {
      this.timer = setInterval(() => {
        getHomeList().then(res => {
          if (res.code === 0) {
            this.perfor = res.data.performance
            this.sys = res.data.system
          }
        })
      }, 60000)
    },
    // searchRadioChange() {
    //   if (this.searchRadio === '小时') {
    //     this.createEchart('charHour')
    //   }
    //   if (this.searchRadio === '天') {
    //     this.createEchart('charDay')
    //   }
    // },
    createEchart() {
      // 在创建之前销毁
      echarts.init(this.$refs.echart).dispose() // 销毁实例
      // 基于准备好的dom，初始化echarts实例
      var echart = echarts.init(this.$refs.echart)
      // 绘制图表
      // if (val === 'charHour') {
      //   let echartOption = JSON.parse(JSON.stringify({}))
      //   echartOption = {
      //     tooltip: {
      //       trigger: 'axis'
      //     },
      //     legend: {
      //       data: ['']
      //     },
      //     color: ['#015252'],
      //     xAxis: {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: [],
      //       name: '时间',
      //       nameTextStyle: {
      //         color: '#012d2d',
      //         fontSize: 16,
      //         padding: [0, 0, 0, 20]
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: '#012d2d'
      //         }
      //       }
      //     },
      //     yAxis: {
      //       type: 'value',
      //       name: '访问量(小时)',
      //       nameTextStyle: {
      //         color: '#012d2d',
      //         fontSize: 16,
      //         padding: [0, 0, 5, 0]
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: '#012d2d'
      //         }
      //       }
      //     },
      //     series: [
      //       {
      //         type: 'line',
      //         data: [],
      //         lineStyle: {
      //           normal: {
      //             color: '#012d2d'
      //           }
      //         }
      //       }
      //     ]
      //   }
      //   echart.setOption(echartOption)
      // }
      let echartOption = JSON.parse(JSON.stringify({}))
      echartOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['交易笔数']
        },
        color: ['#015252'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xArr,
          name: '时间',
          nameTextStyle: {
            color: '#012d2d',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            lineStyle: {
              color: '#012d2d'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '访问量(天)',
          nameTextStyle: {
            color: '#012d2d',
            fontSize: 16,
            padding: [0, 0, 5, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#012d2d'
            }
          }
        },
        series: [
          {
            type: 'line',
            data: this.yArr,
            lineStyle: {
              normal: {
                color: '#012d2d'
              }
            }
          }
        ]
      }
      echart.setOption(echartOption)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      height: calc(100vh - 80px);
      overflow: auto;
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .head{
    width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    padding: 30px 120px;
    align-items: center;
    margin-top: 5px;
  }
  .h3{
    color: #606266;
    font-size: 16px;
    font-weight: bold;
  }
  .main{
    margin: 15px 120px 20px 120px;
    background-color: #eef3f3;
    border-radius: 10px;
    padding: 20px 40px 10px 40px;
    min-height: 200px;
    max-height: 450px;
    height: calc(100vh - 390px);
  }
  .menu-box{
    display: flex;
    width: 100%;
    padding: 0 120px 0 120px;
    flex-wrap: wrap;
  }
  // .menu-box :hover{
  //   background: #93bcbc;
  // }
  .menu-flex{
    margin: 10px auto;
    width: calc((100%-320px)*0.2);
    align-items: center;
    justify-content: center;
  }
  .menu-item{
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #eef3f3;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    .menu-rate{
      span{
        font-size: 32px;
        padding-left: 30px;
        color: #d9001b;
      }
    }
    .menu-desc{
      display: flex;
      align-items: center;
      margin-top: 15px;
      span{
        font-size: 14px;
        padding-left: 18px;
        color: #012d2d;
    }
    }
    img{
      width: 50px;
      height: 50px;
      margin-left: 25px;
    }
  }
</style>
