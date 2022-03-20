// import store from '@/store'

// const modules = require.context('../views/', true, /index\.vue$/)
// const map = new Map()
// const routerList = []

// modules.keys().map(each => {
//   const file = modules(each)
//   const url = each.replace('.', '')
//   map.set(file.default.name, (resolve) => require([`@/views${url}`], resolve))
// })

// /**
//  *
//  * @param {Array} per
//  * @param {function} _recursion
//  */

// function recursion (per) {
//   // console.log('reouterList', routerList)
//   per.map(each => {
//     if (each.children === '' || each.children === undefined) {
//       const component = map.get(each.component)
//       // console.log(each.component)
//       const child = { path: each.path, name: each.name, component: component }
//       routerList.push(child)
//     } else {
//       recursion(each.children)
//     }
//   })
// }

// /**
//  *
//  * @param {function} successCallBack
//  */

// function getRouterList (successCallBack) {
//   const userInfo = store.getters.getUserInfo
//   console.log(userInfo)
//   var _routes = [
//     {
//       path: '/',
//       redirect: '/login'
//     },
//     {
//       path: '/main',
//       name: 'main',
//       component: () => import('@/layout'),
//       children: []
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('@/views/login')
//     },
//     {
//       path: '*',
//       name: '404',
//       component: () => import(/* webpackChunkName: "about" */ '../views/404')
//     }]
//   if (!userInfo) {
//     successCallBack(_routes)
//     return
//   }
//   recursion(userInfo.permission)
//   _routes[1].children = routerList
//   successCallBack(_routes)
// }

// export default getRouterList
