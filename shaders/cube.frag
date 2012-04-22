precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

uniform sampler2D uTexGrass;
uniform sampler2D uTexPebble;
uniform sampler2D uTexSand;
uniform sampler2D uTexStone;
uniform sampler2D uTexWater;

uniform int uSelected;
uniform int uBlockType;

void main(void) {
	vec4 highlight = vec4(0.0);
	vec4 texcolor = vec4(0.0);
	
	if(uSelected != 0) {
		bool isSelectedFace = 
			(uSelected == 1 && vNormal.y == 1.0) ||
			(uSelected == 2 && vNormal.y == -1.0) ||
			(uSelected == 3 && vNormal.x == 1.0) ||
			(uSelected == 4 && vNormal.x == -1.0) ||
			(uSelected == 5 && vNormal.z == 1.0) ||
			(uSelected == 6 && vNormal.z == -1.0); 
				
		if(isSelectedFace) {
			highlight += vec4(0.2);
		}	
	}
	
	if(uBlockType == 1) {
		texcolor = texture2D(uTexGrass, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == 2) {
		texcolor = texture2D(uTexStone, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == 3) {
		texcolor = texture2D(uTexPebble, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == 4) {
		texcolor = texture2D(uTexSand, vec2(vTextureCoord.s, vTextureCoord.t));
	} else if(uBlockType == -1) {
		texcolor = texture2D(uTexWater, vec2(vTextureCoord.s, vTextureCoord.t));
	}
	
	gl_FragColor = texcolor + highlight;
	//gl_FragColor = vec4(0.0);
}