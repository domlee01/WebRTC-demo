navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
var stream;

window.audioContext || (window.audioContext = window.webkitAudioContext);
var audioContext, mediaStreamSource;
         
     
    

navigator.getUserMedia({audio: true, video: {
      mandatory: {
        maxWidth: 360
      }
    }}, function(localMediaStream) {
  window.stream = localMediaStream;
  var video = document.querySelector("video");
  try {
    video.src = window.URL.createObjectURL(localMediaStream);
  } catch(e) {
    try {
      video.mozSrcObject = localMediaStream;
      video.play();
    } catch(e){
      console.log("Error setting video src: ", e);
    }
  }

    if (window.audioContext) {
        //audioContext = new window.audioContext();
        
	audioContext = new window.webkitAudioContext();
        mediaStreamSource = audioContext.createMediaStreamSource(localMediaStream);    
     	mediaStreamSource.connect(audioContext.destination);
	console.log(mediaStreamSource ); 
	console.log(audioContext.destination);
        
    }	


  var audioElement = document.querySelector("audio");
	
  try {
	
    audioElement.src = window.URL.createObjectURL(localMediaStream);
  } catch(e) {
    try {
      audioElement.mozSrcObject = localMediaStream;
      audioElement.play();
    } catch(e){
      console.log("Error setting video src: ", e);
    }
  }	

audioElement.addEventListener('play', function() {
        audioElement.muted = false;
        audioElement.volume = 1;
        console.log('Unmuting and setting volume to max level');
      }, false);
      

}, function(error) {
  console.log("navigator.getUserMedia error: ", error);
});



var photoButton = document.getElementById('takePhoto');
photoButton.addEventListener('click', takePhoto, false);

function takePhoto() {
    
	var photo = document.getElementById('photo'),
        
	context = photo.getContext('2d');
 
    

	var video = document.querySelector("video");
  	photo.width = video.clientWidth;
    
	photo.height = video.clientHeight;
 
    
	context.drawImage(video, 0, 0, photo.width, photo.height);

}

