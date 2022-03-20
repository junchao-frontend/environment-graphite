import Vue from 'vue'

Vue.directive('perm-show', {
  bind: function (el, binding) {
    const lets = true
    if (lets) {
      el.parentNode.removeChild(el)
    }
  }
})
