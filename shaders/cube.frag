precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

uniform sampler2D uSampler;

uniform int uSelected;

void main(void) {
	vec4 color = vec4(0.0);
	
	if(uSelected != 0) {
		bool isSelectedFace = 
			(uSelected == 1 && vNormal.y == 1.0) ||
			(uSelected == 2 && vNormal.y == -1.0) ||
			(uSelected == 3 && vNormal.x == 1.0) ||
			(uSelected == 4 && vNormal.x == -1.0) ||
			(uSelected == 5 && vNormal.z == 1.0) ||
			(uSelected == 6 && vNormal.z == -1.0); 
				
		if(isSelectedFace) {
			color += vec4(0.2);
		}	
	}
	gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)) + color;
	//gl_FragColor = vec4(0.0);
}