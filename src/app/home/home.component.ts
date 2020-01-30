import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import {
	TextureEffect, BlendFunction, EffectPass, RenderPass, BloomEffect, KernelSize,
	OutlineEffect
} from "postprocessing";
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';



let renderer, scene;
let camera;
let cloudParticles;

let raycaster;
let composer, effectFXAA, outlinePass;;
let mouse = new THREE.Vector2();
let selectedObjects = [];
var shaderParams = {
	edgeStrength: 3.0,
	edgeGlow: 0.0,
	edgeThickness: 1.0,
	pulsePeriod: 0,
	rotate: false,
	usePatternTexture: false
};

function init() {

	//Setup renderer container

	const canvas = document.querySelector('#c');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	renderer = new THREE.WebGLRenderer({ canvas });


	//--Vars init :
	cloudParticles = [];
	composer = new EffectComposer(renderer);
	
	raycaster = new THREE.Raycaster;

	//--Scene setup

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2("rgba(7,13,24)", 0.001);
	renderer.setClearColor(scene.fog.color);

	//--Camera setup

	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 1;
	camera.rotation.x = 1.16;
	camera.rotation.y = -0.12;
	camera.rotation.z = 0.27;


	scene.add(camera)




	//--Load textures : 
	let loader = new THREE.TextureLoader();
	loader.load("../../assets/textures/smoke.png", function (texture) {
		//--Cloud geometry init  :
		let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
		let cloudMaterial = new THREE.MeshLambertMaterial
			({

				map: texture,
				transparent: true

			})





		for (let p = 0; p < 50; p++) {
			let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
			cloud.position.set(
				Math.random() * 800 - 400,
				500,
				Math.random() * 500 - 500
			);
			cloud.rotation.x = 1.16;
			cloud.rotation.y = -0.12;
			cloud.rotation.z = Math.random() * 2 * Math.PI;
			cloud.material.opacity = 0.55;
			cloudParticles.push(cloud);
			scene.add(cloud);
		}


		console.log(cloudParticles)

	});



	//--Lightning setup  :
	let ambient = new THREE.AmbientLight(0x555555);
	scene.add(ambient);


	//Nebula lights 
	let directionalLight = new THREE.DirectionalLight(0xff8c19);
	directionalLight.position.set(0, 0, 1);
	scene.add(directionalLight);

	let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
	orangeLight.position.set(200, 300, 100);
	scene.add(orangeLight);

	let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
	redLight.position.set(100, 300, 100);
	scene.add(redLight);

	let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
	blueLight.position.set(300, 300, 200);
	scene.add(blueLight)





	//Postprocessing :

	loader.load("../../assets/textures/stars.jpg", function (texture) {

		const textureEffect = new TextureEffect({
			blendFunction: BlendFunction.COLOR_DODGE,
			texture: texture
		});

		textureEffect.blendMode.opacity.value = 0.4;

		const bloomEffect = new BloomEffect({
			blendFunction: BlendFunction.COLOR_DODGE,
			kernelSize: KernelSize.SMALL,
			useLuminanceFilter: true,
			luminanceThreshold: 0.3,
			luminanceSmoothing: 0.75
		});
		bloomEffect.blendMode.opacity.value = 1.5;

		 outlinePass = new OutlineEffect(scene, camera)
		let effectPass = new EffectPass(
			camera,
			bloomEffect,
			textureEffect,
			outlinePass

		);
		effectPass.renderToScreen = true;
		
		composer.addPass(effectPass)
		var renderPass = new RenderPass( scene, camera );
		composer.addPass( renderPass );

		
		
		composer.addPass(new RenderPass())

	});

	var geometry = new THREE.TorusBufferGeometry( 1, 0.3, 16, 100 );
				var material = new THREE.MeshPhongMaterial( { color: 0xffaaff } );
				var torus = new THREE.Mesh( geometry, material );
				
				torus.position.y = 1.5 ;
				torus.position.x = 1 ;
				torus.position.z = 1 ;
				
				scene.add(torus)
				torus.receiveShadow = true;
				torus.castShadow = true;
					

	window.addEventListener( 'mousemove', onTouchMove );
	window.addEventListener( 'touchmove', onTouchMove );

}

function onTouchMove( event ) {

	var x, y;

	if ( event.changedTouches ) {

		x = event.changedTouches[ 0 ].pageX;
		y = event.changedTouches[ 0 ].pageY;

	} else {

		x = event.clientX;
		y = event.clientY;

	}

	mouse.x = ( x / window.innerWidth ) * 2 - 1;
	mouse.y = - ( y / window.innerHeight ) * 2 + 1;

	checkIntersection();
}

function addSelectedObject( object ) {

	selectedObjects = [];
	selectedObjects.push( object );

}

function checkIntersection() {

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( [ scene ], true );
	var currentHex;
	if ( intersects.length > 0 ) {

		var selectedObject = intersects[ 0 ].object;
		addSelectedObject( selectedObject );

		outlinePass.selection = selectedObjects;

		console.log(outlinePass)
	} else {

		// outlinePass.selectedObjects = [];

	}

}

function animate() {


	render();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);

	if(outlinePass != undefined)
		outlinePass.update()
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

	//Animate clouds position
	cloudParticles.forEach(p => {
		p.rotation.z -= 0.001;
	});

	composer.render()


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
