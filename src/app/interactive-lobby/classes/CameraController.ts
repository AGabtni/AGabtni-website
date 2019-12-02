
import * as THREE from 'three';


import { Component } from "./Component";
import { globals } from "./globals";




export class CameraController extends Component {
	
	projScreenMatrix;
	frustum;
    public target : THREE.Vector3 ;
    public radius : number = 1;
    public targetRadius : number = 5;

	constructor(gameObject){
		super(gameObject);
		this.projScreenMatrix = new THREE.Matrix4();
		this.frustum = new THREE.Frustum();



		//follow target:
		this.target = new THREE.Vector3();
		this.radius= 3;

	}


	public setRadius(value: number, instantly: boolean = false): void
    {
        this.targetRadius = Math.max(0.001, value);
        if (instantly === true)
        {
            this.radius = value;
        }
    }


	update(){
		const {camera} = globals;
		this.projScreenMatrix.multiplyMatrices(
			camera.projectionMatrix, camera.matrixWorldInverse
		);

		this.frustum.setFromMatrix(this.projScreenMatrix);
		//Update camera

		this.radius = THREE.Math.lerp(this.radius,this.targetRadius, 0.1);
		
		camera.position.x = this.target.x + this.radius;
        camera.position.y = this.target.y + this.radius ;
        camera.position.z = this.target.z + this.radius ;
        camera.updateMatrix();
        camera.lookAt(this.target);


	}


}