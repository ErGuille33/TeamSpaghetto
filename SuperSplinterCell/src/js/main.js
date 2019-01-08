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