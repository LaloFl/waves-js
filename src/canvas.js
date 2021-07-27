let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let x, y;
let amp = 20;
let freq = 0.005;
let transfer = 0;
let transferFreq = 0.08;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.addEventListener('mousemove', (e) => {
    x = e.x;
    y = e.y;
})

function boost() {
    amp += 5;
}

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
        
        c.lineTo(i, (canvas.height / 2) + Math.sin(-i*freq + transfer) * amp);
        c.stroke();
        c.shadowBlur = 0;
        drawLine(i, (canvas.height / 2) + Math.sin(-i*freq + transfer) * amp, i, canvas.height)
    }
    c.closePath();

    transfer -= transferFreq;

    window.requestAnimationFrame(draw);
}

setup();