var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var guy,guy_running,guy_collided;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image=loadImage("Background.png");
  guy_running=loadAnimation("guy running 1.png","guy running 2.png","guy running 3.png");
  obstacle1=loadImage("obstacle1.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")

}

function setup() {
 createCanvas(600,500);
  
ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
   guy=createSprite(300,420,600,10);
  guy.addAnimation("guy_running",guy_running);
  guy.addImage("guy_collided",guy_collided);
  guy.addImage("guyImage",guyImage);
  guy.scale=0.2;

  guy.debug=false;
  guy.setCollider("rectangle",0,0,guy.width,guy.height)
  
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 background("black");
  

guy.velocityY = guy.velocityY + 0.8;
guy.collide(invisible_ground); 
  
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& guy.y >= 220)) {
   guy.velocityY = -12;
    jumpSound.play();
  }  
  
  if (guy.isTouching(obstaclesGroup)){
    gameState=END;
     dieSound.play();
  }
  }
 if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     guy.velocityY = 0
    guy.changeImage("guyImage",guyImage);

  }

    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }

  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);


function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
guy.changeAnimation("guy_running",guy_running);
  obstaclesGroup.destroyEach();
  score=0;

}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;
   
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}


