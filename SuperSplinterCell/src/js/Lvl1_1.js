'use strict';
//El jugador
var Player = require('./player.js');
//Enemigos
var Enemy = require('./Enemy.js')
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
    //Primera habitacion
    //Angle: Right = 0 ; Up = -90; Down = 90; Left = 180;...
    this.enemys = [];
    this.pos0 = [{ x: 525, y: 1155 }];
    this.enemys[0] = new Enemy(525, 1155, false, false, this.pos0, 150, 0, 'enemy', this.game);
    this.enemys[0].ini();
    //this.pos1= [{x: ,y: }];
    this.pos1 = [{ x: 920, y: 893 }];
    this.enemys[1] = new Enemy(920, 893, false, false, this.pos1, 150, 90, 'enemy', this.game);
    this.enemys[1].ini();

    this.pos2 = [{ x: 686, y: 2140 }];
    this.enemys[2] = new Enemy(686, 2140, false, false, this.pos2, 150, 180, 'enemy', this.game);
    this.enemys[2].ini();

    this.pos3 = [{ x: 543, y: 1767 }];
    this.enemys[3] = new Enemy(543, 1767, false, false, this.pos3, 150, 180, 'enemy', this.game);
    this.enemys[3].ini();

    this.pos4 = [{ x: 1630, y: 277 }, { x: 675, y: 277 } ];
    this.enemys[4] = new Enemy(1630, 277, false, false, this.pos4, 150, 180, 'enemy', this.game);
    this.enemys[4].ini();

    this.pos5 = [{ x: 980, y: 1480 }, { x: 803, y: 1480 }, { x: 800, y: 2131 }, { x: 980, y: 2130 }];
    this.enemys[5] = new Enemy(980, 1480, false, false, this.pos5, 175, 180, 'enemy', this.game);
    this.enemys[5].ini();

    this.pos6 = [{ x: 1665, y: 1777 }];
    this.enemys[6] = new Enemy(1725, 1777, false, true, this.pos6, 100, 180, 'enemy', this.game,1000);
    this.enemys[6].ini();

    this.pos7 = [{ x: 2246, y: 708 }, { x: 1540 , y: 708 }, { x: 1540, y: 900 }, { x: 2246, y: 900 }];
    this.enemys[7] = new Enemy(2246, 708, false, false, this.pos7, 125, 180, 'enemy', this.game);
    this.enemys[7].ini();

    //Segunda Habitacion

    this.pos8 = [{ x: 5055 , y: 240 }, { x: 5055 , y: 644 }, { x: 6248 , y: 644 }, { x: 6248, y: 240 }];
    this.enemys[8] = new Enemy(5025, 220, false, false, this.pos8, 175, 180, 'enemy', this.game);
    this.enemys[8].ini();

    this.pos9 = [{ x: 5005 , y: 190 }, { x: 6295, y: 190 },{ x: 6295 , y: 594 },{ x: 5005 , y: 594 }];
    this.enemys[9] = new Enemy(5025, 220, false, false, this.pos9, 125, 180, 'enemy', this.game);
    this.enemys[9].ini();
    
    this.pos10 = [{ x: 5644 , y: 920 }];
    this.enemys[10] = new Enemy(5644, 920, false, false, this.pos10, 150, 90, 'enemy', this.game);
    this.enemys[10].ini();

    this.pos11 = [{ x: 6692 , y: 951 }];
    this.enemys[11] = new Enemy(6692, 951, false, true, this.pos11, 150, -90, 'enemy', this.game,2000);
    this.enemys[11].ini();

    this.pos12 = [{ x: 6225 , y: 2271 }, { x: 6225 , y: 891 } ];
    this.enemys[12] = new Enemy(6193, 2271, false, false, this.pos12, 150, 180, 'enemy', this.game);
    this.enemys[12].ini();

    this.pos13 = [{ x: 6175  , y: 1234 }, { x: 5043 , y: 1234 },{ x: 5043 , y: 2275 },{ x: 6175 , y: 2275 }];
    this.enemys[13] = new Enemy(6175 , 1234, false, false, this.pos13, 170, 180, 'enemy', this.game);
    this.enemys[13].ini();

    this.pos14 = [{ x: 5782  , y: 1493 }];
    this.enemys[14] = new Enemy(5782, 1493, false, false, this.pos14, 150, 180, 'enemy', this.game,2000);
    this.enemys[14].ini();

    this.pos15 = [{ x: 5482  , y: 1485 }];
    this.enemys[15] = new Enemy(5482, 1485, false, false, this.pos15, 150, 0, 'enemy', this.game,2000);
    this.enemys[15].ini();


    //Sam
    //143, 1155
    this.Sam = new Player(143, 1155, false, false, 5, 'player', this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();

    //TriggerSpots
    this.nextFloor = new tspr(this.game, 2131, 121, 'aux', .9, .2);
    this.nextFloor.ini();

    this.endLvl = new tspr(this.game, 1345, 2333, 'aux', 1, .28);
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
    this.Sam.update(this.map4.returnLayer(), this.map3.returnLayer(), this.map6.returnLayer(), this.map6, this.magKey, this.docums, this.enemys);
    this.checkIntersects();
    this.interfaz.update(this.Sam.returnDocument(), this.Sam.returnKey(), this.Sam.returnItem());
   
  },
  render: function () {
    var showDebug = true;
    var lvl = this;
    if (showDebug) {
      this.game.debug.body(this.enemys[0].coneOfVision);
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