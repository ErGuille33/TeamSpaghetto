'use strict';

var Character = require('./character.js');

//State : True = open, false = close
//Metallic : True=metallic , false = not metallic

function Door(x, y, state, metallic, room, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.state = state;
    this.type = metallic;
    this.room = room;

}
Door.prototype = Object.create(Character.prototype);
Door.prototype.constructor = Door;

Door.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
}
Door.prototype.open = function () {
    this.state = true;
    this.body.destroy();
}
module.exports = Door;
