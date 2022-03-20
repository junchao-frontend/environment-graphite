import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editableTabs: JSON.parse(sessionStorage.getItem('tableTabs')) || [],
    editableTabsValue: '',
    handleNavBar: false,
    currentPage: '',
    themeType: '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
  },
  mutations,
  actions,
  modules,
  getters
})
