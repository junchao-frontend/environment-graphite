import request from '../../utils/http'

export function showDeviceTable (params) {
  return request({
    url: 'deviceType/get',
    method: 'get',
    params: params
  })
}

// export function deleteApi (_id, params) {
//   return request({
//     url: 'api/delete?_id=' + _id,
//     method: 'delete',
//     params: params
//   })
// }

export function updateDeviceType (payload) {
  return request({
    url: 'deviceType/update',
    method: 'put',
    data: payload
  })
}
export function newDeviceType (payload) {
  return request({
    url: 'deviceType/create',
    method: 'post',
    data: payload
  })
}
