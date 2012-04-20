var level = {
	blocks : new Array(),

	XM : 20,
	YM : 10,
	ZM : 20,

	initLevel : function() {
		this.blocks = new Array(this.XM);
		for( x = 0; x < this.XM; x++) {
			this.blocks[x] = new Array(this.YM);
			for( y = 0; y < this.YM; y++) {
				this.blocks[x][y] = new Array(this.ZM);
				for( z = 0; z < this.ZM; z++) {
					if(y < 5) {
						this.blocks[x][y][z] = 1;
					} else {
						this.blocks[x][y][z] = 0;
					}
				}
			}
		}
	},

	worldToLevelCoord : function(wp) {
		return [Math.floor(wp[0] * game.blockSize), Math.floor(wp[1] * game.blockSize), Math.floor(wp[2] * game.blockSize)];
	},

	isInLevelBounds : function(lp) {
		return lp[0] >= 0 && lp[1] >= 0 && lp[2] >= 0 && lp[0] < this.XM && lp[1] < this.YM && lp[2] < this.ZM;
	},

	getLevelBlock : function(lp) {
		return this.blocks[lp[0]][lp[1]][lp[2]];
	},

	setLevelBlock : function(lp, v) {
		this.blocks[lp[0]][lp[1]][lp[2]] = v;
	},

	findSelection : function(headPos, yaw, pitch) {
		var stepLength = 1.0;
		var maxSearchLength = 10, curSearchLength = 0;
		var pos = vec3.create(headPos);
		var step = vec3.create([Math.sin(yaw) * stepLength, -Math.sin(pitch) * stepLength, -Math.cos(yaw) * stepLength]);
		var l = vec3.create();

		do {
			l = this.worldToLevelCoord(pos);
			vec3.add(pos, step);
			curSearchLength += stepLength;
		} while(curSearchLength < maxSearchLength && this.isInLevelBounds(l) && this.getLevelBlock(l) == 0);

		if(this.isInLevelBounds(l) && this.getLevelBlock(l) != 0) {
			player.selection = l;
		} else {
			player.selection = null;
		}
	}
}
