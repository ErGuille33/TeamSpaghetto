(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var Character = require('./character.js')
var Player = require('./player.js')
var coneOfVision = require('./VisionCone.js');

//Enemigos
function Enemy(x, y, KO, Look, posiciones, speed, angle, sprite, game, timer) {
    Character.call(this, game, x, y, sprite);
    this.ko = KO;
    this.look = Look;
    this.sPeed = speed;
    this.positions = posiciones;
    this.angle = angle;
    this.game = game;
    this.timer = timer;
}
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.ini = function () {


    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    //this.body.setSize(25, 30, 15, 15);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.auxi = 0;

    this.animations.add('walk', [0, 1], 6, true);
    this.animations.add('shoot', [4, 5, 6, 7], 7, false);
    this.animations.add('dead', [8], 1, false);

    this.body.allowGravity = false;
    this.body.immovable = true;

    this.coneOfVision = new coneOfVision(this.game, 140, 0, 'cono');
    this.coneOfVision.ini();
    this.timeAux = this.game.time.now;
    this.addChild(this.coneOfVision);

    this.visto = false;

    this.shoot = this.game.add.audio('shoot');


}
Enemy.prototype.changeAngle = function () {

    this.angle += 90;
}
//Segun los patrones de movimiento que hayan sido establecidos, se moverán
Enemy.prototype.moveEnemy = function () {

    if (!this.ko) {
        //En caso de que se pueda mover
        if (!this.look) {

            if (!((Math.trunc(this.x) <= this.positions[this.auxi].x + 1 && Math.trunc(this.x) >= this.positions[this.auxi].x - 1))
                || !(Math.trunc(this.y) <= this.positions[this.auxi].y + 1 && Math.trunc(this.y) >= this.positions[this.auxi].y - 1)) {


                this.xDestine = this.positions[this.auxi].x;
                this.yDestine = this.positions[this.auxi].y;

                this.rotation = this.game.physics.arcade.moveToXY(this, this.xDestine, this.yDestine, this.sPeed);

                this.animations.play('walk');


            } else {

                if (this.auxi < this.positions.length - 1) {
                    this.auxi++;
                } else {
                    this.auxi = 0;
                }
            }
        }
        //En caso de que no se pueda mover
        else {
            if (this.timeAux <= this.game.time.now) {
                this.timeAux = this.game.time.now + this.timer;
                this.changeAngle();
            }
        }
    }
    //Si está muerto
    else {
        this.body.velocity.setTo(0, 0);
        this.animations.play('dead');
    }
}
//Detecta jugador
Enemy.prototype.playerDetected = function (player, music) {

    if (player != undefined && !this.visto) {

        if (this.game.physics.arcade.overlap(this.coneOfVision, player)) {
            this.visto = true;
            this.body.velocity.setTo(0, 0);
            music.stop();
            console.log(this.game.physics.arcade.angleBetween(this, player));
            this.angle = (180 / Math.PI) * this.game.physics.arcade.angleBetween(this, player);
            this.animations.play('shoot');
            this.shoot.play();
            player.getKilled();
        }
    }
}

Enemy.prototype.checkOverlap = function (spriteA, spriteB) {
    /*
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Rectangle.intersects(boundsA, boundsB);*/
}
Enemy.prototype.killed = function () {
    this.coneOfVision.kill();
    this.ko = true;
}

Enemy.prototype.update = function (player, music) {

    this.playerDetected(player, music);
    if (!this.visto) {
        this.moveEnemy();
    }
}

module.exports = Enemy;
},{"./VisionCone.js":7,"./character.js":8,"./player.js":17}],2:[function(require,module,exports){
'use strict';

//Pantalla de derrota en el primer nivel 
var gameOver1 = {

    create: function () {
        var beep;
        var fondo = this.game.add.image(0, 0, 'perder');
        function start() {
            beep.play();
            this.game.state.start('play');
        };
        function returntoMain() {
            beep.play();
            this.game.state.start('menu');
        };

        this.continue = this.game.add.button(125, 350, 'return', returntoMain);
        this.continue.scale.setTo(1, 1);

        this.nxt = this.game.add.button(475, 350, 'try', start);
        this.nxt.scale.setTo(1, 1);
        var failed = this.game.add.audio('failed');
        failed.play();

        beep = this.game.add.audio('beep');
    },
    update: function () {
        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(1.1, 1.1);
        }
        else this.continue.scale.setTo(1, 1);

        if (Phaser.Rectangle.containsPoint(this.nxt, this.game.input.mousePointer)) {
            this.nxt.scale.setTo(1.1, 1.1);
        }
        else this.nxt.scale.setTo(1, 1);
    }
}
module.exports = gameOver1;
},{}],3:[function(require,module,exports){
'use strict';

//Pantalla de derrota en el segundo nivel 
var gameover2 = {
    create: function () {
        var beep;
        var fondo = this.game.add.image(0, 0, 'perder');
        function start() {
            beep.play();
            this.game.state.start('lvl2_1');
        };
        function returntoMain() {
            beep.play();
            this.game.state.start('menu');
        };

        this.continue = this.game.add.button(125, 350, 'return', returntoMain);
        this.continue.scale.setTo(1, 1);

        this.nxt = this.game.add.button(475, 350, 'try', start);
        this.nxt.scale.setTo(1, 1);
        var failed = this.game.add.audio('failed');
        failed.play();

        beep = this.game.add.audio('beep');
    },
    update: function () {
        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(1.1, 1.1);
        }
        else this.continue.scale.setTo(1, 1);

        if (Phaser.Rectangle.containsPoint(this.nxt, this.game.input.mousePointer)) {
            this.nxt.scale.setTo(1.1, 1.1);
        }
        else this.nxt.scale.setTo(1, 1);
    }
}
module.exports = gameover2;
},{}],4:[function(require,module,exports){
'use strict';
var Character = require('./character.js')
var Player = require('./player.js')



//El HUD

function Interface(x, y, sprite, game) {
    Character.call(this, game, x, y, sprite);
}

Interface.prototype = Object.create(Character.prototype);
Interface.prototype.constructor = Interface;

Interface.prototype.ini = function () {
    this.animations.add('idle', [0], 1, false);
    this.animations.add('lockpick', [1], 1, false);
    this.animations.add('taser', [2], 1, false);
    this.animations.add('cable', [3], 1, false);
    this.animations.add('gun', [4], 1, false);
    this.animations.add('hand', [5], 1, false);

    this.document = this.game.add.sprite(650, 552, 'documents');
    this.document.scale.setTo(.15, .15);
    this.document.fixedToCamera = true;
    this.document.alpha = 0;
    this.game.add.existing(this.document);

    this.tarjet = this.game.add.sprite(730, 560, 'tarjet');
    this.tarjet.scale.setTo(.075, .075);
    this.tarjet.fixedToCamera = true;
    this.tarjet.alpha = 0;
    this.game.add.existing(this.tarjet);


}
//En el update únicamente comprobaremos cual es el item activo, y ejecutaremos la animación pertinente
Interface.prototype.update = function (doc, key, item) {



    this.hasDoc = doc;
    this.hasMag = key;

    if (item == 4) {
        this.animations.stop();
        this.animations.play('hand');

    }
    else if (item == 5) {
        this.animations.stop();
        this.animations.play('gun');

    }
    else if (item == 2) {
        this.animations.stop();
        this.animations.play('taser');
    }
    else if (item == 1) {
        this.animations.stop();
        this.animations.play('lockpick');
    }
    else if (item == 3) {
        this.animations.stop();
        this.animations.play('cable');
    }

    if (this.hasDoc) {
        this.document.alpha = 1;
    } else if (this.hasDoc != undefined) this.document.alpha = 0;

    if (this.hasMag) {
        this.tarjet.alpha = 1;
    } else if (this.hasMag != undefined) this.tarjet.alpha = 0;

}
module.exports = Interface;

},{"./character.js":8,"./player.js":17}],5:[function(require,module,exports){
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
    this.game.physics.startSystem(Phaser.Physics.P2JS)
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
    this.smoke;
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
    this.enemys[1] = new Enemy(920, 893, false, false, this.pos1, 150, -90, 'enemy', this.game);
    this.enemys[1].ini();

    this.pos2 = [{ x: 686, y: 2140 }];
    this.enemys[2] = new Enemy(686, 2140, false, false, this.pos2, 150, 180, 'enemy', this.game);
    this.enemys[2].ini();

    this.pos3 = [{ x: 553, y: 1767 }];
    this.enemys[3] = new Enemy(553, 1767, false, false, this.pos3, 150, 0, 'enemy', this.game);
    this.enemys[3].ini();

    this.pos4 = [{ x: 1630, y: 277 }, { x: 675, y: 277 }];
    this.enemys[4] = new Enemy(1630, 277, false, false, this.pos4, 150, 180, 'enemy', this.game);
    this.enemys[4].ini();

    this.pos5 = [{ x: 980, y: 1480 }, { x: 803, y: 1480 }, { x: 800, y: 2131 }, { x: 980, y: 2130 }];
    this.enemys[5] = new Enemy(980, 1480, false, false, this.pos5, 175, 180, 'enemy', this.game);
    this.enemys[5].ini();

    this.pos6 = [{ x: 1835, y: 1777 }];
    this.enemys[6] = new Enemy(1835, 1777, false, true, this.pos6, 100, 180, 'enemy', this.game, 1000);
    this.enemys[6].ini();

    this.pos7 = [{ x: 2246, y: 708 }, { x: 1540, y: 708 }, { x: 1540, y: 900 }, { x: 2246, y: 900 }];
    this.enemys[7] = new Enemy(2246, 708, false, false, this.pos7, 125, 180, 'enemy', this.game);
    this.enemys[7].ini();

    //Segunda Habitacion

    this.pos8 = [{ x: 5055, y: 240 }, { x: 5055, y: 644 }, { x: 6248, y: 644 }, { x: 6248, y: 240 }];
    this.enemys[8] = new Enemy(5025, 220, false, false, this.pos8, 175, 180, 'enemy', this.game);
    this.enemys[8].ini();

    this.pos9 = [{ x: 5005, y: 190 }, { x: 6295, y: 190 }, { x: 6295, y: 594 }, { x: 5005, y: 594 }];
    this.enemys[9] = new Enemy(5025, 220, false, false, this.pos9, 125, 180, 'enemy', this.game);
    this.enemys[9].ini();

    this.pos10 = [{ x: 5644, y: 830 }];
    this.enemys[10] = new Enemy(5644, 830, false, false, this.pos10, 150, 90, 'enemy', this.game);
    this.enemys[10].ini();

    this.pos11 = [{ x: 6692, y: 951 }];
    this.enemys[11] = new Enemy(6692, 951, false, true, this.pos11, 150, -90, 'enemy', this.game, 2000);
    this.enemys[11].ini();

    this.pos12 = [{ x: 6225, y: 2271 }, { x: 6225, y: 891 }];
    this.enemys[12] = new Enemy(6193, 2271, false, false, this.pos12, 150, 180, 'enemy', this.game);
    this.enemys[12].ini();

    this.pos13 = [{ x: 6175, y: 1234 }, { x: 5043, y: 1234 }, { x: 5043, y: 2275 }, { x: 6175, y: 2275 }];
    this.enemys[13] = new Enemy(6175, 1234, false, false, this.pos13, 170, 180, 'enemy', this.game);
    this.enemys[13].ini();

    this.pos14 = [{ x: 5782, y: 1493 }];
    this.enemys[14] = new Enemy(5782, 1493, false, false, this.pos14, 150, 180, 'enemy', this.game, 2000);
    this.enemys[14].ini();

    this.pos15 = [{ x: 5482, y: 1485 }];
    this.enemys[15] = new Enemy(5482, 1485, false, false, this.pos15, 150, 0, 'enemy', this.game, 2000);
    this.enemys[15].ini();

    //Dark
    this.map7 = new Map('Lvl1_1_7', 48, 48, 'paredes', this, true, 150, 50);
    this.map7.ini();

    //Carteles 

    var exit = this.game.add.sprite(1257, 2255, 'exit');
    exit.scale.setTo(.3, .3);

    var up = this.game.add.sprite(2223, 150, 'up');
    up.scale.setTo(.3, .3);
    up.angle = 180;

    var down = this.game.add.sprite(6935, 250, 'down');
    down.scale.setTo(.3, .3);
    down.angle = 180;

    //Sam
    //143, 1155
    this.Sam = new Player(143, 1155, false, false, 5, 'player', this.game, 1);
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
   // this.smoke = this.game.add.sprite(400, 300, 'humo');
   // this.smoke.fixedToCamera = true;



    //Cámara
    this.camera.follow(this.Sam);

    //Musica

    this.escalera = this.game.add.audio('escalera');
    this.mission = this.game.add.audio('mission');
    this.music = this.game.add.audio('levelMusic');

    this.music.loopFull(.3);

    //Puntos de teletransporte

    this.checkIntersects = function () {
      if (Phaser.Rectangle.intersects(this.Sam, this.nextFloor)) {
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.escalera.play();
        this.Sam.animations.stop('walk');
        this.Sam.x = 6839;
        this.Sam.y = 300;
        this.Sam.angle = 90;
      }
      else if (Phaser.Rectangle.intersects(this.Sam, this.lastFloor)) {
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.escalera.play();
        this.Sam.animations.stop('walk');
        this.Sam.x = 2131;
        this.Sam.y = 190;
        this.Sam.angle = 90;
      }
      else if (Phaser.Rectangle.intersects(this.Sam, this.endLvl) && this.Sam.documents) {
        this.music.stop();
        this.mission.play();
        this.game.state.start('inter');

      }
    }
  },

  //El update de toda la vida
  update: function () {
    this.Sam.update(this.map4.returnLayer(), this.map3.returnLayer(), this.map6.returnLayer(),this.map6, this.magKey, this.docums, this.enemys, this.map7.returnMap());
    this.checkIntersects();
    this.interfaz.update(this.Sam.returnDocument(), this.Sam.returnKey(), this.Sam.returnItem());
    for (var i = 0; i < this.enemys.length; i++) {
      this.enemys[i].update(this.Sam, this.music);
    }

  },

  
  /*render: function () {
    var showDebug = true;
    var lvl = this;
    if (showDebug) {
      this.game.debug.body(this.enemys[0].coneOfVision);
      this.game.debug.body(this.enemys[1].coneOfVision);
      this.game.debug.body(this.enemys[2].coneOfVision);
      this.game.debug.body(this.enemys[3].coneOfVision);
      this.game.debug.body(this.enemys[4].coneOfVision);
      this.game.debug.body(this.enemys[5].coneOfVision);
      this.game.debug.body(this.enemys[6].coneOfVision);
      this.game.debug.body(this.enemys[7].coneOfVision);

    }
  }*/

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
},{"./Enemy.js":1,"./Interface.js":4,"./documentos.js":9,"./map.js":16,"./player.js":17,"./tarjetaLlave.js":18,"./triggerSprite.js":19}],6:[function(require,module,exports){
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


},{"./Enemy.js":1,"./Interface.js":4,"./documentos.js":9,"./map.js":16,"./player.js":17,"./tarjetaLlave.js":18,"./triggerSprite.js":19}],7:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

