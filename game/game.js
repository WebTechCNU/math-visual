var myGamePiece;
var step = 5;
var elements = [];
points = 0;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 285);
    var elemnt = new element(10, 20, 5*7);
    elements.push(elemnt);
  }
  
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 600;
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function (e) {
        myGameArea.key = e.keyCode;
      });
      window.addEventListener('keyup', function (e) {
        myGameArea.key = false;
      });
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        elements.forEach(e => e.draw());
      }
  }

  function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.shadowColor = "lightblue";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.font = "30px Arial";
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  }

  function element(x, y, number){
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = 'black';
    this.draw = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = 'black';
        ctx.fillText(number,10,80);
    }
  }

  function updateGameArea() {
    myGameArea.clear();
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.x += -step; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.x += step; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.y += -step; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.y += step; }
    document.getElementById('points').innerText = points;
    myGamePiece.update();
  }

  startGame();



  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }