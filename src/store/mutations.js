const mutations = {
  changeHandleNavBar (state, data) {
    state.handleNavBar = data || !state.handleNavBar
  },
  handleThemeType (state, type) {
    window.document.documentElement.setAttribute('data-theme', type)
    state.themeType = type
  },
  SET_USERINFO (state, data) {
    state.userInfo = data
    sessionStorage.setItem('userInfo', JSON.stringify(data))
  },
  SET_CURRENTPAGE (state, path) {
    state.currentPage = path
  },
  ADD_EDITABLETABS (state, route) {
    state.editableTabs.push(route)
    sessionStorage.setItem('tableTabs', JSON.stringify(state.editableTabs))
  },
  SET_EDITABLETABS (state, List) {
    state.editableTabs = List
    sessionStorage.setItem('tableTabs', JSON.stringify(List))
  },
  EDIT_EDITABLETABSVALUE (state, value) {
    state.editableTabsValue = value
  }
}

export default mutations
