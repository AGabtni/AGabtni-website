
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

//threeJS imports :
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';


import {GameObject} from './classes/GameObject';

//--GAME_CODE-------------------

var renderer;

function main(){

var scene , camera; 
var controls, loader, matLoader;

var water, sky, sunSphere;


let models = ['Male_Casual'];
let gameObjects = [];
let animationControllers = [];
	
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
			luminance: 0.8,
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

	function init(){

		//-Var initilization
		scene = new THREE.Scene();

		//--Camera init
		camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
		camera.position.set( 10, 10, 10 );
		camera.lookAt(scene.position);

		scene.add( camera );



		//--Renderer Init
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		//renderer.setClearColor(0xfffffff, 1);



		//-SETTING-UP-ENIVRONMENT

		//--Loading models
		var gameObject = new GameObject(models[0],scene);

		gameObjects.push(gameObject);
		//});
		


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
				textureWidth: 512,
				textureHeight: 512,
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

		scene.add( water );
		water.material.uniforms[ 'sunDirection' ].value.copy( light.position ).normalize();



		//--ADDING-SKY
		initSky();
		window.addEventListener( 'resize', onWindowResize , false );


		//--ADDING ORBIT CONTROLS :
		controls = new OrbitControls( camera, renderer.domElement );
		controls.maxPolarAngle = Math.PI * 0.495;
		controls.target.set( 0, 10 , 0);
		controls.minDistance = 40.0;
		controls.maxDistance = 200.0;
		controls.update();	
	}
    
	init();



	function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				requestAnimationFrame(Render);
			}
	//Update frame loop : 
	function Update(){


	}

	//Draws scene : 

	let then = 0;
	function Render (now){
		now *= 0.001;  // convert to seconds
	    const deltaTime = now - then;
	    then = now;


		if(gameObjects.length !=0 && gameObjects[0].animationController!=null){
			
			gameObjects[0].animationController.update(deltaTime);
		}

		water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
		
		Update();
		renderer.render( scene, camera );

		requestAnimationFrame( Render );


	}




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
	main();

  }

  ngAfterViewInit(){
  	  	this.scene.nativeElement.appendChild(renderer.domElement)

  }


}
