import Stats from '../../../static/openjs/three/Stats'
import * as THREE from 'three'

/**
 * Initialize the statistics domelement
 * 
 * @param {Number} type 0: fps, 1: ms, 2: mb, 3+: custom
 * @returns stats javascript object
 */
function initStats(type) {

    let panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    let stats = new Stats();

    stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    return stats;
}

/**
 * Initialize a simple default renderer and binds it to the "webgl-output" dom
* element.
 * 
 * @param additionalProperties Additional properties to pass into the renderer
 * @param dom HTML container
 */
function initRenderer(additionalProperties, dom) {

    let props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
    let renderer = new THREE.WebGLRenderer(props);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    dom.appendChild(renderer.domElement);

    return renderer;
}

/**
 * Initialize a simple camera and point it at the center of a scene
 * 
 * @param {THREE.Vector3} [initialPosition]
 */
function initCamera(initialPosition) {
    let position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
}

/**
 * Initialize trackball controls to control the scene
 * 
 * @param {THREE.Camera} camera 
 * @param {THREE.Renderer} renderer 
 */
function initTrackballControls(camera, renderer) {
    let trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];

    return trackballControls;
}

/**
 * Initialize orbit controls to control the scene
 * 
 * @param {THREE.Camera} camera 
 * @param {THREE.Renderer} renderer 
 */
function initOrbitControls (camera, renderer) {
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    return orbitControls;
}

export {
    initStats,
    initRenderer,
    initCamera,
    initTrackballControls,
    initOrbitControls,
}