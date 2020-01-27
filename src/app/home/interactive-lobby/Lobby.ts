
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export class Lobby {

    container;
    renderer; 
    scene; 
    camera;
    hemiLight;
    hemiLightHelper
    dirLight
    dirLightHeper

    

    init(){
        this.container = document.getElementById( 'container' );

	    
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
		this.scene.fog = new THREE.Fog( this.scene.background, 1, 5000 );

        this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.set( 0, 0, 250 )
        this.scene.add(this.camera)
        this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        this.hemiLight.color.setHSL( 0.6, 1, 0.6 );
        this.hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        this.hemiLight.position.set( 0, 50, 0 );
        this.scene.add( this.hemiLight );

        this.hemiLightHelper = new THREE.HemisphereLightHelper( this.hemiLight, 10 );
        this.scene.add( this.hemiLightHelper );

        this.dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
		this.dirLight.color.setHSL( 0.1, 1, 0.95 );
		this.dirLight.position.set( - 1, 1.75, 1 );
		this.dirLight.position.multiplyScalar( 30 );
		this.scene.add( this.dirLight );

		this.dirLight.castShadow = true;

		this.dirLight.shadow.mapSize.width = 2048;
		this.dirLight.shadow.mapSize.height = 2048;

		var d = 50;

		this.dirLight.shadow.camera.left = - d;
		this.dirLight.shadow.camera.right = d;
		this.dirLight.shadow.camera.top = d;
		this.dirLight.shadow.camera.bottom = - d;

		this.dirLight.shadow.camera.far = 3500;
		this.dirLight.shadow.bias = - 0.0001;
        
		this.dirLightHeper = new THREE.DirectionalLightHelper( this.dirLight, 10 );
		this.scene.add( this.dirLightHeper );

        // GROUND

		var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
		var groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		groundMat.color.setHSL( 0.095, 1, 0.75 );

		var ground = new THREE.Mesh( groundGeo, groundMat );
		ground.position.y = - 33;
		ground.rotation.x = - Math.PI / 2;
		ground.receiveShadow = true;
		this.scene.add( ground );

        var vertexShader = document.getElementById( 'vertexShader' ).textContent;
				var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
				var uniforms = {
					"topColor": { value: new THREE.Color( 0x0077ff ) },
					"bottomColor": { value: new THREE.Color( 0xffffff ) },
					"offset": { value: 33 },
					"exponent": { value: 0.6 }
				};
				uniforms[ "topColor" ].value.copy( this.hemiLight.color );

				this.scene.fog.color.copy( uniforms[ "bottomColor" ].value );
        var skyGeo = new THREE.SphereBufferGeometry( 4000, 32, 15 );
				var skyMat = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: vertexShader,
					fragmentShader: fragmentShader,
					side: THREE.BackSide
				} );

				var sky = new THREE.Mesh( skyGeo, skyMat );
				this.scene.add( sky );

        // RENDERER

		this.renderer = new THREE.WebGLRenderer(  );
		this.container.appendChild( this.renderer.domElement );
		

    }

    
    
    animate= () => {

         
        this.render();
        requestAnimationFrame( this.animate );
       

    }

    resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
         
            
    
    
        }
        return needResize;
    }


    render() {

        
        if (this.resizeRendererToDisplaySize(this.renderer)) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.renderer.render( this.scene, this.camera );

    }

   

    
}