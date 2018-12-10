'use strict';
//El jugador
var Player = require('./player.js');
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Map = require('./map.js');
var tspr = require('./triggerSprite.js');
var tarjetaLlave = require('./tarjetaLlave.js');
//UI
var Interface = require('./Interface.js');

var Lvl2_2 = {
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
   
    this.map1 = new Map('Lvl2_1_1',48,48,'suelo',this,false,55,40);
    this.map1.ini();
   
    this.map2 = new Map('Lvl2_1_2',48,48,'paredes',this,false,55,40);
    this.map2.ini();

    this.map3 = new Map('Lvl2_1_3',48,48,'paredes',this,false,55,40);
    this.map3.ini();
    this.map3.collisions(0,1000);

    this.map4 = new Map('Lvl2_1_4',48,48,'objetos',this,false,55,40);
    this.map4.ini();
    this.map4.collisions(0,1000);
    

    this.map5 = new Map('Lvl2_1_5',48,48,'objetos',this,false,55,40);
    this.map5.ini();

    this.map6 = new Map('Lvl2_1_6',48,48,'paredes',this,true,55,40);
    this.map6.ini();
    this.map6.collisions(0,1000);

    //Tarjeta llave
    this.magKey = new tarjetaLlave(this.game,2510,320,'tarjet',.075,.075);
    this.magKey.ini();

    //Inicializamos el personaje
    //2305, 1743
    this.Sam = new Player(2305, 1743, false, false, 5, 'player', this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();

    //UI
    this.interfaz = new Interface(400,575,'UI',this.game);
    this.game.add.existing(this.interfaz);
    this.interfaz.ini(this.Sam.retDoc(), this.Sam.retKey());
    this.interfaz.fixedToCamera = true;

    //Cámara
    this.camera.follow(this.Sam);

    this.nextLvl = new tspr(this.game, 2453, 1745, 'aux', .2,1.3);
    this.nextLvl.ini();

    this.checkIntersects = function(){
      if(Phaser.Rectangle.intersects(this.Sam,this.nextLvl)){
        this.game.state.start('lvl2_1')
      }
    }
  },
  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(),this.map3.returnLayer(), this.map6.returnLayer(),this.map6,this.magKey,undefined);
    this.checkIntersects();
    this.interfaz.update();
  },
};

module.exports = Lvl2_2;

