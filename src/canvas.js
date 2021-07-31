//get canvas context and resize window
let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

//vars
let x, y;
let amp = 20;
let wLength = 0.005;
let transfer = 0;
let transferFreq = 0.08;

//controls div
const controlsDiv = document.getElementById("controls");
controlsDiv.style.display = "flex";

//ranges
const rangeAmp = document.getElementById("rangeAmp");
rangeAmp.min = 0;
rangeAmp.max = 150;
rangeAmp.defaultValue = amp;

const rangeLength = document.getElementById("rangeLength");
rangeLength.min = 0;
rangeLength.max = 10;
rangeLength.step = 0.1;
rangeLength.defaultValue = wLength * 100;

const rangeFreq = document.getElementById("rangeFreq");
rangeFreq.min = 0;
rangeFreq.max = 100;
rangeLength.step = 0.1;
rangeFreq.defaultValue = transferFreq * 100;

const rangeIncrease = document.getElementById("rangeIncrease");
rangeIncrease.min = 0;
rangeIncrease.max = 500;
rangeIncrease.step = 5;
rangeIncrease.defaultValue = 100;

const rangeNoise = document.getElementById("rangeNoise");
rangeNoise.min = 0;
rangeNoise.max = 0.3;
rangeNoise.step = 0.001;
rangeNoise.defaultValue = 0.01;

//checkboxes
const checkIncrease = document.getElementById("checkIncrease");
checkIncrease.defaultChecked = false;

const checkNoise = document.getElementById("checkNoise");
checkNoise.defaultChecked = false;

const checkShowControls = document.getElementById("checkShowControls");
checkShowControls.defaultChecked = false;

//color pickers
const colorPicker1 = document.getElementById("colorPicker1");
colorPicker1.defaultValue = "#1E0A64"

const colorPicker2 = document.getElementById("colorPicker2");
colorPicker2.defaultValue = "#82C8FF"


//event listeners
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

rangeIncrease.disabled = true;
checkIncrease.addEventListener('click', () => {
    rangeIncrease.disabled = !rangeIncrease.disabled;
});

rangeNoise.disabled = true;
checkNoise.addEventListener("click", () => {
    rangeNoise.disabled = !rangeNoise.disabled;
});

controlsDiv.style.display = "none"
let showControls = false;
checkShowControls.addEventListener("click", () => {
    showControls = !showControls;
    if(showControls) {
        controlsDiv.style.display = "flex"
    } else {
        controlsDiv.style.display = "none"
    }
});

//custom draw functions
function drawLine(x, y, endX, endY) {
    c.beginPath();
    c.moveTo(x, y);    
    c.lineTo(endX, endY);
    c.stroke();
    c.closePath();
}

//custom math functions
function rn(min, max) {
    return (Math.random() * (max-min)) + min;
}

function noise(n, relativeOffset) {
    let offset = n * relativeOffset
    return rn(n-offset, n+offset);
}

//setup and draw () => {}
function setup() {

    window.requestAnimationFrame(draw);
}

function draw() {
    let color1 = colorPicker1.value;
    let color2 = colorPicker2.value;

    c.fillStyle = color1;
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.beginPath();
    c.moveTo(0, y)
    for(let i = 0; i < canvas.width; i++) {
        c.strokeStyle = color2;
        
        let referenceY = canvas.height / 2;
        let amp = parseInt(rangeAmp.value);
        let length = parseFloat(rangeLength.value)/100;
        //added
        let increase = parseFloat(rangeIncrease.value);
        let yNoise = noise(referenceY, parseFloat(rangeNoise.value))

        if(i > 0 && checkNoise.checked) {
            referenceY = yNoise;
        }

        let nextPointY = checkIncrease.checked ?
        referenceY + 
        Math.sin(-i*(length) + transfer) * 
        amp * i/ increase
        :
        referenceY + 
        Math.sin(-i*(length) + transfer) * 
        amp
        ;
        
        c.lineTo(
            i, 
            nextPointY);
        c.stroke();
        drawLine(
            i, 
            nextPointY, 
            i, 
            canvas.height)
    }
    c.closePath();

    transfer -= parseFloat(rangeFreq.value) / 100;

    window.requestAnimationFrame(draw);
}

//draw execution
setup();