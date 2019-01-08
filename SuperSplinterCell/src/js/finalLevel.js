'use strict';

//Pantalla al ganar el juego
var finalLevel = {
    create: function () {
        var beep;
        var win;
        var fondo = this.game.add.image(0, 0, 'interLvl');

        function returntoMain() {
            beep.play();

            win.stop();

            this.game.state.start('menu');
        };

        this.continue = this.game.add.button(300, 350, 'return', returntoMain);
        this.continue.scale.setTo(1, 1);

        beep = this.game.add.audio('beep');
        win = this.game.add.audio('win');
        win.loopFull(.25);

    },
    update: function () {

        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(1.1, 1.1);
        }
        else this.continue.scale.setTo(1, 1);

    }
}
module.exports = finalLevel;