import request from '../../utils/http'

export function getUnOrgVOCData (params) {
  return request({
    url: 'getDeviceData',
    method: 'get',
    params: params
  })
}

export function getUnOrgVOCByType (params) {
  return request({
    url: 'getDeviceByType',
    method: 'get',
    params: params
  })
}
