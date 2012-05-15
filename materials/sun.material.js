materials.sun = {
		'frag_shaders' : ['sky.frag'],
		'vert_shaders' : ['sky.vert'],
		'attrib' : {
			'aVertexPosition' : 0,
			'aTextureCoord' : 0,
			'aVertexNormal' : 0
		},
		'uniform' : {
			'uPMatrix' : 0,
			'uMVMatrix' : 0,
			
			'uSunColor' : 0,
		},
		'textures' : {
		},
		'prepare' : function() {
			gl.uniform3f(this.uniform.uSunColor, sun.color[0], sun.color[1], sun.color[2]);
		}
	};
	
