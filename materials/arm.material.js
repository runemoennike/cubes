materials.arm = {
		'frag_shaders' : ['arm.frag'],
		'vert_shaders' : ['arm.vert'],
		'attrib' : {
			'aVertexPosition' : 0,
			'aTextureCoord' : 0,
			'aVertexNormal' : 0
		},
		'uniform' : {
			'uPMatrix' : 0,
			'uMVMatrix' : 0,
			'uTexSkin' : 0
		},
		'textures' : {
			0 : {
				'filename' : 'arm.png',
				'uniform' : 'uTexSkin'
			}
		}
	};
	
