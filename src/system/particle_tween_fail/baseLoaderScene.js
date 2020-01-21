import { initStats, initRenderer, initOrbitControls } from '@/lib/three/utils'

/**
 * Simple base class, which setups a simple scene which is used to 
 * demonstrate the different loaders. This create a scene, three
 * lights, and slowly rotates the model, around the z-axis
 */
function BaseLoaderScene(providedCamera, shouldAddLights, shouldRotate, updateMesh, dom) {

  let that = this;

  // setup some default elements
  this.scene = new THREE.Scene();
  this.stats = initStats();
  this.clock = new THREE.Clock();
  this.camera = providedCamera;
  this.withLights = (shouldAddLights !== undefined) ? shouldAddLights : true;
  this.shouldRotate = (shouldRotate !== undefined) ? shouldRotate : true;
  this.updateMesh = updateMesh

  // initialize basic renderer
  this.renderer = initRenderer({
    antialias: true
  }, dom);

  this.orbitControls = initOrbitControls(this.camera, this.renderer);

  /**
   * Start the render loop of the provided object
   * 
   * @param {Three.Object3D} mesh render this mesh or object
   * @param {*} camera render using the provided camera settings
   */
  this.render = function (mesh, camera) {
    that.scene.add(mesh);
    that.camera = camera;
    that.mesh = mesh;
    that._render();
  }

  /**
   * Interal function, called continously to render the scene
   */
  this._render = function () {
    that.stats.update();
    requestAnimationFrame(that._render);
    that.orbitControls.update(that.clock.getDelta());

    if (updateMesh) updateMesh(that.mesh)

    if (shouldRotate) {
      that.mesh.rotation.z += 0.01
    }

    that.renderer.render(that.scene, that.camera);
  }

  /**
   * Internal function, which adds a number of lights to the scene.
   */
  this._addLights = function () {
    let keyLight = new THREE.SpotLight(0xffffff);
    keyLight.position.set(0, 80, 80);
    keyLight.intensity = 2;
    keyLight.lookAt(new THREE.Vector3(0, 15, 0));
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.mapSize.width = 4096;
    this.scene.add(keyLight);

    let backlight1 = new THREE.SpotLight(0xaaaaaa);
    backlight1.position.set(150, 40, -20);
    backlight1.intensity = 0.5;
    backlight1.lookAt(new THREE.Vector3(0, 15, 0));
    this.scene.add(backlight1);

    let backlight2 = new THREE.SpotLight(0xaaaaaa);
    backlight2.position.set(-150, 40, -20);
    backlight2.intensity = 0.5;
    backlight2.lookAt(new THREE.Vector3(0, 15, 0));
    this.scene.add(backlight2);
  }

  // add the lights
  if (this.withLights) this._addLights();

}

export default BaseLoaderScene