//Cono de visión

function coneOfVision(game, x, y, sprite) {
    Character.call(this, game, x, y, sprite);
}
coneOfVision.prototype = Object.create(Character.prototype);
coneOfVision.prototype.constructor = coneOfVision;

coneOfVision.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);

    this.body.allowGravity = false;
    this.body.immovable = true;
    //this.scale.setTo(.75,.75);
    this.body.setSize(this.width, this.height-130,0,50);
    this.angle = -90;
    this.alpha = .1;
}

module.exports = coneOfVision;
},{"./character.js":8}],8:[function(require,module,exports){
'use strict';
//Clase padre de la que heredarán todos los personajes del juego
function Character(game, x, y, sprite) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5, 0.5);

}
Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;
module.exports = Character;

},{}],9:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

//Documentos necesarios para ganar la partida

function documentos(game, x, y, sprite, w, h) {
    Character.call(this, game, x, y, sprite);
    this.scale.setTo(w, h);

}

documentos.prototype = Object.create(Character.prototype);
documentos.prototype.constructor = documentos;

documentos.prototype.ini = function () {
    this.game.add.existing(this);
    this.animations.add('shine', [0, 1], 2, true);
    this.animations.play('shine');
    // this.game.physics.arcade.enable(this);

}

module.exports = documentos;
},{"./character.js":8}],10:[function(require,module,exports){
'use strict';

//Pantalla al ganar el juego
var finalLevel = {
    create: function () {
        var beep;
        var win;
        var fondo = this.game.add.image(0, 0, 'interLvl');

        function returntoMain() {
            beep.play();

            win.stop();

            this.game.state.start('menu');
        };

        this.continue = this.game.add.button(300, 350, 'return', returntoMain);
        this.continue.scale.setTo(1, 1);

        beep = this.game.add.audio('beep');
        win = this.game.add.audio('win');
        win.loopFull(.25);

    },
    update: function () {

        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(1.1, 1.1);
        }
        else this.continue.scale.setTo(1, 1);

    }
}
module.exports = finalLevel;
},{}],11:[function(require,module,exports){
'use strict';
var Character = require('./character.js');
//La mano de Sam
function Hand(game, x, y, sprite) {
    Character.call(this, game, x, y, sprite);
}

Hand.prototype = Object.create(Character.prototype);
Hand.prototype.constructor = Hand;

Hand.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.scale.setTo(.2, .2);
    this.alpha = 0;
}

module.exports = Hand;
},{"./character.js":8}],12:[function(require,module,exports){
'use strict';
//Pantalla entre el nivel 1 y 2
var interLevel = {
    create: function () {
        var beep;
        var fondo = this.game.add.image(0, 0, 'interLvl');
        function start() {
            beep.play();
            this.game.state.start('lvl2_1');
        };
        function returntoMain() {
            beep.play();
            this.game.state.start('menu');
        };

        this.continue = this.game.add.button(125, 350, 'return', returntoMain);
        this.continue.scale.setTo(1, 1);

        this.nxt = this.game.add.button(475, 350, 'nextLvl', start);
        this.nxt.scale.setTo(1, 1);

        beep = this.game.add.audio('beep');
    },
    update: function () {
        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(1.1, 1.1);
        }
        else this.continue.scale.setTo(1, 1);

        if (Phaser.Rectangle.containsPoint(this.nxt, this.game.input.mousePointer)) {
            this.nxt.scale.setTo(1.1, 1.1);
        }
        else this.nxt.scale.setTo(1, 1);
    }
}
module.exports = interLevel;
},{}],13:[function(require,module,exports){
'use strict';
//Selector de niveles

var lvlSelector = {
    
    create: function () {
        var beep;
        var fondo = this.game.add.image(0, 0, 'lvlSelector');
        function start() {
            beep.play();
            this.game.state.start('play');
        }
        function lvl2() {
            beep.play();
            this.game.state.start('lvl2_1');
        }
        function back() {
            beep.play();
            this.game.state.start('menu');
        }
        this.lvl1 = this.game.add.button(280, 25, 'aux', start);
        this.lvl1.alpha = 0;
        this.lvl2 = this.game.add.button(280, 325, 'aux', lvl2);
        this.lvl2.alpha = 0;
        this.back = this.game.add.button(30, 15, 'aux', back);
        this.back.scale.setTo(.5, .5);
        this.back.alpha = 0;

        beep = this.game.add.audio('beep');
    },
    update: function () {

    }
}
module.exports = lvlSelector;
},{}],14:[function(require,module,exports){
'use strict';
//Añadimos el script de escena 
var PlayScene = require('./Lvl1_1.js');
var lvl02_01 = require('./Lvl2_1.js');
var menu = require('./mainMenu.js');
var lvlmenu = require('./lvlSelector.js');
var tutorial = require('./tuto.js');
var interLvl = require('./interLevel.js');
var finalLvl = require('./finalLevel.js');
var GameOver = require('./GameOver.js');
var GameOver1 = require('./GameOver1.js');
//Se ejecuta primero
var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};
//Aquí se cargaran todas las imagenes y tiles que usaremos. 
var PreloaderScene = {
  //Se ejecuta al principio
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.stage.backgroundColor = '#000000';
    this.game.load.image('logo', 'GameArt/Gafas.jpg');
    this.game.load.tilemap('test', 'images/Test.csv');

    //Lvl1-1
    this.game.load.tilemap('Lvl1_1_7', 'images/CSV/Lvl1_1_Hab.csv')
    this.game.load.tilemap('Lvl1_1_6', 'images/CSV/Lvl1_1_Door.csv');
    this.game.load.tilemap('Lvl1_1_5', 'images/CSV/Lvl1_1_Cositis2.csv');
    this.game.load.tilemap('Lvl1_1_4', 'images/CSV/Lvl1_1_Cositis.csv');
    this.game.load.tilemap('Lvl1_1_3', 'images/CSV/Lvl1_1_Muebles.csv');
    this.game.load.tilemap('Lvl1_1_2', 'images/CSV/Lvl1_1_Sobresuelo.csv');
    this.game.load.tilemap('Lvl1_1_1', 'images/CSV/Lvl1_1_Suelo.csv');

    //Lvl2-1
    this.game.load.tilemap('Lvl2_1_7', 'images/CSV/Lvl2_1_Hab.csv')
    this.game.load.tilemap('Lvl2_1_6', 'images/CSV/Lvl2_1_Door.csv');
    this.game.load.tilemap('Lvl2_1_5', 'images/CSV/Lvl2_1_Cositis2.csv');
    this.game.load.tilemap('Lvl2_1_4', 'images/CSV/Lvl2_1_Cositis.csv');
    this.game.load.tilemap('Lvl2_1_3', 'images/CSV/Lvl2_1_Muebles.csv');
    this.game.load.tilemap('Lvl2_1_2', 'images/CSV/Lvl2_1_Sobresuelo.csv');
    this.game.load.tilemap('Lvl2_1_1', 'images/CSV/Lvl2_1_Suelo.csv');

    //Imagenes de tiles
    this.load.image('deco1', 'images/decoraciones1.png');
    this.load.image('suelo', 'images/suelo_pixel_art.png');
    this.load.image('paredes', 'images/mas_tile_set.png');
    this.load.image('objetos', 'images/decoraciones2.png');


    //Personajes
    this.load.spritesheet('player', 'images/Sprites Sam Fisher prueba2.png', 54, 62);
    this.load.image('bullet', 'images/bullet.png');
    this.load.image('aux', 'images/bloque1.jpg');
    this.load.image('cono', 'images/Conito.png');
    //Items
    this.load.spritesheet('tarjet', 'images/tarjetaLlave.png', 500, 339);
    this.load.spritesheet('documents', 'images/documents.png', 250, 311);

    //Enemigos
    this.load.spritesheet('enemy', 'images/Enemigo sprite.png', 58, 65)

    //UI
    this.load.spritesheet('UI', 'images/UI SpriteSheet.png', 800, 50);
    this.load.image('smoke', 'images/humo.png')

    //Pantalla inicial
    this.load.image('inicial', 'images/pantalla inicial.png');
    this.load.image('press', 'images/PressHere.png');
    //Menu
    this.load.image('mainMenu', 'images/MainMenu.png');
    this.load.image('lvlSelector', 'images/SelectorLevels.png');
    this.load.image('nextLvl', 'images/nextLevel.png');
    this.load.image('try', 'images/tryAgain.png');
    this.load.image('interLvl', 'images/MediaPantalla.png');
    this.load.image('return', 'images/returnToMenu.png');
    this.load.image('perder', 'images/perderPantalla.png');
    this.load.image('complu', 'images/EscudoComplutense.png');
    this.load.image('exit', 'images/Exit.png');
    this.load.image('up', 'images/Up.png');
    this.load.image('down', 'images/Down.png');
    this.load.image('dark','images/prueba.jpg');


    //Audios
    this.game.load.audio('die', 'images/SoundEffects/die.wav');
    this.game.load.audio('door', 'images/SoundEffects/openDoor.wav');
    this.game.load.audio('silenced', 'images/SoundEffects/silenced.wav');
    this.game.load.audio('taser', 'images/SoundEffects/taser.wav');
    this.game.load.audio('shoot', 'images/SoundEffects/shoot.wav');
    this.game.load.audio('paper', 'images/SoundEffects/papeles.wav');
    this.game.load.audio('key', 'images/SoundEffects/key.wav');
    this.game.load.audio('mission', 'images/SoundEffects/mission.wav');
    this.game.load.audio('escalera', 'images/SoundEffects/escalera.wav');
    this.game.load.audio('light', 'images/SoundEffects/lightsOff.wav');
    this.game.load.audio('failed', 'images/SoundEffects/failed.wav');
    this.game.load.audio('beep', 'images/SoundEffects/beep.wav');
    this.game.load.audio('buttonAudio', 'images/SoundEffects/buttonAudio.wav');
    this.game.load.audio('tick', 'images/SoundEffects/tick.wav');
    //Music
    this.game.load.audio('levelMusic', 'images/music/level.mp3');
    this.game.load.audio('mainTrack', 'images/music/mainTrack.mp3');
    this.game.load.audio('win', 'images/music/win.mp3');

  },
  //Llamamos a playscene
  create: function () {
    this.game.state.start('menu');
  }
};

