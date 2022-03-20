import request from '../../utils/http'

export function showDevice (params) {
  return request({
    url: 'device/get',
    method: 'get',
    params: params
  })
}

export function deleteDevice (_id, params) {
  return request({
    url: 'device/delete?_id=' + _id,
    method: 'delete',
    params: params
  })
}

export function updateDevice (payload) {
  return request({
    url: 'device/update',
    method: 'put',
    data: payload
  })
}
export function newDevice (payload) {
  return request({
    url: 'device/create',
    method: 'post',
    data: payload
  })
}
