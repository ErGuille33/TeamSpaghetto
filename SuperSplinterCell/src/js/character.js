'use strict';

function Character(game, x, y, sprite) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5, 0.5);
    game.debug.body(this);
}
Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;
module.exports = Character;
