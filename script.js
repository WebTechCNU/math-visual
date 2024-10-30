let a = 1;
let b = 0;

let n = 2;

let range = 100;
let scale = [-10, 10, -10, 10]; // x_min, x_max, y_min, y_max

let coef = {
    "a" : [1, 0],
    "sinx": 0,
    "cosx": 0,
    "tanx": 0,
    "1/x" : 0,
    "e^x" : 0
};

function functionInput(x){
    let f = 0;
    let n = coef["a"].length;
    let i = 1;
    for (let a of coef["a"]){
        f += a * Math.pow(x, n-i);
        i += 1;
    }
    if(coef["sinx"] != 0){
        f += coef["sinx"] * Math.sin(x);
    }
    if(coef["cosx"] != 0){
        f += coef["cosx"] * Math.cos(x);
    }
    if(coef["tanx"] != 0){
        f += coef["tanx"] * Math.tan(x);
    }
    if(coef["1/x"] != 0){
        f += coef["1/x"] * (1/x);
    } 
    if(coef["e^x"] != 0){
        f += coef["e^x"] * Math.exp(x);
    }
    return f;
}

function transformX(x){
    return (600/(scale[1] - scale[0]))*(x - scale[1]) + 600;
}

function transformY(y){
    return ((-600)/(scale[3] - scale[2]))*(y - scale[3]);
}

function clearCanvas(ctx){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function changeScale(){
    scale = [Number(document.getElementById("x-min").value), Number(document.getElementById("x-max").value),
        Number(document.getElementById("y-min").value), Number(document.getElementById("y-max").value)
    ];
    draw();
}

function drawFunction(ctx){
    let x = scale[0];
    ctx.moveTo(transformX(scale[0]), transformY(functionInput(scale[0])));
    for (let i = 0; i < range ; i ++){
        x = x + (scale[1] - scale[0])/range;

        let values = [transformX(x), transformY(functionInput(x))];

        ctx.lineTo(transformX(x), transformY(functionInput(x)));
        ctx.moveTo(transformX(x), transformY(functionInput(x)));
    }
    ctx.lineTo(transformX(scale[1]), transformY(functionInput(scale[1])));
}

function draw(){
    let inputs = document.getElementsByClassName("input-a");
    let inputValues = []
    Array.from(inputs).forEach(element => {
        inputValues.push(Number(element.value));
    });
    coef["a"] = inputValues;

    let inputsFunc = document.getElementsByClassName("input-func");
    Array.from(inputsFunc).forEach(element => {
        coef[element.id] = Number(element.value)
    });

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

    drawFunction(ctx);

    ctx.stroke();
}


function addElement(elem){
    let formula = document.getElementById("formula");
    let newElem = `<input type="number" id="` + elem + `" class="input-func" value="0"/>
                $` + elem + ` + $`;
    formula.insertAdjacentHTML('afterbegin', newElem);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function addParameter(){
    let formula = document.getElementById("formula");
    let n = Array.from(document.getElementsByClassName("input-a")).length;
    let newElem = `<input type="number" id="a-` + n + `" class="input-a" value="0"/>
                $x^{` + n + `} + $`;
    formula.insertAdjacentHTML('afterbegin', newElem);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

draw();

fetch("file.txt")
  .then((res) => res.text())
  .then((text) => {
    console.log(text);
   })
  .catch((e) => console.error(e));