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
    this.load.image('deco1', 'images/decoraciones1.png');
    this.load.spritesheet('player', 'images/Player.png', 24, 26);
    this.load.image('bullet', 'images/bullet.png');
  },
  //Llamamos a playscene
  create: function () {
    this.game.state.start('play');
  }
};

//Se ejecuta al principio, creando el juego, añadiendo los estados y comenzando en el boot
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};