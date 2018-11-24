'use strict';
//Añadimos el script de escena 
var PlayScene = require('./play_scene.js');

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
    this.game.stage.backgroundColor = '#ffffff';
    this.game.load.image('logo', 'GameArt/Gafas.jpg');
    this.game.load.tilemap('test', 'images/Test.csv');
    //Lvl1-1
    this.game.load.tilemap('Lvl1_1_5', 'images/CSV/Lvl1_1_Cositis2.csv');
    this.game.load.tilemap('Lvl1_1_4', 'images/CSV/Lvl1_1_Cositis.csv');
    this.game.load.tilemap('Lvl1_1_3', 'images/CSV/Lvl1_1_Muebles.csv');
    this.game.load.tilemap('Lvl1_1_2', 'images/CSV/Lvl1_1_Sobresuelo.csv');
    this.game.load.tilemap('Lvl1_1_1', 'images/CSV/Lvl1_1_Suelo.csv');
    //Lvl1-2
    this.game.load.tilemap('Lvl1_2_5', 'images/CSV/Lvl1_2_Cositis2.csv');
    this.game.load.tilemap('Lvl1_2_4', 'images/CSV/Lvl1_2_Cositis.csv');
    this.game.load.tilemap('Lvl1_2_3', 'images/CSV/Lvl1_2_Muebles.csv');
    this.game.load.tilemap('Lvl1_2_2', 'images/CSV/Lvl1_2_Sobresuelo.csv');
    this.game.load.tilemap('Lvl1_2_1', 'images/CSV/Lvl1_2_Suelo.csv');
    //Lvl2-1
    this.game.load.tilemap('Lvl2_1_5', 'images/CSV/Lvl2_1_Cositis2.csv');
    this.game.load.tilemap('Lvl2_1_4', 'images/CSV/Lvl2_1_Cositis.csv');
    this.game.load.tilemap('Lvl2_1_3', 'images/CSV/Lvl2_1_Muebles.csv');
    this.game.load.tilemap('Lvl2_1_2', 'images/CSV/Lvl2_1_Sobresuelo.csv');
    this.game.load.tilemap('Lvl2_1_1', 'images/CSV/Lvl2_1_Suelo.csv');
    //Lvl2-2
    this.game.load.tilemap('Lvl2_2_5', 'images/CSV/Lvl2_2_Cositis2.csv');
    this.game.load.tilemap('Lvl2_2_4', 'images/CSV/Lvl2_2_Cositis.csv');
    this.game.load.tilemap('Lvl2_2_3', 'images/CSV/Lvl2_2_Muebles.csv');
    this.game.load.tilemap('Lvl2_2_2', 'images/CSV/Lvl2_2_Sobresuelo.csv');
    this.game.load.tilemap('Lvl2_2_1', 'images/CSV/Lvl2_2_Suelo.csv');
    //Imagenes de tiles
    this.load.image('deco1', 'images/decoraciones1.png');
    this.load.image('suelo', 'images/suelo_pixel_art.png');
    this.load.image('paredes', 'images/mas_tile_set.png');
    this.load.image('objetos', 'images/decoraciones2.png');
    //Personajes
    this.load.spritesheet('player', 'images/Sprites Sam Fisher.png', 54, 62);
    this.load.image('bullet', 'images/bullet.png');
  },
  //Llamamos a playscene
  create: function () {
    this.game.state.start('play');
  }
};

//Se ejecuta al principio, creando el juego, añadiendo los estados y comenzando en el boot
window.onload = function () {
  var game = new Phaser.Game(2400, 2450, Phaser.AUTO, 'game');
  ///2400, 2450
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};