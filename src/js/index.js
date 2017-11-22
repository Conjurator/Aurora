import * as THREE from 'three';
import stone from '../img/stone.jpg';
import stoneBump from '../img/stone-bump.jpg';

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

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
document.body.appendChild( renderer.domElement );

var count = 0;
var count1 = 0;
for(var i=0; i<5; i++) {
	var height = Math.ceil(Math.random()*3)
	var cube = createMesh(new THREE.BoxGeometry( 1, height, 1 ), stone);
	scene.add( cube );
	cube.position.x=-1;
	cube.position.y= (height - 3)/2;
	cube.rotateY= 60;
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

var loader = new THREE.TextureLoader();
var floorTex = loader.load("./../img/floor-wood.jpg");
var plane = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 0.1, 30), new THREE.MeshPhongMaterial({
	color: 0x3c3c3c,
	map: floorTex
}));
plane.position.y = -7.5;
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

var ambiLight = new THREE.AmbientLight(0x242424);
scene.add(ambiLight);

var light = new THREE.SpotLight();
light.position.set(0, 30, 30);
light.intensity = 1.2;
scene.add(light);

var willAnimate = true;
// 动画启动播放
function startAnimating() {
 	willAnimate = true;
 	animate();
}
function stopAnimating() {
	willAnimate = false;
}

var time = 0
function animate() {
	time++;
	camera.position.z -= 1/60;
	plane.position.z -= 1/60;
	if(time%60 === 0) {
		createBuild()
	}
	if(willAnimate) {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}
}

animate();

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
