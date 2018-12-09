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
                if (this.tileMap.getTile(i, j, this.layer, true).index == 556 || this.tileMap.getTile(i, j, this.layer, true).index == 568) {
                    
                    this.magneticDoors.push({ x: this.tileMap.getTile(i, j, this.layer, true).worldX, y: this.tileMap.getTile(i, j, this.layer, true).worldY });
                    aux++;

                }
            }
        }
    }
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
