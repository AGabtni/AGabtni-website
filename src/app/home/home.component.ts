import { Component, OnInit } from '@angular/core';
import { Lobby } from './interactive-lobby/Lobby'
import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let  renderer, scene;
let camera, hemiLight, hemiLightHelper
let dirLight, dirLightHeper


//Skybox creation: 
function initSky() {
	// Add Sky
	var sky = new Sky();
	sky.scale.setScalar( 450000 );
	scene.add( sky );

	// Add Sun Helper
	var sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 80000, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff } )
	);
	sunSphere.position.y = - 700000;
	sunSphere.visible = false;
	scene.add( sunSphere );

	var effectController = {
		turbidity: 10,
		rayleigh: 2,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.8,
		luminance: 0.9,
		inclination: 0.49, // elevation / inclination
		azimuth: 0.125, // Facing front,
		sun: ! true
	};
	var distance = 400000;

	var uniforms = sky.material.uniforms;
	uniforms[ "turbidity" ].value = effectController.turbidity;
	uniforms[ "rayleigh" ].value = effectController.rayleigh;
	uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
	uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;
	uniforms[ "luminance" ].value = effectController.luminance;
				
	var theta = Math.PI * ( effectController.inclination - 0.5 );
	var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
	sunSphere.position.x = distance * Math.cos( phi );
	sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
	sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
	sunSphere.visible = effectController.sun;
	uniforms[ "sunPosition" ].value.copy( sunSphere.position );
	

	renderer.render( scene, camera );
}
function init() {
  const canvas = document.querySelector('#c');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
  //--Renderer Init
  

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xf0fff0, 0.01 );



	renderer = new THREE.WebGLRenderer({canvas});


  


  camera = new THREE.PerspectiveCamera( 30, canvas.clientWidth / canvas.clientHeight, 1, 1000 );
	camera.position.set( 0, 0, 0 );
  scene.add(camera)

  initSky()


  
  
  // RENDERER
  renderer.render( scene, camera );
 
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
    animate()
  }

  ngAfterViewInit() {

  }

}
