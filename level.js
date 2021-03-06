var level = {
	blocks : new Array(),
	breakage : {},

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
						this.blocks[x][y][z] = Math.floor(Math.random()*4) + 1;
					} else {
						this.blocks[x][y][z] = 0;
					}
				}
			}
		}
	},

	worldToLevelCoord : function(wp) {
		return [Math.floor(wp[0] * game.blockSize + game.blockSize / 2.0), Math.floor(wp[1] * game.blockSize + game.blockSize / 2.0), Math.floor(wp[2] * game.blockSize + game.blockSize / 2.0)];
	},
	
	levelToWorldCoord : function(lp) {
		return [(lp[0] - game.blockSize / 2) / game.blockSize, (lp[1] - game.blockSize / 2) / game.blockSize, (lp[2] - game.blockSize / 2) / game.blockSize]
	},
	
	collideWC : function(wp) {
		return this.getLevelBlock(this.worldToLevelCoord(wp)) > 0;
	},
	
	collideLC : function(lp) {
		return this.getLevelBlock(lp) > 0;
	},
	
	findHeightWC : function(wp) {
		var lp = this.worldToLevelCoord(wp);
		return this.findHeightLC(lp);
	},
	
	findHeightLC : function(lp) {
		for(var y = level.YM - 1; y >= 0; y --) {
			if(level.collideLC([lp[0], y, lp[2]])) {
				return y;
			}
		}
		return 0;
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
		var stepLength = 0.3;
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
			
			vec3.subtract(pos, step);
			vec3.subtract(pos, step);
			pp = this.worldToLevelCoord(pos);
			if(pp[1] > l[1]) {
				player.selectionFace = 1; // Up
			} else if(pp[1] < l[1]) {
				player.selectionFace = 2; // Down
			} else if(pp[0] > l[0]) {
				player.selectionFace = 3; // Left
			} else if(pp[0] < l[0]) {
				player.selectionFace = 4; // Right
			} else if(pp[2] > l[2]) {
				player.selectionFace = 5; // Back
			} else if(pp[2] < l[2]) {
				player.selectionFace = 6; // Front
			} else {
				player.selectionFace = 1;
			}
			
			// $('#debug').html("face=" + player.selectionFace + " l=" + l.toString() + " pp=" + pp.toString());
		} else {
			player.selection = null;
		}
	},
	
	update : function(tpf) {
		tpf = 30.0 / tpf;
		var timeNow = new Date().getTime();
		for(var key in this.breakage) {
			if(timeNow - this.breakage[key].lasthit > 1000) {
				this.breakage[key].damage -= 0.05 * tpf;
				if(this.breakage[key].damage < -0.1) {
					delete this.breakage[key];
				}
			}
		}
	} 
}
