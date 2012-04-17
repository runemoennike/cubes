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


function setMatrixUniforms(material) {
    gl.uniformMatrix4fv(material.uniform.uPMatrix, false, pMatrix);
    gl.uniformMatrix4fv(material.uniform.uMVMatrix, false, mvMatrix);
}


function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
