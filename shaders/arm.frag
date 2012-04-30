precision mediump float;


varying vec2 vTextureCoord;
varying vec3 vNormal;

uniform sampler2D uTexSkin;

void main(void) {
	vec4 tex_color = texture2D(uTexSkin, vec2(vTextureCoord.s, vTextureCoord.t));
	gl_FragColor = tex_color; //vec4(0.3, 0.9, 1.0, 1.0);
}