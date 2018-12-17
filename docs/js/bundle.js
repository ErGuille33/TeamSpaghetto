(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var Character = require('./character.js')
var Player = require('./player.js')
var Hand = require('./VisionCone.js');

function Enemy(x, y, KO, Look, posiciones, speed, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.ko = KO;
    this.look = Look;
    this.sPeed = speed;
    this.positions = posiciones
    this.game = game;
}
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.ini = function () {

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(25, 30, 15, 15);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.auxi = 0;

    this.animations.add('walk', [0, 1, 2, 3], 7, true);
    this.animations.add('shoot', [5, 6, 7, 8], 7, false);
    this.animations.add('dead', [9], 1, false);

    this.coneOfVision = new coneOfVision(this.game, 20, 0, 'aux');
    this.coneOfVision.ini();

    this.addChild(this.coneOfVision);

}

Enemy.prototype.moveEnemy = function () {

    if (!this.ko && !this.look) {
        if (this.x != positions[auxi].x && this.y != positions[auxi].x) {
            this.xDestine = positions[i].x;
            this.yDestine = positions[i].y;
            this.moveToXY(this.Enemy, this.xDestine, this.yDestine, this.speed)
            if (look == false) this.rotation = this.game.physics.arcade.moveToXY(this, this.positions[1].x, this.positions[1].y, this.speed);
            else {
            this.rotation = this.game.physics.arcade.moveToXY(this, Player.x, Player.y, this.speed);
                this.animations.play('walk');
            }
        } else if (auxi < positions.length) {
            auxi++;
        } else auxi = 0;
    } else {
        this.body.velocity.setTo(0, 0);
        this.animations.play('dead');
    }
}

Enemy.prototype.gotHit = function () {
    //if (this.checkOverlap(this.sprite, 'bullet')) this.ko = true;
}

Enemy.prototype.playerDetected = function () {
    if (this.checkOverlap('aux', 'player')) look = true;
}

Enemy.prototype.checkOverlap = function (spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

Enemy.prototype.update = function () {
    this.playerDetected();
    this.gotHit();
    this.moveEnemy();
}

module.exports = Enemy;
},{"./VisionCone.js":6,"./character.js":7,"./player.js":14}],2:[function(require,module,exports){
'use strict';
var Character = require('./character.js')
var Player = require('./player.js')


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

    this.document = this.game.add.sprite(650,552,'documents');
    this.document.scale.setTo(.15,.15);
    this.document.fixedToCamera = true;
    this.document.alpha = 0;
    this.game.add.existing(this.document);

    this.tarjet = this.game.add.sprite(730, 560, 'tarjet');
    this.tarjet.scale.setTo(.075,.075);
    this.tarjet.fixedToCamera = true;
    this.tarjet.alpha = 0;
    this.game.add.existing(this.tarjet);

}

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

    if (this.hasDoc){
        this.document.alpha = 1;
    }else if (this.hasDoc != undefined)this.document.alpha = 0;

    if (this.hasMag){
        this.tarjet.alpha = 1;
    }else if (this.hasMag != undefined)this.tarjet.alpha = 0;

}
module.exports = Interface;

},{"./character.js":7,"./player.js":14}],3:[function(require,module,exports){
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
},{"./Enemy.js":1,"./Interface.js":2,"./documentos.js":8,"./map.js":13,"./player.js":14,"./tarjetaLlave.js":15,"./triggerSprite.js":16}],4:[function(require,module,exports){
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
    //148, 1101
    this.Sam = new Player(148, 1101, false, false, 5, 'player', this.game);
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

    this.lastFloor = new tspr(this.game, 7000, 1937, 'aux', .2, 1.4);
    this.lastFloor.ini();

    this.checkIntersects = function(){
      if(Phaser.Rectangle.intersects(this.Sam,this.nextLvl)){
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.animations.stop('walk');
        this.Sam.x = 6848;
        this.Sam.y = 1938;
        this.Sam.angle = 180;
      }
      else if(Phaser.Rectangle.intersects(this.Sam,this.lastFloor)){
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.body.velocity.setTo(0, 0);
        this.Sam.animations.stop('walk');
        this.Sam.x = 2130;
        this.Sam.y = 1725;
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


},{"./Interface.js":2,"./documentos.js":8,"./map.js":13,"./player.js":14,"./tarjetaLlave.js":15,"./triggerSprite.js":16}],5:[function(require,module,exports){
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
    this.interfaz.ini();
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
    this.interfaz.update(this.Sam.retDoc(), this.Sam.retKey());
  },
};

module.exports = Lvl2_2;


},{"./Interface.js":2,"./map.js":13,"./player.js":14,"./tarjetaLlave.js":15,"./triggerSprite.js":16}],6:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

