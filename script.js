let a = 1;
let b = 0;

// y = ax + b

function functionToDisplay(x){
    return a*x + b;
}

function transformX(x){
    return x*30 + 300;
}

function transformY(y){
    return 300 - y*30;
}

function clearCanvas(ctx){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    let aInput = document.getElementById("a");
    let bInput = document.getElementById("b");
    a = Number(aInput.value);
    b = Number(bInput.value);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    clearCanvas(ctx)
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 300);
    ctx.lineTo(600, 300);

    ctx.moveTo(300, 0);
    ctx.lineTo(300, 600);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "blue";

    ctx.moveTo(transformX(-10), transformY(functionToDisplay(-10)));
    ctx.lineTo(transformX(10), transformY(functionToDisplay(10)));

    ctx.stroke();
}

draw();