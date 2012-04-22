var gl;

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        //gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("experimental-webgl")); // Debug
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        
        gl.enable(CULL_FACE);
        gl.cullFace(BACK);
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}


function getShader(gl, filename, type) {
	var source;

    $.ajax({
        async: false, 
        url: "shaders/" + filename,
        success: function(result) {
           source = result;
        }
    });

	var shader;

    if (type == 'frag') {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == 'vert') {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}


function initMaterials() {
	for(var idx in materials) {
		loadMaterial(materials[idx]);
	}
}

function loadMaterial(material) {
    material.shaderProgram = gl.createProgram();
    
    for(var idx in material.frag_shaders) {
	    var shader = getShader(gl, material.frag_shaders[idx], 'frag');
    	gl.attachShader(material.shaderProgram, shader);
    }
    
    for(var idx in material.vert_shaders) {
	    var shader = getShader(gl, material.vert_shaders[idx], 'vert');
    	gl.attachShader(material.shaderProgram, shader);
    }
    
    gl.linkProgram(material.shaderProgram);

    if (!gl.getProgramParameter(material.shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(material.shaderProgram);
	
	for(var key in material.attrib) {
		material.attrib[key] = gl.getAttribLocation(material.shaderProgram, key);
		gl.enableVertexAttribArray(material.attrib[key]);
	}
	
	for(var key in material.uniform) {
		material.uniform[key] = gl.getUniformLocation(material.shaderProgram, key);
	}
    
    for(var key in material.textures) {
    	initTexture(material.textures[key]);
    }
    console.log(material);
}


function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function initTexture(texture) {
    texture.tex = gl.createTexture();
    texture.tex.image = new Image();
    texture.tex.image.onload = function () {
        handleLoadedTexture(texture.tex)
    }

    texture.tex.image.src = "textures/" + texture.filename;
}


function initMeshes() {
	for(var idx in meshes) {
		loadMesh(meshes[idx]);
	}
}

function loadMesh(mesh) {
    mesh.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
    mesh.vertexPositionBuffer.itemSize = 3;
    mesh.vertexPositionBuffer.numItems = mesh.vertices.length / mesh.vertexPositionBuffer.itemSize;

    mesh.vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.textureCoords), gl.STATIC_DRAW);
    mesh.vertexTextureCoordBuffer.itemSize = 2;
    mesh.vertexTextureCoordBuffer.numItems = mesh.textureCoords / mesh.vertexTextureCoordBuffer.itemSize;
    
    mesh.vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertexNormals), gl.STATIC_DRAW);
    mesh.vertexNormalBuffer.itemSize = 3;
    mesh.vertexNormalBuffer.numItems = mesh.vertexNormals.length / mesh.vertexNormalBuffer.itemSize;

    mesh.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.vertexIndices), gl.STATIC_DRAW);
    mesh.vertexIndexBuffer.itemSize = 1;
    mesh.vertexIndexBuffer.numItems = mesh.vertexIndices.length / mesh.vertexIndexBuffer.itemSize;
}

function prepareMesh(material, mesh) {
	gl.useProgram(material.shaderProgram);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexPositionBuffer);
	gl.vertexAttribPointer(material.attrib.aVertexPosition, mesh.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexTextureCoordBuffer);
	gl.vertexAttribPointer(material.attrib.atTextureCoord, mesh.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexNormalBuffer);
	gl.vertexAttribPointer(material.attrib.aVertexNormal, mesh.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.vertexIndexBuffer);
	gl.vertexAttribPointer(material.attrib.aVertexNormal, mesh.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

	for(var key in material.textures) {
		gl.activeTexture(gl.TEXTURE0 + parseInt(key));
		gl.bindTexture(gl.TEXTURE_2D, material.textures[key].tex);
		gl.uniform1i(material.uniform[material.textures[key].uniform], parseInt(key));
	}
}

function drawMesh(material, mesh) {
	setMatrixUniforms(material);
	
	gl.drawElements(gl.TRIANGLES, mesh.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}


function drawScene() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    mat4.identity(mvMatrix);
	
	var cam_ = vec3.create();
	vec3.negate(camPos, cam_);

    mat4.rotate(mvMatrix, camRot[0], [0, 1, 0]);
    mat4.rotate(mvMatrix, camRot[1], [Math.cos(camRot[0]), 0, Math.sin(camRot[0])]);
    	
	mat4.translate(mvMatrix, cam_);



    mat4.scale(mvMatrix, [.5, .5, .5]);
	
	prepareMesh(materials.cube, meshes.cube);
    
		
    for(var x = 0; x < level.XM; x ++) {
    	for(var y = 0; y < level.YM; y ++) {
    		for(var z = 0; z < level.ZM; z ++) {
    			if(isVisible(x,y,z) && level.getLevelBlock([x,y,z]) != 0) {
	    			mvPushMatrix();
	    			
					mat4.translate(mvMatrix, [x*2, y*2, z*2]);
					
					gl.uniform1i(materials.cube.uniform.uBlockType, level.getLevelBlock([x,y,z]));
					
					if(player.selection != null && player.selection[0] == x && player.selection[1] == y && player.selection[2] == z) {
						gl.uniform1i(materials.cube.uniform.uSelected, player.selectionFace);
						drawMesh(materials.cube, meshes.cube);
						gl.uniform1i(materials.cube.uniform.uSelected, 0);
					} else {
						drawMesh(materials.cube, meshes.cube);
					}
					
					mvPopMatrix();
				}
    		}
    	}	
    }
}

function isVisible(x, y, z) {
	return  x == 0 || x == level.XM - 1 
			|| y == 0 || y == level.YM - 1
			|| z == 0 || z == level.ZM - 1
			|| level.blocks[x][y][z - 1] == 0 || level.blocks[x][y][z + 1] == 0 
			|| level.blocks[x][y - 1][z] == 0 || level.blocks[x][y + 1][z] == 0
			|| level.blocks[x - 1][y][z] == 0 || level.blocks[x + 1][y][z] == 0;
}
