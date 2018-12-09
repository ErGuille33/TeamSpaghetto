'use strict';
var mainMenu = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'mainMenu');
       function start (){
        this.game.state.start('play');
       };
       function lvlmen (){
           this.game.state.start('lvlSel');
       }
       this.newGame = this.game.add.button(75,300,'aux',start);
       this.newGame.alpha = 0;
       this.lvlSelect = this.game.add.button(500,300,'aux',lvlmen);
       this.lvlSelect.alpha = 0;
    },
    update : function(){

    }
}
module.exports = mainMenu;