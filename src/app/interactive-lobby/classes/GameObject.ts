import * as THREE from 'three';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



export class GameObject{
	
	scene : THREE.Scene;
	model ;
	animationController;
	animations = [];
	
	constructor( name, scene){
  		this.scene = scene;



		this.instantiateGlb("Male_Casual").then(gltfModel => {

			this.model = gltfModel;
			this.scene.add(this.model.scene);
			console.log(this.model);

			//Get animations
			this.animationController = new THREE.AnimationMixer( this.model.scene );
			

			for (let animation of this.model.animations){
				this.animations.push(animation);
			

			}

				this.animationController.clipAction( this.animations[4] ).play();



		});
  	}


	instantiateGlb(name){
		
		return new Promise(function(resolve, reject){

			var glbLoader = new GLTFLoader();	
			glbLoader.setPath( '../../../assets/models/' );
			glbLoader.load(name+".gltf",resolve ,onprogress ,
					function(error){
						console.log("ERROR loading model " + name + ".gltf ");

						//console.log("ERROR : "+ error);
					}
			);
		});
	}


	createFromMesh(name){



	
	}


	









}
