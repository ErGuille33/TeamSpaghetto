'use strict';

//var MoveAndStopPlugin = require('phaser-move-and-stop-plugin');
var pointX;
var pointY;
var Character = require('./character.js')
function Player(x, y, key, doc, lp, t, c, g, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.isMoving = false;
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
    this.game.physics.arcade.enable(this);
    this.animations.add('idle', [0, 1], 1, true);
    this.animations.add('run', [3, 4, 5, 6, 7, 8], 7, true);
    this.xDestine = this.x;
    this.yDestine = this.y;
}
Player.prototype.moveCharacter = function () {

    if (this.game.input.mousePointer.isDown) {
        this.game.moveAndStop.toXY(this, this.game.input.mousePointer.x, this.game.input.mousePointer.y, 5);
    }
    else if (this.x == pointX && this.y == pointY){
        this.body.velocity.setTo(0,0);
    
    }
    

}
Player.prototype.update = function () {
    this.moveCharacter();
}
module.exports = Player;