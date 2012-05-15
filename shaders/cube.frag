precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 vWorldPos;

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

uniform vec3 uSunPosition;
uniform vec3 uSunColor;
varying vec3 vSunVector;

void main(void) {
	// Involved color components
	vec4 highlight_color = vec4(0.0);
	vec4 tex_color = vec4(0.0);
	vec4 breakage_color = vec4(0.0);
	vec4 light = vec4(0.0);
	
	// Common stuff
	vec3 eye_vec_norm = normalize(vWorldPos);
	vec3 norm = normalize(vNormal);
	
	// Selection
	if(uSelected != 0) {
		bool isSelectedFace = 
			(uSelected == 1 && vNormal.y == 1.0) ||
			(uSelected == 2 && vNormal.y == -1.0) ||
			(uSelected == 3 && vNormal.x == 1.0) ||
			(uSelected == 4 && vNormal.x == -1.0) ||
			(uSelected == 5 && vNormal.z == 1.0) ||
			(uSelected == 6 && vNormal.z == -1.0); 
				
		
		if(abs(vTextureCoord.x - 0.5) > 0.49 || abs(vTextureCoord.y - 0.5) > 0.49) {
			highlight_color += vec4(vec3(0.6), -0.5);
		} else if(isSelectedFace) {
			highlight_color += vec4(0.2);
		}	
	}
	
	// Material texture
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
	
	// Breakage
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
	
	// Lighting, ambient
	light = vec4(vec3(0.3), 1.0);
	
	// Lighting, sun
	vec3 sun_vec_norm = normalize(vSunVector);
	float d = dot(norm, sun_vec_norm);
	if(d > 0.0) {
		light += d * vec4(uSunColor, 1.0);
		
		vec3 h = normalize(eye_vec_norm + sun_vec_norm);
		float s = dot(norm, h);
		if(s>0.0)
			light += d*pow(s, 100.0)*vec4(1.0);
	}
	
	
	// Combine light and material
	gl_FragColor = light * tex_color;
	
	// Breakage and selection are independent of lighting and material
	gl_FragColor += highlight_color + breakage_color;
}