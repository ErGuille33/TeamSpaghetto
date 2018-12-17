'use strict';

var Character = require('./character.js')
var Player = require('./player.js')
var Hand = require('./VisionCone.js');

function Enemy(x, y, KO, Look, posiciones, speed, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.ko = KO;
    this.look = Look;
    this.sPeed = speed;
    this.positions = posiciones
    this.game = game;
}
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.ini = function () {

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(25, 30, 15, 15);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.auxi = 0;

    this.animations.add('walk', [0, 1, 2, 3], 7, true);
    this.animations.add('shoot', [5, 6, 7, 8], 7, false);
    this.animations.add('dead', [9], 1, false);

    this.coneOfVision = new coneOfVision(this.game, 20, 0, 'aux');
    this.coneOfVision.ini();

    this.addChild(this.coneOfVision);

}

Enemy.prototype.moveEnemy = function () {

    if (!this.ko && !this.look) {
        if (this.x != positions[auxi].x && this.y != positions[auxi].x) {
            this.xDestine = positions[i].x;
            this.yDestine = positions[i].y;
            this.moveToXY(this.Enemy, this.xDestine, this.yDestine, this.speed)
            if (look == false) this.rotation = this.game.physics.arcade.moveToXY(this, this.positions[1].x, this.positions[1].y, this.speed);
            else {
            this.rotation = this.game.physics.arcade.moveToXY(this, Player.x, Player.y, this.speed);
                this.animations.play('walk');
            }
        } else if (auxi < positions.length) {
            auxi++;
        } else auxi = 0;
    } else {
        this.body.velocity.setTo(0, 0);
        this.animations.play('dead');
    }
}

Enemy.prototype.gotHit = function () {
    //if (this.checkOverlap(this.sprite, 'bullet')) this.ko = true;
}

Enemy.prototype.playerDetected = function () {
    if (this.checkOverlap('aux', 'player')) look = true;
}

Enemy.prototype.checkOverlap = function (spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

Enemy.prototype.update = function () {
    this.playerDetected();
    this.gotHit();
    this.moveEnemy();
}

module.exports = Enemy;