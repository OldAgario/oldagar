// ==UserScript==
// @name         OldAgar.PRO BLACK
// @namespace    OldAgar.PRO
// @version      1.2
// @description  OldAgar.PRO extension
// @author       Old One
// @homepage     http://oldagar.pro/
// @match        http://oldagar.pro/*
// @icon         http://oldagar.pro/assets/img/favicon.png
// @downloadURL  https://github.com/OldAgario/oldagar/raw/master/oldagar.user.js
// @updateURL    https://github.com/OldAgario/oldagar/raw/master/oldagar.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

var year = (new Date()).getFullYear();

$('#settings-btn').remove();
$('#play-btn').css('width','100%');
$('#settings').show();
$('#settings').insertBefore('#instructions');
$('#mainform').next().css({
    'margin':'6px 0'
});
$('#instructions').css({
    'margin':'6px 0 20px 0'
});
$('label').css({
    'min-width':'94px',
    'display':'inline-block'
});
//optional change logo
$('.bgimg').css('background-image','url(https://raw.githubusercontent.com/OldAgario/oldagar/master/bg.png)');

$('#instructions center .text-muted').append('<br />Press <b style="color: red">T</b> to stop minion<br />Press <b style="color: red">SHIFT</b> to split 16');
$('<span class="text-muted" style="color:#3071a9;">Author: '+GM_info.script.author+' &copy;'+year+' | v'+GM_info.script.version+'</span><br />').prependTo('#footer');

//CONTROLS
//https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
var down = {};
$(document).keydown(function(event){
    if($("input").is(":focus")) return; //Will fail if input focused.
var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '80'){ // P - pause
        if (down['80'] == null) {
            X = window.innerWidth/2;
            Y = window.innerHeight/2;
            $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
            down['80'] = true;
        }
    }
    if(keycode == '68'){ // D - theme
        if (down['68'] == null) {
            $("input[data-box-id='3']").click();
            down['68'] = true;
        }
    }
});
$(document).keyup(function(event) {
     var keycode = (event.keyCode ? event.keyCode : event.which);
     down[keycode] = null;
});

//MACRO CONTROLS
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;
var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 81 && EjectDown === false) { // on press key Q
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 16) { //key SHIFT
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
}
function keyup(event) {
    if (event.keyCode == 81) { // on release key Q
        EjectDown = false;
    }
}
function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87}); // key W
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}
function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key Space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}
function esc() {
    $("body").trigger($.Event("keydown", { keyCode: 27}));
    $("body").trigger($.Event("keyup", { keyCode: 27}));
}
