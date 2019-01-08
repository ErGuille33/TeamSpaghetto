'use strict';
//Pantalla entre el nivel 1 y 2
var interLevel = {
    create: function () {
        var beep;
        var fondo = this.game.add.image(0, 0, 'interLvl');
        function start() {
            beep.play();
            this.game.state.start('lvl2_1');
        };
        function returntoMain() {
            beep.play();
            this.game.state.start('menu');
        };

        this.continue = this.game.add.button(125, 350, 'return', returntoMain);
        this.continue.scale.setTo(1, 1);

        this.nxt = this.game.add.button(475, 350, 'nextLvl', start);
        this.nxt.scale.setTo(1, 1);

        beep = this.game.add.audio('beep');
    },
    update: function () {
        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(1.1, 1.1);
        }
        else this.continue.scale.setTo(1, 1);

        if (Phaser.Rectangle.containsPoint(this.nxt, this.game.input.mousePointer)) {
            this.nxt.scale.setTo(1.1, 1.1);
        }
        else this.nxt.scale.setTo(1, 1);
    }
}
module.exports = interLevel;