'use strict';

function Character(game, x, y, sprite)
{
    Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5,0.5);
    this.x =x;
    this.y =y;    
}
    Character.prototype = Object.create(Phaser.Sprite.prototype);
    Character.prototype.constructor = Character;

    Character.getPosx = function() {
        return this.position.x;
    }
    Character.getPosY = function(){
        return this.position.y;
    }
module.exports = Character;