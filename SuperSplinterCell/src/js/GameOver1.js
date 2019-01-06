'use strict';
var beep;
//Pantalla de derrota en el segundo nivel 
var gameover2 = {
    create: function () {
        var fondo = this.game.add.image(0, 0, 'perder');
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

        this.nxt = this.game.add.button(475, 350, 'try', start);
        this.nxt.scale.setTo(1, 1);
        var failed = this.game.add.audio('failed');
        failed.play();

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
module.exports = gameover2;