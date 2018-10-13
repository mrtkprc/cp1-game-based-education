const SCREEN_WIDTH = 840;
const SCREEN_HEIGHT = 550;
const SELECT_ITEM_DURATION = 10;
const PLAYER_VELOCITY = 60;
const PLAYER_LEFT_RESTIRICTION_VALUE = 10;
const BULLET_TIME_VELOCITY = 700;
const BULLET_VELOCITY = 400;
const ENEMY_NUMBER_FOR_FIRST_MONSTER = 3;
const ENEMY_NUMBER_FOR_SECOND_MONSTER = 2;
const ENEMY_NUMBER_FOR_THIRD_MONSTER = 1;

var game = new Phaser.Game(SCREEN_WIDTH,SCREEN_HEIGHT,Phaser.AUTO);
var background;
var tween_for_first_monster;
var tween_for_second_monster;
var tween_for_third_monster;

var backgorund_velocity = 0;
var player;
var family;
var cursors;
var music;
var ray_effect;
var line_effect;
var dot_effect;
var final_music;

var okeyButton;
var stage = 0;
var informationText;
var arrow_bag;
var dot;
var line;
var ray;
var cube;
var cylinder;
var rectangle;
var select_item_click_order = 0;
var is_item_selected = false;
var is_game_startable = false;

var bullets_first;
var bullets_second;
var bullets_third;

var bulletTime = 0;
var bullet_type = 'line';

var enemies_group_for_first;
var enemies_group_for_second;
var enemies_group_for_third;

const stage_0_text =' Merhaba Küçük Kahramanımız, \n Robin Hood Ailesini Kurtarabilmek için, \n Yardımına İhtiyaç Duyuyor. \n Ona Yardım Etmek İster Misin ? ';
const stage_1_text ='Oyun sırasında canavarları öldürmek için, \nşu malzemelere ihtiyacım var!\nBu geometrik malzemeleri\nbulmamda yardımcı olur musun?';
const stage_2_text ='Malzeme Listesi(Sırasıyla).\n1-) Nokta\n2-) Doğru\n3-) Işın\n('+SELECT_ITEM_DURATION+' saniyen var)';
const game_failed_text = 'Çok üzgünüm\ngeometrik şekilleri bilmediğin için\ndevam edemeyeceğiz.';
const game_is_over_wrong_selection_text = 'Malesef\nyanlış geometrik şekili seçtin\nOyun Birazdan Yeniden Başlayacak';
const game_first_barrier_completed = 'Tebrikler\nSıra şimdi ikinci engelde\nHer iki yönü sonsuza giden\ngeometrik cismi seçmelisin';
const game_dot_information_text = 'Sıradaki seçmen gereken silah\nGeometrik olarak boyutu yoktur\n sadece bir konumdur.\n(Büyük harflerle gösterilir)';
const game_line_information_text = 'Bir yönü kapalı olup\ntek bir yönü ise sonsuza giden\nsilahı seç çabuk!';
const game_right_top_information_0 = 'Gelen Canavarları\nÖldürmen için\nSana Buradan\nYardımcı Olacağım';
const game_right_top_information_1 = 'Space tuş ile atış yapacaksın \nMouse ile yukarıdaki geometrik\nşekilleri seçeceksin';

function resetGame()
{
    game.time.events.add(Phaser.Timer.SECOND * 4, () => {
        location.reload();
    } , this);
}

