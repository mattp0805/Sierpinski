var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SierpinskiTriangle_instances, _SierpinskiTriangle_canvas, _SierpinskiTriangle_context, _SierpinskiTriangle_points, _SierpinskiTriangle_canvasBgColor, _SierpinskiTriangle_triangleColor, _SierpinskiTriangle_dotColor, _SierpinskiTriangle_triangleLineWidth, _SierpinskiTriangle_dotWidth, _SierpinskiTriangle_timeBetweenDots, _SierpinskiTriangle_dotsDrawn, _SierpinskiTriangle_triangleDrawn, _SierpinskiTriangle_vertices, _SierpinskiTriangle_setTriangle, _SierpinskiTriangle_randomPoint, _SierpinskiTriangle_findHalfway, _SierpinskiTriangle_drawTriangle, _SierpinskiTriangle_drawDot;
var SierpinskiTriangle = /** @class */ (function () {
    function SierpinskiTriangle(canvasId, drawTriangleOnLoad, startChaosGameOnLoad, fullscreen //,
    //   canvas = document.getElementById("c"),
    //   canvasBgColor = "#c5c9fa",
    //   triangleLineWidth = 1,
    //   dotColor = "#0d576c",
    //   dotWidth = 1,
    //   timeBetweenDots = 0
    ) {
        if (canvasId === void 0) { canvasId = "c"; }
        if (drawTriangleOnLoad === void 0) { drawTriangleOnLoad = true; }
        if (startChaosGameOnLoad === void 0) { startChaosGameOnLoad = false; }
        if (fullscreen === void 0) { fullscreen = false; }
        _SierpinskiTriangle_instances.add(this);
        _SierpinskiTriangle_canvas.set(this, void 0); // set  get
        _SierpinskiTriangle_context.set(this, void 0); // set get
        _SierpinskiTriangle_points.set(this, void 0); // set get
        _SierpinskiTriangle_canvasBgColor.set(this, void 0); // set get
        _SierpinskiTriangle_triangleColor.set(this, void 0);
        _SierpinskiTriangle_dotColor.set(this, void 0); // set get
        _SierpinskiTriangle_triangleLineWidth.set(this, void 0); // set get
        _SierpinskiTriangle_dotWidth.set(this, void 0); //set get
        _SierpinskiTriangle_timeBetweenDots.set(this, void 0); //set get
        _SierpinskiTriangle_dotsDrawn.set(this, false);
        _SierpinskiTriangle_triangleDrawn.set(this, false);
        _SierpinskiTriangle_vertices.set(this, void 0);
        __classPrivateFieldSet(this, _SierpinskiTriangle_canvas, document.getElementById(canvasId), "f");
        __classPrivateFieldSet(this, _SierpinskiTriangle_canvasBgColor, "#c5c9fa", "f");
        __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").style.backgroundColor = "#c5c9fa";
        __classPrivateFieldSet(this, _SierpinskiTriangle_triangleLineWidth, 2, "f");
        __classPrivateFieldSet(this, _SierpinskiTriangle_triangleColor, "#0d576c", "f");
        __classPrivateFieldSet(this, _SierpinskiTriangle_dotColor, "#0d576c", "f");
        __classPrivateFieldSet(this, _SierpinskiTriangle_dotWidth, 1, "f");
        __classPrivateFieldSet(this, _SierpinskiTriangle_timeBetweenDots, 5, "f");
        __classPrivateFieldSet(this, _SierpinskiTriangle_context, __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").getContext("2d"), "f");
        __classPrivateFieldSet(this, _SierpinskiTriangle_points, [], "f");
        if (fullscreen) {
            __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").width = window.innerWidth;
            __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").height = window.innerHeight;
        }
        if (drawTriangleOnLoad) {
            __classPrivateFieldGet(this, _SierpinskiTriangle_instances, "m", _SierpinskiTriangle_setTriangle).call(this);
            __classPrivateFieldGet(this, _SierpinskiTriangle_instances, "m", _SierpinskiTriangle_drawTriangle).call(this);
        }
        if (startChaosGameOnLoad) {
            this.startChaosGame();
        }
    }
    SierpinskiTriangle.prototype.startChaosGame = function (draw, delay) {
        if (draw === void 0) { draw = true; }
        if (delay === void 0) { delay = __classPrivateFieldGet(this, _SierpinskiTriangle_timeBetweenDots, "f"); }
        console.log("started game");
        var r = 10000;
        if (document.querySelector != null) {
            r = parseInt(document.querySelector("input").value);
        }
        var startCoords = __classPrivateFieldGet(this, _SierpinskiTriangle_instances, "m", _SierpinskiTriangle_randomPoint).call(this, __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").width / 2);
        var count = 0;
        var currentPoint = { x: startCoords.x, y: startCoords.y };
        var destination;
        var halfway;
        while (count < r) {
            var vertex = Math.floor(Math.random() * 3) + 1;
            switch (vertex) {
                case 1:
                    destination.x = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x1;
                    destination.y = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y1;
                    break;
                case 2:
                    destination.x = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x2;
                    destination.y = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y2;
                    break;
                case 3:
                    destination.x = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x3;
                    destination.y = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y3;
                    break;
            }
            halfway = __classPrivateFieldGet(this, _SierpinskiTriangle_instances, "m", _SierpinskiTriangle_findHalfway).call(this, currentPoint, destination);
            __classPrivateFieldGet(this, _SierpinskiTriangle_points, "f").push(halfway);
            currentPoint = halfway;
            var introTime = 0;
            if (draw) {
                introTime += __classPrivateFieldGet(this, _SierpinskiTriangle_timeBetweenDots, "f");
                var that = this;
                setTimeout(function (point) {
                    __classPrivateFieldGet(that, _SierpinskiTriangle_instances, "m", _SierpinskiTriangle_drawDot).call(that, point);
                }, introTime, __classPrivateFieldGet(that, _SierpinskiTriangle_points, "f")[count]);
            }
            count++;
        }
    };
    SierpinskiTriangle.prototype.resetCanvas = function (drawTriangle) {
        if (drawTriangle === void 0) { drawTriangle = true; }
        __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").clearRect(0, 0, __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").width, __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").height);
        __classPrivateFieldGet(this, _SierpinskiTriangle_instances, "m", _SierpinskiTriangle_setTriangle).call(this);
        if (drawTriangle) {
            __classPrivateFieldGet(this, _SierpinskiTriangle_instances, "m", _SierpinskiTriangle_drawTriangle).call(this);
        }
    };
    return SierpinskiTriangle;
}());
_SierpinskiTriangle_canvas = new WeakMap(), _SierpinskiTriangle_context = new WeakMap(), _SierpinskiTriangle_points = new WeakMap(), _SierpinskiTriangle_canvasBgColor = new WeakMap(), _SierpinskiTriangle_triangleColor = new WeakMap(), _SierpinskiTriangle_dotColor = new WeakMap(), _SierpinskiTriangle_triangleLineWidth = new WeakMap(), _SierpinskiTriangle_dotWidth = new WeakMap(), _SierpinskiTriangle_timeBetweenDots = new WeakMap(), _SierpinskiTriangle_dotsDrawn = new WeakMap(), _SierpinskiTriangle_triangleDrawn = new WeakMap(), _SierpinskiTriangle_vertices = new WeakMap(), _SierpinskiTriangle_instances = new WeakSet(), _SierpinskiTriangle_setTriangle = function _SierpinskiTriangle_setTriangle() {
    var cx = __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").width / 2;
    var cy = __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").height / 2;
    var shrink = 0.2;
    var maxL = __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").width;
    while (maxL > __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").height) {
        maxL = maxL - shrink;
        shrink += 0.05;
    }
    var L = maxL;
    // R = height of triangle
    var R = (L * Math.sqrt(3)) / 2;
    //define triangle
    __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x1 = cx - L / 2;
    __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y1 = cy + R / 2;
    __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x2 = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x1 + L;
    __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y2 = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y1;
    __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x3 = cx;
    __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y3 = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y2 - R;
}, _SierpinskiTriangle_randomPoint = function _SierpinskiTriangle_randomPoint(cx) {
    var valid = false;
    var minX = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x1;
    var maxX = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x2;
    var minY = __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y1;
    var y = 0;
    var x = Math.random() * (maxX - minX) + minX;
    var leftOrRight = "l";
    if (x > __classPrivateFieldGet(this, _SierpinskiTriangle_canvas, "f").width / 2) {
        leftOrRight = "r";
    }
    var maxY = 0;
    if (leftOrRight == "l") {
        maxY = minY - (x - minX) * Math.tan(Math.PI / 3);
    }
    else {
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
}, _SierpinskiTriangle_findHalfway = function _SierpinskiTriangle_findHalfway(currentPoint, destination) {
    var halfwayPoint;
    if (currentPoint.x < destination.x) {
        halfwayPoint.x = currentPoint.x + (destination.x - currentPoint.x) / 2;
    }
    else {
        halfwayPoint.x = currentPoint.x - (currentPoint.x - destination.x) / 2;
    }
    if (currentPoint.y < destination.y) {
        halfwayPoint.y = currentPoint.y + (destination.y - currentPoint.y) / 2;
    }
    else {
        halfwayPoint.y = currentPoint.y - (currentPoint.y - destination.y) / 2;
    }
    return halfwayPoint;
}, _SierpinskiTriangle_drawTriangle = function _SierpinskiTriangle_drawTriangle() {
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").beginPath();
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").lineWidth = __classPrivateFieldGet(this, _SierpinskiTriangle_triangleLineWidth, "f");
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").strokeStyle = __classPrivateFieldGet(this, _SierpinskiTriangle_triangleColor, "f");
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").moveTo(__classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x1, __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y1);
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").lineTo(__classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x2, __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y2);
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").lineTo(__classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x3, __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y3);
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").lineTo(__classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").x1, __classPrivateFieldGet(this, _SierpinskiTriangle_vertices, "f").y1);
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").stroke();
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").closePath();
    console.log("triangledrawn");
}, _SierpinskiTriangle_drawDot = function _SierpinskiTriangle_drawDot(point) {
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").beginPath();
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").fillStyle = __classPrivateFieldGet(this, _SierpinskiTriangle_dotColor, "f");
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").arc(point.x, point.y, __classPrivateFieldGet(this, _SierpinskiTriangle_dotWidth, "f"), 0, Math.PI * 2, true);
    __classPrivateFieldGet(this, _SierpinskiTriangle_context, "f").fill();
};
console.log("start");
var st = new SierpinskiTriangle("c1", true);
var st2 = new SierpinskiTriangle("c2", true);
document
    .getElementsByClassName("panel-item start")[0]
    .addEventListener("click", function () {
    st.resetCanvas();
    console.log("Start button clicked");
    st.startChaosGame();
});
