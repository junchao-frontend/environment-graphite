import request from '../utils/http'
//
export function userLogin (payload) {
  return request({
    url: 'login',
    method: 'post',
    data: payload
  })
}
