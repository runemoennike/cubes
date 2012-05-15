materials.sun = {
		'frag_shaders' : ['sun.frag'],
		'vert_shaders' : ['sun.vert'],
		'attrib' : {
			'aVertexPosition' : 0,
			'aTextureCoord' : 0,
			'aVertexNormal' : 0
		},
		'uniform' : {
			'uPMatrix' : 0,
			'uMVMatrix' : 0,
			
			'uSelected' : 0,
			'uBlockType' : 0,
			'uBreakage' : 0,
			
			'uSunColor' : 0,
		},
		'textures' : {
		},
		'prepare' : function() {
			gl.uniform3f(this.uniform.uSunColor, sun.color[0], sun.color[1], sun.color[2]);
		}
	};
	
