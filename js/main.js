//By Zaid Daba'een
//April 19 2015

var vol = false;
var clicks = 5;
var scrollTime = 0;
var currentSentence = 0;
var sentences = ['Software engineering isn\'t for the weak hearted',
    'Software development needs an engineer',
    'Don\'t throw your code away into the wrong hands',
    'Why a computer scientist?',
    'Trust me',
    'Some engineer and some develop'];

$(document).ready(function() {
    $('#bg-video').prop("volume", "0.0");
    disableVideoAndroid();
    resize();
    randomSentence();
    initSwipe();
});

$(window).resize(function() {
    resize();
});


$(window).bind('mousewheel DOMMouseScroll', function(event) {
    if (event.originalEvent.wheelDelta < -5 || event.originalEvent.detail < 0) {
        nextSentence();
    }
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

$(window).on('click', function(fn) {
    if (isAndroid)
        $('#bg-video')[0].play();
    updateClicks();
    if (clicks <= 0) {
        switchVolume();
    }
});

$(document).on('pageinit', function(event){
    console.log('init');
    $(window).swipe(function(){
        console.log('swipe');
    });
});


function updateClicks(){
    
        clicks--;
    if(clicks>1){
        showText("You are " + clicks + " click(s) away");
    }
}

function showText(text){
        $('#hint').html(text);

        $("#hint").show();
        $("#hint").fadeOut(1000);
}

function switchVolume() {
    if (vol == false) {
        $('#bg-video').prop("volume", "1.0");
        vol = true;
        showText("Resume")
    } else {
        $('#bg-video').prop("volume", "0.0");
        vol = false;
        showText("Muted")
    }
}

function randomSentence() {

    var random = Math.floor((Math.random() * (sentences.length + 1)));
    currentSentence = random;
    $('#first-line').html(sentences[random]);

}

function nextSentence() {
    if (scrollTime == 0 || (scrollTime != 0 && (new Date).getTime() - scrollTime > 1000)) {

        if (currentSentence == sentences.length - 1) {
            currentSentence = 0;
        } else {
            currentSentence++;
        }

        scrollTime = (new Date).getTime();
        $('#first-line').fadeOut(200, function() {
            $('#first-line').html(sentences[currentSentence]);
            return $('#first-line').fadeIn(200);
        });

    }
}

function disableVideoAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    isIOS = /(iPad|iPhone|iPod)/g.test(ua);
    if (isIOS) {
        $('body').css({background: 'url(snap.png) no-repeat center center'});
        $('#bg-video').remove();
    }
}

function initSwipe(){
    swipedetect(window, function(dir){
        if(dir == 'up'){
            nextSentence();
        }
    }); 
}