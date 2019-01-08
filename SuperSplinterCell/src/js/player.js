'use strict';

var Character = require('./character.js')
var Map = require('./map.js');
var Hand = require('./hand.js');
var mg = require('./tarjetaLlave.js');

//El personaje del jugador

//Items : 1 = lockpick | 2 = taser | 3 = cable | 4 = gun  | 5 = hand 
function Player(x, y, key, doc, it, sprite, game, lvl) {
    Character.call(this, game, x, y, sprite);
    this.isMoving = false;
    this.magneticKey = key;
    this.documents = doc;
    this.items = it;
    this.game = game;
    this.lvl = lvl;

}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

//Inicialización

Player.prototype.ini = function () {

    this.alive = true;

    //Animaciones
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(25, 30, 15, 15);
    this.animations.add('idle', [0], 1, true);
    this.animations.add('walk', [11, 12, 13, 14], 7, true);
    this.animations.add('taser', [0, 1, 2], 10, false);
    this.animations.add('gun', [22, 23, 24, 25], 10, false);
    this.animations.add('hand', [4, 5, 6], 4, false);
    this.animations.add('optical', [4, 7], 4, false);
    this.animations.add('dead', [30], 1, false);

    this.xDestine = this.x;
    this.yDestine = this.y;
    this.distance = 0;
    this.speed = 300;

    this.actionButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.eKey = this.game.input.keyboard.addKey(Phaser.KeyCode.FIVE);
    this.rKey = this.game.input.keyboard.addKey(Phaser.KeyCode.FOUR);
    this.ckey = this.game.input.keyboard.addKey(Phaser.KeyCode.THREE)
    this.tKey = this.game.input.keyboard.addKey(Phaser.KeyCode.TWO);
    this.lKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ONE);
    //weapon

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.setBulletFrames(0, 60, true);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 1000;

    this.weapon.trackSprite(this, (this.x / 2), (this.y / 2), true);
    this.weapon.bulletCollideWorldBounds = true;

    this.body.allowGravity = false;
    this.body.immovable = true;

    this.fireTime = this.game.time.physicsElapsed;

    //Mano
    this.hand = new Hand(this.game, 20, 0, 'aux');
    this.hand.ini();

    this.addChild(this.hand);

    //Audio
    this.audiodead = this.game.add.audio('die');
    this.Opendoor = this.game.add.audio('door');
    this.silenced = this.game.add.audio('silenced');
    this.audiotaser = this.game.add.audio('taser');
    this.audiopaper = this.game.add.audio('paper');
    this.audiokey = this.game.add.audio('key');

    this.audiotick = this.game.add.audio('tick');


}
Player.prototype.moveCharacter = function () {
    //COmprueba si se esta pulsando el boton del ratón, y si ha pasado suficiente tiempo desde que se ha disparado
    if (this.game.input.mousePointer.isDown && this.fireTime - 500 <= this.game.time.now) {
        this.xDestine = this.game.input.mousePointer.worldX;
        this.yDestine = this.game.input.mousePointer.worldY;
        console.log(this.xDestine + " , " + this.yDestine)
        this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));
        this.rotation = this.game.physics.arcade.moveToPointer(this, this.speed, this.game.input);
        //console.log(this.xDestine );
        this.animations.play('walk');
    }
    this.distance = Math.sqrt(Math.pow(this.xDestine - this.x, 2) + Math.pow(this.yDestine - this.y, 2));




}
//Colisiones
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
//Colisiones de las balas con las paredes
Player.prototype.bulletHitWall = function (layer3, layer4, layer6, enemys) {
    // console.log(this.weapon.bullets);
    var player = this;
    for (var i in enemys) { player.game.physics.arcade.collide(this, enemys[i]); }
    this.weapon.bullets.forEach(function (bullet) {
        bullet.body.setSize(0, 0, 50, 50);
        if (player.game.physics.arcade.collide(bullet, layer3) || player.game.physics.arcade.collide(bullet, layer4)
            || player.game.physics.arcade.collide(bullet, layer6)) { bullet.kill() }
        else {
            for (var i in enemys) {
                if (player.game.physics.arcade.collide(bullet, enemys[i])) { enemys[i].killed(); bullet.kill(); }
            }
        }
    }
    );
}

