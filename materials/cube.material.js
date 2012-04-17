materials.cube = {
		'frag_shaders' : ['cube.frag'],
		'vert_shaders' : ['cube.vert'],
		'attrib' : {
			'aVertexPosition' : 0,
			'aTextureCoord' : 0,
			'aVertexNormal' : 0
		},
		'uniform' : {
			'uPMatrix' : 0,
			'uMVMatrix' : 0,
			'uSampler' : 0
		},
		'textures' : {
			0 : {
				'filename' : 'grass.png',
				'uniform' : 'uSampler'
			}
		}
	};