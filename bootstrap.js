$(document).ready(function() {
		$("#fullscreen-button").click(function() {
			var container = document.getElementById("game-canvas-container");
			
			container.requestFullScreen();
			container.requestPointerLock();
		})
		
		webGLStart();
	});

function webGLStart() {    	
    var canvas = document.getElementById("game-canvas");
    
    canvas.onwebkitfullscreenchange = function() {
	    if(document.webkitIsFullScreen) {
	        canvas.width = screen.width;
	        canvas.height = screen.height;
	    } else {
	        canvas.width = 800; // These are your original windowed size
	        canvas.height = 600;
	    }
	    // Need to update the WebGL viewport.
	    gl.viewport(0, 0, canvas.width, canvas.height);
	    mat4.perspective(45.0, canvas.width/canvas.height, 1.0, 4096.0, projectionMat);
	};
    
	canvas.width = innerWidth;
	canvas.height = innerHeight;
    initGL(canvas);
    initMaterials();
    initMeshes();
    initGame();

    gl.clearColor(0.4, 0.6, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    tick();
}