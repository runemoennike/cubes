precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform int uSelected;

void main(void) {
	vec4 color = vec4(0.0);
	if(uSelected != 0) {
		color.r = 1.0;
	}
	gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)) + color;
}