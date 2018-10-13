var genislik = window.innerWidth
var yukseklik = window.innerHeight
var game = new Phaser.Game(genislik, yukseklik,Phaser.AUTO);
var bulletExist = false;
var background;
var ka = 0
var sonKontrol = true;
var backgorund_velocity = 2;
var secenekDurumu;
var player;
var cursors;
var goruldu = 1
var dogruSayisi = 0
var yanlısSayisi = 0
var bombvoice;
var fireButton
var mermivoice;
var sayac = 0;
var birinci  = false;
var ikinci  = false;
var ucuncu  = false;
var dorduncu  = false;
var anases;
var kontrol = true;
var randomNumber;
var puan = 0;
var operatorText = "+";
var operand1Text =  5;
var operand2Text = 6;
var operator;
var sayi = 1;
var sayi2 = 1; //Cevabı tıklarken 1 kez tıklamayı sağlar
var sorucontrol = false;
var operand1;
var operand2;
var randomHelicopter;
var bolmeText;
var carpma;
var bolme;
var toplama;
var cikarma;
var secenek1;
var secenek2;
var secenek3;
var sonuc;

var cevaplandi = false
var b_carpma = false;
var b_bolme = false;
var b_toplama = false;
var b_cikarma = false;

var boolKontrol = false;
var dusman = [];
var fire = [];
var first = true;
var mermiSayisi = 499;
var dusmanHizi = 5
var bmpText;
var soruVar = false;
var operatorSecildi = false;
var fireSayisi = 0;
var dusmanSayisi = 0;
var helicopterSecildi = false;

