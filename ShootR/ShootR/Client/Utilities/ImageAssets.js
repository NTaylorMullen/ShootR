var IMAGE_ASSETS = {
    INIT: function () {
        this.Explosion.src = "Images/SpriteSheets/explosion_1.png";
        this.Laser.src = "/Images/Laser.png";
        this.BigExplosion.src = "/Images/SpriteSheets/explosion_2.png";
        this.Ship1.src = "/Images/Ships/ship_lvl1.png";
        this.Ship2 = this.Ship1;
        this.Ship3.src = "/Images/Ships/ship_lvl3.png";
        this.Ship4 = this.Ship3;
        this.Ship5.src = "/Images/Ships/ship_lvl5.png";
        this.Ship6 = this.Ship5;
        this.Ship7.src = "/Images/Ships/ship_lvl7.png";
        this.Ship8.src = "/Images/Ships/ship_lvl8.png";
        this.Ship9.src = "/Images/Ships/ship_lvl9.png";
        this.Ship10.src = "/Images/Ships/ship_lvl10.png";
        this.ThrustBasic.src = "/Images/SpriteSheets/thrust_basic.png";
        this.HealthPack.src = "/Images/SpriteSheets/health_pack.png";
        this.Boost.src = "/Images/SpriteSheets/thrusters-BOOST.png";
        this.ThrustStart.src = "/Images/SpriteSheets/thrust_start.png";
    },
    Explosion: new Image(),
    Laser: new Image(),
    BigExplosion: new Image(),
    Ship1: new Image(),
    Ship3: new Image(),
    Ship5: new Image(),
    Ship7: new Image(),
    Ship8: new Image(),
    Ship9: new Image(),
    Ship10: new Image(),
    ThrustBasic: new Image(),
    HealthPack: new Image(),
    Boost: new Image(),
    ThrustStart: new Image()
};

IMAGE_ASSETS.INIT();
