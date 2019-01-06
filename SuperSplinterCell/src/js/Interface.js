'use strict';
var Character = require('./character.js')
var Player = require('./player.js')

var tick;

//El HUD

function Interface(x, y, sprite, game) {
    Character.call(this, game, x, y, sprite);
}

Interface.prototype = Object.create(Character.prototype);
Interface.prototype.constructor = Interface;

Interface.prototype.ini = function () {
    this.animations.add('idle', [0], 1, false);
    this.animations.add('lockpick', [1], 1, false);
    this.animations.add('taser', [2], 1, false);
    this.animations.add('cable', [3], 1, false);
    this.animations.add('gun', [4], 1, false);
    this.animations.add('hand', [5], 1, false);

    this.document = this.game.add.sprite(650, 552, 'documents');
    this.document.scale.setTo(.15, .15);
    this.document.fixedToCamera = true;
    this.document.alpha = 0;
    this.game.add.existing(this.document);

    this.tarjet = this.game.add.sprite(730, 560, 'tarjet');
    this.tarjet.scale.setTo(.075, .075);
    this.tarjet.fixedToCamera = true;
    this.tarjet.alpha = 0;
    this.game.add.existing(this.tarjet);


}
//En el update únicamente comprobaremos cual es el item activo, y ejecutaremos la animación pertinente
Interface.prototype.update = function (doc, key, item) {



    this.hasDoc = doc;
    this.hasMag = key;

    if (item == 4) {
        this.animations.stop();
        this.animations.play('hand');

    }
    else if (item == 5) {
        this.animations.stop();
        this.animations.play('gun');

    }
    else if (item == 2) {
        this.animations.stop();
        this.animations.play('taser');
    }
    else if (item == 1) {
        this.animations.stop();
        this.animations.play('lockpick');
    }
    else if (item == 3) {
        this.animations.stop();
        this.animations.play('cable');
    }

    if (this.hasDoc) {
        this.document.alpha = 1;
    } else if (this.hasDoc != undefined) this.document.alpha = 0;

    if (this.hasMag) {
        this.tarjet.alpha = 1;
    } else if (this.hasMag != undefined) this.tarjet.alpha = 0;

}
module.exports = Interface;
