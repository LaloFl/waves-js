let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let x, y;
let amp = 20;
let wLength = 0.005;
let transfer = 0;
let transferFreq = 0.08;

//ranges
const rangeAmp = document.getElementById("rangeAmp");
rangeAmp.min = 0;
rangeAmp.max = 150;
rangeAmp.defaultValue = amp;

const rangeLength = document.getElementById("rangeLength");
rangeLength.min = 0;
rangeLength.max = 50;
rangeLength.step = 0.1;
rangeLength.defaultValue = wLength * 100;

const rangeFreq = document.getElementById("rangeFreq");
rangeFreq.min = 0;
rangeFreq.max = 400;
rangeLength.step = 0.1;
rangeFreq.defaultValue = transferFreq * 100;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function drawLine(x, y, endX, endY) {
    c.beginPath();
    c.moveTo(x, y);    
    c.lineTo(endX, endY);
    c.stroke();
    c.closePath();
}

function setup() {


    window.requestAnimationFrame(draw);
}

function draw() {
    c.fillStyle = "rgba(30, 10, 100)"
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.beginPath();
    c.moveTo(0, y)
    for(let i = 0; i < canvas.width; i++) {
        c.strokeStyle = 'rgba(130, 200, 255)';
        
        c.lineTo(
            i, 
            (canvas.height / 2) + 
            Math.sin(-i*(parseFloat(rangeLength.value)/100) + transfer) * 
            parseInt(rangeAmp.value) * i/100);
        c.stroke();
        drawLine(
            i, 
            (canvas.height / 2) + 
            Math.sin(-i*(parseFloat(rangeLength.value)/100) + transfer) * 
            parseInt(rangeAmp.value) * i/100, 
            i, 
            canvas.height)
    }
    c.closePath();

    transfer -= parseFloat(rangeFreq.value) / 100;

    window.requestAnimationFrame(draw);
}

setup();