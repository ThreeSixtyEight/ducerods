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
// Defined Function
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
    if(currentLocation == seqFinish[1]){
      $( '#content' ).fadeIn();
      $( '#section_1' ).fadeIn();
      $( '#section_1 .load_1' ).fadeIn(700);
      $( '#section_1 .load_2' ).delay(1000).fadeIn(700);
      $( '#section_1 .load_3' ).delay(2500).fadeIn(700);
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
          if(index == 1){
            //Return false if index is 1
            return false;
          } else {
            //Return previous sequence 
            return index-1;
          }
        } else {
          if(index >= seqStart.length -1){
            //Return false if index is last frame
            return false;
          } else {
            //Return next sequence 
            return index+1;
          }
        }
      } 
    }
    //Return false if currentlLocation is out of bounds
    return false;
} 

// Animate Frames from Start to Finish
function animateFrames(start, finish, direction, frameIndex){
  var refreshIntervalId = setInterval(function(){

    // clear the previous photo
    context.clearRect(0, 0, canv.width, canv.height);
    // draw next photo
    setImage(currentLocation);
    // add or subtract 1 to current location 
    // 1 for scroll down or -1 for a scroll up 
    if(direction == 1){
      $( 'section' ).fadeOut();
      currentLocation = currentLocation - 1;
      // stop when current location equals finish
      if(parseInt(currentLocation) < parseInt(finish)){
        clearInterval(refreshIntervalId);
        $( '#section_' + frameIndex ).fadeIn();
        $( '#section_' + frameIndex + ' .load_1, #section_' + frameIndex + ' .load_2, #section_' + frameIndex + ' .load_3' ).fadeIn();
        setTimeout(function(){ inAnimation = false; },3200);
      }  
    } else {
      currentLocation = currentLocation + 1; 
      $( 'section' ).fadeOut();
      // stop when current location equals finish
      if(parseInt(currentLocation) >= parseInt(finish)){
        clearInterval(refreshIntervalId);
        $( '#section_' + frameIndex ).show();
        $( '#section_' + frameIndex + ' .load_1' ).fadeIn(700);
        $( '#section_' + frameIndex + ' .load_2' ).delay(1000).fadeIn(700);
        $( '#section_' + frameIndex + ' .load_3' ).delay(2500).fadeIn(700);
        setTimeout(function(){ inAnimation = false; },3200);
      } 
    }       
  },35);
};

function animateText(frameIndex) { };

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
  $windowWidth = $(window).width();
  // Filename of each image
  var filename = [
    'https://cdn.shopify.com/s/files/1/0717/4831/files/rod_sm_' + ('000' + i).slice(-4) + '.jpg?16834997590302147877',  //  500 x 257
    'https://cdn.shopify.com/s/files/1/0717/4831/files/rod_med_' + ('000' + i).slice(-4) + '.jpg?16834997590302147877', //  768 x 394
    'https://cdn.shopify.com/s/files/1/0717/4831/files/rod_' + ('000' + i).slice(-4) + '.jpg?16834997590302147877', // 1200 x 616
    'https://cdn.shopify.com/s/files/1/0717/4831/files/rod_xl_' + ('000' + i).slice(-4) + '.jpg?16834997590302147877' // 1920 x 985
  ];
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
  // check for the window width and insert appropriate images
  if( $windowWidth <= 500 ) {
    img.src = filename[0];
  } else if ( $windowWidth >= 501 && $windowWidth <= 768 ) {
    img.src = filename[1];
  } else if ( $windowWidth >= 769 && $windowWidth <= 1280 ) {
    img.src = filename[2];
  } else if ( $windowWidth >= 1281 ) {
    img.src = filename[3];
  }
  images.push(img);
}

// Redefine canvas size on browser resize 
$( window ).resize(function(event) {
  setCanvasSize();
});

// Set Initial Canvas Size
setCanvasSize();

// Add Event Listener to mousewheel
function MouseWheelHandler(e) {
  if(inAnimation == false) { 
    inAnimation = true;
    // The following equation will return either a 1 for scroll down
    // or -1 for a scroll up
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); // added -e.detail for firefox
    // find the next stopping piont frame based on the current 
    e.preventDefault(); // No scroll
    // location and scroll direction
    var goToIndex = getNextStop(currentLocation, delta);
    // animate frames
    if(goToIndex != false) {
      animateFrames(currentLocation, seqFinish[goToIndex], delta, goToIndex);
    } else {
      inAnimation = false;
    }
  }
};      


if (window.addEventListener) {
  // IE9, Chrome, Safari, Opera
  window.addEventListener("mousewheel", MouseWheelHandler, false);
  // Firefox
  window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
// IE 6/7/8
else window.attachEvent("onmousewheel", MouseWheelHandler);