var GameState = {
    preload: function () {
        game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');

        game.load.image('background',"assets/images/jungle_bg.jpg");
        game.load.image('player',"assets/images/rsz_robin.png");
        game.load.image('family',"assets/images/family.png");
        game.load.image('player_final',"assets/images/rsz_robin_final.png");
        game.load.image('arrow_bag',"assets/images/arrow_bag.png");

        //achievements
        game.load.image('dot',"assets/images/rsz_dot.png");
        game.load.image('line',"assets/images/rsz_line.png");
        game.load.image('ray',"assets/images/rsz_ray.png");

        //misleadings
        game.load.image('cube',"assets/images/rsz_cube.png");
        game.load.image('cylinder',"assets/images/rsz_cylinder.png");
        game.load.image('rectangle',"assets/images/rsz_rectangle.png");

        //enemy
        game.load.image('enemy_1',"assets/images/enemy_1.png");
        game.load.image('enemy_2',"assets/images/enemy_2.png");
        game.load.image('enemy_3',"assets/images/enemy_3.png");


        game.load.audio('music', ['assets/audio/gerilim.mp3', 'assets/audio/gerilim.ogg']);
        game.load.audio('ray_effect', ['assets/audio/ray.mp3', 'assets/audio/ray.ogg']);
        game.load.audio('line_effect', ['assets/audio/line.mp3', 'assets/audio/line.ogg']);
        game.load.audio('dot_effect', ['assets/audio/dot.mp3', 'assets/audio/dot.ogg']);
        game.load.audio('final_music', ['assets/audio/final_music.mp3', 'assets/audio/final_music.ogg']);

        game.load.spritesheet('button', 'assets/buttons/button_ok_1.png', 154, 170);

    },
    create: function () {
        //environmental settings
        music = game.add.audio('music');
        ray_effect = game.add.audio('ray_effect');
        line_effect = game.add.audio('line_effect');
        dot_effect = game.add.audio('dot_effect');
        final_music = game.add.audio('final_music');

        background = game.add.tileSprite(0,0,SCREEN_WIDTH,SCREEN_HEIGHT,'background');

        //player settings
        player = game.add.sprite(5,SCREEN_HEIGHT-200,'player');
        family = game.add.sprite(SCREEN_WIDTH+250,SCREEN_HEIGHT-200,'family');

        player.visible = false;
        family.visible = false;

        game.physics.enable(player,Phaser.Physics.ARCADE);
        game.physics.enable(family,Phaser.Physics.ARCADE);

        //cursors
        cursors = game.input.keyboard.createCursorKeys();

        //arrow bag settings
        arrow_bag = game.add.sprite(SCREEN_WIDTH-120,SCREEN_HEIGHT-140,'arrow_bag');
        arrow_bag.visible = false;

        //Achievements
        dot = game.add.sprite(game.world.centerX,game.world.centerY+130,'dot');
        dot.visible = false;
        dot.inputEnabled = true;
        dot.events.onInputDown.add(listener,this);

        line = game.add.sprite(game.world.centerX - 200,game.world.centerY+70,'line');
        line.visible = false;
        line.inputEnabled = true;
        line.events.onInputDown.add(listener,this);

        ray = game.add.sprite(game.world.centerX + 100,game.world.centerY+70,'ray');
        ray.visible = false;
        ray.inputEnabled = true;
        ray.events.onInputDown.add(listener,this);

        //Misleadings
        cube = game.add.sprite(game.world.centerX-180,game.world.centerY-80,'cube');
        cube.visible = false;
        cube.inputEnabled = true;
        cube.events.onInputDown.add(listener,this);

        cylinder = game.add.sprite(game.world.centerX+100,game.world.centerY-130,'cylinder');
        cylinder.visible = false;
        cylinder.inputEnabled = true;
        cylinder.events.onInputDown.add(listener,this);

        rectangle = game.add.sprite(50 ,game.world.centerY+70,'rectangle');
        rectangle.visible = false;
        rectangle.inputEnabled = true;
        rectangle.events.onInputDown.add(listener,this);

        // Okey Button
        okeyButton = game.add.button(game.world.centerX - 95, game.world.centerY, 'button', actionOnClick, this)//, 1, 1, 0);

        // Information Text

        informationText = game.add.text(game.world.centerX-150,game.world.centerY-150,stage_0_text,
            {font:'24px Arial',backgroundColor:'red', fill: '#ffffff'});


        //bullets_first group
        bullets_first = game.add.group();
        bullets_first.enableBody = true;
        bullets_first.physicsBodyType = Phaser.Physics.ARCADE;

        //bullets_second group
        bullets_second = game.add.group();
        bullets_second.enableBody = true;
        bullets_second.physicsBodyType = Phaser.Physics.ARCADE;

        //bullets_third group
        bullets_third = game.add.group();
        bullets_third.enableBody = true;
        bullets_third.physicsBodyType = Phaser.Physics.ARCADE;


        // fireButton Released
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //enemies_group_for_first
        enemies_group_for_first = game.add.group();
        enemies_group_for_first.enableBody = true;
        enemies_group_for_first.physicsBodyType = Phaser.Physics.ARCADE;

        //enemies_group_for_second
        enemies_group_for_second = game.add.group();
        enemies_group_for_second.enableBody = true;
        enemies_group_for_second.physicsBodyType = Phaser.Physics.ARCADE;

        //enemies_group_for_third
        enemies_group_for_third = game.add.group();
        enemies_group_for_third.enableBody = true;
        enemies_group_for_third.physicsBodyType = Phaser.Physics.ARCADE;

        createEnemiesForFirstMonster();
        createEnemiesForSecondMonster();
        createEnemiesForThirdMonster();

    },
    update:function () {
        //scoreText.text = 'Score';
        background.tilePosition.x -=backgorund_velocity;

        if (stage == 1)
        {
            informationText.visible = true;
            okeyButton.visible = true;
        }
        else if(stage == 2)
        {
            informationText.visible = true;
            informationText.y = 0;
            informationText.x = 0;
            okeyButton.visible = false;
            arrow_bag.visible = true;
            dot.visible = true;
            line.visible = true;
            ray.visible = true;
            cube.visible = true;
            cylinder.visible = true;
            rectangle.visible = true;
        }
        else
        {
            player.body.velocity.x = 0;
            if(cursors.left.isDown)
            {
                if(player.position.x > PLAYER_LEFT_RESTIRICTION_VALUE)
                    player.body.velocity.x = -1*PLAYER_VELOCITY;
            }
            if(cursors.right.isDown)
            {
                if(player.position.x + player.width < SCREEN_WIDTH)
                    player.body.velocity.x = PLAYER_VELOCITY;
            }

            game.physics.arcade.overlap(bullets_first,enemies_group_for_first,hitEnemyHandlerForFirstMonster,null,this);
            game.physics.arcade.overlap(bullets_second,enemies_group_for_second,hitEnemyHandlerForSecondMonster,null,this);
            game.physics.arcade.overlap(bullets_third,enemies_group_for_third,hitEnemyHandlerForThirdMonster,null,this);

            game.physics.arcade.overlap(player,enemies_group_for_first,playerDieHandler,null,this);
            game.physics.arcade.overlap(player,enemies_group_for_second,playerDieHandler,null,this);
            game.physics.arcade.overlap(player,enemies_group_for_third,playerDieHandler,null,this);
            game.physics.arcade.overlap(family,player,convergeAllFamily,null,this);


            if ( stage === 3)
            {
                if(is_game_startable===true)
                {
                    if(fireButton.isDown)
                    {
                        fireBullet();
                    }
                }
            }
            else if(stage === 4)
            {
                game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                    informationText.x = SCREEN_WIDTH-350;
                    informationText.visible = true;
                    informationText.text = game_first_barrier_completed;
                } , this);

                game.time.events.add(Phaser.Timer.SECOND * 5, () => {
                    informationText.x = SCREEN_WIDTH-350;
                    informationText.visible = false;
                } , this);

                ++stage; // Stage 5 geç

            }
            else if(stage === 5)
            {
                game.time.events.add(Phaser.Timer.SECOND * 8, () => {
                    //Burada artık ikinci canavarları yollayabilirsin
                    console.log("Second monsters is coming soon: .",stage);
                } , this);

                ++stage;
            }
            else if(stage === 6)
            {
                game.time.events.add(Phaser.Timer.SECOND * 9, () => {
                    bullets_second.visible = true;
                    bullets_first.visible = false;
                    bullets_third.visible = false;
                    console.log("Count living for second enemies:",enemies_group_for_second.countLiving());
                    enemies_group_for_second.visible = true;
                    tween_for_second_monster = game.add.tween(enemies_group_for_second).to({x:0},5000,Phaser.Easing.Linear.None,true,0,100,true);
                    //console.log(tween_for_second_monster);
                } , this);
                ++stage;
            }
            else if(stage === 7)
            {
                if(fireButton.isDown)
                {
                    fireBullet();
                }
            }
            else if(stage === 8)
            {
                game.time.events.add(Phaser.Timer.SECOND * 4, () => {
                    informationText.x = SCREEN_WIDTH-350;
                    informationText.visible = true;
                    informationText.text = game_dot_information_text;
                } , this);

                game.time.events.add(Phaser.Timer.SECOND * 8, () => {
                    informationText.x = SCREEN_WIDTH-350;
                    informationText.visible = false;
                } , this);
                ++stage; // Stage 5 geç
            }
            else if( stage === 9)
            {
                // Artık 3. canavarları yollayabilirisn
                game.time.events.add(Phaser.Timer.SECOND * 12, () => {
                    //Burada artık ikinci canavarları yollayabilirsin
                    console.log("Third monsters is coming soon: .",stage);
                } , this);

                ++stage;
            }
            else if(stage === 10)
            {
                game.time.events.add(Phaser.Timer.SECOND * 13, () => {
                    bullets_second.visible = false;
                    bullets_first.visible = false;
                    bullets_third.visible = true;
                    console.log("Count living for third enemies:",enemies_group_for_third.countLiving());
                    enemies_group_for_third.visible = true;
                    tween_for_third_monster = game.add.tween(enemies_group_for_third).to({x:0},5000,Phaser.Easing.Linear.None,true,0,100,true);
                } , this);
                ++stage;
            }
            else if(stage === 11)
            {
                if(fireButton.isDown)
                {
                    fireBullet();
                }
            }
            else if(stage === 12)
            {

                if(player.x <= (SCREEN_WIDTH / 2)-150)
                    player.body.velocity.x +=40;
                else
                {
                    player.x = SCREEN_WIDTH / 2;
                    ++stage;
                }
            }
            else if( stage === 13)
            {
                console.log("You are at stage: ",stage)
                family.visible = true;
                family.body.velocity.x -= 1;

            }

        }




    }
}
function convergeAllFamily()
{
    ++stage;
    family.x = player.x + 50;

}
function playerDieHandler()
{
    resetGame();
    informationText.text =
    console.log('game is over');
}
function hitEnemyHandlerForFirstMonster(bullet,enemy)
{
    bullet.kill();
    enemy.kill();

    if(enemies_group_for_first.countLiving() === 0)
    {
        ++stage; // stage 4 geç
        console.log("All enemies_group_for_first die and stage: ",stage);
        tween_for_first_monster.stop();
    }
}
function hitEnemyHandlerForSecondMonster(bullet,enemy)
{
    bullet.kill();
    enemy.kill();

    if(enemies_group_for_second.countLiving() === 0)
    {
        ++stage; // stage 8 geç
        console.log("All enemies_group_for_second die and stage: ",stage);
        tween_for_second_monster.stop();
    }
}
function hitEnemyHandlerForThirdMonster(bullet,enemy)
{
    bullet.kill();
    enemy.kill();

    if(enemies_group_for_third.countLiving() === 0)
    {
        ++stage; // stage
        music.stop();
        final_music.play();
        console.log("All enemies_group_for_third die and stage: ",stage);
        player.loadTexture('player_final',0);
        tween_for_third_monster.stop();
    }
}
function createEnemiesForThirdMonster()
{
    for(var i = 0; i<ENEMY_NUMBER_FOR_THIRD_MONSTER; i++)
    {
        var enemy = enemies_group_for_third.create(0 + i * 200, 0, 'enemy_3');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(0.4);
    }
    enemies_group_for_third.x = SCREEN_WIDTH;
    enemies_group_for_third.y = SCREEN_HEIGHT - 150;
    enemies_group_for_third.visible = false;
}
function createEnemiesForSecondMonster()
{
    for(var i = 0; i<ENEMY_NUMBER_FOR_SECOND_MONSTER; i++)
    {
        var enemy = enemies_group_for_second.create(0 + i * 200, 0, 'enemy_2');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(0.4);
    }
    enemies_group_for_second.x = SCREEN_WIDTH;
    enemies_group_for_second.y = SCREEN_HEIGHT - 150;
    enemies_group_for_second.visible = false;
}

