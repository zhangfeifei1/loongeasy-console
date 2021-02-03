export default [
    {
      url: '/monitor/system/health',
      type: 'get',
      response: config => {
        return { 'response': '{"returnCode": "000000","message": "success","path": "","data": {"components": [{"systemId": "00001", "subGroupName": "web", "healthyDegree": "100.0000%","timestamp": "2020-09-25 10:00:00"},{ "systemId": "00001", "subGroupName": "gateway","healthyDegree": "100.0000%","timestamp": "2020-09-25 10:00:00"},{"systemId": "00001", "subGroupName": "frontend","healthyDegree": "100.0000%","timestamp": "2020-09-25 10:00:00"}],"system": { "systemId": "00001", "healthyDegree": "100.0000%","timestamp": "2020-09-25 10:00:00" }, "performance": {"tradeCount": "16", "businessSuccRate": "68.7500%","appSuccRate": "100.0000%","useTime": "217ms","timestamp": "2020-09-25 10:00:00"}},"extra": {},"timestamp": "1601256741994"}', 'isEncrypt': '0' }
      }
    }
  ]
  