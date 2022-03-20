import request from '../../utils/http'
// updatepsw
export function updatepsw (payload) {
  return request({
    url: 'user/changePassword',
    method: 'post',
    data: payload
  })
}

// 平台参数
export function getPlatform (payload) {
  return request({
    url: 'getPlatform',
    method: 'get',
    params: payload
  })
}
