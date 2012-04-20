var player = {
	selection : null,

	rotSpeed : 0.003,
	tiltSpeed : 0.001,
	walkSpeed : 0.2,
	walkAcc : 0.02,
	strafeSpeed : 0.2,
	strafeAcc : 0.02,

	pos : vec3.create([5, 6, 5]),
	rot : [0, 0.5],
	vel : vec3.create([0, 0, 0]),

	move : function(forward, sideways) {
		this.vel[0] -= Math.sin(this.rot[0]) * -forward * this.walkSpeed - Math.cos(this.rot[0]) * -sideways * this.strafeSpeed;
		this.vel[2] += Math.cos(this.rot[0]) * -forward * this.walkSpeed + Math.sin(this.rot[0]) * -sideways * this.strafeSpeed;
	},
	
	rotate : function(dx, dy) {
		camRot[0] += dx * this.rotSpeed;
		camRot[1] += dy * this.tiltSpeed;
	},
	
	update : function() {
		vec3.scale(this.vel, 0.5);
		vec3.add(this.pos, this.vel);
	}
}
