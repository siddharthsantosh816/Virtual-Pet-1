//Create variables here
var dog,happyDog;
var foodS, foodStock;
var database;
var check =0;


function preload(){
	dogImg=loadImage('images/dogImg.png');
  dogImg1=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);

  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale=0.2;
}

function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    dog.addImage(dogImg1);
    writeStock(foodS);
  } 
   
  drawSprites();
 
  //add styles here
  textSize(25);
  fill("red");
  text("Food Left: "+ foodS,170,100);
  textSize(18);
  fill("white");
  text("Note: Press UP_ARROW key to feed Drago Milk!!",20,25);
  if (foodS === 0) {
    textSize(20);
    text("Please refill the Foodstock by pressing 'R'?", 50,400);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}
function keyPressed() {
  if (keyCode === 82) {
    database.ref('/').update({
      Food:20
    })
  }
}

