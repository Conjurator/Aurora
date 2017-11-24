import * as THREE from 'three';
import stone from '../img/stone.jpg';
import stoneBump from '../img/stone-bump.jpg';

// 1、新建场景、相机、渲染器
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
document.body.appendChild( renderer.domElement );

// 2、添加墙
var count = 0;
var count1 = 0;
for(var i=0; i<5; i++) {
	var height = Math.ceil(Math.random()*3)
	var cube = createMesh(new THREE.BoxGeometry( 1, height, 1 ), stone);
	scene.add( cube );
	cube.position.x=-1;
	cube.position.y= (height - 3)/2;
	count--;
	cube.position.z = count;
}

for(var i=0; i<5; i++) {
	var height = Math.ceil(Math.random()*3)
	var cube = createMesh(new THREE.BoxGeometry( 1, height, 1 ), stone, stoneBump);
	scene.add( cube );
	cube.position.x=1;
	cube.position.y= (height - 3)/2;
	count1--;
	cube.position.z = count1;
}

// 3、为物体添加纹理
function createMesh(geom, imageFile, bump) {
	var loader = new THREE.TextureLoader();
	var texture = loader.load(imageFile);
	geom.computeVertexNormals();
	var mat = new THREE.MeshPhongMaterial();
	mat.map = texture;

	if (bump) {
		var bump = loader.load(bump);
		mat.bumpMap = bump;
		mat.bumpScale = 0.2;
	}
	var mesh = new THREE.Mesh(geom, mat);
	return mesh;
}

// 4、添加光源
var ambiLight = new THREE.AmbientLight(0x242424);
scene.add(ambiLight);

var light = new THREE.SpotLight();
light.position.set(0, 30, 30);
light.intensity = 1.2;
scene.add(light);

// 5、添加其他物体
var aircraft = createMesh(new THREE.BoxGeometry( 0.05, 0.05, 0.05 ), stone);
aircraft.position.z= -1;
aircraft.name = "aircraft";
scene.add( aircraft );

var loader = new THREE.TextureLoader();
var floorTex = loader.load("./../img/floor-wood.jpg");
var plane = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 0.1, 30), new THREE.MeshPhongMaterial({
	color: 0x3c3c3c,
	map: floorTex
}));
plane.position.y = -1.5;
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

var willAnimate = true;
// 6、动态创建墙
function createBuild() {
	var height2 = Math.ceil(Math.random()*3)
	var cube2 = createMesh(new THREE.BoxGeometry( 1, height2, 1 ), stone);
	scene.add( cube2 );
	cube2.position.x=-1;
	cube2.position.y= (height2 - 3)/2;
	count--;
	cube2.position.z = count;

	var height3 = Math.ceil(Math.random()*3)
	var cube3 = createMesh(new THREE.BoxGeometry( 1, height3, 1 ), stone, stoneBump);
	scene.add( cube3 );
	cube3.position.x=1;
	cube3.position.y= (height3 - 3)/2;
	count1--;
	cube3.position.z = count1;
}

var time = 0
function animate() {
	time++;
	camera.position.z -= 1/60;
	plane.position.z -= 1/60;
	aircraft.position.z -= 1/60;
	if(time%60 === 0) {
		createBuild()
	}
	if(parseInt(camera.position.z) == "-5") {
		window.location.href = "http://sec-cdn.static.xiaomi.net/secStatic/groups/miui-sec/duanqi/createGoodsDay/createGoodsDay.html"
	}
	if(willAnimate) {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	} 
}
animate();

// 7、控制动画播放与暂停
function startAnimating() {
	camera.rotation.x = 0;
	camera.rotation.y = 0;
	camera.rotation.z =0;
 	willAnimate = true;
 	animate();
}
function stopAnimating() {
	willAnimate = false;
	rotateScene();
}

function rotateScene() {
	if(!willAnimate) {
		requestAnimationFrame( rotateScene );
		renderer.render( scene, camera );
	} 
}

var btn = document.getElementById('btn');
btn.onclick = function() {
	if(willAnimate) {
		stopAnimating()
		btn.innerHTML = "play"
	} else {
		startAnimating()
		btn.innerHTML = "stop"
	}
}

// 8、播放动画时，滑屏控制飞行物体位置；暂停动画时，滑屏旋转场景角度
var rotWorldMatrix;
function rotateAroundWorldAxis(object, axis, radians) {
	rotWorldMatrix = new THREE.Matrix4();
	rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
	rotWorldMatrix.multiply(object.matrix);                // pre-multiply
	object.matrix = rotWorldMatrix;
	object.rotation.setFromRotationMatrix(object.matrix);
}

var oldX = 0;
var oldY = 0;
var newX = 0;
var newY = 0;
var widthMove = 0;
var heightMove = 0;
document.addEventListener('touchstart', function(event){
	var target = event.targetTouches[0];
	oldX = target.clientX;
	oldY = target.clientY;
})

document.addEventListener('touchmove', function(event){
	event.preventDefault();
	event.stopPropagation();
	var target = event.targetTouches[0];
	newX = target.clientX;
	newY = target.clientY;
	var left = newX-oldX;
	var top = oldY-newY;

	widthMove = left / 1000;
	if(widthMove > 0.08) {
		widthMove = 0.08;
	} else if (widthMove < -0.08) {
		widthMove = -0.08;
	}
	
	heightMove = top / 2000;
	if(heightMove > 0.3) {
		heightMove = 0.3;
	} else if (heightMove < -0.3) {
		heightMove = -0.3;
	}

	widthMove = left / 1000;
	if(widthMove > 0.08) {
		widthMove = 0.08;
	} else if (widthMove < -0.08) {
		widthMove = -0.08;
	}
	
	heightMove = top / 2000;
	if(heightMove > 0.3) {
		heightMove = 0.3;
	} else if (heightMove < -0.3) {
		heightMove = -0.3;
	}

	if(willAnimate) {
		aircraft.position.x = widthMove;
		aircraft.position.y = heightMove;
	} else {
		if(camera.rotation.x > Math.PI/4) {
			camera.rotation.x = Math.PI/4
		} else if(camera.rotation.x < -Math.PI/4) {
			camera.rotation.x = -Math.PI/4
		} else if(camera.rotation.y > Math.PI/2) {
			camera.rotation.y = Math.PI/2
		} else if(camera.rotation.y < -Math.PI/2) {
			camera.rotation.y = -Math.PI/2
		} else {
			var xAxis = new THREE.Vector3(-top,left,0);
			rotateAroundWorldAxis(camera, xAxis, Math.PI / 180);
			camera.rotation.z =0
		}
	}
	
}, false)






