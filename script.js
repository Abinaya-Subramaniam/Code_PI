const canvas = document.getElementById("geometryCanvas");
const ctx = canvas.getContext("2d");
const areaElement = document.getElementById("area");
const perimeterElement = document.getElementById("perimeter");
const anglesElement = document.getElementById("angles");

const radiusSlider = document.getElementById("radiusSlider");
const heightSlider = document.getElementById("heightSlider");
const lengthSlider = document.getElementById("lengthSlider");
const breadthSlider = document.getElementById("breadthSlider");
const radiusValue = document.getElementById("radiusValue");
const heightValue = document.getElementById("heightValue");
const lengthValue = document.getElementById("lengthValue");
const breadthValue = document.getElementById("breadthValue");

let currentShape = null;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTriangle() {
    const base = 300;
    const height = parseInt(heightSlider.value);
    clearCanvas();
    const points = [{x: 100, y: 300}, {x: 400, y: 300}, {x: 250, y: 300 - height}];
    currentShape = {type: 'triangle', points};
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.strokeStyle = "#4CAF50";
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    updateProperties();
}

function drawCircle() {
    const radius = parseInt(radiusSlider.value);
    const center = {x: 400, y: 300};
    clearCanvas();
    currentShape = {type: 'circle', center, radius};
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#FF5733";
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.stroke();
    updateProperties();
}

function drawRectangle() {
    const length = parseInt(lengthSlider.value);
    const breadth = parseInt(breadthSlider.value);
    clearCanvas();
    const topLeft = {x: 200, y: 150};
    currentShape = {type: 'rectangle', topLeft, length, breadth};
    ctx.beginPath();
    ctx.rect(topLeft.x, topLeft.y, length, breadth);
    ctx.strokeStyle = "#33C3FF";
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.stroke();
    updateProperties();
}

function updateProperties() {
    let area = 0;
    let perimeter = 0;
    let angles = 0;

    if (currentShape.type === 'triangle') {
        const {points} = currentShape;
        const base = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2));
        const height = Math.abs(points[2].y - points[0].y);
        area = 0.5 * base * height;
        perimeter = base + height + Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2)); 

        angles = 60; 
    } else if (currentShape.type === 'circle') {
        const {radius} = currentShape;
        area = Math.PI * Math.pow(radius, 2);
        perimeter = 2 * Math.PI * radius;
        angles = 360; 
    } else if (currentShape.type === 'rectangle') {
        const {length, breadth} = currentShape;
        area = length * breadth;
        perimeter = 2 * (length + breadth);
        angles = 90; 
    }

    areaElement.innerHTML = `Area: ${area.toFixed(2)} cm²`;
    perimeterElement.innerHTML = `Perimeter: ${perimeter.toFixed(2)} cm`;
    anglesElement.innerHTML = `Angles: ${angles}°`;
}

document.getElementById("drawTriangleBtn").addEventListener("click", drawTriangle);
document.getElementById("drawCircleBtn").addEventListener("click", drawCircle);
document.getElementById("drawRectangleBtn").addEventListener("click", drawRectangle);

radiusSlider.addEventListener("input", () => {
    radiusValue.textContent = radiusSlider.value;
    if (currentShape.type === "circle") {
        drawCircle();
    }
});

heightSlider.addEventListener("input", () => {
    heightValue.textContent = heightSlider.value;
    if (currentShape.type === "triangle") {
        drawTriangle();
    }
});

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    if (currentShape.type === "rectangle") {
        drawRectangle();
    }
});

breadthSlider.addEventListener("input", () => {
    breadthValue.textContent = breadthSlider.value;
    if (currentShape.type === "rectangle") {
        drawRectangle();
    }
});
