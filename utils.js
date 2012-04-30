var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

function mvScale(mat) {
	mat4.scale(mvMatrix, mat);
}

function mvTranslate(mat) {
	mat4.translate(mvMatrix, mat);
}

function mvRotate(a, mat) {
	mat4.rotate(mvMatrix, a, mat);
}


function setMatrixUniforms(material) {
    gl.uniformMatrix4fv(material.uniform.uPMatrix, false, pMatrix);
    gl.uniformMatrix4fv(material.uniform.uMVMatrix, false, mvMatrix);
}


function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
