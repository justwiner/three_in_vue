// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as THREE from 'three'
import 'static/openjs/three/controls/DeviceOrientationControls'
import 'static/openjs/three/controls/DragControls'
import 'static/openjs/three/controls/EditorControls'
import 'static/openjs/three/controls/FirstPersonControls'
import 'static/openjs/three/controls/FlyControls'
import 'static/openjs/three/controls/OrbitControls'
import 'static/openjs/three/controls/OrthographicTrackballControls'
import 'static/openjs/three/controls/PointerLockControls'
import 'static/openjs/three/controls/TrackballControls'
import 'static/openjs/three/controls/TransformControls'
import 'static/openjs/three/controls/VRControls'
import Stats from 'static/openjs/three/Stats'

import '../../css/main.css'

window.Stats = Stats
window.THREE = THREE

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