function createEnemiesForFirstMonster()
{
    for(var i = 0; i<ENEMY_NUMBER_FOR_FIRST_MONSTER; i++)
    {
        var enemy = enemies_group_for_first.create(0 + i * 200, 0, 'enemy_1');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(0.4);
    }
    enemies_group_for_first.x = SCREEN_WIDTH;
    enemies_group_for_first.y = SCREEN_HEIGHT - 150;
    enemies_group_for_first.visible = false;
}

function fireBullet()
{
    console.log("Fire Button Released and stage:",stage);

    if(stage === 3)
    {
        if(bullet_type !== 'ray')
        {
            informationText.text = game_is_over_wrong_selection_text;
            informationText.visible = true;

            tween_for_first_monster.stop();
            game.time.events.add(Phaser.Timer.SECOND * 2, resetGame , this);
            return;
        }
        if (game.time.now > bulletTime) {
            ray_effect.play();
            bullet = bullets_first.getFirstExists(false);

            if (bullet) {
                bullet.reset(player.x + 200, player.y + 45);
                bullet.body.velocity.x = BULLET_VELOCITY;
                bulletTime = game.time.now + BULLET_TIME_VELOCITY;
            }
        }
    }
    else if(stage === 7)
    {
        if(bullet_type !== 'line')
        {
            informationText.text = game_is_over_wrong_selection_text;
            informationText.visible = true;

            tween_for_second_monster.stop();
            game.time.events.add(Phaser.Timer.SECOND * 2, resetGame , this);
            return;
        }
        if (game.time.now > bulletTime) {
            line_effect.play();
            bullet = bullets_second.getFirstExists(false);

            if (bullet) {
                bullet.reset(player.x + 200, player.y + 45);
                bullet.body.velocity.x = BULLET_VELOCITY;
                bulletTime = game.time.now + BULLET_TIME_VELOCITY;
            }
        }
    }
    else if(stage === 11)
    {
        if(bullet_type !== 'dot')
        {
            informationText.text = game_is_over_wrong_selection_text;
            informationText.visible = true;

            tween_for_third_monster.stop();
            game.time.events.add(Phaser.Timer.SECOND * 2, resetGame , this);
            return;
        }
        if (game.time.now > bulletTime) {
            dot_effect.play();
            bullet = bullets_third.getFirstExists(false);

            if (bullet) {
                bullet.reset(player.x + 200, player.y + 75);
                bullet.body.velocity.x = BULLET_VELOCITY;
                bulletTime = game.time.now + BULLET_TIME_VELOCITY;
            }
        }
    }

}

