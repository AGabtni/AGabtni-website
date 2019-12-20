import * as THREE from 'three';

import {GameObject} from './GameObject';
import {SafeArray} from './SafeArray';
import { ObstacleController } from './ObstacleController';
import { globals } from './globals';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { networkInterfaces } from 'os';
import { Camera } from 'three';
import { ɵConsole } from '@angular/core';

export  class ObstaclePooler {
    rockPool ;
    activeRocksPool;


    xOffsetMax = 2 ;
    xOffsetObstacle = 1.5 ; 

    constructor() {

      this.rockPool = [];
      this.activeRocksPool = [];
      
    }
    //Create gameobject for obstacle
    createObstacle (parent, name){
      const obstacleObject = new GameObject(null,name);
      obstacleObject.addComponent(ObstacleController);
      

      return obstacleObject;

    }
    //Create a pool of obstacles
    createRocksPool(){
      var maxElemsInPool = 10;
      var newObstacle ;

      for(var i =0; i<maxElemsInPool; i++ ){
        const name ="Rocke_"+i;
        newObstacle = this.createObstacle(globals.scene, name);
        this.rockPool.push(newObstacle);


      }

    }


    //Add initial obstacles
    addInitialObstacles (){

      var num = 5;
      var gap = 6.28/5;
      for(var i =0 ; i < num ; i++){

        //GameObject.transform.visible = false;
        const xOffsetLeft =  Math.random() * (this.xOffsetObstacle ) ;
        const xOffsetRight =  Math.random() * (0 - (-this.xOffsetObstacle)) + -this.xOffsetObstacle;
       
        this.addPooledObstacle(false,xOffsetLeft);
        this.addPooledObstacle(false,xOffsetRight);

      }


    }


    //Pool obstacle 
    addPooledObstacle(inPool, row){

      var newObstacle ;
      if(inPool){
        if(this.rockPool.length == 0 )
          return;


        newObstacle = this.rockPool.pop();
       
        this.activeRocksPool.push(newObstacle);
        console.log("REUSED OBSTACLE")

      }else{

        newObstacle = this.createObstacle(globals.scene, name);
        console.log("NEW OBSTACLE")

      }

      //Set obstacle position 
      
      newObstacle.transform.translateOnAxis(new THREE.Vector3(row,0,globals.parcouredDistance),-4);
      newObstacle.transform.visible = true;
        
      //attach to world ground :
      globals.scene.add(newObstacle.transform);
    }

    //Pool obstacle at update
    addPathObstacle(){
      
      var xOffsetLeft =  Math.random() * (this.xOffsetObstacle ) ;
      
      this.addPooledObstacle(true,xOffsetLeft);
      if(Math.random() > 0.5){
        var xOffsetRight =  Math.random() * (0 - (-this.xOffsetObstacle)) + -this.xOffsetObstacle;
        this.addPooledObstacle(true,xOffsetRight);
      }

    }

   
    removeObstacle(gameObject) {
      this.rockPool.remove(gameObject);
    }

   

    obstaclePool(){
      if(this.activeRocksPool.length == 0 )
        return;
      var oneTree;
      var obstaclesToRemove = [];

      this.activeRocksPool.forEach( function(element,index){
        
        //console.log(element.transform.position.distanceTo(globals.playerPosition) );
        //console.log(element.transform.visible);
        //element.transform.position.distanceTo(globals.playerPosition) <= 1
        if( !globals.cameraInfo.frustum.containsPoint(element.transform.position) && element.transform.visible ){

          element.transform.visible = false;
          
        }
      
      });

    }


    update() {
      this.obstaclePool();
      this.activeRocksPool.forEach(rock => rock.update());
      //console.log(this.activeRocksPool);


    }


    
  }