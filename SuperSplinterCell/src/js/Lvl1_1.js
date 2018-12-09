'use strict';
//El jugador
var Player = require('./player.js');
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Map = require('./map.js');
var tspr = require('./triggerSprite.js');
var tarjetaLlave = require('./tarjetaLlave.js');

var PlayScene = {
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
   
    this.map1 = new Map('Lvl1_1_1',48,48,'suelo',this,false,50,50);
    this.map1.ini();
   
    this.map2 = new Map('Lvl1_1_2',48,48,'paredes',this,false,50,50);
    this.map2.ini();

    this.map3 = new Map('Lvl1_1_3',48,48,'paredes',this,false,50,50);
    this.map3.ini();
    this.map3.collisions(0,1000);

    this.map4 = new Map('Lvl1_1_4',48,48,'objetos',this,false,50,50);
    this.map4.ini();
    this.map4.collisions(0,1000);
    

    this.map5 = new Map('Lvl1_1_5',48,48,'objetos',this,false,50,50);
    this.map5.ini();

    this.map6 = new Map('Lvl1_1_6',48,48,'paredes',this,true,50,50);
    this.map6.ini();
    this.map6.collisions(0,1000);

    //Inicializamos el personaje
    //Tarjeta llave
    this.magKey = new tarjetaLlave(this.game,660,1924,'tarjet',.075,.075);
    this.magKey.ini();
    //143, 1155
    this.Sam = new Player(143, 1155, false, true, 5, 'player', this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();
    //TriggerSpots
    this.nextLvl = new tspr(this.game, 2131, 121, 'aux', .9,.2);
    this.nextLvl.ini();

    this.endLvl = new tspr(this.game, 1392, 2387, 'aux', .8,.4);
    this.endLvl.ini();

    //Cámara
    this.camera.follow(this.Sam);
    this.checkIntersects = function(){
      if(Phaser.Rectangle.intersects(this.Sam,this.nextLvl)){
        this.game.state.start('lvl1_2')
      }
      else if(Phaser.Rectangle.intersects(this.Sam,this.endLvl) && this.Sam.documents){
        this.game.state.start('lvl2_1');
      }
    }
  },
  
  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(),this.map3.returnLayer(), this.map6.returnLayer(),this.map6, this.magKey,undefined);
    this.checkIntersects();
  },
};

module.exports = PlayScene;




/*
function Level(position, graphic){
  this.lightsOn = true;
  this.win = false;
  this.objects ={documents: { pos : position, taken: false},
    magneticKey:{ pos:positquiion, taken:false}
};

*/