'use strict';
var mainMenu = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'lvlSelector');
       function start (){
        this.game.state.start('play');
       }
       function lvl2 (){
        this.game.state.start('lvl2_1');
    }
    function back (){
        this.game.state.start('menu');
    }
       this.lvl1 = this.game.add.button(280,25,'aux',start);
       this.lvl1.alpha = 0;
       this.lvl2 = this.game.add.button(280,325,'aux',lvl2);
       this.lvl2.alpha = 0;
       this.back = this.game.add.button(30,15,'aux',back);
       this.back.scale.setTo(.5,.5);
       this.back.alpha = 0;
    },
    update : function(){

    }
}
module.exports = mainMenu;