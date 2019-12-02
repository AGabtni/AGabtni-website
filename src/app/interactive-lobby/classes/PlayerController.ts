import * as THREE from 'three';

import {Component} from './Component';
import {SkinInstance} from './SkinInstance';



import { globals } from './globals';
import { models, inputManager  } from '../interactive-lobby.component';



/**
 Player controller script for player gameobject 
*/
export class PlayerController extends Component {
    
    kForward = new THREE.Vector3(0, 0, 1);
    skinInstance;
    turnSpeed;
    offscreenTimer;
    maxTimeOffScreen;


    constructor(gameObject) {
      super(gameObject);
      const model = models.pig;
      this.skinInstance = gameObject.addComponent(SkinInstance, model);
      this.skinInstance.setAnimation("Man_Run");
      this.turnSpeed = globals.moveSpeed / 4;
      this.offscreenTimer = 0;
      this.maxTimeOffScreen = 0;
    }


    update() {
      const {deltaTime, moveSpeed} = globals;

      const { transform } = this.gameObject;

      //Rotation handle
      const delta = (inputManager.keys.left.down  ?  1 : 0) +
                    (inputManager.keys.right.down ? -1 : 0);
      transform.rotation.y += this.turnSpeed * delta * deltaTime;


      //Translation handle
      const deltaX = (inputManager.keys.up.down  ?  1 : 0) +
                    (inputManager.keys.down.down ? -1 : 0);
      transform.translateOnAxis(this.kForward, deltaX*moveSpeed * deltaTime);


      //Animation switch :
      if(deltaX != 0 && this.skinInstance.currentAnimation != "Man_Run" ){
          
        this.skinInstance.setAnimation("Man_Run");
        
        
      }  
      if (deltaX == 0 && this.skinInstance.currentAnimation != "Man_Idle"){

          this.skinInstance.setAnimation("Man_Idle");

      }

      //Update camera target :
        const {cameraInfo} = globals;
        cameraInfo.target.set(
            transform.position.x,
            transform.position.y+1,
            transform.position.z
        )

      //Respawns character if out of camera bounds
       
      const { frustum } = globals.cameraInfo;
      /*
      if (frustum.containsPoint(transform.position)) {
        this.offscreenTimer = 0;
      } else {
        this.offscreenTimer += deltaTime;
        if (this.offscreenTimer >= this.maxTimeOffScreen) {
          transform.position.set(0, 0, 20);
        }
      }*/


    }

    


  }