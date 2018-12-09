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
    this.animations.add('walk', [11, 12, 13, 14], 10, true);
    this.animations.add('taser', [0, 1, 2], 10, false);
    this.animations.add('gun', [22, 23, 24, 25], 10, false);
    this.animations.add('hand', [3, 4, 5], 4, false);
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
    this.weapon.bulletSpeed = 900;
    this.weapon.fireRate = 1000;
    this.weapon.trackSprite(this, (this.x / 2), (this.y / 2), true);

    this.weapon.bullets.enableBody = true;
    this.weapon.bullets.physicsBodyType = Phaser.Physics.ARCADE;
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
Player.prototype.recogeInput = function (map6, layer6, tarjeta,documents) {

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
                if(tarjeta != undefined && !this.magneticKey) {
                this.recogeLlave(tarjeta);
            }
            else if(documents!= undefined && !this.documents){
                this.recogeDocumento(documents);
            }
                this.fireTime = this.game.time.now + 1500;
                break;

        }
    }
}
Player.prototype.recogeLlave = function(tarjeta){
    
    if(Phaser.Rectangle.intersects(this.hand.getBounds(), tarjeta.getBounds())){
        this.magneticKey = true;
        console.log(this.magneticKey);
        
        tarjeta.kill();
    }
}
Player.prototype.recogeDocumento = function(documents){
    
    if(Phaser.Rectangle.intersects(this.hand.getBounds(), documents.getBounds())){
        this.documents = true;
        console.log(this.papeles);
        
        documents.kill();
    }
}
Player.prototype.shoot = function () {
    this.weapon.fire(this.body.center);
    this.animations.play('gun');
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
Player.prototype.update = function (layer4, layer3, layer6, map6, tarjeta, documents) {
    this.moveCharacter();
    this.recogeInput(map6, layer6, tarjeta, documents);
    this.checkCollision(layer4, layer3, layer6);
    // this.game.physics.arcade.collide(this.weapon.bullets , layer4  , this.bulletHitWall);

}
Player.prototype.bulletHitWall = function (bullet, layer) {
    bullet.kill();
}
module.exports = Player;