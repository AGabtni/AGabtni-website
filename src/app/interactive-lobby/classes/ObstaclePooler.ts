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
        
        this.addPooledObstacle(false,i*gap, true);
        this.addPooledObstacle(false,i*gap, false);

      }


    }


    //Pool obstacle 
    addPooledObstacle(inPool, row, isLeft){

      var newObstacle ;
      if(inPool){
        if(this.rockPool.length == 0 )
          return;


        newObstacle = this.rockPool.pop();
        newObstacle.transform.visible = true;
        this.activeRocksPool.push(newObstacle);


      }else{

        newObstacle = this.createObstacle(globals.scene, name);

      }

      //set pooled object position
      //newObstacle.transform.position.z =  globals.parcouredDistance*2;
      //newObstacle.transform.position.x =  0;
      newObstacle.transform.translateOnAxis(new THREE.Vector3(0,0,1),-globals.parcouredDistance);
      console.log("pooled")
      
      //attach to world ground :
      globals.scene.add(newObstacle.transform);
    }

    //Pool obstacle at update
    addPathObstacle(){
      this.addPooledObstacle(true,0,false);
      if(Math.random() > 0.5){
        
        this.addPooledObstacle(true,0, false);
      }

    }

   
    removeObstacle(gameObject) {
      this.rockPool.remove(gameObject);
    }

   




    update() {
      this.activeRocksPool.forEach(rock => rock.update());

    }


    
  }