var socket = io();
var isPhone = detectmob();
var allToShade = document.getElementsByClassName('shadeMe');
var rotsX = [9.46, 9.46, 9.46, 9.46, 0, 0, 0, 0, 33.7, 0, 90];
var rotsY = [0, 90, 270, 180, 90, 90, 270, 270, 180, 180, 0];

//on page load, check if user is using a phone. If they are, this render will be the controller. Otherwise, it's the viewer




// enable vibration support
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
var buzz;
if (navigator.vibrate) {
    //buzz!
}
if (isPhone) {
    //if it's a phone, listen for controls
    window.addEventListener('deviceorientation', function(e) {
        var pitch = Math.floor((Math.max(0, Math.min(e.beta, 90)) / 90) * 360);
        socket.emit('controlMove', pitch);
        $('#freqMon').val(pitch);
    });
    socket.on('crash', function() {
        //do some fancy shmancy crashy stuff
    });
} else {
    //otherwise, move the ship
    socket.on('moveShip', function(allFreqs) {
        //do stuff with the ship. Move, etc.

    });
}


document.onmousemove = function(e) {
    //move the ship
    var x = e.y / 2;
    var y = e.x / 2 - 90;
    $('#shipCont').css('transform', 'rotateX(' + x + 'deg) rotateZ(' + y + 'deg)');
    shader(x, y);
};

function shader(xIn, yIn) {
    var allInfo = '';
    for (var i = 0; i < allToShade.length; i++) {
        var adjRotX = (rotsX[i] + xIn) % 360;
        var adjRotY = (rotsY[i] + yIn) % 360;
        var colVal = parseInt(204 - (((adjRotX + adjRotY) / 720) * 125));
        var col = 'rgb(' + colVal + ',' + colVal + ',' + colVal + ')';
        console.log(col);
        // 104 dif (100 to 204)

        allInfo += allToShade[i].id + ' | ' + allToShade[i].className;
        if (window.getComputedStyle(allToShade[i]).backgroundColor != 'rgba(0, 0, 0, 0)') {
            // allInfo += ' uses BGcolor, and is rotated (' + adjRotX + ', ' + adjRotY + ') <br/>';
            allToShade[i].style.backgroundColor = col;
        } else if (window.getComputedStyle(allToShade[i]).borderLeftColor !== 'rgba(0, 0, 0, 0)') {
            // allInfo += ' uses left border color, and is rotated (' + adjRotX + ', ' + adjRotY + ') <br/>';
            allToShade[i].style.borderLeftColor = col;
        } else if (window.getComputedStyle(allToShade[i]).borderBottomColor !== 'rgba(0, 0, 0, 0)') {
            // allInfo += ' uses bottom border color, and is rotated (' + adjRotX + ', ' + adjRotY + ') <br/>';
            allToShade[i].style.borderBottomColor = col;
        } else {
            // allInfo += ' does not use a color(?), and is rotated (' + adjRotX + ', ' + adjRotY + ') <br/>';
        }
    }
}