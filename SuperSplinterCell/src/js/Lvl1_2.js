'use strict';
//El jugador
var Player = require('./player.js');
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Map = require('./map.js');
var tspr = require('./triggerSprite.js');
var Lvl1_2 = {
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
   
    this.map1 = new Map('Lvl1_2_1',48,48,'suelo',this,false,50,50);
    this.map1.ini();
   
    this.map2 = new Map('Lvl1_2_2',48,48,'paredes',this,false,50,50);
    this.map2.ini();

    this.map3 = new Map('Lvl1_2_3',48,48,'paredes',this,false,50,50);
    this.map3.ini();
    this.map3.collisions(0,1000);

    this.map4 = new Map('Lvl1_2_4',48,48,'objetos',this,false,50,50);
    this.map4.ini();
    this.map4.collisions(0,1000);
    

    this.map5 = new Map('Lvl1_2_5',48,48,'objetos',this,false,50,50);
    this.map5.ini();

    this.map6 = new Map('Lvl1_2_6',48,48,'paredes',this,true,50,50);
    this.map6.ini();
    this.map6.collisions(0,1000);

    //Inicializamos el personaje
    //2040, 325
    this.Sam = new Player(2040, 325, false, false, 5, 'player', this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();

    this.nextLvl = new tspr(this.game, 2050, 211, 'aux', 1.9,.2);
    this.nextLvl.ini();
    //Cámara
    this.camera.follow(this.Sam);
    //inters
    this.checkIntersects = function(){
      if(Phaser.Rectangle.intersects(this.Sam,this.nextLvl)){
        this.game.state.start('play')
      }
    }
  },
  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(),this.map3.returnLayer(), this.map6.returnLayer(),this.map6);
    this.checkIntersects();
  },
};

module.exports = Lvl1_2;

