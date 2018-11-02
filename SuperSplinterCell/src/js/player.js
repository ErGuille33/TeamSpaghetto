'use strict';
var Character = require('./character.js')
function Player(x, y, key, doc, lp, t, c, g, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.isMoving = false;
    this.position.x = x;
    this.position.y = y;
    this.magneticKey = key;
    this.documents = doc;
    this.items = {
        lockPick: lp, taser: t, cable: c, gun: g
    };
}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.enable(Player, Phaser.Physics.ARCADE);
    this.animations.add('idle', [0, 1], 1, true);
    this.animations.add('run', [3, 4, 5, 6, 7, 8], 7, true);
    this.xDestine = this.x;
    this.yDestine = this.y;
}
Player.prototype.moveCharacter = function () {

    if(this.game.input.mousePointer.isDown){
        this.xDestine = this.game.input.x;
        this.yDestine = this.game.input.y;
        var alpha = Math.atan( (this.yDestine - this.y)/( this.xDestine- this.x));
        this.x = 1*this.game.time.physicsElapsed * Math.cos(alpha);
        this.y = 1*this.game.time.physicsElapsed * Math.sin(alpha);
    }

}
Player.prototype.update = function () {
    this.moveCharacter();
}
module.exports = Player;