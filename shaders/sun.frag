precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 vWorldPos;

uniform vec3 uSunColor;

void main(void) {
	gl_FragColor = vec4(uSunColor, 1.0);
}