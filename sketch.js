var play = 1
var end = 0 
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground_img
var FoodGroup, obstacleGroup
var score
var survivalTime=0
var r
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

 
}



function setup() {
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1;
  
ground=createSprite(400,350,900,10);

ground.velocityX = 4;
ground.x=ground.width/2;
console.log(ground.x);

FoodGroup = new Group();
obstacleGroup = new Group();
  
}


function draw() {
 background(255); 
  
if (gameState === play){


if(keyDown("space")){
  
  monkey.velocityY = -12;
}  
monkey.velocityY = monkey.velocityY+0.8;
monkey.collide(ground);
  
bana();
obs(); 
if (monkey.isTouching(FoodGroup)){
switch(score){
  case 10: player.scale=0.12;
          break;
  case 20: player.scale=0.14;
          break;
  case 30: player.scale=0.16;
          break;
  case 40: player.scale=0.18;
          break;
  default: break;
}
  FoodGroup.destroyEach(); 
  score = score+2;
}
  
if (monkey.isTouching(obstacleGroup))
  gameState = end;

}  
  
  
  

if (gameState === end){
  fill("black");
  text("Press r to restart",180,200);
  monkey.velocityY = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  if (keyDown("r")){
    rs();    
  }
  
  
}
 
if (ground.x > 0){
  
  ground.x = 300;
}
stroke("white");
  textSize(20);
    fill("white");
      text("Score: "+ score,500,50);
  
stroke("black");
  textSize(20);
    fill("black");
      survivalTime=Math.ceil(frameCount/frameRate())
        text("Survival Time: "+ survivalTime,100,50);
drawSprites();
}

function bana() {
if (frameCount % 80 === 0){
  r = Math.round(random(120,200));
  banana = createSprite(400,r,10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -6;
  banana.lifeTime = 130;
  FoodGroup.add(banana);
}  
  
  
}

function obs() {
if (frameCount % 300 === 0){
  obstacle = createSprite(400,315,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -6;
  obstacle.lifeTime = 130;
  obstacleGroup.add(obstacle);
}  
  
  
}

function rs(){
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  gameState = play
  survivalTime = 0;
  monkey.scale = 0.1;
}

