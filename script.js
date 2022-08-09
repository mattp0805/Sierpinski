//window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;

console.log("start");
//declare globals
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
var points = [];
var currPoint = null;
var w = window.innerWidth;
var h = window.innerHeight;
let L = 0;
let shrink = 0.2;
let maxL = w;
canvas.height = h;
canvas.width = w;
var cx = w / 2;
var cy = h / 2;
var points = [];
//adjustable globals

const lineWidth = 1;

while (maxL > h) {
    maxL = maxL - shrink;
    shrink += 0.05;
}
L = maxL;
// R = height of triangle
const R = (L * Math.sqrt(3)) / 2;

let triangle = {
    x1: 0,
    x2: 0,
    x3: 0,
    y1: 0,
    y2: 0,
    y3: 0
};
//define triangle
triangle.x1 = cx - L / 2;
triangle.y1 = cy + R / 2;
triangle.x2 = triangle.x1 + L;
triangle.y2 = triangle.y1;
triangle.x3 = cx;
triangle.y3 = triangle.y2 - R;

function drawDot(dotX, dotY) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.fillStyle = "red";
    ctx.arc(dotX, dotY, lineWidth, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawTriangle() {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(triangle.x1, triangle.y1);
    ctx.lineTo(triangle.x2, triangle.y2);
    ctx.lineTo(triangle.x3, triangle.y3);
    ctx.lineTo(triangle.x1, triangle.y1);
    ctx.stroke();
    ctx.closePath();
}
function randomPoint() {
    var valid = false;
    const minX = triangle.x1;
    const maxX = triangle.x2;
    const minY = triangle.y1;
    let y = 0;
    let x = Math.random() * (maxX - minX) + minX;
    let leftOrRight = "l";
    if (x > cx) {
        leftOrRight = "r";
    }
    let maxY = 0;
    if (leftOrRight == "l") {
        maxY = minY - (x - minX) * Math.tan(Math.PI / 3);
    } else {
        maxY = minY - (maxX - x) * Math.tan(Math.PI / 3);
    }

    while (valid == false) {
        y = Math.random() * (minY - maxY) + maxY;
        if (y > maxY) {
            valid = true;
        }
    }
    var coords = { x: x, y: y };
    console.log(coords.x, coords.y);
    return coords;
}

function findHalfway(currentPoint,destination){
    let halfwayPoint = {x:0,y:0};
    if (currentPoint.x < destination.x){
        halfwayPoint.x = currentPoint.x + (destination.x - currentPoint.x)/2;
        
    } else {
        halfwayPoint.x = currentPoint.x - (currentPoint.x - destination.x)/2;
    }; 
    
    if (currentPoint.y < destination.y){
        halfwayPoint.y = currentPoint.y + (destination.y - currentPoint.y)/2;
    } else {

        halfwayPoint.y = currentPoint.y - (currentPoint.y - destination.y)/2;
    };
return halfwayPoint;

}

function chaosGame(r, startX, startY) {
    let count = 0;
    let currentPoint = { x: startX, y: startY };
    let destination = {x: 0, y: 0};
    let halfway = null;
    while (count < r) {
        let vertex = Math.floor(Math.random() * 3) + 1;
        console.log(vertex);
        switch(vertex){
            case 1: 
                destination.x = triangle.x1;
                destination.y = triangle.y1;
                break;
            case 2:
                destination.x = triangle.x2;
                destination.y = triangle.y2;
                break;
            case 3:
                destination.x = triangle.x3;
                destination.y = triangle.y3;
                break;
            }
        halfway = findHalfway(currentPoint, destination);
        points.push(halfway);
        drawDot(halfway.x,halfway.y);
        currentPoint = halfway;
        count++;
    }
}
let startCoords = randomPoint();
console.log("start coords: " + startCoords);
drawTriangle();
chaosGame(100000, startCoords.x, startCoords.y);