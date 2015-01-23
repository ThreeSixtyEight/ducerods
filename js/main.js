//Initiate Variables

var inAnimation = false;
var currentLocation = 1;

var totalImages = 1019; 
var images = new Array();

var seqStart = [0, 1, 122,243,363,483,547,657,778,870];
var seqFinish = [0,121,242,362,482,546,656,777,869,1019];

// Setup canv
var canv = document.getElementById('background');
var context = canv.getContext('2d');



// -------------------------
// Defind Function
// -------------------------

// Set Canvas size based on browser width
function setCanvasSize(){
  $windowWidth = $(window).width();
  $windowHeight = $(window).height(); 
  $(canv)
      .width($windowWidth)
      .height($windowWidth / 1.95);
}

//Rod Introduction animate through images
function rodIntro() {
  var refreshIntervalId = setInterval(function(){
    context.clearRect(0, 0, canv.width, canv.height);
    setImage(currentLocation);  
    currentLocation = currentLocation + 1;   
    if(currentLocation == '121'){
      $( '#content' ).fadeIn();
      $( '.load_1' ).fadeIn(700);
      $( '.load_2' ).delay(1000).fadeIn(700);
      $( '.load_3' ).delay(2500).fadeIn(700);
      clearInterval(refreshIntervalId);
    }        
  },35);
}

// Get Next Sequence
function getNextStop(currLocation, direction) {
  
    // Find which current sequence we are in by looping 
    // through start and finish frames 
    for(var index = 1; index < seqStart.length; ++index){
      // If the current location is in between the start and finish frame
      // return the next frame end
      if(seqStart[index].valueOf() <= currLocation.valueOf() &&  currLocation.valueOf() <= seqFinish[index].valueOf()) {
        // if scroll is up
        if(direction == 1){
          
          if(index ==1){
            //Return false if index is 1
            return false;
          } else {
            //Return previous sequence finish to animate back too
            return seqFinish[index-1];
          }
        
        } else {
          
          if(index >= seqStart.length -1){
            //Return false if index is last frame
            return false;
          } else {
            //Return previous sequence finish to animate back too
            return seqFinish[index+1];
          }

        }
  
      } 
    }
    //Return false if currentlLocation is out of bounds
    return false;
} 

// Animate Frames from Start to Finish
function animateFrames(start, finish, direction){
  var refreshIntervalId = setInterval(function(){

    // clear the previous photo
    context.clearRect(0, 0, canv.width, canv.height);
    // draw next photo
    setImage(currentLocation);
    // add or subtract 1 to current location 
    // 1 for scroll down or -1 for a scroll up 
    if(direction == 1){
      currentLocation = currentLocation - 1;
      // stop when current location equals finish
      if(parseInt(currentLocation) < parseInt(finish)){
        clearInterval(refreshIntervalId);
        inAnimation = false;
      }  
    } else {
      currentLocation = currentLocation + 1; 
      // stop when current location equals finish
      if(parseInt(currentLocation) >= parseInt(finish)){
        clearInterval(refreshIntervalId);
        inAnimation = false;
      } 
    } 

           
  },35);
};

// Draws the current image
function setImage(newLocation) {
  // drawImage takes 5 arguments: image, x, y, width, height
  context.drawImage(images[newLocation], 0, 0, 1280, 720);
}

// --------------------------
// Load Sequence 
// --------------------------

//Hide Main Content
$( '.canvas_wrapper' ).hide();

//perload images
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

// Redefine canvas size on browser resize 
$( window ).resize(function(event) {
  setCanvasSize();
});

// Set Initial Canvas Size
setCanvasSize();

// Add Event Listener to mousewheel
window.addEventListener('mousewheel', function(e) {
  if(inAnimation == false) { 
    inAnimation = true;
    e.preventDefault(); // No scroll

    // The following equation will return either a 1 for scroll down
    // or -1 for a scroll up
    var delta = Math.max(-1, Math.min(1, e.wheelDelta));

    // find the next stopping piont frame based on the current 
    // location and scroll direction
    var nextStop = getNextStop(currentLocation, delta);
    // animate frames
    if(nextStop != false) {
      animateFrames(currentLocation, nextStop, delta);
    } else {
      inAnimation = false;
    }
  }
});




/*var currentMousePos = false;

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













        