//Se ejecuta al principio, creando el juego, añadiendo los estados y comenzando en el boot
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  ///2400, 2450
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('lvl2_1', lvl02_01);
  game.state.add('menu', menu);
  game.state.add('lvlSel', lvlmenu);
  game.state.add('tuto', tutorial);
  game.state.add('inter', interLvl);
  game.state.add('finalLvl', finalLvl);
  game.state.add('gameover', GameOver);
  game.state.add('gameover1', GameOver1);

  game.state.start('boot');
};
},{"./GameOver.js":2,"./GameOver1.js":3,"./Lvl1_1.js":5,"./Lvl2_1.js":6,"./finalLevel.js":10,"./interLevel.js":12,"./lvlSelector.js":13,"./mainMenu.js":15,"./tuto.js":20}],15:[function(require,module,exports){
'use strict';

//Menú principa en el que crearemos ciertos botones

var mainMenu = {
    create: function () {
        var music;
        var beep;
        var fondo = this.game.add.image(0, 0, 'mainMenu');
        var complu = this.game.add.image(695, 10, 'complu');
        complu.scale.setTo(.15, .15);
        function start() {
            music.stop();
            beep.play();
            this.game.state.start('tuto');
        };
        function lvlmen() {
            music.stop();
            beep.play();
            this.game.state.start('lvlSel');
        }
        this.newGame = this.game.add.button(75, 300, 'aux', start);
        this.newGame.alpha = 0;
        this.lvlSelect = this.game.add.button(500, 300, 'aux', lvlmen);
        this.lvlSelect.alpha = 0;

        music = this.game.add.audio('mainTrack');

        beep = this.game.add.audio('beep');

        music.loopFull(.1);
    },
    update: function () {

    }
}
module.exports = mainMenu;
},{}],16:[function(require,module,exports){
'use strict';

var Character = require('./character.js');

//Constructora
function Map(nombreTilemap, tamX, tamY, tilesetImage, game, doors, row, col) {

    this.tileMap = game.add.tilemap(nombreTilemap, tamX, tamY);
    this.tamX = tamX;
    this.tamY = tamY;
    this.tileMap.addTilesetImage(tilesetImage);
    this.layer = this.tileMap.createLayer(0);
    this.layer.resizeWorld();
    this.hasDoors = doors;
    this.row = row;
    this.col = col;
}
Map.prototype.constructor = Map;

//Inicializamos
Map.prototype.ini = function () {
    var aux = 0;
    //Puertas
    if (this.hasDoors) {

        this.doors = [];
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                if (this.tileMap.getTile(i, j, this.layer, true).index == 148 || this.tileMap.getTile(i, j, this.layer, true).index == 145) {

                    this.doors.push({ x: this.tileMap.getTile(i, j, this.layer, true).worldX, y: this.tileMap.getTile(i, j, this.layer, true).worldY });
                    aux++;

                }

            }
        }
        aux = 0;
        this.magneticDoors = [];
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                if (this.tileMap.getTile(i, j, this.layer, true).index == 568 || this.tileMap.getTile(i, j, this.layer, true).index == 565) {

                    this.magneticDoors.push({ x: this.tileMap.getTile(i, j, this.layer, true).worldX, y: this.tileMap.getTile(i, j, this.layer, true).worldY });
                    aux++;

                }
            }
        }
    }

    this.positions1 = [{ x: 24, y: 34 }, { x: 18, y: 23 }];

}
//Devuelve la capa que se está usando
Map.prototype.returnLayer = function () {
    return this.layer;
}
Map.prototype.returnMap = function () {
    return this;
}
//Ponemos colisiones
Map.prototype.collisions = function (col1, col2) {
    this.tileMap.setCollisionBetween(col1, col2);
}
//Destruye las puertas
Map.prototype.open = function (x, y, map7) {

    if (this.tileMap.getTileAbove(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x, y - 1, this.tileMap.getLayer());
    }
    else if (this.tileMap.getTileBelow(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x, y + 1, this.tileMap.getLayer());
    }
    else if (this.tileMap.getTileLeft(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x - 1, y, this.tileMap.getLayer());
    }
    else if (this.tileMap.getTileRight(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x + 1, y, this.tileMap.getLayer());
    }
    this.tileMap.removeTile(x, y, this.tileMap.getLayer());
    this.light(x, y);
}
Map.prototype.light = function (x, y) {
    if (this.tileMap.getTileAbove(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x, y, this.tileMap.getLayer());
        this.light(x , y - 1);
    }
    if (this.tileMap.getTileBelow(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x, y, this.tileMap.getLayer());
        this.light(x , y+ 1);
    }
    if (this.tileMap.getTileLeft(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x, y, this.tileMap.getLayer());
        this.light(x - 1, y);
    }
    if (this.tileMap.getTileRight(this.tileMap.getLayer(), x, y).index != -1) {

        this.tileMap.removeTile(x, y, this.tileMap.getLayer());
        this.light(x + 1, y);
    }
    else this.tileMap.removeTile(x, y, this.tileMap.getLayer());
}

