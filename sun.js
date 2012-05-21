var sun = {
	pos : vec3.create([10, 30, 0]),
	color : [1.0, 1.0, 0.9],
	skycolor : [0.4, 0.6, 1.0],
	horizoncolor : [0.62, 0.44, 0.17],
	
	timeOfDay : 0.0,

	update : function(tpf) {
		this.timeOfDay += 0.001 * tpf;
		if(this.timeOfDay >= 100.0) {
			this.timeOfDay -= 100.0;
		}
		
		var angle = this.timeOfDay / 100.0 * 2 * Math.PI; 
		this.pos[0] = Math.cos(angle) * 30;
		this.pos[1] = Math.sin(angle) * 30;
		
	}
}
