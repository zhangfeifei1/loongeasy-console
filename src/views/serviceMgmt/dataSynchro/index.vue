<template>
  <div class="app-container wrapper">
    <el-tabs v-model="activeName" type="border-card" size="small" @tab-click="handleTabClick">
      <!-- 配置管理 -->
      <el-tab-pane label="配置管理" name="first">
        <el-row>
          <el-col :span="4">
            <el-button size="mini" type="primary" icon="el-icon-plus" style="margin-bottom:10px;" @click="handleAdd()">添 加</el-button>
          </el-col>
          <el-col :span="6" :offset="14">
            <el-input v-model="pageInfo.dataFlag" size="mini" placeholder="请输入标识">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch()" />
            </el-input>
          </el-col>
        </el-row>
        <!--数据详情-->
        <div class="tableStyle">
          <el-table :data="data" border :cell-style="cellstyle" :header-cell-style="rowClass">
            <el-table-column prop="id" label="标识" width="150">
              <template slot-scope="scope">
                <a @click="handleShowByFlag(scope.row)">{{ scope.row.id }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="pushMem" label="描述" width="300" />
            <el-table-column prop="pushObject" label="维度" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.pushObject==='USER'">用户</span>
                <span v-if="scope.row.pushObject==='DEVICE'">设备</span>
              </template>
            </el-table-column>
            <el-table-column prop="pushRange" label="推送范围" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.pushRange==='GLOBAL'">全局推送</span>
                <span v-if="scope.row.pushRange==='APPOINT'">指定推送</span>
              </template>
            </el-table-column>
            <el-table-column prop="dataPers" label="持久化" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.dataPers==='YES'">是</span>
                <span v-if="scope.row.dataPers==='NO'">否</span>
              </template>
            </el-table-column>
            <el-table-column prop="statusId" label="已上线" width="150">
              <template slot-scope="scope">
                <el-badge v-if="scope.row.statusId==='ONLINE'" is-dot type="success" />
                <el-badge v-if="scope.row.statusId==='OFFLINE'" is-dot type="danger" />
                <span v-if="scope.row.statusId==='ONLINE'">是</span>
                <span v-if="scope.row.statusId==='OFFLINE'">否</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <a @click="handleTable(scope.row)">操作</a>&nbsp;
                <a v-if="scope.row.statusId=='OFFLINE'" @click="handleONline(scope.row)">上线</a>
                <a v-if="scope.row.statusId=='ONLINE'" @click="handleOffline(scope.row)">下线</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-row>
          <el-col :span="24" class="toolbar">
            <el-pagination
              background
              :current-page="pageInfo.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageInfo.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              @size-change="handlePageSize"
              @current-change="handlePage"
            />
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 数据查询 -->
      <el-tab-pane label="数据查询" name="second">
        <el-row style="margin-top:10px;">
          <el-col :span="3"><span style="font-size:16px">用户/设备状态查询</span></el-col>
          <el-col :span="3" :offset="13">
            <el-select v-model="searchM2.searchM2Type" size="small" style="width:100px">
              <el-option value="user" label="用户" />
              <el-option value="device" label="设备" />
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="searchM2.searchM2Name" size="small" placeholder="请输入用户/设备名">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch2()" />
            </el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="7" style="border-right:1px solid #cccccc">
            <el-row style="color:#707070;font-size:14px">{{ searchM2.searchM2Type=='user'?'用户名':'设备名' }}</el-row>
            <el-row
              v-if="searchM2.searchM2Type=='user'"
              style="padding:20px 0px 30px 0px;border-bottom:1px solid #cccccc"
            >
              {{ detailFrom.userName }}</el-row>
            <el-row
              v-if="searchM2.searchM2Type=='device'"
              style="padding:20px 0px 30px 0px;border-bottom:1px solid #cccccc"
            >
              {{ detailFrom.machineName }}</el-row>
            <el-row style="margin:10px 0px 10px -2px">
              <el-tooltip class="item" effect="light" content="标示用户是否连接到MSS服务" placement="right">
                <el-col style="color:#707070;font-size:14px" :span="3">状态</el-col>
              </el-tooltip>
            </el-row>
            <el-row style="color:#00a755;font-size:16px;">{{ detailFrom.status=='1'?"在线":"离线" }}</el-row>
            <el-row style="margin:30px 0px 15px 0px;color:#707070;font-size:14px">近30天推送次数</el-row>
            <el-row>{{ detailFrom.pushTime }}</el-row>
            <el-row style="margin:20px 0px 15px 0px;color:#707070;font-size:14px">近30天推送到达次数</el-row>
            <el-row>{{ detailFrom.pushArrive }}</el-row>
          </el-col>
          <el-col :span="16" style="float:right">
            <div>
              <el-table :data="detaildata" border :cell-style="cellstyle" :header-cell-style="rowClass" size="small">
                <el-table-column prop="mssId" label="同步标识" />
                <el-table-column prop="requestTime" label="首次推送时间" width="220" />
                <el-table-column prop="responseTime" label="最终送达时间" width="220" />
                <el-table-column prop="statusId" label="是否送达" width="180">
                  <template slot-scope="scope">
                    <span v-if="scope.row.statusId==='S'">推送成功</span>
                    <span v-if="scope.row.statusId==='N'">未推送</span>
                    <span v-if="scope.row.statusId==='E'">推送失败</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 服务管理 -->
      <el-tab-pane label="服务管理" name="third">
        <div>
          <el-alert title="消息提示的文案" type="info" />
        </div>
        <div style="color:#707070;font-size:15px;margin:20px 0px 10px 30px">签名校验</div>
        <el-row>
          <el-col style="color:#707070;font-size:12px;margin:10px 0px 10px 40px" :span="19">
            对客户端到数据同步服务的建连请求进行验签，以验证调用者身份，保证安全
          </el-col>
          <el-col :span="4">
            <el-switch v-model="signValidate" active-color="#13ce66" inactive-color="#ff4949" @change="serviceChange()" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="drawer" :title="drawerTitle" width="60%" top="60px" :show-close="true">
      <div>
        <template>
          <el-form
            ref="submitModel"
            :model="submitModel"
            label-width="150px"
            label-position="right"
            :rules="ruleValidate"
            size="small"
          >
            <div class="greenarea" /><h4>基 础 配 置</h4>
            <el-form-item label="同步标识：" prop="id" class="inputframe1">
              <el-input
                v-model="submitModel.id"
                :disabled="drawerFlag != 'add'"
                placeholder="请输入标识"
                style="width:220px"
              />
            </el-form-item>
            <el-form-item label="推送范围：" prop="pushRange" class="inputframe1">
              <template>
                <el-radio-group v-model="submitModel.pushRange" :disabled="drawerFlag == 'detail'" style="width:220px">
                  <el-radio label="GLOBAL">全局推送</el-radio>
                  <el-radio label="APPOINT">指定推送</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <el-form-item label="推送说明：" prop="pushMem" class="inputframe2">
              <el-input
                v-model="submitModel.pushMem"
                :disabled="drawerFlag == 'detail'"
                placeholder="请输入推送说明"
                style="width:220px"
              />
            </el-form-item>
            <div class="greenarea" />
            <h4>推 送 对 象</h4>
            <el-form-item label="推送对象：" prop="pushObject" class="inputframe2">
              <template>
                <el-radio-group v-model="submitModel.pushObject" :disabled="drawerFlag != 'add'" style="width:220px">
                  <el-radio label="USER">用户</el-radio>
                  <el-radio label="DEVICE">设备</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <!-- <el-tooltip
              v-if="submitModel.pushObject=='USER'||submitModel.pushObject==''"
              class="item"
              effect="dark"
              content="用户换设备后会重新收到已经推送的之前设备的数据"
              placement="left"
            > -->
            <el-form-item v-if="submitModel.pushObject=='USER'||submitModel.pushObject==''" prop="deviceSync" class="inputframe2">
              <span slot="label">
                <span>多设备同步</span>
                <el-tooltip content="用户换设备后会重新收到已经推送的之前设备的数据" placement="bottom-start" effect="light">
                  <i class="el-icon-question" style="color:#606266" />
                </el-tooltip>
                <span>：</span>
              </span>
              <template>
                <el-radio-group
                  v-model="submitModel.deviceSync"
                  :disabled="drawerFlag == 'detail'"
                  style="width:220px"
                >
                  <el-radio label="YES">是</el-radio>
                  <el-radio label="NO">否</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <!-- </el-tooltip> -->
            <div class="greenarea" /><h4>数 据 持 久 化</h4>
            <!-- <el-tooltip class="item" effect="dark" content="将数据保存至数据库，如果推送时用户/设备不在线，等用户/设备下一次在线后就会收到" placement="left"> -->
            <el-form-item prop="dataPers" class="inputframe2">
              <span slot="label">
                <span>数据持久化</span>
                <el-tooltip content="将数据保存至数据库，如果推送时用户/设备不在线，等用户/设备下一次在线后就会收到" placement="bottom-start" effect="light">
                  <i class="el-icon-question" style="color:#606266" />
                </el-tooltip>
                <span>：</span>
              </span>
              <template>
                <el-radio-group v-model="submitModel.dataPers" :disabled="drawerFlag == 'detail'" style="width:220px">
                  <el-radio label="YES">是</el-radio>
                  <el-radio label="NO">否</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <!-- <el-tooltip
              v-if="(submitModel.dataPers=='YES'||submitModel.dataPers=='')"
              class="item"
              effect="dark"
              content="表示仅推送阈值限定内的最新积压数据"
              placement="left"
            > -->
            <el-form-item v-if="(submitModel.dataPers=='YES'||submitModel.dataPers=='')" prop="repushType" class="inputframe1">
              <span slot="label">
                <span>重推方式</span>
                <el-tooltip content="表示仅推送阈值限定内的最新积压数据" placement="bottom-start" effect="light">
                  <i class="el-icon-question" style="color:#606266" />
                </el-tooltip>
                <span>：</span>
              </span>
              <template>
                <el-radio-group
                  v-model="submitModel.repushType"
                  :disabled="drawerFlag == 'detail'"
                  style="width:220px"
                >
                  <el-radio label="VALUE">阈值</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <!-- </el-tooltip> -->
            <el-form-item
              v-if="(submitModel.dataPers=='YES'||submitModel.dataPers=='')"
              label="重推阈值："
              prop="repushValue"
            >
              <el-input-number
                v-model="submitModel.repushValue"
                :disabled="drawerFlag == 'detail'"
                style="width:120px"
              />
            </el-form-item>
            <div v-if="submitModel.pushObject=='USER'||submitModel.pushObject==''" class="greenarea" />
            <h4 v-if="submitModel.pushObject=='USER'||submitModel.pushObject==''">安 全 控 制</h4>
            <!-- <el-tooltip
              v-if="submitModel.pushObject=='USER'||submitModel.pushObject==''"
              class="item"
              effect="dark"
              content="通过回调租户接口验证用户的一致性"
              placement="left"
            > -->
            <el-form-item v-if="submitModel.pushObject=='USER'||submitModel.pushObject==''" label="用户一致性：" prop="userCons" class="inputframe1">
              <span slot="label">
                <span>用户一致性</span>
                <el-tooltip v-if="submitModel.pushObject=='USER'||submitModel.pushObject==''" content="通过回调租户接口验证用户的一致性" placement="bottom-start" effect="light">
                  <i class="el-icon-question" style="color:#606266" />
                </el-tooltip>
                <span>：</span>
              </span>
              <template>
                <el-radio-group v-model="submitModel.userCons" :disabled="drawerFlag == 'detail'" style="width:220px">
                  <el-radio label="YES">是</el-radio>
                  <el-radio label="NO">否</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <!-- </el-tooltip> -->
            <div style="float:right;margin:15px 0px 30px 0px">
              <el-button v-if="drawerFlag=='detail'" size="small" long @click="handleEdit()">修 改</el-button>
              <el-button v-if="drawerFlag!='detail'" size="small" long @click="handleCancle()">取 消</el-button>
              <el-button v-if="drawerFlag!='detail'" size="small" type="primary" long @click="handleSubmit()">提 交</el-button>
            </div>
          </el-form>
        </template>
      </div>
    </el-dialog>
    <el-dialog title="新建同步" :visible.sync="dialogVisible" width="40%">
      <div>
        <template>
          <el-form
            ref="handleModel"
            :model="handleModel"
            label-width="100px"
            label-position="left"
            :rules="ruleValidate1"
          >
            <el-form-item v-if="rowModel.pushObject=='USER'&&rowModel.pushRange=='APPOINT'" label="用户ID:" prop="userId">
              <el-input v-model="handleModel.userId" size="mini" placeholder="请输入用户ID" style="width:220px" />
            </el-form-item>
            <el-form-item
              v-if="rowModel.pushObject=='DEVICE'&&rowModel.pushRange=='APPOINT'"
              label="设备ID:"
              prop="deviceId"
            >
              <el-input v-model="handleModel.deviceId" size="mini" placeholder="请输入设备ID" style="width:220px" />
            </el-form-item>
            <el-form-item label="数据内容:" prop="content">
              <el-input
                v-model="handleModel.content"
                type="textarea"
                :rows="2"
                placeholder="请输入数据内容"
                style="width:220px"
              />
            </el-form-item>
            <el-tooltip
              v-if="rowModel.dataPers=='YES'"
              class="item"
              effect="light"
              content="用于标示数据的唯一性，如果数据库中有相同ID的数据，后发送的数据会被丢弃"
              placement="top"
            >
              <el-form-item label="数据唯一ID:" prop="dataId">
                <template>
                  <el-input v-model="handleModel.dataId" size="mini" placeholder="请输入数据ID" style="width:220px" />
                </template>
              </el-form-item>
            </el-tooltip>
            <el-form-item label="系统:" prop="system">
              <template>
                <el-checkbox-group v-model="handleModel.system">
                  <el-checkbox label="ANDROID">ANDROID</el-checkbox>
                  <el-checkbox label="IOS">IOS</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
            <el-form-item label="版本区间:" prop="versionStart">
              <el-input v-model="handleModel.versionStart" size="mini" style="width:100px" />
              <i class="el-icon-d-caret" style="transform:rotate(90deg);font-size:18px" />
              <el-input v-model="handleModel.versionEnd" size="mini" style="width:100px" />
            </el-form-item>
            <el-form-item v-if="rowModel.dataPers=='YES'" label="有效期:" prop="dateValue">
              <el-input-number v-model="handleModel.dateValue" size="mini" style="width:120px" /> 天
            </el-form-item>
          </el-form>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="addNew()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>>

<script>
import {
  getDataSynchroConfig,
  configONOFFline,
  configEdit,
  configAdd,
  serviceSearch,
  serviceSwitch,
  configAddSynchro,
  dataSearchTable1,
  dataSearchTable2
} from '@/api/dataSynchro'
export default {
  name: 'DataSynchro',
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
    const validateId = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('同步标识不能为空'))
      } else if (value.trim().length < 2) {
        return callback(new Error('请至少输入2个字符'))
      } else {
        callback()
      }
    }
    const validatePushMem = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('推送说明不能为空'))
      } else if (value.trim().length < 2) {
        return callback(new Error('请至少输入2个字符'))
      } else {
        callback()
      }
    }
    const validateRepushThreshold = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入值不能为空'))
      } else if (value < 1 || value > 1000) {
        return callback(new Error('推送阈值必须介于1~1000'))
      } else {
        callback()
      }
    }
    const validateSix = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('数据内容不能为空'))
      } else if (value.trim().length < 6) {
        return callback(new Error('请至少输入6个字符'))
      } else {
        callback()
      }
    }
    const validateSixId = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('数据ID不能为空'))
      } else if (value.trim().length < 6) {
        return callback(new Error('请至少输入6个字符'))
      } else {
        callback()
      }
    }
    const validateSixId1 = (rule, value, callback) => {
      if (!value.trim() || !this.handleModel.versionEnd) {
        return callback(new Error('区块不能为空'))
      } else if (value.trim().length < 6 || this.handleModel.versionEnd.length < 6) {
        return callback(new Error('请至少输入6个字符'))
      } else {
        callback()
      }
    }

    return {
      activeName: 'first',
      drawer: false,
      drawerTitle: '',
      drawerFlag: '',
      dialogVisible: false,
      signValidate: true,
      searchM2: {
        searchM2Type: 'user',
        searchM2Name: ''
      },
      pageInfo: {
        total: 0,
        page: 1,
        limit: 10,
        dataFlag: ''
      },
      rowModel: {},
      submitModel: {
        id: '',
        pushRange: '',
        pushMem: '',
        pushObject: '',
        deviceSync: '',
        dataPers: '',
        repushType: 'VALUE',
        repushValue: '',
        userCons: ''
      },
      handleModel: {
        userId: '',
        deviceId: '',
        content: '',
        dataId: '',
        system: [],
        versionStart: '',
        versionEnd: '',
        dateValue: ''
      },
      detailFrom: {
        userName: '用户13',
        machineName: '设备123',
        status: '1',
        pushTime: '123',
        pushArrive: '123456'
      },
      detaildata: [],
      data: [],
      ruleValidate: {
        id: [{
          required: true,
          validator: validateId,
          trigger: 'blur'
        }],
        pushRange: [{
          required: true,
          message: '推送范围不可为空！',
          trigger: 'change'
        }],
        pushMem: [{
          required: true,
          validator: validatePushMem,
          trigger: 'blur'
        }],
        pushObject: [{
          required: true,
          message: '推送对象不可为空！',
          trigger: 'change'
        }],
        deviceSync: [{
          required: true,
          message: '多设备同步不可为空！',
          trigger: 'change'
        }],
        dataPers: [{
          required: true,
          message: '数据持久化不可为空！',
          trigger: 'change'
        }],
        repushType: [{
          required: true,
          message: '重推方式不可为空！',
          trigger: 'change'
        }],
        repushValue: [{
          required: true,
          validator: validateRepushThreshold,
          trigger: 'change'
        }],
        userCons: [{
          required: true,
          message: '用户一致性不可为空！',
          trigger: 'change'
        }]
      },
      ruleValidate1: {
        userId: [{
          required: true,
          validator: validateSix,
          trigger: 'blur'
        }],
        deviceId: [{
          required: true,
          validator: validateSix,
          trigger: 'blur'
        }],
        content: [{
          required: true,
          validator: validateSix,
          trigger: 'blur'
        }],
        dataId: [{
          required: true,
          validator: validateSixId,
          trigger: 'blur'
        }],
        system: [{
          required: true,
          message: '系统不能为空',
          trigger: 'blur'
        }],
        versionStart: [{
          required: true,

          validator: validateSixId1,
          // message: '区块不能为空',
          trigger: 'blur'
        }],
        versionEnd: [{
          required: true,
          message: '区块不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    // 查询
    handleSearch() {
      const params = {
        size: this.pageInfo.limit,
        current: this.pageInfo.page,
        id: this.pageInfo.dataFlag
      }
      getDataSynchroConfig(params).then(res => {
        this.data = JSON.parse(JSON.stringify(res.data.records))
        this.pageInfo.total = res.data.total
      }).finally(() => {})
    },
    // 查询2表格
    handleSearch2() {
      if (this.searchM2.searchM2Type === 'user') {
        const params = {
          sendId: this.searchM2.searchM2Name
        }
        dataSearchTable2(params).then(res => {
          this.detaildata = res.data
        }).finally(() => {})
      }
      if (this.searchM2.searchM2Type === 'device') {
        const params = {
          sendId: this.searchM2.searchM2Name
        }
        dataSearchTable1(params).then(res => {
          this.detaildata = res.data
        }).finally(() => {})
      }
    },
    // 切换标题栏
    handleTabClick(tab, event) {
      console.log(tab.name)
      if (tab.name === 'first') {
        this.handleSearch()
      }
      if (tab.name === 'second') {
        this.handleSearch2()
      }
      if (tab.name === 'third') {
        serviceSearch().then(res => {
          if (res.data.configValue === 'YES') {
            this.signValidate = true
          } else {
            this.signValidate = false
          }
        }).finally(() => {})
      }
    },
    // 切换第三栏的签名开关
    serviceChange() {
      let params = ''
      if (this.signValidate === true) {
        params = {
          configValue: 'YES'
        }
      } else {
        params = {
          configValue: 'NO'
        }
      }
      serviceSwitch(params).then(res => {
        serviceSearch().then(res => {
          if (res.data.configValue === 'YES') {
            this.signValidate = true
          } else {
            this.signValidate = false
          }
        }).finally(() => {})
      }).finally(() => {})
    },
    // 添加功能
    handleAdd() {
      this.drawer = true
      this.drawerTitle = '新建同步配置'
      this.drawerFlag = 'add'
      this.$nextTick(() => {
        this.$refs['submitModel'].resetFields()
        this.submitModel = {
          id: '',
          pushRange: '',
          pushMem: '',
          pushObject: '',
          deviceSync: '',
          dataPers: '',
          repushType: 'VALUE',
          repushValue: 1,
          userCons: ''
        }
      })
    },
    // 表格内查看
    handleShowByFlag(val) {
      this.drawer = true
      this.drawerTitle = '同步配置详情'
      this.drawerFlag = 'detail'
      this.submitModel = JSON.parse(JSON.stringify(val))
    },
    // 修改
    handleEdit() {
      this.drawerTitle = '编辑同步配置'
      this.drawerFlag = 'edit'
    },
    // 提交
    handleSubmit() {
      this.$refs['submitModel'].validate(valid => {
        if (valid) {
          const params = {
            id: this.submitModel.id,
            pushRange: this.submitModel.pushRange,
            pushMem: this.submitModel.pushMem,
            pushObject: this.submitModel.pushObject,
            dataPers: this.submitModel.dataPers
          }
          if (this.submitModel.pushObject === 'USER') {
            params.deviceSync = this.submitModel.deviceSync
            params.userCons = this.submitModel.userCons
          }
          if (this.submitModel.dataPers === 'YES') {
            params.repushType = this.submitModel.repushType
            params.repushValue = this.submitModel.repushValue
          }
          if (this.drawerFlag === 'add') {
            configAdd(params).then(res => {
              if (res.data) {
                this.$message({
                  message: '新增成功！',
                  type: 'success'
                })
                this.handleSearch()
              }
            }).finally(() => {})
          }
          if (this.drawerFlag === 'edit') {
            configEdit(params).then(res => {
              if (res.data) {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                })
                this.handleSearch()
              }
            }).finally(() => {})
          }

          this.drawer = false
        } else {
          this.$message.error('验证不通过！')
        }
      })
    },
    // 取消提交
    handleCancle() {
      this.drawer = false
    },
    // 表格内操作
    handleTable(val) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['handleModel'].resetFields()
        this.handleModel = {
          userId: '',
          deviceId: '',
          content: '',
          dataId: '',
          system: [],
          versionStart: '',
          versionEnd: '',
          dateValue: ''
        }
      })

      this.rowModel = JSON.parse(JSON.stringify(val))
    },
    // 确认新建
    addNew() {
      this.$refs['handleModel'].validate(valid => {
        if (valid) {
          const params = {
            mssId: this.rowModel.id,
            content: this.handleModel.content,
            system: this.handleModel.system,
            versionStart: this.handleModel.versionStart,
            versionEnd: this.handleModel.versionEnd
          }
          if (this.rowModel.pushObject === 'USER' && this.rowModel.pushRange === 'APPOINT') {
            params.userId = this.handleModel.userId
          }
          if (this.rowModel.pushObject === 'DEVICE' && this.rowModel.pushRange === 'APPOINT') {
            params.deviceId = this.handleModel.deviceId
          }
          if (this.rowModel.dataPers === 'YES') {
            params.dataId = this.handleModel.dataId
          }
          if (this.rowModel.dataPers === 'YES') {
            params.dateValue = this.handleModel.dateValue
          }
          if (params.system.indexOf('ANDROID') > -1) {
            if (params.system.indexOf('IOS') > -1) {
              params.system = 'ANDROID|IOS'
            } else {
              params.system = 'ANDROID'
            }
          } else {
            params.system = 'IOS'
          }

          configAddSynchro(params).then(res => {
            if (res.data) {
              this.$message({
                message: '提交成功！',
                type: 'success'
              })
              this.dialogVisible = false
            }
          }).finally(() => {})
        } else {
          this.$message.error('验证不通过！')
        }
      })
    },
    // 下线
    handleOffline(val) {
      this.$confirm('确定下线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: val.id,
          statusId: 'OFFLINE'
        }
        configONOFFline(params).then(res => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: '下线成功!'
            })
            this.pageInfo.page = 1
            this.handleSearch()
          }
        }).finally(() => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 上线
    handleONline(val) {
      this.$confirm('确定上线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: val.id,
          statusId: 'ONLINE'
        }
        configONOFFline(params).then(res => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: '上线成功!'
            })
            this.pageInfo.page = 1
            this.handleSearch()
          }
        }).finally(() => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    /**
       * @description 设置el-table内容居中
       */
    cellstyle() {
      return 'padding-left: 10px;padding-right: 10px;'
    },
    /**
       * @description 设置el-table表头居中
       */
    rowClass() {
      return 'background:#f8f8f9;color:#515a6e;padding-left: 10px;padding-right: 10px;'
    },
    handlePage(current) {
      this.pageInfo.page = current
      this.handleSearch()
    },
    handlePageSize(size) {
      this.pageInfo.limit = size
      this.handleSearch()
    }

  }
}

