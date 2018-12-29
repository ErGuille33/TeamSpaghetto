'use strict';
var Character = require('./character.js');

function coneOfVision(game, x, y, sprite) {
    Character.call(this, game, x, y, sprite);
}
coneOfVision.prototype = Object.create(Character.prototype);
coneOfVision.prototype.constructor = coneOfVision;

coneOfVision.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.setSize(1,1);
    this.angle = -90;
    this.scale.setTo(.75, .75);
    this.alpha = .1;
}

module.exports = coneOfVision;