'use strict';
var tuto = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'inicial');
       function start (){
        this.game.state.start('play');
       };
       
       this.continue = this.game.add.button(475,510,'press',start);
       this.continue.scale.setTo(.65,.65);
    },
    update : function(){

    }
}
module.exports = tuto;