var GameState = {
    preload: function () {
        game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('puan', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('secenek1', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('secenek2', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('secenek3', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('sonuc', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');

        game.load.bitmapFont('operator', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('operand1', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('operand2', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('toplama', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('cikarma', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('carpma', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.bitmapFont('bolme', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        game.load.audio('patlama', 'assets/audio/patlama.mp3');
        game.load.audio('anases', 'assets/audio/main.mp3');
        game.load.audio('mermi', 'assets/audio/mermi.mp3');
        game.load.image('firstBackground',"assets/images/mainBackground.jpg");        
        game.load.image('fire',"assets/images/fire.png");
        game.load.image('helicopter1',"assets/images/helicopter1.png");
        game.load.image('helicopter2',"assets/images/helicopter2.png");
        game.load.image('helicopter3',"assets/images/helicopter3.png");
        game.load.image('helicopter4',"assets/images/helicopter4.png");
        game.load.image('dusman',"assets/images/dusman.png");
        game.load.image('dusman2',"assets/images/dusman2.png");
        game.load.image('dusman3',"assets/images/dusman3.png");
        game.load.image('dusman4',"assets/images/dusman4.png");
    },
        create: function () {
        
        bombvoice = game.add.audio('patlama');
        background = game.add.tileSprite(0,0,genislik,yukseklik,'firstBackground');
        helicopter1 = game.add.sprite(genislik * (100/1280), yukseklik * (100/650),'helicopter1');
        helicopter1.scale.setTo( genislik * yukseklik * ( 0.5/(1280*650)));
        helicopter2 = game.add.sprite(genislik * (100/1280),yukseklik * (300/650),'helicopter2');
        helicopter2.scale.setTo(genislik * yukseklik * ( 0.5/(1280*650)));
        helicopter4 = game.add.sprite(genislik * (700/1280),yukseklik * (100/650),'helicopter4');
        helicopter4.scale.setTo(genislik * yukseklik * ( 0.1/(1280*650)));
        helicopter3 = game.add.sprite(genislik * (700/1280),yukseklik * (350/650),'helicopter3');
        helicopter3.scale.setTo(genislik * yukseklik * ( 0.1/(1280*650)));
        bmpText = game.add.bitmapText(genislik * (100/1280), yukseklik * (500 / 650) , 'desyrel', 'Phaser & Pixi\nrocking!',( genislik*yukseklik*( 64/(1280*650))));
        bmpText2 = game.add.bitmapText(genislik*  (650/1280), yukseklik * (500 / 650), 'puan', 'Phaser & Pixi\nrocking!', ( genislik*yukseklik*( 64/(1280*650))));
        bmpText3 = game.add.bitmapText(genislik*  (650/1280), yukseklik * (500 / 650), 'puan', 'OYUN BITTI', ( genislik*yukseklik*( 64/(1280*650))));
        bmpText3.visible = false
        bolme = game.add.bitmapText(genislik*(1100/1280), yukseklik* (160/650), 'bolme', '', ( genislik*yukseklik*( 100/(1280*650))));
        bolme.text = "/";
        bolme.visible =false;
        
        carpma = game.add.bitmapText(genislik*(1100/1280), yukseklik* (10/650), 'carpma', '', ( genislik*yukseklik*( 100/(1280*650))));
        carpma.text = "X";
        carpma.visible = false;
        cikarma = game.add.bitmapText(genislik*(1100/1280), yukseklik* (310/650), 'cikarma', '', ( genislik*yukseklik*( 150/(1280*650))));
        cikarma.text = "-";
        cikarma.visible = false;
        toplama = game.add.bitmapText(genislik*(1100/1280), yukseklik* (460/650), 'toplama', '', ( genislik*yukseklik*( 150/(1280*650))));
        toplama.text = "+";
        toplama.visible = false;

        secenek1 = game.add.bitmapText(genislik*(1100/1280), yukseklik* (10/650), 'secenek1', '', ( genislik*yukseklik*( 100/(1280*650))));        
        secenek1.visible =false;

        secenek2 = game.add.bitmapText(genislik*(1100/1280), yukseklik* (160/650), 'secenek2', '', ( genislik*yukseklik*( 100/(1280*650))));        
        secenek2.visible =false;

        secenek3 = game.add.bitmapText(genislik*(1100/1280), yukseklik* (310/650), 'secenek3', '', ( genislik*yukseklik*( 100/(1280*650))));        
        secenek3.visible =false;

        sonuc = game.add.bitmapText(genislik*(1100/1280), yukseklik* (460/650), 'sonuc', '', ( genislik*yukseklik*( 100/(1280*650))));        
        sonuc.visible =false;

                    

        operator = game.add.bitmapText(genislik * (1200/1280),yukseklik *( 300/650), 'operator', '', ( genislik*yukseklik*( 64/(1280*650))));
        operand1 = game.add.bitmapText(genislik * (1200/1280), yukseklik *( 100/650), 'operand1', '', ( genislik*yukseklik*( 64/(1280*650))));
        operand2 = game.add.bitmapText(genislik * (1200/1280), yukseklik *( 500/650), 'operand2', '', ( genislik*yukseklik*( 64/(1280*650))));
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        cursors = game.input.keyboard.createCursorKeys();
        
        anases = game.add.audio('anases');
        anases.play();
        anases.volume = 0.2
    
    
    },
    update:function () {
        
        if(mermiSayisi <= 0)
        {
            var y
            for( y =0; y< dusmanSayisi; y++)
            {
                dusman[y].visible = false
            }
            for(y = 0; y < fireSayisi; y++)
            {
                fire[y].visible = false
            }
            bmpText3.text = "OYUN BITTI \n Dogru Sayisi:"+ dogruSayisi + "\nYanlis Sayisi:" + yanlısSayisi + "\nBasari Yuzdesi:" + parseInt((dogruSayisi/(dogruSayisi+yanlısSayisi))*100)
            bmpText3.visible = true
            bmpText3.x = genislik *(400/1280);
            bmpText3.y = yukseklik * (100/650);
            bmpText3.scale.setTo(  genislik * yukseklik * (1 / (1280 * 650)))
            bmpText.text = 'Kalan Mermi \n' + 0;
            return
        }
        var s2 
        for(s2 = 0; s2 < dusmanSayisi; s2++)
        {
            if(Math.abs(dusman[s2].x - player.x) < genislik*(100/1280) && Math.abs(dusman[s2].y - player.y) <yukseklik * (100/650) )
            {
                bombvoice.play();
                dusman[s2].visible = false
                dusman[s2].x = -1000
                 mermiSayisi = mermiSayisi - 10

            }
        }

        
        bmpText.text = 'Kalan Mermi \n' + Math.round(mermiSayisi);
        bmpText2.text = 'Toplam Puan \n' + Math.round(puan);
        
        // bolme.text =   "/";
        // carpma.text = "X";
        // toplama.text = "+";
        // cikarma.text = "-";
        if(helicopterSecildi)
        {
            if(bulletExist)
            {
             
                var j;
                for( j = 0; j < fireSayisi; j++)
                {
                    
                    //fire[j].x =150;
                    fire[j].x += genislik *  (20/ 1280);
                    fire[j].y += 5;
                     //fire[j].y +=  Math.sqrt(Math.sqrt(i))* 1.2;
                    
                }
            }

            
            if(mermiSayisi % 100 == 0 && mermiSayisi != 0 ) 
            {            
                soruVar = true;
                
                cevaplandi = false;
                sayi = 1;
            }
            if(!soruVar)
            {

            bolme.visible = false ;
            carpma.visible = false;
            cikarma.visible = false;
            toplama.visible = false;
            goruldu = 1;
            operand1.x = genislik *  (1100/1280)
            operand2.x = genislik *  (1100/1280)
            operator.x = genislik *  (1100/1280)
            if(ucuncu  || dorduncu)
            {
                player.scale.setTo( genislik*yukseklik *  (0.1/(1280*650)));
                
            }
            else if(ikinci || birinci)
            {
                
                player.scale.setTo(genislik*yukseklik *  (0.5/(1280*650)));
            }
            
        var x ,y;
        for(x = 0 ; x < dusmanSayisi; x++)
        {
            for(y = 0; y < fireSayisi; y++)
            {
                if(dusman[x].x - fire[y].x <= genislik * (50/1280 ) && dusman[x].x - fire[y].x >= genislik * (-50/1280) && dusman[x].y - fire[y].y <= yukseklik * (50/650) && dusman[x].y - fire[y].y >=yukseklik * ( -50/650))
                {
                    
                    bombvoice.play();
    
                     dusman[x].kill();
                     dusman[x].x = -1;
                     dusman[x].y = -1;
                    //dusmanSayisi--;
                    fire[y].destroy()
                    puan += 50;
                    //fireSayisi--;
                }
            }


            
            
        }


        if(kontrol)
        {
            var i;
            for(i = 0; i < dusmanSayisi; i++)
            {
                dusman[i].position.x -= dusmanHizi;
            }
            
        }
       
        background.tilePosition.x +=backgorund_velocity;
        sayac++;
            if(sayac == 50)
            {
                randomNumber = Math.random() * 300 + 30;
                randomHelicopter = Math.floor(Math.random() * 4);
                
                var helicopterType;
                switch (randomHelicopter){
                    case 0: helicopterType = "dusman";
                    break;
                    case 1: helicopterType = "dusman2";
                    break;
                    case 2: helicopterType = "dusman3";
                    break;
                    case 3: helicopterType = "dusman4";
                    break;
                }
                
                dusman.push (game.add.sprite(game.world.centerX,game.world.centerY,helicopterType));
                dusmanSayisi += 1;
                dusman[dusmanSayisi-1].position.x= genislik * (1100 / 1280);
                dusman[dusmanSayisi-1].position.y = randomNumber;
                dusman[dusmanSayisi-1].scale.setTo( genislik * yukseklik * (0.2/(1280 * 650)));
                
                
                sayac = 0;
                kontrol = true;
            }
        if(cursors.left.isDown)
        {

            if(player.x === 0)
            {
                
            }
            else
            {
                player.x -= genislik * (10/1280);
            }
            


            
        }
        if(cursors.right.isDown)
        {
            
            if(player.x === genislik * ( 1050/1280))
            {
                
            }
            else
            {
                player.x += genislik * ( 10/1280);
            }
        }
        if (cursors.up.isDown)
        {
            
             player.y -= yukseklik * ( 8/650);
        }
        if(cursors.down.isDown)
        {
            player.y += yukseklik * ( 8/650);
        }
        if(fireButton.isDown && mermiSayisi > 0 && mermiSayisi % 100 != 0)
        {
            fire.push(game.add.sprite(player.position.x + (genislik * (200 / 1280)),player.position.y +(yukseklik * (75/650)) ,'fire'));
            mermivoice = game.add.audio('mermi');
            mermivoice.play();
            mermivoice.volume = 0.2
            
            mermiSayisi--;
            fireSayisi += 1;
            
            fire[fireSayisi-1].scale.setTo( genislik * yukseklik *  0.05/(1280 * 650));
            
            bulletExist = true;
            
        }
        secenekDurumu = randomNumber = Math.floor( Math.random() * 4);
            }
            else//soru var
            {
                if(operatorSecildi)
                {
                    if(goruldu == 1)
                    {
                        
                        operator.text = operatorText;
                        operand1.text = operand1Text;
                        operand2.text = operand2Text;
                        operand1.visible = operand2.visible = operator.visible = true;
                        operand1.x -= genislik * (10 /1280);
                        operand2.x -= genislik * (10 /1280);
                        operator.x -= genislik * (10 /1280);
                    }
                    
                    
                    if(operand1.x < 0)
                    {   goruldu = 0
                        if(goruldu == 0)
                        {
                            operand1.x = 1280 *  (1100/1280);
                        operand2.x = 1280 *  (1100/1280);
                        operator.x = 1280 *  (1100/1280);
                            operand1.visible = operand2.visible = operator.visible = false;
                        }
                        operand1.x = operand2.x = operator.x = genislik *  (500 / 1280);
                        secenekAyarla(secenekDurumu)
                        
                        console.log("////////////////////" ,sonuc.visible )
                    }
                    

                    if(cevaplandi)
                    {
                        soruVar = false;
                        return
                    }
                    else //soru var, operator secili, cevaplanmadı
                    {
                        
                    //if(key1.isDown)
                    {
                        var latif = 0;
                        for(latif = 0; latif < 10000000; latif++)
                        {

                        }
                        ka++
                        if(ka == 80)
                        {
                            mermiSayisi--;
                            ka = 0;
                        }
                        
                        //if(game.input.x > 1100 && game.input.y <=160 && sayi2 > 0)
                        if(key1.isDown)
                        {
                            if(secenekDurumu == 0)
                            {
                                Dogru()
                                sonuc.visible = false
                            }
                            else
                            {
                                Yanlis()
                            }
                            
                        
                        }
                        //else if(game.input.x > 1100 && game.input.y> 160 && game.input.y <=310 && sayi2 > 0)
                        else if(key2.isDown)
                        {
                            if(secenekDurumu == 1)
                            {
                                Dogru()
                                sonuc.visible = false
                            }
                            else
                            {
                                Yanlis()
                            }
                        
                        }
                        //else if(game.input.x > 1100 && game.input.y> 310 && game.input.y <=460 &&sayi2 > 0)
                        else if(key3.isDown)
                        {
                            if(secenekDurumu == 2)
                            {
                                Dogru()
                                sonuc.visible = false
                            }
                            else
                            {
                                Yanlis()
                            }
                        
                              
                        }
                        //else if(game.input.x > 1100 && game.input.y> 460 && game.input.y <=610 && sayi2 > 0)
                        else if(fireButton.isDown)
                        {
                            
                            if(secenekDurumu == 3)
                            {
                                Dogru()
                                sonuc.visible = false
                            }
                            else
                            {
                                Yanlis()
                            }
                        }
                        
                    } 
                }
                        
                        
                        
                         
                        
                        
                    
                    }
                    
                else//Operator secilmedi
                {                    
                    
                    if(cursors.left.isDown)
                    {
                        if(player.x === 0)
                        {
                                
                        }
                        else
                        {
                            player.x -= genislik * (8/ 1280);
                        }
                        
                    }
                    if(cursors.right.isDown)
                    {
                        
                        if(player.x === genislik *  (1050 / 1280))
                        {
                            
                        }
                        else
                        {
                            player.x += genislik *  (8 / 1280);
                        }
                    }
                    if (cursors.up.isDown)
                    {
                        
                        player.y -= yukseklik * (5/650);
                    }
                    if(cursors.down.isDown)
                    {
                        player.y +=yukseklik * (5/650);
                    }
                    
                   
                    operatorSecme()
                    return
                    


                }
                
            }
     

        
        }
    else //Helikopterin seçilmediği durum
        {
            if (game.input.mousePointer.isDown)
            {
                if(game.input.x <= genislik * (700 / 1280) && game.input.y <= yukseklik * (300 / 650))
                {
                    player = helicopter1;
                    //player.name = "helicopter1";
                    birinci == true;
                    helicopter2.destroy();
                    helicopter3.destroy();
                    helicopter4.destroy();
                    helicopterSecildi = true;

                }
                else if(game.input.x > genislik * (700 / 1280) && game.input.y <=yukseklik * (300 / 650))
                {
                    player = helicopter4;
                    //player.name = "helicopter4";
                    dorduncu == true;
                    helicopter1.destroy();
                    helicopter3.destroy();
                    helicopter2.destroy();
                    helicopterSecildi = true;
                }
                else if(game.input.x <= genislik * (700 / 1280) && game.input.y >yukseklik * (300 / 650))
                {
                    player = helicopter2;
                    //player.name = "helicopter2";
                    ikinci == true;
                    helicopter3.destroy();
                    helicopter1.destroy();
                    helicopter4.destroy();
                    helicopterSecildi = true;
                }
                else if(game.input.x > genislik * (700 / 1280) && game.input.y > yukseklik * (300 / 650))
                {
                    player = helicopter3;
                    //player.name = "helicopter3";
                    ucuncu = true;
                    helicopter2.destroy();
                    helicopter4.destroy();
                    helicopter1.destroy();
                    helicopterSecildi = true;
                }
            }
            
        }   

        }
}


function randomSayiUret(type)
{
    switch(type)
    {
        case "toplama":
        {
            operand2Text =  Math.floor(Math.random()*100);
            operand1Text =  Math.floor(Math.random()*100);
            sonuc.text = operand1Text + operand2Text;
            secenek1.text = parseInt(sonuc.text) + 4;
            secenek2.text = parseInt(sonuc.text) + 3;
            secenek3.text = parseInt(sonuc.text) + 5;

            break;
        }
        case "cikarma":
        {
            operand2Text =  Math.floor(Math.random()*100);
            operand1Text =  Math.floor(Math.random()*100);
            if(operand2Text > operand1Text)
            {
                
                temp = operand2Text ;
                operand2Text = operand1Text;
                operand1Text = temp;
            }
            sonuc.text = operand1Text - operand2Text;
            secenek1.text = parseInt(sonuc.text) + 4;
            secenek2.text = parseInt(sonuc.text) + 3;
            secenek3.text = parseInt(sonuc.text) + 5;
            break;
        }
        case "carpma":
        {
            operand2Text =  Math.floor(Math.random()*10);
            operand1Text =  Math.floor(Math.random()*10);
            sonuc.text = operand1Text * operand2Text;
            secenek1.text = parseInt(sonuc.text) + 4;
            secenek2.text = parseInt(sonuc.text) + 3;
            secenek3.text = parseInt(sonuc.text) + 5;
            break;
        }
        case "bolme":
        {
            do {
                
                temp1 =  Math.floor(Math.random()*100);
                temp2 =  Math.floor(Math.random()*20);
            }
            while (temp1 % temp2 != 0); 
            operand1Text =  temp1;
            operand2Text =  temp2;
            sonuc.text = operand1Text / operand2Text;
            secenek1.text = parseInt(sonuc.text) + 4;
            secenek2.text = parseInt(sonuc.text) + 3;
            secenek3.text = parseInt(sonuc.text) + 5;
            break;
        }
        
    }
}


function operatorSecme()
{
 
        bolme.visible = toplama.visible = carpma.visible = cikarma.visible = true;
        var t;
                    for(t = 0 ; t < fireSayisi ; t++)
                  {
                    fire[t].x = -1000
                  }
                  
                  if(cursors.left.isDown && sayi != 0)
                  {
                      
                    fire.push(game.add.sprite(player.position.x + genislik *  (200 / 1280 ),player.position.y + yukseklik * (75 / 650 ) ,'fire'));
                    mermivoice = game.add.audio('mermi');
                    mermivoice.play();
                    sayi--;
                    var z;
                    for(z = 0 ; z < fireSayisi ; z++)
                    {
                        if(fire[z].x < 0)
                        {
                            fire[z].x = -1000
                            fire[z].y = yukseklik + 500
                        }
                    }
                    fireSayisi += 1;
                    //fire[fireSayisi-1].position.x= 1100;
                    //fire[fireSayisi-1].position.y = randomNumber;
                    fire[fireSayisi-1].scale.setTo(0.05);
                    
                    
                    
                        fire[fireSayisi-1].x += 1000;
                        yAxis = fire[t].position.y
                        xAxis = fire[t].position.x
                        
                       if( xAxis >=genislik * ( 1100 / 1280) && yAxis > yukseklik)
                       {
                        fire[t].y = yukseklik * ( 1000/ 650);   
                       }

                       if(xAxis >= genislik * ( 1100 / 1280) && yAxis <= yukseklik *  (160/650)  && yAxis >= 0)
                       {
                        
                        carpma.visible = bolme.visible =toplama.visible = cikarma.visible =  false;
                        fire[t].y = yukseklik * ( 1000 / 650);
                        operatorText = "X";
                        randomSayiUret("carpma")
                        operatorSecildi = true;                        
                           
                       }
                       else if(xAxis >= genislik * ( 1100 / 1280 )&&  yAxis > yukseklik *  (160/650) && yAxis <= yukseklik *  (310/650))
                       {
                        
                        carpma.visible = bolme.visible =toplama.visible = cikarma.visible =  false;

                        
                        fire[t].y = yukseklik *  (1000 / 650);
                        operatorText = "/";
                        randomSayiUret("bolme")
                        
                        operatorSecildi = true;                        
                       }
                       else if(xAxis >= 1100 && yAxis > yukseklik *  (310/650) && yAxis <= yukseklik *  (460/650))
                       {                        
                        carpma.visible = bolme.visible =toplama.visible = cikarma.visible =  false;
                            fire[t].y = 1000;
                            operatorText = "-";
                            randomSayiUret("cikarma")
                            operatorSecildi = true;
                           
                       }
                       
                       else  if(xAxis >= 1100 && yAxis > yukseklik *  (460/650) && yAxis <= yukseklik *  (650/650))
                       {
                        
                            
                        carpma.visible = bolme.visible =toplama.visible = cikarma.visible =  false;
                            fire[t].y = 1000;
                            operatorText = "+";
                            randomSayiUret("toplama")
                            operatorSecildi = true;
                       }
     
                  }
                  
                  
}

function secenekAyarla(sDurum)//Uretilen sayiya göre secenekleri konumlandırır
{
    

    switch(sDurum)
    {
        case 0:
        {
            
            sonuc.y = yukseklik* (10/650)
            
            secenek1.y = yukseklik* (160/650)

            secenek2.y = yukseklik* (310/650)
            
            secenek3.y = yukseklik* (460/650)
            sonuc.visible = true;
            secenek1.visible = true;
            secenek2.visible = true;
            secenek3.visible = true;
            break;
        }
        
        case 1:
        {
            console.log("buraya gelid" , sDurum)   
            secenek1.y = yukseklik* (10/650)
            
            sonuc.y = yukseklik * (160/650)
            
            secenek2.y = yukseklik* (310/650)
            
            secenek3.y = yukseklik* (460/650)
            sonuc.visible = true;
            secenek1.visible = true;
            secenek2.visible = true;
            secenek3.visible = true;
            break;
        }
        
        case 2:
        {
            console.log("buraya gelid" , sDurum)
            secenek2.y = yukseklik* (10/650)
            
            secenek1.y = yukseklik* (160/650)
            
            sonuc.y = yukseklik* (310/650)
            
            secenek3.y = yukseklik* (460/650)
            sonuc.visible = true;
            secenek1.visible = true;
            secenek2.visible = true;
            secenek3.visible = true;
            break;
        }
        
        case 3:
        {
            console.log("buraya gelid" , sDurum)
            secenek3.y = yukseklik* (10/650)
            
            secenek1.y = yukseklik* (160/650)
            
            secenek2.y = yukseklik* (310/650)
            
            sonuc.y = yukseklik* (460/650)
            sonuc.visible = true;
            secenek1.visible = true;
            secenek2.visible = true;
            secenek3.visible = true;
            break;
        }
        
        
        
    }

    

}


function Yanlis()
{
    yanlısSayisi++;
    sayi2;
    puan -= 100
    mermiSayisi -= 10
    sonuc.visible = secenek1.visible = secenek2.visible = secenek3.visible = false;
    sorucontrol = true
    soruVar = false
    operatorSecildi = false;
    cevaplandi = true   
}
function Dogru()
{
    dogruSayisi++;
    sayi2--;
    puan += 500
    mermiSayisi += 199
    sonuc.visible = secenek1.visible = secenek2.visible = secenek3.visible = false;
    sorucontrol = true
    soruVar = false
    operatorSecildi = false;
    cevaplandi = true
}
game.state.add('GameState',GameState);
game.state.start('GameState');