function coneOfVision(game, x, y, sprite) {
    Character.call(this, game, x, y, sprite);
}
coneOfVision.prototype = Object.create(Character.prototype);
coneOfVision.prototype.constructor = coneOfVision;

coneOfVision.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.scale.setTo(1, 1);
    this.alpha = .1;
}

module.exports = coneOfVision;
},{"./character.js":7}],7:[function(require,module,exports){
'use strict';

function Character(game, x, y, sprite) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5, 0.5);
    
}
Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;
module.exports = Character;

},{}],8:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

function documentos(game, x, y, sprite, w, h)
{
    Character.call(this,game,x,y,sprite);
    this.scale.setTo(w,h);

} 

documentos.prototype = Object.create(Character.prototype);
documentos.prototype.constructor = documentos;

documentos.prototype.ini = function () {
    this.game.add.existing(this);
    this.animations.add('shine',[0,1],2,true);
    this.animations.play('shine');
   // this.game.physics.arcade.enable(this);
    
}

module.exports = documentos;
},{"./character.js":7}],9:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

function Hand(game, x, y, sprite)
{
    Character.call(this,game,x,y,sprite);
} 

Hand.prototype = Object.create(Character.prototype);
Hand.prototype.constructor = Hand;

Hand.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.scale.setTo(.2,.2);
    this.alpha = 0;
}

