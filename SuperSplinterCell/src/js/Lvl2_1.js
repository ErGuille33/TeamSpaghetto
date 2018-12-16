'use strict';
//El jugador
var Player = require('./player.js');
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Map = require('./map.js');
var tspr = require('./triggerSprite.js');
var documents = require('./documentos.js');
var tarjetaLlave = require('./tarjetaLlave.js');
//UI
var Interface = require('./Interface.js');

var Lvl2_1 = {
  //Se ejecuta al principio
  create: function () {
    //Añadimos al mapa nuestro mapa ya cargado, y lo cargamos en la escena
    //El mapa de juego
    this.map1;
    this.map2;
    this.map3;
    this.map4;
    this.map5;
    this.map6;
    this.Sam;
    //Capas
   
    this.map1 = new Map('Lvl2_1_1',48,48,'suelo',this,false,150,50);
    this.map1.ini();
   
    this.map2 = new Map('Lvl2_1_2',48,48,'paredes',this,false,150,50);
    this.map2.ini();

    this.map3 = new Map('Lvl2_1_3',48,48,'paredes',this,false,150,50);
    this.map3.ini();
    this.map3.collisions(0,1000);

    this.map4 = new Map('Lvl2_1_4',48,48,'objetos',this,false,150,50);
    this.map4.ini();
    this.map4.collisions(0,1000);
    

    this.map5 = new Map('Lvl2_1_5',48,48,'objetos',this,false,150,50);
    this.map5.ini();

    this.map6 = new Map('Lvl2_1_6',48,48,'paredes',this,true,150,50);
    this.map6.ini();
    this.map6.collisions(0,1000);

    //Items
    this.docums = new documents (this.game,1025, 929, 'documents',.15,.15);
    this.docums.ini();
    //MagKey
    this.magKey = new tarjetaLlave(this.game, 7075, 386, 'tarjet', .075, .075);
    this.magKey.ini();
    //Inicializamos el personaje
    //154, 636
    this.Sam = new Player(6838, 1943, false, false, 5, 'player', this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();

    //UI
    this.interfaz = new Interface(400,575,'UI',this.game);
    this.game.add.existing(this.interfaz);
    this.interfaz.ini();
    this.interfaz.fixedToCamera = true;

    //Cámara
    this.camera.follow(this.Sam);

    this.nextLvl = new tspr(this.game, 2292, 1736, 'aux', .3,.7);
    this.nextLvl.ini();

    this.endLvl = new tspr(this.game, 1485, 1910, 'aux', .8,.3);
    this.endLvl.ini();

    this.checkIntersects = function(){
      if(Phaser.Rectangle.intersects(this.Sam,this.nextLvl)){
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.animations.stop('walk');
        this.Sam.x = 6848;
        this.Sam.y = 1938;
        this.Sam.angle = 180;
      }
      else if(Phaser.Rectangle.intersects(this.Sam,this.endLvl) && this.Sam.documents){
        this.game.state.start('menu');
      }
    }
    
  },
  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(),this.map3.returnLayer(), this.map6.returnLayer(),this.map6,this.magKey,this.docums);
    this.checkIntersects();
    this.interfaz.update(this.Sam.returnDocument(), this.Sam.returnKey());
  },
};

module.exports = Lvl2_1;

