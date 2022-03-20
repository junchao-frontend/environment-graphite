// 引入mockjs
import Mock from 'mockjs'
// 使用mockjs模拟数据
Mock.mock('http://20211129Mock.com/mode1/login', 'get', {
  code: 200,
  username: 'test',
  password: 'test',
  avatar: '',
  token: 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1M TI1NDQyOTksImV4cCI6MTUxMjYzMDY',
  permission: [
    {
      id: '1',
      path: '/dashborad',
      name: 'dashborad',
      icon: 'el-icon-eleme',
      component: 'dashborad'
      // component: () => import('@/views/dashborad')
    },
    {
      id: '2',
      path: '/dataCenter',
      name: 'dataCenter',
      icon: 'el-icon-eleme',
      children: [
        {
          id: '2-1',
          path: '/test1',
          name: 'test1',
          icon: 'el-icon-eleme',
          component: 'test'
        }
      ]
    }
    // {
    //   id: '3',
    //   path: '/test4',
    //   name: 'test4',
    //   icon: 'el-icon-eleme',
    //   component: 'test4'
    // }
  ]
})
