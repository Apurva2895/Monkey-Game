var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameState= END;
var monkey , monkey_running, monkeyI;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score=0;
var survivalTime=0;


function preload(){
  
  monkeyI=loadImage("sprite_0.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,450);
 //creating monkey
  monkey=createSprite(40,300,50,50);
  
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.11;
  
  //creating ground
  ground=createSprite(300,340,12000,20);
   ground.velocityX = -4;
   

   
  console.log(ground.x);
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
 background("white");
 textSize(20);
 text("Score: "+ score, 500,50);
  
  
  stroke("white");
  textSize(20)
  fill("white");  
  
  stroke("balck");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime:"+ survivalTime,100,50)
  drawSprites();
  
   if (ground.x < 0){
    ground.x = ground.width/2;
   }
   monkey.velocityY =monkey.velocityY + 0.8
   monkey.collide(ground);
  
 
  
if (gameState===PLAY){
  if(monkey.isTouching(FoodGroup)){
      score=score+2;
      FoodGroup[0].destroy();
    }
    if(score >= 10){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -20;  
      
    }

  if(keyDown("space")&& monkey.y >= 280) {
    monkey.velocityY = -12;
  
  
} 
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  } 
}
       
  spawnFood();
  spawnObstacles();
  
  
  if (gameState===END){
    ground.velocityX=0; 
    FoodGroup.velocityX=0;
    obstacleGroup.velocityX=0;
  }
    drawSprites();
  }

function spawnFood(){
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,220,40,20);
    banana.y= Math.round(random(260,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX= -3;
    banana.lifetime= 300;
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
    
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,330,50,20);
    obstacle.y= 320;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.12;
    obstacle.velocityX=-4;
    
    obstacleGroup.add(obstacle);
  }
}


