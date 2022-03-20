import request from '../../utils/http'

export function showApiTable (params) {
  return request({
    url: 'api/get',
    method: 'get',
    params: params
  })
}

export function deleteApi (_id, params) {
  return request({
    url: 'api/delete?_id=' + _id,
    method: 'delete',
    params: params
  })
}

export function updateApi (payload) {
  return request({
    url: 'api/update',
    method: 'put',
    data: payload
  })
}
export function newApi (payload) {
  return request({
    url: 'api/create',
    method: 'post',
    data: payload
  })
}