function listener(e)
{
    const item = e.key;
    if(!is_item_selected)
    {
        switch (select_item_click_order) {
            case 0:
                if(item != 'dot')
                {
                    console.log("Dot is not selected");
                    informationText.text = game_failed_text;
                    resetGame();

                }
                else
                {
                    dot.y = arrow_bag.y - 90;
                    dot.x = arrow_bag.x;
                    ++select_item_click_order;

                }
                break;
            case 1:
                if(item != 'line')
                {
                    console.log("Line is not selected");
                    informationText.text = game_failed_text;
                    resetGame();
                }
                else
                {
                    line.y = arrow_bag.y - 180;
                    line.x = arrow_bag.x-80;
                    ++select_item_click_order;

                }
                break;
            case 2:

                if(item != 'ray')
                {
                    console.log("Ray is not selected");
                    informationText.text = game_failed_text;
                    is_item_selected = false;
                    resetGame();

                }
                else
                {
                    ray.y = arrow_bag.y - 250;
                    ray.x = arrow_bag.x-80;
                    ++select_item_click_order;
                    is_item_selected = true;
                }

                break;
        }
    }
    else
    {
        bullet_type = item;
        console.log("after selected item:",item," and stage :",stage);
    }
}
function actionOnClick ()
{
    if(stage === 0)
    {
        informationText.visible = false;
        okeyButton.visible = false;
        ++stage; //stage 1'e geç
        console.log("Stage 0 is completed and Current Stage:",stage),
        informationText.text = stage_1_text;
        music.loopFull();
    }
    else if (stage === 1)
    {
        ++stage; //stage 2'ye geç
        console.log("Stage 1 completed and Current Stage:",stage),
        informationText.visible = false;
        okeyButton.visible = false;
        informationText.text = stage_2_text;
        game.time.events.add(Phaser.Timer.SECOND * SELECT_ITEM_DURATION, itemSelected , this);
    }
    console.log("Green Hand Clicked and stage:", stage);
}
function itemSelected(){
    if(is_item_selected === true)
    {
        console.log('Selection item success and stage: ',stage);
        rectangle.visible = false;
        cube.visible = false;
        cylinder.visible = false;
        arrow_bag.visible =false;
        player.visible = false;
        informationText.visible = false;
        dot.x = 10;dot.y = 10;
        ray.x = 100;ray.y = 40;
        line.x = 300;line.y = 40;
        backgorund_velocity = 0.3;

        game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            informationText.x = SCREEN_WIDTH-350;
            informationText.visible = true;

            informationText.text = game_right_top_information_0;
        } , this);
        game.time.events.add(Phaser.Timer.SECOND * 5, () => {

            informationText.text = game_right_top_information_1;
        } , this);
        game.time.events.add(Phaser.Timer.SECOND * 8, () => {
            informationText.text = game_line_information_text;
            informationText.visible = true;
        });


        game.time.events.add(Phaser.Timer.SECOND * 12, () => {
            bullets_first.createMultiple(30,'ray');
            bullets_first.setAll('anchor.x',0.5);
            bullets_first.setAll('anchor.y',1);
            bullets_first.setAll('outOfBoundsKill',true);
            bullets_first.setAll('checkWorldBounds',true);

            bullets_second.createMultiple(30,'line');
            bullets_second.setAll('anchor.x',0.5);
            bullets_second.setAll('anchor.y',1);
            bullets_second.setAll('outOfBoundsKill',true);
            bullets_second.setAll('checkWorldBounds',true);
            bullets_second.visible =false;

            bullets_third.createMultiple(30,'dot');
            bullets_third.setAll('anchor.x',0.5);
            bullets_third.setAll('anchor.y',1);
            bullets_third.setAll('outOfBoundsKill',true);
            bullets_third.setAll('checkWorldBounds',true);
            bullets_third.visible =false;

            player.visible = true;
            informationText.visible = false;
            is_game_startable = true;
            enemies_group_for_first.visible = true;

            tween_for_first_monster = game.add.tween(enemies_group_for_first).to({x:0},5000,Phaser.Easing.Linear.None,true,0,100,true);

        } , this);

        ++stage; //stage 3 geç
        console.log("item selected and stage: ",stage)
    }
    else
    {
        informationText.text = game_failed_text;
        console.log('item selection is fail')
        resetGame();
    }
}

game.state.add('GameState',GameState);
game.state.start('GameState');


