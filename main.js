video = "";

status = "";

object = [];

function preload(){
 video = createVideo('video.mp4');
 video.hide();
}
function draw(){
    image(video,0,0,500,500);
    if (status != "") {
    objectDetector.detect(video,gotresult);
    for (let index = 0; index < object.length; index++) {
       document.getElementById("status").innerHTML = "estado: detectando objetos";
       document.getElementById("etiqueta").innerHTML = "numero de objetos detectados "+object.length;
      fill("#0000FF");
      percent = floor(object[index].confidence*100);
      text(object[index].label+" "+percent+"%",object[index].x+15,object[index].y+15);
      nofill();
      stroke("#0000FF");
      rect(object[index].x,object[index].y,object[index].width,(object[index].height));
    }
    }
}
function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
}
function play(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "estado: detectando objetos";
}
function modelloaded(){
    console.log("modelo cargado");
    status = true;
    video.loop();
    video.speed(2.5);
    video.volume(0.5);
}
function gotresult(error,results){
 if (error) {
    console.log(error);
 }
 console.log(results);
 object = results;
}
