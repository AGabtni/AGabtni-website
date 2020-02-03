import * as THREE from 'three';
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils';
import { Scene } from 'three';

function removeArrayElement(array, element) {
    const ndx = array.indexOf(element);
    if (ndx >= 0) {
        array.splice(ndx, 1);
    }
}

export class User {
    name;
    components;
    transform;
    model;
    animRoot;
    kForward = new THREE.Vector3(0, 1, 0);
    moveSpeed = 2.0;
    constructor(name, model, scene) {
        this.model = model;
        this.animRoot = SkeletonUtils.clone(this.model.scene);
        this.name = name;
        this.components = [];
        this.transform = new THREE.Object3D();
        this.transform.add(this.animRoot);
        //this.transform.rotation.z = Math.PI / 8;
        scene.add(this.transform);
    }
    addComponent(component) {

        this.components.push(component);
    }
    removeComponent(component) {
        removeArrayElement(this.components, component);
    }
    getComponent(component) {
        return this.components.find(c => c.name === component.name);
    }
    update() {
        for (const component of this.components) {
            component.update();
        }

        //this.transform.translateOnAxis(this.kForward, 0.1);
        this.floatEngine()
    }

    floatEngine() {

        var obj = this.transform;
        if (!obj.visible)
            return;

        if (obj.time == undefined) {
            obj.time = Math.random() * Math.PI * 2;
            obj.initialPosition = obj.position;

        }
        obj.time += 0.1;
        obj.position.z = obj.initialPosition.z + Math.cos(obj.time) * 0.001;
        
    }

}