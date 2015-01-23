

var inAnimation = false;
var currentLocation = 1;
var seq1Start = 1;
var seq1Finish = 121;
var seq2Start = 122;
var seq2Finish = 242;
var seq3Start = 243;
var seq3Finish = 362;
var seq4Start = 363;
var seq4Finish = 482;
var seq5Start = 483;
var seq5Finish = 546;
var seq6Start = 547;
var seq6Finish = 656;
var seq7Start = 657;
var seq7Finish = 777;
var seq8Start = 778;
var seq8Finish = 869;
var seq9Start = 870;
var seq9Finish = 1019;
// var refreshIntervalId = null;

//Hide Main Content
//content.hide
   $( '.canvas_wrapper' ).hide();
//perload images
  var totalImages = 1019; // Wow, so many images for such a short clip
  var images = new Array();
  for(var i = 1; i <= totalImages; i++) {
    var filename = '/ducerodsGIT/rod-jpg/rod_' + ('000' + i).slice(-4) + '.jpg'; // Filename of each image
    var img = new Image;
    if ( i == 500) {
      img.onload = function() {
        setTimeout(function(){ 
          $( '.loader' ).fadeOut(150);
          $( '.canvas_wrapper' ).delay(550).fadeIn();
          rodIntro();
        }, 4000);
      };
    }
    img.src = filename;
    images.push(img);
  }
//Setup canv
var canv = document.getElementById('background');
// Redefine canvas size on browser resize 
$( window ).resize(function(event) {
  setCanvasSize();
});
//Set Canvas Size
function setCanvasSize(){
  $windowWidth = $(window).width();
  $windowHeight = $(window).height(); 
  $(canv)
      .width($windowWidth)
      .height($windowWidth / 1.95);
}
//Set Initial Canvas Size
setCanvasSize();
//Rod animate through images
function rodIntro() {
  var refreshIntervalId = setInterval(function(){
    context.clearRect(0, 0, canv.width, canv.height);
    setImage(currentLocation);	
  	currentLocation = currentLocation + 1;   
  	// console.log(currentLocation);
  	if(currentLocation == '121'){
    	// console.log('here');
      $( '#content' ).fadeIn();
      $( '.load_1' ).fadeIn(700);
      $( '.load_2' ).delay(1000).fadeIn(700);
      $( '.load_3' ).delay(2500).fadeIn(700);
    	clearInterval(refreshIntervalId);
  	}        
  },35);
}




function getNextStop(currLocation, direction) {
  // if scroll is up
  if(direction == 1) {
    if(seq1Start <= currLocation <= seq1Finish)
      return false;
    else if(seq2Start <= currLocation <= seq2Finish) 
      return seq1Finish;
    else if(seq3Start <= currLocation <= seq3Finish) 
      return seq2Finish;
    else if(seq4Start <= currLocation <= seq4Finish) 
      return seq3Finish;
    else if(seq5Start <= currLocation <= seq5Finish) 
      return seq4Finish;
    else if(seq6Start <= currLocation <= seq6Finish) 
      return seq5Finish;
    else if(seq7Start <= currLocation <= seq7Finish) 
      return seq6Finish;
    else if(seq8Start <= currLocation <= seq8Finish) 
      return seq7Finish;
    else if(seq9Start <= currLocation <= seq9Finish) 
      return seq8Finish;
    else 
      return false;
  }
  // if scoll is down 
  else {
    if(seq1Start <= currLocation <= seq1Finish)
      return seq2Finish;
    else if(seq2Start <= currLocation <= seq2Finish) 
      return seq3Finish;
    else if(seq3Start <= currLocation <= seq3Finish) 
      return seq4Finish;
    else if(seq4Start <= currLocation <= seq4Finish) 
      return seq5Finish;
    else if(seq5Start <= currLocation <= seq5Finish) 
      return seq6Finish;
    else if(seq6Start <= currLocation <= seq6Finish) 
      return seq7Finish;
    else if(seq7Start <= currLocation <= seq7Finish) 
      return seq8Finish;
    else if(seq8Start <= currLocation <= seq8Finish) 
      return seq9Finish;
    else if(seq9Start <= currLocation <= seq9Finish) 
      return false;
    else 
      return false;
  }
} 

function animateFrames(start, finish){
  console.log(currentLocation + '=' + finish);
  var refreshIntervalId = setInterval(function(){

    // clear the previous photo
    context.clearRect(0, 0, canv.width, canv.height);
    // draw next photo
    setImage(currentLocation);
    // add 1 to current location  
    currentLocation = currentLocation + 1; 
    console.log(currentLocation + '=' + finish);
    // stop when current location equals finish
    if(currentLocation >= finish){
      clearInterval(refreshIntervalId);
      inAnimation = false;
    }        
  },35);
};

window.addEventListener('mousewheel', function(e) {
  console.log('inside scroll function');
  if(inAnimation == false) { 
    console.log('inside animation');
    inAnimation = true;
    e.preventDefault(); // No scroll

    // The following equation will return either a 1 for scroll down
    // or -1 for a scroll up
    var delta = Math.max(-1, Math.min(1, e.wheelDelta));
    console.log(delta);

    // find the next stopping piont frame based on the current 
    // location and scroll direction
    var nextStop = getNextStop(currentLocation, delta);
    console.log(nextStop);
    // animate frames
    if(nextStop != false) {
      animateFrames(currentLocation, nextStop);
    }
  }
});



var context = canv.getContext('2d');
 
// See above for where this gets called
function setImage(newLocation) {
  // drawImage takes 5 arguments: image, x, y, width, height
  context.drawImage(images[newLocation], 0, 0, 1280, 720);
}

var currentMousePos = false;
/*
window.addEventListener('mousemove', function(e) {
  currentMousePos = e.x;
  currentLocation = Math.floor(
    (images.length / $(window).width()) *
    currentMousePos
  );
  context.clearRect(0, 0, canv.width, canv.height);
  setImage(currentLocation);
  
});
*/













        