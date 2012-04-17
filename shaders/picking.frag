precision mediump float;

varying vec2 vTextureCoord;

uniform vec3 loc;
uniform int face;

void main(void) {
	gl_FragColor = vec4(loc, 1.0/float(face));
}