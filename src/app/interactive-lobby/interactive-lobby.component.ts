
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

//threeJS imports :
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

//Game classes :
import {CameraController} from './classes/CameraController'
import {PlayerController} from './classes/PlayerController';


import { ObstacleController } from "./classes/ObstacleController";
import { ObstaclePooler } from "./classes/ObstaclePooler";

import {GameObjectManager} from './classes/GameObjectManager';
import {InputManager} from './classes/InputManager';



import {globals} from './classes/globals'


//--GAME_CODE-------------------

var renderer;


var scene , camera, world; 
var controls, loader, matLoader;

var water, sky, sunSphere;

let then = 0;
let loadedModels = [];
let gameObjects = [];
let animationControllers = [];

const gameObjectManager = new GameObjectManager();
const obstaclePooler = new ObstaclePooler();
export let  inputManager  ;



//Initialize after models are loaded
const manager = new THREE.LoadingManager();
manager.onLoad = init;

export let models = {
  human:    { url: '../../assets/models/Male_Casual.gltf', gltf : null, animations : {} },
  boulder : { url: '../../assets/models/Rock.gltf', gltf : null, animations : {} },
  
};
{
  const gltfLoader = new GLTFLoader(manager);
  for (const model of Object.values(models)) {
    gltfLoader.load(model.url, (gltf) => {
      model.gltf = gltf;
      
    });
  }
}




function loadAnimations(){
	Object.values(models).forEach(model => {
      const animsByName = {};
      model.gltf.animations.forEach((clip) => {
        animsByName[clip.name] = clip;
        loadedModels.push(model.gltf) ;
      });
      model.animations = animsByName;
    });
}


function init(){
	
	inputManager = new InputManager()
	loadAnimations();

	//-Var initilization
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xf0fff0, 0.01 );
	



	//--Camera init
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 0 );
	
	globals.camera = camera;
	scene.add(camera);



	
	//--Renderer Init
	const canvas = document.querySelector('#scene') ;
	renderer = new THREE.WebGLRenderer({canvas});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );



	//-SETTING-UP-ENIVRONMENT

	

	//--ADDING-SKY
	initSky();
	

	//--ADDING LIGHTNING
	var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
	var light = new THREE.DirectionalLight( 0xffffff, 0.8);
	
	ambientLight.castShadow = true;
	light.castShadow = true;
	scene.add( ambientLight );
	scene.add( light );

	//--ADDING-WATER :

	var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );
	water = new Water(
		waterGeometry,
		{
			textureWidth: 100,
			textureHeight: 100,
			waterNormals: new THREE.TextureLoader().load( '../../assets/textures/waternormals.jpg', function ( texture ) {
						texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					} ),
			alpha: 1.0,
			sunDirection: light.position.clone().normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: scene.fog !== undefined,

		}									
	);
	water.rotation.x = - Math.PI / 2;
	water.material.uniforms[ 'sunDirection' ].value.copy( light.position ).normalize();
	scene.add( water );




	//GAMEOBJECTS CREATION : 

	//--Camera gameObject and camera info component atteced to it 
	const camGameObject = gameObjectManager.createGameObject(scene, 'camera');
	globals.cameraInfo = camGameObject.addComponent(CameraController);


	const gameObject = gameObjectManager.createGameObject(scene, 'player');
	gameObject.addComponent(PlayerController);
	

	const obstacleExample = obstaclePooler.addObstacle(scene, 'obstacle', ObstacleController);
	

	const control = new TransformControls( camera, renderer.domElement );
	control.attach(obstacleExample.transform );
	scene.add( control );


	const playerControl = new TransformControls( camera, renderer.domElement );
	playerControl.attach(gameObject.transform );
	scene.add( playerControl );

	camera.lookAt(gameObject.transform);

	requestAnimationFrame( Render );


}


//Skybox creation: 
function initSky() {
	// Add Sky
	sky = new Sky();
	sky.scale.setScalar( 450000 );
	scene.add( sky );

	// Add Sun Helper
	sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 20000, 16, 8 ),
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


//Update frame loop : 
function Update(){
	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
	
	//Update all instanciated gameobjects :
	gameObjectManager.update();
	inputManager.update();


}

//Draws scene : 
function Render (now){
	// convert to seconds
    globals.time = now * 0.001;
    // make sure delta time isn't too big.
    globals.deltaTime = Math.min(globals.time - then, 1 / 20);
    then = globals.time;

	
	
	Update();


	renderer.render( scene, camera );
	requestAnimationFrame( Render );


}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.updateProjectionMatrix();

	requestAnimationFrame(Render);
}







//--END_GAME_CODE-------------------



@Component({
  selector: 'app-interactive-lobby',
  templateUrl: './interactive-lobby.component.html',
  styleUrls: ['./interactive-lobby.component.css']
})
export class InteractiveLobbyComponent implements AfterViewInit{
  @ViewChild('Scene',{static:false}) scene : ElementRef;
	
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(){

  }


}
