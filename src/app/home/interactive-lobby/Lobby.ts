
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { User } from './User';



export class Lobby {
    private static instance: Lobby;

    renderer;
    scene;
    camera;

    raycaster;
    composer;
    effectFXAA;
    outlinePass;
    texturePass;
    mouse = new THREE.Vector2();
    selectedObjects;
    cloudParticles;

    models ; 
    userInstance ;
    private constructor() {
        
            this.cloudParticles = [];
            this.selectedObjects = [];
            this.models = [];
    }
    

    public static getInstance(): Lobby {
        if (!Lobby.instance) {
            Lobby.instance = new Lobby();
        }

        return Lobby.instance;
    }
    init() {

        //Setup renderer container

        const canvas = document.querySelector('#c');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        this.renderer = new THREE.WebGLRenderer({ canvas });


        //--Vars init :
        


        this.raycaster = new THREE.Raycaster;

        //--Scene setup

        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2("rgba(7,13,24)", 0.001);
        this.renderer.setClearColor(this.scene.fog.color);

        //--Camera setup

        this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
        


        this.scene.add(this.camera)



		const manager = new THREE.LoadingManager();
		manager.onLoad = this.onLoadFinished;
        //--Load textures : 
        let loader = new THREE.TextureLoader();
        loader.load("../../assets/textures/smoke.png", (texture)=> {
            //--Cloud geometry init  :
            let cloudGeo = new THREE.PlaneBufferGeometry(750, 750);
            let cloudMaterial = new THREE.MeshLambertMaterial
                ({

                    map: texture,
                    transparent: true

                })


            for (var p = 0; p < 200; p++) {
                let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
                cloud.position.set(
                    Math.random() * 2500 - 1000,
                    500,
                    Math.random() * 2000 - 1100
                );
                cloud.rotation.x = 1.16;
                cloud.rotation.y = -0.12;
                cloud.rotation.z = Math.random() * 2 * Math.PI;
                cloud.material.opacity = 0.55;
                this.cloudParticles.push(cloud);
                this.scene.add(cloud)
            }




        });

        //--Load models :
        var gltfLoader = new GLTFLoader();
        var model;

        //Load Spaceship
        gltfLoader.load('../../assets/models/Spaceship.gltf',  (gltf) => {
            model = gltf;
            console.log(model.scene.position)

            
            model.scene.rotation.x = 1.45;
            model.scene.rotation.y = -3.1;
            model.scene.rotation.z = -0.27;
            model.scene.position.z = 0;
            model.scene.position.y = 2;
            model.scene.position.x = 0.275;
            model.scene.scale.set(0.2,0.2,0.2)
            this.userInstance = new User("User", model, this.scene);
            this.camera.lookAt(model.scene.position)
            this.camera.position.z = 1.7;
            this.camera.position.y -= 1.5;
            this.camera.rotation.x = 1.16;
            this.camera.rotation.y = -0.12;
            this.camera.rotation.z = 0.27;
        });

        //Load asteroids
        /*
        gltfLoader.load('../../assets/models/Spaceship.gltf',  (gltf) => {

        }*/
        //--Lightning setup  :
        let ambient = new THREE.AmbientLight(0x555555);
        this.scene.add(ambient);


        //Nebula lights 
        let directionalLight = new THREE.DirectionalLight(0xff8c19);
        directionalLight.position.set(0, 0, 1);
        this.scene.add(directionalLight);

        let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
        orangeLight.position.set(200, 300, 100);
        this.scene.add(orangeLight);

        let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
        redLight.position.set(100, 300, 100);
        this.scene.add(redLight);

        let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
        blueLight.position.set(300, 300, 200);
        this.scene.add(blueLight)





        //Postprocessing :
        this.composer = new EffectComposer(this.renderer);
        var renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera);
        this.composer.addPass(this.outlinePass);

        window.addEventListener('mousemove', Lobby.instance.onTouchMove);
        window.addEventListener('mousedown', Lobby.instance.onMouseClick)
        window.addEventListener('touchmove', Lobby.instance.onTouchMove);
        window.addEventListener( 'resize', Lobby.instance.onWindowResize, false );


        this.animate();
    }
    onLoadFinished(){



    }
    onMouseClick(event) {

        if (Lobby.instance.selectedObjects.length > 0)
            console.log(Lobby.instance.selectedObjects[0].material.opacity = 0)
    }
    onTouchMove(event) {

        var x, y;

        if (event.changedTouches) {

            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;

        } else {

            x = event.clientX;
            y = event.clientY;

        }

        Lobby.instance.mouse.x = (x / window.innerWidth) * 2 - 1;
        Lobby.instance.mouse.y = - (y / window.innerHeight) * 2 + 1;

        Lobby.instance.checkIntersection();
    }

    addSelectedObject(object) {

        Lobby.instance.selectedObjects = [];
        Lobby.instance.selectedObjects.push(object);

    }

    checkIntersection() {

        this.raycaster.setFromCamera(this.mouse, this.camera);

        var intersects = this.raycaster.intersectObjects([this.scene], true);
        var currentHex;
        if (intersects.length > 0) {

            var selectedObject = intersects[0].object;
            this.addSelectedObject(selectedObject);

            this.outlinePass.selectedObjects = this.selectedObjects;

            console.log(this.outlinePass)
        } else {

            // outlinePass.selectedObjects = [];

        }

    }
    
    render() {



        //Animate clouds position
        Lobby.instance.cloudParticles.forEach(p => {
            p.rotation.z -= 0.001;
        });



    }
    animate() {

        Lobby.instance.render();
        Lobby.instance.renderer.render(Lobby.instance.scene, Lobby.instance.camera);

        if (Lobby.instance.composer != undefined)
            Lobby.instance.composer.render(0.1);

        if(Lobby.instance.userInstance != undefined)
            Lobby.instance.userInstance.update();
        requestAnimationFrame(Lobby.instance.animate);


    }

    onWindowResize() {
        Lobby.instance.camera.aspect = window.innerWidth / window.innerHeight;
        Lobby.instance.camera.updateProjectionMatrix();

        Lobby.instance.renderer.setSize( window.innerWidth, window.innerHeight );
    }



}