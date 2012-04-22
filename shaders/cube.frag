precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

uniform sampler2D uTexGrass;
uniform sampler2D uTexPebble;
uniform sampler2D uTexSand;
uniform sampler2D uTexStone;
uniform sampler2D uTexWater;

uniform sampler2D uTexBreaking1;
uniform sampler2D uTexBreaking2;
uniform sampler2D uTexBreaking3;

uniform int uSelected;
uniform int uBlockType;
uniform int uBreakage;

void main(void) {
	vec4 highlight_color = vec4(0.0);
	vec4 tex_color = vec4(0.0);
	vec4 breakage_color = vec4(0.0);
	
	if(uSelected != 0) {
		bool isSelectedFace = 
			(uSelected == 1 && vNormal.y == 1.0) ||
			(uSelected == 2 && vNormal.y == -1.0) ||
			(uSelected == 3 && vNormal.x == 1.0) ||
			(uSelected == 4 && vNormal.x == -1.0) ||
			(uSelected == 5 && vNormal.z == 1.0) ||
			(uSelected == 6 && vNormal.z == -1.0); 
				
		if(isSelectedFace) {
			highlight_color += vec4(0.2);
		}	
	}
	
	if(uBlockType == 1) {
		tex_color = texture2D(uTexGrass, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == 2) {
		tex_color = texture2D(uTexStone, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == 3) {
		tex_color = texture2D(uTexPebble, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == 4) {
		tex_color = texture2D(uTexSand, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == -1) {
		tex_color = texture2D(uTexWater, vec2(vTextureCoord.s, vTextureCoord.t));
	}
	
	if(uBreakage == 1) {
		breakage_color = texture2D(uTexBreaking1, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBreakage == 2) {
		breakage_color = texture2D(uTexBreaking2, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBreakage == 3) {
		breakage_color = texture2D(uTexBreaking3, vec2(vTextureCoord.s, vTextureCoord.t));
	}
	if(breakage_color.a < 0.5) {
		breakage_color = vec4(0.0);
	} else {
		breakage_color = vec4(-.4, -.4, -.4, 0.0) + breakage_color;
	}
	
	gl_FragColor = tex_color + highlight_color + breakage_color;
}