// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Particle from './Particle.vue'
import * as THREE from 'three'
import 'static/openjs/three/controls/OrbitControls'
import Stats from 'static/openjs/three/Stats'

import '../../css/main.css'

window.Stats = Stats
window.THREE = THREE

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Particle)
})
