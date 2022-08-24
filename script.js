class SierpinskiTriangle {
  #canvas; // set  get
  #context; // set get
  #points; // set get
  #canvasBgColor; // set get
  #triangleColor;
  #dotColor; // set get
  #triangleLineWidth; // set get
  #dotWidth; //set get
  #timeBetweenDots; //set get
  #dotsDrawn = false;
  #triangleDrawn = false;

  constructor(
    canvasId = "c",
    drawTriangleOnLoad = true,
    startChaosGameOnLoad = false,
    fullscreen = true //,
    //   canvas = document.getElementById("c"),
    //   canvasBgColor = "#c5c9fa",
    //   triangleLineWidth = 1,
    //   dotColor = "#0d576c",
    //   dotWidth = 1,
    //   timeBetweenDots = 0
  ) {
    this.#canvas = document.getElementById(canvasId);
    this.#canvasBgColor = "#c5c9fa";
    this.#canvas.style.backgroundColor = "#c5c9fa";
    this.#triangleLineWidth = 2;
    this.#triangleColor = "#0d576c";
    this.#dotColor = "#0d576c";
    this.#dotWidth = 1;
    this.#timeBetweenDots = 5;
    this.#context = this.#canvas.getContext("2d");

    this.#points = [];
    this.vertices = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      x3: 0,
      y3: 0,
    };

    if (fullscreen) {
      this.#canvas.width = window.innerWidth;
      this.#canvas.height = window.innerHeight;
    }
    if (drawTriangleOnLoad) {
      this.#setTriangle();
      this.#drawTriangle();
    }
    if (startChaosGameOnLoad) {
      this.startChaosGame();
    }
  }

  #setTriangle() {
    const cx = this.#canvas.width / 2;
    const cy = this.#canvas.height / 2;
    let shrink = 0.2;
    let maxL = this.#canvas.width;
    while (maxL > this.#canvas.height) {
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

  #randomPoint(cx) {
    var valid = false;
    const minX = this.vertices.x1;
    const maxX = this.vertices.x2;
    const minY = this.vertices.y1;
    let y = 0;
    let x = Math.random() * (maxX - minX) + minX;
    let leftOrRight = "l";
    if (x > this.#canvas.width / 2) {
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

  #drawTriangle() {
    this.#context.beginPath();
    this.#context.lineWidth = this.#triangleLineWidth;
    this.#context.strokeStyle = this.#triangleColor;
    this.#context.moveTo(this.vertices.x1, this.vertices.y1);
    this.#context.lineTo(this.vertices.x2, this.vertices.y2);
    this.#context.lineTo(this.vertices.x3, this.vertices.y3);
    this.#context.lineTo(this.vertices.x1, this.vertices.y1);
    this.#context.stroke();
    this.#context.closePath();
    console.log("triangledrawn");
  }

  startChaosGame(draw = true, delay = this.#timeBetweenDots) {
    let r = parseInt(document.querySelector("input").value);
    let startCoords = this.#randomPoint();
    let count = 0;
    let currentPoint = { x: startCoords.x, y: startCoords.y };
    let destination = { x: 0, y: 0 };
    let halfway = null;
    if (draw) {
      var introTime = 0;
    }
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
      halfway = this.#findHalfway(currentPoint, destination);
      this.#points.push(halfway);
      currentPoint = halfway;

      if (draw) {
        introTime += this.#timeBetweenDots;
        var that = this;
        setTimeout(
          function (point) {
            that.#drawDot(point);
          },
          introTime,
          that.#points[count]
        );
      }
      count++;
    }
  }
  #drawDot(point) {
    this.#context.beginPath();
    this.#context.fillStyle = this.#dotColor;
    this.#context.arc(point.x, point.y, this.#dotWidth, 0, Math.PI * 2, true);
    this.#context.fill();
  }
  resetCanvas(drawTriangle = true) {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#setTriangle();
    if (drawTriangle) {
      this.#drawTriangle();
    }
  }
}

console.log("start");

let st = new SierpinskiTriangle("c", true, true);

document
  .getElementsByClassName("panel-item start")[0]
  .addEventListener("click", function () {
    st.resetCanvas();
    console.log("Start button clicked");
    st.startChaosGame();
    drawChaosGame();
    console.log(iterations + "Iterations Completed");
  });
