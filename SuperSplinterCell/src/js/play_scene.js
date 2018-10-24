'use strict';
//El mapa de juego
var map;
//Capas
var layer;
//El jugador
var player;
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
    player = this.add.sprite(100,500,'player');
    player.anchor.setTo(0.5,0.5);
    player.isMoving = false;
    //Esto tiene que ver con las animaciones y tal, no lo termino de entender
    player.animations.add('idle',[0,1],1,true);
    player.animations.add('run',[3,4,5,6,7,8],7,true);

    //Cámara
    this.camera.follow(player);
    //Añadimos fisicas al juego
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    
    //Función que mueve al personaje
    player.moveCharacter= function (){
      
    if (this.game.input.mousePointer.leftButton.isDown  && player.isMoving==false)
    {
    
        player.isMoving=true;
        if(player.isMoving==true){
        //  400 is the speed it will move towards the mouse
        player.rotation = this.game.physics.arcade.moveToXY(player, this.game.input.x, this.game.input.y, 600, 600);
        this.game.physics.arcade.moveToPointer(player, 200);
        var duration = (this.game.physics.arcade.distanceToPointer(player, this.game.input) / 200) * 1000;
        
        // pointer.x and pointer.y are the input x and y values coming from the mouse click or tap.
         Tween =this.game.add.tween(player).to({ x: this.game.input.x, y: this.game.input.y }, duration, Phaser.Easing.Linear.None, true);
         
        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(player.body, this.game.input.x, this.game.input.y))
        {
            player.body.velocity.setTo(0, 0);
            player.isMoving =false;
        }
        if (this.game.physics.arcade.collide(player,layer))
        {
          player.body.velocity.setTo(0, 0);
          Tween.stop();
            player.isMoving =false;
        }
      }
    }
    else if(player.isMoving==true) {
      player.body.velocity.setTo(0, 0);
      if (this.game.physics.arcade.collide(player,layer))
        {
          player.body.velocity.setTo(0, 0);
          Tween.stop();
            player.isMoving =false;
        }
      player.isMoving =false;}
      else {
        player.body.velocity.setTo(0, 0);
        
        player.isMoving =false;
      }
    
    

  };
    
  },
  //El update de toda la vida
  update: function(){
    player.moveCharacter();
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