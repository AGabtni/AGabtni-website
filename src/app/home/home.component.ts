import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

var scene , camera, renderer; 
var geometry, material, cube;

function init(){



	//Var initilization
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	geometry = new THREE.BoxGeometry( 1, 1, 1 );
	material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;


}

function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.position.x +=0.01;
	renderer.render( scene, camera );
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('Scene',{static:false}) scene : ElementRef;
	
  constructor() { }

  ngOnInit() {
  	init();
  	animate();

  }

  ngAfterViewInit(){
  	  	this.scene.nativeElement.appendChild(renderer.domElement)

  }

}
