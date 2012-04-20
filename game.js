
var camPos = [5,6,5];
var camRot = [0,0.5];


var game = {
	blockSize: 1,
	running: false,
	gravity : 0.9,
}

var lastTime = 0;
var keys = {};



function initGame() {
	level.initLevel();
	
	
	game.running = true;
}

function animate(tpf) {
		
}

function logic(tpf) {
	player.update();
	
	if(keys[87] === true) {
		player.move(1, 0);
	} else if(keys[83] === true) {
		player.move(-1, 0);
	}
	
	if(keys[65] === true) {
		player.move(0, 1);
	} else if(keys[68] === true) {
		player.move(0, -1);
	}
	
	if(keys[27] === true) {
		console.log("Quit.");
		game.running = false;
	}
	
	camPos = player.pos;
	camRot = player.rot;
	
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
        
        level.findSelection(player.pos, player.rot[0], player.rot[1]);
        
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
		player.rotate(dx, 0);
		
	if(! isNaN(dy)) 
		player.rotate(0, dy)

	lastMX = event.screenX;
	lastMY = event.screenY;
}

function handleMouseDown() {
	if(player.selection != null && level.isInLevelBounds(player.selection)) {
		if(event.which == 1) {
			var newPos = [
				player.selection[0],
				player.selection[1] + 1,
				player.selection[2]
			];
			level.setLevelBlock(newPos, 1);
		} else {
			level.setLevelBlock(player.selection, 0);
		}		
	}
}

window.onblur = function() {
    for (key in keys)
            keys[key] = false;
};
