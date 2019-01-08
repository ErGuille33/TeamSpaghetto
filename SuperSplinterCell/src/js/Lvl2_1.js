'use strict';
//El jugador
var Player = require('./player.js');
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Map = require('./map.js');
var tspr = require('./triggerSprite.js');
var documents = require('./documentos.js');
var tarjetaLlave = require('./tarjetaLlave.js');

var Enemy = require('./Enemy.js')
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

    this.map1 = new Map('Lvl2_1_1', 48, 48, 'suelo', this, false, 150, 50);
    this.map1.ini();

    this.map2 = new Map('Lvl2_1_2', 48, 48, 'paredes', this, false, 150, 50);
    this.map2.ini();

    this.map3 = new Map('Lvl2_1_3', 48, 48, 'paredes', this, false, 150, 50);
    this.map3.ini();
    this.map3.collisions(0, 1000);

    this.map4 = new Map('Lvl2_1_4', 48, 48, 'objetos', this, false, 150, 50);
    this.map4.ini();
    this.map4.collisions(0, 1000);


    this.map5 = new Map('Lvl2_1_5', 48, 48, 'objetos', this, false, 150, 50);
    this.map5.ini();

    this.map6 = new Map('Lvl2_1_6', 48, 48, 'paredes', this, true, 150, 50);
    this.map6.ini();
    this.map6.collisions(0, 1000);

    //Items
    this.docums = new documents(this.game, 1025, 929, 'documents', .15, .15);
    this.docums.ini();
    //MagKey
    this.magKey = new tarjetaLlave(this.game, 7075, 386, 'tarjet', .075, .075);
    this.magKey.ini();

    //Enemigos 
    this.enemys = [];
    this.pos0 = [{ x: 1034, y: 1709 }, { x: 214, y: 1724 }];
    this.enemys[0] = new Enemy(1034, 1709, false, false, this.pos0, 150, 180, 'enemy', this.game);
    this.enemys[0].ini();

    this.pos1 = [{ x: 210, y: 1385 }];
    this.enemys[1] = new Enemy(210, 1385, false, false, this.pos1, 150, 0, 'enemy', this.game);
    this.enemys[1].ini();

    this.pos2 = [{ x: 2187, y: 1096 }];
    this.enemys[2] = new Enemy(2187, 1096, false, false, this.pos2, 150, 0, 'enemy', this.game);
    this.enemys[2].ini();

    this.pos3 = [{ x: 1868, y: 586 }, { x: 436, y: 586 }, { x: 436, y: 1491 }, { x: 1868, y: 1491 }];
    this.enemys[3] = new Enemy(1868, 586, false, false, this.pos3, 175, 180, 'enemy', this.game);
    this.enemys[3].ini();

    this.pos4 = [{ x: 597, y: 1401 }, { x: 597, y: 668 }, { x: 1783, y: 668 }, { x: 1783, y: 1401 }];
    this.enemys[4] = new Enemy(597, 1401, false, false, this.pos4, 175, 180, 'enemy', this.game);
    this.enemys[4].ini();

    this.pos5 = [{ x: 1602, y: 1253 }, { x: 791, y: 1253 }];
    this.enemys[5] = new Enemy(1602, 1253, false, false, this.pos5, 150, 180, 'enemy', this.game);
    this.enemys[5].ini();

    this.pos6 = [{ x: 725, y: 1034 }];
    this.enemys[6] = new Enemy(725, 1034, false, false, this.pos6, 150, 0, 'enemy', this.game);
    this.enemys[6].ini();

    //Segundo piso

    this.pos7 = [{ x: 6887, y: 794 }, { x: 6887, y: 1670 }, { x: 6566, y: 1670 }, { x: 6566, y: 794 }];
    this.enemys[7] = new Enemy(6887, 794, false, false, this.pos7, 175, 180, 'enemy', this.game);
    this.enemys[7].ini();

    this.pos8 = [{ x: 6389, y: 438 }, { x: 4708, y: 438 }, { x: 4708, y: 1653 }, { x: 6389, y: 1653 }];
    this.enemys[8] = new Enemy(6389, 458, false, false, this.pos8, 175, 180, 'enemy', this.game);
    this.enemys[8].ini();

    this.pos9 = [{ x: 4708, y: 1653 }, { x: 6389, y: 1653 }, { x: 6389, y: 438 }, { x: 4708, y: 438 }];
    this.enemys[9] = new Enemy(4708, 1653, false, false, this.pos9, 175, 180, 'enemy', this.game);
    this.enemys[9].ini();

    this.pos10 = [{ x: 5916, y: 1604 }, { x: 5343, y: 1604 }, { x: 5343, y: 529 }, { x: 5916, y: 529 }];
    this.enemys[10] = new Enemy(5916, 1604, false, false, this.pos10, 175, 180, 'enemy', this.game);
    this.enemys[10].ini();

    this.pos11 = [{ x: 7027, y: 456 }];
    this.enemys[11] = new Enemy(7027, 456, false, false, this.pos11, 150, 0, 'enemy', this.game);
    this.enemys[11].ini();

    this.pos12 = [{ x: 4944, y: 1961 }];
    this.enemys[12] = new Enemy(4944, 1961, false, true, this.pos12, 150, -90, 'enemy', this.game, 2000);
    this.enemys[12].ini();

    this.pos13 = [{ x: 5651, y: 1736 }, { x: 5651, y: 2000 }];
    this.enemys[13] = new Enemy(5651, 1736, false, false, this.pos13, 150, 0, 'enemy', this.game);
    this.enemys[13].ini();

    //Dark
    this.map7 = new Map('Lvl2_1_7', 48, 48, 'paredes', this, true, 150, 50);
    this.map7.ini();

    //Carteles

    var exit = this.game.add.sprite(1401, 1824, 'exit');
    exit.scale.setTo(.3, .3);

    var up = this.game.add.sprite(2245, 1836, 'up');
    up.scale.setTo(.3, .3);
    up.angle = -90;

    var down = this.game.add.sprite(6965, 2044, 'down');
    down.scale.setTo(.3, .3);
    down.angle = -90;

    //Inicializamos el personaje
    //148, 1101
    this.Sam = new Player(148, 1101, false, false, 5, 'player', this.game, 2);
    this.game.add.existing(this.Sam);
    this.Sam.ini();

    //UI
    this.interfaz = new Interface(400, 575, 'UI', this.game);
    this.game.add.existing(this.interfaz);
    this.interfaz.ini();
    this.interfaz.fixedToCamera = true;

    //Cámara
    this.camera.follow(this.Sam);

    this.nextLvl = new tspr(this.game, 2292, 1736, 'aux', .3, .7);
    this.nextLvl.ini();

    this.endLvl = new tspr(this.game, 1485, 1910, 'aux', .8, .3);
    this.endLvl.ini();

    this.lastFloor = new tspr(this.game, 7000, 1937, 'aux', .2, 1.4);
    this.lastFloor.ini();

    //Musica
    this.escalera = this.game.add.audio('escalera');
    this.mission = this.game.add.audio('mission');

    this.music = this.game.add.audio('levelMusic');

    this.music.loopFull(.3);
    //Trigger Sprites
    this.checkIntersects = function () {
      if (Phaser.Rectangle.intersects(this.Sam, this.nextLvl)) {
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.escalera.play();
        this.Sam.animations.stop('walk');
        this.Sam.x = 6848;
        this.Sam.y = 1938;
        this.Sam.angle = 180;
      }
      else if (Phaser.Rectangle.intersects(this.Sam, this.lastFloor)) {
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.escalera.play();
        this.Sam.animations.stop('walk');
        this.Sam.x = 2130;
        this.Sam.y = 1725;
        this.Sam.angle = 180;
      }
      else if (Phaser.Rectangle.intersects(this.Sam, this.endLvl) && this.Sam.documents) {
        this.mission.play();
        this.game.state.start('finalLvl');
      }
    }

  },
  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(), this.map3.returnLayer(), this.map6.returnLayer(), this.map6, this.magKey, this.docums, this.enemys, this.map7.returnMap());
    this.checkIntersects();
    this.interfaz.update(this.Sam.returnDocument(), this.Sam.returnKey(), this.Sam.returnItem());
    for (var i = 0; i < this.enemys.length; i++) {
      this.enemys[i].update(this.Sam, this.music);
    }
  },
};

module.exports = Lvl2_1;

