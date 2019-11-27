 
import {GameObject} from './GameObject';
import {SafeArray} from './SafeArray';


export  class GameObjectManager {
    gameObjects ;

    constructor() {
      this.gameObjects = new SafeArray();
    }



    createGameObject(parent, name) {
      const gameObject = new GameObject(parent, name);
      this.gameObjects.add(gameObject);
      return gameObject;
    }


    removeGameObject(gameObject) {
      this.gameObjects.remove(gameObject);
    }




    update() {
      this.gameObjects.forEach(gameObject => gameObject.update());
    }
  }