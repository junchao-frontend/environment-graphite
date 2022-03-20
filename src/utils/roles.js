const roleTest = [
  {
    id: '1',
    path: '/dashboard',
    name: '仪表盘',
    icon: 'el-icon-s-data'
  },
  // {
  //   id: '21',
  //   path: '/craft',
  //   name: '工艺',
  //   icon: 'iconfont icon-gongyi1',
  //   children: [
  //   ]
  // },
  // {
  //   id: '211',
  //   path: '/graphitizing',
  //   name: '石墨化',
  //   icon: 'el-icon-c-scale-to-original'
  // },
  // {
  //   id: '211',
  //   path: '/tunnel',
  //   name: '隧道窑',
  //   icon: 'el-icon-magic-stick'
  // },
  // {
  //   id: '211',
  //   path: '/steep',
  //   name: '浸渍',
  //   icon: 'el-icon-brush'
  // },
  // {
  //   id: '211',
  //   path: '/profiling',
  //   name: '压型',
  //   icon: 'el-icon-coin'
  // },
  // {
  //   id: '211',
  //   path: '/naturalGas',
  //   name: '一烧',
  //   icon: 'el-icon-stopwatch'
  // },
  {
    id: '222',
    path: '/organizedVOC',
    name: '有组织VOC',
    icon: 'el-icon-s-home'
  },
  {
    id: '223',
    path: '/unorganizedVOC',
    name: '无组织VOC',
    icon: 'el-icon-s-grid'
  },
  {
    id: '226',
    path: '/airCar',
    name: '吸料天车',
    icon: 'el-icon-truck'
  },
  {
    id: '225',
    path: '/roastingWetElectricity',
    name: '湿电',
    icon: 'el-icon-data-line'
  },
  {
    id: '224',
    path: '/CEMS',
    name: 'CEMS',
    icon: 'el-icon-c-scale-to-original'
  },
  {
    id: '23',
    path: '/safety',
    name: '安全',
    icon: 'iconfont icon-anquan1',
    children: [
      {
        path: '/IPC',
        name: 'IPC'
      }
    ]
  },
  // {
  //   id: '3',
  //   path: '/reportForm',
  //   name: '报表中心',
  //   icon: 'el-icon-tickets'
  // },
  {
    id: '4',
    path: '/config',
    name: '配置中心',
    icon: 'iconfont icon-zhigongyidan',
    children: [
      {
        path: '/deviceType',
        name: '设备类型',
        icon: 'el-icon-wallet'
      },
      {
        path: '/deviceTable',
        name: '设备表',
        icon: 'el-icon-document-copy'
      },
      {
        path: '/platform',
        name: '平台参数',
        icon: 'el-icon-monitor'
      }
    ]
  },
  {
    id: '5',
    path: '/authority',
    name: '权限中心',
    icon: 'el-icon-lock',
    children: [
      {
        path: '/api',
        name: 'api管理',
        icon: 'el-icon-postcard'
      },
      {
        path: '/role',
        name: '角色管理',
        icon: 'el-icon-s-check'
      },
      {
        path: '/user',
        name: '用户管理',
        icon: 'el-icon-user'
      }
    ]
  },
  {
    id: '7',
    path: '/maintain',
    name: '环保维护',
    icon: 'el-icon-document-add'
  },
  {
    id: '6',
    path: '/personal',
    name: '个人中心',
    icon: 'el-icon-user-solid'
  }
]

const roleData = [
  {
    id: '1',
    path: '/dashboard',
    name: '仪表盘',
    icon: 'el-icon-s-data'
  },
  {
    id: '222',
    path: '/organizedVOC',
    name: '有组织VOC',
    icon: 'el-icon-s-home'
  },
  {
    id: '223',
    path: '/unorganizedVOC',
    name: '无组织VOC',
    icon: 'el-icon-s-grid'
  },
  {
    id: '226',
    path: '/airCar',
    name: '吸料天车',
    icon: 'el-icon-truck'
  },
  {
    id: '225',
    path: '/roastingWetElectricity',
    name: '湿电',
    icon: 'el-icon-data-line'
  },
  {
    id: '224',
    path: '/CEMS',
    name: 'CEMS',
    icon: 'el-icon-c-scale-to-original'
  },

  {
    id: '23',
    path: '/safety',
    name: '安全',
    icon: 'iconfont icon-anquan1',
    children: [
      {
        path: '/IPC',
        name: 'IPC'
      }
    ]
  },
  {
    id: '7',
    path: '/maintain',
    name: '环保维护',
    icon: 'el-icon-document-add'
  },
  {
    id: '6',
    path: '/personal',
    name: '个人中心',
    icon: 'el-icon-user-solid'
  }
]

const roleVision = [
  {
    id: '1',
    path: '/dashboard',
    name: '仪表盘',
    icon: 'el-icon-s-data'
  },
  {
    id: '222',
    path: '/organizedVOC',
    name: '有组织VOC',
    icon: 'el-icon-s-home'
  },
  {
    id: '223',
    path: '/unorganizedVOC',
    name: '无组织VOC',
    icon: 'el-icon-s-grid'
  },
  {
    id: '226',
    path: '/airCar',
    name: '吸料天车',
    icon: 'el-icon-truck'
  },
  {
    id: '225',
    path: '/roastingWetElectricity',
    name: '湿电',
    icon: 'el-icon-data-line'
  },
  {
    id: '224',
    path: '/CEMS',
    name: 'CEMS',
    icon: 'el-icon-c-scale-to-original'
  },

  {
    id: '23',
    path: '/safety',
    name: '安全',
    icon: 'iconfont icon-anquan1',
    children: [
      {
        path: '/IPC',
        name: 'IPC'
      }
    ]
  },
  // {
  //   id: '3',
  //   path: '/reportForm',
  //   name: '报表中心',
  //   icon: 'el-icon-tickets'
  // },
  {
    id: '6',
    path: '/personal',
    name: '个人中心',
    icon: 'el-icon-user-solid'
  }
]

const allRoles = {
  1: roleTest,
  2: roleData,
  3: roleVision
}

export default allRoles
