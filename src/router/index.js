import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import allRoles from '../utils/roles'
// import ROUTER_ACTIVE from '@/router/activeRoutes'
// Vue.prototype.$ROUTER_ACTIVE = ROUTER_ACTIVE

// let _routes = []
// Vue.prototype.$ROUTER_ACTIVE(function (list) {
//   _routes = list
// })
// console.log(_routes)

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/dashboard',
    component: () => import('@/layout'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          name: '仪表盘',
          icon: 'el-icon-s-data'
        }
      },
      // dataCenter
      // {
      //   path: '/graphitizing',
      //   name: 'graphitizing',
      //   component: () => import('@/views/dataCenter/craft/graphitizing'),
      //   meta: {
      //     name: '石墨化',
      //     icon: 'el-icon-c-scale-to-original'
      //   }
      // },
      // {
      //   path: '/naturalGas',
      //   name: 'naturalGas',
      //   component: () => import('@/views/dataCenter/craft/naturalGas'),
      //   meta: {
      //     name: '一烧',
      //     icon: 'el-icon-stopwatch'
      //   }
      // },
      // {
      //   path: '/profiling',
      //   name: 'profiling',
      //   component: () => import('@/views/dataCenter/craft/profiling'),
      //   meta: {
      //     name: '压型',
      //     icon: 'el-icon-coin'
      //   }
      // },
      // {
      //   path: '/steep',
      //   name: 'steep',
      //   component: () => import('@/views/dataCenter/craft/steep'),
      //   meta: {
      //     name: '浸渍',
      //     icon: 'el-icon-brush'
      //   }
      // },
      // {
      //   path: '/tunnel',
      //   name: 'tunnel',
      //   component: () => import('@/views/dataCenter/craft/tunnel'),
      //   meta: {
      //     name: '隧道窑',
      //     icon: 'el-icon-magic-stick'
      //   }
      // },
      {
        path: '/CEMS',
        name: 'CEMS',
        component: () => import('@/views/dataCenter/environment/CEMS'),
        meta: {
          name: 'CEMS'
        }
      },
      {
        path: '/roastingWetElectricity',
        name: 'roastingWetElectricity',
        component: () => import('@/views/dataCenter/environment/roastingWetElectricity'),
        meta: {
          name: '湿电'
        }
      },
      {
        path: '/airCar',
        name: 'airCar',
        component: () => import('@/views/dataCenter/environment/airCar'),
        meta: {
          name: '吸料天车'
        }
      },
      {
        path: '/dust',
        name: 'dust',
        component: () => import('@/views/dataCenter/environment/dust'),
        meta: {
          name: '扬尘'
        }
      },
      {
        path: '/organizedVOC',
        name: 'organizedVOC',
        component: () => import('@/views/dataCenter/environment/organizedVOC'),
        meta: {
          name: '有组织VOC'
        }
      },
      {
        path: '/unorganizedVOC',
        name: 'unorganizedVOC',
        component: () => import('@/views/dataCenter/environment/unorganizedVOC'),
        meta: {
          name: '无组织VOC'
        }
      },
      {
        path: '/IPC',
        name: 'IPC',
        component: () => import('@/views/dataCenter/safety/IPC'),
        meta: {
          name: 'IPC'
        }
      },

      // configCenter
      {
        path: '/deviceTable',
        name: 'deviceTable',
        component: () => import('@/views/configCenter/device Table'),
        meta: {
          name: '设备表',
          icon: 'el-icon-document-copy'
        }
      },
      {
        path: '/deviceType',
        name: 'deviceType',
        component: () => import('@/views/configCenter/device Type'),
        meta: {
          name: '设备类型',
          icon: 'el-icon-wallet'
        }
      },
      {
        path: '/platform',
        name: 'platform',
        component: () => import('@/views/configCenter/platform'),
        meta: {
          name: '平台参数',
          icon: 'el-icon-monitor'
        }
      },

      // reportFrom
      {
        path: '/reportForm',
        name: 'reportForm',
        component: () => import('@/views/dashboard'),
        meta: {
          name: '报表中心'
        }
      },

      // authority
      {
        path: '/api',
        name: 'api',
        component: () => import('@/views/authority/api'),
        meta: {
          name: 'api管理',
          icon: 'el-icon-postcard'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/authority/role'),
        meta: {
          name: '角色管理',
          icon: 'el-icon-s-check'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/authority/user'),
        meta: {
          name: '用户管理',
          icon: 'el-icon-user'
        }
      },
      // 环保维护
      {
        path: '/maintain',
        name: 'maintain',
        component: () => import('@/views/maintain/index.vue'),
        meta: {
          name: '环保维护',
          icon: 'el-icon-document-add'
        }
      },

      // personal
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/personal'),
        meta: {
          name: '个人中心',
          icon: 'el-icon-user-solid'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404')
  }]
// {
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login' || to.fullPath === '404') {
    next()
  } else {
    store.commit('SET_CURRENTPAGE', to.fullPath)
    const getRoles = JSON.stringify(allRoles[1]).indexOf(to.fullPath) !== -1
    if (!getRoles) next('/login')
    if (getRoles) {
      const add = JSON.stringify(store.getters.getEditableTabs).indexOf(to.fullPath) === -1
      if (add && to.name !== '404') store.commit('ADD_EDITABLETABS', { title: to.meta.name, name: to.fullPath, icon: to.meta.icon || '' })
      store.commit('EDIT_EDITABLETABSVALUE', to.fullPath)
      next()
    }
  }
})

export default router
