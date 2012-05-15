var sun = {
	pos : vec3.create([10, 30, 10]),
	color : [1.0, 1.0, 0.9],
	skycolor : [0.4, 0.6, 1.0],
	horizoncolor : [0.62, 0.44, 0.17],

	update : function(tpf) {
		this.pos[0] += 0.01;
	}
}
