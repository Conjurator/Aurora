var three3D = {
    texture_placeholder: null, // canvas
    context: null, // canvas原生对象
    container: null, // div的js原生对象
    width: 0, // container视窗宽度
    height: 0, // container视窗高度
    renderer: null, // 渲染器
    camera: null, // 摄像机
    scene: null, // 场景
    light: null, // 光源
    lon: 0.0, // 绕x轴旋转的角度
    lat: 0.0, // 绕y轴旋转的角度
    touchX: 0,
    touchY: 0,
    roomMesh: null,
    target: new THREE.Vector3(),
    mouse: new THREE.Vector2(),
    clicked: false,
    raycaster: null,
    init: function() {
        this.initThree();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.initObject();
        this.addListner();
        this.animate(this);
    },
 
    initThree: function() {
        this.container = document.getElementByIdx_x_x('canvas3d');
        this.width = windows.innerWidth;
        this.height = windows.innerHeight;
 
        this.texture_placeholder = document_createElement_x_x('canvas');
        this.texture_placeholder.width = 128;
        this.texture_placeholder.height = 128;
        this.context = this.texture_placeholder.getContext('2d');
        this.context.fillStyle = 'rgb( 200, 200, 200 )';
        this.context.fillRect(0, 0, this.texture_placeholder.width, this.texture_placeholder.height);
 
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        }); //生成渲染器对象（属性：抗锯齿效果为设置有效）
        this.renderer.setSize(this.width, this.height); //指定渲染器的高宽（和画布框大小一致）
        this.renderer.setClearColor(0x000000, 1.0); //设置canvas背景色(clearColor)
 
        this.container.a(this.renderer.domElement); //追加 【canvas】 元素到 【container】 元素中。
 
        this.raycaster = new THREE.Raycaster();
    },
    initCamera: function() {
        var camera = this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000); //设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
        camera.position.x = 0; //设置相机的位置坐标
        camera.position.y = 0; //设置相机的位置坐标
        camera.position.z = 0; //设置相机的位置坐标
        camera.up.x = 0; //设置相机的上为「x」轴方向
        camera.up.y = 1; //设置相机的上为「y」轴方向
        camera.up.z = 0; //设置相机的上为「z」轴方向
        camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        }); //设置视野的中心坐标
    },
    initScene: function() {
        this.scene = new THREE.Scene();
    },
    initLight: function() {
        // var light = new THREE.DirectionalLight(0xffaa00, 1.0, 1); //设置平行光源
        // light.position.set(0, 100, 0); //设置光源向量
        // this.scene.add(light); // 追加光源到场景
         
        // light = new THREE.DirectionalLight(0xffaa00, 1.0, 1); //设置平行光源
        // light.position.set(0, 0, 100); //设置光源向量
        // this.scene.add(light); // 追加光源到场景
         
        // light = new THREE.DirectionalLight(0xffaa00, 1.0, 1); //设置平行光源
        // light.position.set(100, 0, 0); //设置光源向量
        // this.scene.add(light); // 追加光源到场景
         
        // light = new THREE.DirectionalLight(0xffaa00, 1.0, 1); //设置平行光源
        // light.position.set(-100, 0, 0); //设置光源向量
        // this.scene.add(light); // 追加光源到场景
         
        // var pointLight = new THREE.PointLight(0xffaa00);
        // pointLight.position.set(0, 0, -1);
        // this.scene.add(pointLight);
    },
    initObject: function() {
        var materials = [
            this.loadTexture('images/posx.jpg'), // right
            this.loadTexture('images/negx.jpg'), // left
            this.loadTexture('images/posy.jpg'), // top
            this.loadTexture('images/negy.jpg'), // bottom
            this.loadTexture('images/posz.jpg'), // back
            this.loadTexture('images/negz.jpg') // front
        ];
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300, 7, 7, 7), new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = -1;
        this.scene.add(mesh);
        this.roomMesh = mesh;
    },
    animate: function(self) {
        window.requestAnimationFrame(function(event) {
            self.animate(self);
        });
        self.lat = parseFloat(self.lat);
        self.lon = parseFloat(self.lon);
        self.lat = self.lat.toFixed(1);
        self.lon = self.lon.toFixed(1);
        // self.lon += 0.1;
        self.lat = Math.max(-85, Math.min(85, self.lat));
        var phi = THREE.Math.degToRad(90 - self.lat);
        var theta = THREE.Math.degToRad(self.lon);
 
        self.target.x = Math.sin(phi) * Math.cos(theta);
        self.target.y = Math.cos(phi);
        self.target.z = Math.sin(phi) * Math.sin(theta);
 
        self.target.x = parseFloat(self.target.x.toFixed(3));
        self.target.y = parseFloat(self.target.y.toFixed(3));
        self.target.z = parseFloat(self.target.z.toFixed(3));
        $('.left_display').html(
            "x:" + self.target.x + '; y:' + self.target.y + '; z:' + self.target.z +
            "
绕x轴旋转的角度: " + self.lon +
            "
绕y轴旋转的角度: " + self.lat
 
        );
 
        self.camera.lookAt(self.target);
 
        self.renderer.render(self.scene, self.camera);
 
        // 鼠标点击射线判断物体
        if (self.clicked == false) return;
        self.raycaster.setFromCamera(self.mouse, self.camera);
        var intersects = self.raycaster.intersectObjects(self.scene.children);
        var intersected = null;
        if (intersects.length > 0) {
            intersected = intersects[0].object;
            var currentHex = intersected.material.color.getHex();
            if (currentHex == 0x00ff00) {
                intersected.material.color.set(0xff0000);
            } else {
                intersected.material.color.set(0x00ff00);
            }
            intersected.callback();
        }
        three3D.clicked = false;
    },
    addListner: function() {
        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
        document.addEventListener('mousewheel', this.onDocumentMouseWheel, false);
 
        document.addEventListener('touchstart', this.onDocumentTouchStart, false);
        document.addEventListener('touchmove', this.onDocumentTouchMove, false);
 
        window.addEventListener('resize', this.onWindowResize, false);
    },
    onDocumentMouseDown: function(event) {
        if (event.button != 0) return;
        event.preventDefault();
        document.addEventListener('mousemove', three3D.onDocumentMouseMove, false);
        document.addEventListener('mouseup', three3D.onDocumentMouseUp, false);
    },
    onDocumentMouseMove: function(event) {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        three3D.lon -= movementX * 0.1;
        three3D.lat += movementY * 0.1;
    },
    onDocumentMouseUp: function(event) {
        three3D.clicked = true;
        three3D.mouse.x = (event.clientX / windows.innerWidth) * 2 - 1;
        three3D.mouse.y = -(event.clientY / windows.innerHeight) * 2 + 1;
        document.removeEventListener('mousemove', three3D.onDocumentMouseMove);
        document.removeEventListener('mouseup', three3D.onDocumentMouseUp);
    },
    onDocumentMouseWheel: function(event) {
        three3D.camera.fov -= event.wheelDeltaY * 0.05;
        if (three3D.camera.fov < 10) three3D.camera.fov = 10;
        if (three3D.camera.fov > 100) three3D.camera.fov = 100;
        three3D.camera.updateProjectionMatrix();
    },
    onDocumentTouchStart: function(event) {
        event.preventDefault();
        var touch = event.touches[0];
        three3D.touchX = touch.screenX;
        three3D.touchY = touch.screenY;
    },
    onDocumentTouchMove: function(event) {
        event.preventDefault();
        var touch = event.touches[0];
        three3D.lon -= (touch.screenX - three3D.touchX) * 0.1;
        three3D.lat += (touch.screenY - three3D.touchY) * 0.1;
        three3D.touchX = touch.screenX;
        three3D.touchY = touch.screenY;
    },
    onWindowResize: function() {
        three3D.camera.aspect = windows.innerWidth / windows.innerHeight;
        three3D.camera.updateProjectionMatrix();
        three3D.renderer.setSize(windows.innerWidth, windows.innerHeight);
    },
    loadTexture: function(path) {
        var texture = new THREE.Texture(this.texture_placeholder);
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: 0.5
        });
        var image = new Image();
        image.onload = function() {
 
            texture.image = this;
            texture.needsUpdate = true;
 
        };
        image.src = path;
        return material;
    }
}