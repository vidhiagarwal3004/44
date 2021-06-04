var backImage,backgr;
var player, player_running;
var ground,ground_img;
var objImage,objgrp;
var banana , bananaImage,bananagrp;
var gameoverimg,gameover;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  objImage= loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  gameoverimg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.7;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.17;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  objgrp = new Group();
  bananagrp = new Group();
}

function draw() { 
  background(0);
   

  textSize(20);
  fill("black");
  text("Score: " + score ,30,50);
  
  if(gameState===PLAY){
     
    object()
    bananafunc()

    if(backgr.x<100)
    {
      backgr.x=backgr.width/2;
    }


    player.collide(ground);
    
    if(keyDown("space")) 
    {
      player.velocityY = -12;
    }


    player.velocityY = player.velocityY + 0.8;
  

    if(player.isTouching(bananagrp))
    {
     bananagrp.destroyEach();
      player.scale += 0.05;
      objgrp.scale += 0.05;
      score = score +3;
    }
   

    if(score>10)
    {
      objgrp.velocityX +=1;
     bananagrp.velocityX +=1;
    }


   if(player.isTouching(objgrp))
  {
    gameState = END;
    gameover = createSprite(300,200,10,10);
    gameover.addAnimation("gameover", gameoverimg);
  }

   if(gameState === END)
  {
    backgr.velocityX = 0;
    player.velocityY = 0;

    
     objgrp.setVelocityXEach(0);
     bananagrp.setVelocityXEach(0);
    

     objgrp.setLifetimeEach(-1);
    bananagrp.setLifetimeEach(-1);
  }
 }
  
  drawSprites();
}
function object()
{
   if (frameCount % 100 === 0)
     {
  obj = createSprite(400,340,10,40);
      
        obj.addAnimation("obj", objImage);
        obj.velocityX = -8;
        obj.scale = 0.1;
       console.log(obj.x);
       obj.lifetime = 120
       objgrp.add(obj);
     }}
     
//banana func
function bananafunc()
{
  if(frameCount % 80 == 0)
    {
      banana = createSprite(400,300,40,10);
      banana.y = Math.round(random(120,300));
      banana.addAnimation("banana", bananaImage);
      banana.lifetime = 150;
     banana.scale = 0.1;
      banana.velocityX = -8;
      
      bananagrp.add(banana);
    }
}