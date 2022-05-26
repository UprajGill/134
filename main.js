song="";
objects = [];
status = "";
function preload(){
song = loadSound("alarm.mp3");
} 
function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects"; 
}
function modelLoaded(){
console.log("Model Loaded!");
status = true;
}
function gotResult(error, results){
if(error){
console.log(error); 
} 
console.log(results);
objects = results; 
}
function draw(){
image(video, 0, 0, 380, 380);
if(status != ""){ 
objectDetector.detect(video, gotResult); 
for (i = 0; i < objects.length;i++){ 
document.getElementById("status").innerHTML = "Object Detected";
fill("#daa520");
percent = floor(objects[i].confidence * 100);
noFill();
stroke("daa520");
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);  
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label=="person"){
document.getElementById("object").innerHTML="Baby Detected👶";
console.log("stop");
song.stop();
}
else{
document.getElementById("object").innerHTML = "Baby Is Not Detected⚠️";
song.play();
}
}
if(objects.length==0){
document.getElementById("object").innerHTML = "Baby Is Not Detected⚠️";
song.play();
}
}
}