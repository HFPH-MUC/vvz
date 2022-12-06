import Vue from 'vue'

const filter = function (text, length, clamp) {
  clamp = clamp || '…'
  const node = document.createElement('div')
  node.innerHTML = text
  const content = node.textContent

  return content.length > length ? content.slice(0, length) + clamp : content
}

Vue.filter('truncate', filter)
