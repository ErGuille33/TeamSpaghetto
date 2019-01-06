'use strict';
var Character = require('./character.js');
//Sprites invisibles para ejecutar acciones 
function triggerSprite(game, x, y, sprite, w, h, a) {
    Character.call(this, game, x, y, sprite);
    this.scale.setTo(w, h);
    this.able = a;
}

triggerSprite.prototype = Object.create(Character.prototype);
triggerSprite.prototype.constructor = triggerSprite;

triggerSprite.prototype.disable = function () {
    this.able = false;
}
triggerSprite.prototype.enable = function () {
    this.able = true;
}
triggerSprite.prototype.able = function () {
    return this.able;
}

triggerSprite.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.alpha = 0;
}

module.exports = triggerSprite;