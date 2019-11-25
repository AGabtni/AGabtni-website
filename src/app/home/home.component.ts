import { Component, OnInit } from '@angular/core';

//threeJS imports :
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
	
  constructor() { }

  ngOnInit() {
  	

  }

  ngAfterViewInit(){

  }

}
