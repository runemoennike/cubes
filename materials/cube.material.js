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
			'uSelected' : 0,
			'uBlockType' : 0,
			'uTexGrass' : 0,
			'uTexStone' : 0,
			'uTexPebble' : 0,
			'uTexSand' : 0,
			'uTexWater' : 0
		},
		'textures' : {
			0 : {
				'filename' : 'grass.png',
				'uniform' : 'uTextGrass'
			},
			1 : {
				'filename' : 'stone.png',
				'uniform' : 'uTexStone'
			},
			2 : {
				'filename' : 'pebble.png',
				'uniform' : 'uTexPebble'
			},
			3 : {
				'filename' : 'sand.png',
				'uniform' : 'uTexSand'
			},
			4 : {
				'filename' : 'water.png',
				'uniform' : 'uTexWater'
			}
		}
	};
	
