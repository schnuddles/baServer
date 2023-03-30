let socket;
let rwUnit = 30;
let rwLila;
let rwLilaDark;
let rwCyan;
let grid;
let amount;

let headlineMessage = "";
let copyMessage = "";




function preload() {
  headline = loadFont("./font/BarlowSemiCondensed-Bold.ttf");
  copyText = loadFont("./font/BarlowSemiCondensed-Regular.ttf");
  socket = io.connect('http://localhost:3000');
  socket.on('headline', function(data) {
    headlineMessage = data;
  })
  
  socket.on('copy', function(data){
    copyMessage = data;
  })
}

function setup() {
  rwLila = color(102, 56, 182);
  rwLilaDark = color(45, 7, 100);
  rwCyan = color(0, 255, 255);

  

  createCanvas(900, 900);
  background(rwLila);



  grid = width / rwUnit;
  amount = grid * 3;
  //frameRate(1);

  noStroke();
  fill(rwLilaDark);
  for (x = 0; x < amount; x++) {
    for (y = 0; y < amount; y++) {
      push();
      translate(x * amount, y * amount);
      let shapeType = int(random(0, 3));
      let orientation = int(random(0, 4));
      if (shapeType == 0) {
        createQuarterCircle(amount, orientation);
      }
      if (shapeType == 1) {
        createTriangle(amount, orientation, 0, 0);
      }
      if (shapeType == 2) {
        rect(0, 0, amount, amount);
      }
      pop();
    }
  }
 /*  writeHeadline();
  writeCopyText(); */


  //save('/public/image.png');
}

function draw() {
  // draw the background canvas as an image

  writeHeadline();
  writeCopyText();
}


function createQuarterCircle(amount, orientation) {
  switch (orientation) {
    case 0:
      arc(0, amount, amount * 2, amount * 2, PI + HALF_PI, 0); //1
      break;
    case 1:
      arc(0, 0, amount * 2, amount * 2, 0, HALF_PI); //2
      break;
    case 2:
      arc(amount, 0, amount * 2, amount * 2, HALF_PI, PI); //3
      break;
    case 3:
      arc(amount, amount, amount * 2, amount * 2, PI, PI + HALF_PI); //4
      break;
  }
}

function createTriangle(amount, orientation) {
  switch (orientation) {
    case 0:
      triangle(0, 0, 0, amount, amount, amount); //1
      break;
    case 1:
      triangle(amount, 0, 0, amount, 0, 0); //2
      break;
    case 2:
      triangle(0, 0, amount, 0, amount, amount); //3
      break;
    case 3:
      triangle(0, amount, amount, 0, amount, amount); //4
      break;
  }
}

function writeHeadline() {
  textFont(headline);
  textSize(3 * rwUnit);
  textLeading(3 * rwUnit);
  fill(255);
  text(headlineMessage, 3 * rwUnit, 6 * rwUnit, 24 * rwUnit);
}

function writeCopyText() {
  textFont(copyText);
  textSize(2 * rwUnit);
  textLeading(2 * rwUnit);
  fill(255);
  text(copyMessage, 3 * rwUnit, 16 * rwUnit, 24 * rwUnit);
}

/*

arc(0, amount, amount*2, amount*2, PI + HALF_PI, 0);//1
arc(0, 0, amount*2, amount*2, 0, HALF_PI);//2
arc(amount, 0, amount*2, amount*2, HALF_PI, PI);//3
arc(amount, amount, amount*2, amount*2, PI, PI + HALF_PI);//4

*/

/*

triangle(0,0,0, amount,amount,amount);//1
triangle(amount,0,0,amount,0,0);//2
triangle(0,0,amount,0,amount,amount);//3
triangle(0,amount,amount,0,amount,amount);//4

*/
