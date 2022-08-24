class sierpinskiTriangle {
  #canvas; //no set no get
  #context; // no set no get
  #points; // no set no get
  #canvasBgColor; // set get
  #dotColor; // set get
  #triangleLineWidth; // set get
  #dotWidth; //set get
  #timeBetweenDots; //set get
  constructor(
    canvas = document.getElementById("c"),
    scale = document.getElementById("scale"),
    canvasBgColor = "#c5c9fa",
    triangleLineWidth = 1,
    dotColor = "#0d576c",
    dotWidth = 1,
    timeBetweenDots = 0
  ) {
    this.#canvas = canvas;
    this.#canvasBgColor = canvasBgColor;
    this.#triangleLineWidth = triangleLineWidth;
    this.#dotColor = dotColor;
    this.#dotWidth = dotWidth;
    this.#timeBetweenDots = timeBetweenDots;
    this.#context = this.#canvas.getContext("2d");
    //adjustable globals
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.#points = [];
    this.vertices = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      x3: 0,
      y3: 0,
    };

    this.#canvas.width = this.width;
    this.#canvas.height = this.height;
  }

  #setTriangle() {
    const cx = this.canvasWidth / 2;
    const cy = this.canvasHeight / 2;
    let shrink = 0.2;
    let maxL = this.canvasWidth;
    while (maxL > this.canvasHeight) {
      maxL = maxL - shrink;
      shrink += 0.05;
    }
    const L = maxL;
    // R = height of triangle
    const R = (L * Math.sqrt(3)) / 2;

    //define triangle
    this.vertices.x1 = cx - L / 2;
    this.vertices.y1 = cy + R / 2;
    this.vertices.x2 = this.vertices.x1 + L;
    this.vertices.y2 = this.vertices.y1;
    this.vertices.x3 = cx;
    this.vertices.y3 = this.vertices.y2 - R;
  }

  #randomPoint() {
    var valid = false;
    const minX = this.vertices.x1;
    const maxX = this.vertices.x2;
    const minY = this.vertices.y1;
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
    return coords;
  }

  #findHalfway(currentPoint, destination) {
    let halfwayPoint = { x: 0, y: 0 };
    if (currentPoint.x < destination.x) {
      halfwayPoint.x = currentPoint.x + (destination.x - currentPoint.x) / 2;
    } else {
      halfwayPoint.x = currentPoint.x - (currentPoint.x - destination.x) / 2;
    }

    if (currentPoint.y < destination.y) {
      halfwayPoint.y = currentPoint.y + (destination.y - currentPoint.y) / 2;
    } else {
      halfwayPoint.y = currentPoint.y - (currentPoint.y - destination.y) / 2;
    }
    return halfwayPoint;
  }

  startChaosGame(r, draw = true, delay = this.#timeBetweenDots) {
    let startCoords = this.#randomPoint();
    let count = 0;
    let currentPoint = { x: startCoords.x, y: startCoords.y };
    let destination = { x: 0, y: 0 };
    let halfway = null;
    let introTime = 0;
    while (count < r) {
      let vertex = Math.floor(Math.random() * 3) + 1;
      switch (vertex) {
        case 1:
          destination.x = this.vertices.x1;
          destination.y = this.vertices.y1;
          break;
        case 2:
          destination.x = this.vertices.x2;
          destination.y = this.vertices.y2;
          break;
        case 3:
          destination.x = this.vertices.x3;
          destination.y = this.vertices.y3;
          break;
      }
      halfway = findHalfway(currentPoint, destination);
      this.#points.push(halfway);
      currentPoint = halfway;
      introTime += this.#timeBetweenDots;
      if (draw) {
        setTimeout(
          function (point) {
            ctx.beginPath();
            ctx.fillStyle = dotColor;
            ctx.arc(point.x, point.y, dotLineWidth, 0, Math.PI * 2, true);
            ctx.fill();
          },
          introTime,
          points[i]
        );
      }
      count++;
    }
  }
}

//window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;

console.log("start");

function drawTriangle() {
  ctx.beginPath();
  ctx.lineWidth = triLineWidth;
  ctx.strokeStyle = dotColor;
  ctx.moveTo(triangle.x1, triangle.y1);
  ctx.lineTo(triangle.x2, triangle.y2);
  ctx.lineTo(triangle.x3, triangle.y3);
  ctx.lineTo(triangle.x1, triangle.y1);
  ctx.stroke();
  ctx.closePath();
}
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setTriangle();
  drawTriangle();
}

resetCanvas();

setTriangle();
drawTriangle();
document
  .getElementsByClassName("panel-item start")[0]
  .addEventListener("click", function () {
    resetCanvas();
    console.log("Start button clicked");
    let iterations = parseInt(document.querySelector("input").value);
    chaosGame(iterations, startCoords.x, startCoords.y);
    drawChaosGame();
    console.log(iterations + "Iterations Completed");
  });
