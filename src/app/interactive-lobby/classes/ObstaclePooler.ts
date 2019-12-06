 
import {GameObject} from './GameObject';
import {SafeArray} from './SafeArray';
import { ObstacleController } from './ObstacleController';


export  class ObstaclePooler {
    treesPool ;

    constructor() {
      this.treesPool = new SafeArray();
    }


    addObstacle (parent, name, component){
        const obstacleObject = new GameObject(parent,name);
        obstacleObject.addComponent(ObstacleController);
        this.treesPool.add(obstacleObject);



        return obstacleObject;

    }


    removeObstacle(gameObject) {
      this.treesPool.remove(gameObject);
    }

    update() {
      this.treesPool.forEach(tree => this.treesPool.update());
    }


    
  }