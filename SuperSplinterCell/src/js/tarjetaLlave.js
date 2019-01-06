'use strict';
var Character = require('./character.js');

//Tarjeta necesaria para abrir puertas magnéticas

function tarjetaLlave(game, x, y, sprite, w, h) {
    Character.call(this, game, x, y, sprite);
    this.scale.setTo(w, h);

}

tarjetaLlave.prototype = Object.create(Character.prototype);
tarjetaLlave.prototype.constructor = tarjetaLlave;

tarjetaLlave.prototype.ini = function () {
    this.game.add.existing(this);
    this.animations.add('shine', [0, 1], 2, true);
    this.animations.play('shine');
    // this.game.physics.arcade.enable(this);

}

module.exports = tarjetaLlave;