module.exports = Hand;
},{"./character.js":7}],10:[function(require,module,exports){
'use strict';
var mainMenu = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'lvlSelector');
       function start (){
        this.game.state.start('play');
       }
       function lvl2 (){
        this.game.state.start('lvl2_1');
    }
    function back (){
        this.game.state.start('menu');
    }
       this.lvl1 = this.game.add.button(280,25,'aux',start);
       this.lvl1.alpha = 0;
       this.lvl2 = this.game.add.button(280,325,'aux',lvl2);
       this.lvl2.alpha = 0;
       this.back = this.game.add.button(30,15,'aux',back);
       this.back.scale.setTo(.5,.5);
       this.back.alpha = 0;
    },
    update : function(){

    }
}
module.exports = mainMenu;
},{}],11:[function(require,module,exports){
'use strict';
//Añadimos el script de escena 
var PlayScene = require('./Lvl1_1.js');
var lvl02_01 = require('./Lvl2_1.js');
var lvl02_02 = require('./Lvl2_2.js');
var menu = require ('./mainMenu.js');
var lvlmenu = require('./lvlSelector.js');
var tutorial = require('./tuto.js')
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
    this.game.load.tilemap('Lvl1_1_6', 'images/CSV/Lvl1_1_Door.csv');
    this.game.load.tilemap('Lvl1_1_5', 'images/CSV/Lvl1_1_Cositis2.csv');
    this.game.load.tilemap('Lvl1_1_4', 'images/CSV/Lvl1_1_Cositis.csv');
    this.game.load.tilemap('Lvl1_1_3', 'images/CSV/Lvl1_1_Muebles.csv');
    this.game.load.tilemap('Lvl1_1_2', 'images/CSV/Lvl1_1_Sobresuelo.csv');
    this.game.load.tilemap('Lvl1_1_1', 'images/CSV/Lvl1_1_Suelo.csv');

    //Lvl2-1
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
    //Items
    this.load.spritesheet('tarjet', 'images/tarjetaLlave.png',500,339);
    this.load.spritesheet('documents','images/documents.png',250,311);

    //Enemigos
    this.load.spritesheet('enemy', 'images/Enemigo sprite.png', 58, 65)
    
    //UI
    this.load.spritesheet('UI', 'images/UI SpriteSheet.png', 800, 50);

    //Pantalla inicial
    this.load.image ('inicial', 'images/pantalla inicial.png');
    this.load.image ('press', 'images/PressHere.png');
    //Menu
    this.load.image('mainMenu', 'images/MainMenu.png');
    this.load.image('lvlSelector', 'images/SelectorLevels.png');
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
  game.state.add('lvl2_2', lvl02_02);
  game.state.add('menu', menu);
  game.state.add('lvlSel', lvlmenu);
  game.state.add('tuto', tutorial)

  game.state.start('boot');
};
},{"./Lvl1_1.js":3,"./Lvl2_1.js":4,"./Lvl2_2.js":5,"./lvlSelector.js":10,"./mainMenu.js":12,"./tuto.js":17}],12:[function(require,module,exports){
'use strict';
var mainMenu = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'mainMenu');
       function start (){
        this.game.state.start('tuto');
       };
       function lvlmen (){
           this.game.state.start('lvlSel');
       }
       this.newGame = this.game.add.button(75,300,'aux',start);
       this.newGame.alpha = 0;
       this.lvlSelect = this.game.add.button(500,300,'aux',lvlmen);
       this.lvlSelect.alpha = 0;
    },
    update : function(){

    }
}
module.exports = mainMenu;
},{}],13:[function(require,module,exports){
'use strict';

var Character = require('./character.js');

//State : True = open, false = close
//Metallic : True = metallic , false = not metallic

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

Map.prototype.ini = function () {
    var aux = 0;
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
Map.prototype.returnLayer = function () {
    return this.layer;
}
Map.prototype.collisions = function (col1, col2) {
    this.tileMap.setCollisionBetween(col1, col2);
}

Map.prototype.open = function (x, y) {

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

}

module.exports = Map;

},{"./character.js":7}],14:[function(require,module,exports){
'use strict';

var Character = require('./character.js')
var Map = require('./map.js');
var Hand = require('./hand.js');
var mg = require('./tarjetaLlave.js');

//Items : 1 = lockpick | 2 = taser | 3 = cable | 4 = gun  | 5 = hand 
function Player(x, y, key, doc, it, sprite, game) {
    Character.call(this, game, x, y, sprite);
    this.isMoving = false;
    this.magneticKey = key;
    this.documents = doc;
    this.items = it;
    this.game = game;
    // this.eT = tarj;

    // this.papeles = papeles;
}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.ini = function () {

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(25, 30, 15, 15);
    this.animations.add('idle', [0], 1, true);
    this.animations.add('walk', [11, 12, 13, 14], 7, true);
    this.animations.add('taser', [0, 1, 2], 10, false);
    this.animations.add('gun', [22, 23, 24, 25], 10, false);
    this.animations.add('hand', [4, 5, 6], 4, false);
    this.animations.add('dead', [31, 32], 1, false);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.distance = 0;
    this.speed = 300;

    this.actionButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.eKey = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
    this.rKey = this.game.input.keyboard.addKey(Phaser.KeyCode.R);
    //weapon

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.setBulletFrames(0, 60, true);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 1000;
    
    this.weapon.trackSprite(this, (this.x / 2), (this.y / 2), true);
    this.weapon.bulletCollideWorldBounds = true;
    

    //this.weapon.bullets.enableBody = true;
    //this.weapon.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.fireTime = this.game.time.physicsElapsed;

    this.hand = new Hand(this.game, 20, 0, 'aux');
    this.hand.ini();

    this.addChild(this.hand);


}
Player.prototype.moveCharacter = function () {
    //COmprueba si se esta pulsando el boton del ratón, y si ha pasado suficiente tiempo desde que se ha disparado
    if (this.game.input.mousePointer.isDown && this.fireTime - 500 <= this.game.time.now) {
        this.xDestine = this.game.input.mousePointer.worldX;
        this.yDestine = this.game.input.mousePointer.worldY;
        this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));
        this.rotation = this.game.physics.arcade.moveToPointer(this, this.speed, this.game.input);
        //console.log(this.xDestine );
        this.animations.play('walk');
    }
    this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));
    // this.distance = this.world.width - this.world.width + this.x;




}
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
Player.prototype.bulletHitWall = function (layer3,layer4,layer6) {
    // console.log(this.weapon.bullets);
    var player = this;
    this.weapon.bullets.forEach(function (bullet) { 
        bullet.body.setSize(0,0,  50,50);
        if (player.game.physics.arcade.collide(bullet, layer3) || player.game.physics.arcade.collide(bullet, layer4) 
        || player.game.physics.arcade.collide(bullet, layer6)) 
        { bullet.kill() } 
    }
    );
}
Player.prototype.recogeInput = function (map6, layer6, tarjeta, documents) {

    if (this.eKey.justDown) {
        this.items = 4
        console.log("jand");
    }
    else if (this.rKey.justDown) {
        this.items = 5;
        console.log("shut");
    }
    else if (this.actionButton.justDown && this.fireTime <= this.game.time.now) {
        this.body.velocity.setTo(0, 0);
        switch (this.items) {
            case 5:
                this.shoot();
                //Creamos esta variable para que solo haga la animación de disparar de acuerdo al time rate  
                this.fireTime = this.game.time.now + this.weapon.fireRate;
                break;
            case 4:
                this.open(map6);
                if (tarjeta != undefined && !this.magneticKey) {
                    this.recogeLlave(tarjeta);
                }
                if (documents != undefined && !this.documents) {
                    console.log("yas")
                    this.recogeDocumento(documents);
                }
                this.fireTime = this.game.time.now + 1500;
                break;

        }
    }
}
Player.prototype.recogeLlave = function (tarjeta) {

    if (Phaser.Rectangle.intersects(this.hand.getBounds(), tarjeta.getBounds())) {
        this.magneticKey = true;
        console.log(this.magneticKey);

        tarjeta.kill();
    }
}
Player.prototype.recogeDocumento = function (documents) {

    if (Phaser.Rectangle.intersects(this.hand.getBounds(), documents.getBounds())) {
        this.documents = true;
        console.log(this.papeles);

        documents.kill();
    }
}
Player.prototype.shoot = function () {
    this.weapon.fire(this.body.center);
    this.animations.play('gun');
}
Player.prototype.returnItem = function(){

   return this.items;
}
Player.prototype.open = function (map6) {
    this.animations.play('hand');

    console.log(this.hand.body.x + 24);
    console.log(map6.doors[3].x);
    console.log(map6.doors[3].x + 48);
    console.log(this.hand.body.y + 24);
    console.log(map6.doors[3].y);
    console.log(map6.doors[3].y + 48);

    for (var i = 0; i < map6.doors.length; i++) {

        if ((this.hand.body.x + this.hand.width / 2) > map6.doors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.doors[i].x + 48)
            && (this.hand.body.y + this.hand.width / 2) > (map6.doors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.doors[i].y + 48)) {

            this.game.time.events.add(Phaser.Timer.SECOND / 2, map6.open, map6, map6.doors[i].x / 48, map6.doors[i].y / 48);


        }
    }
    if (this.magneticKey == true) {
        for (var i = 0; i < map6.magneticDoors.length; i++) {
            if ((this.hand.body.x + this.hand.width / 2) > map6.magneticDoors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.magneticDoors[i].x + 48)
                && (this.hand.body.y + this.hand.width / 2) > (map6.magneticDoors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.magneticDoors[i].y + 48)) {

                this.game.time.events.add(Phaser.Timer.SECOND / 2, map6.open, map6, map6.magneticDoors[i].x / 48, map6.magneticDoors[i].y / 48);


            }
        }
    }
}

