


export class InputManager {
	keys ={};
	constructor(){
		const keyMap = new Map();
		const setKey = (keyName, pressed) => {
			const keyState = this.keys[keyName];
			keyState.justPressed = pressed && !keyState.down
			keyState.down = pressed;

		};

		const addKey = (keyCode , name) => {
			this.keys[name] = {down : false, justPressed : false};
			keyMap.set(keyCode, name)

		}

		const setKeyFromKeyCode = (keyCode, pressed) => {
	        const keyName = keyMap.get(keyCode);
	        if (!keyName) {
	          return;
	        }
	        setKey(keyName, pressed);
	    };

      	addKey(37, 'left');
     	addKey(39, 'right');
      	addKey(38, 'up');
      	addKey(40, 'down');
      	addKey(90, 'a');
      	addKey(88, 'b');



	}


}