'use strict';
var music;
var beep;
var mainMenu = {
    create: function () {
        var fondo = this.game.add.image(0, 0, 'mainMenu');
        function start() {
            music.stop();
            beep.play();
            this.game.state.start('tuto');
        };
        function lvlmen() {
            music.stop();
            beep.play();
            this.game.state.start('lvlSel');
        }
        this.newGame = this.game.add.button(75, 300, 'aux', start);
        this.newGame.alpha = 0;
        this.lvlSelect = this.game.add.button(500, 300, 'aux', lvlmen);
        this.lvlSelect.alpha = 0;

        music = this.game.add.audio('mainTrack');
        
        beep = this.game.add.audio('beep');

        music.loopFull(.1);
    },
    update: function () {
        
    }
}
module.exports = mainMenu;