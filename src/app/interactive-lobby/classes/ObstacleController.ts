import * as THREE from 'three';

import {Component} from './Component';
import {SkinInstance} from './SkinInstance';



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
        
       
        
    
        
    }


    update(){

        
    }


}