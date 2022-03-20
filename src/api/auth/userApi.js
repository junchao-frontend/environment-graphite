import request from '../../utils/http'

export function showUserTable (params) {
  return request({
    url: 'user/get',
    method: 'get',
    params: params
  })
}

export function deleteUser (_id, params) {
  return request({
    url: 'user/delete?_id=' + _id,
    method: 'delete',
    params: params
  })
}

export function updateUser (payload) {
  return request({
    url: 'user/update',
    method: 'put',
    data: payload
  })
}
export function newUser (payload) {
  return request({
    url: 'user/create',
    method: 'post',
    data: payload
  })
}

export function updatedAvater (who, payload) { // form-data形式
  return request({
    url: 'minio/upload?bucketName=' + who,
    method: 'post',
    data: payload
  })
}

// 重置密码
export function resetPassword (payload) {
  return request({
    url: 'user/resetPass',
    method: 'post',
    data: payload
  })
}
