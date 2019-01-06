'use strict';
var beep;
//Tutorial
var tuto = {
    create: function () {
        var fondo = this.game.add.image(0, 0, 'inicial');
        function start() {
            beep.play();
            this.game.state.start('play');
        };

        this.continue = this.game.add.button(685, 510, 'press', start);
        this.continue.scale.setTo(.1, .1);

        beep = this.game.add.audio('beep');
    },
    update: function () {
        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(.11, .11);
        }
        else this.continue.scale.setTo(.1, .1);
    }
}
module.exports = tuto;