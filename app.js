// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera.lookAt(new THREE.Vector3(0,0,0));

camera.position.x = 10;
camera.position.y = 500;
camera.position.z = 200;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append Renderer to DOM
document.body.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
//var geometry = new THREE.BoxGeometry( 1, 1, 1 );

//var material = new THREE.MeshPhongMaterial( { color: "#FF0000" } );



//var cube = new THREE.Mesh( geometry, material );


var light1 = new THREE.PointLight(0x606060, 3);
var light2 = new THREE.PointLight(0x606060, 3);


light1.position.set(400, 4000, 400);
light2.position.set(-400, 100, 400);

scene.add(light1);
scene.add(light2);

var objLoader = new THREE.OBJLoader();
var mtlLoader = new THREE.MTLLoader();


mtlLoader.load('models/IronMan.mtl',
  function (materials) {

    materials.preload();

    objLoader.setMaterials(materials);

    objLoader.load('models/IronMan.obj', function (obj) {

      obj.position.y = 350;

      obj.name = "IronMan";

      scene.add(obj);
    });

  }
);


var mouseDown = false, mouseX = 0, mouseY = 0;

function onMouseMove(evt) {
  if (!mouseDown) {
    return;
  }

  evt.preventDefault();

  var deltaX = evt.clientX - mouseX,
    deltaY = evt.clientY - mouseY;
  mouseX = evt.clientX;
  mouseY = evt.clientY;
  rotateScene(deltaX, deltaY);
}

function onMouseDown(evt) {
  evt.preventDefault();

  mouseDown = true;
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}

function onMouseUp(evt) {
  evt.preventDefault();

  mouseDown = false;
}

function addMouseHandler(canvas) {
  canvas.addEventListener('mousemove', function (e) {
    onMouseMove(e);
  }, false);
  canvas.addEventListener('mousedown', function (e) {
    onMouseDown(e);
  }, false);
  canvas.addEventListener('mouseup', function (e) {
    onMouseUp(e);
  }, false);
}

function rotateScene(deltaX, deltaY) {
  scene.rotation.y += deltaX / 100;
  scene.rotation.x += deltaY / 100;
}

addMouseHandler(renderer.domElement);

// Render Loop
var render = function () {
  requestAnimationFrame(render);

  //ironMan = scene.getObjectByName("IronMan");

  //ironMan.rotation.y += 0.01;

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  // Render the scene

  renderer.render(scene, camera);
};

render();