'use strict';
var beep;

//Selector de niveles

var lvlSelector = {
    create: function () {
        var fondo = this.game.add.image(0, 0, 'lvlSelector');
        function start() {
            beep.play();
            this.game.state.start('play');
        }
        function lvl2() {
            beep.play();
            this.game.state.start('lvl2_1');
        }
        function back() {
            beep.play();
            this.game.state.start('menu');
        }
        this.lvl1 = this.game.add.button(280, 25, 'aux', start);
        this.lvl1.alpha = 0;
        this.lvl2 = this.game.add.button(280, 325, 'aux', lvl2);
        this.lvl2.alpha = 0;
        this.back = this.game.add.button(30, 15, 'aux', back);
        this.back.scale.setTo(.5, .5);
        this.back.alpha = 0;

        beep = this.game.add.audio('beep');
    },
    update: function () {

    }
}
module.exports = lvlSelector;