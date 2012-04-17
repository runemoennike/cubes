
var camPos = [5,5,5];
var camRot = [0,0];
var levelXM = 20;
var levelYM = 10;
var levelZM = 20;
var level;

var rotSpeed = 0.003;
var tiltSpeed = 0.001;
var walkSpeed = 0.1;
var strafeSpeed = 0.1;


var lastTime = 0;
var keys = {};
var running = true;

function initLevel() {
	level = new Array(levelXM);
	for(x = 0; x < levelXM; x ++) {
		level[x] = new Array(levelYM);
		for(y = 0; y < levelYM; y ++) {
			level[x][y] = new Array(levelZM);
			for(z = 0; z < levelZM; z ++) {
				if(y < 5) {
					level[x][y][z] = 1;
				} else {
					level[x][y][z] = 0;
				}
			}
		}
	}
}

function initGame() {
	initLevel();
}

function animate(tpf) {
		
}

function logic(tpf) {
	if(keys[87] === true) {
		move(1, 0);
	} else if(keys[83] === true) {
		move(-1, 0);
	}
	
	if(keys[65] === true) {
		move(0, 1);
	} else if(keys[68] === true) {
		move(0, -1);
	}
	
	if(keys[27] === true) {
		console.log("Quit.");
		running = false;
	}
	
}

function move(forward, sideways) {
	camPos[0] -= Math.sin(camRot[0]) * -forward * walkSpeed - Math.cos(camRot[0]) * -sideways * strafeSpeed;
	camPos[2] += Math.cos(camRot[0]) * -forward * walkSpeed + Math.sin(camRot[0]) * -sideways * strafeSpeed;
}

var fps_c = 0, fps_t = 0;
function tick() {
	if(running) {
        requestAnimFrame(tick);
        drawScene();
        
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;
	        animate(elapsed);
	        logic(elapsed);
        }
        
        fps_c ++;
        if(timeNow - fps_t > 1000) {
        	$("#fps").html(fps_c.toString());
        	fps_c = 0;
        	fps_t = timeNow;
        }
        
        lastTime = timeNow;
	}
}
	
function handleKeyDown() {
	var keyCode = 'which' in event ? event.which : event.keyCode;
	keys[keyCode] = true;	
}

function handleKeyUp() {
	var keyCode = 'which' in event ? event.which : event.keyCode;
	keys[keyCode] = false;
}

var lastMX, lastMY;
function handleMouseMove() {
	var dx, dy;
	if(document.pointerLockEnabled) {
		dx = event.movementX;
		dy = event.movementY;
	} else {
		dx = event.screenX - lastMX;
		dy = event.screenY - lastMY;
	}
	
	if(! isNaN(dx))
		camRot[0] += dx * rotSpeed;
		
	if(! isNaN(dy)) 
		camRot[1] += dy * tiltSpeed;

	lastMX = event.screenX;
	lastMY = event.screenY;
}

window.onblur = function() {
    for (key in keys)
            keys[key] = false;
};
