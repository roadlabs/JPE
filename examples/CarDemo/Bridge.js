JPE.declare("Bridge", {

	superclass: JPE.Group,

	constructor: function(colB, colC, colD){

		JPE.Bridge.superclass.prototype.constructor.apply(this);

		var bx = 170;
		var by = 40;
		var bsize = 51.5;
		var yslope = 2.4;
		var particleSize = 4;
		
		var CircleParticle = JPE.CircleParticle,
			SpringConstraint = JPE.SpringConstraint;
		
		var bridgePAA = new CircleParticle(bx,by,particleSize,true);
	
		
		bridgePAA.setStyle(1, colC, 1, colB);
		
		this.addParticle(bridgePAA);
		
		bx += bsize;
		by += yslope;
		var bridgePA = new CircleParticle(bx,by,particleSize);
		bridgePA.setStyle(1, colC, 1, colB);
		this.addParticle(bridgePA);
		
		bx += bsize;
		by += yslope;
		var bridgePB = new CircleParticle(bx,by,particleSize);
		bridgePB.setStyle(1, colC, 1, colB);
		this.addParticle(bridgePB);
		
		bx += bsize;
		by += yslope;
		var bridgePC = new CircleParticle(bx,by,particleSize);
		bridgePC.setStyle(1, colC, 1, colB);
		this.addParticle(bridgePC);
		
		bx += bsize;
		by += yslope;
		var bridgePD = new CircleParticle(bx,by,particleSize);
		bridgePD.setStyle(1, colC, 1, colB);
		this.addParticle(bridgePD);
		
		bx += bsize;
		by += yslope;
		var bridgePDD = new CircleParticle(bx,by,particleSize,true);
		bridgePDD.setStyle(1, colC, 1, colB);
		this.addParticle(bridgePDD);
		
		
		var bridgeConnA = new SpringConstraint(bridgePAA, bridgePA, 
				0.9, true, 10, 0.8);
		
		// collision response on the bridgeConnA will be ignored on 
		// on the first 1/4 of the constraint. this avoids blow ups
		// particular to springcontraints that have 1 fixed particle.
		bridgeConnA.setFixedEndLimit(0.25);
		bridgeConnA.setStyle(1, colC, 1, colB);
		this.addConstraint(bridgeConnA);
		
		var bridgeConnB = new SpringConstraint(bridgePA, bridgePB, 
				0.9, true, 10, 0.8);
		bridgeConnB.setStyle(1, colC, 1, colB);
		this.addConstraint(bridgeConnB);
		
		var bridgeConnC = new SpringConstraint(bridgePB, bridgePC, 
				0.9, true, 10, 0.8);
		bridgeConnC.setStyle(1, colC, 1, colB);
		this.addConstraint(bridgeConnC);
		
		var bridgeConnD = new SpringConstraint(bridgePC, bridgePD,
				0.9, true, 10, 0.8);
		bridgeConnD.setStyle(1, colC, 1, colB);
		this.addConstraint(bridgeConnD);
		
		var bridgeConnE = new SpringConstraint(bridgePD, bridgePDD, 
				0.9, true, 10, 0.8);
		bridgeConnE.setFixedEndLimit(0.25);
		bridgeConnE.setStyle(1, colC, 1, colB);
		this.addConstraint(bridgeConnE);
	}

});
