'use strict';
//El jugador
var Player = require('./player.js');
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Map = require('./map.js');
var tspr = require('./triggerSprite.js');
var documents = require('./documentos.js');
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
   
    this.map1 = new Map('Lvl2_2_1',48,48,'suelo',this,false,50,30);
    this.map1.ini();
   
    this.map2 = new Map('Lvl2_2_2',48,48,'paredes',this,false,50,30);
    this.map2.ini();

    this.map3 = new Map('Lvl2_2_3',48,48,'paredes',this,false,50,30);
    this.map3.ini();
    this.map3.collisions(0,1000);

    this.map4 = new Map('Lvl2_2_4',48,48,'objetos',this,false,50,30);
    this.map4.ini();
    this.map4.collisions(0,1000);
    

    this.map5 = new Map('Lvl2_2_5',48,48,'objetos',this,false,50,30);
    this.map5.ini();

    this.map6 = new Map('Lvl2_2_6',48,48,'paredes',this,true,50,30);
    this.map6.ini();
    this.map6.collisions(0,1000);

    //Items
    this.docums = new documents (this.game,1025, 455, 'documents',.15,.15);
    this.docums.ini();

    //Inicializamos el personaje
    //154, 636
    this.Sam = new Player(154, 636, true, false, 5, 'player', this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();

    //UI
    this.interfaz = new Interface(400,575,'UI',this.game);
    this.game.add.existing(this.interfaz);
    this.interfaz.ini();
    this.interfaz.fixedToCamera = true;

    //Cámara
    this.camera.follow(this.Sam);

    this.nextLvl = new tspr(this.game, 2292, 1243, 'aux', .3,.4);
    this.nextLvl.ini();

    this.endLvl = new tspr(this.game, 1444, 1437, 'aux', .8,.4);
    this.endLvl.ini();

    this.checkIntersects = function(){
      if(Phaser.Rectangle.intersects(this.Sam,this.nextLvl)){
        this.game.state.start('lvl2_2');
      }
      else if(Phaser.Rectangle.intersects(this.Sam,this.endLvl) && this.Sam.documents){
        this.game.state.start('menu');
      }
    }
    
  },
  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(),this.map3.returnLayer(), this.map6.returnLayer(),this.map6,undefined,this.docums);
    this.checkIntersects();
    this.interfaz.update(this.Sam.retDoc(), this.Sam.retKey());
  },
};

module.exports = Lvl2_1;

