import * as THREE from 'three';

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function init(domElement,camera){
    var previousMousePosition = {
            x: 0,
            y: 0
        };
    var isDragging=false;
    domElement.addEventListener('touchstart', function(e) {
        isDragging = true;
        var touch = e.targetTouches[0] || e.changedTouches[0];
        previousMousePosition = {
            x: touch.pageX,
            y: touch.pageY
        };
        e.preventDefault();
    })
    domElement.addEventListener('touchmove', function(e) {
        var touch = e.targetTouches[0] || e.changedTouches[0];
        if(cameraControl.rotate){
        	console.log(cameraControl.rotate);
        	var deltaMove = {
        	    x: touch.pageX-previousMousePosition.x,
        	    y: touch.pageY-previousMousePosition.y
        	};

        	if(isDragging) {
        	        
        	    var deltaRotationQuaternion = new THREE.Quaternion()
        	        .setFromEuler(new THREE.Euler(
        	            toRadians(deltaMove.y * 0.1),
        	            toRadians(deltaMove.x * 0.1),
        	            0,
        	            'XYZ'
        	        ));
        	    
        	    camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion);
        	}
        	
        	previousMousePosition = {
        	    x: touch.pageX,
        	    y: touch.pageY
        	};
        	e.preventDefault();
        }
    });
    /* */

    domElement.addEventListener('touchend', function(e) {
        isDragging = false;
        e.preventDefault();

    });    
}

var cameraControl={
	init,
	rotate:false,
	keepLevel:false
}
export default cameraControl;