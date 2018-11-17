'use strict';

var Character = require('./character.js')

function Player(x, y, key, doc, lp, t, c, g,h, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.isMoving = false;
    this.position.x = x; 
    this.position.y = y;
    this.magneticKey = key;
    this.documents = doc;
    this.items = {
        lockPick: lp, taser: t, cable: c, gun: g, hand: h
    };
}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.ini = function () {

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.animations.add('idle', [0], 1, true);
    this.animations.add('walk', [11, 12, 13, 14], 10, true);
    this.animations.add('taser', [0,1,2], 10, false)
    this.animations.add('gun', [22,23,24,25], 10, false)
    this.animations.add('hand', [3,4,5], 4, false)
    this.animations.add('dead', [31,32], 1, false)
    
    this.xDestine = this.x;
    this.yDestine = this.y;
    this.distance = 0;
    this.speed = 200;
    //weapon

    this.weapon = this.game.add.weapon(5, 'bullet');
    this.weapon.setBulletFrames(0, 60, true);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 300;
    this.weapon.fireRate = 1000;
    this.weapon.trackSprite(this, 0, 0, true);
    this.actionButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
Player.prototype.moveCharacter = function (layer) {
    if (this.game.input.mousePointer.isDown) {
        this.xDestine = this.game.input.x;
        this.yDestine = this.game.input.y;
        this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));
        this.animations.play('walk');
        // this.game.physics.arcade.moveToPointer(this, 100);
        this.rotation = this.game.physics.arcade.moveToXY(this, this.game.input.x, this.game.input.y, this.speed);
    }
    this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));
    if (this.distance <= this.speed / this.game.time.physicsElapsedMS) { // una constante o variable (algo qe sea el incremento de movimiento)
        this.body.velocity.setTo(0, 0);
        this.animations.play('idle');
    }
    if (Phaser.Rectangle.contains(this.body, this.game.input.x, this.game.input.y)) {
        this.body.velocity.setTo(0, 0);
        this.animations.play('idle');
    }
    if (this.game.physics.arcade.collide(this, layer)) {
        this.body.velocity.setTo(0, 0);
        this.animations.play('idle');
    }
}
Player.prototype.recogeInput = function () {
    if (this.actionButton.justDown) {
        this.animations.play('gun');
       this.shoot(); 
    }
}
Player.prototype.shoot = function () {
    this.weapon.fire();

}
Player.prototype.update = function (layer) {
    this.moveCharacter(layer);
    this.recogeInput();
}
module.exports = Player;