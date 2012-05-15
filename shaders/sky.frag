precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 vWorldPos;

uniform vec3 uSkyColor;
uniform vec3 uSunColor;
uniform vec3 uHorizonColor;
varying vec3 vSunVector;

uniform mat4 uRotMatrix;

void main(void) {
	float w_sun = 0.0;
	float sun_dist = length(vSunVector);

	//w_sun = 1.0/(sun_dist) * 8.0;
	//w_sun = clamp(w_sun, 0.0, 1.0);
	
	float d = dot(normalize(vSunVector), normalize(vWorldPos));
	if(d > 0.997) {
		w_sun = 1.0;
	} else if(d > 0.0) {
		w_sun = d*d;
	}
	
	// Horizon
	float w_horizon = 0.0;
	if(vWorldPos.y < 0.0) {
		w_horizon = 1.0-(1.0/-vWorldPos.y) / 10.0;
		w_horizon = clamp(w_horizon, 0.0, 1.0);
	}
	
	gl_FragColor = vec4(uSunColor * w_sun + uSkyColor *  max(0.0, 1.0 - w_sun - w_horizon) + uHorizonColor * w_horizon, 1.0);
	//gl_FragColor = vec4(vWorldPos, 1.0);
}