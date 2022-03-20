const getters = {
  getNavBarState: state => state.handleNavBar,
  getThemeType: state => state.themeType,
  getUserInfo: state => state.userInfo,
  getPermissionList: state => state.userInfo.permission,
  getCurrentPage: state => state.currentPage,
  getEditableTabs: state => {
    return state.editableTabs
  },
  getEditableTabsValue: state => state.editableTabsValue
}

export default getters
