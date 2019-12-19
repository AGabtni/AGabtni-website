import * as THREE from 'three';

import {GameObject} from './GameObject';
import {SafeArray} from './SafeArray';
import { ObstacleController } from './ObstacleController';
import { globals } from './globals';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { networkInterfaces } from 'os';

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
        newObstacle.transform.visible = true;
        this.activeRocksPool.push(newObstacle);
        console.log("REUSED OBSTACLE")

      }else{

        newObstacle = this.createObstacle(globals.scene, name);
        console.log("NEW OBSTACLE")

      }

      //Set obstacle position 
      if(globals.playerPosition != null){
        newObstacle.transform.translateOnAxis(new THREE.Vector3(row,0,globals.playerPosition.z*2),-4);
        
      
      }
        
      //attach to world ground :
      globals.scene.add(newObstacle.transform);
    }

    //Pool obstacle at update
    addPathObstacle(){
      
      const xOffsetLeft =  Math.random() * (this.xOffsetObstacle ) ;
      const xOffsetRight =  Math.random() * (0 - (-this.xOffsetObstacle)) + -this.xOffsetObstacle;
      this.addPooledObstacle(true,xOffsetLeft);
      if(Math.random() > 0.5){
        
        this.addPooledObstacle(true,xOffsetRight);
      }

    }

   
    removeObstacle(gameObject) {
      this.rockPool.remove(gameObject);
    }

   




    update() {
      this.activeRocksPool.forEach(rock => rock.update());

    }


    
  }