var img = "";
var object_status = "";
var objects= [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("model is loaded");

    object_status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {

    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function preload() {
    img = loadImage('fruit_basket.jpg');
}

function draw() {
    image(img, 0, 0, 640, 420);

   if (object_status != "") {

    for (var i=0; i < objects.length; i++) {

        document.getElementById("status").innerHTML = "Status: Object Detected";

    fill("black");
    percent = floor(objects[i].confidence * 100);
    textSize(15);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("#003333");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
   }
}