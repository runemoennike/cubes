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
			'uBreakage' : 0,
			
			'uSunPosition' : 0,
			'uSunColor' : 0,
			
			'uTexGrass' : 0,
			'uTexStone' : 0,
			'uTexPebble' : 0,
			'uTexSand' : 0,
			'uTexWater' : 0,
			
			'uTexBreaking1' : 0,
			'uTexBreaking2' : 0,
			'uTexBreaking3' : 0
		},
		'textures' : {
			0 : {
				'filename' : 'grass.png',
				'uniform' : 'uTexGrass'
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
			},
			
			5 : {
				'filename' : 'breaking_1.png',
				'uniform' : 'uTexBreaking1'
			},
			6 : {
				'filename' : 'breaking_2.png',
				'uniform' : 'uTexBreaking2'
			},
			7 : {
				'filename' : 'breaking_3.png',
				'uniform' : 'uTexBreaking3'
			}
		},
		'prepare' : function() {
			gl.uniform3f(this.uniform.uSunPosition, sun.pos[0], sun.pos[1], sun.pos[2]);
			gl.uniform3f(this.uniform.uSunColor, sun.color[0], sun.color[1], sun.color[2]);
		}
	};
	
