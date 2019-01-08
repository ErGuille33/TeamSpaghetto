'use strict';

var Character = require('./character.js')
var Player = require('./player.js')
var coneOfVision = require('./VisionCone.js');

//Enemigos
function Enemy(x, y, KO, Look, posiciones, speed, angle, sprite, game, timer) {
    Character.call(this, game, x, y, sprite);
    this.ko = KO;
    this.look = Look;
    this.sPeed = speed;
    this.positions = posiciones;
    this.angle = angle;
    this.game = game;
    this.timer = timer;
}
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.ini = function () {


    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    //this.body.setSize(25, 30, 15, 15);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.auxi = 0;

    this.animations.add('walk', [0, 1], 6, true);
    this.animations.add('shoot', [4, 5, 6, 7], 7, false);
    this.animations.add('dead', [8], 1, false);

    this.body.allowGravity = false;
    this.body.immovable = true;

    this.coneOfVision = new coneOfVision(this.game, 140, 0, 'cono');
    this.coneOfVision.ini();
    this.timeAux = this.game.time.now;
    this.addChild(this.coneOfVision);

    this.visto = false;

    this.shoot = this.game.add.audio('shoot');


}
Enemy.prototype.changeAngle = function () {

    this.angle += 90;
}
//Segun los patrones de movimiento que hayan sido establecidos, se moverán
Enemy.prototype.moveEnemy = function () {

    if (!this.ko) {
        //En caso de que se pueda mover
        if (!this.look) {

            if (!((Math.trunc(this.x) <= this.positions[this.auxi].x + 1 && Math.trunc(this.x) >= this.positions[this.auxi].x - 1))
                || !(Math.trunc(this.y) <= this.positions[this.auxi].y + 1 && Math.trunc(this.y) >= this.positions[this.auxi].y - 1)) {


                this.xDestine = this.positions[this.auxi].x;
                this.yDestine = this.positions[this.auxi].y;

                this.rotation = this.game.physics.arcade.moveToXY(this, this.xDestine, this.yDestine, this.sPeed);

                this.animations.play('walk');


            } else {

                if (this.auxi < this.positions.length - 1) {
                    this.auxi++;
                } else {
                    this.auxi = 0;
                }
            }
        }
        //En caso de que no se pueda mover
        else {
            if (this.timeAux <= this.game.time.now) {
                this.timeAux = this.game.time.now + this.timer;
                this.changeAngle();
            }
        }
    }
    //Si está muerto
    else {
        this.body.velocity.setTo(0, 0);
        this.animations.play('dead');
    }
}
//Detecta jugador
Enemy.prototype.playerDetected = function (player, music) {

    if (player != undefined && !this.visto) {

        if (this.game.physics.arcade.overlap(this.coneOfVision, player)) {
            this.visto = true;
            this.body.velocity.setTo(0, 0);
            music.stop();
            console.log(this.game.physics.arcade.angleBetween(this, player));
            this.angle = (180 / Math.PI) * this.game.physics.arcade.angleBetween(this, player);
            this.animations.play('shoot');
            this.shoot.play();
            player.getKilled();
        }
    }
}

Enemy.prototype.checkOverlap = function (spriteA, spriteB) {
    /*
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Rectangle.intersects(boundsA, boundsB);*/
}
Enemy.prototype.killed = function () {
    this.coneOfVision.kill();
    this.ko = true;
}

Enemy.prototype.update = function (player, music) {

    this.playerDetected(player, music);
    if (!this.visto) {
        this.moveEnemy();
    }
}

module.exports = Enemy;