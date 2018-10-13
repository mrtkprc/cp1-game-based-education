demo.state6 = function(){};

var soru_kismi=0;//bu soru soruldugunda oyunun hareket etmesini engelliyor.
var giris_text;
var score=0;
var scoreboard;
var goalboard;

demo.state6.prototype = {//state6 
  preload: function(){
    game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);//tieldmap of harita

    game.load.image('grassTiles', 'assets/tilemaps/grassTiles.png');//grass
    game.load.image('water2', 'assets/tilemaps/water2.png');//water
    game.load.image('rockTiles', 'assets/tilemaps/rockTiles.png');//rock
   
    game.load.spritesheet('10tl', 'assets/tilemaps/ontl.png', 80, 40);//10Tl
    game.load.spritesheet('5tl', 'assets/tilemaps/beslira.png', 78, 40);//5Tl
    game.load.spritesheet('1tl', 'assets/tilemaps/birtl.png', 80, 79);//1Tl
    game.load.spritesheet('50kurus', 'assets/tilemaps/ellikurus.png', 70, 67);//50 kurus
    game.load.spritesheet('25kurus', 'assets/tilemaps/yirmibeskurus.png', 60, 61);//25 kurus
    game.load.spritesheet('10kurus', 'assets/tilemaps/10kurus.png', 70, 69);//10 kurus
    game.load.spritesheet('5kurus', 'assets/tilemaps/5kurus.png', 70, 72);//5 kurus
    
    game.load.image('adam', 'assets/sprites/captainpirate.png');
    
  },
  create: function(){
    console.log('state6');
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
      
    
    
    giris_text = game.add.text(game.world.centerX, 900, "Korsan Kaptan Jack'in 1525 kuruş toplaması lazım.  \n Devam etmek için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    giris_text.anchor.setTo(0.5, 0.5);
    game.input.onDown.addOnce(removeText, this);
        
      //---------------10tl grubu-------------
    ontlS = game.add.group();
    ontlS.enableBody = true;
      var ontl = ontlS.create(0 * 7, 0, '10tl');
      ontl.x = 650;
      ontl.y = 750;
      
    //-------------5TL grubu---------  
    bes_tlS = game.add.group();
    bes_tlS.enableBody = true;
    var bestl = bes_tlS.create(0 * 7, 0, '5tl');
      bestl.x = 520;
      bestl.y = 250;
    var bestl = bes_tlS.create(0 * 7, 0, '5tl');
      bestl.x = 1050;
      bestl.y = 650;
   //-------------1TL grubu---------
    bir_tlS = game.add.group();
    bir_tlS.enableBody = true;
 
    var birtl = bir_tlS.create(2 * 7, 0, '1tl');
      birtl.x = 450;
      birtl.y = 150;
    
    //-------------50kurus grubu---------
    elli_kuruS = game.add.group();
    elli_kuruS.enableBody = true;
    var ellikurus = elli_kuruS.create(0 * 7, 0, '50kurus');
      ellikurus.x = 1050;
      ellikurus.y = 450;
    
   
   
    //-------------25kurus grubu---------
    yirmibes_kuruS = game.add.group();
    yirmibes_kuruS.enableBody = true;
    var yirmibeskurus = yirmibes_kuruS.create(0 * 7, 0, '25kurus');
      yirmibeskurus.x = 50;
      yirmibeskurus.y = 250;
   
    
    //---------------------------------------------------
       
    //-------------10kurus grubu---------
    on_kuruS = game.add.group();
    on_kuruS.enableBody = true;
    var onkurus = on_kuruS.create(0 * 7, 0, '10kurus');
      onkurus.x = 1050;
      onkurus.y = 50;
   var onkurus = on_kuruS.create(0 * 7, 0, '10kurus');
      onkurus.x = 50;
      onkurus.y = 50;
   
      
    //-------------5kurus grubu---------
    bes_kuruS = game.add.group();
    bes_kuruS.enableBody = true;
    var beskurus = bes_kuruS.create(0 * 7, 0, '5kurus');
      beskurus.x = 800;
      beskurus.y = 450;
    
  

      
    
    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function(){
    game.physics.arcade.collide(adam, rocks, function(){ console.log('hitting rocks!'); });
    game.physics.arcade.collide(adam, grass, function(){ console.log('hitting grass!'); });
    scoreboard = game.add.text(20, 880, "Skor:"+score+"kurus\nAmaç:1525kurus", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    
    game.physics.arcade.overlap(adam, bir_tlS, collect_bir_tl, null, this);
    game.physics.arcade.overlap(adam, elli_kuruS, collect_elli_kurus, null, this);
    game.physics.arcade.overlap(adam, yirmibes_kuruS, collect_yirmibes_kurus, null, this);
    game.physics.arcade.overlap(adam, on_kuruS, collect_on_kurus, null, this);
    game.physics.arcade.overlap(adam, bes_kuruS, collect_bes_kurus, null, this);
    game.physics.arcade.overlap(adam, bes_tlS, collect_bes_tl, null, this);
    game.physics.arcade.overlap(adam, ontlS, collect_on_tl, null, this);

if(score > 1525){
    game_over_text = game.add.text(game.world.centerX, game.world.centerY, "Toplamanız gerekeni aştınız. Tekrar denemek için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    game_over_text.anchor.setTo(0.5, 0.5);
    soru_kismi=0;

    game.input.onDown.addOnce(removeText_gameover_6, this);
   
    score=0;
}
if(score==1525){
    kazandin_text = game.add.text(game.world.centerX, game.world.centerY, "Tekbrikler doğru sayıda kuruş topladınız. Bir sonraki seviye için tıklayın...", { font: "40px Arial", fill: "#84812a", align: "center",backgroundColor: 'rgba(132, 57, 42, 1)' });
    kazandin_text.anchor.setTo(0.5, 0.5);
    soru_kismi=0;
    score=0;

    game.input.onDown.addOnce(removeText_state7, this);

    
}

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

function collect_on_tl(player, ontl){
    console.log('heeeeeeyyy5');
    score+=1000;
    console.log(score);
    ontl.kill();

}

function removeText_gameover_6() {
    console.log('game_over kill text');
    game_over_text.destroy();
    soru_kismi=0;
    game.state.start('state6');
    score=0;
}
function removeText_state7(){
    console.log('4.state e gecis');
    kazandin_text.destroy();
    soru_kismi=0;
    game.state.start('state7');
    score=0;
    
}