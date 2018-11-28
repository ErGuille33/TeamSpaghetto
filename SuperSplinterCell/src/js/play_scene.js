'use strict';
//El jugador
var Player = require('./player.js');
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
var Door = require('./door.js');

var PlayScene = {
  //Se ejecuta al principio
  create: function () {
    //Añadimos al mapa nuestro mapa ya cargado, y lo cargamos en la escena
    //El mapa de juego
    var map1;
    var map2;
    var map3;
    var map4;
    var map5;
    this.Sam;
    //Capas
    PlayScene.layer;
    PlayScene.layer2;
    PlayScene.layer3;
    PlayScene.layer4;
    map1 = this.game.add.tilemap('Lvl1_1_1', 48, 48);
    map2 = this.game.add.tilemap('Lvl1_1_2', 48, 48);
    map3 = this.game.add.tilemap('Lvl1_1_3', 48, 48);
    map4 = this.game.add.tilemap('Lvl1_1_4', 48, 48);
    map5 = this.game.add.tilemap('Lvl1_1_5', 48, 48);
    //Añadimos el tileset ya cargado
    map1.addTilesetImage('suelo');
    map2.addTilesetImage('paredes');
    map3.addTilesetImage('paredes');
    map4.addTilesetImage('objetos');
    map5.addTilesetImage('objetos');
    //
    //Metemos el mapa en la capa 0
    this.layer = map1.createLayer(0);
    this.layer.resizeWorld();

    this.layer2 = map2.createLayer(0);
    this.layer2.resizeWorld();

    this.layer3 = map3.createLayer(0);
    this.layer3.resizeWorld();

    this.layer4 = map4.createLayer(0);
    this.layer4.resizeWorld();

    this.layer5 = map5.createLayer(0);
    this.layer5.resizeWorld();
    //Esto es para poner las colisiones en funcion de los numeros que aparecen en el mapa de tiles
    map4.setCollisionBetween(0,1000);
    map3.setCollisionBetween(0,1000);
    //Inicializamos las puertas

    //Inicializamos el personaje
    this.Sam = new Player(100, 100, false, false, false, false, false, false, false, 'player', this.game);
    this.doors = [];
    this.doors[0]= new Door(200,200,false,false,0,'openDoor',this.game);
    this.game.add.existing(this.Sam);
    this.Sam.ini();
    //Cámara
    this.camera.follow(this.Sam);
  },
  //El update de toda la vida
  update: function () {
    this.Sam.update(this.layer4,this.layer3);
  },
};

module.exports = PlayScene;



/*
function Point (x,y){
  this.x =x;
  this.y =y;
};
function Door (position){
  this.position = position;
  this.open = false;
}
function Shot (position, velocity){
  this._position = position;
  this._velocity = velocity;
};
function Player(position, graphic){
  this.position = position;
  this.hidden = true;
  this.magneticKey = false;
  this.documents = false; 
  this.graphic = graphic;
  this.items = {lockPick:null,taser:null,cable:null, takeObject:null}
  
} 
function Enemy(position, graphic){
  this.position = position;
  this.reducedVision = false;
  this.awake = true;
  this.detected=false;
}
function Level(position, graphic){
  this.lightsOn = true;
  this.win = false;
  this.objects ={documents: { pos : position, taken: false},
    magneticKey:{ pos:positquiion, taken:false}
};

*/