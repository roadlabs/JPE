/*
 * Copyright (c) 2011 http://colorhook.com
 * @author: <a href="colorhook@gmail.com">colorhook</a>
 * @version:1.0.0
 *
 * Transplant from Flash AS3 APE Engine
 * http://www.cove.org/ape/
 * Copyright (c) 2006, 2007 Alec Cove
 * Released under the MIT Licenses.
 *
 * Dependency on EaselJS
 * http://easeljs.com/
 * Copyright (c) 2011 Grant Skinner
 * Released under the MIT Licenses.
 */
(function(e){var b={VERSION:"1.0.0"},f="JPE",a=0,d=Object.prototype.toString,c=function(g,t,j,q,n,o){if(!t||!g){return g}if(n){switch(n){case 1:return c(g.prototype,t.prototype,j,q,0);case 2:c(g.prototype,t.prototype,j,q,0);break;case 3:return c(g,t.prototype,j,q,0);case 4:return c(g.prototype,t,j,q,0);default:}}if(!t||!g){return g}if(j===undefined){j=true}var m,h,k;if(q&&(k=q.length)){for(m=0;m<k;m++){h=q[m];if(h in t){if(j||!(h in g)){g[h]=t[h]}}}}else{for(h in t){if(j||!(h in g)){g[h]=t[h]}}}return g};c(b,{mix:c,guid:function(g){var h=(a++)+"";return g?g+h:h},isUndefined:function(g){return g===undefined},isBoolean:function(g){return d.call(g)==="[object Boolean]"},isString:function(g){return d.call(g)==="[object String]"},isNumber:function(g){return d.call(g)==="[object Number]"&&isFinite(g)},isFunction:function(g){return d.call(g)==="[object Function]"},isArray:function(g){return d.call(g)==="[object Array]"},merge:function(){var h=arguments,k={},j,g=h.length;for(j=0;j<g;j=j+1){c(k,h[j],true)}return k},namespace:function(m){var h=arguments,q=null,n,k,p,g;for(n=0;n<h.length;n=n+1){p=(""+h[n]).split(".");q=this;g=p.length;for(k=(p[0]==f)?1:0;k<g;k=k+1){q[p[k]]=q[p[k]]||{};q=q[p[k]]}}return q},extend:function(m,k,h,p){if(!k||!m){return m}var g=Object.prototype,o=function(r){function q(){}q.prototype=r;return new q()},n=k.prototype,j=o(n);m.prototype=j;j.constructor=m;m.superclass=n;if(k!=Object&&n.constructor==g.constructor){n.constructor=k}if(h){c(j,h,true)}if(p){c(m,p,true)}m.superclass=k;return m},declare:function(q,g,v){var u=this;if(this.isFunction(g)){var h=g();if(!u.isUndefined(h)){u.declare(q,h)}return}g=g||{};var t=g.superclass,r,n,k,m,j;if(g.hasOwnProperty("constructor")&&this.isFunction(g.constructor)){r=g.constructor}else{if(!t){r=function(){}}else{r={}}}delete g.constructor;if(!t){this.mix(r.prototype,g)}else{r=this.extend(r,t,g)}n=(""+q).split(".");m=(n[0]==f)?1:0;k=n.length;j=this;for(;m<k;m++){if(m==k-1){j[n[m]]=r}else{j[n[m]]=j[n[m]]||{}}j=j[n[m]]}return j}});c(b,{_loadedClassMap:{},_callbackList:[],_loadingCount:0,_loadScript:function(j){var g=this._loadedClassMap,h=this,k;if(g[j]){return}g[j]=true;this._loadingCount++;k=document.createElement("script");k.src=j;k.charset="utf-8";document.getElementsByTagName("head")[0].appendChild(k);k.onload=function(){k.onload=null;h._onScriptLoaded()}},_onScriptLoaded:function(){var j=--this._loadingCount,h=this._callbackList,g;if(j>0){return}else{while(g=h.shift()){g()}}},_loadClass:function(g){if(!/\.js$/.test(g)){g=g+".js"}this._loadScript(g)},require:function(h){var g;if(JPE.isArray(h)){g=h}else{g=[h]}for(i=0,l=g.length;i<l;i++){this._loadClass(g[i])}return this},addOnLoad:function(g){if(this._loadingCount==0){g()}else{this._callbackList.push(g)}}});e[f]=b})(window);JPE.declare("Engine",function(){JPE.Engine={force:null,masslessForce:null,groups:null,numGroups:0,timeStep:0,container:null,damping:1,constraintCycles:0,constraintCollisionCycles:1,init:function(a){if(isNaN(a)){a=0.25}this.timeStep=a*a;this.groups=[];this.force=new JPE.Vector(0,0);this.masslessForce=new JPE.Vector(0,0)},addForce:function(a){this.force.plusEquals(a)},addMasslessForce:function(a){this.masslessForce.plusEquals(a)},addGroup:function(a){this.groups.push(a);a.isParented=true;this.numGroups++;a.initSelf()},removeGroup:function(a){var b=this.groups.indexOf(a);if(b==-1){return}this.groups.splice(b,1);a.isParented=false;this.numGroups--;a.cleanup()},step:function(){this.integrate();for(var a=0;a<this.constraintCycles;a++){this.satisfyConstraints()}for(var b=0;b<this.constraintCollisionCycles;b++){this.satisfyConstraints();this.checkCollisions()}},paint:function(){for(var a=0;a<this.numGroups;a++){var b=this.groups[a];b.paint()}},integrate:function(){for(var a=0;a<this.numGroups;a++){var b=this.groups[a];b.integrate(this.timeStep)}},satisfyConstraints:function(){for(var a=0;a<this.numGroups;a++){var b=this.groups[a];b.satisfyConstraints()}},checkCollisions:function(){for(var a=0;a<this.numGroups;a++){var b=this.groups[a];b.checkCollisions()}}}});(function(){var a=function(c,b){this.x=c||0;this.y=b||0};JPE.mix(a.prototype,{setTo:function(c,b){this.x=c||0;this.y=b||0},copy:function(b){this.x=b.x;this.y=b.y},dot:function(b){return this.x*b.x+this.y*b.y},cross:function(b){return this.x*b.y+this.y*b.x},plus:function(b){return new a(this.x+b.x,this.y+b.y)},plusEquals:function(b){this.x+=b.x;this.y+=b.y;return this},minus:function(b){return new a(this.x-b.x,this.y-b.y)},minusEquals:function(b){this.x-=b.x;this.y-=b.y;return this},mult:function(b){return new a(this.x*b,this.y*b)},multEquals:function(b){this.x*=b;this.y*=b;return this},times:function(b){return new a(this.x*b.x,this.y*b.y)},divEquals:function(b){if(b==0){b=0.0001}this.x/=b;this.y/=b;return this},magnitude:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},distance:function(b){var c=this.minus(b);return c.magnitude()},normalize:function(){var b=this.magnitude();if(b==0){b=0.0001}return this.mult(1/b)},toString:function(){return(this.x+" : "+this.y)}});JPE.Vector=a})();JPE.declare("Interval",{constructor:function(b,a){this.min=b;this.max=a}});JPE.declare("Collision",{constructor:function(a,b){this.vn=a;this.vt=b}});JPE.MathUtil={ONE_EIGHTY_OVER_PI:180/Math.PI,PI_OVER_ONE_EIGHTY:Math.PI/180,clamp:function(c,b,a){if(c<b){return b}if(c>a){return a}return c},sign:function(a){if(a<0){return -1}return 1}};JPE.declare("AbstractItem",{constructor:function(){this._visible=true;this._alwaysRepaint=true;this.lineTickness=0;this.lineColor=0;this.lineAlpha=1;this.fillColor=3355443;this.fillAlpha=1},initSelf:function(){JPE.Engine.container.addChild(this.getSprite())},paint:function(){},cleanup:function(){JPE.Engine.container.removeChild(this.getSprite())},getVisible:function(){return this._visible},setVisible:function(a){this._visible=a;this.getSprite().visible=a},getAlwaysRepaint:function(){return this._alwaysRepaint},setAlwaysRepaint:function(a){this._alwaysRepaint=a},setStyle:function(c,d,a,e,b){c=c||0;d=d||0;a=a||1;e=e||0;b=b||1;this.setLine(c,d,a);this.setFill(e,b);this.drawShape()},setLine:function(b,a,c){this.lineThickness=b;this.lineColor=a;this.lineAlpha=c;this.drawShape()},setFill:function(a,b){this.fillColor=a;this.fillAlpha=b;this.drawShape()},createShape:function(){if(this.shape!=null){this.getSprite().removeChild(this.shape)}this.shape=new Shape();this.drawShape();this.getSprite().addChild(this.shape)},drawShape:function(){},getSprite:function(){if(this._sprite==null){this._sprite=new Container()}return this._sprite},});JPE.CollisionResolver={resolveParticleParticle:function(o,n,m,g){o.curr.copy(o.samp);n.curr.copy(n.samp);var p=m.mult(g);var d=o.getElasticity()+n.getElasticity();var h=o.getInvMass()+n.getInvMass();var c=this.clamp(1-(o.getFriction()+n.getFriction()),0,1);var f=o.getComponents(m);var e=n.getComponents(m);var k=(e.vn.mult((d+1)*o.getInvMass()).plus(f.vn.mult(n.getInvMass()-d*o.getInvMass()))).divEquals(h);var j=(f.vn.mult((d+1)*n.getInvMass()).plus(e.vn.mult(o.getInvMass()-d*n.getInvMass()))).divEquals(h);f.vt.multEquals(c);e.vt.multEquals(c);var b=p.mult(o.getInvMass()/h);var a=p.mult(-n.getInvMass()/h);k.plusEquals(f.vt);j.plusEquals(e.vt);if(!o.getFixed()){o.resolveCollision(b,k,m,g,-1,n)}if(!n.getFixed()){n.resolveCollision(a,j,m,g,1,o)}},clamp:function(b,c,a){if(b>a){return a}if(b<c){return c}return b}};JPE.declare("CollisionDetector",function(){var b=Number.POSITIVE_INFINITY;var a=JPE.Vector;JPE.CollisionDetector={test:function(d,c){if(d.getFixed()&&c.getFixed()){return}if(d.getMultisample()==0&&c.getMultisample()==0){this.normVsNorm(d,c)}else{if(d.getMultisample()>0&&c.getMultisample()==0){this.sampVsNorm(d,c)}else{if(c.getMultisample()>0&&d.getMultisample()==0){this.sampVsNorm(c,d)}else{if(d.getMultisample()==c.getMultisample()){this.sampVsSamp(d,c)}else{this.normVsNorm(d,c)}}}}},normVsNorm:function(d,c){d.samp.copy(d.curr);c.samp.copy(c.curr);this.testTypes(d,c)},sampVsNorm:function(g,c){var f=g.getMultisample(),h=1/(f+1),e=h,d;c.samp.copy(c.curr);for(d=0;d<=f;d++){g.samp.setTo(g.prev.x+e*(g.curr.x-g.prev.x),g.prev.y+e*(g.curr.y-g.prev.y));if(this.testTypes(g,c)){return}e+=h}},sampVsSamp:function(g,c){var f=g.getMultisample(),h=1/(f+1),e=h,d;for(d=0;d<=f;d++){g.samp.setTo(g.prev.x+e*(g.curr.x-g.prev.x),g.prev.y+e*(g.curr.y-g.prev.y));c.samp.setTo(c.prev.x+e*(c.curr.x-c.prev.x),c.prev.y+e*(c.curr.y-c.prev.y));if(this.testTypes(g,c)){return}e+=h}},testTypes:function(e,d){var c=e.constructor,j=d.constructor,g=JPE.RectangleParticle,h=JPE.CircleParticle;if((e instanceof g)&&(d instanceof g)){var f=this.testOBBvsOBB(e,d);return f}else{if((e instanceof h)&&(d instanceof h)){return this.testCirclevsCircle(e,d)}else{if((e instanceof g)&&(d instanceof h)){return this.testOBBvsCircle(e,d)}else{if((e instanceof h)&&(d instanceof g)){return this.testOBBvsCircle(d,e)}}}}return false},testOBBvsOBB:function(e,c){var k,r=b;for(var m=0;m<2;m++){var j=e.getAxes()[m],n=e.getProjection(j),f=c.getProjection(j),q=this.testIntervals(n,f);if(q==0){return false}var h=c.getAxes()[m],p=this.testIntervals(e.getProjection(h),c.getProjection(h));if(p==0){return false}var g=Math.abs(q),d=Math.abs(p);if(g<Math.abs(r)||d<Math.abs(r)){var o=g<d;k=o?j:h;r=o?q:p}}JPE.CollisionResolver.resolveParticleParticle(e,c,k,r);return true},testOBBvsCircle:function(d,e){var f,o=b,n=new Array(2),h=0,m,g,c;for(;h<2;h++){m=d.getAxes()[h];g=this.testIntervals(d.getProjection(m),e.getProjection(m));if(g==0){return false}if(Math.abs(g)<Math.abs(o)){f=m;o=g}n[h]=g}c=e.getRadius();if(Math.abs(n[0])<c&&Math.abs(n[1])<c){var k=this.closestVertexOnOBB(e.samp,d);f=k.minus(e.samp);var j=f.magnitude();o=c-j;if(o>0){f.divEquals(j)}else{return false}}JPE.CollisionResolver.resolveParticleParticle(d,e,f,o);return true},testCirclevsCircle:function(e,c){var g=this.testIntervals(e.getIntervalX(),c.getIntervalX());if(g==0){return false}var f=this.testIntervals(e.getIntervalY(),c.getIntervalY());if(f==0){return false}var d=e.samp.minus(c.samp),h=d.magnitude(),j=e.getRadius()+c.getRadius()-h;if(j>0){d.divEquals(h);JPE.CollisionResolver.resolveParticleParticle(e,c,d,j);return true}return false},testIntervals:function(f,e){if(f.max<e.min){return 0}if(e.max<f.min){return 0}var d=e.max-f.min,c=e.min-f.max;return(Math.abs(d)<Math.abs(c))?d:c},closestVertexOnOBB:function(g,e){var j=g.minus(e.samp),f=new a(e.samp.x,e.samp.y),c=0;for(;c<2;c++){var h=j.dot(e.getAxes()[c]);if(h>=0){h=e.getExtents()[c]}else{if(h<0){h=-e.getExtents()[c]}}f.plusEquals(e.getAxes()[c].mult(h))}return f}}});JPE.declare("AbstractCollection",{isParented:false,constructor:function(){this.particles=[];this.constraints=[];this.createShape()},initSelf:function(){var e=this.particles,d=this.constraints,c=e.length,a=d.length,b;for(b=0;b<c;b++){e[b].initSelf()}for(b=0;b<a;b++){d[b].initSelf()}JPE.Engine.container.addChild(this.getSprite())},addParticle:function(a){this.particles.push(a);if(this.isParented){a.initSelf()}},removeParticle:function(b){var a=this.particles.indexOf(b);if(a==-1){return}this.particles.splice(a,1);b.cleanup()},addConstraint:function(a){this.constraints.push(a);a.isParented=true;if(this.isParented){a.initSelf()}},removeConstraint:function(b){var a=this.constraints.indexOf(b);if(a===-1){return}this.constraints.splice(a,1);b.cleanup()},paint:function(){var g=this.particles,e=this.constraints,d=g.length,a=e.length,f,h,b;for(b=0;b<d;b++){f=g[b];if((!f.getFixed())||f.getAlwaysRepaint()){f.paint()}}for(b=0;b<a;b++){h=e[b];if((!h.getFixed())||h.getAlwaysRepaint()){h.paint()}}},getSprite:function(){if(this._sprite==null){this._sprite=new Container()}return this._sprite},createShape:function(){if(this.shape!=null){this.getSprite().removeChild(this.shape)}this.shape=new Shape();this.drawShape();this.getSprite().addChild(this.shape)},drawShape:function(){},getAll:function(){return this.particles.concat(this.constraints)},cleanup:function(){var e=this.particles,d=this.constraints,c=e.length,a=d.length,b;for(b=0;b<c;b++){e[b].cleanup()}for(b=0;b<a;b++){d[b].cleanup()}JPE.Engine.container.removeChild(this.getSprite())},integrate:function(a){var d=this.particles,c=d.length,b=0;for(;b<c;b++){d[b].update(a)}},satisfyConstraints:function(){var c=this.constraints,a=c.length,b=0;for(;b<a;b++){c[b].resolve()}},checkInternalCollisions:function(){var d=JPE.CollisionDetector,a=this.particles,m=this.constraints,f=a.length,q=m.length,b,o,n,h,g,e;for(h=0;h<f;h++){b=a[h];if(!b.getCollidable()){continue}for(g=h+1;g<f;g++){o=a[g];if(o.getCollidable()){d.test(b,o)}}for(e=0;e<q;e++){n=m[e];if(n.getCollidable()&&!n.isConnectedTo(b)){n.scp.updatePosition();d.test(b,n.scp)}}}},checkCollisionsVsCollection:function(z){var g=JPE.CollisionDetector,q=this.particles,y=z.particles,e=z.constraints,w=q.length,a=y.length,m=e.length,h,b,x,v,t,r;for(v=0;v<w;v++){h=q[v];if(!h.getCollidable()){continue}for(t=0;t<a;t++){b=y[t];if(b.getCollidable()){g.test(h,b)}}for(r=0;r<m;r++){x=e[r];if(x.getCollidable()&&!x.isConnectedTo(h)){x.scp.updatePosition();g.test(h,x.scp)}}}var d=this.constraints,f=d.length;for(t=0;t<f;t++){var u=d[t];if(!u.getCollidable()){continue}for(var o=0;o<a;o++){h=y[o];if(h.getCollidable()&&!u.isConnectedTo(h)){u.scp.updatePosition();g.test(h,u.scp)}}}}});JPE.declare("AbstractParticle",{superclass:JPE.AbstractItem,constructor:function(b,g,f,c,e,d){JPE.AbstractParticle.superclass.prototype.constructor.apply(this,null);this.interval=new JPE.Interval(0,0);var a=JPE.Vector;this.curr=new a(b,g);this.prev=new a(b,g);this.samp=new a();this.temp=new a();this.forces=new a();this.collision=new JPE.Collision(new a(),new a());this._fixed=f;this._collidable=true;this.setMass(c);this._elasticity=e;this._friction=d;this._center=new a();this._multisample=0;this.createShape();this.setStyle()},getElasticity:function(){return this._elasticity},setElasticity:function(a){return this._elasticity=a},getMultisample:function(){return this._multisample},setMultisample:function(a){return this._multisample=a},getCollidable:function(){return this._collidable},setCollidable:function(a){this._collidable=a},getFixed:function(){return this._fixed},setFixed:function(a){this._fixed=a},getMass:function(){return this._mass},setMass:function(a){if(a<=0){throw new Error("mass may not be set <= 0")}this._mass=a;this._invMass=1/this._mass},getCenter:function(){this._center.setTo(this.getPx(),this.getPy());return this._center},getFriction:function(){return this._friction},setFriction:function(a){if(a<0||a>1){throw new Error("Legal friction must be >= 0 and <=1")}this._friction=a},getPosition:function(){return new JPE.Vector(this.curr.x,this.curr.y)},setPosition:function(a){this.curr.copy(a);this.prev.copy(a)},getPx:function(){return this.curr.x},setPx:function(a){this.curr.x=a;this.prev.x=a},getPy:function(){return this.curr.y},setPy:function(a){this.curr.y=a;this.prev.y=a},getVelocity:function(){return this.curr.minus(this.prev)},setVelocity:function(a){this.prev=this.curr.minus(a)},initSelf:function(){this.cleanup();JPE.Engine.container.addChild(this.getSprite());if(this.displayObject!=null){this.initDisplay()}else{this.paint()}},cleanup:function(){JPE.Engine.container.removeChild(this.getSprite())},setDisplay:function(c,a,e,b){this.displayObject=c;this.displayObjectRotation=b||0;this.displayObjectOffset=new JEP.Vector(a,e)},initDisplay:function(){this.displayObject.x=displayObjectOffset.x;this.displayObject.y=displayObjectOffset.y;this.displayObject.rotation=displayObjectRotation;this.getSprite().addChild(this.displayObject)},addForce:function(a){this.forces.plusEquals(a.mult(this.getInvMass()))},addMasslessForce:function(a){this.forces.plusEquals(a)},update:function(a){if(this.getFixed()){return}this.addForce(JPE.Engine.force);this.addMasslessForce(JPE.Engine.masslessForce);this.temp.copy(this.curr);var b=this.getVelocity().plus(this.forces.multEquals(a));this.curr.plusEquals(b.multEquals(JPE.Engine.damping));this.prev.copy(this.temp);this.forces.setTo(0,0)},getComponents:function(a){var b=this.getVelocity();var c=a.dot(b);this.collision.vn=a.mult(c);this.collision.vt=b.minus(this.collision.vn);return this.collision},resolveCollision:function(a,b){this.curr.plusEquals(a);this.setVelocity(b)},getInvMass:function(){return(this.getFixed())?0:this._invMass}});JPE.declare("Group",{superclass:JPE.AbstractCollection,constructor:function(a){JPE.Group.superclass.prototype.constructor.call(this);this.composites=[];this.collisionList=[];this.collideInternal=a},initSelf:function(){JPE.Group.superclass.prototype.initSelf.apply(this,arguments);for(var b=0,a=this.composites.length;b<a;b++){this.composites[b].initSelf()}},addComposite:function(a){this.composites.push(a);a.isParented=true;if(this.isParented){a.initSelf()}},removeComposite:function(b){var a=this.composites.indexOf(b);if(a===-1){return}this.composites.splice(a,1);b.isParented=false;b.cleanup()},paint:function(){JPE.Group.superclass.prototype.paint.apply(this,arguments);var d=this.composites,b=0,e,a=this.composites.length;for(;b<a;b++){e=d[b];e.paint()}},addCollidable:function(a){this.collisionList.push(a)},removeCollidable:function(a){var b=this.collisionList.indexOf(a);if(b==-1){return}this.collisionList.splice(b,1)},addCollidableList:function(d){var c=0,b=d.length,a=this.collisionList;for(;c<b;c++){a.push(d[c])}},getAll:function(){return this.particles.concat(this.constraints).concat(this.composites)},cleanup:function(){JPE.Group.superclass.prototype.cleanup.apply(this,arguments);var c=this.composites,a=c.length,b=0;for(;b<a;b++){c[b].cleanup()}},integrate:function(b){JPE.Group.superclass.prototype.integrate.apply(this,arguments);var d=this.composites,a=d.length,c=0;for(;c<a;c++){d[c].integrate(b)}},satisfyConstraints:function(){JPE.Group.superclass.prototype.satisfyConstraints.apply(this,null);var c=this.composites,a=c.length,b=0;for(;b<a;b++){c[b].satisfyConstraints()}},checkCollisions:function(){if(this.collideInternal){this.checkCollisionGroupInternal()}var a=this.collisionList,c=a.length,b=0;for(;b<c;b++){this.checkCollisionVsGroup(a[b])}},checkCollisionGroupInternal:function(){this.checkInternalCollisions();var f=this.composites,g,e,a=f.length,d=0,b;for(;d<a;d++){g=f[d];g.checkCollisionsVsCollection(this);for(b=d+1;b<a;b++){e=f[b];g.checkCollisionsVsCollection(e)}}},checkCollisionVsGroup:function(h){this.checkCollisionsVsCollection(h);var f=this.composites,m,k,a=f.length,b=h.composites.length,e=0,d;for(;e<a;e++){m=f[e];m.checkCollisionsVsCollection(h);for(d=0;d<b;d++){k=h.composites[d];m.checkCollisionsVsCollection(k)}}for(d=0;d<b;d++){k=h.composites[d];this.checkCollisionsVsCollection(k)}}});JPE.declare("Composite",{superclass:JPE.AbstractCollection,constructor:function(){JPE.Composite.superclass.prototype.constructor.apply(this);this.delta=new JPE.Vector()},rotateByRadian:function(f,c){var g,e=this.particles,b=e.length;for(var d=0;d<b;d++){g=e[d];var a=g.getCenter().distance(c);var h=this.getRelativeAngle(c,g.getCenter())+f;g.setPx(Math.cos(h)*a+c.x);g.setPy(Math.sin(h)*a+c.y)}},rotateByAngle:function(c,a){var b=c*JPE.MathUtil.PI_OVER_ONE_EIGHTY;this.rotateByRadian(b,a)},getFixed:function(){for(var b=0,a=this.particles.length;b<a;b++){if(!particles[b].getFixed()){return false}}return true},setFixed:function(a){for(var d=0,c=this.particles.length;d<c;d++){this.particles[d].setFixed(a)}},getRelativeAngle:function(a,b){this.delta.setTo(b.x-a.x,b.y-a.y);return Math.atan2(this.delta.y,this.delta.x)}});JPE.declare("CircleParticle",{superclass:JPE.AbstractParticle,constructor:function(b,g,a,d,c,f,e){c=c||1;f=f||0.3;e=e||0;this._radius=a;JPE.CircleParticle.superclass.prototype.constructor.call(this,b,g,d,c,f,e)},getRadius:function(){return this._radius},setRadius:function(a){this._radius=a},paint:function(){var b=this.getSprite();var a=this.curr.x,c=this.curr.y;b.x=a;b.y=c},drawShape:function(){var b=this.getRadius(),a=this.shape.graphics;a.clear();if(this.lineThickness){a.setStrokeStyle(this.lineThickness);a.beginStroke(Graphics.getRGB(this.lineColor,this.lineAlpha))}a.beginFill(Graphics.getRGB(this.fillColor,this.fillAlpha));a.drawCircle(0,0,b);a.endFill()},getProjection:function(a){var b=this.samp.dot(a);this.interval.min=b-this._radius;this.interval.max=b+this._radius;return this.interval},getIntervalX:function(){this.interval.min=this.curr.x-this._radius;this.interval.max=this.curr.x+this._radius;return this.interval},getIntervalY:function(){this.interval.min=this.curr.y-this._radius;this.interval.max=this.curr.y+this._radius;return this.interval}});JPE.declare("RectangleParticle",{superclass:JPE.AbstractParticle,constructor:function(f,e,a,g,h,c,d,j,b){h=h||0;d=d||1;j=j||0.3;b=b||0;this._extents=[a/2,g/2];this._axes=[new JPE.Vector(0,0),new JPE.Vector(0,0)];this.setRadian(h);JPE.RectangleParticle.superclass.prototype.constructor.call(this,f,e,c,d,j,b)},getRadian:function(){return this._radian},setRadian:function(a){this._radian=a;this.setAxes(a)},getAngle:function(){return this.getRadian()*JPE.MathUtil.ONE_EIGHTY_OVER_PI},setAngle:function(b){this.setRadian(b*JPE.MathUtil.PI_OVER_ONE_EIGHTY)},paint:function(){var c=this.getSprite(),a=this.curr.x,f=this.curr.y,b=this.getExtents()[0]*2,d=this.getExtents()[1]*2,e=this.getAngle();c.rotation=e;c.x=a;c.y=f},drawShape:function(){var c=this.shape.graphics,a=this.getExtents()[0]*2,b=this.getExtents()[1]*2;this.shape.x=-a/2;this.shape.y=-b/2;c.clear();if(this.lineThickness){c.setStrokeStyle(this.lineThickness);c.beginStroke(Graphics.getRGB(this.lineColor,this.lineAlpha))}c.beginFill(Graphics.getRGB(this.fillColor,this.fillAlpha));c.drawRect(0,0,a,b);c.endFill()},setWidth:function(a){this._extents[0]=a/2},getWidth:function(){return this._extents[0]*2},setHeight:function(a){this._extents[1]=a/2},getHeight:function(){return this._extents[1]*2},getExtents:function(){return this._extents},getProjection:function(b){var e=this.getAxes(),d=this.getExtents(),a=d[0]*Math.abs(b.dot(e[0]))+d[1]*Math.abs(b.dot(e[1]));var f=this.samp.dot(b);this.interval.min=f-a;this.interval.max=f+a;return this.interval},getAxes:function(){return this._axes},setAxes:function(a){var b=Math.sin(a),e=Math.cos(a),d=this.getAxes();d[0].x=e;d[0].y=b;d[1].x=-b;d[1].y=e}});JPE.declare("RimParticle",{constructor:function(b,a){this.sp=0;this.av=0;this.wr=b;this.maxTorque=a;this.curr=new JPE.Vector(b,0);this.prev=new JPE.Vector(0,0)},getSpeed:function(){return this.sp},setSpeed:function(a){this.sp=a},getAngularVelocity:function(){return this.av},setAngularVelocity:function(a){this.av=a},update:function(b){this.sp=Math.max(-this.maxTorque,Math.min(this.maxTorque,this.sp+this.av));var k=-this.curr.y;var j=this.curr.x;var d=Math.sqrt(k*k+j*j);k/=d;j/=d;this.curr.x+=this.sp*k;this.curr.y+=this.sp*j;var c=this.prev.x;var a=this.prev.y;var h=this.prev.x=this.curr.x;var f=this.prev.y=this.curr.y;this.curr.x+=JPE.Engine.damping*(h-c);this.curr.y+=JPE.Engine.damping*(f-a);var e=Math.sqrt(this.curr.x*this.curr.x+this.curr.y*this.curr.y);var g=(e-this.wr)/e;this.curr.x-=this.curr.x*g;this.curr.y-=this.curr.y*g}});JPE.declare("WheelParticle",{superclass:JPE.CircleParticle,constructor:function(b,h,a,d,c,f,e,g){g=g||1;c=c||1;f=f||0.3;e=e||0;this.lineThickness=1;JPE.WheelParticle.superclass.prototype.constructor.apply(this,arguments);this.tan=new JPE.Vector(0,0);this.normSlip=new JPE.Vector(0,0);this.rp=new JPE.RimParticle(a,2);this.orientation=new JPE.Vector();this.setTraction(g)},getSpeed:function(){return this.rp.getSpeed()},setSpeed:function(a){this.rp.setSpeed(a)},getAngularVelocity:function(){return this.rp.getAngularVelocity()},setAngularVelocity:function(a){this.rp.setAngularVelocity(a)},getTraction:function(){return 1-this._traction},setTraction:function(a){this._traction=1-a},paint:function(){var b=this.getSprite();var a=this.curr.x,d=this.curr.y,c=this.getAngle();b.rotation=c;b.x=a;b.y=d;this.drawShape()},drawShape:function(){var b=this.shape.graphics,a=this.getRadius();b.clear();if(this.lineThickness){b.setStrokeStyle(this.lineThickness);b.beginStroke(Graphics.getRGB(this.lineColor,this.lineAlpha))}b.beginFill(Graphics.getRGB(this.fillColor,this.fillAlpha));b.drawCircle(0,0,a);b.setStrokeStyle(1);b.beginStroke(Graphics.getRGB(16777215-this.lineColor));b.moveTo(-a,0);b.lineTo(a,0);b.moveTo(0,-a);b.lineTo(0,a);b.endFill()},update:function(a){JPE.WheelParticle.superclass.prototype.update.call(this,a);this.rp.update(a)},getRadian:function(){this.orientation.setTo(this.rp.curr.x,this.rp.curr.y);return Math.atan2(this.orientation.y,this.orientation.x)+Math.PI},getAngle:function(){return this.getRadian()*JPE.MathUtil.ONE_EIGHTY_OVER_PI},resolveCollision:function(a,b,g,f,e,c){JPE.WheelParticle.superclass.prototype.resolveCollision.apply(this,arguments);this.resolve(g.mult(JPE.MathUtil.sign(f*e)))},resolve:function(g){var d=this.rp,c=this.tan;c.setTo(-d.curr.y,d.curr.x);c=c.normalize();var f=c.mult(d.getSpeed());var b=this.getVelocity().plusEquals(f);var e=b.cross(g);c.multEquals(e);d.prev.copy(d.curr.minus(c));var a=(1-this._traction)*d.getSpeed();this.normSlip.setTo(a*g.y,a*g.x);this.curr.plusEquals(this.normSlip);d.setSpeed(d.getSpeed()*this._traction)}});JPE.declare("AbstractConstraint",{superclass:JPE.AbstractItem,constructor:function(a){this.stiffness=a;this.setStyle()},resolve:function(){}});JPE.declare("SpringConstraint",{superclass:JPE.AbstractConstraint,constructor:function(f,e,b,a,c,g,d){b=b||0.5;c=c||1;g=g||1;JPE.SpringConstraint.superclass.prototype.constructor.call(this,b);this.p1=f;this.p2=e;this.checkParticlesLocation();this._restLength=this.getCurrLength();this.setCollidable(a,c,g,d)},getRadian:function(){var a=this.getDelta();return Math.atan2(a.y,a.x)},getAngle:function(){return this.getRadian()*JPE.MathUtil.ONE_EIGHTY_OVER_PI},getCenter:function(){return(this.p1.curr.plus(this.p2.curr)).divEquals(2)},setRectScale:function(a){if(this.scp==null){return}this.scp.setRectScale(a)},getRectScale:function(){return this.scp.getRectScale()},getCurrLength:function(){return this.p1.curr.distance(this.p2.curr)},getRectHeight:function(){return this.scp.getRectHeight()},setRectHeight:function(a){if(this.scp==null){return}this.scp.setRectHeight(a)},getRestLength:function(){return this._restLength},setRestLength:function(a){if(a<=0){throw new Error("restLength must be greater than 0")}this._restLength=a},getFixedEndLimit:function(){return this.scp.getFixedEndLimit()},setFixedEndLimit:function(a){if(this.scp==null){return}this.scp.setFixedEndLimit(a)},getCollidable:function(){return this._collidable},setCollidable:function(a,c,e,d){this._collidable=a;this.scp=null;if(this._collidable){this.scp=new JPE.SpringConstraintParticle(this.p1,this.p2,this,c,e,d)}},isConnectedTo:function(a){return(a==this.p1||a==this.p2)},getFixed:function(){return this.p1.getFixed()&&this.p2.getFixed()},initSelf:function(){this.cleanup();JPE.Engine.container.addChild(this.getSprite());if(this.getCollidable()){this.scp.initSelf()}else{if(this.displayObject){this.initDisplay()}}this.paint()},paint:function(){if(this.getCollidable()){this.scp.paint()}else{if(!this.shape){this.shape=new Shape();this.getSprite().addChild(this.shape)}var a=this.shape.graphics,c=this.p1,b=this.p2;a.clear();if(this.lineThickness){a.setStrokeStyle(this.lineThickness);a.beginStroke(Graphics.getRGB(this.lineColor,this.lineAlpha))}a.moveTo(c.getPx(),c.getPy());a.lineTo(b.getPx(),b.getPy());a.endFill()}},getDelta:function(){return this.p1.curr.minus(this.p2.curr)},resolve:function(){var e=this.p1,d=this.p2;if(e.getFixed()&&d.getFixed()){return}var a=this.getCurrLength();var c=(a-this.getRestLength())/(a*(e.getInvMass()+d.getInvMass()));var b=this.getDelta().mult(c*this.stiffness);this.p1.curr.minusEquals(b.mult(e.getInvMass()));this.p2.curr.plusEquals(b.mult(d.getInvMass()))},checkParticlesLocation:function(){if(this.p1.curr.x==this.p2.curr.x&&this.p1.curr.y==this.p2.curr.y){this.p2.curr.x+=0.0001}}});JPE.declare("SpringConstraintParticle",{superclass:JPE.RectangleParticle,constructor:function(e,d,c,a,f,b){this.p1=e;this.p2=d;this.lambda=new JPE.Vector(0,0);this.avgVelocity=new JPE.Vector(0,0);this.parent=c;JPE.SpringConstraintParticle.superclass.prototype.constructor.call(this,0,0,0,0,0,false);this._rectScale=f;this._rectHeight=a;this.scaleToLength=b;this._fixedEndLimit=0;this.rca=new JPE.Vector();this.rcb=new JPE.Vector()},setRectScale:function(a){this._rectScale=a},getRectScale:function(){return this._rectScale},setRectHeight:function(a){this._rectHeight=a},getRectHeight:function(){return this._rectHeight},setFixedEndLimit:function(a){this._fixedEndLimit=a},getFixedEndLimit:function(){return this._fixedEndLimit},getMass:function(){return(this.p1.getMass()+this.p2.getMass())/2},getElasticity:function(){return(this.p1.getElasticity()+this.p2.getElasticity())/2},getFriction:function(){return(this.p1.getFriction()+this.p2.getFriction())/2},getVelocity:function(){var a=this.p1.getVelocity();var b=this.p2.getVelocity();this.avgVelocity.setTo(((a.x+b.x)/2),((a.y+b.y)/2));return this.avgVelocity},initSelf:function(){var a=this.getSprite();var b=this.parent;b.getSprite().addChild(a);if(this.displayObject!=null){this.initDisplay()}else{this.drawShape()}this.paint()},paint:function(){var d=this.parent,e=d.getCenter(),b=this.getSprite(),a=this.shape;b.x=e.x;b.y=e.y;if(this.scaleToLength){b.width=d.getCurrLength()*this.getRectScale()}else{if(this.displayObject!=null){b.width=d.getRestLength()*this.getRectScale()}}this.drawShape();b.rotation=d.getAngle()},drawShape:function(){var e=this.shape.graphics,d=this.parent,f=d.getCenter(),a=d.getCurrLength()*this.getRectScale(),b=this.getRectHeight();e.clear();if(d.lineThickness){e.setStrokeStyle(d.lineThickness);e.beginStroke(Graphics.getRGB(d.lineColor,d.lineAlpha))}e.beginFill(Graphics.getRGB(d.fillColor,d.fillAlpha));e.drawRect(-a/2,-b/2,a,b);e.endFill()},getInvMass:function(){if(this.p1.getFixed()&&this.p2.getFixed()){return 0}return 1/((this.p1.getMass()+this.p2.getMass())/2)},updatePosition:function(){var a=this.parent.getCenter();this.curr.setTo(a.x,a.y);this.setWidth((this.scaleToLength)?this.parent.getCurrLength()*this._rectScale:this.parent.getRestLength()*this._rectScale);this.setHeight(this.getRectHeight());this.setRadian(this.parent.getRadian())},resolveCollision:function(w,q,e,m,c,b){var v=this.getContactPointParam(b);var g=(1-v);var f=v;var u=this.p1;var r=this.p2;var k=this.getFixedEndLimit();var j=this.lambda;if(u.getFixed()){if(f<=k){return}j.setTo(w.x/f,w.y/f);r.curr.plusEquals(j);r.setVelocity(q)}else{if(r.getFixed()){if(g<=k){return}j.setTo(w.x/g,w.y/g);u.curr.plusEquals(j);u.setVelocity(q)}else{var h=(g*g+f*f);if(h==0){return}j.setTo(w.x/h,w.y/h);u.curr.plusEquals(j.mult(g));r.curr.plusEquals(j.mult(f));if(v==0.5){u.setVelocity(q);r.setVelocity(q)}else{var a=(v<0.5)?u:r;a.setVelocity(q)}}}},closestParamPoint:function(d){var b=this.p2.curr.minus(this.p1.curr);var a=(b.dot(d.minus(this.p1.curr)))/(b.dot(b));return JPE.MathUtil.clamp(a,0,1)},getContactPointParam:function(f){var c;if(f instanceof JPE.CircleParticle){c=this.closestParamPoint(f.curr)}else{if(f instanceof JPE.RectangleParticle){var e;var a=new Array(4);var h=Number.POSITIVE_INFINITY;for(var b=0;b<4;b++){this.setCorners(f,b);var g=this.closestPtSegmentSegment();if(g<h){h=g;e=b;a[b]=s}}c=a[e]}}return c},setCorners:function(a,h){var e=a.curr.x;var c=a.curr.y;var m=a.getAxes();var q=a.getExtents();var g=m[0].x*q[0];var f=m[0].y*q[0];var k=m[1].x*q[1];var j=m[1].y*q[1];var t=g-k;var p=f-j;var o=g+k;var n=f+j;var d=this.rca;var b=this.rcb;if(h==0){d.x=e-o;d.y=c-n;b.x=e+t;b.y=c+p}else{if(h==1){d.x=e+t;d.y=c+p;b.x=e+o;b.y=c+n}else{if(h==2){d.x=e+o;d.y=c+n;b.x=e-t;b.y=c-p}else{if(h==3){d.x=e-t;d.y=c-p;b.x=e-o;b.y=c-n}}}}},closestPtSegmentSegment:function(){var k=this.p1.curr,z=this.p2.curr,j=this.rca,y=this.rcb,h=z.minus(k),d=y.minus(j),g=k.minus(j),A,x=h.dot(h),q=d.dot(d),p=d.dot(g),v=h.dot(g),w=h.dot(d),o=x*q-w*w;if(o!=0){s=JPE.MathUtil.clamp((w*p-v*q)/o,0,1)}else{s=0.5}A=(w*s+p)/q;if(A<0){A=0;s=JPE.MathUtil.clamp(-v/x,0,1)}else{if(A>0){A=1;s=JPE.MathUtil.clamp((w-v)/x,0,1)}}var n=k.plus(h.mult(s));var m=j.plus(d.mult(A));var u=n.minus(m);return u.dot(u)}});