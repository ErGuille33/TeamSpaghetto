'use strict';

var Character = require('./character.js');

//State : True = open, false = close
//Metallic : True = metallic , false = not metallic

function Map(nombreTilemap, tamX, tamY, tilesetImage, game) {
    
    this.tileMap = game.add.tilemap(nombreTilemap, tamX, tamY);
    this.tileMap.addTilesetImage(tilesetImage);
    this.layer = this.tileMap.createLayer(0);
    this.layer.resizeWorld();
}
Map.prototype.constructor = Map;

Map.prototype.ini = function () {
    
}
Map.prototype.returnLayer = function(){
    return this.layer;
}
Map.prototype.collisions = function(col1,col2){
    this.tileMap.setCollisionBetween(col1,col2);
}
Map.prototype.open = function (x,y) {
    //145,148 tiles de puerta
    this.tileMap.removeTile(x,y,this.layer)
    if(this.tileMap.getTileAbove(this.layer, x, y) != -1){

        this.tileMap.removeTile(x,y-46,this.layer)
    }
    else if(this.tileMap.getTileBelow(this.layer, x, y) != -1){

        this.tileMap.removeTile(x,y+46,this.layer)
    }
    else if(this.tileMap.getTileLeft(this.layer, x, y) != -1){
        
        this.tileMap.removeTile(x-46,y,this.layer)
    }
    else if(this.tileMap.getTileRight(this.layer, x, y) != -1){
        
        this.tileMap.removeTile(x+46,y,this.layer)
    }
}
module.exports = Map;
