<template>
  <div class="particle">
    <div ref="webglParticle"></div>
  </div>
</template>

<script>
import { initStats, initRenderer, initCamera, initOrbitControls } from '../../lib/three/utils'
import dat from 'dat.gui'
export default {
  name: 'Earth',
  data () {
    return {
      stats: null,
      renderer: null,
      camera: null,
      orbitControls: null,
      scene: null,
      clock: null,
      cloud: null,
      step: 0,
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.stats = initStats();
      this.renderer = initRenderer({}, this.$refs['webglParticle']);
      this.camera = initCamera();
      this.clock = new THREE.Clock();
      this.orbitControls = initOrbitControls(this.camera, this.renderer);

      this.scene = new THREE.Scene();

      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 150;

      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.addControls()
      this.render()
    },
    /**
     * 初始化粒子效果
     */
    createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, colorValue, vertexColorValue) {
      let geom = new THREE.Geometry();
      let material = new THREE.PointsMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        vertexColors: vertexColors,

        sizeAttenuation: sizeAttenuation,
        color: new THREE.Color(colorValue)
      });


      let range = 500;
      for (let i = 0; i < 15000; i++) {
        let particle = new THREE.Vector3(
          Math.random() * range - range / 2,
          Math.random() * range - range / 2,
          Math.random() * range - range / 2);
        geom.vertices.push(particle);
        let color = new THREE.Color(vertexColorValue);
        let asHSL = {};
        color.getHSL(asHSL);
        color.setHSL(asHSL.h, asHSL.s, asHSL.l * Math.random());
        geom.colors.push(color);
      }

      this.cloud = new THREE.Points(geom, material);
      this.cloud.name = "particles";
      this.scene.add(this.cloud);
    },
    /**
     * 渲染方法
     */
    render () {
      // 更新性能面板
      this.stats.update();
      // 更新控制器
      this.orbitControls.update(this.clock.getDelta());
      // 是否选装
      if (this.controls.rotate) {
        this.step += this.controls.rotateSpeed;
        this.cloud.rotation.x = this.step;
        this.cloud.rotation.z = this.step;
      }
      // 重新渲染
      requestAnimationFrame(this.render);
      // 渲染webGL
      this.renderer.render(this.scene, this.camera);
    },
    /**
     * 添加辅助控件
     */
    addControls () {
      this.controls = {
        size: 2,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        color: 0xffffff,
        vertexColor: 0x00ff00,
        sizeAttenuation: true,
        rotate: true,
        rotateSpeed: 0.005,
        redraw: () => {
          if (this.scene.getObjectByName("particles")) {
            this.scene.remove(this.scene.getObjectByName("particles"));
          }
          this.createParticles(
            this.controls.size,
            this.controls.transparent,
            this.controls.opacity,
            this.controls.vertexColors,
            this.controls.sizeAttenuation,
            this.controls.color,
            this.controls.vertexColor
          );
        }
      }
      let gui = new dat.GUI();
      gui.add(this.controls, 'size', 0, 10).onChange(this.controls.redraw);
      gui.add(this.controls, 'transparent').onChange(this.controls.redraw);
      gui.add(this.controls, 'opacity', 0, 1).onChange(this.controls.redraw);
      gui.add(this.controls, 'vertexColors').onChange(this.controls.redraw);
      
      gui.addColor(this.controls, 'color').onChange(this.controls.redraw);
      gui.addColor(this.controls, 'vertexColor').onChange(this.controls.redraw);
      gui.add(this.controls, 'sizeAttenuation').onChange(this.controls.redraw);
      gui.add(this.controls, 'rotateSpeed', 0, 0.1).onChange(this.controls.redraw);
      gui.add(this.controls, 'rotate');

      this.controls.redraw();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.particle {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
