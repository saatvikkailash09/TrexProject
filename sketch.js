var trex, ground, trexrunning, trexcollided, invisiblground, groundimage, clouds, cloudimage, rand, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, count=0, cloudgroup, obtaclegroup;

function preload() {
  
  obstacle1=loadImage("obstacle1.png");
  
  obstacle2=loadImage("obstacle2.png");
  
  obstacle3=loadImage("obstacle3.png");
  
  obstacle4=loadImage("obstacle4.png");
  
  obstacle5=loadImage("obstacle5.png");
  
  obstacle6=loadImage("obstacle6.png");
  
  trexrunning=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
 cloudimage=loadImage("cloud.png");
  
  trexcollided=loadAnimation("trex_collided.png");
  
  groundimage=loadImage("ground2.png");
}

function setup() {
  createCanvas(600,200);
  
  trex=createSprite(50,150,20,20);
  trex.addAnimation("running",trexrunning);
  trex.scale=0.5;

  ground=createSprite(200,180,400,5)
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;
  ground.velocityX=-5;
  
  invisibleground=createSprite(200,185,400,5);
  invisibleground.visible=false;
  
  //make the cloud group
  cloudgroup=new Group();
  
  //make the obstacle group
  obstaclegroup=new Group();
  
}

function draw() {
  background("white");

  //make the trex jump if the space key is pressed
  if (keyDown("space")&& trex.y>159){
    trex.velocityY=-8;
  }
  
  //reset the ground animation
  if (ground.x<0){
    ground.x=ground.width/2;
  }
  
  //do not let the trex jump in the air
  console.log(trex.y);
  
  
  //call the obstacles function
  spawnObstacles()
  
  //call the clouds function
  cloudfunction();
  
  //add the gravity
  trex.velocityY=trex.velocityY+0.5;
  
 //make the score
  count=count+Math.round(getFrameRate()/60);
  text("Score:"+count,500,30)
  
  trex.collide(invisibleground);
  
  
  
  drawSprites();
  
} 

function cloudfunction(){
  
  if (frameCount%60===0){
    rand=random(40,60);
    clouds=createSprite(200,rand,20,20);
    clouds.addImage("clouds",cloudimage);  
    clouds.velocityX=-3
    clouds.scale=0.8;
    clouds.lifetime=150;
    clouds.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    //add members to the cloud group
    cloudgroup.add(clouds);
}
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    
    //assign members to th obstacle group
    obstaclegroup.add(obstacle);
  }
}








