precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 vWorldPos;

uniform vec3 uSkyColor;
uniform vec3 uSunColor;
uniform vec3 uHorizonColor;
varying vec3 vSunVector;

uniform sampler2D uTexStars;

uniform mat4 uRotMatrix;

uniform float uTimeOfDay;

const float PI=3.1415926535;

void main(void) {
	vec3 norm = vNormal;
	float w_sun = 0.0;
	float sun_dist = length(vSunVector);

	float d = dot(normalize(vSunVector), normalize(vWorldPos));
	if(d > 0.997) {
		w_sun = 1.0;
	} else if(d > 0.0) {
		w_sun = pow(d,20.0);
	}
	
	// Horizon
	float w_horizon = 0.0;
	if(vWorldPos.y < 0.0) {
		w_horizon = 1.0-(1.0/-vWorldPos.y) / 10.0;
		w_horizon = clamp(w_horizon, 0.0, 1.0);
	}
	
	// Sky background
	float rho = asin(vWorldPos.y);
	float theta = atan(vWorldPos.x, vWorldPos.z);
	vec2 tc = vec2(rho * sin(theta), rho * cos(theta));
	
	float todRad = uTimeOfDay / 100.0 * 2.0 * PI;
	vec3 skyBackroundColor;
	skyBackroundColor = texture2D(uTexStars, tc).rgb * (sin(todRad + PI) * 0.5 + 0.5) + uSkyColor * (sin(todRad) * 0.5 + 0.5);
	
	gl_FragColor = vec4(uSunColor * w_sun + skyBackroundColor *  max(0.0, 1.0 - w_sun - w_horizon) + uHorizonColor * w_horizon, 1.0);
	//gl_FragColor = vec4(skyColor, 1.0);
	//gl_FragColor = vec4(vWorldPos, 1.0);
}
