'use strict';
//El mapa de juego
var map;
var Sam;
//Capas
var layer;
//El jugador
var player = require('./player.js');

var Tween;
//Esto viene a ser el objeto que contiene el juego(algo así como el game manager pero que controla todo)
  var PlayScene = { 
    //Se ejecuta al principio
  create: function () {
    //Añadimos al mapa nuestro mapa ya cargado, y lo cargamos en la escena
    map = this.game.add.tilemap('test', 19,18 );
    //Añadimos el tileset ya cargado
    map.addTilesetImage('deco1');
    //Metemos el mapa en la capa 0
    layer = map.createLayer(0);
    layer.resizeWorld();
    //Esto es para poner las colisiones en funcion de los numeros que aparecen en el mapa de tiles
    map.setCollision(17);
    map.setCollision(42);
    map.setCollisionBetween(42,44);
    //Ahora añadimos el sprite a la escena
    //player =  player.player(0,0,false,false,true,false,false,false);
    Sam = new player(0,0,false,false,false,false,false,false,"player",this.game);
    //Cámara
    this.camera.follow(Sam);
  }, 
  //El update de toda la vida
  update: function(){
    
}};

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

}

var Snake = {
  hidden: true, 
  kills: 0, 
  position:{x:0,y:0}, 
  magneticKey: false, 
  documents: false,
  items:{lockPick:null,taser:null,cable:null,takeObject:null},
  movement : null
};
var Enemy = {
  position: {x:0,y:0},
  reducedVision: false,
  awake: false,
  detected: false,
  movement:{guard1:null,guard2:null,guard3:null}                                                                                                         
};
var level = {
  lightsOn : true,
  objects: {
    documents:{position: {x:0,y:0},taken:false},
    magneticKey:{position:{x:0,y:0},taken:false} 
  },
  win : false,
};

var rooms = {};
var doors = {};
*/ 