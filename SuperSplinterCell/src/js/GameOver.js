'use strict';
var gameOver1 = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'perder');
       function start (){
        this.game.state.start('play');
       };
       function returntoMain (){
        this.game.state.start('menu');
       };
       
       this.continue = this.game.add.button(125,350,'return',returntoMain);
       this.continue.scale.setTo(1,1);

       this.nxt = this.game.add.button(475,350,'try',start);
       this.nxt.scale.setTo(1,1);
    },
    update : function(){
        if(Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)){
            this.continue.scale.setTo(1.1,1.1);
        }
        else   this.continue.scale.setTo(1,1);

        if(Phaser.Rectangle.containsPoint(this.nxt, this.game.input.mousePointer)){
            this.nxt.scale.setTo(1.1,1.1);
        }
        else   this.nxt.scale.setTo(1,1);
    }
}
module.exports = gameOver1;