module.exports = Map;

},{"./character.js":8}],17:[function(require,module,exports){
'use strict';

var Character = require('./character.js')
var Map = require('./map.js');
var Hand = require('./hand.js');
var mg = require('./tarjetaLlave.js');

//El personaje del jugador

//Items : 1 = lockpick | 2 = taser | 3 = cable | 4 = gun  | 5 = hand 
function Player(x, y, key, doc, it, sprite, game, lvl) {
    Character.call(this, game, x, y, sprite);
    this.isMoving = false;
    this.magneticKey = key;
    this.documents = doc;
    this.items = it;
    this.game = game;
    this.lvl = lvl;

}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

//Inicialización

Player.prototype.ini = function () {

    this.alive = true;

    //Animaciones
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(25, 30, 15, 15);
    this.animations.add('idle', [0], 1, true);
    this.animations.add('walk', [11, 12, 13, 14], 7, true);
    this.animations.add('taser', [0, 1, 2], 10, false);
    this.animations.add('gun', [22, 23, 24, 25], 10, false);
    this.animations.add('hand', [4, 5, 6], 4, false);
    this.animations.add('optical', [4, 7], 4, false);
    this.animations.add('dead', [30], 1, false);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.distance = 0;
    this.speed = 300;

    this.actionButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.eKey = this.game.input.keyboard.addKey(Phaser.KeyCode.FIVE);
    this.rKey = this.game.input.keyboard.addKey(Phaser.KeyCode.FOUR);
    this.ckey = this.game.input.keyboard.addKey(Phaser.KeyCode.THREE)
    this.tKey = this.game.input.keyboard.addKey(Phaser.KeyCode.TWO);
    this.lKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ONE);
    //weapon

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.setBulletFrames(0, 60, true);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 1000;

    this.weapon.trackSprite(this, (this.x / 2), (this.y / 2), true);
    this.weapon.bulletCollideWorldBounds = true;

    this.body.allowGravity = false;
    this.body.immovable = true;

    this.fireTime = this.game.time.physicsElapsed;

    //Mano
    this.hand = new Hand(this.game, 20, 0, 'aux');
    this.hand.ini();

    this.addChild(this.hand);

    //Audio
    this.audiodead = this.game.add.audio('die');
    this.Opendoor = this.game.add.audio('door');
    this.silenced = this.game.add.audio('silenced');
    this.audiotaser = this.game.add.audio('taser');
    this.audiopaper = this.game.add.audio('paper');
    this.audiokey = this.game.add.audio('key');

    this.audiotick = this.game.add.audio('tick');


}
Player.prototype.moveCharacter = function () {
    //COmprueba si se esta pulsando el boton del ratón, y si ha pasado suficiente tiempo desde que se ha disparado
    if (this.game.input.mousePointer.isDown && this.fireTime - 500 <= this.game.time.now) {
        this.xDestine = this.game.input.mousePointer.worldX;
        this.yDestine = this.game.input.mousePointer.worldY;
        console.log(this.xDestine + " , " + this.yDestine)
        this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));
        this.rotation = this.game.physics.arcade.moveToPointer(this, this.speed, this.game.input);
        //console.log(this.xDestine );
        this.animations.play('walk');
    }
    this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));




}
//Colisiones
Player.prototype.checkCollision = function (layer4, layer3, layer6) {
    if (this.distance <= this.speed / this.game.time.physicsElapsedMS) { // una constante o variable (algo qe sea el incremento de movimiento)
        this.body.velocity.setTo(0, 0);
        this.animations.stop('walk');
    }

    if (Phaser.Rectangle.contains(this.body, this.game.input.x, this.game.input.y)) {
        this.body.velocity.setTo(0, 0);
        this.animations.stop('walk');
    }
    if (this.game.physics.arcade.collide(this, layer4)) {
        this.body.velocity.setTo(0, 0);
        this.animations.stop('walk');
    }
    if (this.game.physics.arcade.collide(this, layer3)) {
        this.body.velocity.setTo(0, 0);
        this.animations.stop('walk');
    }
    if (this.game.physics.arcade.collide(this, layer6)) {
        this.body.velocity.setTo(0, 0);
        this.animations.stop('walk');
    }

}
//Colisiones de las balas con las paredes
Player.prototype.bulletHitWall = function (layer3, layer4, layer6, enemys) {
    // console.log(this.weapon.bullets);
    var player = this;
    for (var i in enemys) { player.game.physics.arcade.collide(this, enemys[i]); }
    this.weapon.bullets.forEach(function (bullet) {
        bullet.body.setSize(0, 0, 50, 50);
        if (player.game.physics.arcade.collide(bullet, layer3) || player.game.physics.arcade.collide(bullet, layer4)
            || player.game.physics.arcade.collide(bullet, layer6)) { bullet.kill() }
        else {
            for (var i in enemys) {
                if (player.game.physics.arcade.collide(bullet, enemys[i])) { enemys[i].killed(); bullet.kill(); }
            }
        }
    }
    );
}

