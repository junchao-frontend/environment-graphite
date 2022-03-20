import request from '../../utils/http'

export function showRoleTable (params) {
  return request({
    url: 'role/get',
    method: 'get',
    params: params
  })
}

export function deleteRole (_id, params) {
  return request({
    url: 'role/delete?_id=' + _id,
    method: 'delete',
    params: params
  })
}

export function updateRole (payload) {
  return request({
    url: 'role/update',
    method: 'put',
    data: payload
  })
}
export function newRole (payload) {
  return request({
    url: 'role/create',
    method: 'post',
    data: payload
  })
}
