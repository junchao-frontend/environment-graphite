import axios from '../utils/http'

export function getCEMSDeviceByType (params) {
  return axios({
    url: '/getDeviceByType',
    method: 'get',
    params: params
  })
}
export function getCEMSDeviceData (params) {
  return axios({
    url: '/getDeviceData',
    method: 'get',
    params: params
  })
}
// 湿电 获取数据
export function getWetElectricity (params) {
  return axios({
    url: '/wetElectricData/getData',
    method: 'get',
    params: params
  })
}
// 吸料天车 获取数据
export function getAirCarData (params) {
  return axios({
    url: '/skyCar/getWestData',
    method: 'get',
    params: params
  })
}
export function getTunnelBoxData (params) {
  return axios({
    url: '/tunnelData/getBoxData',
    method: 'get',
    params: params
  })
}
export function getTunnelDtuData (params) {
  return axios({
    url: '/tunnelData/getDtuData',
    method: 'get',
    params: params
  })
}
export function getSteepData (params) {
  return axios({
    url: 'dippingData/getData',
    method: 'get',
    params: params
  })
}

export function getGraphData (params) {
  return axios({
    url: 'graphitingData/getData',
    method: 'get',
    params: params
  })
}
// 首页cems数据
export function getMainCems (params) {
  return axios({
    url: '/dashboard/CEMSCurve',
    method: 'get',
    params: params
  })
}
