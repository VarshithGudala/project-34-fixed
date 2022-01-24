
var gameState = 1;
var end;
var treasureCollection = 0;
var balls;

function preload() {
  boom = loadImage("bomb.png");
  ball = loadImage("redball.png");
  soom = loadImage("ship.png");
  backgroundimg = loadImage("seawater.png");
  katham = loadImage("gameover.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ships = createSprite(50, height - 100, 20, 50);
  ships.addImage(soom);
  ships.scale = 0.5;

  redballs = new Group();
  bombs = new Group();

}


function draw() {
  background(backgroundimg);


  if (gameState === 1) {
    background("skyblue");
    ships.x = World.mouseX;

    edges = createEdgeSprites();
    ships.collide(edges);

    //code to reset the background
    if (background.x > 400) {
      background.x = height / 2;
    }
    createbombsImage();
    createredballsImage();

    if (redballs.isTouching(ships)) {
      for (var i = 0; i < redballs.length; i++) {
        if (redballs[i].isTouching(ships)) {
          redballs[i].destroy();
          treasureCollection = treasureCollection + 1500;
        }
      }
    }

    if (bombs.isTouching(ships)) {
      for (var i = 0; i < bombs.length; i++) {
        if (bombs[i].isTouching(ships)) {
          bombs[i].destroy();
          gameState = 2;
        }
      }
    }


  }

  if (gameState == 2) {

    end = createSprite(width/2, height/2);
    end.addImage(katham);
    //end.scale = 0.5;
    redballs.destroyEach();
    redballs.setVelocityYEach(0);

    ships.destroy()

    bombs.destroyEach();
    bombs.setVelocityYEach(0);
  }



  drawSprites();
  textSize(20);
  fill(255);
  text("apka treasure:" + treasureCollection, 150, 30);
}

function createbombsImage() {
  if (World.frameCount % 100 == 0) {
    var bomb = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    bomb.addImage(boom);
    bomb.scale = 1.1;
    bomb.velocityY = 3;
    bomb.lifetime = windowHeight;
    bombs.add(bomb);
  }
}


function createredballsImage() {
  if (frameCount % 60 == 0) {
    var balls = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    balls.addImage(ball);
    balls.scale = 0.023;
    balls.velocityY = 3;
    balls.lifetime = windowHeight;
    redballs.add(balls);
  }
}

