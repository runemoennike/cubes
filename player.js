var player = {
	selection : null,
	selectionFace : 0,

	rotSpeed : 0.003,
	tiltSpeed : 0.001,
	walkSpeed : 0.2,
	walkAcc : 0.02,
	strafeSpeed : 0.2,
	strafeAcc : 0.02,

	jumpPower : 2,

	pos : vec3.create([5, 10, 5]),
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
	
	
	jump : function() {
		if(this.vel[1] == 0) {
			this.vel[1] += this.jumpPower;
		}
	},
	
	update : function(tpf) {
		tpf /= 30;
		vec3.scale(this.vel, 0.5 * tpf);
		
		var vel = vec3.create(this.vel);
		vec3.scale(tpf);
		vec3.add(this.pos, vel);
		
		this.vel[1] -= game.gravity * tpf;
		if(this.vel[1] < 0 && level.collideWC([this.pos[0], this.pos[1]-2, this.pos[2]])) {
			this.vel[1] = 0;
		}
	}
}