Player.prototype.recogeInput = function (map6, layer6, tarjeta, documents, enemys, map7) {
    //Elegir arma
    if (this.eKey.justDown) {
        this.items = 4
        this.audiotick.play();
    }
    //Elegir cable optico
    if (this.ckey.justDown) {
        this.items = 3;
        this.audiotick.play();
    }
    //Elegir mano
    else if (this.rKey.justDown) {
        this.items = 5;
        this.audiotick.play();
    }
    //Elegir taser
    else if (this.tKey.justDown) {
        this.items = 2;
        this.audiotick.play();
    }
    //Elegir ganzua
    else if (this.lKey.justDown) {
        this.items = 1;
        this.audiotick.play();
    }
    //Ejecuta una accion dependiendo del item seleccionado
    else if (this.actionButton.justDown && this.fireTime <= this.game.time.now) {
        this.body.velocity.setTo(0, 0);
        switch (this.items) {
            case 5:
                this.shoot();
                //Creamos esta variable para que solo haga la animación de disparar de acuerdo al time rate  
                this.fireTime = this.game.time.now + this.weapon.fireRate;
                break;
            case 4:
                this.animations.play('hand');
                if (tarjeta != undefined && !this.magneticKey) {
                    this.recogeLlave(tarjeta);
                }
                if (documents != undefined && !this.documents) {

                    this.recogeDocumento(documents);

                }
                this.fireTime = this.game.time.now + 1500;
                break;
            case 3:
                this.animations.play('optical');
                this.optical(map6, map7);
                this.fireTime = this.game.time.now + 1500;
                break;
            case 2:
                this.taseEnemy(enemys);
                this.animations.play('taser');
                this.fireTime = this.game.time.now + 1000;
                break;
            case 1:
                this.open(map6, map7);
                this.animations.play('hand');
                this.fireTime = this.game.time.now + 1500;

        }
    }
}
Player.prototype.optical = function (map6, map7) {
    for (var i = 0; i < map6.doors.length; i++) {

        if ((this.hand.body.x + this.hand.width / 2) > map6.doors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.doors[i].x + 48)
            && (this.hand.body.y + this.hand.width / 2) > (map6.doors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.doors[i].y + 48)) {

            map7.light((map6.doors[i].x) / 48, map6.doors[i].y / 48);

        }
    }
    if (this.magneticKey == true) {
        for (var i = 0; i < map6.magneticDoors.length; i++) {
            if ((this.hand.body.x + this.hand.width / 2) > map6.magneticDoors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.magneticDoors[i].x + 48)
                && (this.hand.body.y + this.hand.width / 2) > (map6.magneticDoors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.magneticDoors[i].y + 48)) {

                map7.light((map6.magneticDoors[i].x) / 48, map6.magneticDoors[i].y / 48);

            }
        }
    }
}
Player.prototype.recogeLlave = function (tarjeta) {

    if (Phaser.Rectangle.intersects(this.hand.getBounds(), tarjeta.getBounds())) {
        this.magneticKey = true;
        console.log(this.magneticKey);
        this.audiopaper.play();
        tarjeta.kill();
    }
}
Player.prototype.recogeDocumento = function (documents) {

    if (Phaser.Rectangle.intersects(this.hand.getBounds(), documents.getBounds())) {
        this.documents = true;
        console.log(this.papeles);
        this.audiopaper.play();
        documents.kill();
    }
}
Player.prototype.taseEnemy = function (enemys) {
    this.audiotaser.play();
    for (var i in enemys) {
        if (Phaser.Rectangle.intersects(this.hand.getBounds(), enemys[i].getBounds())) {

            enemys[i].killed();
        }
    }
}
Player.prototype.shoot = function () {
    this.weapon.fire(this.body.center);
    this.animations.play('gun');
    this.silenced.play();
}
Player.prototype.returnItem = function () {

    return this.items;
}
Player.prototype.getKilled = function () {

    this.body.velocity.setTo(0, 0);
    this.animations.play('idle');
    this.game.time.events.add(300, function () { this.animations.play('dead'); this.audiodead.play(); }, this);
    this.alive = false;
    this.game.time.events.add(2000, function () { if (this.lvl == 1) { this.game.state.start('gameover'); } else if (this.lvl == 2) { this.game.state.start('gameover1'); } }, this);

}
//Necesario para algunos calls
Player.prototype.returnPlayer = function () {
    return this;
}
//Abrir puertas
Player.prototype.open = function (map6, map7) {
    this.animations.play('hand');

    for (var i = 0; i < map6.doors.length; i++) {

        if ((this.hand.body.x + this.hand.width / 2) > map6.doors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.doors[i].x + 48)
            && (this.hand.body.y + this.hand.width / 2) > (map6.doors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.doors[i].y + 48)) {

            this.game.time.events.add(Phaser.Timer.SECOND / 2, map6.open, map6, map6.doors[i].x / 48, map6.doors[i].y / 48);
            map7.light((map6.doors[i].x) / 48, map6.doors[i].y / 48);
            this.Opendoor.play();

        }
    }
    if (this.magneticKey == true) {
        for (var i = 0; i < map6.magneticDoors.length; i++) {
            if ((this.hand.body.x + this.hand.width / 2) > map6.magneticDoors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.magneticDoors[i].x + 48)
                && (this.hand.body.y + this.hand.width / 2) > (map6.magneticDoors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.magneticDoors[i].y + 48)) {

                this.game.time.events.add(Phaser.Timer.SECOND / 2, map6.open, map6, map6.magneticDoors[i].x / 48, map6.magneticDoors[i].y / 48);
                map7.light((map6.magneticDoors[i].x) / 48, map6.magneticDoors[i].y / 48);
                this.audiokey.play();

            }
        }
    }
}

