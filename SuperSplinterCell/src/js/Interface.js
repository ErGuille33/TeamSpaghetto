'use strict';
var Character = require('./character.js')
var Player = require('./player.js')


function Interface(x, y, sprite, game) {
    Character.call(this, game, x, y, sprite);
}

Interface.prototype = Object.create(Character.prototype);
Interface.prototype.constructor = Interface;

Interface.prototype.ini = function (doc, key) {
    this.animations.add('idle', [0], 1, false);
    this.animations.add('lockpick', [1], 1, false);
    this.animations.add('taser', [2], 1, false);
    this.animations.add('cable', [3], 1, false);
    this.animations.add('gun', [4], 1, false);
    this.animations.add('hand', [5], 1, false);

    this.eKey = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
    this.rKey = this.game.input.keyboard.addKey(Phaser.KeyCode.R);

    this.document = this.game.add.sprite(650,552,'documents');
    this.document.scale.setTo(.15,.15);
    this.document.fixedToCamera = true;
    this.document.alpha = 0;
    this.game.add.existing(this.document);

    this.tarjet = this.game.add.sprite(730, 560, 'tarjet');
    this.tarjet.scale.setTo(.075,.075);
    this.tarjet.fixedToCamera = true;
    this.tarjet.alpha = 0;
    this.game.add.existing(this.tarjet);

    this.hasDoc = doc;
    this.hasMag = key;
}

Interface.prototype.update = function () {

    if (this.eKey.justDown) {
        this.animations.stop();
        this.animations.play('hand');
        Console.log('estoy dentro1')
    }
    else if (this.rKey.justDown) {
        this.animations.stop();
        this.animations.play('gun');
        Console.log('estoy dentro2')
    }

    if (this.hasDoc){
        this.document.alpha = 1;
    }else this.document.alpha = 0;

    if (this.hasMag){
        this.tarjet.alpha = 1;
    }else this.tarjet.alpha = 0;

}
module.exports = Interface;
