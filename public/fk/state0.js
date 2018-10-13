var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, adam, speed = 6;
var text;

WebFontConfig = {
  google: { families: [ 'Montserrat' ] }
};
demo.state0 = function(){};
demo.state0.prototype = {
  preload: function(){
    game.load.image('adam', 'assets/tilemaps/ship.png');
    //game.load.image('ship', 'assets/tilemaps/ship.png');
    
  },
  create: function(){
    game.stage.backgroundColor = '#800080';
    
    adams = game.add.group();
    adams.enableBody = true;
      var adam = adams.create(0 * 7, 0, 'adam');
      adam.x = 100;
      adam.y = 100;
    
    
    //ship = game.add.tileSprite(0,0,750,500,'ship');
    
    text = 'Bir korsan gemisi olan Siyah İnci adlı gemi hazine dolu bir ada bulmuştur. Kaptan Korsan Jack bu adadaki görevleri yerine getirirse hazine sahibi olacaktır. Devam etmek ve ilk görevi almak için tıklayınız.' ;
    

    this.spellOutText(100, 600, 1100, text, 40, 20, '#fff', 'Montserrat');
    
  },
    
    spellOutText: function(x, y, width, text, fontSize, speed, fill,  font){
    var sentence = game.add.text(x, y, '', {fontSize: fontSize + 'px', fill: fill, font: font});
    var currentLine = game.add.text(10, 10, '', {fontSize: fontSize + 'px', font: font});
    currentLine.alpha = 0;
    var loop = game.time.events.loop(speed, addChar);

    var index = 0;

    function addChar() {
      sentence.text += text[index];
      currentLine.text += text[index];

      if (currentLine.width > width && text[index] == ' ') {
        sentence.text += '\n';
        currentLine.text = '';
      }
      if (index >= text.length - 1) {
        game.time.events.remove(loop);
        console.log('stop');
      }
      index++;
    }
    //sentence.anchor.setTo(0.5, 0.5);
    game.input.onDown.addOnce(change_state_to_one, this);
  },

  update: function(){
   
  }
};

function change_state_to_one(){
    console.log('state1 a gecis');
    game.state.start('state1');

}
function changeState(i, stateNum){
  console.log('state' + stateNum);
  game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
  game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
  addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
  addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
  addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
  addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
  addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
  addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
  addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
  addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
  addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
  addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}
