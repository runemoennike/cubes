
var camPos = [5,6,5];
var camRot = [0,0.5];
var levelXM = 20;
var levelYM = 10;
var levelZM = 20;
var level;

var rotSpeed = 0.003;
var tiltSpeed = 0.001;
var walkSpeed = 0.1;
var strafeSpeed = 0.1;

var game = {
	blockSize: 1,
	running: false
}

var player = {
	'selection': NaN
}

var lastTime = 0;
var keys = {};

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
	
	
	game.running = true;
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
		game.running = false;
	}
	
}

function move(forward, sideways) {
	camPos[0] -= Math.sin(camRot[0]) * -forward * walkSpeed - Math.cos(camRot[0]) * -sideways * strafeSpeed;
	camPos[2] += Math.cos(camRot[0]) * -forward * walkSpeed + Math.sin(camRot[0]) * -sideways * strafeSpeed;
}

var fps_c = 0, fps_t = 0;
function tick() {
	if(game.running) {
        requestAnimFrame(tick);
        drawScene();
        
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;
	        animate(elapsed);
	        logic(elapsed);
        }
        
        findSelection(camPos, camRot[0], camRot[1]);
        
        fps_c ++;
        if(timeNow - fps_t > 1000) {
        	$("#fps").html(fps_c.toString());
        	fps_c = 0;
        	fps_t = timeNow;
        }
        
        lastTime = timeNow;
	}
}

function worldToLevelCoord(wp) {
	return [
		Math.floor(wp[0] * game.blockSize),
		Math.floor(wp[1] * game.blockSize),
		Math.floor(wp[2] * game.blockSize)
	];
}

function isInLevelBounds(lp) {
	return lp[0] >= 0 && lp[1] >= 0 && lp[2] >= 0 && lp[0] < levelXM && lp[1] < levelYM && lp[2] < levelZM;
}

function getLevelBlock(lp) {
	return level[lp[0]][lp[1]][lp[2]];
}


function findSelection(headPos, yaw, pitch) {
	var stepLength = 1.0;
	var maxSearchLength = 10, curSearchLength = 0;
	var pos = vec3.create(headPos);
	var step = vec3.create([
		Math.sin(yaw) * stepLength,
		-Math.sin(pitch) * stepLength,
		-Math.cos(yaw) * stepLength	
	]);
	var l = vec3.create();
	
	do {
		l = worldToLevelCoord(pos);
		vec3.add(pos, step);
		curSearchLength += stepLength;
	} while(curSearchLength < maxSearchLength && isInLevelBounds(l) && getLevelBlock(l) == 0);
		
	if(isInLevelBounds(l) && getLevelBlock(l) != 0) {
		player.selection = l;
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
