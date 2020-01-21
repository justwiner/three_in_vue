<template>
  <div class="particleTween">
    <div ref="webglParticleTween"></div>
  </div>
</template>

<script>
import { initStats, initRenderer, initCamera, initOrbitControls } from '@/lib/three/utils'
import BaseLoaderScene from './baseLoaderScene'
import TWEEN from '@tweenjs/tween.js'

let posSrc = { pos: 1}  
export default {
  name: 'Earth',
  data () {
    return {
      camera: null,
      orbitControls: null,
      tween: null,
      tweenBack: null,
      loaderScene:null,
      loader: null,
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.camera = initCamera(new THREE.Vector3(30, 30, 30));
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.tween = new TWEEN.Tween(posSrc).to({pos: 0}, 2000); 
      this.tween.easing(TWEEN.Easing.Bounce.InOut);

      this.tweenBack = new TWEEN.Tween(posSrc).to({pos: 1}, 2000);
      this.tweenBack.easing(TWEEN.Easing.Bounce.InOut);

      this.tweenBack.chain(this.tween); 
      this.tween.chain(this.tweenBack);

      this.tween.start()

      this.loaderScene = new BaseLoaderScene(this.camera, false, false, (mesh) => {
        TWEEN.update();

        let positionArray = mesh.geometry.attributes['position']
        let origPosition = mesh.geometry.origPosition

        for (let i = 0; i < positionArray.count ; i++) {
          let oldPosX = origPosition.getX(i);
          let oldPosY = origPosition.getY(i);
          let oldPosZ = origPosition.getZ(i);
          positionArray.setX(i, oldPosX * posSrc.pos);
          positionArray.setY(i, oldPosY * posSrc.pos);
          positionArray.setZ(i, oldPosZ * posSrc.pos);
        }
        positionArray.needsUpdate = true;
      }, this.$refs['webglParticleTween']);

      this.loader = new THREE.PLYLoader();
      this.loader.load("../../assets/models/carcloud/carcloud.ply", (geometry) => {
        let material = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 1,
          opacity: 0.6,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          map: this.generateSprite()
        });

        // copy the original position, so we can referene that when tweening
        let origPosition = geometry.attributes['position'].clone()
        geometry.origPosition = origPosition

        let group = new THREE.Points(geometry, material);
        group.scale.set(2.5, 2.5, 2.5);
        this.loaderScene.render(group, this.camera);
      });
    },
    generateSprite () {
      let canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      let context = canvas.getContext('2d');

      // draw the sprites
      let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
      gradient.addColorStop(1, 'rgba(0,0,0,1)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // create the texture
      let texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.particleTween {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
