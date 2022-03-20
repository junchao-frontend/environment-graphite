import req from '../utils/http'

export function getMaintainData (params) {
  return req({
    url: 'hbMaintain/get',
    method: 'get',
    params: params
  })
}

export function postMaintainData (params) {
  return req({
    url: 'hbMaintain/create',
    method: 'post',
    data: params
  })
}

export function updateMaintain (payload) {
  return req({
    url: 'hbMaintain/update',
    method: 'put',
    data: payload
  })
}

export function deleteMaintain (_id, payload) {
  return req({
    url: 'hbMaintain/delete?_id=' + _id,
    method: 'delete',
    params: payload
  })
}
export function updatedAvater (payload) { // form-data形式
  return req({
    url: 'minio/uploadMany?bucketName=hbmaintain',
    method: 'post',
    data: payload
  })
}
