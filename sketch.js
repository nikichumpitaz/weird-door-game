// some global variables
let imgs = [];
let level;
let counter = 0;
let numLevels;
let person;
let score = 0; 
let gameOver = false;
let playerColor = [120, 202,90];

function preload(){

  //load the player image
  person = loadImage("person.png"); 
  //load the background images
  imgs[0] = loadImage("0.png");
  imgs[1] = loadImage("1.png");
   imgs[2] = loadImage("2.png");
   imgs[3] = loadImage("3.png");

}


function setup() {
  createCanvas(400, 400);
  numLevels = imgs.length;
  //check the start game function way at the bottom to see what we do there
  startGame();  
}

function draw() {
  //if the game isn't over then draw the game
  if(!gameOver){
    drawGame();
  } else {
    //if the game is over draw the game over screen
    background(0)
    drawGameOver();
  }
}



//our player constructor, gets remade for every level
class Player{
  constructor(targetX, targetY){
  this.x = random(0+100,width-100);
  this.y = 340;
  this.width = 30;
  this.height = 90;
  this.targetX = targetX;
  this.targetY = targetY;
  this.atGoal = false;
  }
  
  //draw the player
  display(){
    image(person, this.x, this.y, this.width,this.height);  
  }
  
  //functions to move the player by incrementing its x and y values
  moveUp(){
     this.y-=10; 
  }
  
    moveDown(){
     this.y+=10; 
  }
  
    moveLeft(){
     this.x-=10; 
  }
  
    moveRight(){
     this.x+=10; 
  }

  
  //check if the hand is near the doorknob
  checkPerson(){
      let goal = dist(this.x + this.width/2, this.y, this.targetX, this.targetY);

      if(goal < 20 ){
        this.atGoal = true;
      }  
  }



}

//a function to make a new door for each level
class Door{
  constructor(){
    this.width = 80;
    this.height = 160;
    this.x = random(0, width-this.width);
    this.y = random(100,height-this.height-100);
    this.handleX = this.x + this.width*0.9;
    this.handleY = this.y + this.height*0.5;
    this.insetX = this.x+ this.width*0.15;
    this.insetY1 = this.y + this.height*0.1;
    this.insetY2 = this.y + this.height*0.6;
    this.insetWidth = this.width * 0.7;
    this.insetHeight = this.height*0.3;
  }

  //draw the door and handle
  display(){
  
    //door
      fill(40,26,13);
      rect(this.x, this.y, this.width, this.height);
    
    //insets
          fill(80,46,23);
      rect(this.insetX, this.insetY1, this.insetWidth, this.insetHeight);
          rect(this.insetX, this.insetY2, this.insetWidth, this.insetHeight);
      
    //handle
      fill(255, 255, 0);
      ellipse(this.handleX, this.handleY, this.width/8);
  }
}

//this is a class which keeps track of all the aspects of a level
class Level{
constructor(img){
    this.bg = img;
    this.door = new Door();
    this.targetX = this.door.handleX;
    this.targetY = this.door.handleY;
    this.player = new Player(this.targetX, this.targetY);
}

  
  //draw the level
  display(){
    image(this.bg, 0, 0, width, height);
    this.door.display();
    this.player.display();
        
    //draw score
    drawScoreBox();
    drawScore();
  }
}


// one way to get key input to move the hand
function keyPressed(){
  if(keyCode === UP_ARROW){
      level.player.moveUp();
  } else if(keyCode === LEFT_ARROW){
      level.player.moveLeft();
  } else if(keyCode === RIGHT_ARROW){
      level.player.moveRight();
  }else if(keyCode === DOWN_ARROW){
      level.player.moveDown();
  }
}

//make a white box to show the scoreboard in
function drawScoreBox(){
  fill(255);
  noStroke();
  rect(0,0,width, 20);
}

//draw current score to the screen
function drawScore(){
  fill(0);
  textSize(20);
  text("score: ", 10,15);
  text(score, 70, 15)
}



function drawGame(){
    //the level has a player which has a method to check to see if it reached the goal
    level.player.checkPerson();
 
  //if the player has reached the goal then update the counter and make a new level
  if(level.player.atGoal){
      score++
      counter++
      level = new Level(imgs[counter%imgs.length]);  
  } 
    //display the level
    level.display(); 
}

//gets called when the time runs out
function drawGameOver(){
  fill(255);
  text('game over', 100, 200);
  text('click to restart', 100, 250);
}

//if the game is over and we click, start the game again
function mousePressed(){
  if(gameOver){
    startGame();
  }
}
//reset all the global variables to the initial state and make a new Level
function startGame(){
    score = 0;
    gameOver = false;
    level = new Level(imgs[counter]);
}