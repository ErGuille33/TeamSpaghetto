'use strict';

var Character = require('./character.js')
var Player = require('./player.js')
var Hand = require('./VisionCone.js');

//Items : 1 = lockpick | 2 = taser | 3 = cable | 4 = gun  | 5 = hand 
function Enemy(x, y, ko, look, posiciones, numPositions, speed, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.ko = false;
    this.look = false;
    this.game = game;
    this.maxPositions = numPositions;
    this.positions = posiciones;

}
Enemy.prototype = Object.create(Character.prototype);
enemy.prototype.constructor = Enemy;

Enemy.prototype.ini = function () {

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(25, 30, 15, 15);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.sPeed = speed;

    for (var i = 0; i < this.maxPositions; i++) {
        this.positions.push({ x:  , y: p});
    }

    this.coneOfVision = new coneOfVision(this.game, 20, 0, 'aux');
    this.coneOfVision.ini();

    this.addChild(this.coneOfVision);

}

Enemy.prototype.moveEnemy = function () {

    if (!this.ko) {
        //this.xDestine = ;
        //this.yDestine = nextDestination.;
        this.moveToXY(this.Enemy, this.xDestine,this.yDestine, this.speed)
        if (look == false) this.rotation = this.game.physics.arcade.moveToXY(this, this.positions[1].x, this.positions[1].y, speed);
        else this.rotation = this.game.physics.arcade.moveToXY(this, Player.x, Player.y, speed);
        //console.log(this.xDestine );
        this.animations.play('walk');
    }
}



Enemy.prototype.gotHit = function () {
    if (this.checkOverlap(this.sprite, 'bullet')) this.ko = true;
}

Enemy.prototype.playerDetected = function(){
    if (this.checkOverlap('aux','player')) look = true;
}

Enemy.prototype.checkOverlap = function (spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

