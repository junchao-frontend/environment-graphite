import axios from '../utils/http'

export function test (params) {
  return axios({
    url: '/test',
    method: 'get',
    params: params
  })
}
