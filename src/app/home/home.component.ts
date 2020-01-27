import { Component, OnInit } from '@angular/core';
import { Lobby } from './interactive-lobby/Lobby'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let  renderer, scene;
let camera, hemiLight, hemiLightHelper
let dirLight, dirLightHeper



function init() {
  const canvas = document.querySelector('#c');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
  //--Renderer Init
  

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xf0fff0, 0.01 );



	renderer = new THREE.WebGLRenderer({canvas});


  


  camera = new THREE.PerspectiveCamera( 70, canvas.clientWidth / canvas.clientHeight, 1, 1000 );
	camera.position.set( 0, 2, 0 );
  scene.add(camera)

  dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(- 1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
  scene.add(dirLight);

  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  var d = 50;

  dirLight.shadow.camera.left = - d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = - d;

  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = - 0.0001;

  dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
  scene.add(dirLightHeper);

  // GROUND

  var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
  var groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  groundMat.color.setHSL(0.095, 1, 0.75);

  var ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = - 33;
  ground.rotation.x = - Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  
  // RENDERER

 
  animate()
}



function animate() {


  render();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);


}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);




  }
  return needResize;
}


function render() {


  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lobby
  constructor() { }

  ngOnInit() {

    
    init()

  }

  ngAfterViewInit() {

  }

}
