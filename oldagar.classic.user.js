// ==UserScript==
// @name         OldAgar.PRO WHITE
// @namespace    OldAgar.PRO
// @version      1.2
// @description  OldAgar.PRO Classic Style extension
// @author       Old One
// @homepage     http://oldagar.pro/
// @match        http://oldagar.pro/*
// @icon         http://oldagar.pro/assets/img/favicon.png
// @downloadURL  https://github.com/OldAgario/oldagar/raw/master/oldagar.classic.user.js
// @updateURL    https://github.com/OldAgario/oldagar/raw/master/oldagar.classic.user.js
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

var year = (new Date()).getFullYear();

GM_addStyle(`
#play-btn {
	width: 100%;
}
#settings {
    display: block !important;
}
#instructions {
	margin: 6px 0 20px 0 !important;
}
.bgimg {
	margin: 0;
}
.text-muted b {
	color: #777 !important;
}
label {
    min-width: 94px;
    display: inline-block;
}
#helloDialog {
    background: #ffffff;
    border-radius: 10px;
}
.form-control {
    display: block !important;
    height: 44px !important;
    padding: 6px 12px !important;
    font-size: 14px !important;
    line-height: 1.42857143 !important;
    color: #555 !important;
    background-color: #fff !important;
    border: 1px solid #ccc !important;
    border-radius: 4px !important;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075) !important;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075) !important;
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s !important;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s !important;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s !important;
}

.form-control:focus {
    border-color: #66afe9 !important;
    outline: 0 !important;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6) !important;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6) !important;
}
#play-btn, #spectate-btn {
	border-radius: 4px;
    border: 1px solid transparent;
    font-weight: bold;
}
#play-btn {
    background: #5cb85c;
    border-color: #4cae4c;
}
#play-btn:hover {
    background: #449d44;
    border-color: #398439;
}

#spectate-btn {
    background: #f0ad4e;
    border-color: #eea236;
}
#spectate-btn:hover {
    background: #ec971f;
    border-color: #d58512;
}
#footer {
    font-size: 10px;
}
`);

//optional remove logo
//$('<h2>OldAgar.pro</h2>').appendTo('.bgimg');
//$('.bgimg').removeClass('bgimg');

//optional change logo
$('.bgimg').css('background-image','url(https://raw.githubusercontent.com/OldAgario/oldagar/master/bg.png)');

$('#settings-btn').remove();
$('#settings').insertBefore('#instructions');

$('#mainform').next().css({
    'margin':'0'
});
$('<hr style="margin-top:10px;margin-bottom:10px">').prependTo('#instructions');
$('<hr style="margin-top:10px;margin-bottom:10px">').appendTo('#instructions');
$('<span class="text-muted" style="color:#3071a9;">Author: '+GM_info.script.author+' &copy;'+year+' | v'+GM_info.script.version+'</span><br />').prependTo('#footer');

$('#play-btn').text('Play');

$('#instructions center .text-muted').append('<br />Press <b>T</b> to stop minion<br />Press <b>SHIFT</b> to split 16');

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
    if(keycode == '67'){ // C - chat
        if (down['67'] == null) {
            $("input[data-box-id='7']").click();
            down['67'] = true;
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
