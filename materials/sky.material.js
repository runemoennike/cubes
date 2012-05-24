materials.sky = {
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
			'uRotMatrix' : 0,
						
			'uSunPosition' : 0,
			'uSunColor' : 0,
			'uSkyColor' : 0,
			'uHorizonColor' : 0,
			'uTimeOfDay' : 0,
			
			'uTexStars' : 0
		},
		'textures' : {
			0 : {
				'filename' : 'stars.png',
				'uniform' : 'uTexStars'
			},
		},
		'prepare' : function() {
			var rotMatrix = mat4.create();
			mat4.identity(rotMatrix);
			mat4.rotate(rotMatrix, camRot[0], [0, 1, 0]);
			mat4.rotate(rotMatrix, camRot[1], [Math.cos(camRot[0]), 0, Math.sin(camRot[0])]);
			
			gl.uniformMatrix4fv(this.uniform.uRotMatrix, 0, rotMatrix);
			
			gl.uniform3f(this.uniform.uSunPosition, sun.pos[0], sun.pos[1], sun.pos[2]);
			gl.uniform3f(this.uniform.uSunColor, sun.color[0], sun.color[1], sun.color[2]);
			gl.uniform3f(this.uniform.uSkyColor, sun.skycolor[0], sun.skycolor[1], sun.skycolor[2]);
			gl.uniform3f(this.uniform.uHorizonColor, sun.horizoncolor[0], sun.horizoncolor[1], sun.horizoncolor[2]);
			
			gl.uniform1f(this.uniform.uTimeOfDay, sun.timeOfDay);
		}
	};
	
