import * as THREE from 'three';
import {Component} from './Component';
import {SkinInstance} from './SkinInstance';

import {globals} from './globals'


export class PlayerController extends Component {
    
    kForward = new THREE.Vector3(0, 0, 1);
    skinInstance;
    turnSpeed;
    offscreenTimer;
    maxTimeOffScreen;


    constructor(gameObject, modelRef) {
      super(gameObject);
      const model = modelRef;
      this.skinInstance = gameObject.addComponent(SkinInstance, model);
      this.skinInstance.setAnimation('Run');
      this.turnSpeed = globals.moveSpeed / 4;
      this.offscreenTimer = 0;
      this.maxTimeOffScreen = 0;
    }


    update() {
      const {deltaTime, moveSpeed} = globals;
      const {transform} = this.gameObject;
      const delta = (inputManager.keys.left.down  ?  1 : 0) +
                    (inputManager.keys.right.down ? -1 : 0);
      transform.rotation.y += this.turnSpeed * delta * deltaTime;
      transform.translateOnAxis(this.kForward, moveSpeed * deltaTime);

      const {frustum} = globals.cameraInfo;
      if (frustum.containsPoint(transform.position)) {
        this.offscreenTimer = 0;
      } else {
        this.offscreenTimer += deltaTime;
        if (this.offscreenTimer >= this.maxTimeOffScreen) {
          transform.position.set(0, 0, 20);
        }
      }

    }


  }