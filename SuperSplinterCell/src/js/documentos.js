'use strict';
var Character = require('./character.js');

function documentos(game, x, y, sprite, w, h)
{
    Character.call(this,game,x,y,sprite);
    this.scale.setTo(w,h);

} 

documentos.prototype = Object.create(Character.prototype);
documentos.prototype.constructor = documentos;

documentos.prototype.ini = function () {
    this.game.add.existing(this);
    this.animations.add('shine',[0,1],2,true);
    this.animations.play('shine');
   // this.game.physics.arcade.enable(this);
    
}

module.exports = documentos;