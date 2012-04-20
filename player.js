var player = {
	selection : null,

	rotSpeed : 0.003,
	tiltSpeed : 0.001,
	walkSpeed : 0.1,
	strafeSpeed : 0.1,

	pos : [5, 6, 5],
	rot : [0, 0.5],

	move : function(forward, sideways) {
		this.pos[0] -= Math.sin(this.rot[0]) * -forward * this.walkSpeed - Math.cos(this.rot[0]) * -sideways * this.strafeSpeed;
		this.pos[2] += Math.cos(this.rot[0]) * -forward * this.walkSpeed + Math.sin(this.rot[0]) * -sideways * this.strafeSpeed;
	},
	
	rotate : function(dx, dy) {
		camRot[0] += dx * this.rotSpeed;
		camRot[1] += dy * this.tiltSpeed;
	}
}
