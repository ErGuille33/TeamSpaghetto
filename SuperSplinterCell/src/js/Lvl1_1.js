'use strict';
//El jugador
var Player = require('./player.js');
//Enemigos
var Enemy = require ('./Enemy.js')
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Map = require('./map.js');
var tspr = require('./triggerSprite.js');
var tarjetaLlave = require('./tarjetaLlave.js');
var documents = require('./documentos.js');

//UI
var Interface = require('./Interface.js');

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
    this.Enemy1
    this.interfaz;
    this.button;
    //Capas

    this.map1 = new Map('Lvl1_1_1', 48, 48, 'suelo', this, false, 150, 50);
    this.map1.ini();

    this.map2 = new Map('Lvl1_1_2', 48, 48, 'paredes', this, false, 150, 50);
    this.map2.ini();

    this.map3 = new Map('Lvl1_1_3', 48, 48, 'paredes', this, false, 150, 50);
    this.map3.ini();
    this.map3.collisions(0, 1000);

    this.map4 = new Map('Lvl1_1_4', 48, 48, 'objetos', this, false, 150, 50);
    this.map4.ini();
    this.map4.collisions(0, 1000);


    this.map5 = new Map('Lvl1_1_5', 48, 48, 'objetos', this, false, 150, 50);
    this.map5.ini();

    this.map6 = new Map('Lvl1_1_6', 48, 48, 'paredes', this, true, 150, 50);
    this.map6.ini();
    this.map6.collisions(0, 1000);

    //Inicializamos el personaje
    //Tarjeta llave
    this.magKey = new tarjetaLlave(this.game, 660, 1924, 'tarjet', .075, .075);
    this.magKey.ini();

    this.docums = new documents(this.game, 6735, 1420, 'documents', .15, .15);
    this.docums.ini();
    //143, 1155
    this.Sam = new Player(143, 1155, false, false, 5, 'player', this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();
    //Enemys
    this.pos1 = [{x: 150, y: 1155}, {x: 150, y: 1159}];
    this.Enemy1 = new Enemy(150, 1155, false, false, this.pos1, 300, 'enemy', this.game);
    //TriggerSpots
    this.nextFloor = new tspr(this.game, 2131, 121, 'aux', .9, .2);
    this.nextFloor.ini();

    this.endLvl = new tspr(this.game, 1392, 2360, 'aux', .8, .4);
    this.endLvl.ini();

    this.lastFloor = new tspr(this.game, 6839, 200, 'aux', 1.9, .2);
    this.lastFloor.ini();

    //UI
    this.interfaz = new Interface(400, 575, 'UI', this.game);
    this.game.add.existing(this.interfaz);
    this.interfaz.ini();
    this.interfaz.fixedToCamera = true;

    //Cámara
    this.camera.follow(this.Sam);
    this.checkIntersects = function () {
      if (Phaser.Rectangle.intersects(this.Sam, this.nextFloor)) {
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.animations.stop('walk');
        this.Sam.x = 6839;
        this.Sam.y = 300;
        this.Sam.angle = 90;
      }
      else if (Phaser.Rectangle.intersects(this.Sam, this.lastFloor)) {
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.animations.stop('walk');
        this.Sam.x = 2131;
        this.Sam.y = 190;
        this.Sam.angle = 90;
      }
      else if (Phaser.Rectangle.intersects(this.Sam, this.endLvl) && this.Sam.documents) {
        this.game.state.start('lvl2_1');
      }
    }
  },

  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(), this.map3.returnLayer(), this.map6.returnLayer(), this.map6, this.magKey, this.docums);
    this.checkIntersects();
    this.interfaz.update(this.Sam.returnDocument(), this.Sam.returnKey(), this.Sam.returnItem());
  },
  render: function () {
    var showDebug = true;
    var lvl = this;
    if (showDebug) {
      
    }
  }

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