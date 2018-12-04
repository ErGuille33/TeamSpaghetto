'use strict';
var Character = require('./character.js');

function Hand(game, x, y, sprite)
{
    Character.call(this,game,x,y,sprite);
}

Hand.prototype = Object.create(Character.prototype);
Hand.prototype.constructor = Hand;

Hand.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.scale.setTo(.1,.2);
    this.alpha = .2;
}
module.exports = Hand;