Player.prototype.returnDocument = function(){

    return this.documents;
}

Player.prototype.returnKey = function(){

    return this.magneticKey;
}


Player.prototype.update = function (layer4, layer3, layer6, map6, tarjeta, documents) {
    this.moveCharacter();
    this.recogeInput(map6, layer6, tarjeta, documents);
    this.checkCollision(layer4, layer3, layer6);
    this.bulletHitWall(layer3, layer4, layer6);

}



module.exports = Player;
},{"./character.js":7,"./hand.js":9,"./map.js":13,"./tarjetaLlave.js":15}],15:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

function tarjetaLlave(game, x, y, sprite, w, h)
{
    Character.call(this,game,x,y,sprite);
    this.scale.setTo(w,h);

} 

tarjetaLlave.prototype = Object.create(Character.prototype);
tarjetaLlave.prototype.constructor = tarjetaLlave;

tarjetaLlave.prototype.ini = function () {
    this.game.add.existing(this);
    this.animations.add('shine',[0,1],2,true);
    this.animations.play('shine');
   // this.game.physics.arcade.enable(this);
    
}

module.exports = tarjetaLlave;
},{"./character.js":7}],16:[function(require,module,exports){
'use strict';
var Character = require('./character.js');

function triggerSprite(game, x, y, sprite, w, h, a)
{
    Character.call(this,game,x,y,sprite);
    this.scale.setTo(w,h);
    this.able = a;
} 

triggerSprite.prototype = Object.create(Character.prototype);
triggerSprite.prototype.constructor = triggerSprite;

triggerSprite.prototype.disable = function(){
    this.able = false;
}
triggerSprite.prototype.enable = function(){
    this.able = true;
}
triggerSprite.prototype.able = function(){
    return this.able;
}

triggerSprite.prototype.ini = function () {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.alpha = .2;
}

module.exports = triggerSprite;
},{"./character.js":7}],17:[function(require,module,exports){
'use strict';
var tuto = {
    create : function(){
       var fondo = this.game.add.image(0,0, 'inicial');
       function start (){
        this.game.state.start('play');
       };
       
       this.continue = this.game.add.button(475,510,'press',start);
       this.continue.scale.setTo(.65,.65);
    },
    update : function(){

    }
}
module.exports = tuto;
},{}]},{},[11]);
