import SvgIcon from '@/components/SvgIcon'
import Vue from 'vue'
// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('../icons/svg', false, /\.svg$/)
requireAll(req)
