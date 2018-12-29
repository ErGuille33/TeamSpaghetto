'use strict';
var finalLevel = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'interLvl');
    
       function returntoMain (){
        this.game.state.start('menu');
       };
       
       this.continue = this.game.add.button(300,350,'return',returntoMain);
       this.continue.scale.setTo(1,1);

    },
    update : function(){
        if(Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)){
            this.continue.scale.setTo(1.1,1.1);
        }
        else   this.continue.scale.setTo(1,1);

    }
}
module.exports = finalLevel;