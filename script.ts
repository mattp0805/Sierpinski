interface vertices {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

interface coordinates {
  x: number;
  y: number;
}

class SierpinskiTriangle {
  #canvas; // set  get
  #context; // set get
  #points: Array<coordinates>; // set get
  #canvasBgColor: string; // set get
  #triangleColor: string;
  #dotColor: string; // set get
  #triangleLineWidth: number; // set get
  #dotWidth: number; //set get
  #timeBetweenDots: number; //set get
  #dotsDrawn: boolean = false;
  #triangleDrawn: boolean = false;
  #vertices: vertices;

  constructor(
    canvasId = "c",
    drawTriangleOnLoad = true,
    startChaosGameOnLoad = false,
    fullscreen = false //,
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
    this.#vertices.x1 = cx - L / 2;
    this.#vertices.y1 = cy + R / 2;
    this.#vertices.x2 = this.#vertices.x1 + L;
    this.#vertices.y2 = this.#vertices.y1;
    this.#vertices.x3 = cx;
    this.#vertices.y3 = this.#vertices.y2 - R;
  }

  #randomPoint(cx: number) {
    var valid = false;
    const minX = this.#vertices.x1;
    const maxX = this.#vertices.x2;
    const minY = this.#vertices.y1;
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

  #findHalfway(currentPoint: coordinates, destination: coordinates) {
    let halfwayPoint: coordinates;
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
    this.#context.moveTo(this.#vertices.x1, this.#vertices.y1);
    this.#context.lineTo(this.#vertices.x2, this.#vertices.y2);
    this.#context.lineTo(this.#vertices.x3, this.#vertices.y3);
    this.#context.lineTo(this.#vertices.x1, this.#vertices.y1);
    this.#context.stroke();
    this.#context.closePath();
    console.log("triangledrawn");
  }

  #drawDot(point: coordinates) {
    this.#context.beginPath();
    this.#context.fillStyle = this.#dotColor;
    this.#context.arc(point.x, point.y, this.#dotWidth, 0, Math.PI * 2, true);
    this.#context.fill();
  }

  startChaosGame(draw = true, delay = this.#timeBetweenDots) {
    console.log("started game");
    let r = 10000;
    if (document.querySelector != null) {
      r = parseInt(document.querySelector("input").value);
    }
    let startCoords = this.#randomPoint(this.#canvas.width / 2);
    let count = 0;
    let currentPoint = { x: startCoords.x, y: startCoords.y };
    let destination: coordinates;
    let halfway: coordinates;
    while (count < r) {
      let vertex = Math.floor(Math.random() * 3) + 1;
      switch (vertex) {
        case 1:
          destination.x = this.#vertices.x1;
          destination.y = this.#vertices.y1;
          break;
        case 2:
          destination.x = this.#vertices.x2;
          destination.y = this.#vertices.y2;
          break;
        case 3:
          destination.x = this.#vertices.x3;
          destination.y = this.#vertices.y3;
          break;
      }
      halfway = this.#findHalfway(currentPoint, destination);
      this.#points.push(halfway);
      currentPoint = halfway;
      let introTime = 0;
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

  resetCanvas(drawTriangle = true) {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#setTriangle();
    if (drawTriangle) {
      this.#drawTriangle();
    }
  }
}

console.log("start");

let st = new SierpinskiTriangle("c1", true);
let st2 = new SierpinskiTriangle("c2", true);

document
  .getElementsByClassName("panel-item start")[0]
  .addEventListener("click", function () {
    st.resetCanvas();
    console.log("Start button clicked");
    st.startChaosGame();
  });
