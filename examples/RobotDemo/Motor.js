;(function(){
	var ONE_THIRD = (Math.PI * 2) / 3;

	JPE.declare("Motor", {
		
		superclass: JPE.Composite,
		
		radius:null,
		color:null,

		constructor: function (attach, radius, color){

			JPE.Motor.superclass.prototype.constructor.apply(this);

			var CircleParticle = JPE.CircleParticle,
				WheelParticle = JPE.WheelParticle,
			SpringConstraint = JPE.SpringConstraint;

			var sg = this.sg = this.shape.graphics;
		
			var wheel = this.wheel = new WheelParticle(attach.getPx(), attach.getPy() - .01, radius);
			wheel.setStyle(0,0xFFF00,0, 0xFFF00,0.5);
			wheel.setVisible(false);
			var axle = new SpringConstraint(wheel, attach);

			var _rimA = this._rimA = new CircleParticle(0,0,2, true);
			var _rimB = this._rimB = new CircleParticle(0,0,2, true);
			var _rimC = this._rimC = new CircleParticle(0,0,2, true);
			
			wheel.setCollidable(false);
			_rimA.setCollidable(false);
			_rimB.setCollidable(false);
			_rimC.setCollidable(false);
			
			this.addParticle(_rimA);
			this.addParticle(_rimB);
			this.addParticle(_rimC);
			this.addParticle(wheel);
			this.addConstraint(axle);
			
			this.color = color;	
			this.radius = radius;
			
			// run it once to make sure the rim particles are in the right place
			this.run();
			
		},
			
		setPower: function (p) {
			this.wheel.setSpeed (p);
		},
	
	
		getPower: function () {
			return this.wheel.getSpeed();
		},
		
		
		getRimA: function () {
			return this._rimA;
		},
	
	
		getRimB: function () {
			return this._rimB;
		},
	
	
		getRimC: function () {
			return this._rimC;
		},

		run: function(){
			var theta = this.wheel.getRadian(),
				radius = this.radius,
				wheel = this.wheel,
				wx = wheel.getPx(),
				wy = wheel.getPy(),
				_rimA = this._rimA,
				_rimB = this._rimB,
				_rimC = this._rimC;

			_rimA.setPx( -radius * Math.sin(theta) + wx);
			_rimA.setPy(  radius * Math.cos(theta) + wy); 
			
			theta += ONE_THIRD;
			_rimB.setPx( -radius * Math.sin(theta) + wx);
			_rimB.setPy(  radius * Math.cos(theta) + wy); 	
			
			theta += ONE_THIRD;
			_rimC.setPx( -radius * Math.sin(theta) + wx);
			_rimC.setPy( radius * Math.cos(theta) + wy);
		},

		initSelf: function (){
			JPE.Motor.superclass.prototype.initSelf.apply(this);

			var sg = this.sg,
				radius = this.radius,
				color = this.color;

			sg.clear();
			
			sg.beginStroke(Graphics.getRGB(0xff000, 1));
			sg.beginFill(Graphics.getRGB(color, 1));
			
			sg.drawCircle(0, 0, 3);
			sg.endFill();
			
			var theta = 0;
			var cx = -radius * Math.sin(theta);
			var cy =  radius * Math.cos(theta);
			
			sg.beginStroke(Graphics.getRGB(0xff000, 1));
			sg.moveTo(0,0);
			sg.lineTo(cx,cy);
			sg.drawCircle(cx, cy, 2);
		
			theta += ONE_THIRD;
			cx = -radius * Math.sin(theta);
			cy =  radius * Math.cos(theta); 
			sg.moveTo(0,0);
			sg.lineTo(cx,cy);
			sg.drawCircle(cx, cy, 2);
			
			theta += ONE_THIRD;
			cx = -radius * Math.sin(theta);
			cy =  radius * Math.cos(theta); 
			sg.moveTo(0,0);
			sg.lineTo(cx,cy);
			sg.drawCircle(cx, cy, 2);	
			sg.endFill();
		},
	
		paint: function () {
			var sprite = this.getSprite(),
				wheel = this.wheel;

			sprite.x = wheel.getPx();
			sprite.y = wheel.getPy();
			sprite.rotation = wheel.getAngle();
		}

	});

})();