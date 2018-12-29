'use strict';
var tuto = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'inicial');
       function start (){
        this.game.state.start('play');
       };
       
       this.continue = this.game.add.button(685,510,'press',start);
       this.continue.scale.setTo(.1,.1);
    },
    update : function(){
        if(Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)){
            this.continue.scale.setTo(.11,.11);
        }
        else   this.continue.scale.setTo(.1,.1);
    }
}
module.exports = tuto;