Player.prototype.returnDocument = function () {

    return this.documents;
}

Player.prototype.returnKey = function () {

    return this.magneticKey;
}


Player.prototype.update = function (layer4, layer3, layer6, map6, tarjeta, documents, enemys, map7) {
    if (this.alive) {
        this.moveCharacter();
        this.recogeInput(map6, layer6, tarjeta, documents, enemys, map7);
        this.checkCollision(layer4, layer3, layer6);
        this.bulletHitWall(layer3, layer4, layer6, enemys);
    }


}



module.exports = Player;
},{"./character.js":8,"./hand.js":11,"./map.js":16,"./tarjetaLlave.js":18}],18:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

//Tarjeta necesaria para abrir puertas magnéticas

function tarjetaLlave(game, x, y, sprite, w, h) {
    Character.call(this, game, x, y, sprite);
    this.scale.setTo(w, h);

}

tarjetaLlave.prototype = Object.create(Character.prototype);
tarjetaLlave.prototype.constructor = tarjetaLlave;

tarjetaLlave.prototype.ini = function () {
    this.game.add.existing(this);
    this.animations.add('shine', [0, 1], 2, true);
    this.animations.play('shine');
    // this.game.physics.arcade.enable(this);

}

module.exports = tarjetaLlave;
},{"./character.js":8}],19:[function(require,module,exports){
'use strict';
var Character = require('./character.js');
//Sprites invisibles para ejecutar acciones 
function triggerSprite(game, x, y, sprite, w, h, a) {
    Character.call(this, game, x, y, sprite);
    this.scale.setTo(w, h);
    this.able = a;
}

triggerSprite.prototype = Object.create(Character.prototype);
triggerSprite.prototype.constructor = triggerSprite;

triggerSprite.prototype.disable = function () {
    this.able = false;
}
triggerSprite.prototype.enable = function () {
    this.able = true;
}
triggerSprite.prototype.able = function () {
    return this.able;
}
triggerSprite.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.alpha = 0;
}

module.exports = triggerSprite;
},{"./character.js":8}],20:[function(require,module,exports){
'use strict';

//Tutorial
var tuto = {
    create: function () {
        var beep;
        var fondo = this.game.add.image(0, 0, 'inicial');
        function start() {
            beep.play();
            this.game.state.start('play');
        };

        this.continue = this.game.add.button(685, 510, 'press', start);
        this.continue.scale.setTo(.1, .1);

        beep = this.game.add.audio('beep');
    },
    update: function () {
        if (Phaser.Rectangle.containsPoint(this.continue, this.game.input.mousePointer)) {
            this.continue.scale.setTo(.11, .11);
        }
        else this.continue.scale.setTo(.1, .1);
    }
}
module.exports = tuto;
},{}]},{},[14]);
