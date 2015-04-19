//By Zaid Daba'een
//April 19 2015

var vol = false;
var clicks = 5;

$(document).ready(function() {
    $('#bg-video').prop("volume", "0.0");
    disableVideoAndroid();
    resize();
    chooseSentence();
});

$(window).resize(function() {
    resize();
});

function resize() {

    $('#bg-video').css({width: window.innerWidth, height: window.innerHeight});
    $('#bg-tint').css({width: window.innerWidth, height: window.innerHeight});

}

$(window).keydown(function(fn) {
    if (fn.keyCode == 32) {
       switchVolume();
    }
});

$(window).on('click', function(fn){
   clicks--;
   if(clicks <= 0){
       switchVolume();
   }
});

function switchVolume(){
     if (vol == false) {
            $('#bg-video').prop("volume", "1.0");
            vol = true;
        } else {
            $('#bg-video').prop("volume", "0.0");
            vol = false;
        }
}

function chooseSentence(){
    var sentences = ['Software engineering isn\'t for the weak hearted', 
    'Software development needs an engineer',
    'Don\'t throw your code away in the wrong hands',
    'Why a computer scientist?',
    'Trust me'];

    var random = Math.floor((Math.random() * (sentences.length + 1)) + 1);
    $('#first-line').html(sentences[random]);
}

function disableVideoAndroid(){
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid) {
	$('body').css({background: 'url(snap.png) no-repeat center fixed'});
        $('#bg-video').remove();
    }
}