</script>>

<style lang="scss" scoped>
  .wrapper {

    // height:90vh;
    // overflow: hidden;
    .border-1 {
      border: solid 1px #eee;
    }

    .border-radius-4 {
      border-radius: 4px;
    }

    .margin-b25 {
      margin-bottom: 25px;
    }

    .package-aside {
      border-right: 1px solid #e6e6e6;

      .package-aside_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 20px;
        background: #eef1f6;
        margin-bottom: 16px;
      }

      .package-aside_list {
        .package-aside_input {
          padding: 0 20px;
          margin-bottom: 10px;
        }

        .package-aside_list_menu {
          font-size: 14px;
          color: #303133;

          .menu_list_item {
            padding: 0 20px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            div:nth-child(1) {
              flex: 1;
            }

            div {
              line-height: 56px;
            }

            i {
              display: inline-block;
              margin-left: 10px;
            }
          }

          .active {
            background: #ecf5ff;
            cursor: pointer;
          }

          .isactive {
            color: #409EFF;
            background: #ecf5ff;
            cursor: pointer;
          }
        }
      }
    }

    .package-main {
      .package-main_line {
        margin-bottom: 20px;
      }

      .table_row_status {
        position: relative;
      }

      .table_row_status:before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        left: -10px;
        top: 50%;
        margin-top: -5px;
        background: #409eff;
        border-color: #409eff;
      }

      .el-table_expand {
        padding: 20px;
        display: flex;
        align-items: center;

        div {
          margin-right: 30px;

          .link_font {
            margin-right: 20px;
          }
        }

        >div:nth-child(3) {
          margin-right: 60px;
        }
      }
    }

    .configure-mgt {
      padding: 25px 50px;

      .el-form-item {
        position: relative;

        .el-form-item_label_self {
          position: absolute;
          left: -10px;
        }
      }
    }
  }
  .greenarea{
    width: 5px;
    height: 16px;
    float: left;
    background-color: #015252;
    margin-right: 10px;
  }
  .inputframe1{
    width: 50%;
    height: 40px;
    border: 0;
    float: left;
  }
  .inputframe2{
    width: 100%;
    height: 40px;
    border: 0;
    float: left;
  }
  /deep/ .el-dialog__body {
    padding: 0 0 10px 0;
    overflow: hidden;
  }
</style>
