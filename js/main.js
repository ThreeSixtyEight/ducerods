var canv = document.getElementById('background');
$(canv)
  .width($(window).width())
  .height($(window).height());

//perload images
var totalImages = 61; // Wow, so many images for such a short clip
var images = new Array();
for(var i = 1; i < totalImages; i++) {
	var filename = 'rod/rod_0' + ('0' + i).slice(-2) + '.jpg'; // Filename of each image
	var img = new Image;
	img.src = filename;
	images.push(img);
}

window.addEventListener('mousewheel', function(e) {
  e.preventDefault(); // No scroll
 
  // The following equation will return either a 1 for scroll down
  // or -1 for a scroll up
  var delta = Math.max(-1, Math.min(1, e.wheelDelta));
 
  // This code mostly keeps us from going too far in either direction
  if(delta == -1) currentLocation += 1;
  if(delta == 1) currentLocation -= 1;
  if(currentLocation < 0) currentLocation = 0;
  if(currentLocation > images.length)
    currentLocation = images.length;
 
  // See below for the details of this function
  setImage(currentLocation);
});


var context = canv.getContext('2d');
 
// See above for where this gets called
function setImage(newLocation) {
  // drawImage takes 5 arguments: image, x, y, width, height
  context.drawImage(images[newLocation], 0, 0, 1280, 720);
}

var currentMousePos = false;
window.addEventListener('mousemove', function(e) {
  currentMousePos = e.x;
  currentLocation = Math.floor(
    (images.length / $(window).width()) *
    currentMousePos
  );
  setImage(currentLocation);
});