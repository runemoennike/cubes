attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying float face;


void main(void) {
	if(aVertexNormal.z == 1.0) {
		face = 1.0; // Front
	} else if(aVertexNormal.z == -1.0) {
		face = 2.0; // Back
	} else if(aVertexNormal.y == 1.0) {
		face = 3.0; // Top
	} else if(aVertexNormal.y == -1.0) {
		face = 4.0; // Bottom
	} else if(aVertexNormal.x == 1.0) {
		face = 5.0; // Right
	} else if(aVertexNormal.x == -1.0) {
		face = 6.0; // Left
	}

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}