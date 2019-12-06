import * as THREE from 'three';

import {Component} from './Component';
import {SkinInstance} from './SkinInstance';



import { globals } from './globals';
import { models, inputManager  } from '../interactive-lobby.component';



/**
 Obstacle controller script
*/
export class ObstacleController extends Component {

    skinInstance ;
    transform ;

    constructor(gameObject) {
        super(gameObject);
        const model = models.boulder;
        this.skinInstance = gameObject.addComponent(SkinInstance, model);
        //this.gameObject.transform.position.x = 5;
        //this.gameObject.transform.translateOnAxis(new THREE.Vector3(0,0,1), 10);

        
    }

    update(){

        console.log('Updating trees');
    }


}