var PLAY=1;
var END=0;
var gameState=1;

var fruit1,fruit2,fruit3,fruit4,fruit1Image,fruit2Image,fruit3Image,fruit4Image;

var sword, swordImage;

var alien1,alien2,alien1Image,alien2Image;

var gameOverSound,knifeSwooshSound;

var score=0;


function preload()
{
  
   swordImage=loadImage("sword.png");
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  fruit4Image=loadImage("fruit4.png");
  alien1Image=loadImage("alien1.png");
  alien2Image=loadImage("alien2.png");
  gameOverSound=loadSound("gameover.mp3");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
}

function setup()
{
  createCanvas(600,600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  score=0;
  
  sword.setCollider("rectangle",0,0,40,40);
 // sword.debug=true;
  
 
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw()
{
  background("white");
 text("Score: "+ score, 500,50);
  if(gameState === PLAY){
  
  sword.x=World.mouseX;
  sword.y=World.mouseY;
   fruits();
    enemy();
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
    knifeSwooshSound.play();
    
  }
  
  if(enemyGroup.isTouching(sword)){
    gameState=END;
    gameOverSound.play();
    
  } 
    
  }
  if (gameState === END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setLifetime=0;
    fruitGroup.setLifetime=0;
    fruitGroup.visible=false;
    enemyGroup.visible=false;
    text("game over",300,300);
    sword.x=250;
    sword.y=300;
    
  } 
  
  
  
  
  
  
 
  
  
  
  drawSprites();
}

function fruits()

{
  if(World.frameCount%80===0){
    
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    
    var r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1Image);
    }else if(r==2){
      fruit.addImage(fruit2Image);
    }else if(r==3){
      fruit.addImage(fruit3Image);
  }  else {
      fruit.addImage(fruit4Image);
  }
  fruit.y=Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.setLifetime=100;
  
    position=Math.round(random(1,2));
    if (position==1)
    {
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
      
    }
    else
    {
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
      }
    }
    
    fruitGroup.add(fruit);
  
  }
  
}

function enemy()
{
  if(World.frameCount%200===0){
   alien=createSprite(400,200,20,20);
    alien.addAnimation("moving",alien1Image);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-(8+(score/10));
    alien.setLifetime=50;
    
   enemyGroup.add(alien);
  }
  
  
  
  
  
  
  
  
  
}










