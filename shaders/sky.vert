attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 vWorldPos;

uniform mat4 uRotMatrix;

uniform vec3 uSunPosition;
varying vec3 vSunVector;

void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	vTextureCoord = aTextureCoord;
	vNormal = aVertexNormal;
	vWorldPos = (uMVMatrix * vec4(aVertexPosition, 1.0) * uRotMatrix).xyz;

	vSunVector = uSunPosition - vWorldPos;
}