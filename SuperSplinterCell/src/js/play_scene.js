'use strict';
var map;
var layer;

var player;


  var PlayScene = { 
  create: function () {
    map = this.game.add.tilemap('test', 19,18 );
    map.addTilesetImage('deco1');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(0,4,0);
    map.setCollisionBetween(44,44,0);

    player = this.add.sprite(100,500,'player');
    player.anchor.setTo(0.5,0.5);

    player.animations.add('idle',[0,1],1,true);
    player.animations.add('run',[3,4,5,6,7,8],7,true);

    this.camera.follow(player);
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    
  
    
  },
  update: function(){
 
    if (this.game.input.mousePointer.leftButton.duration > 40)
    {
        //  400 is the speed it will move towards the mouse
        player.rotation = this.game.physics.arcade.moveToXY(player, this.game.input.x, this.game.input.y, 600, 600);
        this.game.physics.arcade.moveToPointer(player, 200);
        var duration = (this.game.physics.arcade.distanceToPointer(player, this.game.input) / 200) * 1000;
        
        // pointer.x and pointer.y are the input x and y values coming from the mouse click or tap.
        this.game.add.tween(player).to({ x: this.game.input.x, y: this.game.input.y }, duration, Phaser.Easing.Linear.None, true);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(player.body, this.game.input.x, this.game.input.y))
        {
            player.body.velocity.setTo(0, 0);
        }
        
    }
    else {
      player.body.velocity.setTo(0, 0);
    }
    

  }
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