Player.prototype.recogeInput = function (map6, layer6, tarjeta, documents, enemys, map7) {
    //Elegir arma
    if (this.eKey.justDown) {
        this.items = 4
        this.audiotick.play();
    }
    //Elegir cable optico
    if (this.ckey.justDown) {
        this.items = 3;
        this.audiotick.play();
    }
    //Elegir mano
    else if (this.rKey.justDown) {
        this.items = 5;
        this.audiotick.play();
    }
    //Elegir taser
    else if (this.tKey.justDown) {
        this.items = 2;
        this.audiotick.play();
    }
    //Elegir ganzua
    else if (this.lKey.justDown) {
        this.items = 1;
        this.audiotick.play();
    }
    //Ejecuta una accion dependiendo del item seleccionado
    else if (this.actionButton.justDown && this.fireTime <= this.game.time.now) {
        this.body.velocity.setTo(0, 0);
        switch (this.items) {
            case 5:
                this.shoot();
                //Creamos esta variable para que solo haga la animación de disparar de acuerdo al time rate  
                this.fireTime = this.game.time.now + this.weapon.fireRate;
                break;
            case 4:
                this.animations.play('hand');
                if (tarjeta != undefined && !this.magneticKey) {
                    this.recogeLlave(tarjeta);
                }
                if (documents != undefined && !this.documents) {

                    this.recogeDocumento(documents);

                }
                this.fireTime = this.game.time.now + 1500;
                break;
            case 3:
                this.animations.play('optical');
                this.optical(map6, map7);
                this.fireTime = this.game.time.now + 1500;
                break;
            case 2:
                this.taseEnemy(enemys);
                this.animations.play('taser');
                this.fireTime = this.game.time.now + 1000;
                break;
            case 1:
                this.open(map6, map7);
                this.animations.play('hand');
                this.fireTime = this.game.time.now + 1500;

        }
    }
}
Player.prototype.optical = function (map6, map7) {
    for (var i = 0; i < map6.doors.length; i++) {

        if ((this.hand.body.x + this.hand.width / 2) > map6.doors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.doors[i].x + 48)
            && (this.hand.body.y + this.hand.width / 2) > (map6.doors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.doors[i].y + 48)) {

            map7.light((map6.doors[i].x) / 48, map6.doors[i].y / 48);

        }
    }
    if (this.magneticKey == true) {
        for (var i = 0; i < map6.magneticDoors.length; i++) {
            if ((this.hand.body.x + this.hand.width / 2) > map6.magneticDoors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.magneticDoors[i].x + 48)
                && (this.hand.body.y + this.hand.width / 2) > (map6.magneticDoors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.magneticDoors[i].y + 48)) {

                map7.light((map6.magneticDoors[i].x) / 48, map6.magneticDoors[i].y / 48);

            }
        }
    }
}
Player.prototype.recogeLlave = function (tarjeta) {

    if (Phaser.Rectangle.intersects(this.hand.getBounds(), tarjeta.getBounds())) {
        this.magneticKey = true;
        console.log(this.magneticKey);
        this.audiopaper.play();
        tarjeta.kill();
    }
}
Player.prototype.recogeDocumento = function (documents) {

    if (Phaser.Rectangle.intersects(this.hand.getBounds(), documents.getBounds())) {
        this.documents = true;
        console.log(this.papeles);
        this.audiopaper.play();
        documents.kill();
    }
}
Player.prototype.taseEnemy = function (enemys) {
    this.audiotaser.play();
    for (var i in enemys) {
        if (Phaser.Rectangle.intersects(this.hand.getBounds(), enemys[i].getBounds())) {

            enemys[i].killed();
        }
    }
}
Player.prototype.shoot = function () {
    this.weapon.fire(this.body.center);
    this.animations.play('gun');
    this.silenced.play();
}
Player.prototype.returnItem = function () {

    return this.items;
}
Player.prototype.getKilled = function () {

    this.body.velocity.setTo(0, 0);
    this.animations.play('idle');
    this.game.time.events.add(300, function () { this.animations.play('dead'); this.audiodead.play(); }, this);
    this.alive = false;
    this.game.time.events.add(2000, function () { if (this.lvl == 1) { this.game.state.start('gameover'); } else if (this.lvl == 2) { this.game.state.start('gameover1'); } }, this);

}
//Necesario para algunos calls
Player.prototype.returnPlayer = function () {
    return this;
}
//Abrir puertas
Player.prototype.open = function (map6, map7) {
    this.animations.play('hand');

    for (var i = 0; i < map6.doors.length; i++) {

        if ((this.hand.body.x + this.hand.width / 2) > map6.doors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.doors[i].x + 48)
            && (this.hand.body.y + this.hand.width / 2) > (map6.doors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.doors[i].y + 48)) {

            this.game.time.events.add(Phaser.Timer.SECOND / 2, map6.open, map6, map6.doors[i].x / 48, map6.doors[i].y / 48);
            map7.light((map6.doors[i].x) / 48, map6.doors[i].y / 48);
            this.Opendoor.play();

        }
    }
    if (this.magneticKey == true) {
        for (var i = 0; i < map6.magneticDoors.length; i++) {
            if ((this.hand.body.x + this.hand.width / 2) > map6.magneticDoors[i].x && (this.hand.body.x + this.hand.width / 2) < (map6.magneticDoors[i].x + 48)
                && (this.hand.body.y + this.hand.width / 2) > (map6.magneticDoors[i].y) && (this.hand.body.y + this.hand.width / 2) < (map6.magneticDoors[i].y + 48)) {

                this.game.time.events.add(Phaser.Timer.SECOND / 2, map6.open, map6, map6.magneticDoors[i].x / 48, map6.magneticDoors[i].y / 48);
                map7.light((map6.magneticDoors[i].x) / 48, map6.magneticDoors[i].y / 48);
                this.audiokey.play();

            }
        }
    }
}

Player.prototype.returnDocument = function () {

    return this.documents;
}

Player.prototype.returnKey = function () {

    return this.magneticKey;
}


Player.prototype.update = function (layer4, layer3, layer6, map6, tarjeta, documents, enemys, map7) {
    if (this.alive) {
        this.moveCharacter();
        this.recogeInput(map6, layer6, tarjeta, documents, enemys, map7);
        this.checkCollision(layer4, layer3, layer6);
        this.bulletHitWall(layer3, layer4, layer6, enemys);
    }


}



module.exports = Player;