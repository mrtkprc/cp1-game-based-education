demo.state11 = function(){};

var soru_kismi=0;//bu soru soruldugunda oyunun hareket etmesini engelliyor.
var giris_text;
var score=0;
var scoreboard;
var goalboard;

demo.state11.prototype = {//state11 
  preload: function(){
    game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);//tieldmap of harita

    game.load.image('grassTiles', 'assets/tilemaps/grassTiles.png');//grass
    game.load.image('water2', 'assets/tilemaps/water2.png');//water
    game.load.image('rockTiles', 'assets/tilemaps/rockTiles.png');//rock

   
    game.load.spritesheet('sword20', 'assets/tilemaps/sword20.png', 40, 175);//swords =20tl
    game.load.spritesheet('sword40', 'assets/tilemaps/sword40.png', 40, 175);//swords =20tl
    game.load.spritesheet('sword15', 'assets/tilemaps/sword15.png', 40, 175);//swords =20tl
    game.load.spritesheet('sword200', 'assets/tilemaps/sword200.png', 40, 175);//swords =20tl
    game.load.spritesheet('sword50', 'assets/tilemaps/sword50.png', 40, 175);//swords =20tl
    
    game.load.image('adam', 'assets/sprites/captainpirate.png');
    
  },
  create: function(){
    console.log('state11');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#DDDDDD';
    addChangeStateEventListeners();

    var map = game.add.tilemap('field');
    
    map.addTilesetImage('grassTiles');
    map.addTilesetImage('rockTiles');
    map.addTilesetImage('water2');
    
    

    grass = map.createLayer('grass');
    rocks = map.createLayer('rocks');
    //coinss = map.createLayer('rocks');
    
    map.setCollisionBetween(1, 9, true, 'rocks');
    map.setCollision(11, true, 'grass');
      
      
    adam = game.add.sprite(200, 200, 'adam');
    adam.scale.setTo(0.2, 0.2);
    game.physics.enable(adam);
      
      
    
    
    giris_text = game.add.text(game.world.centerX, 900, "Korsan Kaptan Jack'in en ucuz kılıcı bulması lazım.  \n Devam etmek için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    giris_text.anchor.setTo(0.5, 0.5);
    game.input.onDown.addOnce(removeText, this);
    
    
   
   
   
    //-------------swords20 grubu---------
    swords_yirmi = game.add.group();
    swords_yirmi.enableBody = true;
    var sword_yirmi = swords_yirmi.create(0 * 7, 0, 'sword20');
      sword_yirmi.x = 1050;
      sword_yirmi.y = 50;
    //-------------swords40 grubu---------
    swords_kirk = game.add.group();
    swords_kirk.enableBody = true;
    var sword_kirk = swords_kirk.create(0 * 7, 0, 'sword40');
      sword_kirk.x = 500;
      sword_kirk.y = 300;
    //-------------swords50 grubu---------
    swords_elli = game.add.group();
    swords_elli.enableBody = true;
    var sword_elli = swords_elli.create(0 * 7, 0, 'sword50');
      sword_elli.x = 850;
      sword_elli.y = 250;
    //-------------swords200 grubu---------
    swords_ikiyüz = game.add.group();
    swords_ikiyüz.enableBody = true;
    var sword_ikiyüz = swords_ikiyüz.create(0 * 7, 0, 'sword200');
      sword_ikiyüz.x = 100;
      sword_ikiyüz.y = 100;
    //-------------swords15 grubu---------
    swords_onbes = game.add.group();
    swords_onbes.enableBody = true;
    var sword_onbes = swords_onbes.create(0 * 7, 0, 'sword15');
      sword_onbes.x = 1050;
      sword_onbes.y = 500;
   
   
      
    
    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function(){
    game.physics.arcade.collide(adam, rocks, function(){ console.log('hitting rocks!'); });
    game.physics.arcade.collide(adam, grass, function(){ console.log('hitting grass!'); });
    
    game.physics.arcade.overlap(adam, swords_yirmi, collect_swords_yirmi, null, this);
    game.physics.arcade.overlap(adam, swords_kirk, collect_swords_kirk, null, this);
    game.physics.arcade.overlap(adam, swords_elli, collect_swords_elli, null, this);
    game.physics.arcade.overlap(adam, swords_ikiyüz, collect_swords_ikiyüz, null, this);
    game.physics.arcade.overlap(adam, swords_onbes, collect_swords_onbes, null, this);




if(soru_kismi==1){
    if(cursors.up.isDown){
      adam.body.velocity.y = -vel;
    }
    else if(cursors.down.isDown){
      adam.body.velocity.y = vel;
    }
    else{
      adam.body.velocity.y = 0;
    }
    if(cursors.left.isDown){
      adam.body.velocity.x = -vel;
    }
    else if(cursors.right.isDown){
      adam.body.velocity.x = vel;
    }
    else{
      adam.body.velocity.x = 0;
    }
      
  }
 }
};

function collect_swords_yirmi(player, sword_yirmi){
    console.log('swords');
    console.log(score);
    sword_yirmi.kill();
    game_over_text = game.add.text(game.world.centerX, game.world.centerY, "Pahalı kılıcı aldınız. Tekrar denemek için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    game_over_text.anchor.setTo(0.5, 0.5);
    soru_kismi=0;

    game.input.onDown.addOnce(removeText_gameover_11, this);
}
function collect_swords_kirk(player, sword_kirk){
    console.log('swords40');
    console.log(score);
    sword_kirk.kill();
    game_over_text = game.add.text(game.world.centerX, game.world.centerY, "Pahalı kılıcı aldınız. Tekrar denemek için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    game_over_text.anchor.setTo(0.5, 0.5);
    soru_kismi=0;

    game.input.onDown.addOnce(removeText_gameover_11, this);
    
}
function collect_swords_elli(player, sword_elli){
    console.log('swords50');
    console.log(score);
    sword_elli.kill();
    game_over_text = game.add.text(game.world.centerX, game.world.centerY, "Pahalı kılıcı aldınız. Tekrar denemek için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    game_over_text.anchor.setTo(0.5, 0.5);
    soru_kismi=0;

    game.input.onDown.addOnce(removeText_gameover_11, this);
   
}
function collect_swords_ikiyüz(player, sword_ikiyüz){
    console.log('swords200');
    console.log(score);
    sword_ikiyüz.kill();
    game_over_text = game.add.text(game.world.centerX, game.world.centerY, "Pahalı kılıcı aldınız. Tekrar denemek için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    game_over_text.anchor.setTo(0.5, 0.5);
    soru_kismi=0;

    game.input.onDown.addOnce(removeText_gameover_11, this);
   
}
function collect_swords_onbes(player, sword_onbes){
    console.log('swords15');
    console.log(score);
    sword_onbes.kill();
    kazandin_text = game.add.text(game.world.centerX, game.world.centerY, "Tekbrikler en ucuz kılıcı buldunuz.\n Korsan Kaptan Jack'in bütün görevlerini yaptınız.\nBastan baslamak için tıklayınız.", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    kazandin_text.anchor.setTo(0.5, 0.5);
    soru_kismi=0;

    game.input.onDown.addOnce(removeText_state12, this);
}

function removeText_gameover_11() {
    console.log('game_over kill text');
    game_over_text.destroy();
    soru_kismi=0;
    game.state.start('state11');
    score=0;
}
function removeText_state12(){
    console.log('4.state e gecis');
    kazandin_text.destroy();
    soru_kismi=0;
    game.state.start('state0');//-------------buraya bir bak-------------
    score=0;
    
}