$(document).ready(function() {
	$("#fullscreen-button").click(function() {
		var container = document.getElementById("game-canvas-container");
		
		container.requestFullScreen();
		container.requestPointerLock();
	})
	
	webGLStart();
		
	handleCanvasSizeChange();
	
});

function handleCanvasSizeChange() {
    var canvas = document.getElementById("game-canvas");
    if(document.webkitIsFullScreen) {
        canvas.width = screen.width;
        canvas.height = screen.height;
        $("#fullscreen-button").hide();
    } else {
        canvas.width = innerWidth; // These are your original windowed size
        canvas.height = innerHeight;
        $("#fullscreen-button").show();
    }
    // Need to update the WebGL viewport.
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    mat4.perspective(45.0, canvas.width/canvas.height, 0.1, 100.0, pMatrix);
};

function webGLStart() {    	
    var canvas = document.getElementById("game-canvas");
    var body = document.body;
    
    body.onwebkitfullscreenchange = handleCanvasSizeChange;
	body.onkeydown = handleKeyDown;
	body.onkeyup = handleKeyUp; 
	body.oncontextmenu=function(){return false};
	body.onmousemove = handleMouseMove;
	body.onmousedown = handleMouseDown;
    
    canvas.width = innerWidth;
	canvas.height = innerHeight;
	
    initGL(canvas);
    initMaterials();
    initMeshes();
    initGame();

    gl.clearColor(0.4, 0.6, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

	
	
	game.running = true;
    tick();
}